// AI Prompts System
// قوالب الأوامر للذكاء الاصطناعي

import { PromptTemplate } from './types';

/**
 * قوالب الأوامر المحددة مسبقاً للذكاء الاصطناعي
 * تستخدم لتوليد محتوى عالي الجودة ومخصص لصناعة صيانة التكييف
 */
export const AI_PROMPTS: Record<string, PromptTemplate> = {
  // قوالب توليد المحتوى
  CONTENT_GENERATION: {
    id: 'content_generation',
    name: 'Content Generation',
    description: 'Generate high-quality content for AC maintenance business',
    category: 'content',
    template: `
أنت كاتب محتوى خبير في مجال صيانة وتركيب أنظمة التكييف والتبريد.
يرجى إنشاء محتوى عالي الجودة باللغة العربية حول الموضوع التالي:

الموضوع: {{topic}}
نوع المحتوى: {{contentType}}
الجمهور المستهدف: {{targetAudience}}
طول المحتوى: {{length}}
النبرة المطلوبة: {{tone}}

متطلبات المحتوى:
1. يجب أن يكون المحتوى مفيداً وعملياً
2. استخدم مصطلحات تقنية مناسبة مع شرحها
3. اذكر فوائد واضحة للعميل
4. تأكد من الدقة التقنية
5. استخدم أسلوب مقنع ومهني
6. أضف دعوة واضحة للعمل

السياق الإضافي: {{context}}
    `,
    variables: [
      { name: 'topic', type: 'string', required: true, description: 'موضوع المحتوى' },
      { name: 'contentType', type: 'string', required: true, description: 'نوع المحتوى (مقال، وصف خدمة، إلخ)' },
      { name: 'targetAudience', type: 'string', required: true, description: 'الجمهور المستهدف' },
      { name: 'length', type: 'string', required: false, description: 'طول المحتوى المطلوب', defaultValue: 'متوسط' },
      { name: 'tone', type: 'string', required: false, description: 'نبرة المحتوى', defaultValue: 'مهني ودود' },
      { name: 'context', type: 'string', required: false, description: 'سياق إضافي' }
    ],
    examples: [
      {
        input: {
          topic: 'صيانة المكيفات الدورية',
          contentType: 'مقال تعليمي',
          targetAudience: 'أصحاب المنازل',
          length: 'طويل',
          tone: 'تعليمي ومفيد'
        },
        output: 'محتوى تعليمي شامل حول أهمية الصيانة الدورية للمكيفات...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  },

  // قوالب تحليل التصميم
  DESIGN_ANALYSIS: {
    id: 'design_analysis',
    name: 'Design Analysis',
    description: 'Analyze and optimize website design',
    category: 'design',
    template: `
أنت خبير في تصميم المواقع وتجربة المستخدم، متخصص في مواقع الخدمات التقنية.
يرجى تحليل التصميم التالي وتقديم توصيات للتحسين:

معلومات التصميم:
نوع الصفحة: {{pageType}}
الجمهور المستهدف: {{targetAudience}}
الهدف الأساسي: {{primaryGoal}}
العناصر الحالية: {{currentElements}}

معايير التحليل:
1. سهولة الاستخدام (UX)
2. الجاذبية البصرية (UI)
3. التوافق مع الأجهزة المختلفة
4. سرعة التحميل
5. إمكانية الوصول
6. التوافق مع الثقافة العربية
7. فعالية التحويل

يرجى تقديم:
- تقييم شامل للتصميم الحالي
- نقاط القوة والضعف
- توصيات محددة للتحسين
- أولويات التطبيق
- تقدير تأثير التحسينات

السياق الإضافي: {{context}}
    `,
    variables: [
      { name: 'pageType', type: 'string', required: true, description: 'نوع الصفحة' },
      { name: 'targetAudience', type: 'string', required: true, description: 'الجمهور المستهدف' },
      { name: 'primaryGoal', type: 'string', required: true, description: 'الهدف الأساسي للصفحة' },
      { name: 'currentElements', type: 'array', required: true, description: 'العناصر الحالية في التصميم' },
      { name: 'context', type: 'string', required: false, description: 'سياق إضافي' }
    ],
    examples: [
      {
        input: {
          pageType: 'صفحة رئيسية',
          targetAudience: 'عملاء صيانة المكيفات',
          primaryGoal: 'زيادة طلبات الخدمة',
          currentElements: ['هيرو', 'خدمات', 'شهادات', 'اتصال']
        },
        output: 'تحليل شامل للتصميم مع توصيات محددة للتحسين...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  },

  // قوالب تحسين SEO
  SEO_OPTIMIZATION: {
    id: 'seo_optimization',
    name: 'SEO Optimization',
    description: 'Optimize content for search engines',
    category: 'seo',
    template: `
أنت خبير في تحسين محركات البحث (SEO) للمواقع العربية، متخصص في قطاع الخدمات التقنية.
يرجى تحليل وتحسين المحتوى التالي لمحركات البحث:

معلومات المحتوى:
نوع المحتوى: {{contentType}}
الكلمات المفتاحية المستهدفة: {{targetKeywords}}
المحتوى الحالي: {{currentContent}}
الجمهور المستهدف: {{targetAudience}}
الموقع الجغرافي: {{location}}

متطلبات التحسين:
1. تحسين العناوين والوصف
2. توزيع الكلمات المفتاحية بشكل طبيعي
3. تحسين البنية والتنسيق
4. إضافة كلمات مفتاحية ذات صلة
5. تحسين المحتوى للبحث المحلي
6. ضمان جودة وقيمة المحتوى
7. تحسين سرعة التحميل

يرجى تقديم:
- تحليل SEO للمحتوى الحالي
- توصيات محددة للتحسين
- كلمات مفتاحية إضافية مقترحة
- عناوين وأوصاف محسنة
- بنية محتوى مقترحة

السياق الإضافي: {{context}}
    `,
    variables: [
      { name: 'contentType', type: 'string', required: true, description: 'نوع المحتوى' },
      { name: 'targetKeywords', type: 'array', required: true, description: 'الكلمات المفتاحية المستهدفة' },
      { name: 'currentContent', type: 'string', required: true, description: 'المحتوى الحالي' },
      { name: 'targetAudience', type: 'string', required: true, description: 'الجمهور المستهدف' },
      { name: 'location', type: 'string', required: false, description: 'الموقع الجغرافي', defaultValue: 'السعودية' },
      { name: 'context', type: 'string', required: false, description: 'سياق إضافي' }
    ],
    examples: [
      {
        input: {
          contentType: 'صفحة خدمة',
          targetKeywords: ['صيانة مكيفات', 'تنظيف مكيفات', 'إصلاح تكييف'],
          currentContent: 'نقدم خدمات صيانة المكيفات...',
          targetAudience: 'أصحاب المنازل والشركات'
        },
        output: 'تحليل SEO شامل مع توصيات محددة للتحسين...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  },

  // قوالب تحليل الأداء
  PERFORMANCE_ANALYSIS: {
    id: 'performance_analysis',
    name: 'Performance Analysis',
    description: 'Analyze website performance and optimization',
    category: 'analysis',
    template: `
أنت خبير في تحليل أداء المواقع والتطبيقات، متخصص في تحسين الأداء والسرعة.
يرجى تحليل الأداء التالي وتقديم توصيات للتحسين:

بيانات الأداء:
سرعة التحميل: {{loadTime}} ثانية
حجم الصفحة: {{pageSize}} كيلوبايت
عدد الطلبات: {{requests}}
نقاط Core Web Vitals: {{coreWebVitals}}
نوع الجهاز: {{deviceType}}
سرعة الاتصال: {{connectionSpeed}}

معايير التحليل:
1. سرعة التحميل الأولي
2. تفاعلية الصفحة
3. استقرار التخطيط البصري
4. تحسين الصور والوسائط
5. ضغط الملفات
6. استخدام CDN
7. تحسين قاعدة البيانات

يرجى تقديم:
- تقييم شامل للأداء الحالي
- تحديد نقاط الاختناق
- توصيات محددة للتحسين
- أولويات التطبيق
- تقدير تحسن الأداء المتوقع

السياق الإضافي: {{context}}
    `,
    variables: [
      { name: 'loadTime', type: 'number', required: true, description: 'وقت التحميل بالثواني' },
      { name: 'pageSize', type: 'number', required: true, description: 'حجم الصفحة بالكيلوبايت' },
      { name: 'requests', type: 'number', required: true, description: 'عدد الطلبات' },
      { name: 'coreWebVitals', type: 'object', required: true, description: 'نقاط Core Web Vitals' },
      { name: 'deviceType', type: 'string', required: false, description: 'نوع الجهاز', defaultValue: 'desktop' },
      { name: 'connectionSpeed', type: 'string', required: false, description: 'سرعة الاتصال', defaultValue: '4G' },
      { name: 'context', type: 'string', required: false, description: 'سياق إضافي' }
    ],
    examples: [
      {
        input: {
          loadTime: 3.2,
          pageSize: 1500,
          requests: 45,
          coreWebVitals: { LCP: 2.8, FID: 120, CLS: 0.15 }
        },
        output: 'تحليل شامل للأداء مع توصيات محددة للتحسين...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  },

  // قوالب تحليل سلوك المستخدم
  USER_BEHAVIOR_ANALYSIS: {
    id: 'user_behavior_analysis',
    name: 'User Behavior Analysis',
    description: 'Analyze user behavior and provide insights',
    category: 'analysis',
    template: `
أنت خبير في تحليل سلوك المستخدمين وتجربة المستخدم، متخصص في مواقع الخدمات.
يرجى تحليل البيانات السلوكية التالية وتقديم رؤى قابلة للتطبيق:

بيانات السلوك:
عدد الزيارات: {{visits}}
معدل الارتداد: {{bounceRate}}%
متوسط وقت الجلسة: {{sessionDuration}} دقيقة
الصفحات الأكثر زيارة: {{topPages}}
مسارات التحويل: {{conversionPaths}}
نقاط الخروج الرئيسية: {{exitPoints}}
الأجهزة المستخدمة: {{devices}}

معايير التحليل:
1. أنماط التنقل
2. نقاط الاحتكاك
3. فرص التحسين
4. سلوك التحويل
5. تفضيلات المحتوى
6. الاستجابة للدعوات للعمل
7. التفاعل مع العناصر

يرجى تقديم:
- تحليل شامل للسلوك الحالي
- تحديد الأنماط والاتجاهات
- رؤى حول تجربة المستخدم
- توصيات لتحسين التحويل
- استراتيجيات لزيادة التفاعل

السياق الإضافي: {{context}}
    `,
    variables: [
      { name: 'visits', type: 'number', required: true, description: 'عدد الزيارات' },
      { name: 'bounceRate', type: 'number', required: true, description: 'معدل الارتداد' },
      { name: 'sessionDuration', type: 'number', required: true, description: 'مدة الجلسة بالدقائق' },
      { name: 'topPages', type: 'array', required: true, description: 'الصفحات الأكثر زيارة' },
      { name: 'conversionPaths', type: 'array', required: false, description: 'مسارات التحويل' },
      { name: 'exitPoints', type: 'array', required: false, description: 'نقاط الخروج' },
      { name: 'devices', type: 'object', required: false, description: 'توزيع الأجهزة' },
      { name: 'context', type: 'string', required: false, description: 'سياق إضافي' }
    ],
    examples: [
      {
        input: {
          visits: 1250,
          bounceRate: 45,
          sessionDuration: 3.2,
          topPages: ['/services', '/contact', '/emergency']
        },
        output: 'تحليل شامل لسلوك المستخدمين مع رؤى قابلة للتطبيق...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  },

  // قوالب الترجمة الذكية
  SMART_TRANSLATION: {
    id: 'smart_translation',
    name: 'Smart Translation',
    description: 'Intelligent translation with context preservation',
    category: 'content',
    template: `
أنت مترجم خبير متخصص في ترجمة المحتوى التقني والتجاري بين العربية والإنجليزية.
يرجى ترجمة المحتوى التالي مع الحفاظ على السياق والمعنى:

معلومات الترجمة:
اللغة المصدر: {{sourceLanguage}}
اللغة المستهدفة: {{targetLanguage}}
نوع المحتوى: {{contentType}}
السياق: {{context}}
الجمهور المستهدف: {{targetAudience}}

المحتوى للترجمة:
{{content}}

متطلبات الترجمة:
1. الحفاظ على المعنى الأصلي
2. استخدام مصطلحات تقنية مناسبة
3. مراعاة الثقافة المحلية
4. الحفاظ على النبرة والأسلوب
5. ضمان الوضوح والفهم
6. تجنب الترجمة الحرفية
7. استخدام تعبيرات طبيعية

المصطلحات المخصصة: {{customTerms}}

يرجى تقديم:
- الترجمة المحسنة
- ملاحظات على الترجمة
- بدائل للمصطلحات المعقدة
- تقييم جودة الترجمة
    `,
    variables: [
      { name: 'sourceLanguage', type: 'string', required: true, description: 'اللغة المصدر' },
      { name: 'targetLanguage', type: 'string', required: true, description: 'اللغة المستهدفة' },
      { name: 'contentType', type: 'string', required: true, description: 'نوع المحتوى' },
      { name: 'context', type: 'string', required: true, description: 'سياق المحتوى' },
      { name: 'targetAudience', type: 'string', required: true, description: 'الجمهور المستهدف' },
      { name: 'content', type: 'string', required: true, description: 'المحتوى للترجمة' },
      { name: 'customTerms', type: 'object', required: false, description: 'مصطلحات مخصصة' }
    ],
    examples: [
      {
        input: {
          sourceLanguage: 'العربية',
          targetLanguage: 'الإنجليزية',
          contentType: 'وصف خدمة',
          context: 'صيانة المكيفات',
          content: 'نقدم خدمات صيانة شاملة للمكيفات'
        },
        output: 'We provide comprehensive air conditioning maintenance services...'
      }
    ],
    metadata: {
      version: '1.0.0',
      author: 'AI System',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      usageCount: 0,
      rating: 5
    }
  }
};

/**
 * دالة للحصول على قالب أمر محدد
 */
export function getPromptTemplate(id: string): PromptTemplate | undefined {
  return AI_PROMPTS[id];
}

/**
 * دالة للحصول على جميع قوالب الأوامر حسب الفئة
 */
export function getPromptsByCategory(category: string): PromptTemplate[] {
  return Object.values(AI_PROMPTS).filter(prompt => prompt.category === category);
}

/**
 * دالة لبناء أمر مخصص من قالب
 */
export function buildPromptFromTemplate(
  templateId: string, 
  variables: Record<string, any>
): string {
  const template = getPromptTemplate(templateId);
  if (!template) {
    throw new Error(`Template with id '${templateId}' not found`);
  }

  let prompt = template.template;
  
  // استبدال المتغيرات في القالب
  template.variables.forEach(variable => {
    const value = variables[variable.name] || variable.defaultValue || '';
    const placeholder = `{{${variable.name}}}`;
    
    if (variable.type === 'array') {
      prompt = prompt.replace(placeholder, Array.isArray(value) ? value.join(', ') : value);
    } else if (variable.type === 'object') {
      prompt = prompt.replace(placeholder, typeof value === 'object' ? JSON.stringify(value, null, 2) : value);
    } else {
      prompt = prompt.replace(placeholder, String(value));
    }
  });

  return prompt;
}

/**
 * دالة للتحقق من صحة متغيرات القالب
 */
export function validatePromptVariables(
  templateId: string, 
  variables: Record<string, any>
): { valid: boolean; errors: string[] } {
  const template = getPromptTemplate(templateId);
  if (!template) {
    return { valid: false, errors: [`Template with id '${templateId}' not found`] };
  }

  const errors: string[] = [];
  
  template.variables.forEach(variable => {
    if (variable.required && !(variable.name in variables)) {
      errors.push(`Required variable '${variable.name}' is missing`);
    }
    
    if (variable.name in variables) {
      const value = variables[variable.name];
      const expectedType = variable.type;
      
      if (expectedType === 'array' && !Array.isArray(value)) {
        errors.push(`Variable '${variable.name}' should be an array`);
      } else if (expectedType === 'object' && typeof value !== 'object') {
        errors.push(`Variable '${variable.name}' should be an object`);
      } else if (expectedType === 'number' && typeof value !== 'number') {
        errors.push(`Variable '${variable.name}' should be a number`);
      } else if (expectedType === 'boolean' && typeof value !== 'boolean') {
        errors.push(`Variable '${variable.name}' should be a boolean`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * قوالب أوامر سريعة للاستخدام المباشر
 */
export const QUICK_PROMPTS = {
  EMERGENCY_SERVICE: 'اكتب محتوى جذاب لخدمة الطوارئ 24/7 لصيانة المكيفات',
  SERVICE_DESCRIPTION: 'اكتب وصف مهني لخدمة {{serviceName}} مع التركيز على الفوائد',
  CUSTOMER_TESTIMONIAL: 'اكتب شهادة عميل مقنعة حول تجربة إيجابية مع خدمات صيانة المكيفات',
  BLOG_POST_INTRO: 'اكتب مقدمة جذابة لمقال حول {{topic}} في مجال التكييف',
  CTA_BUTTON: 'اكتب نص دعوة للعمل فعال لـ {{action}}',
  FAQ_ANSWER: 'اكتب إجابة شاملة ومفيدة للسؤال: {{question}}',
  SEASONAL_OFFER: 'اكتب عرض موسمي جذاب لخدمات التكييف في {{season}}',
  MAINTENANCE_TIPS: 'اكتب نصائح عملية للعملاء حول {{maintenanceType}}'
};

/**
 * إعدادات افتراضية للذكاء الاصطناعي
 */
export const DEFAULT_AI_SETTINGS = {
  temperature: 0.7,
  maxTokens: 1500,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
  language: 'ar',
  tone: 'professional',
  style: 'modern'
};

/**
 * فئات قوالب الأوامر
 */
export const PROMPT_CATEGORIES = {
  CONTENT: 'content',
  DESIGN: 'design',
  SEO: 'seo',
  ANALYSIS: 'analysis',
  OPTIMIZATION: 'optimization',
  TRANSLATION: 'translation'
} as const;

export type PromptCategory = typeof PROMPT_CATEGORIES[keyof typeof PROMPT_CATEGORIES];