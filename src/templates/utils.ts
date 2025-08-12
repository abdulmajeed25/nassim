// Template Utilities - Helper functions for template management
// Comprehensive utility functions for template operations

import { PageTemplate, SectionTemplate } from './types';


// Template validation utilities
export const validateTemplate = (template: PageTemplate | SectionTemplate): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!template.id) errors.push('Template ID is required');
  if (!template.name) errors.push('Template name is required');
  if (!template.nameAr) warnings.push('Arabic name is recommended');
  if (!template.description) errors.push('Template description is required');
  if (!template.category) errors.push('Template category is required');
  if (!template.thumbnail) warnings.push('Template thumbnail is recommended');

  // ID format validation
  if (template.id && !/^[a-z0-9_]+$/.test(template.id)) {
    errors.push('Template ID must contain only lowercase letters, numbers, and underscores');
  }

  // Version format validation
  if (template.version && !/^\d+\.\d+\.\d+$/.test(template.version)) {
    warnings.push('Version should follow semantic versioning (x.y.z)');
  }

  // Tags validation
  if (template.tags.length === 0) {
    warnings.push('Adding tags improves template discoverability');
  }

  // Blocks validation for section templates
  if ('blocks' in template && template.blocks.length === 0) {
    warnings.push('Section template should contain at least one block');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Template search and filtering utilities
export const searchTemplates = <T extends PageTemplate | SectionTemplate>(
  templates: T[],
  query: string,
  filters?: {
    category?: string;
    tags?: string[];
    targetAudience?: string;
    complexity?: string;
    minRating?: number;
  }
): T[] => {
  let filtered = templates;

  // Text search
  if (query.trim()) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(template => 
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.nameAr.includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.descriptionAr.includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Apply filters
  if (filters) {
    if (filters.category) {
      filtered = filtered.filter(template => template.category === filters.category);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(template => 
        filters.tags!.some(tag => template.tags.includes(tag))
      );
    }

    if (filters.targetAudience) {
      filtered = filtered.filter(template => 
        template.targetAudience.includes(filters.targetAudience as any)
      );
    }

    if (filters.complexity) {
      filtered = filtered.filter(template => template.complexity === filters.complexity);
    }

    if (filters.minRating) {
      filtered = filtered.filter(template => template.rating >= filters.minRating!);
    }
  }

  return filtered;
};

// Template sorting utilities
export const sortTemplates = <T extends PageTemplate | SectionTemplate>(
  templates: T[],
  sortBy: 'name' | 'nameAr' | 'rating' | 'usageCount' | 'createdAt' | 'updatedAt',
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...templates].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
      case 'nameAr':
        comparison = a[sortBy].localeCompare(b[sortBy]);
        break;
      case 'rating':
      case 'usageCount':
        comparison = a[sortBy] - b[sortBy];
        break;
      case 'createdAt':
      case 'updatedAt':
        comparison = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });
};

