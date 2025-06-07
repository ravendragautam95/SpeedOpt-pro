import { performanceAnalyzer, PerformanceReport, CoreWebVitals } from './performanceAnalyzer';
import { lighthouseService } from './lighthouseService';

export interface PerformanceCategory {
  id: string;
  name: string;
  score: number;
  icon: string;
  color: string;
  description: string;
  detailedExplanation: string;
  commonIssues: {
    issue: string;
    solution: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    impact: 'high' | 'medium' | 'low';
    metrics: {
      name: string;
      value: number;
      unit: string;
    }[];
  }[];
  improvementSteps: {
    step: string;
    explanation: string;
    codeExample?: string;
    impact: {
      score: number;
      metrics: {
        name: string;
        improvement: string;
      }[];
    };
  }[];
  loadingTimes: {
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    timeToInteractive: number;
    totalBlockingTime: number;
    domContentLoaded?: number;
    domComplete?: number;
    resourceCount?: number;
    totalSize?: number;
  };
  metrics: {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    threshold: {
      good: number;
      needsImprovement: number;
    };
    description: string;
  }[];
}

// Mobile/Desktop specific data interface for the new tabs component
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

export interface PerformanceData {
  categories: PerformanceCategory[];
  lastUpdated: string;
  overallScore: {
    mobile: number;
    desktop: number;
  };
  previousScore: {
    mobile: number;
    desktop: number;
  };
  trend: 'improving' | 'declining' | 'stable';
  summary: {
    url: string;
    device: 'mobile' | 'desktop';
    timestamp: string;
    version: string;
  };
  diagnostics: {
    categories: {
      id: string;
      name: string;
      items: {
        id: string;
        title: string;
        description: string;
        impact: 'high' | 'medium' | 'low';
        metrics: {
          name: string;
          value: number;
          unit: string;
        }[];
      }[];
    }[];
  };
  // Enhanced data for AdvancedMetricsCard
  advancedMetrics: {
    overview: {
      performanceScore: number;
      accessibilityScore: number;
      bestPracticesScore: number;
      seoScore: number;
    };
    trends: Array<{
      date: string;
      mobile: number;
      desktop: number;
      lcp: number;
      fid: number;
      cls: number;
    }>;
    devices: {
      mobile: {
        score: number;
        issues: number;
        trend: 'up' | 'down' | 'stable';
      };
      desktop: {
        score: number;
        issues: number;
        trend: 'up' | 'down' | 'stable';
      };
    };
    coreWebVitals: {
      lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable'; };
      fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable'; };
      cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable'; };
      ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable'; };
    };
  };
  // Mobile and Desktop specific data
  mobile?: MobileDesktopData;
  desktop?: MobileDesktopData;
  opportunities?: Array<{
    id: string;
    title: string;
    description: string;
    potential: number;
    difficulty: 'easy' | 'medium' | 'hard';
    shopifyCompatible: boolean;
    steps: string[];
  }>;
  issues?: Array<{
    id: string;
    title: string;
    description: string;
    solution: {
      shopifyLimitation?: boolean;
      shopifyAlternative?: string;
      steps: string[];
    };
    metrics?: {
      potential: number;
    };
  }>;
}

// Generate mock historical data for trends
const generateHistoricalData = (baseScore: { mobile: number; desktop: number }) => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some realistic variance to the scores
    const mobileVariance = (Math.random() - 0.5) * 20;
    const desktopVariance = (Math.random() - 0.5) * 15;
    
    data.push({
      date: date.toISOString().split('T')[0],
      mobile: Math.max(0, Math.min(100, baseScore.mobile + mobileVariance)),
      desktop: Math.max(0, Math.min(100, baseScore.desktop + desktopVariance)),
      lcp: Math.random() * 3000 + 1000, // 1-4 seconds
      fid: Math.random() * 200 + 50,    // 50-250ms
      cls: Math.random() * 0.3,         // 0-0.3
    });
  }
  
  return data;
};

