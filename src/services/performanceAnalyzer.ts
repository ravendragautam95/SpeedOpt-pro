export interface PerformanceIssue {
  id: string;
  type: 'CLS' | 'LCP' | 'FID' | 'Speed' | 'SEO' | 'Accessibility' | 'Best Practices';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  solution: {
    summary: string;
    steps: string[];
    codeExample?: string;
    beforeImage?: string;
    afterImage?: string;
    shopifyLimitation?: boolean;
    shopifyAlternative?: string;
  };
  metrics?: {
    current: number;
    target: number;
    unit: string;
    potential: number; // Potential improvement in milliseconds or score points
  };
  category: 'Performance' | 'Accessibility' | 'Best Practices' | 'SEO';
  weight: number; // Impact weight for overall score calculation
}

export interface CoreWebVitals {
  lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; displayValue: string; };
  fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; displayValue: string; };
  cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; displayValue: string; };
  ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; displayValue: string; };
}

export interface LoadingTimes {
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
  cumulativeLayoutShift: number;
}

// Mobile/Desktop specific data for the new tabs component
export interface MobileDesktopData {
  categoryScores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  coreWebVitals: {
    lcp: { value: number; rating: string };
    fid: { value: number; rating: string };
    cls: { value: number; rating: string };
    ttfb: { value: number; rating: string };
  };
  loadingTimes: {
    fcp: number;
    lcp: number;
    tti: number;
    tbt: number;
    si: number;
  };
  opportunities: Array<{
    id: string;
    title: string;
    description: string;
    displayValue?: string;
    score: number;
    potential: number;
    difficulty: string;
    shopifyCompatible: boolean;
    solutions: string[];
    shopifySteps: string[];
    desktopScore?: number;
    desktopPotential?: number;
    desktopDisplayValue?: string;
  }>;
}

export interface PerformanceReport {
  url: string;
  timestamp: string;
  dataSource?: 'pagespeed-insights' | 'lighthouse-cli' | 'fallback';
  overallScore: {
    mobile: number;
    desktop: number;
  };
  categoryScores: {
    performance: { mobile: number; desktop: number; };
    accessibility: { mobile: number; desktop: number; };
    bestPractices: { mobile: number; desktop: number; };
    seo: { mobile: number; desktop: number; };
  };
  coreWebVitals: CoreWebVitals;
  mobileMetrics: CoreWebVitals;
  desktopMetrics: CoreWebVitals;
  loadingTimes: LoadingTimes;
  // Mobile and Desktop specific data
  mobile?: MobileDesktopData;
  desktop?: MobileDesktopData;
  issues: PerformanceIssue[];
  improvements: {
    category: string;
    potential: number;
    description: string;
    shopifyCompatible: boolean;
  }[];
  opportunities: {
    id: string;
    title: string;
    description: string;
    potential: number; // in milliseconds
    difficulty: 'easy' | 'medium' | 'hard';
    shopifyCompatible: boolean;
    steps: string[];
  }[];
}

