import React from 'react';
import { motion } from 'motion/react';

interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  score,
  size = 200,
  strokeWidth = 12
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // green-600
    if (score >= 70) return '#F59E0B'; // yellow-600
    return '#EF4444'; // red-600
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold" style={{ color: getScoreColor(score) }}>
          {score}
        </span>
      </div>
    </div>
  );
}; 