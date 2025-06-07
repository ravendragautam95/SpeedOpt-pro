import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  name: string;
  abbreviation: string;
  value: string;
  score: number;
  status: 'good' | 'needs-improvement' | 'poor';
  threshold: string;
  description: string;
  icon: LucideIcon;
  trend: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  name,
  abbreviation,
  value,
  score,
  status,
  threshold,
  description,
  icon: Icon,
  trend
}) => {
  console.log('MetricCard: Rendering metric card for:', name);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          badge: 'bg-green-100 text-green-800',
          icon: 'text-green-600'
        };
      case 'needs-improvement':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          badge: 'bg-yellow-100 text-yellow-800',
          icon: 'text-yellow-600'
        };
      case 'poor':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-100 text-red-800',
          icon: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          badge: 'bg-gray-100 text-gray-800',
          icon: 'text-gray-600'
        };
    }
  };

  const colors = getStatusColor(status);
  const isPositiveTrend = trend.startsWith('-') || trend.startsWith('+') && status === 'good';

  return (
    <Card className={`${colors.bg} border transition-all duration-300 hover:scale-105 hover:shadow-lg`} data-id="wiqjetl9m" data-path="src/components/performance/MetricCard.tsx">
      <CardContent className="p-6" data-id="ohzk2os97" data-path="src/components/performance/MetricCard.tsx">
        <div className="flex items-start justify-between mb-4" data-id="jn72vql3x" data-path="src/components/performance/MetricCard.tsx">
          <div className="flex items-center gap-3" data-id="46arxv6vv" data-path="src/components/performance/MetricCard.tsx">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-2 rounded-lg bg-white shadow-sm`} data-id="03zmqzp7r" data-path="src/components/performance/MetricCard.tsx">

              <Icon className={`w-5 h-5 ${colors.icon}`} data-id="j1dp5s3o7" data-path="src/components/performance/MetricCard.tsx" />
            </motion.div>
            <div data-id="bw91yabu3" data-path="src/components/performance/MetricCard.tsx">
              <h3 className="font-semibold text-gray-900" data-id="x4bavsp84" data-path="src/components/performance/MetricCard.tsx">{abbreviation}</h3>
              <p className="text-xs text-gray-600" data-id="kkq4di044" data-path="src/components/performance/MetricCard.tsx">{name}</p>
            </div>
          </div>
          <Badge className={colors.badge} data-id="19eq2azvo" data-path="src/components/performance/MetricCard.tsx">
            {status === 'good' ? 'Good' : status === 'needs-improvement' ? 'Needs Work' : 'Poor'}
          </Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4" data-id="f2896ibks" data-path="src/components/performance/MetricCard.tsx">

          <div className="text-3xl font-bold text-gray-900 mb-1" data-id="0otyz8oi6" data-path="src/components/performance/MetricCard.tsx">
            {value}
          </div>
          <div className="text-sm text-gray-600" data-id="eydyaveqc" data-path="src/components/performance/MetricCard.tsx">
            Target: <span dangerouslySetInnerHTML={{ __html: threshold }} data-id="nrnuulplg" data-path="src/components/performance/MetricCard.tsx" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4" data-id="atzo66tmp" data-path="src/components/performance/MetricCard.tsx">

          <div className="flex items-center gap-2 mb-2" data-id="lngkgh0mi" data-path="src/components/performance/MetricCard.tsx">
            {isPositiveTrend ?
            <TrendingUp className="w-4 h-4 text-green-500" data-id="h3gkdcx8i" data-path="src/components/performance/MetricCard.tsx" /> :

            <TrendingDown className="w-4 h-4 text-red-500" data-id="vk4spuxbi" data-path="src/components/performance/MetricCard.tsx" />
            }
            <span className={`text-sm font-medium ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`} data-id="62r23faq2" data-path="src/components/performance/MetricCard.tsx">
              {trend} from last week
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2" data-id="x564bds9c" data-path="src/components/performance/MetricCard.tsx">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-2 rounded-full ${
              status === 'good' ? 'bg-green-500' :
              status === 'needs-improvement' ? 'bg-yellow-500' : 'bg-red-500'}`
              } data-id="h55h1xduq" data-path="src/components/performance/MetricCard.tsx" />

          </div>
          <div className="text-right text-xs text-gray-600 mt-1" data-id="q3atfpmae" data-path="src/components/performance/MetricCard.tsx">
            {score}/100
          </div>
        </motion.div>

        <p className="text-xs text-gray-600 leading-relaxed" data-id="ekibtk5i2" data-path="src/components/performance/MetricCard.tsx">
          {description}
        </p>
      </CardContent>
    </Card>);

};

export default MetricCard;