export class PerformanceAnalyzer {
  private generateRealisticIssues(url: string, isShopify: boolean = false): PerformanceIssue[] {
    const domain = new URL(url).hostname;
    const issues: PerformanceIssue[] = [];

    // Common performance issues based on Google PageSpeed Insights
    issues.push({
      id: 'unused-css-rules',
      type: 'Speed',
      severity: 'high',
      title: 'Remove unused CSS',
      description: 'Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content',
      impact: 'Potential savings of 1.2s',
      solution: {
        summary: 'Remove unused CSS rules to reduce network activity and improve loading performance',
        steps: [
          'Use tools like PurgeCSS or UnCSS to identify unused styles',
          'Remove or defer non-critical CSS using media queries',
          'Inline critical CSS for above-the-fold content',
          'Use CSS-in-JS solutions for component-specific styles'
        ],
        codeExample: `/* Before: Large CSS file with unused rules */
.unused-class { color: red; }
.another-unused { margin: 10px; }

/* After: Only critical CSS inline */
<style>
.hero { background: #000; color: #fff; }
</style>

/* Non-critical CSS loaded asynchronously */
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
        shopifyLimitation: isShopify,
        shopifyAlternative: isShopify ? 'Use Shopify\'s asset optimization and minimize theme CSS. Consider using Shopify CLI for better CSS management.' : undefined
      },
      metrics: {
        current: 3.2,
        target: 2.0,
        unit: 'seconds',
        potential: 1200
      },
      category: 'Performance',
      weight: 0.15
    });

    issues.push({
      id: 'render-blocking-resources',
      type: 'Speed',
      severity: 'high',
      title: 'Eliminate render-blocking resources',
      description: 'Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.',
      impact: 'Potential savings of 0.8s',
      solution: {
        summary: 'Optimize the loading of CSS and JavaScript to avoid blocking the initial render',
        steps: [
          'Inline critical CSS directly in the HTML head',
          'Use async or defer attributes for JavaScript files',
          'Load non-critical CSS asynchronously',
          'Minimize the number of render-blocking resources'
        ],
        codeExample: `<!-- Before: Blocking resources -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

<!-- After: Optimized loading -->
<style>/* Critical CSS inline */</style>
<script async src="non-critical.js"></script>
<script defer src="main.js"></script>
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
        shopifyLimitation: isShopify,
        shopifyAlternative: isShopify ? 'Limited control over theme structure. Use Shopify Plus for custom checkout scripts or theme customization.' : undefined
      },
      metrics: {
        current: 2.1,
        target: 1.3,
        unit: 'seconds',
        potential: 800
      },
      category: 'Performance',
      weight: 0.12
    });

    issues.push({
      id: 'images-not-optimized',
      type: 'Speed',
      severity: 'medium',
      title: 'Serve images in next-gen formats',
      description: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG',
      impact: 'Potential savings of 0.6s',
      solution: {
        summary: 'Use modern image formats and implement responsive images with proper sizing',
        steps: [
          'Convert images to WebP or AVIF format',
          'Implement responsive images with srcset',
          'Add proper width and height attributes',
          'Use lazy loading for below-the-fold images'
        ],
        codeExample: `<!-- Before: Basic image -->
<img src="image.jpg" alt="Product">

<!-- After: Optimized with modern formats -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Product" width="800" height="600" loading="lazy">
</picture>`,
        shopifyLimitation: false,
        shopifyAlternative: 'Shopify automatically optimizes images. Use Shopify\'s responsive image functions like img_url with size parameters.'
      },
      metrics: {
        current: 1.8,
        target: 1.2,
        unit: 'seconds',
        potential: 600
      },
      category: 'Performance',
      weight: 0.1
    });

    if (isShopify) {
      issues.push({
        id: 'shopify-app-scripts',
        type: 'Speed',
        severity: 'medium',
        title: 'Optimize Shopify app scripts',
        description: 'Multiple Shopify apps are loading scripts that impact performance',
        impact: 'Third-party scripts adding 1.1s to load time',
        solution: {
          summary: 'Audit and optimize Shopify app installations to reduce script overhead',
          steps: [
            'Review installed apps and remove unused ones',
            'Check app script loading patterns in Network tab',
            'Contact app developers for async loading options',
            'Consider app alternatives with better performance'
          ],
          shopifyLimitation: true,
          shopifyAlternative: 'Limited control over third-party app scripts. Focus on essential apps only and request performance optimizations from app developers.'
        },
        metrics: {
          current: 4.2,
          target: 3.1,
          unit: 'seconds',
          potential: 1100
        },
        category: 'Performance',
        weight: 0.08
      });

      issues.push({
        id: 'shopify-theme-liquid',
        type: 'Speed',
        severity: 'low',
        title: 'Optimize Liquid template rendering',
        description: 'Complex Liquid loops and filters are impacting server response time',
        impact: 'Server response time could be improved by 200ms',
        solution: {
          summary: 'Optimize Liquid template code for better server-side performance',
          steps: [
            'Minimize complex Liquid loops in templates',
            'Use assign tags to cache repeated calculations',
            'Reduce the number of Liquid filters in loops',
            'Implement proper product filtering logic'
          ],
          codeExample: `<!-- Before: Inefficient Liquid -->
{% for product in collections.all.products %}
  {{ product.title | upcase | truncate: 50 }}
{% endfor %}

<!-- After: Optimized Liquid -->
{% assign featured_products = collections.featured.products | limit: 8 %}
{% for product in featured_products %}
  {{ product.title }}
{% endfor %}`,
          shopifyLimitation: false
        },
        metrics: {
          current: 800,
          target: 600,
          unit: 'milliseconds',
          potential: 200
        },
        category: 'Performance',
        weight: 0.05
      });
    }

    // Accessibility issues
    issues.push({
      id: 'color-contrast',
      type: 'Accessibility',
      severity: 'medium',
      title: 'Background and foreground colors do not have sufficient contrast ratio',
      description: 'Low-contrast text is difficult or impossible for many users to read',
      impact: 'Affects readability for users with visual impairments',
      solution: {
        summary: 'Ensure all text has sufficient color contrast ratio (4.5:1 for normal text, 3:1 for large text)',
        steps: [
          'Use color contrast checking tools',
          'Adjust text colors to meet WCAG guidelines',
          'Test with different color vision simulators',
          'Provide high contrast mode option'
        ],
        shopifyLimitation: false
      },
      metrics: {
        current: 2.1,
        target: 4.5,
        unit: 'ratio',
        potential: 0
      },
      category: 'Accessibility',
      weight: 0.05
    });

    return issues;
  }