// Template preview utilities
export const generateTemplatePreview = (template: PageTemplate | SectionTemplate): {
  html: string;
  css: string;
  metadata: {
    title: string;
    description: string;
    blocks: number;
    estimatedLoadTime: string;
  };
} => {
  let html = '';
  let css = '';
  let blockCount = 0;

  if ('sections' in template) {
    // Page template
    html = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${template.name}</title>
        <meta name="description" content="${template.description}">
      </head>
      <body>
        <div class="template-preview page-template">
          ${template.blocks?.map(block => `
            <div class="block-${block.type}" data-block-id="${block.id}">
              <!-- Block: ${block.type} -->
            </div>
          `).join('') || ''}
        </div>
      </body>
      </html>
    `;
    blockCount = template.blocks?.length || 0;
  } else {
    // Section template
    html = `
      <div class="template-preview section-template">
        <section class="template-section" data-template-id="${template.id}">
          ${template.blocks.map(block => `
            <div class="template-block" data-block-type="${block.type}">
              <!-- Block: ${block.type} -->
            </div>
          `).join('')}
        </section>
      </div>
    `;
    blockCount = template.blocks.length;
  }

  css = `
    .template-preview {
      font-family: 'Cairo', 'Inter', sans-serif;
      direction: rtl;
      text-align: right;
    }
    .template-section {
      padding: 2rem;
      margin-bottom: 1rem;
      border: 1px dashed #e5e7eb;
      border-radius: 8px;
    }
    .template-block {
      padding: 1rem;
      margin-bottom: 0.5rem;
      background: #f9fafb;
      border-radius: 4px;
    }
  `;

  const estimatedLoadTime = calculateEstimatedLoadTime(blockCount);

  return {
    html,
    css,
    metadata: {
      title: template.name,
      description: template.description,
      blocks: blockCount,
      estimatedLoadTime
    }
  };
};

// Performance utilities
const calculateEstimatedLoadTime = (blockCount: number): string => {
  // Base load time + time per block
  const baseTime = 500; // ms
  const timePerBlock = 50; // ms
  const totalTime = baseTime + (blockCount * timePerBlock);
  
  if (totalTime < 1000) {
    return `${totalTime}ms`;
  } else {
    return `${(totalTime / 1000).toFixed(1)}s`;
  }
};

export const analyzeTemplatePerformance = (template: PageTemplate | SectionTemplate): {
  score: number;
  recommendations: string[];
  metrics: {
    blockCount: number;
    estimatedSize: string;
    loadTime: string;
    complexity: 'low' | 'medium' | 'high';
  };
} => {
  let blockCount = 0;
  let score = 100;
  const recommendations: string[] = [];

  if ('blocks' in template) {
    blockCount = template.blocks.length;
  } else {
    blockCount = 0;
  }

  // Performance scoring
  if (blockCount > 20) {
    score -= 20;
    recommendations.push('Consider reducing the number of blocks for better performance');
  }

  if (blockCount > 30) {
    score -= 30;
    recommendations.push('Template has too many blocks, consider splitting into multiple pages');
  }

  // Complexity analysis
  let complexity: 'low' | 'medium' | 'high' = 'low';
  if (blockCount > 10) complexity = 'medium';
  if (blockCount > 20) complexity = 'high';

  const estimatedSize = `${Math.round(blockCount * 2.5)}KB`;
  const loadTime = calculateEstimatedLoadTime(blockCount);

  return {
    score: Math.max(0, score),
    recommendations,
    metrics: {
      blockCount,
      estimatedSize,
      loadTime,
      complexity
    }
  };
};

// Template merging utilities
export const mergeTemplates = (
  baseTemplate: PageTemplate,
  additionalSections: SectionTemplate[]
): PageTemplate => {
  const merged: PageTemplate = {
    ...baseTemplate,
    id: `${baseTemplate.id}_merged_${Date.now()}`,
    name: `${baseTemplate.name} (Merged)`,
    nameAr: `${baseTemplate.nameAr} (مدمج)`,
    blocks: [...baseTemplate.blocks],
    updatedAt: new Date().toISOString()
  };

  // Add additional sections
  additionalSections.forEach(sectionTemplate => {
    const section = {
      id: `section_${sectionTemplate.id}_${Date.now()}`,
      templateId: sectionTemplate.id,
      name: sectionTemplate.name,
      nameAr: sectionTemplate.nameAr,
      blocks: sectionTemplate.blocks,
      settings: sectionTemplate.settings,
      order: merged.blocks.length
    };
    (merged.blocks as any[]).push(section as any);
  });

  return merged;
};

// Template export utilities
export const exportTemplate = (template: PageTemplate | SectionTemplate): {
  json: string;
  filename: string;
} => {
  const exportData = {
    ...template,
    exportedAt: new Date().toISOString(),
    exportVersion: '1.0.0'
  };

  const json = JSON.stringify(exportData, null, 2);
  const filename = `${template.id}_${new Date().toISOString().split('T')[0]}.json`;

  return { json, filename };
};

export const importTemplate = (jsonData: string): {
  success: boolean;
  template?: PageTemplate | SectionTemplate;
  errors: string[];
} => {
  try {
    const data = JSON.parse(jsonData);
    const validation = validateTemplate(data);

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // Generate new ID to avoid conflicts
    data.id = `${data.id}_imported_${Date.now()}`;
    data.importedAt = new Date().toISOString();

    return {
      success: true,
      template: data,
      errors: []
    };
  } catch (error) {
    return {
      success: false,
      errors: ['Invalid JSON format']
    };
  }
};

// Template recommendation utilities
export const getRecommendedTemplates = (
  currentTemplate: PageTemplate | SectionTemplate,
  allTemplates: (PageTemplate | SectionTemplate)[],
  limit: number = 5
): (PageTemplate | SectionTemplate)[] => {
  // Calculate similarity scores
  const scored = allTemplates
    .filter(template => template.id !== currentTemplate.id)
    .map(template => ({
      template,
      score: calculateSimilarityScore(currentTemplate, template)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(item => item.template);
};

const calculateSimilarityScore = (
  template1: PageTemplate | SectionTemplate,
  template2: PageTemplate | SectionTemplate
): number => {
  let score = 0;

  // Category match
  if (template1.category === template2.category) score += 30;

  // Target audience overlap
  const audienceOverlap = template1.targetAudience.filter(audience => 
    template2.targetAudience.includes(audience)
  ).length;
  score += audienceOverlap * 10;

  // Tag overlap
  const tagOverlap = template1.tags.filter(tag => 
    template2.tags.includes(tag)
  ).length;
  score += tagOverlap * 5;

  // Complexity match
  if (template1.complexity === template2.complexity) score += 15;

  // Style match
  if (template1.style === template2.style) score += 10;

  return score;
};

// Template analytics utilities
export const generateTemplateAnalytics = (templates: (PageTemplate | SectionTemplate)[]): {
  totalTemplates: number;
  byCategory: Record<string, number>;
  byComplexity: Record<string, number>;
  byAudience: Record<string, number>;
  averageRating: number;
  mostPopular: (PageTemplate | SectionTemplate)[];
  recentlyUpdated: (PageTemplate | SectionTemplate)[];
} => {
  const analytics = {
    totalTemplates: templates.length,
    byCategory: {} as Record<string, number>,
    byComplexity: {} as Record<string, number>,
    byAudience: {} as Record<string, number>,
    averageRating: 0,
    mostPopular: [] as (PageTemplate | SectionTemplate)[],
    recentlyUpdated: [] as (PageTemplate | SectionTemplate)[]
  };

  // Count by category
  templates.forEach(template => {
    analytics.byCategory[template.category] = (analytics.byCategory[template.category] || 0) + 1;
  });

  // Count by complexity
  templates.forEach(template => {
    analytics.byComplexity[template.complexity] = (analytics.byComplexity[template.complexity] || 0) + 1;
  });

  // Count by audience
  templates.forEach(template => {
    template.targetAudience.forEach(audience => {
      analytics.byAudience[audience] = (analytics.byAudience[audience] || 0) + 1;
    });
  });

  // Calculate average rating
  const totalRating = templates.reduce((sum, template) => sum + template.rating, 0);
  analytics.averageRating = totalRating / templates.length;

  // Most popular templates
  analytics.mostPopular = [...templates]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 5);

  // Recently updated templates
  analytics.recentlyUpdated = [...templates]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return analytics;
};

// Template duplication utilities
export const duplicateTemplate = (
  template: PageTemplate | SectionTemplate,
  namePrefix: string = 'Copy of'
): PageTemplate | SectionTemplate => {
  const duplicated = {
    ...template,
    id: `${template.id}_copy_${Date.now()}`,
    name: `${namePrefix} ${template.name}`,
    nameAr: `نسخة من ${template.nameAr}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    rating: 0,
    reviews: []
  };

  return duplicated;
};

