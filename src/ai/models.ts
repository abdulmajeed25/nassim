// AI Models Configuration
// تكوينات نماذج الذكاء الاصطناعي

import { AIModelConfig } from './types';

/**
 * تكوينات نماذج الذكاء الاصطناعي المدعومة
 * يتضمن إعدادات مختلفة لكل مزود خدمة
 */
export const AI_MODELS: Record<string, AIModelConfig> = {
  // نماذج OpenAI
  OPENAI_GPT4: {
    provider: {
      name: 'openai',
      model: 'gpt-4',
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.9
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: true,
      analysis: true
    },
    limits: {
      requestsPerMinute: 60,
      tokensPerRequest: 4096,
      dailyQuota: 100000
    },
    pricing: {
      inputTokens: 0.03,
      outputTokens: 0.06,
      currency: 'USD'
    }
  },

  OPENAI_GPT35_TURBO: {
    provider: {
      name: 'openai',
      model: 'gpt-3.5-turbo',
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.9
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: true,
      analysis: true
    },
    limits: {
      requestsPerMinute: 90,
      tokensPerRequest: 4096,
      dailyQuota: 200000
    },
    pricing: {
      inputTokens: 0.001,
      outputTokens: 0.002,
      currency: 'USD'
    }
  },

  OPENAI_DALL_E_3: {
    provider: {
      name: 'openai',
      model: 'dall-e-3',
      maxTokens: 1000,
      temperature: 0.8
    },
    capabilities: {
      textGeneration: false,
      imageGeneration: true,
      codeGeneration: false,
      translation: false,
      analysis: false
    },
    limits: {
      requestsPerMinute: 10,
      tokensPerRequest: 1000,
      dailyQuota: 100
    },
    pricing: {
      inputTokens: 0.04,
      outputTokens: 0.08,
      currency: 'USD'
    }
  },

  // نماذج Anthropic
  ANTHROPIC_CLAUDE_3: {
    provider: {
      name: 'anthropic',
      model: 'claude-3-opus-20240229',
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.9
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: true,
      analysis: true
    },
    limits: {
      requestsPerMinute: 50,
      tokensPerRequest: 4096,
      dailyQuota: 80000
    },
    pricing: {
      inputTokens: 0.015,
      outputTokens: 0.075,
      currency: 'USD'
    }
  },

  ANTHROPIC_CLAUDE_HAIKU: {
    provider: {
      name: 'anthropic',
      model: 'claude-3-haiku-20240307',
      maxTokens: 4096,
      temperature: 0.7,
      topP: 0.9
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: true,
      analysis: true
    },
    limits: {
      requestsPerMinute: 100,
      tokensPerRequest: 4096,
      dailyQuota: 300000
    },
    pricing: {
      inputTokens: 0.00025,
      outputTokens: 0.00125,
      currency: 'USD'
    }
  },

  // نماذج Google
  GOOGLE_GEMINI_PRO: {
    provider: {
      name: 'google',
      model: 'gemini-pro',
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.8
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: true,
      analysis: true
    },
    limits: {
      requestsPerMinute: 60,
      tokensPerRequest: 2048,
      dailyQuota: 150000
    },
    pricing: {
      inputTokens: 0.0005,
      outputTokens: 0.0015,
      currency: 'USD'
    }
  },

  GOOGLE_GEMINI_VISION: {
    provider: {
      name: 'google',
      model: 'gemini-pro-vision',
      maxTokens: 2048,
      temperature: 0.7,
      topP: 0.8
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: false,
      translation: false,
      analysis: true
    },
    limits: {
      requestsPerMinute: 30,
      tokensPerRequest: 2048,
      dailyQuota: 50000
    },
    pricing: {
      inputTokens: 0.00025,
      outputTokens: 0.0005,
      currency: 'USD'
    }
  },

  // نماذج محلية
  LOCAL_LLAMA2: {
    provider: {
      name: 'local',
      endpoint: 'http://localhost:11434',
      model: 'llama2:7b',
      maxTokens: 2048,
      temperature: 0.7
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: false,
      analysis: true
    },
    limits: {
      requestsPerMinute: 1000,
      tokensPerRequest: 2048,
      dailyQuota: 1000000
    },
    pricing: {
      inputTokens: 0,
      outputTokens: 0,
      currency: 'USD'
    }
  },

  LOCAL_CODELLAMA: {
    provider: {
      name: 'local',
      endpoint: 'http://localhost:11434',
      model: 'codellama:7b',
      maxTokens: 2048,
      temperature: 0.3
    },
    capabilities: {
      textGeneration: true,
      imageGeneration: false,
      codeGeneration: true,
      translation: false,
      analysis: true
    },
    limits: {
      requestsPerMinute: 1000,
      tokensPerRequest: 2048,
      dailyQuota: 1000000
    },
    pricing: {
      inputTokens: 0,
      outputTokens: 0,
      currency: 'USD'
    }
  }
};

