import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, BarChart3, Target, Clock } from 'lucide-react';
import UrlTestForm from '@/components/performance/UrlTestForm';
import PerformanceResults from '@/components/performance/PerformanceResults';
import { performanceAnalyzer, PerformanceReport } from '@/services/performanceAnalyzer';
import { useToast } from '@/hooks/use-toast';

type TestState = 'idle' | 'testing' | 'completed';

const HomePage = () => {
  const [testState, setTestState] = useState<TestState>('idle');
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const { toast } = useToast();

  const handleStartTest = async (url: string) => {
    setTestState('testing');
    try {
      const result = await performanceAnalyzer.analyzeUrl(url);
      setReport(result);
      setTestState('completed');
      toast({
        title: "Analysis Complete!",
        description: `Found ${result.issues.length} performance issues with actionable solutions.`
      });
    } catch (error) {
      console.error('Performance analysis failed:', error);
      setTestState('idle');
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the website. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNewTest = () => {
    setTestState('idle');
    setReport(null);
  };

  if (testState === 'completed' && report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4" data-id="1537oj8y1" data-path="src/pages/HomePage.tsx">
        <PerformanceResults report={report} onNewTest={handleNewTest} data-id="7w5q9fnu8" data-path="src/pages/HomePage.tsx" />
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" data-id="7dpf6yvbz" data-path="src/pages/HomePage.tsx">
      {/* Header */}
      <header className="py-6 px-8 border-b bg-white/80 backdrop-blur-sm" data-id="2mi05odvo" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto flex justify-between items-center" data-id="0xo6n737z" data-path="src/pages/HomePage.tsx">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="vmizeq4oe" data-path="src/pages/HomePage.tsx">
            Performance Analytics Suite
          </h1>
          <nav className="space-x-4" data-id="13wppmqoj" data-path="src/pages/HomePage.tsx">
            <Button variant="link" asChild data-id="up6txnxzm" data-path="src/pages/HomePage.tsx">
              <Link to="/" data-id="3usj8d73u" data-path="src/pages/HomePage.tsx">Home</Link>
            </Button>
            <Button variant="link" asChild data-id="mmxwhzxba" data-path="src/pages/HomePage.tsx">
              <Link to="/dashboard" data-id="wk3gcvt9p" data-path="src/pages/HomePage.tsx">Advanced Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16" data-id="8md8yw49a" data-path="src/pages/HomePage.tsx">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} data-id="mlx6ttaqu" data-path="src/pages/HomePage.tsx">

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6" data-id="s7i3d51ji" data-path="src/pages/HomePage.tsx">
            Website Performance Analyzer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto" data-id="ec4zwj5yh" data-path="src/pages/HomePage.tsx">
            Get detailed performance insights with beginner-friendly solutions. 
            Test your website like Google PageSpeed Insights, but with exact fixes for every issue.
          </p>
          
          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12" data-id="h39n4ckri" data-path="src/pages/HomePage.tsx">
            <motion.div
              className="flex flex-col items-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} data-id="mm3aq7swt" data-path="src/pages/HomePage.tsx">

              <Zap className="w-8 h-8 text-blue-600 mb-2" data-id="xlidf36ln" data-path="src/pages/HomePage.tsx" />
              <span className="text-sm font-medium" data-id="kf2v9ef60" data-path="src/pages/HomePage.tsx">Core Web Vitals</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} data-id="eehzxcb58" data-path="src/pages/HomePage.tsx">

              <BarChart3 className="w-8 h-8 text-purple-600 mb-2" data-id="dqrl4qv1r" data-path="src/pages/HomePage.tsx" />
              <span className="text-sm font-medium" data-id="j3qysvw1a" data-path="src/pages/HomePage.tsx">Detailed Analysis</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} data-id="vvi5ccnzs" data-path="src/pages/HomePage.tsx">

              <Target className="w-8 h-8 text-green-600 mb-2" data-id="w69wzh63e" data-path="src/pages/HomePage.tsx" />
              <span className="text-sm font-medium" data-id="9ogpetu83" data-path="src/pages/HomePage.tsx">Exact Solutions</span>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }} data-id="x3svcl8s6" data-path="src/pages/HomePage.tsx">

              <Clock className="w-8 h-8 text-orange-600 mb-2" data-id="j895x2jr9" data-path="src/pages/HomePage.tsx" />
              <span className="text-sm font-medium" data-id="d2ey9ofiz" data-path="src/pages/HomePage.tsx">Quick Testing</span>
            </motion.div>
          </div>
        </motion.div>

        {/* URL Test Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }} data-id="kq6zdzjux" data-path="src/pages/HomePage.tsx">

          <UrlTestForm onStartTest={handleStartTest} isLoading={testState === 'testing'} data-id="onb3h94vw" data-path="src/pages/HomePage.tsx" />
        </motion.div>

        {/* Example Issues */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }} data-id="5b0f0z3b2" data-path="src/pages/HomePage.tsx">

          <h2 className="text-3xl font-bold text-center mb-8" data-id="z2xp5r2t4" data-path="src/pages/HomePage.tsx">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6" data-id="4h7u0bd4l" data-path="src/pages/HomePage.tsx">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-id="wzhy0cmw4" data-path="src/pages/HomePage.tsx">
              <h3 className="text-xl font-semibold mb-3 text-red-600" data-id="23kpo0r3r" data-path="src/pages/HomePage.tsx">❌ Common Issues We Find</h3>
              <ul className="space-y-2 text-sm text-gray-700" data-id="rrzhxn78g" data-path="src/pages/HomePage.tsx">
                <li data-id="bbck5kdjv" data-path="src/pages/HomePage.tsx">• Images without dimensions causing layout shifts</li>
                <li data-id="920vq51df" data-path="src/pages/HomePage.tsx">• Large hero images slowing page load</li>
                <li data-id="lqhnhvk15" data-path="src/pages/HomePage.tsx">• Blocking JavaScript affecting interactivity</li>
                <li data-id="uatti6wby" data-path="src/pages/HomePage.tsx">• Render-blocking CSS delaying content</li>
                <li data-id="0tv13tv1c" data-path="src/pages/HomePage.tsx">• Fonts loading without proper optimization</li>
              </ul>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-id="6fbdpy2r3" data-path="src/pages/HomePage.tsx">
              <h3 className="text-xl font-semibold mb-3 text-green-600" data-id="bujtsqmbn" data-path="src/pages/HomePage.tsx">✅ Exact Solutions Provided</h3>
              <ul className="space-y-2 text-sm text-gray-700" data-id="9lt3q57ei" data-path="src/pages/HomePage.tsx">
                <li data-id="35hjw5c0g" data-path="src/pages/HomePage.tsx">• Specific width/height attributes to add</li>
                <li data-id="4mf3jsjh6" data-path="src/pages/HomePage.tsx">• Image optimization code examples</li>
                <li data-id="oxyphhjhc" data-path="src/pages/HomePage.tsx">• JavaScript loading strategies</li>
                <li data-id="5401i2dgc" data-path="src/pages/HomePage.tsx">• CSS delivery optimization techniques</li>
                <li data-id="gz07pkks7" data-path="src/pages/HomePage.tsx">• Font-display and preloading instructions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Real Examples Section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }} data-id="94aoavvz6" data-path="src/pages/HomePage.tsx">

          <h2 className="text-3xl font-bold text-center mb-8" data-id="l2ugk8zxc" data-path="src/pages/HomePage.tsx">Example: CLS Issue Fix</h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-id="2z2iuvb8r" data-path="src/pages/HomePage.tsx">
            <div className="grid md:grid-cols-2 gap-6" data-id="ql3a97fkd" data-path="src/pages/HomePage.tsx">
              <div data-id="lzjza23hq" data-path="src/pages/HomePage.tsx">
                <h4 className="font-semibold mb-3 text-red-600" data-id="ei4d1yipu" data-path="src/pages/HomePage.tsx">❌ Problem: Layout Shift</h4>
                <div className="bg-red-50 p-3 rounded border border-red-200 text-sm" data-id="jrky16ura" data-path="src/pages/HomePage.tsx">
                  <p className="mb-2" data-id="1aeqexhbp" data-path="src/pages/HomePage.tsx"><strong data-id="u0pzzh88a" data-path="src/pages/HomePage.tsx">Issue:</strong> Image loads without dimensions</p>
                  <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto" data-id="9pz3hkn1t" data-path="src/pages/HomePage.tsx">
                    {`<img src="hero.jpg" alt="Hero">`}
                  </pre>
                  <p className="mt-2 text-red-700" data-id="xui16y9oq" data-path="src/pages/HomePage.tsx">Result: Page jumps when image loads (CLS: 0.25)</p>
                </div>
              </div>
              <div data-id="safcykyxj" data-path="src/pages/HomePage.tsx">
                <h4 className="font-semibold mb-3 text-green-600" data-id="sho18jlcw" data-path="src/pages/HomePage.tsx">✅ Solution: Set Dimensions</h4>
                <div className="bg-green-50 p-3 rounded border border-green-200 text-sm" data-id="7cebpyvdg" data-path="src/pages/HomePage.tsx">
                  <p className="mb-2" data-id="7llvp3d5e" data-path="src/pages/HomePage.tsx"><strong data-id="nbhamg3b7" data-path="src/pages/HomePage.tsx">Fix:</strong> Add width and height attributes</p>
                  <pre className="bg-gray-800 text-white p-2 rounded text-xs overflow-x-auto" data-id="719zqzcm5" data-path="src/pages/HomePage.tsx">
                    {`<img src="hero.jpg" alt="Hero" 
     width="800" height="400" 
     loading="lazy">`}
                  </pre>
                  <p className="mt-2 text-green-700" data-id="n4gdnvwjk" data-path="src/pages/HomePage.tsx">Result: Stable layout (CLS: 0.05)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }} data-id="cw8jy7de2" data-path="src/pages/HomePage.tsx">

          <p className="text-lg text-gray-600 mb-6" data-id="6zcn62e2v" data-path="src/pages/HomePage.tsx">
            Want to see the full dashboard with advanced analytics?
          </p>
          <Link to="/dashboard" data-id="2yb8hy61b" data-path="src/pages/HomePage.tsx">
            <Button size="lg" variant="outline" className="bg-white/50 hover:bg-white/70" data-id="9qjzowsxc" data-path="src/pages/HomePage.tsx">
              View Advanced Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 bg-white/80 backdrop-blur-sm" data-id="cvv999qdn" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center text-gray-500" data-id="1wbdh3gt2" data-path="src/pages/HomePage.tsx">
          <p data-id="6mjekoebo" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} Performance Analytics Suite. All rights reserved.</p>
        </div>
      </footer>
    </div>);

};

export default HomePage;