// Template validation for AC business
export const validateACBusinessTemplate = (template: PageTemplate | SectionTemplate): {
  isACOptimized: boolean;
  suggestions: string[];
  score: number;
} => {
  const suggestions: string[] = [];
  let score = 0;

  // Check for AC-specific tags
  const acTags = ['ac', 'hvac', 'cooling', 'heating', 'maintenance', 'repair', 'installation'];
  const hasACTags = template.tags.some(tag => acTags.includes(tag.toLowerCase()));
  
  if (hasACTags) {
    score += 25;
  } else {
    suggestions.push('Add AC-specific tags for better categorization');
  }

  // Check for emergency features
  const hasEmergencyFeatures = template.tags.includes('emergency') || 
    template.name.toLowerCase().includes('emergency');
  
  if (hasEmergencyFeatures) {
    score += 20;
  } else {
    suggestions.push('Consider adding emergency service features');
  }

  // Check for Arabic support
  if (template.nameAr && template.descriptionAr) {
    score += 25;
  } else {
    suggestions.push('Add Arabic translations for better local market appeal');
  }

  // Check for residential/commercial targeting
  const hasProperAudience = template.targetAudience.includes('residential') || 
    template.targetAudience.includes('commercial');
  
  if (hasProperAudience) {
    score += 20;
  } else {
    suggestions.push('Define target audience (residential/commercial)');
  }

  // Check for contact/CTA elements
  const hasContactElements = template.tags.some(tag => 
    ['contact', 'cta', 'phone', 'whatsapp'].includes(tag.toLowerCase())
  );
  
  if (hasContactElements) {
    score += 10;
  } else {
    suggestions.push('Include contact or call-to-action elements');
  }

  return {
    isACOptimized: score >= 70,
    suggestions,
    score
  };
};

