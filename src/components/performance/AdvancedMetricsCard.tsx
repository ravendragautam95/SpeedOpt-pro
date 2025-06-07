import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target,
  Clock,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface AdvancedMetricsProps {
  data: {
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
      mobile: { score: number; trend: 'up' | 'down' | 'stable'; issues: number };
      desktop: { score: number; trend: 'up' | 'down' | 'stable'; issues: number };
    };
    coreWebVitals: {
      lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      fid: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
      ttfb: { value: number; rating: 'good' | 'needs-improvement' | 'poor'; trend: 'up' | 'down' | 'stable' };
    };
  };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

export default function AdvancedMetricsCard({ data }: AdvancedMetricsProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement': return <AlertTriangle className="h-4 w-4" />;
      case 'poor': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const pieData = [
    { name: 'LCP', value: data.coreWebVitals.lcp.value, color: COLORS[0] },
    { name: 'FID', value: data.coreWebVitals.fid.value, color: COLORS[1] },
    { name: 'CLS', value: data.coreWebVitals.cls.value * 1000, color: COLORS[2] },
    { name: 'TTFB', value: data.coreWebVitals.ttfb.value, color: COLORS[3] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Advanced Performance Analytics
            </div>
            <Badge variant="outline" className="text-xs">
              Real-time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="vitals">Core Vitals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Scores */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Performance Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Mobile</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {data.devices.mobile.score}
                          </span>
                          {data.devices.mobile.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : data.devices.mobile.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      </div>
                      <Progress value={data.devices.mobile.score} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium">Desktop</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-purple-600">
                            {data.devices.desktop.score}
                          </span>
                          {data.devices.desktop.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : data.devices.desktop.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      </div>
                      <Progress value={data.devices.desktop.score} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Core Web Vitals Pie Chart */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Metrics Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Trends (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.trends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="mobile" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="Mobile Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="desktop" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        name="Desktop Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mobile Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-blue-500" />
                      Mobile Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Score</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {data.devices.mobile.score}
                        </span>
                      </div>
                      <Progress value={data.devices.mobile.score} />
                      <div className="flex items-center justify-between text-sm">
                        <span>Issues Found</span>
                        <Badge variant="destructive">
                          {data.devices.mobile.issues}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Desktop Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-purple-500" />
                      Desktop Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Score</span>
                        <span className="text-2xl font-bold text-purple-600">
                          {data.devices.desktop.score}
                        </span>
                      </div>
                      <Progress value={data.devices.desktop.score} />
                      <div className="flex items-center justify-between text-sm">
                        <span>Issues Found</span>
                        <Badge variant="destructive">
                          {data.devices.desktop.issues}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data.coreWebVitals).map(([key, vital]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`border-l-4 ${getRatingColor(vital.rating)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getRatingIcon(vital.rating)}
                            <span className="font-medium text-sm uppercase">{key}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold">
                              {vital.value}{key === 'cls' ? '' : 'ms'}
                            </span>
                            {vital.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : vital.trend === 'down' ? (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            ) : null}
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRatingColor(vital.rating)}`}
                        >
                          {vital.rating.replace('-', ' ')}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
} 