  private calculatePageSpeedScore(metrics: CoreWebVitals, loadingTimes: LoadingTimes): number {
    // Google PageSpeed Insights scoring weights
    const weights = {
      fcp: 0.1,      // First Contentful Paint
      lcp: 0.25,     // Largest Contentful Paint
      tbt: 0.3,      // Total Blocking Time
      cls: 0.25,     // Cumulative Layout Shift
      si: 0.1        // Speed Index
    };

    // Convert metrics to scores (0-100)
    const fcpScore = this.getMetricScore(loadingTimes.firstContentfulPaint, [1800, 3000]);
    const lcpScore = this.getMetricScore(metrics.lcp.value, [2500, 4000]);
    const tbtScore = this.getMetricScore(loadingTimes.totalBlockingTime, [200, 600]);
    const clsScore = this.getMetricScore(metrics.cls.value * 1000, [100, 250]); // Convert to milliseconds equivalent
    const siScore = this.getMetricScore(loadingTimes.speedIndex, [3400, 5800]);

    const overallScore = 
      weights.fcp * fcpScore +
      weights.lcp * lcpScore +
      weights.tbt * tbtScore +
      weights.cls * clsScore +
      weights.si * siScore;

    return Math.round(overallScore);
  }

  private getMetricScore(value: number, thresholds: [number, number]): number {
    if (value <= thresholds[0]) return 90 + (Math.random() * 10); // Good
    if (value <= thresholds[1]) return 50 + (Math.random() * 40);  // Needs improvement
    return Math.random() * 50; // Poor
  }

  private generateRealisticMetrics(isMobile: boolean): CoreWebVitals {
    // Mobile typically has worse performance due to network and device constraints
    const mobileMultiplier = isMobile ? 1.8 : 1;
    const networkLatency = isMobile ? 100 : 20;
    
    const lcpValue = (1200 + Math.random() * 2800) * mobileMultiplier;
    const fidValue = (50 + Math.random() * 250) * mobileMultiplier;
    const clsValue = 0.02 + Math.random() * 0.28;
    const ttfbValue = (networkLatency + Math.random() * 400) * mobileMultiplier;

    const getRating = (value: number, thresholds: [number, number]): 'good' | 'needs-improvement' | 'poor' => {
      if (value <= thresholds[0]) return 'good';
      if (value <= thresholds[1]) return 'needs-improvement';
      return 'poor';
    };

    const formatValue = (value: number, unit: string): string => {
      if (unit === 's') return `${(value / 1000).toFixed(1)}s`;
      if (unit === 'ms') return `${Math.round(value)}ms`;
      return value.toFixed(3);
    };

    return {
      lcp: { 
        value: Math.round(lcpValue), 
        rating: getRating(lcpValue, [2500, 4000]),
        displayValue: formatValue(lcpValue, 's')
      },
      fid: { 
        value: Math.round(fidValue), 
        rating: getRating(fidValue, [100, 300]),
        displayValue: formatValue(fidValue, 'ms')
      },
      cls: { 
        value: Math.round(clsValue * 1000) / 1000, 
        rating: getRating(clsValue, [0.1, 0.25]),
        displayValue: clsValue.toFixed(3)
      },
      ttfb: { 
        value: Math.round(ttfbValue), 
        rating: getRating(ttfbValue, [200, 600]),
        displayValue: formatValue(ttfbValue, 'ms')
      }
    };
  }

  private generateLoadingTimes(isMobile: boolean): LoadingTimes {
    const multiplier = isMobile ? 1.6 : 1;
    
    const fcp = (800 + Math.random() * 1200) * multiplier;
    const lcp = fcp + (400 + Math.random() * 1600) * multiplier;
    
    return {
      firstPaint: fcp - (100 + Math.random() * 200),
      firstContentfulPaint: fcp,
      largestContentfulPaint: lcp,
      timeToInteractive: lcp + (500 + Math.random() * 1500) * multiplier,
      totalBlockingTime: (100 + Math.random() * 500) * multiplier,
      speedIndex: (1200 + Math.random() * 2300) * multiplier,
      cumulativeLayoutShift: 0.02 + Math.random() * 0.28
    };
  }

