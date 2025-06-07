import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface UrlTestFormProps {
  onStartTest: (url: string) => void;
  isLoading: boolean;
}

const UrlTestForm: React.FC<UrlTestFormProps> = ({ onStartTest, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlPattern.test(inputUrl);
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    // Add https:// if not present
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    onStartTest(formattedUrl);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-id="7bo229rnm" data-path="src/components/performance/UrlTestForm.tsx">
      <CardHeader className="text-center" data-id="96gttgwhg" data-path="src/components/performance/UrlTestForm.tsx">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} data-id="c4ejqclfe" data-path="src/components/performance/UrlTestForm.tsx">

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2" data-id="ke3orhdwj" data-path="src/components/performance/UrlTestForm.tsx">
            <Zap className="w-8 h-8 text-blue-600" data-id="17spzdk7t" data-path="src/components/performance/UrlTestForm.tsx" />
            Test Website Performance
          </CardTitle>
          <p className="text-muted-foreground mt-2" data-id="vok3hb6f6" data-path="src/components/performance/UrlTestForm.tsx">
            Get detailed performance analysis with actionable solutions
          </p>
        </motion.div>
      </CardHeader>
      <CardContent data-id="zpwlv3ajw" data-path="src/components/performance/UrlTestForm.tsx">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} data-id="bsxke8r2p" data-path="src/components/performance/UrlTestForm.tsx">

          <div className="space-y-2" data-id="16z75fvjl" data-path="src/components/performance/UrlTestForm.tsx">
            <div className="relative" data-id="n92gkd18f" data-path="src/components/performance/UrlTestForm.tsx">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" data-id="wqh8gxrbe" data-path="src/components/performance/UrlTestForm.tsx" />
              <Input
                type="text"
                placeholder="Enter website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
                disabled={isLoading} data-id="im9ppkh38" data-path="src/components/performance/UrlTestForm.tsx" />

            </div>
            {error &&
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-red-500" data-id="hnviag8zf" data-path="src/components/performance/UrlTestForm.tsx">

                {error}
              </motion.p>
            }
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading} data-id="wwjowcf40" data-path="src/components/performance/UrlTestForm.tsx">

            {isLoading ?
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }} data-id="0pl342gd2" data-path="src/components/performance/UrlTestForm.tsx">

                <Loader2 className="w-4 h-4 animate-spin" data-id="13wuiw59h" data-path="src/components/performance/UrlTestForm.tsx" />
                Analyzing Performance...
              </motion.div> :

            'Analyze Performance'
            }
          </Button>
        </motion.form>
        
        <motion.div
          className="mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }} data-id="rlf3v53kr" data-path="src/components/performance/UrlTestForm.tsx">

          <h4 className="font-semibold mb-2" data-id="sdqp47229" data-path="src/components/performance/UrlTestForm.tsx">What we analyze:</h4>
          <ul className="space-y-1 ml-4" data-id="trurj80ce" data-path="src/components/performance/UrlTestForm.tsx">
            <li data-id="5bg6aohiv" data-path="src/components/performance/UrlTestForm.tsx">• Core Web Vitals (LCP, FID, CLS)</li>
            <li data-id="9b6bvkifp" data-path="src/components/performance/UrlTestForm.tsx">• Page Load Speed</li>
            <li data-id="4s4h953ek" data-path="src/components/performance/UrlTestForm.tsx">• Performance Bottlenecks</li>
            <li data-id="5pgmsdza3" data-path="src/components/performance/UrlTestForm.tsx">• Optimization Opportunities</li>
            <li data-id="39dtt2b6l" data-path="src/components/performance/UrlTestForm.tsx">• Specific Fix Recommendations</li>
          </ul>
        </motion.div>
      </CardContent>
    </Card>);

};

export default UrlTestForm;