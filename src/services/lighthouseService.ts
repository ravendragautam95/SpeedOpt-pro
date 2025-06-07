// Lighthouse CLI service for real performance analysis
import { PerformanceReport } from './performanceAnalyzer';

const LIGHTHOUSE_API_BASE = 'http://localhost:3001';

export class LighthouseService {
  private static instance: LighthouseService;

  public static getInstance(): LighthouseService {
    if (!LighthouseService.instance) {
      LighthouseService.instance = new LighthouseService();
    }
    return LighthouseService.instance;
  }

  async checkLighthouseAvailability(): Promise<boolean> {
    try {
      console.log('🔍 Checking Lighthouse CLI availability...');
      
      const response = await fetch(`${LIGHTHOUSE_API_BASE}/lighthouse-check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Service unavailable: ${response.status}`);
      }

      const result = await response.json();
      console.log('Lighthouse availability:', result.message);
      
      return result.available;
    } catch (error) {
      console.warn('❌ Failed to check Lighthouse availability:', error);
      return false;
    }
  }

  async analyzeSite(url: string): Promise<PerformanceReport> {
    try {
      console.log(`🚀 Starting Lighthouse analysis for: ${url}`);
      
      // Check if service is available
      const healthResponse = await fetch(`${LIGHTHOUSE_API_BASE}/health`);
      if (!healthResponse.ok) {
        throw new Error('Lighthouse service unavailable');
      }

      // Run Lighthouse analysis
      const analysisResponse = await fetch(
        `${LIGHTHOUSE_API_BASE}/api/lighthouse?url=${encodeURIComponent(url)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json().catch(() => ({}));
        throw new Error(errorData.details || `Lighthouse analysis failed: ${analysisResponse.status}`);
      }

      const lighthouseData = await analysisResponse.json();
      
      console.log('✅ Lighthouse analysis completed successfully');
      console.log('📊 Performance Score:', lighthouseData.overallScore);
      
      return lighthouseData;
    } catch (error) {
      console.error('❌ Lighthouse service error:', error);
      throw error;
    }
  }

  async getPerformanceReport(url: string, isShopify: boolean = false): Promise<PerformanceReport> {
    try {
      // First check if Lighthouse is available
      const isAvailable = await this.checkLighthouseAvailability();
      if (!isAvailable) {
        throw new Error('Lighthouse CLI not available. Please install with: npm install -g lighthouse');
      }

      const report = await this.analyzeSite(url);
      
      // Add Shopify-specific enhancements if needed
      if (isShopify && report.opportunities) {
        // Enhance opportunities with Shopify-specific information
        report.opportunities = report.opportunities.map(opp => ({
          ...opp,
          shopifyCompatible: this.isShopifyCompatible(opp.id),
          steps: [...opp.steps, ...this.getShopifySpecificSteps(opp.id)]
        }));
      }

      return report;
    } catch (error) {
      console.error('❌ Failed to get Lighthouse performance report:', error);
      throw error;
    }
  }

  private isShopifyCompatible(optimizationId: string): boolean {
    const shopifyCompatibleOptimizations = [
      'uses-optimized-images',
      'uses-webp-images',
      'offscreen-images',
      'uses-text-compression',
      'unminified-css',
      'unminified-javascript'
    ];
    
    return shopifyCompatibleOptimizations.includes(optimizationId);
  }

  private getShopifySpecificSteps(optimizationId: string): string[] {
    const shopifySteps: Record<string, string[]> = {
      'uses-optimized-images': [
        'Use Shopify\'s responsive image functions',
        'Implement proper image sizing with img_url filters'
      ],
      'render-blocking-resources': [
        'Limited control in Shopify themes',
        'Focus on theme optimization and app auditing'
      ],
      'unused-css-rules': [
        'Use Shopify CLI for better CSS management',
        'Minimize theme CSS through customization'
      ],
      'unused-javascript': [
        'Audit Shopify app scripts',
        'Remove unused third-party integrations'
      ]
    };
    
    return shopifySteps[optimizationId] || ['Consider Shopify-specific implementations'];
  }
}

export const lighthouseService = LighthouseService.getInstance(); 