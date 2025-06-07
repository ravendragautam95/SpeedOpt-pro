import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ProgressRingProps {
  score: number;
  size: number;
  strokeWidth: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ score, size, strokeWidth }) => {
  console.log('ProgressRing: Rendering progress ring with score:', score);

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - animatedScore / 100 * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // green-500
    if (score >= 70) return '#F59E0B'; // yellow-500
    return '#EF4444'; // red-500
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className="relative flex items-center justify-center" data-id="f9i1l9ywv" data-path="src/components/performance/ProgressRing.tsx">
      <svg width={size} height={size} className="transform -rotate-90" data-id="57pzum47u" data-path="src/components/performance/ProgressRing.tsx">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent" data-id="yy9h6e01l" data-path="src/components/performance/ProgressRing.tsx" />

        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} data-id="gxfydbmx6" data-path="src/components/performance/ProgressRing.tsx" />

      </svg>
      
      {/* Score text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" data-id="kh0h4kc8g" data-path="src/components/performance/ProgressRing.tsx">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center" data-id="klqr4g0oe" data-path="src/components/performance/ProgressRing.tsx">

          <div className="text-4xl font-bold text-gray-900" data-id="dua7txz3j" data-path="src/components/performance/ProgressRing.tsx">
            {animatedScore}
          </div>
          <div className="text-sm font-medium text-gray-600" data-id="2177zxuas" data-path="src/components/performance/ProgressRing.tsx">
            {getScoreLabel(score)}
          </div>
        </motion.div>
      </div>
    </div>);

};

export default ProgressRing;