/**
 * تكوينات النماذج المخصصة لمهام محددة
 */
export const TASK_SPECIFIC_MODELS = {
  // أفضل النماذج لتوليد المحتوى
  CONTENT_GENERATION: {
    primary: 'OPENAI_GPT4',
    fallback: 'ANTHROPIC_CLAUDE_3',
    local: 'LOCAL_LLAMA2'
  },

  // أفضل النماذج لتحليل التصميم
  DESIGN_ANALYSIS: {
    primary: 'ANTHROPIC_CLAUDE_3',
    fallback: 'OPENAI_GPT4',
    local: 'LOCAL_LLAMA2'
  },

  // أفضل النماذج لتحسين SEO
  SEO_OPTIMIZATION: {
    primary: 'OPENAI_GPT4',
    fallback: 'GOOGLE_GEMINI_PRO',
    local: 'LOCAL_LLAMA2'
  },

  // أفضل النماذج للترجمة
  TRANSLATION: {
    primary: 'OPENAI_GPT4',
    fallback: 'ANTHROPIC_CLAUDE_3',
    local: 'LOCAL_LLAMA2'
  },

  // أفضل النماذج لتحليل الكود
  CODE_ANALYSIS: {
    primary: 'OPENAI_GPT4',
    fallback: 'ANTHROPIC_CLAUDE_3',
    local: 'LOCAL_CODELLAMA'
  },

  // أفضل النماذج لتوليد الصور
  IMAGE_GENERATION: {
    primary: 'OPENAI_DALL_E_3',
    fallback: null,
    local: null
  },

  // أفضل النماذج للتحليل السريع
  QUICK_ANALYSIS: {
    primary: 'OPENAI_GPT35_TURBO',
    fallback: 'ANTHROPIC_CLAUDE_HAIKU',
    local: 'LOCAL_LLAMA2'
  }
};

/**
 * دالة للحصول على تكوين نموذج محدد
 */
export function getModelConfig(modelId: string): AIModelConfig | undefined {
  return AI_MODELS[modelId];
}

/**
 * دالة للحصول على أفضل نموذج لمهمة محددة
 */
export function getBestModelForTask(
  task: keyof typeof TASK_SPECIFIC_MODELS,
  preference: 'primary' | 'fallback' | 'local' = 'primary'
): AIModelConfig | undefined {
  const taskConfig = TASK_SPECIFIC_MODELS[task];
  if (!taskConfig) return undefined;

  const modelId = taskConfig[preference];
  if (!modelId) return undefined;

  return getModelConfig(modelId);
}

/**
 * دالة للحصول على النماذج المتاحة حسب القدرة
 */
export function getModelsByCapability(capability: keyof AIModelConfig['capabilities']): AIModelConfig[] {
  return Object.values(AI_MODELS).filter(model => model.capabilities[capability]);
}

/**
 * دالة للحصول على النماذج ضمن ميزانية محددة
 */
export function getModelsWithinBudget(
  maxCostPerToken: number,
  currency: string = 'USD'
): AIModelConfig[] {
  return Object.values(AI_MODELS).filter(model => 
    model.pricing.currency === currency && 
    model.pricing.outputTokens <= maxCostPerToken
  );
}

/**
 * دالة لحساب تكلفة الطلب المتوقعة
 */
export function calculateRequestCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): { cost: number; currency: string } | null {
  const model = getModelConfig(modelId);
  if (!model) return null;

  const cost = 
    (inputTokens * model.pricing.inputTokens) + 
    (outputTokens * model.pricing.outputTokens);

  return {
    cost: Math.round(cost * 10000) / 10000, // تقريب إلى 4 منازل عشرية
    currency: model.pricing.currency
  };
}

/**
 * دالة للتحقق من توفر النموذج
 */
export function isModelAvailable(modelId: string): boolean {
  const model = getModelConfig(modelId);
  if (!model) return false;

  // التحقق من النماذج المحلية
  if (model.provider.name === 'local') {
    // يمكن إضافة فحص اتصال فعلي هنا
    return true;
  }

  // التحقق من وجود مفتاح API للنماذج السحابية
  return !!model.provider.apiKey;
}

/**
 * دالة لتحديث إعدادات النموذج
 */
