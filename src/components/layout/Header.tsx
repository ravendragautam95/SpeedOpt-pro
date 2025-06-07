import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gauge, 
  Github, 
  BookOpen, 
  Star,
  Zap
} from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <Gauge className="h-8 w-8 text-primary" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Zap className="h-3 w-3 text-yellow-500" />
                </motion.div>
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  SpeedOpt
                </h1>
                <Badge variant="secondary" className="text-xs">
                  Pro
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              Analytics
            </Button>
            <Button variant="ghost" size="sm">
              Reports
            </Button>
            <Button variant="ghost" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Docs
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Star className="h-4 w-4 mr-2" />
              Star
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
} 