export const performanceService = {
  async fetchPerformanceData(url: string, isShopify: boolean = false): Promise<PerformanceData> {
    try {
      console.log('Fetching performance data for URL:', url, 'Shopify:', isShopify);
      
      // Try to get real data from Lighthouse CLI first
      let report: PerformanceReport;
      try {
        console.log('🔍 Attempting to fetch real Lighthouse data for:', url);
        const lighthouseData = await lighthouseService.getPerformanceReport(url, isShopify);
        console.log('📊 Lighthouse CLI raw response:', lighthouseData);
        
        // Use Lighthouse data directly as it already matches our PerformanceReport format
        report = lighthouseData;
        
        // Ensure required arrays and objects exist
        if (!report.issues) report.issues = [];
        if (!report.improvements) report.improvements = [];
        if (!report.opportunities) report.opportunities = [];
        if (!report.mobileMetrics) report.mobileMetrics = report.coreWebVitals;
        if (!report.desktopMetrics) report.desktopMetrics = report.coreWebVitals;
        
        // Ensure Core Web Vitals have all required properties
        if (!report.coreWebVitals) {
          report.coreWebVitals = {
            lcp: { value: 2500, rating: 'poor', displayValue: '2.5s' },
            fid: { value: 100, rating: 'poor', displayValue: '100ms' },
            cls: { value: 0.1, rating: 'poor', displayValue: '0.1' },
            ttfb: { value: 600, rating: 'poor', displayValue: '600ms' }
          };
        }
        
        // Ensure loading times exist
        if (!report.loadingTimes) {
          report.loadingTimes = {
            firstPaint: 1000,
            firstContentfulPaint: 1200,
            largestContentfulPaint: 2500,
            timeToInteractive: 3000,
            totalBlockingTime: 200,
            speedIndex: 2000,
            cumulativeLayoutShift: 0.1
          };
        }
        
        console.log('✅ Successfully fetched real Lighthouse data');
        report.dataSource = 'lighthouse-cli';
      } catch (apiError) {
        console.warn('⚠️ Lighthouse CLI failed, falling back to mock data:', apiError);
        console.log('Error details:', apiError instanceof Error ? apiError.message : apiError);
        // Fallback to mock analyzer if API fails
        report = await performanceAnalyzer.analyzeUrl(url, isShopify);
        report.dataSource = 'fallback';
      }
      
      console.log('Processed performance data:', {
        url: report.url,
        dataSource: report.dataSource,
        overallScore: report.overallScore,
        hasIssues: !!report.issues && report.issues.length > 0,
        hasImprovements: !!report.improvements && report.improvements.length > 0,
        hasOpportunities: !!report.opportunities && report.opportunities.length > 0
      });

      // Generate historical data for trends
      const historicalData = generateHistoricalData(report.overallScore);

      // Calculate device-specific metrics
      const deviceMetrics = {
        mobile: {
          score: report.overallScore.mobile,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable',
          issues: report.issues.filter(issue => issue.severity === 'high').length + 
                   Math.floor(Math.random() * 3)
        },
        desktop: {
          score: report.overallScore.desktop,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable',
          issues: Math.floor(report.issues.length * 0.6)
        }
      };

      // Enhanced Core Web Vitals with trends
      const enhancedCoreWebVitals = {
        lcp: {
          value: report.coreWebVitals.lcp.value,
          rating: report.coreWebVitals.lcp.rating,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable'
        },
        fid: {
          value: report.coreWebVitals.fid.value,
          rating: report.coreWebVitals.fid.rating,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable'
        },
        cls: {
          value: report.coreWebVitals.cls.value,
          rating: report.coreWebVitals.cls.rating,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable'
        },
        ttfb: {
          value: report.coreWebVitals.ttfb.value,
          rating: report.coreWebVitals.ttfb.rating,
          trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down' as 'up' | 'down' | 'stable'
        }
      };

      // Transform the analysis into our dashboard format
      const categories: PerformanceCategory[] = [
        {
          id: 'performance',
          name: 'Performance',
          score: report.overallScore.mobile,
          icon: 'Rocket',
          color: 'bg-blue-500',
          description: 'Page load speed and runtime performance',
          detailedExplanation: `Performance measures how quickly your website loads and responds to user interactions. Current metrics:
            - Largest Contentful Paint (LCP): ${report.coreWebVitals.lcp.value}ms
            - First Input Delay (FID): ${report.coreWebVitals.fid.value}ms
            - Cumulative Layout Shift (CLS): ${report.coreWebVitals.cls.value}
            - Time to First Byte (TTFB): ${report.coreWebVitals.ttfb.value}ms`,
          commonIssues: (report.issues || []).map(issue => ({
            issue: issue.title,
            solution: issue.solution?.summary || 'No solution available',
            difficulty: issue.severity === 'high' ? 'advanced' : issue.severity === 'medium' ? 'intermediate' : 'beginner',
            impact: issue.severity === 'high' ? 'high' : issue.severity === 'medium' ? 'medium' : 'low',
            metrics: [{
              name: issue.title,
              value: issue.metrics?.current || 0,
              unit: issue.metrics?.unit || 'ms'
            }]
          })),
          improvementSteps: (report.improvements || []).map(improvement => ({
            step: improvement.category,
            explanation: improvement.description,
            codeExample: undefined,
            impact: {
              score: improvement.potential || 0,
              metrics: [{
                name: improvement.category,
                improvement: improvement.description
              }]
            }
          })),
          loadingTimes: {
            firstPaint: report.loadingTimes.firstPaint,
            firstContentfulPaint: report.loadingTimes.firstContentfulPaint,
            largestContentfulPaint: report.loadingTimes.largestContentfulPaint,
            timeToInteractive: report.loadingTimes.timeToInteractive,
            totalBlockingTime: report.loadingTimes.totalBlockingTime,
            domContentLoaded: 1200 + Math.random() * 800, // Simulated value
            domComplete: 1500 + Math.random() * 1000, // Simulated value
            resourceCount: Math.floor(20 + Math.random() * 50), // Simulated value
            totalSize: Math.floor(1000 + Math.random() * 3000) // Simulated value in KB
          },
          metrics: [
            {
              name: 'Largest Contentful Paint',
              value: report.coreWebVitals.lcp.value,
              rating: report.coreWebVitals.lcp.rating,
              threshold: {
                good: 2500,
                needsImprovement: 4000
              },
              description: 'Time until the largest content element is rendered'
            },
            {
              name: 'First Input Delay',
              value: report.coreWebVitals.fid.value,
              rating: report.coreWebVitals.fid.rating,
              threshold: {
                good: 100,
                needsImprovement: 300
              },
              description: 'Time until the page becomes interactive'
            },
            {
              name: 'Cumulative Layout Shift',
              value: report.coreWebVitals.cls.value,
              rating: report.coreWebVitals.cls.rating,
              threshold: {
                good: 0.1,
                needsImprovement: 0.25
              },
              description: 'Measures visual stability of the page'
            },
            {
              name: 'Time to First Byte',
              value: report.coreWebVitals.ttfb.value,
              rating: report.coreWebVitals.ttfb.rating,
              threshold: {
                good: 200,
                needsImprovement: 600
              },
              description: 'Time until the first byte of the response is received'
            }
          ]
        },
        {
          id: 'accessibility',
          name: 'Accessibility',
          score: report.coreWebVitals.cls.rating === 'good' ? 90 : report.coreWebVitals.cls.rating === 'needs-improvement' ? 60 : 30,
          icon: 'Accessibility',
          color: 'bg-green-500',
          description: 'How accessible your site is to users with disabilities',
          detailedExplanation: 'Accessibility ensures your website can be used by people with disabilities. It includes proper ARIA labels, keyboard navigation, and sufficient color contrast.',
          commonIssues: [
            {
              issue: 'Missing alt text on images',
              solution: 'Add descriptive alt text to all images',
              difficulty: 'beginner',
              impact: 'medium',
              metrics: [{
                name: 'Image Accessibility',
                value: 0,
                unit: 'count'
              }]
            },
            {
              issue: 'Poor color contrast',
              solution: 'Ensure text has sufficient contrast with background',
              difficulty: 'beginner',
              impact: 'high',
              metrics: [{
                name: 'Color Contrast',
                value: 0,
                unit: 'ratio'
              }]
            }
          ],
          improvementSteps: [
            {
              step: 'Add Alt Text',
              explanation: 'Include descriptive alt text for all images',
              codeExample: '<img src="image.jpg" alt="A red car parked in front of a building">',
              impact: {
                score: 10,
                metrics: [{
                  name: 'Image Accessibility',
                  improvement: 'Add alt text to all images'
                }]
              }
            },
            {
              step: 'Improve Color Contrast',
              explanation: 'Use tools like WebAIM Contrast Checker to verify contrast ratios',
              impact: {
                score: 15,
                metrics: [{
                  name: 'Color Contrast',
                  improvement: 'Ensure all text meets WCAG 2.1 contrast requirements'
                }]
              }
            }
          ],
          loadingTimes: {
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            timeToInteractive: 0,
            totalBlockingTime: 0
          },
          metrics: []
        },
        {
          id: 'best-practices',
          name: 'Best Practices',
          score: report.coreWebVitals.fid.rating === 'good' ? 90 : report.coreWebVitals.fid.rating === 'needs-improvement' ? 60 : 30,
          icon: 'Shield',
          color: 'bg-purple-500',
          description: 'General web development best practices',
          detailedExplanation: 'Best practices ensure your website follows modern web development standards and security guidelines.',
          commonIssues: [
            {
              issue: 'Missing meta tags',
              solution: 'Add essential meta tags for SEO and social sharing',
              difficulty: 'beginner',
              impact: 'medium',
              metrics: [{
                name: 'Meta Tags',
                value: 0,
                unit: 'count'
              }]
            },
            {
              issue: 'Insecure content',
              solution: 'Use HTTPS for all resources',
              difficulty: 'beginner',
              impact: 'high',
              metrics: [{
                name: 'Security',
                value: 0,
                unit: 'count'
              }]
            }
          ],
          improvementSteps: [
            {
              step: 'Add Meta Tags',
              explanation: 'Include essential meta tags in your HTML head',
              codeExample: '<meta name="description" content="Your site description">',
              impact: {
                score: 10,
                metrics: [{
                  name: 'Meta Tags',
                  improvement: 'Add essential meta tags'
                }]
              }
            },
            {
              step: 'Enable HTTPS',
              explanation: 'Ensure all resources are loaded over HTTPS',
              impact: {
                score: 20,
                metrics: [{
                  name: 'Security',
                  improvement: 'Convert all HTTP resources to HTTPS'
                }]
              }
            }
          ],
          loadingTimes: {
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            timeToInteractive: 0,
            totalBlockingTime: 0
          },
          metrics: []
        },
        {
          id: 'seo',
          name: 'SEO',
          score: report.coreWebVitals.lcp.rating === 'good' ? 90 : report.coreWebVitals.lcp.rating === 'needs-improvement' ? 60 : 30,
          icon: 'Search',
          color: 'bg-yellow-500',
          description: 'Search engine optimization and discoverability',
          detailedExplanation: 'SEO helps search engines understand and rank your website. It includes proper meta tags, semantic HTML, and mobile-friendliness.',
          commonIssues: [
            {
              issue: 'Missing title tags',
              solution: 'Add unique, descriptive title tags to each page',
              difficulty: 'beginner',
              impact: 'high',
              metrics: [{
                name: 'Title Tags',
                value: 0,
                unit: 'count'
              }]
            },
            {
              issue: 'Poor mobile optimization',
              solution: 'Implement responsive design and mobile-friendly features',
              difficulty: 'beginner',
              impact: 'high',
              metrics: [{
                name: 'Mobile Optimization',
                value: 0,
                unit: 'score'
              }]
            }
          ],
          improvementSteps: [
            {
              step: 'Add Title Tags',
              explanation: 'Include descriptive title tags for each page',
              codeExample: '<title>Your Page Title | Your Brand</title>',
              impact: {
                score: 15,
                metrics: [{
                  name: 'Title Tags',
                  improvement: 'Add unique title tags to all pages'
                }]
              }
            },
            {
              step: 'Implement Responsive Design',
              explanation: 'Use media queries to ensure mobile compatibility',
              impact: {
                score: 20,
                metrics: [{
                  name: 'Mobile Optimization',
                  improvement: 'Implement responsive design patterns'
                }]
              }
            }
          ],
          loadingTimes: {
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            timeToInteractive: 0,
            totalBlockingTime: 0
          },
          metrics: []
        }
      ];

      // Calculate previous scores (simulated)
      const previousScore = {
        mobile: Math.max(0, report.overallScore.mobile + (Math.random() - 0.5) * 20),
        desktop: Math.max(0, report.overallScore.desktop + (Math.random() - 0.5) * 15)
      };

      // Determine trend
      const mobileTrend = report.overallScore.mobile - previousScore.mobile;
      const desktopTrend = report.overallScore.desktop - previousScore.desktop;
      const avgTrend = (mobileTrend + desktopTrend) / 2;
      
      const trend: 'improving' | 'declining' | 'stable' = 
        avgTrend > 5 ? 'improving' : 
        avgTrend < -5 ? 'declining' : 'stable';

      return {
        categories,
        lastUpdated: new Date().toISOString(),
        overallScore: report.overallScore,
        previousScore,
        trend,
        summary: {
          url,
          device: 'mobile',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        },
        diagnostics: {
          categories: [{
            id: 'performance-issues',
            name: 'Performance Issues',
            items: report.issues.map(issue => ({
              id: issue.title.toLowerCase().replace(/\s+/g, '-'),
              title: issue.title,
              description: issue.solution.summary,
              impact: issue.severity === 'high' ? 'high' : issue.severity === 'medium' ? 'medium' : 'low',
              metrics: [{
                name: issue.title,
                value: issue.metrics?.current || 0,
                unit: issue.metrics?.unit || 'ms'
              }]
            }))
          }]
        },
        // Enhanced metrics for AdvancedMetricsCard
        advancedMetrics: {
          overview: {
            performanceScore: report.overallScore.mobile,
            accessibilityScore: report.coreWebVitals.cls.rating === 'good' ? 90 : report.coreWebVitals.cls.rating === 'needs-improvement' ? 60 : 30,
            bestPracticesScore: report.coreWebVitals.fid.rating === 'good' ? 90 : report.coreWebVitals.fid.rating === 'needs-improvement' ? 60 : 30,
            seoScore: report.coreWebVitals.lcp.rating === 'good' ? 90 : report.coreWebVitals.lcp.rating === 'needs-improvement' ? 60 : 30
          },
          trends: historicalData,
          devices: deviceMetrics,
          coreWebVitals: enhancedCoreWebVitals
        },
        // Mobile and Desktop specific data from Lighthouse
        mobile: report.mobile ? {
          categoryScores: report.mobile.categoryScores,
          coreWebVitals: report.mobile.coreWebVitals,
          loadingTimes: report.mobile.loadingTimes,
          opportunities: report.mobile.opportunities
        } : undefined,
        desktop: report.desktop ? {
          categoryScores: report.desktop.categoryScores,
          coreWebVitals: report.desktop.coreWebVitals,
          loadingTimes: report.desktop.loadingTimes,
          opportunities: report.desktop.opportunities
        } : undefined,
        opportunities: report.opportunities,
        issues: report.issues
      };
    } catch (error) {
      console.error('Error fetching performance data:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes('map')) {
          console.error('❌ Array mapping error - likely missing or null array in response data');
        }
        if (error.message.includes('Cannot read properties of undefined')) {
          console.error('❌ Property access error - missing required property in data structure');
        }
      }
      
      throw new Error('Failed to analyze website performance. Please check the URL and try again.');
    }
  }
}; 