export function updateModelConfig(
  modelId: string,
  updates: Partial<AIModelConfig>
): boolean {
  const model = AI_MODELS[modelId];
  if (!model) return false;

  // دمج التحديثات مع التكوين الحالي
  AI_MODELS[modelId] = {
    ...model,
    ...updates,
    provider: {
      ...model.provider,
      ...updates.provider
    },
    capabilities: {
      ...model.capabilities,
      ...updates.capabilities
    },
    limits: {
      ...model.limits,
      ...updates.limits
    },
    pricing: {
      ...model.pricing,
      ...updates.pricing
    }
  };

  return true;
}

/**
 * إعدادات افتراضية للنماذج
 */
export const DEFAULT_MODEL_SETTINGS = {
  temperature: 0.7,
  topP: 0.9,
  maxTokens: 2048,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
  timeout: 30000, // 30 ثانية
  retries: 3
};

/**
 * أنواع المهام المدعومة
 */
export const SUPPORTED_TASKS = {
  CONTENT_GENERATION: 'content_generation',
  DESIGN_ANALYSIS: 'design_analysis',
  SEO_OPTIMIZATION: 'seo_optimization',
  TRANSLATION: 'translation',
  CODE_ANALYSIS: 'code_analysis',
  IMAGE_GENERATION: 'image_generation',
  QUICK_ANALYSIS: 'quick_analysis',
  USER_BEHAVIOR_ANALYSIS: 'user_behavior_analysis',
  PERFORMANCE_OPTIMIZATION: 'performance_optimization'
} as const;

export type SupportedTask = typeof SUPPORTED_TASKS[keyof typeof SUPPORTED_TASKS];

/**
 * معلومات مزودي الخدمة
 */
export const PROVIDER_INFO = {
  openai: {
    name: 'OpenAI',
    website: 'https://openai.com',
    documentation: 'https://platform.openai.com/docs',
    strengths: ['توليد النصوص', 'الترجمة', 'تحليل الكود', 'توليد الصور'],
    limitations: ['التكلفة العالية', 'حدود الاستخدام'],
    bestFor: ['المشاريع التجارية', 'التطبيقات عالية الجودة']
  },
  anthropic: {
    name: 'Anthropic',
    website: 'https://anthropic.com',
    documentation: 'https://docs.anthropic.com',
    strengths: ['الأمان', 'التحليل المتقدم', 'المحادثات الطويلة'],
    limitations: ['توفر محدود', 'تكلفة متوسطة'],
    bestFor: ['التحليل المعقد', 'المحتوى الحساس']
  },
  google: {
    name: 'Google AI',
    website: 'https://ai.google',
    documentation: 'https://ai.google.dev/docs',
    strengths: ['السرعة', 'التكامل مع خدمات Google', 'التكلفة المنخفضة'],
    limitations: ['قدرات محدودة', 'جودة متغيرة'],
    bestFor: ['التطبيقات السريعة', 'النماذج الأولية']
  },
  local: {
    name: 'Local Models',
    website: 'https://ollama.ai',
    documentation: 'https://github.com/ollama/ollama',
    strengths: ['الخصوصية', 'عدم وجود تكلفة', 'التحكم الكامل'],
    limitations: ['يتطلب موارد محلية', 'جودة أقل', 'إعداد معقد'],
    bestFor: ['البيانات الحساسة', 'التطوير المحلي', 'التوفير في التكاليف']
  }
};

/**
 * دالة للحصول على معلومات مزود الخدمة
 */
export function getProviderInfo(providerName: string) {
  return PROVIDER_INFO[providerName as keyof typeof PROVIDER_INFO];
}

/**
 * دالة لمقارنة النماذج
 */
export function compareModels(modelIds: string[]): {
  models: Array<{
    id: string;
    config: AIModelConfig;
    score: number;
  }>;
  recommendation: string;
} {
  const models = modelIds
    .map(id => ({ id, config: getModelConfig(id) }))
    .filter(item => item.config)
    .map(item => {
      const config = item.config!;
      
      // حساب نقاط بناءً على عوامل مختلفة
      let score = 0;
      
      // نقاط القدرات
      score += Object.values(config.capabilities).filter(Boolean).length * 10;
      
      // نقاط التكلفة (أقل تكلفة = نقاط أعلى)
      score += Math.max(0, 100 - (config.pricing.outputTokens * 1000));
      
      // نقاط الحدود (حدود أعلى = نقاط أعلى)
      score += Math.min(50, config.limits.requestsPerMinute);
      score += Math.min(50, config.limits.tokensPerRequest / 100);
      
      return {
        id: item.id,
        config,
        score: Math.round(score)
      };
    })
    .sort((a, b) => b.score - a.score);

  const recommendation = models.length > 0 
    ? `يُنصح باستخدام ${models[0].id} للحصول على أفضل أداء وقيمة`
    : 'لا توجد نماذج متاحة للمقارنة';

  return { models, recommendation };
}