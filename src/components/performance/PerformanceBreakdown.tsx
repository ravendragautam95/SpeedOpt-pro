import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'motion/react';
import {
  Globe,
  Image,
  Code,
  Smartphone,
  Accessibility,
  Search,
  Shield,
  Rocket,
  ChevronDown,
  ChevronUp,
  Info,
  MessageSquare
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { PerformanceCategory } from '@/services/performanceService';

interface PerformanceBreakdownProps {
  categories: PerformanceCategory[];
  onFeedback: (categoryId: string, feedback: string) => void;
}

const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({ categories, onFeedback }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleFeedback = (categoryId: string) => {
    const feedback = prompt('Please share your feedback or suggestions for improvement:');
    if (feedback) {
      onFeedback(categoryId, feedback);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our recommendations.",
      });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-7 h-7 text-blue-600" />
          Performance Breakdown
        </CardTitle>
        <p className="text-gray-600">
          Detailed analysis across different performance categories
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                  {React.createElement(
                    {
                      Rocket,
                      Accessibility,
                      Shield,
                      Search,
                      Smartphone,
                      Image
                    }[category.icon],
                    { className: `w-5 h-5 ${category.color.replace('bg-', 'text-')}` }
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{category.detailedExplanation}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                    {category.score}/100
                  </span>
                </div>
                <Progress value={category.score} className="h-3" />
              </div>

              <Collapsible
                open={expandedCategory === category.id}
                onOpenChange={(isOpen) => setExpandedCategory(isOpen ? category.id : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full flex items-center justify-between">
                    <span>View Details</span>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  {/* Common Issues */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Common Issues</h4>
                    <ul className="space-y-2">
                      {category.commonIssues.map((issue, index) => (
                        <li key={index} className="text-sm">
                          <span className="text-red-600">• {issue.issue}</span>
                          <p className="text-gray-600 ml-4">{issue.solution}</p>
                          <span className="text-xs text-gray-500 ml-4">
                            Difficulty: {issue.difficulty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvement Steps */}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Improvement Steps</h4>
                    <ol className="space-y-2">
                      {category.improvementSteps.map((step, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{index + 1}. {step.step}</span>
                          <p className="text-gray-600 ml-4">{step.explanation}</p>
                          {step.codeExample && (
                            <pre className="bg-gray-100 p-2 rounded text-xs mt-1 ml-4 overflow-x-auto">
                              {step.codeExample}
                            </pre>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Feedback Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleFeedback(category.id)}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Share Feedback
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>

        {/* Overall Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
        >
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            Optimization Recommendations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>High Priority:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Optimize image formats and sizes</li>
                <li>Implement lazy loading for images</li>
                <li>Reduce cumulative layout shift</li>
              </ul>
            </div>
            <div>
              <strong>Medium Priority:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Minify CSS and JavaScript</li>
                <li>Enable compression (Gzip/Brotli)</li>
                <li>Optimize critical rendering path</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PerformanceBreakdown;