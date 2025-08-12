// AI Utilities
// دوال مساعدة للذكاء الاصطناعي

import { 
  AIGenerationRequest, 
  AIGenerationResponse, 
  AIError
} from './types';

/**
 * دالة لتنظيف وتنسيق النص
 */
export function cleanText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // استبدال المسافات المتعددة بمسافة واحدة
    .replace(/\n\s*\n/g, '\n') // إزالة الأسطر الفارغة المتعددة
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // إزالة الأحرف غير المرئية
    .normalize('NFC'); // تطبيع الأحرف العربية
}

/**
 * دالة لحساب عدد الرموز في النص
 */
export function countTokens(text: string): number {
  // تقدير تقريبي: كل 4 أحرف = رمز واحد للإنجليزية
  // كل 2-3 أحرف = رمز واحد للعربية
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const otherChars = text.length - arabicChars;
  
  return Math.ceil(arabicChars / 2.5 + otherChars / 4);
}

/**
 * دالة لتقسيم النص إلى أجزاء حسب حد الرموز
 */
export function splitTextByTokens(text: string, maxTokens: number): string[] {
  const sentences = text.split(/[.!?؟]\s+/);
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    const sentenceWithPunctuation = sentence + (sentence.endsWith('.') || sentence.endsWith('!') || sentence.endsWith('?') || sentence.endsWith('؟') ? '' : '.');
    const potentialChunk = currentChunk + (currentChunk ? ' ' : '') + sentenceWithPunctuation;
    
    if (countTokens(potentialChunk) <= maxTokens) {
      currentChunk = potentialChunk;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = sentenceWithPunctuation;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

/**
 * دالة للتحقق من صحة طلب الذكاء الاصطناعي
 */
export function validateAIRequest(request: AIGenerationRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!request.prompt || request.prompt.trim().length === 0) {
    errors.push('Prompt is required and cannot be empty');
  }
  
  if (request.prompt && countTokens(request.prompt) > 4000) {
    errors.push('Prompt is too long (exceeds 4000 tokens)');
  }
  
  if (!request.type || !['template', 'content', 'design', 'seo', 'translation'].includes(request.type)) {
    errors.push('Invalid request type');
  }
  
  if (request.constraints?.maxBlocks && request.constraints.maxBlocks < 1) {
    errors.push('maxBlocks must be at least 1');
  }
  
  if (request.constraints?.performanceTargets?.loadTime && request.constraints.performanceTargets.loadTime < 0) {
    errors.push('loadTime must be positive');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * دالة لإنشاء استجابة خطأ موحدة
 */
export function createErrorResponse(error: AIError): AIGenerationResponse {
  return {
    success: false,
    error,
    metadata: {
      tokensUsed: 0,
      processingTime: 0,
      confidence: 0
    }
  };
}

/**
 * دالة لإنشاء استجابة نجاح موحدة
 */
export function createSuccessResponse(
  data: any,
  metadata: {
    tokensUsed: number;
    processingTime: number;
    confidence: number;
  }
): AIGenerationResponse {
  return {
    success: true,
    data,
    metadata
  };
}

/**
 * دالة لمعالجة الأخطاء وإنشاء رسائل خطأ مفهومة
 */
export function handleAIError(error: any): AIError {
  if (error.code === 'rate_limit_exceeded') {
    return {
      code: 'RATE_LIMIT',
      message: 'تم تجاوز حد الطلبات المسموح. يرجى المحاولة لاحقاً.',
      details: {
        retryAfter: error.retry_after || 60
      },
      suggestions: [
        'انتظر قليلاً قبل إرسال طلب جديد',
        'استخدم نموذج ذكاء اصطناعي آخر',
        'قلل من حجم الطلب'
      ]
    };
  }
  
  if (error.code === 'invalid_api_key') {
    return {
      code: 'INVALID_REQUEST',
      message: 'مفتاح API غير صحيح أو منتهي الصلاحية.',
      suggestions: [
        'تحقق من صحة مفتاح API',
        'تأكد من عدم انتهاء صلاحية المفتاح',
        'استخدم مزود خدمة آخر'
      ]
    };
  }
  
  if (error.code === 'quota_exceeded') {
    return {
      code: 'QUOTA_EXCEEDED',
      message: 'تم تجاوز الحصة المسموحة لهذا الشهر.',
      suggestions: [
        'انتظر حتى بداية الشهر القادم',
        'ترقية خطة الاشتراك',
        'استخدم نموذج محلي مجاني'
      ]
    };
  }
  
  if (error.message && error.message.includes('timeout')) {
    return {
      code: 'NETWORK_ERROR',
      message: 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.',
      suggestions: [
        'تحقق من اتصال الإنترنت',
        'قلل من حجم الطلب',
        'حاول مرة أخرى بعد قليل'
      ]
    };
  }
  
  return {
    code: 'MODEL_ERROR',
    message: error.message || 'حدث خطأ غير متوقع في النموذج.',
    suggestions: [
      'حاول مرة أخرى',
      'استخدم نموذج آخر',
      'تحقق من صحة البيانات المدخلة'
    ]
  };
}

/**
 * دالة لإعادة المحاولة مع تأخير تدريجي
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // تأخير تدريجي: 1s, 2s, 4s, 8s...
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * دالة لتحسين الأداء بالتخزين المؤقت
 */
export class AICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttlMinutes: number = 60): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }
  
  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  has(key: string): boolean {
    return this.get(key) !== null;
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
  
  // تنظيف العناصر المنتهية الصلاحية
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * دالة لإنشاء مفتاح تخزين مؤقت
 */
export function createCacheKey(request: AIGenerationRequest): string {
  const keyData = {
    type: request.type,
    prompt: request.prompt.substring(0, 100), // أول 100 حرف فقط
    context: request.context,
    constraints: request.constraints,
    preferences: request.preferences
  };
  
  return btoa(JSON.stringify(keyData)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 50);
}

/**
 * دالة لتحليل وتحسين الأوامر
 */
export function optimizePrompt(prompt: string, type: string): string {
  let optimized = cleanText(prompt);
  
  // إضافة سياق للمحتوى العربي
  if (type === 'content' && !optimized.includes('العربية') && !optimized.includes('Arabic')) {
    optimized = `يرجى الكتابة باللغة العربية الفصحى المناسبة للجمهور العربي.\n\n${optimized}`;
  }
  
  // إضافة تعليمات للتصميم
  if (type === 'design' && !optimized.includes('تصميم') && !optimized.includes('design')) {
    optimized = `${optimized}\n\nيرجى مراعاة التصميم المناسب للثقافة العربية واتجاه النص من اليمين إلى اليسار.`;
  }
  
  // إضافة تعليمات SEO
  if (type === 'seo' && !optimized.includes('محركات البحث')) {
    optimized = `${optimized}\n\nيرجى تحسين المحتوى لمحركات البحث العربية مثل Google وBing.`;
  }
  
  return optimized;
}

/**
 * دالة لتحليل جودة الاستجابة
 */
export function analyzeResponseQuality(response: string, expectedType: string): {
  score: number;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;
  
  // فحص الطول
  if (response.length < 50) {
    issues.push('الاستجابة قصيرة جداً');
    suggestions.push('اطلب محتوى أكثر تفصيلاً');
    score -= 20;
  }
  
  if (response.length > 5000) {
    issues.push('الاستجابة طويلة جداً');
    suggestions.push('اطلب محتوى أكثر إيجازاً');
    score -= 10;
  }
  
  // فحص اللغة العربية
  const arabicRatio = (response.match(/[\u0600-\u06FF]/g) || []).length / response.length;
  if (arabicRatio < 0.3 && expectedType === 'content') {
    issues.push('نسبة المحتوى العربي قليلة');
    suggestions.push('اطلب المزيد من المحتوى باللغة العربية');
    score -= 15;
  }
  
  // فحص البنية
  const hasHeaders = /#{1,6}\s/.test(response) || /\n\s*\d+\./.test(response);
  if (!hasHeaders && expectedType === 'content') {
    issues.push('المحتوى يفتقر للعناوين والبنية');
    suggestions.push('اطلب تنظيم المحتوى بعناوين وفقرات');
    score -= 10;
  }
  
  // فحص الكلمات المفتاحية للتكييف
  const acKeywords = ['تكييف', 'مكيف', 'تبريد', 'صيانة', 'إصلاح', 'تنظيف'];
  const hasAcKeywords = acKeywords.some(keyword => response.includes(keyword));
  if (!hasAcKeywords && expectedType === 'content') {
    issues.push('المحتوى لا يحتوي على كلمات مفتاحية متعلقة بالتكييف');
    suggestions.push('أضف كلمات مفتاحية متعلقة بصيانة التكييف');
    score -= 15;
  }
  
  return {
    score: Math.max(0, score),
    issues,
    suggestions
  };
}

/**
 * دالة لتحويل النص إلى تنسيق Markdown
 */
export function formatAsMarkdown(text: string): string {
  return text
    .replace(/^(.+)$/gm, (_, line) => {
      // تحويل العناوين
      if (line.trim().endsWith(':') && line.length < 100) {
        return `## ${line.trim().slice(0, -1)}`;
      }
      return line;
    })
    .replace(/\n\s*-\s+/g, '\n- ') // تنسيق القوائم
    .replace(/\n\s*\d+\.\s+/g, (match) => `\n${match.trim()} `) // تنسيق القوائم المرقمة
    .replace(/\*\*([^*]+)\*\*/g, '**$1**') // تنسيق النص العريض
    .replace(/\*([^*]+)\*/g, '*$1*'); // تنسيق النص المائل
}

/**
 * دالة لاستخراج البيانات المنظمة من النص
 */
export function extractStructuredData(text: string): {
  title?: string;
  sections: Array<{
    title: string;
    content: string;
    subsections?: Array<{ title: string; content: string }>;
  }>;
  metadata: {
    wordCount: number;
    readingTime: number;
    language: 'ar' | 'en' | 'mixed';
  };
} {
  const lines = text.split('\n').filter(line => line.trim());
  const sections: any[] = [];
  let currentSection: any = null;
  let title: string | undefined;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // استخراج العنوان الرئيسي
    if (!title && (trimmed.length < 100 && (trimmed.endsWith(':') || /^#{1,2}\s/.test(trimmed)))) {
      title = trimmed.replace(/^#{1,2}\s/, '').replace(/:$/, '');
      continue;
    }
    
    // استخراج عناوين الأقسام
    if (/^#{2,6}\s/.test(trimmed) || (trimmed.endsWith(':') && trimmed.length < 80)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmed.replace(/^#{2,6}\s/, '').replace(/:$/, ''),
        content: '',
        subsections: []
      };
    } else if (currentSection) {
      currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
    }
  }
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  // حساب البيانات الوصفية
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 كلمة في الدقيقة
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const arabicRatio = arabicChars / text.length;
  
  let language: 'ar' | 'en' | 'mixed';
  if (arabicRatio > 0.7) language = 'ar';
  else if (arabicRatio < 0.3) language = 'en';
  else language = 'mixed';
  
  return {
    title,
    sections,
    metadata: {
      wordCount,
      readingTime,
      language
    }
  };
}

/**
 * دالة لتحسين الأداء بالمعالجة المتوازية
 */
export async function processInParallel<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrency: number = 3
): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<void>[] = [];
  
  for (const item of items) {
    const promise = processor(item).then(result => {
      results.push(result);
    });
    
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }
  
  await Promise.all(executing);
  return results;
}

/**
 * دالة لمراقبة الأداء
 */
export class PerformanceMonitor {
  private metrics = new Map<string, {
    count: number;
    totalTime: number;
    avgTime: number;
    minTime: number;
    maxTime: number;
    errors: number;
  }>();
  
  async measure<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    let error = false;
    
    try {
      const result = await fn();
      return result;
    } catch (err) {
      error = true;
      throw err;
    } finally {
      const duration = Date.now() - startTime;
      this.recordMetric(operation, duration, error);
    }
  }
  
  private recordMetric(operation: string, duration: number, error: boolean): void {
    const existing = this.metrics.get(operation) || {
      count: 0,
      totalTime: 0,
      avgTime: 0,
      minTime: Infinity,
      maxTime: 0,
      errors: 0
    };
    
    existing.count++;
    existing.totalTime += duration;
    existing.avgTime = existing.totalTime / existing.count;
    existing.minTime = Math.min(existing.minTime, duration);
    existing.maxTime = Math.max(existing.maxTime, duration);
    if (error) existing.errors++;
    
    this.metrics.set(operation, existing);
  }
  
  getMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [operation, metrics] of this.metrics.entries()) {
      result[operation] = {
        ...metrics,
        successRate: ((metrics.count - metrics.errors) / metrics.count * 100).toFixed(2) + '%'
      };
    }
    return result;
  }
  
  reset(): void {
    this.metrics.clear();
  }
}

// إنشاء مثيل عام لمراقب الأداء
export const performanceMonitor = new PerformanceMonitor();

// إنشاء مثيل عام للتخزين المؤقت
export const aiCache = new AICache();

// تنظيف التخزين المؤقت كل ساعة
setInterval(() => {
  aiCache.cleanup();
}, 60 * 60 * 1000);

/**
 * ثوابت مفيدة
 */
export const AI_CONSTANTS = {
  MAX_PROMPT_LENGTH: 4000,
  MAX_RESPONSE_LENGTH: 8000,
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 2048,
  CACHE_TTL_MINUTES: 60,
  MAX_RETRIES: 3,
  BASE_RETRY_DELAY: 1000,
  MAX_CONCURRENT_REQUESTS: 3
} as const;

/**
 * أنواع البيانات المساعدة
 */
export type AIUtilsConfig = {
  cacheEnabled: boolean;
  cacheTTL: number;
  maxRetries: number;
  retryDelay: number;
  performanceMonitoring: boolean;
};

export const DEFAULT_UTILS_CONFIG: AIUtilsConfig = {
  cacheEnabled: true,
  cacheTTL: 60,
  maxRetries: 3,
  retryDelay: 1000,
  performanceMonitoring: true
};