import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  Image, 
  Code2, 
  Network, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  ExternalLink,
  Copy,
  Eye,
  Settings
} from 'lucide-react';

interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'Performance' | 'Images' | 'JavaScript' | 'CSS' | 'Network' | 'Caching';
  priority: 'high' | 'medium' | 'low';
  impact: number; // in milliseconds
  difficulty: 'easy' | 'medium' | 'hard';
  steps: {
    step: string;
    technical: boolean;
    codeExample?: string;
    tools?: string[];
  }[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  resources: {
    title: string;
    url: string;
    type: 'documentation' | 'tool' | 'guide';
  }[];
}

interface ActionableOptimizationsProps {
  url: string;
  performanceScore: number;
  issues: Array<{
    id: string;
    title: string;
    description: string;
    metrics?: {
      potential: number;
    };
  }>;
}

const ActionableOptimizations = ({ url, performanceScore, issues }: ActionableOptimizationsProps) => {
  const optimizations: OptimizationOpportunity[] = [
    {
      id: 'image-optimization',
      title: 'Optimize Images',
      description: 'Reduce image file sizes and implement modern formats like WebP and AVIF',
      category: 'Images',
      priority: 'high',
      impact: 1200,
      difficulty: 'easy',
      steps: [
        {
          step: 'Convert images to modern formats (WebP, AVIF)',
          technical: true,
          codeExample: `<!-- Use picture element for format fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" width="800" height="600">
</picture>`,
          tools: ['Squoosh', 'ImageOptim', 'TinyPNG']
        },
        {
          step: 'Implement responsive images with srcset',
          technical: true,
          codeExample: `<img 
  src="image-800w.jpg" 
  srcset="image-400w.jpg 400w, image-800w.jpg 800w, image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Description"
  loading="lazy"
>`,
          tools: ['Responsive Breakpoints', 'Cloudinary', 'ImageKit']
        },
        {
          step: 'Add lazy loading for below-the-fold images',
          technical: false,
          codeExample: `<img src="image.jpg" alt="Description" loading="lazy">`,
          tools: ['Intersection Observer API', 'LazySizes library']
        },
        {
          step: 'Optimize image dimensions and compression',
          technical: false,
          tools: ['Photoshop', 'GIMP', 'Online compressors']
        }
      ],
      beforeAfter: {
        before: '2.4MB JPEG image causing 1.2s delay',
        after: '180KB WebP image with 0.2s load time'
      },
      resources: [
        {
          title: 'Web.dev Image Optimization',
          url: 'https://web.dev/fast/#optimize-your-images',
          type: 'guide'
        },
        {
          title: 'Squoosh - Image Compressor',
          url: 'https://squoosh.app/',
          type: 'tool'
        }
      ]
    },
    {
      id: 'eliminate-render-blocking',
      title: 'Eliminate Render-Blocking Resources',
      description: 'Optimize CSS and JavaScript loading to avoid blocking the initial render',
      category: 'Performance',
      priority: 'high',
      impact: 800,
      difficulty: 'medium',
      steps: [
        {
          step: 'Inline critical CSS in the HTML head',
          technical: true,
          codeExample: `<head>
  <style>
    /* Critical CSS for above-the-fold content */
    .hero { background: #000; color: #fff; font-size: 2rem; }
    .nav { display: flex; justify-content: space-between; }
  </style>
</head>`,
          tools: ['Critical CSS Generator', 'Penthouse', 'UnCSS']
        },
        {
          step: 'Load non-critical CSS asynchronously',
          technical: true,
          codeExample: `<!-- Async CSS loading -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>`,
          tools: ['LoadCSS polyfill']
        },
        {
          step: 'Use async/defer for JavaScript files',
          technical: true,
          codeExample: `<!-- Defer non-critical JavaScript -->
<script defer src="main.js"></script>

<!-- Async for independent scripts -->
<script async src="analytics.js"></script>`,
          tools: ['Webpack', 'Rollup', 'Parcel']
        },
        {
          step: 'Minimize CSS and JavaScript files',
          technical: true,
          tools: ['UglifyJS', 'Terser', 'cssnano', 'PurgeCSS']
        }
      ],
      beforeAfter: {
        before: 'Multiple blocking CSS/JS files causing 800ms delay',
        after: 'Critical CSS inline, async loading saves 800ms'
      },
      resources: [
        {
          title: 'Eliminate Render-Blocking Resources',
          url: 'https://web.dev/render-blocking-resources/',
          type: 'guide'
        },
        {
          title: 'Critical CSS Tools',
          url: 'https://github.com/addyosmani/critical',
          type: 'tool'
        }
      ]
    },
    {
      id: 'code-splitting',
      title: 'Implement Code Splitting',
      description: 'Split JavaScript bundles to load only what\'s needed',
      category: 'JavaScript',
      priority: 'medium',
      impact: 600,
      difficulty: 'hard',
      steps: [
        {
          step: 'Implement route-based code splitting',
          technical: true,
          codeExample: `// React Router with lazy loading
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}`,
          tools: ['React Router', 'Vue Router', 'Webpack']
        },
        {
          step: 'Use dynamic imports for feature modules',
          technical: true,
          codeExample: `// Load feature on demand
async function loadFeature() {
  const { feature } = await import('./feature-module.js');
  return feature;
}

// Use when needed
button.addEventListener('click', async () => {
  const feature = await loadFeature();
  feature.execute();
});`,
          tools: ['Webpack', 'Rollup', 'Vite']
        },
        {
          step: 'Optimize bundle splitting configuration',
          technical: true,
          codeExample: `// Webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};`,
          tools: ['Bundle Analyzer', 'Webpack Bundle Analyzer']
        }
      ],
      beforeAfter: {
        before: 'Single 2MB JavaScript bundle',
        after: 'Multiple smaller chunks loaded on-demand'
      },
      resources: [
        {
          title: 'Code Splitting Guide',
          url: 'https://webpack.js.org/guides/code-splitting/',
          type: 'documentation'
        }
      ]
    },
    {
      id: 'caching-strategy',
      title: 'Implement Browser Caching',
      description: 'Set up proper cache headers and service worker for better performance',
      category: 'Caching',
      priority: 'medium',
      impact: 400,
      difficulty: 'medium',
      steps: [
        {
          step: 'Configure HTTP cache headers',
          technical: true,
          codeExample: `<!-- Server configuration example (Apache .htaccess) -->
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>`,
          tools: ['Apache', 'Nginx', 'Cloudflare']
        },
        {
          step: 'Implement service worker for advanced caching',
          technical: true,
          codeExample: `// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// In sw.js - Cache first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});`,
          tools: ['Workbox', 'PWA Builder']
        },
        {
          step: 'Use CDN for static assets',
          technical: false,
          tools: ['Cloudflare', 'AWS CloudFront', 'KeyCDN']
        }
      ],
      beforeAfter: {
        before: 'All resources loaded from origin server',
        after: 'Cached resources reduce repeat load times by 70%'
      },
      resources: [
        {
          title: 'HTTP Caching Guide',
          url: 'https://web.dev/http-cache/',
          type: 'guide'
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'hard': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Settings className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Images': return <Image className="h-5 w-5" />;
      case 'JavaScript': return <Code2 className="h-5 w-5" />;
      case 'CSS': return <Eye className="h-5 w-5" />;
      case 'Network': return <Network className="h-5 w-5" />;
      case 'Caching': return <Download className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const totalImpact = optimizations.reduce((sum, opt) => sum + opt.impact, 0);
  const potentialSpeedUp = (totalImpact / 1000).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Actionable Performance Optimizations
          </CardTitle>
          <p className="text-muted-foreground">
            Step-by-step guide to improve your website's performance
          </p>
        </CardHeader>
        <CardContent>
          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg border">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">+{potentialSpeedUp}s</div>
              <div className="text-sm text-muted-foreground">Potential Speed Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{optimizations.length}</div>
              <div className="text-sm text-muted-foreground">Optimization Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{performanceScore}</div>
              <div className="text-sm text-muted-foreground">Current Performance Score</div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Optimizations</TabsTrigger>
              <TabsTrigger value="high">High Priority</TabsTrigger>
              <TabsTrigger value="quick">Quick Wins</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {optimizations.map((optimization, index) => (
                <motion.div
                  key={optimization.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(optimization.category)}
                          <div>
                            <CardTitle className="text-lg">{optimization.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {optimization.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getPriorityColor(optimization.priority)}>
                            {optimization.priority} priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                            <TrendingUp className="h-3 w-3" />
                            +{(optimization.impact / 1000).toFixed(1)}s
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Difficulty and Impact */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon(optimization.difficulty)}
                          <span className="text-sm font-medium">
                            {optimization.difficulty} difficulty
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Category: {optimization.category}
                        </div>
                      </div>

                      {/* Before/After */}
                      {optimization.beforeAfter && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="text-xs font-medium text-red-700 mb-1">BEFORE</div>
                            <div className="text-sm text-red-800">
                              {optimization.beforeAfter.before}
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-xs font-medium text-green-700 mb-1">AFTER</div>
                            <div className="text-sm text-green-800">
                              {optimization.beforeAfter.after}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Implementation Steps */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Implementation Steps:</h4>
                        {optimization.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
                                {stepIndex + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{step.step}</div>
                                {step.technical && (
                                  <Badge variant="outline" className="text-xs mt-1">
                                    Technical
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {step.codeExample && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium text-gray-600">
                                    Code Example:
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(step.codeExample!)}
                                    className="h-6 px-2 text-xs"
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                                  <code>{step.codeExample}</code>
                                </pre>
                              </div>
                            )}
                            
                            {step.tools && step.tools.length > 0 && (
                              <div className="mt-3">
                                <span className="text-xs font-medium text-gray-600">
                                  Recommended Tools:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {step.tools.map((tool, toolIndex) => (
                                    <Badge key={toolIndex} variant="secondary" className="text-xs">
                                      {tool}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Resources */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-sm mb-3">Additional Resources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {optimization.resources.map((resource, resourceIndex) => (
                            <Button
                              key={resourceIndex}
                              variant="outline"
                              size="sm"
                              asChild
                              className="h-8 text-xs"
                            >
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {resource.title}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="high" className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  High priority optimizations that will have the biggest impact on your performance score.
                </AlertDescription>
              </Alert>
              {optimizations
                .filter(opt => opt.priority === 'high')
                .map((optimization, index) => (
                  <Card key={optimization.id} className="border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        {getCategoryIcon(optimization.category)}
                        {optimization.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Impact: +{(optimization.impact / 1000).toFixed(1)}s improvement
                      </p>
                    </CardHeader>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="quick" className="space-y-6">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Easy optimizations that can be implemented quickly with minimal technical knowledge.
                </AlertDescription>
              </Alert>
              {optimizations
                .filter(opt => opt.difficulty === 'easy')
                .map((optimization, index) => (
                  <Card key={optimization.id} className="border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        {getCategoryIcon(optimization.category)}
                        {optimization.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Difficulty: {optimization.difficulty} | Impact: +{(optimization.impact / 1000).toFixed(1)}s
                      </p>
                    </CardHeader>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Advanced optimizations that require technical expertise but offer significant performance gains.
                </AlertDescription>
              </Alert>
              {optimizations
                .filter(opt => opt.difficulty === 'hard')
                .map((optimization, index) => (
                  <Card key={optimization.id} className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        {getCategoryIcon(optimization.category)}
                        {optimization.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        High impact: +{(optimization.impact / 1000).toFixed(1)}s | Requires technical skills
                      </p>
                    </CardHeader>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActionableOptimizations; 