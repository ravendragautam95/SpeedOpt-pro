import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Zap, BarChart3, AlertTriangle } from 'lucide-react';
import { PerformanceReport } from '@/services/performanceAnalyzer';
import IssueCard from './IssueCard';
import ExportButton from './ExportButton';

interface PerformanceResultsProps {
  report: PerformanceReport;
  onNewTest: () => void;
}

const PerformanceResults: React.FC<PerformanceResultsProps> = ({ report, onNewTest }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':return 'bg-green-100 text-green-800 border-green-200';
      case 'needs-improvement':return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':return 'bg-red-100 text-red-800 border-red-200';
      default:return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (ms: number) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(1)}s`;
    }
    return `${ms}ms`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6" data-id="64rtkro66" data-path="src/components/performance/PerformanceResults.tsx">
      {/* Header with Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} data-id="fkhr9769i" data-path="src/components/performance/PerformanceResults.tsx">

        <Card className={`${getScoreBg(report.overallScore)}`} data-id="hndazcpxo" data-path="src/components/performance/PerformanceResults.tsx">
          <CardHeader className="text-center" data-id="dvdjfvi4k" data-path="src/components/performance/PerformanceResults.tsx">
            <div className="flex items-center justify-center gap-4 mb-4" data-id="byv3v43ze" data-path="src/components/performance/PerformanceResults.tsx">
              <div className="text-6xl font-bold" data-id="iaue6yhpm" data-path="src/components/performance/PerformanceResults.tsx">
                <span className={getScoreColor(report.overallScore)} data-id="nujfnfqt2" data-path="src/components/performance/PerformanceResults.tsx">{report.overallScore}</span>
              </div>
              <div className="text-left" data-id="fngzao7j3" data-path="src/components/performance/PerformanceResults.tsx">
                <CardTitle className="text-2xl" data-id="hy9q0kzzt" data-path="src/components/performance/PerformanceResults.tsx">Performance Score</CardTitle>
                <p className="text-muted-foreground" data-id="1vopd1b7h" data-path="src/components/performance/PerformanceResults.tsx">{report.url}</p>
                <p className="text-sm text-muted-foreground" data-id="pvyrn0kpo" data-path="src/components/performance/PerformanceResults.tsx">
                  Analyzed at {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4" data-id="hp0wpq4xp" data-path="src/components/performance/PerformanceResults.tsx">
              <ExportButton report={report} data-id="35l4ec7v7" data-path="src/components/performance/PerformanceResults.tsx" />
              <button
                onClick={onNewTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-id="rio2tisr5" data-path="src/components/performance/PerformanceResults.tsx">

                Test Another Site
              </button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Core Web Vitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }} data-id="jgqsrtjcp" data-path="src/components/performance/PerformanceResults.tsx">

        <Card data-id="1fke11r7y" data-path="src/components/performance/PerformanceResults.tsx">
          <CardHeader data-id="p2pgcnrjn" data-path="src/components/performance/PerformanceResults.tsx">
            <CardTitle className="flex items-center gap-2" data-id="8n7t0nuyp" data-path="src/components/performance/PerformanceResults.tsx">
              <Zap className="w-5 h-5" data-id="tvp2uikxo" data-path="src/components/performance/PerformanceResults.tsx" />
              Core Web Vitals
            </CardTitle>
          </CardHeader>
          <CardContent data-id="5uqqzzhiu" data-path="src/components/performance/PerformanceResults.tsx">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="5q64xjslx" data-path="src/components/performance/PerformanceResults.tsx">
              <div className="text-center" data-id="7je04yvp1" data-path="src/components/performance/PerformanceResults.tsx">
                <div className="text-3xl font-bold mb-2" data-id="8ykw5gvk4" data-path="src/components/performance/PerformanceResults.tsx">
                  {report.coreWebVitals.lcp.value}s
                </div>
                <div className="font-medium mb-2" data-id="cmoch8kpf" data-path="src/components/performance/PerformanceResults.tsx">Largest Contentful Paint</div>
                <Badge
                  className={`${getRatingColor(report.coreWebVitals.lcp.rating)} border`}
                  variant="outline" data-id="qvktb0vpu" data-path="src/components/performance/PerformanceResults.tsx">

                  {report.coreWebVitals.lcp.rating.replace('-', ' ')}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2" data-id="83ma1ikro" data-path="src/components/performance/PerformanceResults.tsx">
                  Measures loading performance. Good: ≤2.5s
                </p>
              </div>
              
              <div className="text-center" data-id="ut6yt9ff6" data-path="src/components/performance/PerformanceResults.tsx">
                <div className="text-3xl font-bold mb-2" data-id="vk61yz6ng" data-path="src/components/performance/PerformanceResults.tsx">
                  {report.coreWebVitals.fid.value}ms
                </div>
                <div className="font-medium mb-2" data-id="qq0ewjav2" data-path="src/components/performance/PerformanceResults.tsx">First Input Delay</div>
                <Badge
                  className={`${getRatingColor(report.coreWebVitals.fid.rating)} border`}
                  variant="outline" data-id="n7okc4vop" data-path="src/components/performance/PerformanceResults.tsx">

                  {report.coreWebVitals.fid.rating.replace('-', ' ')}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2" data-id="k2suuu80j" data-path="src/components/performance/PerformanceResults.tsx">
                  Measures interactivity. Good: ≤100ms
                </p>
              </div>
              
              <div className="text-center" data-id="0yvferlg8" data-path="src/components/performance/PerformanceResults.tsx">
                <div className="text-3xl font-bold mb-2" data-id="pdn5cf8oa" data-path="src/components/performance/PerformanceResults.tsx">
                  {report.coreWebVitals.cls.value}
                </div>
                <div className="font-medium mb-2" data-id="l9kbeejvq" data-path="src/components/performance/PerformanceResults.tsx">Cumulative Layout Shift</div>
                <Badge
                  className={`${getRatingColor(report.coreWebVitals.cls.rating)} border`}
                  variant="outline" data-id="hw9p8hjku" data-path="src/components/performance/PerformanceResults.tsx">

                  {report.coreWebVitals.cls.rating.replace('-', ' ')}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2" data-id="nwhv29iga" data-path="src/components/performance/PerformanceResults.tsx">
                  Measures visual stability. Good: ≤0.1
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loading Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }} data-id="dguc7rql5" data-path="src/components/performance/PerformanceResults.tsx">

        <Card data-id="xej978j0o" data-path="src/components/performance/PerformanceResults.tsx">
          <CardHeader data-id="b0bvq1zi2" data-path="src/components/performance/PerformanceResults.tsx">
            <CardTitle className="flex items-center gap-2" data-id="ocon33sex" data-path="src/components/performance/PerformanceResults.tsx">
              <Clock className="w-5 h-5" data-id="4lvxfn1c2" data-path="src/components/performance/PerformanceResults.tsx" />
              Loading Timeline
            </CardTitle>
          </CardHeader>
          <CardContent data-id="trq31kyi3" data-path="src/components/performance/PerformanceResults.tsx">
            <div className="space-y-4" data-id="yac026m8z" data-path="src/components/performance/PerformanceResults.tsx">
              {[
              { label: 'First Paint', value: report.loadingTimes.firstPaint, color: 'bg-blue-500' },
              { label: 'First Contentful Paint', value: report.loadingTimes.firstContentfulPaint, color: 'bg-green-500' },
              { label: 'Largest Contentful Paint', value: report.loadingTimes.largestContentfulPaint, color: 'bg-orange-500' },
              { label: 'Time to Interactive', value: report.loadingTimes.timeToInteractive, color: 'bg-purple-500' },
              { label: 'Total Blocking Time', value: report.loadingTimes.totalBlockingTime, color: 'bg-red-500' }].
              map((metric, index) =>
              <div key={metric.label} className="flex items-center gap-4" data-id="q0dzgqeyk" data-path="src/components/performance/PerformanceResults.tsx">
                  <div className="w-32 text-sm font-medium" data-id="0n9hgth2x" data-path="src/components/performance/PerformanceResults.tsx">{metric.label}</div>
                  <div className="flex-1" data-id="k1nh3kfgu" data-path="src/components/performance/PerformanceResults.tsx">
                    <div className="flex items-center gap-2" data-id="32s5ghrfr" data-path="src/components/performance/PerformanceResults.tsx">
                      <div className={`w-3 h-3 rounded-full ${metric.color}`} data-id="cy5wreklu" data-path="src/components/performance/PerformanceResults.tsx"></div>
                      <div className="text-sm font-medium" data-id="2vkb2036v" data-path="src/components/performance/PerformanceResults.tsx">{formatTime(metric.value)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Issues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }} data-id="9gn1bxyez" data-path="src/components/performance/PerformanceResults.tsx">

        <Card data-id="f0y2yrd67" data-path="src/components/performance/PerformanceResults.tsx">
          <CardHeader data-id="6g59jde2w" data-path="src/components/performance/PerformanceResults.tsx">
            <CardTitle className="flex items-center gap-2" data-id="6xjhnjsti" data-path="src/components/performance/PerformanceResults.tsx">
              <AlertTriangle className="w-5 h-5" data-id="12vvnt5pt" data-path="src/components/performance/PerformanceResults.tsx" />
              Performance Issues & Solutions
              <Badge variant="outline" className="ml-2" data-id="s8g361hzu" data-path="src/components/performance/PerformanceResults.tsx">
                {report.issues.length} issues found
              </Badge>
            </CardTitle>
            <p className="text-muted-foreground" data-id="at61re2fn" data-path="src/components/performance/PerformanceResults.tsx">
              Click on each issue to see detailed solutions with code examples
            </p>
          </CardHeader>
          <CardContent data-id="dpdvkoxtf" data-path="src/components/performance/PerformanceResults.tsx">
            <div className="space-y-4" data-id="hq51ni85w" data-path="src/components/performance/PerformanceResults.tsx">
              {report.issues.map((issue, index) =>
              <IssueCard key={issue.id} issue={issue} index={index} data-id="yhy3dedmu" data-path="src/components/performance/PerformanceResults.tsx" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Optimization Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }} data-id="etjra35sa" data-path="src/components/performance/PerformanceResults.tsx">

        <Card data-id="ozvk0e9xt" data-path="src/components/performance/PerformanceResults.tsx">
          <CardHeader data-id="ak8epovnu" data-path="src/components/performance/PerformanceResults.tsx">
            <CardTitle className="flex items-center gap-2" data-id="343d8h68w" data-path="src/components/performance/PerformanceResults.tsx">
              <TrendingUp className="w-5 h-5" data-id="520gjvry7" data-path="src/components/performance/PerformanceResults.tsx" />
              Optimization Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent data-id="xojidlcbs" data-path="src/components/performance/PerformanceResults.tsx">
            <div className="space-y-4" data-id="01nqs9r9g" data-path="src/components/performance/PerformanceResults.tsx">
              {report.improvements.map((improvement, index) =>
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg" data-id="h0lxzinhu" data-path="src/components/performance/PerformanceResults.tsx">
                  <div data-id="3hcbhq9hb" data-path="src/components/performance/PerformanceResults.tsx">
                    <div className="font-medium" data-id="ajcx5iupt" data-path="src/components/performance/PerformanceResults.tsx">{improvement.category}</div>
                    <div className="text-sm text-muted-foreground" data-id="ciao7wmtj" data-path="src/components/performance/PerformanceResults.tsx">{improvement.description}</div>
                  </div>
                  <div className="text-right" data-id="glfvdhd61" data-path="src/components/performance/PerformanceResults.tsx">
                    <div className="text-lg font-bold text-green-600" data-id="ntbxownbb" data-path="src/components/performance/PerformanceResults.tsx">
                      -{improvement.potential}s
                    </div>
                    <div className="text-xs text-muted-foreground" data-id="8rrtr04do" data-path="src/components/performance/PerformanceResults.tsx">potential savings</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>);

};

export default PerformanceResults;