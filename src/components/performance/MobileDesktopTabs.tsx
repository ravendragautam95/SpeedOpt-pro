import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Smartphone, 
  Monitor, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShoppingBag,
  Settings
} from 'lucide-react';

interface MobileDesktopData {
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

interface MobileDesktopTabsProps {
  mobile: MobileDesktopData;
  desktop: MobileDesktopData;
  isShopify: boolean;
}

export default function MobileDesktopTabs({ mobile, desktop, isShopify }: MobileDesktopTabsProps) {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('mobile');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  const getRatingColor = (rating: string) => {
    switch (rating?.toLowerCase()) {
      case 'good': return 'text-green-600';
      case 'needs improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const CategoryScores = ({ data }: { data: MobileDesktopData }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className={`text-2xl font-bold ${getScoreColor(data.categoryScores.performance)}`}>
            {data.categoryScores.performance}
          </div>
          <div className="text-sm text-muted-foreground">Performance</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className={`text-2xl font-bold ${getScoreColor(data.categoryScores.accessibility)}`}>
            {data.categoryScores.accessibility}
          </div>
          <div className="text-sm text-muted-foreground">Accessibility</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className={`text-2xl font-bold ${getScoreColor(data.categoryScores.bestPractices)}`}>
            {data.categoryScores.bestPractices}
          </div>
          <div className="text-sm text-muted-foreground">Best Practices</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className={`text-2xl font-bold ${getScoreColor(data.categoryScores.seo)}`}>
            {data.categoryScores.seo}
          </div>
          <div className="text-sm text-muted-foreground">SEO</div>
        </CardContent>
      </Card>
    </div>
  );

  const CoreWebVitalsCard = ({ data }: { data: MobileDesktopData }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Core Web Vitals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-lg font-semibold ${getRatingColor(data.coreWebVitals.lcp.rating)}`}>
              {formatTime(data.coreWebVitals.lcp.value)}
            </div>
            <div className="text-sm text-muted-foreground">LCP</div>
            <Badge variant="outline" className="text-xs mt-1">
              {data.coreWebVitals.lcp.rating}
            </Badge>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getRatingColor(data.coreWebVitals.fid.rating)}`}>
              {formatTime(data.coreWebVitals.fid.value)}
            </div>
            <div className="text-sm text-muted-foreground">FID</div>
            <Badge variant="outline" className="text-xs mt-1">
              {data.coreWebVitals.fid.rating}
            </Badge>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getRatingColor(data.coreWebVitals.cls.rating)}`}>
              {data.coreWebVitals.cls.value.toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">CLS</div>
            <Badge variant="outline" className="text-xs mt-1">
              {data.coreWebVitals.cls.rating}
            </Badge>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getRatingColor(data.coreWebVitals.ttfb.rating)}`}>
              {formatTime(data.coreWebVitals.ttfb.value)}
            </div>
            <div className="text-sm text-muted-foreground">TTFB</div>
            <Badge variant="outline" className="text-xs mt-1">
              {data.coreWebVitals.ttfb.rating}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OpportunitiesCard = ({ data, device }: { data: MobileDesktopData; device: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Optimization Opportunities ({data.opportunities.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.opportunities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold mb-2">Excellent Performance!</h3>
            <p>No major optimization opportunities found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.opportunities.slice(0, 5).map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedOpportunity(
                  selectedOpportunity === opportunity.id ? null : opportunity.id
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{opportunity.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {opportunity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge className={getDifficultyColor(opportunity.difficulty)}>
                      {opportunity.difficulty}
                    </Badge>
                    {opportunity.shopifyCompatible && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Shopify
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Potential: {formatTime(opportunity.potential)} saved</span>
                  <span>Score: {opportunity.score}/100</span>
                </div>

                <AnimatePresence>
                  {selectedOpportunity === opportunity.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            {isShopify ? 'Shopify Solutions' : 'General Solutions'}
                          </h5>
                          <ul className="space-y-1">
                            {(isShopify ? opportunity.shopifySteps : opportunity.solutions).map((solution, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {!isShopify && opportunity.shopifyCompatible && (
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <h6 className="font-medium text-xs text-orange-800 mb-1">
                              Shopify-Specific Steps:
                            </h6>
                            <ul className="space-y-1">
                              {opportunity.shopifySteps.map((step, index) => (
                                <li key={index} className="text-xs text-orange-700 flex items-start gap-2">
                                  <span className="text-orange-500 mt-1">•</span>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            
            {data.opportunities.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" size="sm">
                  View All {data.opportunities.length} Opportunities
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mobile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CategoryScores data={mobile} />
            <CoreWebVitalsCard data={mobile} />
            <OpportunitiesCard data={mobile} device="mobile" />
          </motion.div>
        </TabsContent>

        <TabsContent value="desktop" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CategoryScores data={desktop} />
            <CoreWebVitalsCard data={desktop} />
            <OpportunitiesCard data={desktop} device="desktop" />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 