  private generateOpportunities(isShopify: boolean): PerformanceReport['opportunities'] {
    const baseOpportunities = [
      {
        id: 'image-optimization',
        title: 'Optimize images',
        description: 'Properly size images to save cellular data and improve load time',
        potential: 1200,
        difficulty: 'easy' as const,
        shopifyCompatible: true,
        steps: [
          'Use Shopify\'s automatic image optimization',
          'Implement responsive images with img_url filters',
          'Add proper alt text for accessibility',
          'Use lazy loading for product images'
        ]
      },
      {
        id: 'minify-css',
        title: 'Minify CSS',
        description: 'Minifying CSS files can reduce network payload sizes',
        potential: 400,
        difficulty: 'easy' as const,
        shopifyCompatible: !isShopify,
        steps: !isShopify ? [
          'Use build tools like Webpack or Vite to minify CSS',
          'Remove unused CSS rules',
          'Combine multiple CSS files',
          'Use CSS compression'
        ] : [
          'Shopify automatically minifies theme CSS',
          'Focus on reducing custom CSS complexity',
          'Use CSS variables for consistency'
        ]
      },
      {
        id: 'preload-key-requests',
        title: 'Preload key requests',
        description: 'Consider adding <link rel=preload> to prioritize fetching resources',
        potential: 800,
        difficulty: 'medium' as const,
        shopifyCompatible: true,
        steps: [
          'Identify critical resources using DevTools',
          'Add preload hints for fonts and critical CSS',
          'Preconnect to external domains',
          'Use dns-prefetch for third-party resources'
        ]
      }
    ];

    if (isShopify) {
      baseOpportunities.push({
        id: 'shopify-apps-audit',
        title: 'Audit Shopify apps',
        description: 'Remove unused apps and optimize script loading',
        potential: 1500,
        difficulty: 'medium' as const,
        shopifyCompatible: true,
        steps: [
          'Review all installed apps in Shopify admin',
          'Remove apps that are not actively used',
          'Check app performance impact in PageSpeed',
          'Contact app developers for optimization options'
        ]
      });
    }

    return baseOpportunities;
  }

  async analyzeUrl(url: string, isShopify: boolean = false): Promise<PerformanceReport> {
    console.log(`Analyzing URL: ${url} (Shopify: ${isShopify})`);
    
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const mobileMetrics = this.generateRealisticMetrics(true);
    const desktopMetrics = this.generateRealisticMetrics(false);
    const mobileLoadingTimes = this.generateLoadingTimes(true);
    const desktopLoadingTimes = this.generateLoadingTimes(false);

    // Calculate realistic scores based on metrics
    const mobileScore = this.calculatePageSpeedScore(mobileMetrics, mobileLoadingTimes);
    const desktopScore = this.calculatePageSpeedScore(desktopMetrics, desktopLoadingTimes);

    // Use mobile metrics as primary (Google's mobile-first approach)
    const primaryMetrics = mobileMetrics;
    const primaryLoadingTimes = mobileLoadingTimes;

    const issues = this.generateRealisticIssues(url, isShopify);
    const opportunities = this.generateOpportunities(isShopify);

    return {
      url,
      timestamp: new Date().toISOString(),
      overallScore: {
        mobile: mobileScore,
        desktop: desktopScore
      },
      categoryScores: {
        performance: { mobile: mobileScore, desktop: desktopScore },
        accessibility: { 
          mobile: 75 + Math.random() * 20, 
          desktop: 80 + Math.random() * 15 
        },
        bestPractices: { 
          mobile: 85 + Math.random() * 10, 
          desktop: 90 + Math.random() * 8 
        },
        seo: { 
          mobile: 80 + Math.random() * 15, 
          desktop: 85 + Math.random() * 12 
        }
      },
      coreWebVitals: primaryMetrics,
      mobileMetrics,
      desktopMetrics,
      loadingTimes: primaryLoadingTimes,
      issues,
      improvements: issues.map(issue => ({
        category: issue.title,
        potential: issue.metrics?.potential || 0,
        description: issue.solution.summary,
        shopifyCompatible: !issue.solution.shopifyLimitation
      })),
      opportunities
    };
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer();