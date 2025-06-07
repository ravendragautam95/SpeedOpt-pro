const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Function to run Lighthouse CLI
function runLighthouse(url, strategy = 'mobile') {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, 'temp', `lighthouse-${Date.now()}-${strategy}.json`);
    
    // Ensure temp directory exists
    const tempDir = path.dirname(outputPath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    console.log(`🔍 Running Lighthouse for ${url} (${strategy})...`);

    // Lighthouse CLI arguments
    const args = [
      url,
      '--output=json',
      `--output-path=${outputPath}`,
      '--quiet',
      '--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"',
      strategy === 'mobile' ? '--preset=perf' : '--preset=desktop',
      '--only-categories=performance,accessibility,best-practices,seo'
    ];

    if (strategy === 'desktop') {
      args.push('--form-factor=desktop');
      args.push('--screenEmulation.disabled');
    }

    // Try to find lighthouse in common locations
    const lighthousePaths = [
      'lighthouse', // Try PATH first
      '/Users/ravendragautam/.nvm/versions/node/v18.18.0/bin/lighthouse',
      '/usr/local/bin/lighthouse',
      '/opt/homebrew/bin/lighthouse'
    ];
    
    let lighthousePath = 'lighthouse';
    for (const path of lighthousePaths) {
      try {
        require('child_process').execSync(`${path} --version`, { stdio: 'ignore' });
        lighthousePath = path;
        break;
      } catch (e) {
        continue;
      }
    }
    
    const lighthouse = spawn(lighthousePath, args);

    let errorOutput = '';

    lighthouse.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    lighthouse.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Lighthouse failed with code ${code}:`, errorOutput);
        reject(new Error(`Lighthouse failed: ${errorOutput}`));
        return;
      }

      try {
        // Read the generated report
        const reportData = fs.readFileSync(outputPath, 'utf8');
        const report = JSON.parse(reportData);
        
        // Console log raw Lighthouse data for debugging
        console.log(`\n🔍 === RAW LIGHTHOUSE DATA FOR ${strategy.toUpperCase()} ===`);
        console.log('📁 Full Report Keys:', Object.keys(report));
        
        const categories = report.lhr?.categories || report.categories;
        const audits = report.lhr?.audits || report.audits;
        
        // Log categories with scores
        if (categories) {
          console.log('\n📊 CATEGORIES & SCORES:');
          Object.entries(categories).forEach(([key, category]) => {
            console.log(`  ${key}: ${Math.round(category.score * 100)} (${category.title})`);
          });
        }
        
        // Log key performance audits
        if (audits) {
          console.log('\n⚡ KEY PERFORMANCE AUDITS:');
          const keyAudits = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 
                            'cumulative-layout-shift', 'speed-index', 'interactive'];
          keyAudits.forEach(auditKey => {
            const audit = audits[auditKey];
            if (audit) {
              console.log(`  ${auditKey}: ${audit.displayValue} (score: ${audit.score})`);
            }
          });
          
          // Log opportunities with potential savings
          console.log('\n💡 OPTIMIZATION OPPORTUNITIES:');
          const opportunityAudits = ['render-blocking-resources', 'unused-css-rules', 'unused-javascript', 
                                    'uses-optimized-images', 'uses-webp-images', 'offscreen-images'];
          opportunityAudits.forEach(auditKey => {
            const audit = audits[auditKey];
            if (audit && audit.details?.overallSavingsMs > 0) {
              console.log(`  ${auditKey}: ${audit.details.overallSavingsMs}ms potential savings`);
            }
          });
        }
        
        console.log(`\n🔍 === END RAW DATA FOR ${strategy.toUpperCase()} ===\n`);
        
        // Clean up temp file
        fs.unlinkSync(outputPath);
        
        console.log(`✅ Lighthouse analysis completed for ${strategy}`);
        resolve(report);
      } catch (error) {
        console.error(`❌ Error reading Lighthouse report:`, error);
        reject(error);
      }
    });

    lighthouse.on('error', (error) => {
      console.error(`❌ Lighthouse spawn error:`, error);
      reject(error);
    });
  });
}

// Process Lighthouse data to match our expected format
function processLighthouseData(mobileReport, desktopReport, url) {
  const mobile = mobileReport || {};
  const desktop = desktopReport || mobile;

  // Extract scores
  const getScore = (report, category) => {
    // Support both old (lhr) and new (direct) report formats
    const categories = report.lhr?.categories || report.categories;
    
    if (!categories) {
      console.warn(`No categories found in report for ${category}`);
      return 0;
    }
    
    const score = categories[category]?.score;
    if (score === null || score === undefined) {
      console.warn(`No score found for category: ${category}`);
      return 0;
    }
    
    const finalScore = Math.round(score * 100);
    console.log(`Extracted score for ${category}: ${finalScore}`);
    return finalScore;
  };

  // Extract Core Web Vitals
  const getCoreWebVitals = (report) => {
    // Support both old (lhr) and new (direct) report formats
    const audits = report.lhr?.audits || report.audits || {};
    console.log('Available audits:', Object.keys(audits).slice(0, 10), '... and', Object.keys(audits).length - 10, 'more');
    
    // Helper function to get rating based on thresholds
    const getRating = (value, goodThreshold, needsImprovementThreshold) => {
      if (value <= goodThreshold) return 'good';
      if (value <= needsImprovementThreshold) return 'needs-improvement';
      return 'poor';
    };
    
    const lcp = audits['largest-contentful-paint'];
    const fid = audits['max-potential-fid'] || audits['total-blocking-time'];
    const cls = audits['cumulative-layout-shift'];
    const ttfb = audits['server-response-time'];
    
    console.log('LCP audit:', lcp?.numericValue, lcp?.displayValue);
    console.log('FID audit:', fid?.numericValue, fid?.displayValue);
    console.log('CLS audit:', cls?.numericValue, cls?.displayValue);
    console.log('TTFB audit:', ttfb?.numericValue, ttfb?.displayValue);
    
    return {
      lcp: {
        value: Math.round(lcp?.numericValue || 2500),
        rating: lcp?.numericValue ? getRating(lcp.numericValue, 2500, 4000) : 'poor',
        displayValue: lcp?.displayValue || '2.5s'
      },
      fid: {
        value: Math.round(fid?.numericValue || 100),
        rating: fid?.numericValue ? getRating(fid.numericValue, 100, 300) : 'poor',
        displayValue: fid?.displayValue || '100ms'
      },
      cls: {
        value: Math.round((cls?.numericValue || 0.1) * 1000) / 1000, // Round to 3 decimal places
        rating: cls?.numericValue ? getRating(cls.numericValue, 0.1, 0.25) : 'poor',
        displayValue: cls?.displayValue || '0.1'
      },
      ttfb: {
        value: Math.round(ttfb?.numericValue || 600),
        rating: ttfb?.numericValue ? getRating(ttfb.numericValue, 200, 600) : 'poor',
        displayValue: ttfb?.displayValue || '600ms'
      }
    };
  };

  // Extract loading times
  const getLoadingTimes = (report) => {
    // Support both old (lhr) and new (direct) report formats
    const audits = report.lhr?.audits || report.audits || {};
    
    console.log('Loading times extraction:');
    console.log('FCP:', audits['first-contentful-paint']?.numericValue);
    console.log('LCP:', audits['largest-contentful-paint']?.numericValue);
    console.log('TTI:', audits['interactive']?.numericValue);
    console.log('TBT:', audits['total-blocking-time']?.numericValue);
    console.log('SI:', audits['speed-index']?.numericValue);
    
    return {
      firstPaint: Math.round(audits['first-meaningful-paint']?.numericValue || audits['first-contentful-paint']?.numericValue || 1000),
      firstContentfulPaint: Math.round(audits['first-contentful-paint']?.numericValue || 1200),
      largestContentfulPaint: Math.round(audits['largest-contentful-paint']?.numericValue || 2500),
      timeToInteractive: Math.round(audits['interactive']?.numericValue || 3000),
      totalBlockingTime: Math.round(audits['total-blocking-time']?.numericValue || 200),
      speedIndex: Math.round(audits['speed-index']?.numericValue || 2000),
      cumulativeLayoutShift: Math.round((audits['cumulative-layout-shift']?.numericValue || 0.1) * 1000) / 1000
    };
  };

  // Extract opportunities with detailed solutions
  const getOpportunities = (report) => {
    // Support both old (lhr) and new (direct) report formats
    const audits = report.lhr?.audits || report.audits || {};
    const opportunities = [];

    // Detailed optimization opportunities with solutions
    const opportunityConfigs = {
      'render-blocking-resources': {
        difficulty: 'medium',
        shopifyCompatible: false,
        solutions: [
          'Inline critical CSS in the HTML head',
          'Use async or defer attributes for JavaScript',
          'Load non-critical CSS with media="print" and change to "all" onload',
          'Consider server-side rendering for above-the-fold content'
        ],
        shopifySteps: [
          'Limited control in Shopify themes',
          'Use theme.liquid to inline critical CSS',
          'Request app developers to defer their scripts',
          'Consider Shopify Plus for advanced customizations'
        ]
      },
      'unused-css-rules': {
        difficulty: 'hard',
        shopifyCompatible: true,
        solutions: [
          'Use tools like PurgeCSS to remove unused styles',
          'Implement CSS tree-shaking in your build process',
          'Split CSS into critical and non-critical parts',
          'Use CSS-in-JS solutions for component-specific styles'
        ],
        shopifySteps: [
          'Use Shopify CLI for theme development',
          'Minimize CSS in theme.scss.liquid files',
          'Remove unused CSS from third-party apps',
          'Use CSS variables for better optimization'
        ]
      },
      'unused-javascript': {
        difficulty: 'hard',
        shopifyCompatible: true,
        solutions: [
          'Implement code splitting to load only needed JS',
          'Use dynamic imports for non-critical functionality',
          'Remove unused third-party libraries',
          'Use tree-shaking to eliminate dead code'
        ],
        shopifySteps: [
          'Audit installed Shopify apps and remove unused ones',
          'Use async loading for non-critical app scripts',
          'Implement lazy loading for heavy features',
          'Request app developers to optimize their scripts'
        ]
      },
      'uses-optimized-images': {
        difficulty: 'easy',
        shopifyCompatible: true,
        solutions: [
          'Convert images to WebP or AVIF format',
          'Implement proper image compression',
          'Use responsive images with srcset',
          'Add width and height attributes to prevent layout shift'
        ],
        shopifySteps: [
          'Use Shopify\'s automatic image optimization',
          'Implement responsive images with img_url filters',
          'Use proper image sizing in liquid templates',
          'Enable WebP format in theme settings'
        ]
      },
      'uses-webp-images': {
        difficulty: 'easy',
        shopifyCompatible: true,
        solutions: [
          'Convert PNG and JPEG images to WebP format',
          'Implement WebP with fallback using <picture> element',
          'Use automatic WebP detection and serving',
          'Optimize images during the build process'
        ],
        shopifySteps: [
          'Enable WebP in Shopify admin settings',
          'Use img_url filter with format parameter',
          'Implement WebP detection in liquid templates',
          'Test WebP support across different browsers'
        ]
      },
      'offscreen-images': {
        difficulty: 'easy',
        shopifyCompatible: true,
        solutions: [
          'Implement lazy loading for below-the-fold images',
          'Use Intersection Observer API for efficient lazy loading',
          'Prioritize above-the-fold images',
          'Use loading="lazy" attribute for modern browsers'
        ],
        shopifySteps: [
          'Use Shopify\'s native lazy loading features',
          'Implement lazy loading in product collections',
          'Optimize image loading in infinite scroll',
          'Use loading="lazy" in theme templates'
        ]
      },
      'unminified-css': {
        difficulty: 'easy',
        shopifyCompatible: true,
        solutions: [
          'Minify CSS files in your build process',
          'Use CSS minification tools like cssnano',
          'Enable CSS compression on your server',
          'Remove comments and whitespace from CSS'
        ],
        shopifySteps: [
          'Shopify automatically minifies theme CSS',
          'Ensure CSS minification is enabled in theme settings',
          'Use SCSS compiler with compression',
          'Audit third-party app CSS for minification'
        ]
      },
      'unminified-javascript': {
        difficulty: 'easy',
        shopifyCompatible: true,
        solutions: [
          'Minify JavaScript files using tools like Terser',
          'Enable JavaScript compression in your build process',
          'Remove console.log and debug code from production',
          'Use modern build tools with automatic minification'
        ],
        shopifySteps: [
          'Shopify automatically minifies theme JavaScript',
          'Ensure JS minification is enabled',
          'Audit app scripts for proper minification',
          'Use theme development tools for optimization'
        ]
      },
      'uses-text-compression': {
        difficulty: 'easy',
        shopifyCompatible: false,
        solutions: [
          'Enable GZIP compression on your server',
          'Configure Brotli compression for better performance',
          'Compress HTML, CSS, and JavaScript files',
          'Use CDN with automatic compression features'
        ],
        shopifySteps: [
          'Shopify automatically handles text compression',
          'No action needed - handled by Shopify CDN',
          'Focus on optimizing file sizes instead',
          'Use Shopify\'s built-in optimization features'
        ]
      }
    };

    Object.entries(opportunityConfigs).forEach(([auditId, config]) => {
      const audit = audits[auditId];
      if (audit && audit.score !== null && audit.score < 1) {
        const potentialSavings = audit.details?.overallSavingsMs || 
                               audit.details?.overallSavingsBytes || 
                               Math.round(1000 - (audit.score * 1000));
        
        opportunities.push({
          id: auditId,
          title: audit.title,
          description: audit.description,
          displayValue: audit.displayValue,
          score: Math.round(audit.score * 100),
          potential: Math.round(potentialSavings),
          difficulty: config.difficulty,
          shopifyCompatible: config.shopifyCompatible,
          solutions: config.solutions,
          shopifySteps: config.shopifySteps,
          steps: config.solutions.slice(0, 3) // First 3 solutions as steps
        });
      }
    });

    return opportunities;
  };

  // Process opportunities for both mobile and desktop
  const mobileOpportunities = getOpportunities(mobile);
  const desktopOpportunities = getOpportunities(desktop);
  
  // Combine and deduplicate opportunities
  const allOpportunities = [...mobileOpportunities];
  desktopOpportunities.forEach(deskOpp => {
    const existingIndex = allOpportunities.findIndex(mobOpp => mobOpp.id === deskOpp.id);
    if (existingIndex >= 0) {
      // Merge desktop data with mobile data
      allOpportunities[existingIndex] = {
        ...allOpportunities[existingIndex],
        desktopScore: deskOpp.score,
        desktopPotential: deskOpp.potential,
        desktopDisplayValue: deskOpp.displayValue
      };
    } else {
      allOpportunities.push({...deskOpp, desktopOnly: true});
    }
  });
  
  console.log('\n📈 COMBINED OPPORTUNITIES:', allOpportunities.length);
  allOpportunities.forEach(opp => {
    console.log(`  ${opp.id}: Mobile ${opp.score || 'N/A'}, Desktop ${opp.desktopScore || 'N/A'}, Savings: ${opp.potential}ms`);
  });

  return {
    url,
    timestamp: new Date().toISOString(),
    dataSource: 'lighthouse-cli',
    overallScore: {
      mobile: getScore(mobile, 'performance'),
      desktop: getScore(desktop, 'performance')
    },
    categoryScores: {
      performance: {
        mobile: getScore(mobile, 'performance'),
        desktop: getScore(desktop, 'performance')
      },
      accessibility: {
        mobile: getScore(mobile, 'accessibility'),
        desktop: getScore(desktop, 'accessibility')
      },
      bestPractices: {
        mobile: getScore(mobile, 'best-practices'),
        desktop: getScore(desktop, 'best-practices')
      },
      seo: {
        mobile: getScore(mobile, 'seo'),
        desktop: getScore(desktop, 'seo')
      }
    },
    // Mobile-specific data
    mobile: {
      coreWebVitals: getCoreWebVitals(mobile),
      loadingTimes: getLoadingTimes(mobile),
      opportunities: mobileOpportunities,
      categoryScores: {
        performance: getScore(mobile, 'performance'),
        accessibility: getScore(mobile, 'accessibility'),
        bestPractices: getScore(mobile, 'best-practices'),
        seo: getScore(mobile, 'seo')
      }
    },
    // Desktop-specific data
    desktop: {
      coreWebVitals: getCoreWebVitals(desktop),
      loadingTimes: getLoadingTimes(desktop),
      opportunities: desktopOpportunities,
      categoryScores: {
        performance: getScore(desktop, 'performance'),
        accessibility: getScore(desktop, 'accessibility'),
        bestPractices: getScore(desktop, 'best-practices'),
        seo: getScore(desktop, 'seo')
      }
    },
    // Legacy format for backward compatibility
    coreWebVitals: getCoreWebVitals(mobile),
    mobileMetrics: getCoreWebVitals(mobile),
    desktopMetrics: getCoreWebVitals(desktop),
    loadingTimes: getLoadingTimes(mobile),
    opportunities: allOpportunities,
    improvements: allOpportunities.map(opp => ({
      category: 'Performance',
      potential: opp.potential,
      description: opp.description,
      shopifyCompatible: opp.shopifyCompatible,
      solutions: opp.solutions
    })),
    issues: [] // Can be populated from failed audits if needed
  };
}

// API endpoint for Lighthouse analysis
app.get('/api/lighthouse', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log(`🚀 Starting Lighthouse analysis for: ${url}`);

    // Run both mobile and desktop analysis
    const [mobileReport, desktopReport] = await Promise.all([
      runLighthouse(url, 'mobile').catch(err => {
        console.warn('Mobile analysis failed:', err.message);
        return null;
      }),
      runLighthouse(url, 'desktop').catch(err => {
        console.warn('Desktop analysis failed:', err.message);
        return null;
      })
    ]);

    if (!mobileReport && !desktopReport) {
      throw new Error('Both mobile and desktop analysis failed');
    }

    const processedData = processLighthouseData(mobileReport, desktopReport, url);
    
    console.log(`✅ Lighthouse analysis completed successfully`);
    res.json(processedData);

  } catch (error) {
    console.error('❌ Lighthouse analysis error:', error.message);
    res.status(500).json({ 
      error: 'Lighthouse analysis failed',
      details: error.message,
      fallback: true
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Lighthouse CLI Service',
    timestamp: new Date().toISOString() 
  });
});

// Check if Lighthouse is installed
app.get('/lighthouse-check', (req, res) => {
  // Try to find lighthouse in common locations
  const lighthousePaths = [
    'lighthouse', // Try PATH first
    '/Users/ravendragautam/.nvm/versions/node/v18.18.0/bin/lighthouse',
    '/usr/local/bin/lighthouse',
    '/opt/homebrew/bin/lighthouse'
  ];
  
  let lighthousePath = null;
  for (const path of lighthousePaths) {
    try {
      require('child_process').execSync(`${path} --version`, { stdio: 'ignore' });
      lighthousePath = path;
      break;
    } catch (e) {
      continue;
    }
  }
  
  if (!lighthousePath) {
    return res.json({ available: false, message: 'Lighthouse CLI not found. Install with: npm install -g lighthouse' });
  }
  
  const lighthouse = spawn(lighthousePath, ['--version']);
  
  lighthouse.on('close', (code) => {
    if (code === 0) {
      res.json({ available: true, message: 'Lighthouse CLI is available' });
    } else {
      res.json({ available: false, message: 'Lighthouse CLI not found. Install with: npm install -g lighthouse' });
    }
  });

  lighthouse.on('error', () => {
    res.json({ available: false, message: 'Lighthouse CLI not found. Install with: npm install -g lighthouse' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Lighthouse Service running on port ${PORT}`);
  console.log(`📊 Ready to analyze websites with Lighthouse CLI`);
  console.log(`💡 Make sure Lighthouse is installed globally: npm install -g lighthouse`);
});

module.exports = app; 