// Utility to get template dependencies
export const getTemplateDependencies = (template: PageTemplate | SectionTemplate): {
  requiredAssets: string[];
  optionalAssets: string[];
  externalDependencies: string[];
} => {
  const requiredAssets: string[] = [];
  const optionalAssets: string[] = [];
  const externalDependencies: string[] = [];

  // Add thumbnail as required asset
  if (template.thumbnail) {
    requiredAssets.push(template.thumbnail);
  }

  // Add preview images as optional assets
  template.previewImages.forEach(image => {
    optionalAssets.push(image);
  });

  // Check for external dependencies based on template features
  if (template.tags.includes('video')) {
    externalDependencies.push('video-player');
  }

  if (template.tags.includes('map')) {
    externalDependencies.push('google-maps');
  }

  if (template.tags.includes('carousel')) {
    externalDependencies.push('swiper');
  }

  if (template.tags.includes('animation')) {
    externalDependencies.push('framer-motion');
  }

  return {
    requiredAssets,
    optionalAssets,
    externalDependencies
  };
};

// Template health check
export const performTemplateHealthCheck = (template: PageTemplate | SectionTemplate): {
  health: 'excellent' | 'good' | 'fair' | 'poor';
  issues: string[];
  recommendations: string[];
  score: number;
} => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Check basic requirements
  const validation = validateTemplate(template);
  if (!validation.isValid) {
    issues.push(...validation.errors);
    score -= validation.errors.length * 10;
  }

  // Check performance
  const performance = analyzeTemplatePerformance(template);
  if (performance.score < 70) {
    issues.push('Performance concerns detected');
    recommendations.push(...performance.recommendations);
    score -= (100 - performance.score) * 0.3;
  }

  // Check AC business optimization
  const acOptimization = validateACBusinessTemplate(template);
  if (!acOptimization.isACOptimized) {
    recommendations.push(...acOptimization.suggestions);
    score -= (100 - acOptimization.score) * 0.2;
  }

  // Determine health status
  let health: 'excellent' | 'good' | 'fair' | 'poor';
  if (score >= 90) health = 'excellent';
  else if (score >= 75) health = 'good';
  else if (score >= 60) health = 'fair';
  else health = 'poor';

  return {
    health,
    issues,
    recommendations,
    score: Math.max(0, Math.round(score))
  };
};