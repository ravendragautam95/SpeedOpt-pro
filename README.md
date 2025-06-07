# 🚀 SpeedOpt Pro - Website Performance Analyzer

A comprehensive website performance analysis tool built with React, TypeScript, and Lighthouse CLI. Get detailed insights into your website's performance with mobile/desktop separation, actionable optimization recommendations, and Shopify-specific analysis.

![SpeedOpt Pro Dashboard](https://img.shields.io/badge/Performance-Analyzer-blue?style=for-the-badge)
![Lighthouse CLI](https://img.shields.io/badge/Lighthouse-CLI-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎯 Core Performance Analysis
- **Real Lighthouse CLI Integration** - Actual Google Lighthouse analysis
- **Mobile & Desktop Separation** - Device-specific performance data
- **Core Web Vitals Tracking** - LCP, FID, CLS, TTFB with detailed insights
- **Performance Categories** - Performance, Accessibility, Best Practices, SEO
- **Raw Data Logging** - Complete visibility into Lighthouse results

### 🛍️ Shopify Store Optimization
- **Platform-Specific Analysis** - Tailored for Shopify stores
- **Theme Optimization** - Liquid template performance insights
- **App Impact Analysis** - Third-party app performance evaluation
- **Shopify-Compatible Solutions** - Actionable recommendations within platform constraints

### 📊 Advanced Analytics
- **Interactive Dashboard** - Beautiful, responsive UI with Framer Motion animations
- **Detailed Optimization Opportunities** - Step-by-step implementation guides
- **Difficulty Ratings** - Easy, Medium, Hard classifications
- **Potential Savings** - Time and performance impact estimates
- **Solution Categories** - General and Shopify-specific recommendations

### 🔧 Technical Solutions
- **Render-blocking Resources** - CSS/JS optimization strategies
- **Unused Code Elimination** - CSS and JavaScript tree-shaking
- **Image Optimization** - WebP/AVIF conversion and lazy loading
- **Text Compression** - GZIP/Brotli configuration
- **Critical Resource Prioritization** - Above-the-fold optimization

## 🏗️ Architecture

```
SpeedOpt Pro/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── performance/          # Performance-specific components
│   │   │   ├── MobileDesktopTabs.tsx    # Device-specific analysis tabs
│   │   │   ├── CoreWebVitals.tsx        # Web Vitals visualization
│   │   │   ├── ShopifyOptimizer.tsx     # Shopify-specific features
│   │   │   └── ActionableOptimizations.tsx # Solution recommendations
│   │   └── ui/                   # Base UI components (shadcn/ui)
│   ├── services/                 # API and business logic
│   │   ├── lighthouseService.ts  # Lighthouse CLI integration
│   │   ├── performanceService.ts # Data processing and analysis
│   │   └── performanceAnalyzer.ts # Core analysis algorithms
│   └── pages/                    # Application pages
│       └── PerformanceDashboard.tsx # Main dashboard
├── server/                       # Backend services
│   └── lighthouse-service.js     # Express server for Lighthouse CLI
├── workers/                      # Cloudflare Workers (optional)
│   └── index.js                  # Serverless API for cloud deployment
└── public/                       # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn
- Lighthouse CLI (`npm install -g lighthouse`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/speedOpt-pro.git
   cd speedOpt-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Lighthouse CLI globally**
   ```bash
   npm install -g lighthouse
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Start the frontend
   npm run dev

   # Terminal 2: Start the Lighthouse service
   cd server && node lighthouse-service.js
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Lighthouse API: `http://localhost:3001`

## 📱 Usage

### Basic Website Analysis
1. Enter any website URL in the analysis form
2. Toggle Shopify mode for e-commerce stores
3. Click "Analyze Performance" to start the analysis
4. View results in mobile/desktop tabs with detailed recommendations

### Shopify Store Analysis
1. Enable "Shopify Store" toggle
2. Enter your store URL (supports .myshopify.com domains)
3. Get platform-specific optimization recommendations
4. Access Shopify-compatible implementation guides

### Understanding Results

#### Performance Scores
- **90-100**: Excellent performance
- **50-89**: Needs improvement  
- **0-49**: Poor performance

#### Core Web Vitals Ratings
- **LCP (Largest Contentful Paint)**: Good (<2.5s), Needs Improvement (2.5-4s), Poor (>4s)
- **FID (First Input Delay)**: Good (<100ms), Needs Improvement (100-300ms), Poor (>300ms)
- **CLS (Cumulative Layout Shift)**: Good (<0.1), Needs Improvement (0.1-0.25), Poor (>0.25)
- **TTFB (Time to First Byte)**: Good (<200ms), Needs Improvement (200-600ms), Poor (>600ms)

## 🔧 Configuration

### Environment Variables
Create `.env` files for different environments:

**.env.development**
```bash
VITE_API_URL=http://localhost:3001
VITE_LIGHTHOUSE_SERVICE_URL=http://localhost:3001
```

**.env.production**
```bash
VITE_API_URL=https://your-api-domain.com
VITE_LIGHTHOUSE_SERVICE_URL=https://your-lighthouse-service.com
```

### Lighthouse Configuration
The Lighthouse service supports various configurations:

```javascript
// server/lighthouse-service.js
const lighthouseConfig = {
  mobile: {
    preset: 'perf',
    formFactor: 'mobile',
    categories: ['performance', 'accessibility', 'best-practices', 'seo']
  },
  desktop: {
    preset: 'desktop',
    formFactor: 'desktop',
    screenEmulation: { disabled: true }
  }
};
```

## 🌐 Deployment

### Cloudflare Workers & Pages (Recommended)

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Deploy Workers API**
   ```bash
   npm run workers:deploy
   ```

3. **Deploy Frontend to Pages**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name speedopt-pro
   ```

### Traditional Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Set up the backend** on a Node.js server with Lighthouse CLI installed

## 🎨 UI Components

Built with modern design principles using:
- **shadcn/ui** - High-quality, accessible components
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Beautiful, consistent iconography
- **Recharts** - Interactive data visualizations

### Key Components
- `MobileDesktopTabs` - Device-specific performance analysis
- `CoreWebVitals` - Web Vitals visualization with ratings
- `ActionableOptimizations` - Step-by-step improvement guides
- `ShopifyOptimizer` - Platform-specific recommendations
- `LoadingTimeline` - Performance metrics timeline
- `ImprovementPreview` - Before/after performance projections

## 🔍 API Reference

### Lighthouse Analysis Endpoint
```typescript
GET /api/lighthouse?url={website_url}

Response: {
  url: string;
  timestamp: string;
  dataSource: 'lighthouse-cli';
  overallScore: {
    mobile: number;
    desktop: number;
  };
  mobile: {
    categoryScores: CategoryScores;
    coreWebVitals: CoreWebVitals;
    loadingTimes: LoadingTimes;
    opportunities: Opportunity[];
  };
  desktop: {
    categoryScores: CategoryScores;
    coreWebVitals: CoreWebVitals;
    loadingTimes: LoadingTimes;
    opportunities: Opportunity[];
  };
  opportunities: Opportunity[];
  issues: Issue[];
}
```

### Data Types
```typescript
interface CoreWebVitals {
  lcp: { value: number; rating: string };
  fid: { value: number; rating: string };
  cls: { value: number; rating: string };
  ttfb: { value: number; rating: string };
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  potential: number;
  difficulty: 'easy' | 'medium' | 'hard';
  shopifyCompatible: boolean;
  solutions: string[];
  shopifySteps: string[];
}
```

## 🧪 Testing

### Manual Testing
1. Test with various website types:
   - Static sites (excellent performance)
   - E-commerce stores (moderate performance)
   - Heavy applications (poor performance)

2. Verify mobile vs desktop differences
3. Test Shopify-specific features with actual stores

### Performance Validation
Compare results with:
- Google PageSpeed Insights
- Web.dev Measure tool
- GTmetrix
- WebPageTest

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Implement responsive designs
- Add comprehensive error handling
- Include console logging for debugging

## 📊 Performance Benchmarks

SpeedOpt Pro itself achieves:
- **Performance Score**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.0s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <2.5s

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript 5.5.3** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Lighthouse CLI** - Performance analysis engine

### Cloud Infrastructure
- **Cloudflare Workers** - Serverless API
- **Cloudflare Pages** - Static site hosting
- **PageSpeed Insights API** - Google's performance data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Lighthouse** - Core performance analysis engine
- **Shopify** - E-commerce platform insights
- **Cloudflare** - Global infrastructure and hosting
- **shadcn/ui** - Beautiful component library
- **Vercel** - Design inspiration and best practices

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/speedOpt-pro/issues)
- **Documentation**: [Wiki](https://github.com/your-username/speedOpt-pro/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/speedOpt-pro/discussions)

---

<p align="center">
  <strong>Built with ❤️ for web performance optimization</strong>
</p>

<p align="center">
  <a href="https://github.com/your-username/speedOpt-pro">⭐ Star this repo</a> •
  <a href="https://github.com/your-username/speedOpt-pro/issues">🐛 Report Bug</a> •
  <a href="https://github.com/your-username/speedOpt-pro/issues">✨ Request Feature</a>
</p>
