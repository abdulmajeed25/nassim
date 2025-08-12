// AI System Types
// Type definitions for AI-powered features

import { PageTemplate, SectionTemplate } from '../templates/types';
import { Block } from '../blocks/schemas';

// AI Provider Configuration
export interface AIProvider {
  name: 'openai' | 'anthropic' | 'google' | 'local';
  apiKey?: string;
  endpoint?: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

// AI Generation Request
export interface AIGenerationRequest {
  type: 'template' | 'content' | 'design' | 'seo' | 'translation';
  prompt: string;
  context?: {
    businessType?: string;
    targetAudience?: string[];
    industry?: string;
    language?: 'ar' | 'en';
    brand?: {
      name: string;
      colors: string[];
      fonts: string[];
      tone: string;
    };
    existing?: {
      templates?: (PageTemplate | SectionTemplate)[];
      content?: string[];
      images?: string[];
    };
  };
  constraints?: {
    maxBlocks?: number;
    requiredSections?: string[];
    excludedElements?: string[];
    performanceTargets?: {
      loadTime?: number;
      seoScore?: number;
      accessibilityScore?: number;
    };
  };
  preferences?: {
    style?: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant';
    complexity?: 'simple' | 'moderate' | 'advanced';
    colorScheme?: 'light' | 'dark' | 'auto';
    layout?: 'single-column' | 'multi-column' | 'grid' | 'masonry';
  };
}

// AI Generation Response
export interface AIGenerationResponse {
  success: boolean;
  data?: {
    template?: PageTemplate | SectionTemplate;
    content?: {
      title?: string;
      description?: string;
      blocks?: Block[];
      metadata?: Record<string, any>;
    };
    design?: {
      colors?: string[];
      fonts?: string[];
      spacing?: Record<string, number>;
      layout?: Record<string, any>;
    };
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
      schema?: Record<string, any>;
    };
    translation?: {
      language: string;
      content: Record<string, string>;
    };
  };
  metadata?: {
    tokensUsed?: number;
    processingTime?: number;
    confidence?: number;
    suggestions?: string[];
    warnings?: string[];
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Content Generation Types
export interface ContentGenerationRequest {
  type: 'hero' | 'about' | 'services' | 'testimonial' | 'faq' | 'blog' | 'product';
  businessInfo: {
    name: string;
    industry: string;
    services: string[];
    location?: string;
    experience?: number;
    specialties?: string[];
  };
  targetAudience: {
    demographics: string[];
    painPoints: string[];
    goals: string[];
  };
  tone: 'professional' | 'friendly' | 'authoritative' | 'casual' | 'urgent';
  language: 'ar' | 'en';
  length: 'short' | 'medium' | 'long';
  keywords?: string[];
  existingContent?: string;
}

export interface GeneratedContent {
  title: string;
  subtitle?: string;
  content: string;
  cta?: {
    text: string;
    action: string;
  };
  metadata: {
    wordCount: number;
    readingTime: number;
    seoScore: number;
    keywords: string[];
  };
}

// Design Optimization Types
export interface DesignAnalysis {
  colorHarmony: {
    score: number;
    suggestions: string[];
    palette: string[];
  };
  typography: {
    score: number;
    suggestions: string[];
    fontPairings: {
      heading: string;
      body: string;
    }[];
  };
  layout: {
    score: number;
    suggestions: string[];
    improvements: {
      spacing: Record<string, number>;
      alignment: string[];
      hierarchy: string[];
    };
  };
  accessibility: {
    score: number;
    issues: string[];
    fixes: string[];
  };
  performance: {
    score: number;
    metrics: {
      loadTime: number;
      imageOptimization: number;
      codeEfficiency: number;
    };
    optimizations: string[];
  };
}

// SEO Optimization Types
export interface SEOAnalysis {
  score: number;
  title: {
    current: string;
    suggestions: string[];
    score: number;
  };
  description: {
    current: string;
    suggestions: string[];
    score: number;
  };
  keywords: {
    primary: string[];
    secondary: string[];
    missing: string[];
    density: Record<string, number>;
  };
  content: {
    headingStructure: {
      score: number;
      issues: string[];
    };
    readability: {
      score: number;
      level: string;
      suggestions: string[];
    };
    length: {
      wordCount: number;
      recommendation: string;
    };
  };
  technical: {
    schema: {
      present: boolean;
      suggestions: string[];
    };
    images: {
      altText: number;
      optimization: number;
    };
    links: {
      internal: number;
      external: number;
      broken: string[];
    };
  };
}

// User Behavior Analysis Types
export interface UserBehaviorData {
  users: Array<{
    id: string;
    sessions: number;
    totalTime: number;
    lastVisit: string;
  }>;
  sessions: Array<{
    id: string;
    userId: string;
    startTime: string;
    endTime: string;
    duration: number;
    pageViews: number;
    template: string;
  }>;
  pageViews: {
    template: string;
    views: number;
    uniqueViews: number;
    bounceRate: number;
    avgTimeOnPage: number;
  }[];
  patterns: {
    activeHours: Record<string, number>;
    preferredContentTypes: string[];
    sessionDuration: {
      short: number;
      medium: number;
      long: number;
    };
  };
  timeSpent?: number;
  interactions: {
    clicks: {
      element: string;
      count: number;
      conversionRate: number;
    }[];
    scrollDepth: {
      template: string;
      avgDepth: number;
      exitPoints: number[];
    }[];
    formSubmissions: {
      form: string;
      submissions: number;
      completionRate: number;
    }[];
  };
  conversions: {
    goals: {
      name: string;
      completions: number;
      rate: number;
    }[];
    revenue: {
      total: number;
      perVisitor: number;
      perTemplate: Record<string, number>;
    };
  };
  demographics: {
    location: Record<string, number>;
    device: Record<string, number>;
    browser: Record<string, number>;
    timeOfDay: Record<string, number>;
  };
}

export interface BehaviorInsights {
  topPerformingTemplates: {
    template: string;
    score: number;
    metrics: {
      conversionRate: number;
      engagementScore: number;
      userSatisfaction: number;
    };
  }[];
  optimizationOpportunities: {
    template: string;
    issues: string[];
    recommendations: string[];
    potentialImpact: 'low' | 'medium' | 'high';
  }[];
  userJourney: {
    commonPaths: {
      path: string[];
      frequency: number;
      conversionRate: number;
    }[];
    dropoffPoints: {
      page: string;
      dropoffRate: number;
      reasons: string[];
    }[];
  };
  recommendations: {
    contentOptimization: string[];
    designImprovements: string[];
    technicalEnhancements: string[];
    userExperience: string[];
  };
}

// Smart Recommendations Types
export interface RecommendationContext {
  currentTemplate: PageTemplate | SectionTemplate;
  type?: string;
  goal?: string;
  location?: string;
  budget?: number;
  industry?: string;
  urgency?: 'low' | 'medium' | 'high';
  purpose?: string;
  targetAudience?: string[];
  userId?: string;
  maxResults?: number;
  userProfile: {
    businessType: string;
    experience: 'beginner' | 'intermediate' | 'advanced';
    goals: string[];
    preferences: {
      style: string;
      complexity: string;
      features: string[];
    };
  };
  performanceData?: {
    currentMetrics: {
      conversionRate: number;
      bounceRate: number;
      loadTime: number;
      seoScore: number;
    };
    benchmarks: {
      industry: Record<string, number>;
      competitors: Record<string, number>;
    };
  };
  constraints?: {
    budget: 'low' | 'medium' | 'high';
    timeline: 'urgent' | 'normal' | 'flexible';
    resources: 'limited' | 'moderate' | 'extensive';
  };
}

export interface SmartRecommendation {
  id: string;
  type: 'template' | 'content' | 'design' | 'feature' | 'optimization';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  reasoning: string;
  confidence: number;
  metadata?: {
    price?: number;
    industry?: string;
    tags?: string[];
    algorithm?: string;
  };
  implementation: {
    difficulty: 'easy' | 'medium' | 'hard';
    timeEstimate: string;
    steps: string[];
    resources: string[];
  };
  expectedImpact: {
    metric: string;
    improvement: string;
    confidence: number;
  }[];
  alternatives?: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  }[];
}

// Translation Types
export interface TranslationRequest {
  content: Record<string, string>;
  sourceLanguage: 'ar' | 'en';
  targetLanguage: 'ar' | 'en';
  context?: {
    businessType?: string;
    industry?: string;
    tone?: string;
    audience?: string;
  };
  preserveFormatting?: boolean;
  customTerms?: Record<string, string>;
}

export interface TranslationResponse {
  translatedContent: Record<string, string>;
  quality: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  metadata: {
    wordsTranslated: number;
    processingTime: number;
    confidence: number;
  };
}

// AI Model Configuration
export interface AIModelConfig {
  provider: AIProvider;
  capabilities: {
    textGeneration: boolean;
    imageGeneration: boolean;
    codeGeneration: boolean;
    translation: boolean;
    analysis: boolean;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerRequest: number;
    dailyQuota: number;
  };
  pricing: {
    inputTokens: number;
    outputTokens: number;
    currency: string;
  };
}

// AI Training Data
export interface TrainingData {
  templates: {
    successful: (PageTemplate | SectionTemplate)[];
    failed: (PageTemplate | SectionTemplate)[];
    feedback: {
      templateId: string;
      rating: number;
      comments: string[];
      improvements: string[];
    }[];
  };
  content: {
    highPerforming: {
      type: string;
      content: string;
      metrics: Record<string, number>;
    }[];
    userPreferences: {
      industry: string;
      preferences: Record<string, any>;
    }[];
  };
  design: {
    trends: {
      year: number;
      styles: string[];
      colors: string[];
      layouts: string[];
    }[];
    conversions: {
      element: string;
      variations: {
        design: Record<string, any>;
        conversionRate: number;
      }[];
    }[];
  };
}

// AI Analytics
export interface AIAnalytics {
  usage: {
    totalRequests: number;
    successRate: number;
    averageResponseTime: number;
    tokenConsumption: {
      total: number;
      byFeature: Record<string, number>;
      cost: number;
    };
  };
  performance: {
    accuracy: {
      contentGeneration: number;
      templateGeneration: number;
      seoOptimization: number;
      translation: number;
    };
    userSatisfaction: {
      averageRating: number;
      feedbackCount: number;
      commonComplaints: string[];
      improvements: string[];
    };
  };
  trends: {
    popularFeatures: string[];
    emergingNeeds: string[];
    seasonalPatterns: Record<string, number>;
  };
};

// Error Types
export interface AIError {
  code: 'RATE_LIMIT' | 'INVALID_REQUEST' | 'MODEL_ERROR' | 'NETWORK_ERROR' | 'QUOTA_EXCEEDED';
  message: string;
  details?: {
    provider?: string;
    model?: string;
    requestId?: string;
    retryAfter?: number;
  };
  suggestions?: string[];
}

// Prompt Templates
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'design' | 'seo' | 'analysis' | 'optimization';
  template: string;
  variables: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required: boolean;
    description: string;
    defaultValue?: any;
  }[];
  examples: {
    input: Record<string, any>;
    output: string;
  }[];
  metadata: {
    version: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    usageCount: number;
    rating: number;
  };
}