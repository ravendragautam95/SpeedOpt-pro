import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, AlertTriangle, Info, CheckCircle, Copy, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PerformanceIssue } from '@/services/performanceAnalyzer';
import { useToast } from '@/hooks/use-toast';

interface IssueCardProps {
  issue: PerformanceIssue;
  index: number;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':return 'destructive';
      case 'medium':return 'default';
      case 'low':return 'secondary';
      default:return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':return <AlertTriangle className="w-4 h-4" data-id="829kw8r3q" data-path="src/components/performance/IssueCard.tsx" />;
      case 'medium':return <Info className="w-4 h-4" data-id="9c33y93jl" data-path="src/components/performance/IssueCard.tsx" />;
      case 'low':return <CheckCircle className="w-4 h-4" data-id="l7aeb1neg" data-path="src/components/performance/IssueCard.tsx" />;
      default:return <Info className="w-4 h-4" data-id="z65rma0a2" data-path="src/components/performance/IssueCard.tsx" />;
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code copied!",
        description: "The code example has been copied to your clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy code to clipboard. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} data-id="qfbocgbsi" data-path="src/components/performance/IssueCard.tsx">

      <Card className="overflow-hidden" data-id="a7nk7v0k8" data-path="src/components/performance/IssueCard.tsx">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} data-id="kyommfooy" data-path="src/components/performance/IssueCard.tsx">
          <CollapsibleTrigger asChild data-id="4m4emge9v" data-path="src/components/performance/IssueCard.tsx">
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors" data-id="f8iwyqwua" data-path="src/components/performance/IssueCard.tsx">
              <div className="flex items-start justify-between" data-id="4ye31oo3c" data-path="src/components/performance/IssueCard.tsx">
                <div className="flex items-start gap-3" data-id="cqp03qrw3" data-path="src/components/performance/IssueCard.tsx">
                  <div className="mt-1" data-id="rb9ymokxz" data-path="src/components/performance/IssueCard.tsx">
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div className="flex-1" data-id="kh0lbpag6" data-path="src/components/performance/IssueCard.tsx">
                    <div className="flex items-center gap-2 mb-2" data-id="zhyp68p8p" data-path="src/components/performance/IssueCard.tsx">
                      <CardTitle className="text-lg" data-id="3e0r1xaox" data-path="src/components/performance/IssueCard.tsx">{issue.title}</CardTitle>
                      <Badge variant={getSeverityColor(issue.severity)} className="text-xs" data-id="1wxrjug8p" data-path="src/components/performance/IssueCard.tsx">
                        {issue.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs" data-id="vmdw03a8v" data-path="src/components/performance/IssueCard.tsx">
                        {issue.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground" data-id="ymco1s0fq" data-path="src/components/performance/IssueCard.tsx">{issue.description}</p>
                    {issue.metrics &&
                    <div className="mt-2 text-sm" data-id="jw4ups4so" data-path="src/components/performance/IssueCard.tsx">
                        <span className="font-medium" data-id="96182d77h" data-path="src/components/performance/IssueCard.tsx">Current: </span>
                        <span className="text-red-600" data-id="wu61mys3t" data-path="src/components/performance/IssueCard.tsx">{issue.metrics.current}{issue.metrics.unit}</span>
                        <span className="mx-2" data-id="xlunj1tnu" data-path="src/components/performance/IssueCard.tsx">→</span>
                        <span className="font-medium" data-id="5pz3pt930" data-path="src/components/performance/IssueCard.tsx">Target: </span>
                        <span className="text-green-600" data-id="3iamdsddr" data-path="src/components/performance/IssueCard.tsx">{issue.metrics.target}{issue.metrics.unit}</span>
                      </div>
                    }
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }} data-id="mjzq0w8ux" data-path="src/components/performance/IssueCard.tsx">

                  <ChevronRight className="w-5 h-5" data-id="o157tkf41" data-path="src/components/performance/IssueCard.tsx" />
                </motion.div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <AnimatePresence data-id="vmp48zxcr" data-path="src/components/performance/IssueCard.tsx">
            {isOpen &&
            <CollapsibleContent forceMount data-id="tk648va9s" data-path="src/components/performance/IssueCard.tsx">
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }} data-id="6c9fvrfbo" data-path="src/components/performance/IssueCard.tsx">

                  <CardContent className="pt-0" data-id="v17doeqqp" data-path="src/components/performance/IssueCard.tsx">
                    <div className="space-y-6" data-id="0wrdhajzj" data-path="src/components/performance/IssueCard.tsx">
                      {/* Impact Section */}
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800" data-id="61we93xn3" data-path="src/components/performance/IssueCard.tsx">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2" data-id="zvyte9rbi" data-path="src/components/performance/IssueCard.tsx">
                          <Info className="w-4 h-4" data-id="1vciew5fx" data-path="src/components/performance/IssueCard.tsx" />
                          Why This Matters
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm" data-id="wumy46zov" data-path="src/components/performance/IssueCard.tsx">{issue.impact}</p>
                      </div>

                      {/* Solution Section */}
                      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800" data-id="b39fqudvo" data-path="src/components/performance/IssueCard.tsx">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2" data-id="biq8tatjo" data-path="src/components/performance/IssueCard.tsx">
                          <CheckCircle className="w-4 h-4" data-id="09iojdhtx" data-path="src/components/performance/IssueCard.tsx" />
                          How to Fix This
                        </h4>
                        <p className="text-green-800 dark:text-green-200 text-sm mb-4 font-medium" data-id="qajjde0rs" data-path="src/components/performance/IssueCard.tsx">
                          {issue.solution.summary}
                        </p>
                        
                        <div className="space-y-3" data-id="ido3tqwvx" data-path="src/components/performance/IssueCard.tsx">
                          <h5 className="font-medium text-green-900 dark:text-green-100" data-id="etsawwfaz" data-path="src/components/performance/IssueCard.tsx">Step-by-step solution:</h5>
                          <ol className="space-y-2" data-id="kws4v0rki" data-path="src/components/performance/IssueCard.tsx">
                            {issue.solution.steps.map((step, stepIndex) =>
                          <li key={stepIndex} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200" data-id="jetlzd2gt" data-path="src/components/performance/IssueCard.tsx">
                                <span className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" data-id="hrnyhqtnu" data-path="src/components/performance/IssueCard.tsx">
                                  {stepIndex + 1}
                                </span>
                                <span data-id="ouc6qf5m5" data-path="src/components/performance/IssueCard.tsx">{step}</span>
                              </li>
                          )}
                          </ol>
                        </div>
                      </div>

                      {/* Code Example */}
                      {issue.solution.codeExample &&
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border" data-id="cchk8nbp1" data-path="src/components/performance/IssueCard.tsx">
                          <div className="flex items-center justify-between mb-3" data-id="6cqyxdnju" data-path="src/components/performance/IssueCard.tsx">
                            <h4 className="font-semibold flex items-center gap-2" data-id="2fqpqm2bc" data-path="src/components/performance/IssueCard.tsx">
                              <Code className="w-4 h-4" data-id="dvuf40pxx" data-path="src/components/performance/IssueCard.tsx" />
                              Code Example
                            </h4>
                            <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyCode(issue.solution.codeExample!)}
                          className="h-8" data-id="uelj50nwg" data-path="src/components/performance/IssueCard.tsx">

                              <Copy className="w-3 h-3 mr-1" data-id="7a3h7yv1h" data-path="src/components/performance/IssueCard.tsx" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded text-xs overflow-x-auto" data-id="balxp5wpj" data-path="src/components/performance/IssueCard.tsx">
                            <code data-id="h1v6bqwjm" data-path="src/components/performance/IssueCard.tsx">{issue.solution.codeExample}</code>
                          </pre>
                        </div>
                    }

                      {/* Visual Examples */}
                      {(issue.solution.beforeImage || issue.solution.afterImage) &&
                    <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800" data-id="cqpjzzdm4" data-path="src/components/performance/IssueCard.tsx">
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3" data-id="567kslwt9" data-path="src/components/performance/IssueCard.tsx">
                            Visual Example
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="s5z4hz4my" data-path="src/components/performance/IssueCard.tsx">
                            {issue.solution.beforeImage &&
                        <div data-id="h5ktg596n" data-path="src/components/performance/IssueCard.tsx">
                                <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2" data-id="xes50fmoh" data-path="src/components/performance/IssueCard.tsx">Before (Problem):</p>
                                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-200" data-id="l5uem0jhq" data-path="src/components/performance/IssueCard.tsx">
                                  Screenshot would show: Layout shifting as images load without dimensions
                                </div>
                              </div>
                        }
                            {issue.solution.afterImage &&
                        <div data-id="oekz0liej" data-path="src/components/performance/IssueCard.tsx">
                                <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2" data-id="xhzvlu16k" data-path="src/components/performance/IssueCard.tsx">After (Fixed):</p>
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded border border-green-200 dark:border-green-800 text-sm text-green-800 dark:text-green-200" data-id="kawrra5tv" data-path="src/components/performance/IssueCard.tsx">
                                  Screenshot would show: Stable layout with properly sized images
                                </div>
                              </div>
                        }
                          </div>
                        </div>
                    }
                    </div>
                  </CardContent>
                </motion.div>
              </CollapsibleContent>
            }
          </AnimatePresence>
        </Collapsible>
      </Card>
    </motion.div>);

};

export default IssueCard;