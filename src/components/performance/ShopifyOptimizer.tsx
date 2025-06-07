import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Code,
  Zap,
  Settings,
  ExternalLink,
  Download
} from 'lucide-react';

interface ShopifyOptimizerProps {
  opportunities: Array<{
    id: string;
    title: string;
    description: string;
    potential: number;
    difficulty: 'easy' | 'medium' | 'hard';
    shopifyCompatible: boolean;
    steps: string[];
  }>;
  issues: Array<{
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

const ShopifyOptimizer = ({ opportunities, issues }: ShopifyOptimizerProps) => {
  const shopifyCompatibleOpportunities = opportunities.filter(opp => opp.shopifyCompatible);
  const shopifyLimitedOpportunities = opportunities.filter(opp => !opp.shopifyCompatible);
  
  const shopifyLimitations = issues.filter(issue => issue.solution.shopifyLimitation);
  const shopifyOptimizable = issues.filter(issue => !issue.solution.shopifyLimitation);

  const shopifySpecificTips = [
    {
      category: 'Theme Optimization',
      tips: [
        'Use Shopify\'s Online Store 2.0 themes for better performance',
        'Minimize the number of theme sections and blocks',
        'Optimize Liquid template loops and reduce database queries',
        'Use theme inspector to identify slow Liquid code'
      ],
      icon: Settings
    },
    {
      category: 'App Management',
      tips: [
        'Regularly audit installed apps and remove unused ones',
        'Choose apps with good performance ratings',
        'Avoid apps that inject scripts into every page',
        'Use Shopify Plus for advanced script management'
      ],
      icon: ShoppingBag
    },
    {
      category: 'Image Optimization',
      tips: [
        'Use Shopify\'s automatic image optimization',
        'Implement responsive images with img_url filters',
        'Use lazy loading for product galleries',
        'Optimize alt text for SEO and accessibility'
      ],
      icon: Download
    },
    {
      category: 'Code Optimization',
      tips: [
        'Minimize custom JavaScript and CSS',
        'Use CSS variables for consistent theming',
        'Implement progressive web app features',
        'Optimize checkout flow for conversions'
      ],
      icon: Code
    }
  ];

  const impossibleOptimizations = [
    {
      optimization: 'Server-side rendering control',
      reason: 'Shopify controls the server infrastructure and rendering process',
      impact: 'Medium',
      alternative: 'Focus on client-side optimizations and theme structure'
    },
    {
      optimization: 'Custom CDN configuration',
      reason: 'Shopify uses its own global CDN that cannot be replaced',
      impact: 'Low',
      alternative: 'Leverage Shopify\'s CDN effectively with proper asset optimization'
    },
    {
      optimization: 'Database query optimization',
      reason: 'No direct access to database queries or server configuration',
      impact: 'Medium',
      alternative: 'Optimize Liquid template logic and reduce API calls'
    },
    {
      optimization: 'Custom compression settings',
      reason: 'Server compression settings are managed by Shopify',
      impact: 'Low',
      alternative: 'Focus on asset minification and reducing payload sizes'
    },
    {
      optimization: 'Service worker implementation',
      reason: 'Limited control over service worker registration in checkout',
      impact: 'Medium',
      alternative: 'Implement PWA features in theme areas with full control'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-600" />
            Shopify Performance Optimization
          </CardTitle>
          <p className="text-muted-foreground">
            Platform-specific recommendations and limitations for Shopify stores
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="limitations">Limitations</TabsTrigger>
              <TabsTrigger value="tips">Pro Tips</TabsTrigger>
              <TabsTrigger value="impossible">Impossible</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Shopify-Compatible Optimizations
                </h3>
                
                {shopifyCompatibleOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{opportunity.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {opportunity.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getDifficultyColor(opportunity.difficulty)}>
                              {opportunity.difficulty}
                            </Badge>
                            <span className="text-sm font-semibold text-green-600">
                              +{(opportunity.potential / 1000).toFixed(1)}s
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Implementation Steps:</h5>
                          <ul className="text-sm space-y-1">
                            {opportunity.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {shopifyLimitedOpportunities.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Limited Control on Shopify
                    </h3>
                    
                    {shopifyLimitedOpportunities.map((opportunity, index) => (
                      <Card key={opportunity.id} className="border-red-200 bg-red-50/30">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-red-800">{opportunity.title}</h4>
                              <p className="text-sm text-red-600 mb-2">
                                {opportunity.description}
                              </p>
                            </div>
                            <Badge variant="destructive">Limited</Badge>
                          </div>
                          
                          <Alert className="border-red-200">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              This optimization has limited implementation options on Shopify. 
                              Focus on available alternatives and theme-level optimizations.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="limitations" className="space-y-4">
              {shopifyLimitations.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-yellow-200 bg-yellow-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-800">{issue.title}</h4>
                          <p className="text-sm text-yellow-700 mb-3">{issue.description}</p>
                          
                          {issue.solution.shopifyAlternative && (
                            <div className="bg-yellow-100 p-3 rounded-lg">
                              <h5 className="text-sm font-medium text-yellow-800 mb-2">
                                Shopify Alternative:
                              </h5>
                              <p className="text-sm text-yellow-700">
                                {issue.solution.shopifyAlternative}
                              </p>
                            </div>
                          )}
                        </div>
                        {issue.metrics?.potential && (
                          <div className="text-right">
                            <span className="text-sm text-yellow-600 font-medium">
                              Impact: +{(issue.metrics.potential / 1000).toFixed(1)}s
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              {shopifySpecificTips.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <category.icon className="h-5 w-5 text-primary" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-3">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="impossible" className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  These optimizations are not possible on Shopify due to platform limitations. 
                  Focus on the suggested alternatives instead.
                </AlertDescription>
              </Alert>

              {impossibleOptimizations.map((item, index) => (
                <motion.div
                  key={item.optimization}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-red-800 flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            {item.optimization}
                          </h4>
                          <p className="text-sm text-red-600 mt-1">{item.reason}</p>
                        </div>
                        <Badge variant="outline" className={getImpactColor(item.impact)}>
                          {item.impact} Impact
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-800 mb-1">Alternative:</h5>
                        <p className="text-sm text-gray-700">{item.alternative}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://shopify.dev/themes/performance" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Shopify Performance Docs
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://shopify.dev/themes/tools/theme-inspector" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Theme Inspector
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://apps.shopify.com/categories/store-design-page-speed" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Performance Apps
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShopifyOptimizer; 