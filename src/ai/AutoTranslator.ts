import { 
  AIProvider
} from './types';

// Type aliases for missing types
type TranslationRequest = any;
type TranslationResponse = any;

/**
 * مترجم تلقائي بالذكاء الاصطناعي
 * يوفر ترجمة ذكية ومتقدمة للمحتوى بين العربية والإنجليزية
 */
export class AutoTranslator {
  private aiProvider: AIProvider;
  private translationCache: Map<string, string> = new Map();
  private customTerms: Map<string, string> = new Map();

  constructor(aiProvider: AIProvider) {
    this.aiProvider = aiProvider;
    this.initializeCustomTerms();
  }

  /**
   * ترجمة النصوص مع الحفاظ على السياق
   */
  async translateContent(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      const cacheKey = this.generateCacheKey(request);
      
      // التحقق من الذاكرة المؤقتة
      if (this.translationCache.has(cacheKey)) {
        return this.createCachedResponse(this.translationCache.get(cacheKey)!);
      }

      const prompt = this.buildTranslationPrompt(request);
      
      const aiRequest: any = {
        prompt,
        type: 'translation',
        context: {
          language: request.targetLanguage,
          industry: request.context?.industry || 'general',
          businessType: request.context?.businessType
        },
        parameters: {
          temperature: 0.3,
          maxTokens: 2000
        }
      };

      const response = await (this.aiProvider as any).generate(aiRequest);
      
      if (response.success && response.content) {
        const translatedContent = this.parseTranslationResponse(response.content, request);
        const quality = this.assessTranslationQuality(request.content, translatedContent, request);
        
        // حفظ في الذاكرة المؤقتة
        this.translationCache.set(cacheKey, JSON.stringify(translatedContent));
        
        return {
          translatedContent,
          quality,
          metadata: {
            wordsTranslated: this.countWords(request.content),
            processingTime: Date.now(),
            confidence: quality.score
          }
        };
      } else {
        return this.getFallbackTranslation(request);
      }
    } catch (error) {
      console.error('Error translating content:', error);
      return this.getFallbackTranslation(request);
    }
  }

  /**
   * ترجمة المحتوى التقني (أكواد، متغيرات، إلخ)
   */
  async translateTechnicalContent(content: Record<string, string>, options: {
    sourceLanguage: 'ar' | 'en';
    targetLanguage: 'ar' | 'en';
    preserveKeys?: boolean;
    preserveFormatting?: boolean;
    technicalTerms?: Record<string, string>;
  }): Promise<{
    translatedContent: Record<string, string>;
    preservedElements: string[];
    warnings: string[];
  }> {
    try {
      const preservedElements: string[] = [];
      const warnings: string[] = [];
      const translatedContent: Record<string, string> = {};

      for (const [key, value] of Object.entries(content)) {
        if (options.preserveKeys && this.isTechnicalKey(key)) {
          translatedContent[key] = value;
          preservedElements.push(key);
          continue;
        }

        if (this.containsTechnicalElements(value)) {
          const { translated, preserved } = await this.translateWithPreservation(value, options);
          translatedContent[key] = translated;
          preservedElements.push(...preserved);
        } else {
          const request: TranslationRequest = {
            content: { [key]: value },
            sourceLanguage: options.sourceLanguage,
            targetLanguage: options.targetLanguage,
            preserveFormatting: options.preserveFormatting,
            customTerms: options.technicalTerms
          };
          
          const response = await this.translateContent(request);
          translatedContent[key] = response.translatedContent[key] || value;
          
          if (response.quality.score < 0.7) {
            warnings.push(`جودة ترجمة منخفضة للمفتاح: ${key}`);
          }
        }
      }

      return {
        translatedContent,
        preservedElements,
        warnings
      };
    } catch (error) {
      console.error('Error translating technical content:', error);
      return {
        translatedContent: content,
        preservedElements: [],
        warnings: ['فشل في الترجمة التقنية']
      };
    }
  }

  /**
   * ترجمة محتوى الموقع بالكامل
   */
  async translateWebsiteContent(content: {
    pages: Record<string, any>;
    menus: Record<string, any>;
    settings: Record<string, any>;
    templates: Record<string, any>;
  }, options: {
    sourceLanguage: 'ar' | 'en';
    targetLanguage: 'ar' | 'en';
    preserveStructure?: boolean;
    batchSize?: number;
  }): Promise<{
    translatedContent: typeof content;
    progress: {
      completed: number;
      total: number;
      currentSection: string;
    };
    errors: string[];
    warnings: string[];
  }> {
    try {
      const errors: string[] = [];
      const warnings: string[] = [];
      const translatedContent = {
        pages: {},
        menus: {},
        settings: {},
        templates: {}
      };

      let completed = 0;
      const total = Object.keys(content.pages).length + 
                   Object.keys(content.menus).length + 
                   Object.keys(content.settings).length + 
                   Object.keys(content.templates).length;

      // ترجمة الصفحات
      for (const [pageId, pageData] of Object.entries(content.pages)) {
        try {
          const request: TranslationRequest = {
            content: this.extractTranslatableContent(pageData),
            sourceLanguage: options.sourceLanguage,
            targetLanguage: options.targetLanguage,
            context: {
              businessType: 'website',
              industry: 'ac_maintenance'
            }
          };
          
          const response = await this.translateContent(request);
          if (response.translatedContent) {
            (translatedContent as any).pages[pageId] = this.mergeTranslatedContent(pageData, response.translatedContent);
          } else {
            (translatedContent as any).pages[pageId] = pageData;
          }
          
          if (response.quality.score < 0.8) {
            warnings.push(`جودة ترجمة منخفضة للصفحة: ${pageId}`);
          }
        } catch (error) {
          errors.push(`فشل في ترجمة الصفحة: ${pageId}`);
          (translatedContent as any).pages[pageId] = pageData;
        }
        
        completed++;
      }

      // ترجمة القوائم
      for (const [menuId, menuData] of Object.entries(content.menus)) {
        try {
          const response = await this.translateTechnicalContent(
            this.extractTranslatableContent(menuData),
            {
              sourceLanguage: options.sourceLanguage,
              targetLanguage: options.targetLanguage,
              preserveKeys: true,
              preserveFormatting: true
            }
          );
          
          (translatedContent as any).menus[menuId] = this.mergeTranslatedContent(menuData, response.translatedContent);
          warnings.push(...response.warnings);
        } catch (error) {
          errors.push(`فشل في ترجمة القائمة: ${menuId}`);
          (translatedContent as any).menus[menuId] = menuData;
        }
        
        completed++;
      }

      // ترجمة الإعدادات
      for (const [settingKey, settingData] of Object.entries(content.settings)) {
        try {
          if (this.isTranslatableSetting(settingKey)) {
            const response = await this.translateTechnicalContent(
              this.extractTranslatableContent(settingData),
              {
                sourceLanguage: options.sourceLanguage,
                targetLanguage: options.targetLanguage,
                preserveKeys: true
              }
            );
            
            (translatedContent as any).settings[settingKey] = this.mergeTranslatedContent(settingData, response.translatedContent);
          } else {
            (translatedContent as any).settings[settingKey] = settingData;
          }
        } catch (error) {
          errors.push(`فشل في ترجمة الإعداد: ${settingKey}`);
          (translatedContent as any).settings[settingKey] = settingData;
        }
        
        completed++;
      }

      // ترجمة القوالب
      for (const [templateId, templateData] of Object.entries(content.templates)) {
        try {
          const response = await this.translateTechnicalContent(
            this.extractTranslatableContent(templateData),
            {
              sourceLanguage: options.sourceLanguage,
              targetLanguage: options.targetLanguage,
              preserveFormatting: true
            }
          );
          
          (translatedContent as any).templates[templateId] = this.mergeTranslatedContent(templateData, response.translatedContent);
          warnings.push(...response.warnings);
        } catch (error) {
          errors.push(`فشل في ترجمة القالب: ${templateId}`);
          (translatedContent as any).templates[templateId] = templateData;
        }
        
        completed++;
      }

      return {
        translatedContent,
        progress: {
          completed,
          total,
          currentSection: 'مكتمل'
        },
        errors,
        warnings
      };
    } catch (error) {
      console.error('Error translating website content:', error);
      return {
        translatedContent: content,
        progress: {
          completed: 0,
          total: 0,
          currentSection: 'فشل'
        },
        errors: ['فشل في ترجمة محتوى الموقع'],
        warnings: []
      };
    }
  }

  /**
   * ترجمة فورية للنصوص القصيرة
   */
  async quickTranslate(text: string, options: {
    sourceLanguage: 'ar' | 'en';
    targetLanguage: 'ar' | 'en';
    context?: string;
  }): Promise<{
    translatedText: string;
    confidence: number;
    alternatives?: string[];
  }> {
    try {
      const cacheKey = `quick_${text}_${options.sourceLanguage}_${options.targetLanguage}`;
      
      if (this.translationCache.has(cacheKey)) {
        return {
          translatedText: this.translationCache.get(cacheKey)!,
          confidence: 0.9,
          alternatives: []
        };
      }

      const prompt = this.buildQuickTranslationPrompt(text, options);
      
      const request: any = {
        prompt,
        type: 'translation',
        context: {
          language: options.targetLanguage
        },
        parameters: {
          temperature: 0.2,
          maxTokens: 200
        }
      };

      const response = await (this.aiProvider as any).generate(request);
      
      if (response.success && response.content) {
        const translatedText = this.extractQuickTranslation(response.content);
        this.translationCache.set(cacheKey, translatedText);
        
        return {
          translatedText,
          confidence: 0.85,
          alternatives: this.generateAlternatives(translatedText)
        };
      } else {
        return this.getFallbackQuickTranslation(text, options);
      }
    } catch (error) {
      console.error('Error in quick translation:', error);
      return this.getFallbackQuickTranslation(text, options);
    }
  }

  /**
   * تحليل جودة الترجمة
   */
  async analyzeTranslationQuality(original: Record<string, string>, translated: Record<string, string>, options: {
    sourceLanguage: 'ar' | 'en';
    targetLanguage: 'ar' | 'en';
    context?: string;
  }): Promise<{
    overallScore: number;
    detailedAnalysis: {
      key: string;
      originalText: string;
      translatedText: string;
      score: number;
      issues: string[];
      suggestions: string[];
    }[];
    recommendations: string[];
  }> {
    try {
      const detailedAnalysis = [];
      let totalScore = 0;
      
      for (const [key, originalText] of Object.entries(original)) {
        const translatedText = translated[key] || '';
        const analysis = await this.analyzeTextQuality(originalText, translatedText, options);
        
        detailedAnalysis.push({
          key,
          originalText,
          translatedText,
          score: analysis.score,
          issues: analysis.issues,
          suggestions: analysis.suggestions
        });
        
        totalScore += analysis.score;
      }
      
      const overallScore = totalScore / Object.keys(original).length;
      const recommendations = this.generateQualityRecommendations(detailedAnalysis, overallScore);
      
      return {
        overallScore,
        detailedAnalysis,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing translation quality:', error);
      return {
        overallScore: 0.5,
        detailedAnalysis: [],
        recommendations: ['فشل في تحليل جودة الترجمة']
      };
    }
  }

  /**
   * إضافة مصطلحات مخصصة
   */
  addCustomTerms(terms: Record<string, string>): void {
    for (const [source, target] of Object.entries(terms)) {
      this.customTerms.set(source.toLowerCase(), target);
    }
  }

  /**
   * مسح ذاكرة الترجمة المؤقتة
   */
  clearCache(): void {
    this.translationCache.clear();
  }

  /**
   * الحصول على إحصائيات الترجمة
   */
  getTranslationStats(): {
    cacheSize: number;
    customTermsCount: number;
    totalTranslations: number;
  } {
    return {
      cacheSize: this.translationCache.size,
      customTermsCount: this.customTerms.size,
      totalTranslations: this.translationCache.size
    };
  }

  // ===== Helper Methods =====

  private buildTranslationPrompt(request: TranslationRequest): string {
    const contextInfo = request.context ? `
السياق: ${JSON.stringify(request.context, null, 2)}` : '';
    const customTermsInfo = request.customTerms ? `
مصطلحات مخصصة: ${JSON.stringify(request.customTerms, null, 2)}` : '';
    
    return `
ترجمة المحتوى من ${request.sourceLanguage === 'ar' ? 'العربية' : 'الإنجليزية'} إلى ${request.targetLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}:

المحتوى المراد ترجمته:
${JSON.stringify(request.content, null, 2)}
${contextInfo}
${customTermsInfo}

متطلبات الترجمة:
1. الحفاظ على المعنى الأصلي
2. استخدام لغة طبيعية ومناسبة للسياق
3. الحفاظ على التنسيق إذا طُلب ذلك
4. استخدام المصطلحات المخصصة إن وجدت
5. مراعاة الثقافة المحلية

يرجى تقديم الترجمة في نفس تنسيق JSON المدخل.
    `;
  }

  private buildQuickTranslationPrompt(text: string, options: any): string {
    return `
ترجمة سريعة من ${options.sourceLanguage === 'ar' ? 'العربية' : 'الإنجليزية'} إلى ${options.targetLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}:

النص: "${text}"
السياق: ${options.context || 'عام'}

يرجى تقديم ترجمة دقيقة ومناسبة للسياق.
    `;
  }

  private parseTranslationResponse(content: string, request: TranslationRequest): Record<string, string> {
    try {
      // محاولة تحليل JSON
      const parsed = JSON.parse(content);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    } catch (error) {
      // إذا فشل تحليل JSON، استخدم تحليل نصي
    }
    
    // تحليل نصي بديل
    const result: Record<string, string> = {};
    const keys = Object.keys(request.content);
    
    if (keys.length === 1) {
      result[keys[0]] = content.trim();
    } else {
      // محاولة استخراج الترجمات من النص
      for (const key of keys) {
        result[key] = this.extractTranslationForKey(content, key, request.content[key]);
      }
    }
    
    return result;
  }

  private extractTranslationForKey(content: string, key: string, originalText: string): string {
    // محاولة العثور على الترجمة في النص
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes(key) || line.includes(originalText)) {
        const match = line.match(/["']([^"']+)["']/);
        if (match) {
          return match[1];
        }
      }
    }
    
    // إذا لم نجد ترجمة محددة، نعيد النص كما هو
    return originalText;
  }

  private extractQuickTranslation(content: string): string {
    // استخراج الترجمة من الاستجابة
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('ترجمة:') && !trimmed.startsWith('Translation:')) {
        return trimmed.replace(/^["']|["']$/g, '');
      }
    }
    
    return content.trim();
  }

  private assessTranslationQuality(original: Record<string, string>, translated: Record<string, string>, request: TranslationRequest): {
    score: number;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 1.0;
    
    // التحقق من اكتمال الترجمة
    const originalKeys = Object.keys(original);
    const translatedKeys = Object.keys(translated);
    
    if (originalKeys.length !== translatedKeys.length) {
      issues.push('عدد العناصر المترجمة لا يطابق الأصل');
      score -= 0.2;
    }
    
    // التحقق من جودة كل ترجمة
    for (const key of originalKeys) {
      const originalText = original[key];
      const translatedText = translated[key];
      
      if (!translatedText) {
        issues.push(`ترجمة مفقودة للمفتاح: ${key}`);
        score -= 0.1;
        continue;
      }
      
      // التحقق من طول النص
      const lengthRatio = translatedText.length / originalText.length;
      if (lengthRatio < 0.3 || lengthRatio > 3) {
        issues.push(`طول الترجمة غير مناسب للمفتاح: ${key}`);
        score -= 0.05;
      }
      
      // التحقق من وجود المصطلحات المخصصة
      if (request.customTerms) {
        for (const [term, translation] of Object.entries(request.customTerms)) {
          if (originalText.toLowerCase().includes(term.toLowerCase()) && 
              !translatedText.toLowerCase().includes((translation as string).toLowerCase())) {
            issues.push(`مصطلح مخصص غير مستخدم: ${term} -> ${translation}`);
            score -= 0.05;
          }
        }
      }
    }
    
    // اقتراحات للتحسين
    if (score < 0.8) {
      suggestions.push('مراجعة الترجمة يدوياً');
      suggestions.push('التحقق من المصطلحات المتخصصة');
    }
    
    if (issues.length > 0) {
      suggestions.push('إعادة الترجمة مع تحسين التعليمات');
    }
    
    return {
      score: Math.max(0, score),
      issues,
      suggestions
    };
  }

  private async analyzeTextQuality(original: string, translated: string, options: any): Promise<{
    score: number;
    issues: string[];
    suggestions: string[];
  }> {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 1.0;
    
    // التحقق من الطول
    const lengthRatio = translated.length / original.length;
    if (lengthRatio < 0.5 || lengthRatio > 2) {
      issues.push('طول الترجمة غير مناسب');
      score -= 0.2;
    }
    
    // التحقق من وجود النص
    if (!translated.trim()) {
      issues.push('ترجمة فارغة');
      score -= 0.5;
    }
    
    // التحقق من اللغة المستهدفة
    const isArabic = /[\u0600-\u06FF]/.test(translated);
    const isEnglish = /[a-zA-Z]/.test(translated);
    
    if (options.targetLanguage === 'ar' && !isArabic) {
      issues.push('الترجمة لا تحتوي على نص عربي');
      score -= 0.3;
    }
    
    if (options.targetLanguage === 'en' && !isEnglish) {
      issues.push('الترجمة لا تحتوي على نص إنجليزي');
      score -= 0.3;
    }
    
    // اقتراحات
    if (score < 0.7) {
      suggestions.push('إعادة الترجمة مع تحسين السياق');
      suggestions.push('مراجعة المصطلحات المستخدمة');
    }
    
    return {
      score: Math.max(0, score),
      issues,
      suggestions
    };
  }

  private generateQualityRecommendations(analysis: any[], overallScore: number): string[] {
    const recommendations: string[] = [];
    
    if (overallScore < 0.6) {
      recommendations.push('جودة الترجمة منخفضة - يُنصح بالمراجعة اليدوية');
      recommendations.push('تحسين السياق المقدم للمترجم');
      recommendations.push('إضافة المزيد من المصطلحات المخصصة');
    } else if (overallScore < 0.8) {
      recommendations.push('جودة الترجمة متوسطة - مراجعة سريعة مطلوبة');
      recommendations.push('التحقق من المصطلحات التقنية');
    } else {
      recommendations.push('جودة الترجمة جيدة - مراجعة اختيارية');
    }
    
    // توصيات محددة بناءً على التحليل
    const commonIssues = analysis.flatMap(item => item.issues);
    const issueFrequency = commonIssues.reduce((acc, issue) => {
      acc[issue] = (acc[issue] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    for (const [issue, frequency] of Object.entries(issueFrequency)) {
      if ((frequency as number) > analysis.length * 0.3) {
        recommendations.push(`مشكلة شائعة: ${issue}`);
      }
    }
    
    return recommendations;
  }

  private generateCacheKey(request: TranslationRequest): string {
    const contentHash = JSON.stringify(request.content);
    const contextHash = JSON.stringify(request.context || {});
    return `${request.sourceLanguage}_${request.targetLanguage}_${btoa(contentHash + contextHash).slice(0, 20)}`;
  }

  private createCachedResponse(cachedContent: string): TranslationResponse {
    try {
      const translatedContent = JSON.parse(cachedContent);
      return {
        translatedContent,
        quality: {
          score: 0.9,
          issues: [],
          suggestions: []
        },
        metadata: {
          wordsTranslated: this.countWords(translatedContent),
          processingTime: 0,
          confidence: 0.9
        }
      };
    } catch (error) {
      return this.getFallbackTranslation({ content: {}, sourceLanguage: 'ar', targetLanguage: 'en' });
    }
  }

  private countWords(content: Record<string, string> | string): number {
    if (typeof content === 'string') {
      return content.split(/\s+/).length;
    }
    
    return Object.values(content).reduce((total, text) => {
      return total + text.split(/\s+/).length;
    }, 0);
  }

  private isTechnicalKey(key: string): boolean {
    const technicalPatterns = [
      /^[a-z]+([A-Z][a-z]*)*$/, // camelCase
      /^[a-z]+(_[a-z]+)*$/, // snake_case
      /^[A-Z]+(_[A-Z]+)*$/, // CONSTANT_CASE
      /^\$/, // variables starting with $
      /^@/, // decorators
      /^#/, // private fields
    ];
    
    return technicalPatterns.some(pattern => pattern.test(key));
  }

  private containsTechnicalElements(text: string): boolean {
    const technicalPatterns = [
      /{[^}]+}/, // template literals
      /\$\{[^}]+\}/, // variable interpolation
      /<[^>]+>/, // HTML tags
      /\[[^\]]+\]/, // array notation
      /\w+\([^)]*\)/, // function calls
      /https?:\/\//, // URLs
      /\w+@\w+\.\w+/, // email addresses
    ];
    
    return technicalPatterns.some(pattern => pattern.test(text));
  }

  private async translateWithPreservation(text: string, options: any): Promise<{
    translated: string;
    preserved: string[];
  }> {
    const preserved: string[] = [];
    let processedText = text;
    
    // استخراج العناصر التقنية
    const technicalElements = this.extractTechnicalElements(text);
    
    // استبدال العناصر التقنية بعلامات مؤقتة
    technicalElements.forEach((element, index) => {
      const placeholder = `__TECH_${index}__`;
      processedText = processedText.replace(element, placeholder);
      preserved.push(element);
    });
    
    // ترجمة النص المعالج
    const request: TranslationRequest = {
      content: { text: processedText },
      sourceLanguage: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
      preserveFormatting: true
    };
    
    const response = await this.translateContent(request);
    let translatedText = response.translatedContent.text || processedText;
    
    // إعادة العناصر التقنية
    technicalElements.forEach((element, index) => {
      const placeholder = `__TECH_${index}__`;
      translatedText = translatedText.replace(placeholder, element);
    });
    
    return {
      translated: translatedText,
      preserved
    };
  }

  private extractTechnicalElements(text: string): string[] {
    const elements: string[] = [];
    const patterns = [
      /{[^}]+}/g, // template literals
      /\$\{[^}]+\}/g, // variable interpolation
      /<[^>]+>/g, // HTML tags
      /https?:\/\/[^\s]+/g, // URLs
      /\w+@\w+\.\w+/g, // email addresses
      /\b\d+(\.\d+)?%?\b/g, // numbers and percentages
    ];
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        elements.push(...matches);
      }
    });
    
    return [...new Set(elements)]; // remove duplicates
  }

  private extractTranslatableContent(data: any): Record<string, string> {
    const translatable: Record<string, string> = {};
    
    const extract = (obj: any, prefix = ''): void => {
      if (typeof obj === 'string' && this.isTranslatableText(obj)) {
        translatable[prefix || 'text'] = obj;
      } else if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          if (this.isTranslatableField(key)) {
            const newPrefix = prefix ? `${prefix}.${key}` : key;
            extract(value, newPrefix);
          }
        }
      }
    };
    
    extract(data);
    return translatable;
  }

  private isTranslatableText(text: string): boolean {
    // تحقق من أن النص قابل للترجمة
    if (text.length < 2) return false;
    if (/^[0-9\s\-_.,!@#$%^&*()+={}\[\]|\\:;"'<>?/~`]+$/.test(text)) return false;
    if (/^https?:\/\//.test(text)) return false;
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)) return false;
    
    return true;
  }

  private isTranslatableField(fieldName: string): boolean {
    const translatableFields = [
      'title', 'name', 'description', 'content', 'text', 'label', 'placeholder',
      'subtitle', 'heading', 'caption', 'alt', 'summary', 'excerpt', 'note',
      'message', 'tooltip', 'hint', 'instruction', 'tagline', 'slogan'
    ];
    
    const nonTranslatableFields = [
      'id', 'key', 'url', 'link', 'href', 'src', 'path', 'file', 'image',
      'icon', 'class', 'style', 'type', 'format', 'method', 'action',
      'value', 'data', 'config', 'settings', 'options', 'params'
    ];
    
    const lowerFieldName = fieldName.toLowerCase();
    
    if (nonTranslatableFields.some(field => lowerFieldName.includes(field))) {
      return false;
    }
    
    return translatableFields.some(field => lowerFieldName.includes(field));
  }

  private isTranslatableSetting(settingKey: string): boolean {
    const translatableSettings = [
      'site', 'company', 'contact', 'social', 'seo', 'content'
    ];
    
    const nonTranslatableSettings = [
      'api', 'config', 'database', 'server', 'cache', 'security',
      'analytics', 'tracking', 'integration', 'payment'
    ];
    
    const lowerKey = settingKey.toLowerCase();
    
    if (nonTranslatableSettings.some(setting => lowerKey.includes(setting))) {
      return false;
    }
    
    return translatableSettings.some(setting => lowerKey.includes(setting));
  }

  private mergeTranslatedContent(original: any, translated: Record<string, string>): any {
    const result = JSON.parse(JSON.stringify(original)); // deep clone
    
    for (const [path, translatedText] of Object.entries(translated)) {
      this.setNestedValue(result, path, translatedText);
    }
    
    return result;
  }

  private setNestedValue(obj: any, path: string, value: string): void {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  private generateAlternatives(text: string): string[] {
    // توليد بدائل بسيطة للترجمة
    const alternatives: string[] = [];
    
    // يمكن تطوير هذه الوظيفة لتوليد بدائل أكثر ذكاءً
    if (text.length > 10) {
      alternatives.push(text.replace(/\b\w+\b/g, (word) => {
        // استبدال بعض الكلمات ببدائل
        const synonyms: Record<string, string> = {
          'خدمة': 'خدمات',
          'منتج': 'منتجات',
          'عميل': 'زبون',
          'شركة': 'مؤسسة'
        };
        return synonyms[word] || word;
      }));
    }
    
    return alternatives.slice(0, 3); // أقصى 3 بدائل
  }

  private initializeCustomTerms(): void {
    // مصطلحات افتراضية لصناعة التكييف
    const acMaintenanceTerms = {
      'air conditioning': 'تكييف الهواء',
      'hvac': 'أنظمة التدفئة والتهوية وتكييف الهواء',
      'maintenance': 'صيانة',
      'repair': 'إصلاح',
      'installation': 'تركيب',
      'service': 'خدمة',
      'technician': 'فني',
      'emergency': 'طوارئ',
      'warranty': 'ضمان',
      'filter': 'فلتر',
      'compressor': 'ضاغط',
      'refrigerant': 'مبرد',
      'thermostat': 'منظم حرارة',
      'duct': 'مجرى هواء',
      'ventilation': 'تهوية',
      'cooling': 'تبريد',
      'heating': 'تدفئة',
      'energy efficient': 'موفر للطاقة',
      'annual contract': 'عقد سنوي',
      'preventive maintenance': 'صيانة وقائية'
    };
    
    this.addCustomTerms(acMaintenanceTerms);
  }

  // ===== Fallback Methods =====

  private getFallbackTranslation(request: TranslationRequest): TranslationResponse {
    // ترجمة احتياطية بسيطة
    const translatedContent: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(request.content)) {
      // ترجمة أساسية أو إبقاء النص كما هو
      translatedContent[key] = this.basicTranslation(value as string, request.sourceLanguage, request.targetLanguage);
    }
    
    return {
      translatedContent,
      quality: {
        score: 0.5,
        issues: ['استخدام ترجمة احتياطية'],
        suggestions: ['إعادة المحاولة مع اتصال أفضل بالإنترنت']
      },
      metadata: {
        wordsTranslated: this.countWords(request.content),
        processingTime: 100,
        confidence: 0.5
      }
    };
  }

  private getFallbackQuickTranslation(text: string, options: any): {
    translatedText: string;
    confidence: number;
    alternatives?: string[];
  } {
    return {
      translatedText: this.basicTranslation(text, options.sourceLanguage, options.targetLanguage),
      confidence: 0.3,
      alternatives: []
    };
  }

  private basicTranslation(text: string, sourceLanguage: 'ar' | 'en', targetLanguage: 'ar' | 'en'): string {
    // ترجمة أساسية للكلمات الشائعة
    const basicDictionary: Record<string, Record<string, string>> = {
      'ar_to_en': {
        'الرئيسية': 'Home',
        'خدمات': 'Services',
        'من نحن': 'About Us',
        'اتصل بنا': 'Contact Us',
        'تكييف': 'Air Conditioning',
        'صيانة': 'Maintenance',
        'إصلاح': 'Repair',
        'تركيب': 'Installation',
        'طوارئ': 'Emergency',
        'فني': 'Technician',
        'خدمة': 'Service',
        'عميل': 'Customer',
        'شركة': 'Company',
        'جودة': 'Quality',
        'سعر': 'Price',
        'عرض': 'Offer'
      },
      'en_to_ar': {
        'Home': 'الرئيسية',
        'Services': 'خدمات',
        'About Us': 'من نحن',
        'Contact Us': 'اتصل بنا',
        'Air Conditioning': 'تكييف',
        'Maintenance': 'صيانة',
        'Repair': 'إصلاح',
        'Installation': 'تركيب',
        'Emergency': 'طوارئ',
        'Technician': 'فني',
        'Service': 'خدمة',
        'Customer': 'عميل',
        'Company': 'شركة',
        'Quality': 'جودة',
        'Price': 'سعر',
        'Offer': 'عرض'
      }
    };
    
    const dictionaryKey = `${sourceLanguage}_to_${targetLanguage}`;
    const dictionary = basicDictionary[dictionaryKey] || {};
    
    // البحث عن ترجمة مباشرة
    if (dictionary[text]) {
      return dictionary[text];
    }
    
    // البحث عن ترجمة جزئية
    for (const [source, target] of Object.entries(dictionary)) {
      if (text.toLowerCase().includes(source.toLowerCase())) {
        return text.replace(new RegExp(source, 'gi'), target);
      }
    }
    
    // إذا لم نجد ترجمة، نعيد النص الأصلي
    return text;
  }
}

export default AutoTranslator;