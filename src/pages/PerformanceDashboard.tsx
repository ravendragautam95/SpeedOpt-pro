import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/performance/HeroSection';
import CoreWebVitals from '../components/performance/CoreWebVitals';
import LoadingTimeline from '../components/performance/LoadingTimeline';
import ImprovementPreview from '../components/performance/ImprovementPreview';
import ExportButton from '../components/performance/ExportButton';
import AdvancedMetricsCard from '../components/performance/AdvancedMetricsCard';
import ShopifyOptimizer from '../components/performance/ShopifyOptimizer';
import ActionableOptimizations from '../components/performance/ActionableOptimizations';
import MobileDesktopTabs from '../components/performance/MobileDesktopTabs';
import { performanceService, PerformanceData } from '../services/performanceService';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
  Store
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [url, setUrl] = useState('');
  const [isShopify, setIsShopify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      // Auto-detect Shopify if not manually set
      const isShopifyStore = isShopify || url.includes('.myshopify.com') || url.includes('shopify');
      
      const data = await performanceService.fetchPerformanceData(url, isShopifyStore);
      setPerformanceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze website performance');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Auto-detect Shopify stores
    if (newUrl.includes('.myshopify.com') || newUrl.includes('shopify')) {
      setIsShopify(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with URL Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div className="relative">
                  <Globe className="h-12 w-12 text-primary" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1"
                  >
                    <Zap className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4">
                Website Performance Analyzer
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Get comprehensive insights into your website's performance with real-time analysis, 
                Core Web Vitals tracking, and actionable optimization recommendations.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="outline" className="text-sm">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Core Web Vitals
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Performance Trends
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  Real-time Analysis
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  Shopify Optimized
                </Badge>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="url"
                      placeholder="Enter website URL (e.g., https://example.com)"
                      value={url}
                      onChange={handleUrlChange}
                      className="flex-1 h-12 text-lg"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !url}
                      size="lg"
                      className="px-8"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Zap className="h-4 w-4" />
                          </motion.div>
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Performance'
                      )}
                    </Button>
                  </div>

                  {/* Shopify Toggle */}
                  <div className="flex items-center justify-center space-x-3 pt-4 border-t">
                    <Store className="h-4 w-4 text-orange-600" />
                    <Label htmlFor="shopify-mode" className="text-sm font-medium">
                      Shopify Store
                    </Label>
                    <Switch
                      id="shopify-mode"
                      checked={isShopify}
                      onCheckedChange={setIsShopify}
                      disabled={isLoading}
                    />
                    {isShopify && (
                      <Badge variant="secondary" className="text-xs">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Platform-specific analysis
                      </Badge>
                    )}
                  </div>
                  
                  {url && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground text-left"
                    >
                      Ready to analyze: <span className="font-mono text-primary">{url}</span>
                      {isShopify && (
                        <span className="ml-2 text-orange-600">
                          (Shopify-optimized analysis)
                        </span>
                      )}
                    </motion.p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <Zap className="h-16 w-16 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">
                {isShopify ? 'Analyzing Shopify Store Performance' : 'Analyzing Performance'}
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                {isShopify 
                  ? 'Running Shopify-specific tests on Core Web Vitals, app impact, and platform optimizations...'
                  : 'Running comprehensive tests on Core Web Vitals, loading times, and optimization opportunities...'
                }
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <h3 className="font-semibold text-destructive">Analysis Failed</h3>
                      <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          {performanceData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Badge 
                        variant={getScoreBadgeVariant(performanceData.overallScore.mobile)}
                        className="text-lg px-3 py-1"
                      >
                        {performanceData.overallScore.mobile}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">Mobile Score</h3>
                    <p className="text-sm text-muted-foreground">Performance rating</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Badge 
                        variant={getScoreBadgeVariant(performanceData.overallScore.desktop)}
                        className="text-lg px-3 py-1"
                      >
                        {performanceData.overallScore.desktop}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">Desktop Score</h3>
                    <p className="text-sm text-muted-foreground">Performance rating</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {performanceData.trend === 'improving' ? '↗️' : 
                         performanceData.trend === 'declining' ? '↘️' : '→'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">Trend</h3>
                    <p className="text-sm text-muted-foreground capitalize">{performanceData.trend}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile/Desktop Performance Tabs */}
              {performanceData.mobile && performanceData.desktop && (
                <MobileDesktopTabs 
                  mobile={performanceData.mobile}
                  desktop={performanceData.desktop}
                  isShopify={isShopify}
                />
              )}

              {/* Shopify-specific optimization section */}
              {isShopify && (
                <ShopifyOptimizer 
                  opportunities={performanceData.opportunities || []}
                  issues={performanceData.issues || []}
                />
              )}

              {/* General actionable optimizations */}
              {!isShopify && (
                <ActionableOptimizations
                  url={url}
                  performanceScore={performanceData.overallScore.mobile}
                  issues={performanceData.issues || []}
                />
              )}

              {/* Advanced Metrics */}
              <AdvancedMetricsCard data={performanceData.advancedMetrics} />

              {/* Existing Components */}
              <HeroSection
                overallScore={performanceData.overallScore}
                previousScore={performanceData.previousScore}
                trend={performanceData.trend}
                lastUpdated={performanceData.lastUpdated}
              />
              
              <ExportButton report={performanceData} />
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}