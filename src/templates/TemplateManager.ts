// Template Manager - Advanced Template Management System
// Handles template operations, caching, and business logic

import {
  PageTemplate,
  SectionTemplate,
  BlockTemplate,
  TemplateSearchOptions,
  TemplateSearchResult,
  TemplateInstallation,
  TemplateCustomization,
  TemplateExport,

} from './types';
import { DataGateway } from '../dataGateway/DataGateway';


export class TemplateManager {
  private dataGateway: DataGateway;
  private cache: Map<string, any> = new Map();


  constructor(dataGateway: DataGateway) {
    this.dataGateway = dataGateway;
    this.initializeSearchIndex();
  }

  // Template Retrieval
  async getTemplate(id: string): Promise<PageTemplate | SectionTemplate | BlockTemplate | null> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    try {
      const template = await this.dataGateway.read(`templates/${id}`);
      if (template) {
        this.cache.set(id, template);
      }
      return template as any;
    } catch (error) {
      console.error('Error fetching template:', error);
      return null;
    }
  }

  async getPageTemplate(id: string): Promise<PageTemplate | null> {
    const template = await this.getTemplate(id);
    return template?.scope === 'page' ? template as PageTemplate : null;
  }

  async getSectionTemplate(id: string): Promise<SectionTemplate | null> {
    const template = await this.getTemplate(id);
    return template?.scope === 'section' ? template as SectionTemplate : null;
  }

  async getBlockTemplate(id: string): Promise<BlockTemplate | null> {
    const template = await this.getTemplate(id);
    return template?.scope === 'block' ? template as BlockTemplate : null;
  }

  // Template Search and Filtering
  async searchTemplates(options: TemplateSearchOptions = {}): Promise<TemplateSearchResult> {
    try {
      const {
        query = '',
        category,
        scope,
        targetAudience,
        complexity,
        style,
        tags,
        rating,
        sortBy = 'rating',
        sortOrder = 'desc',
        limit = 20,
        offset = 0
      } = options;

      // Get all templates
      const allTemplates = await this.getAllTemplates();
      
      // Apply filters
      let filteredTemplates = allTemplates.filter(template => {
        // Text search
        if (query) {
          const searchText = `${template.name} ${template.nameAr} ${template.description} ${template.descriptionAr} ${template.tags.join(' ')}`.toLowerCase();
          if (!searchText.includes(query.toLowerCase())) {
            return false;
          }
        }

        // Category filter
        if (category && template.category !== category) {
          return false;
        }

        // Scope filter
        if (scope && template.scope !== scope) {
          return false;
        }

        // Target audience filter
        if (targetAudience && targetAudience.length > 0) {
          const hasMatchingAudience = targetAudience.some(audience => 
            template.targetAudience.includes(audience)
          );
          if (!hasMatchingAudience) {
            return false;
          }
        }

        // Complexity filter
        if (complexity && template.complexity !== complexity) {
          return false;
        }

        // Style filter
        if (style && template.style !== style) {
          return false;
        }

        // Tags filter
        if (tags && tags.length > 0) {
          const hasMatchingTag = tags.some(tag => 
            template.tags.includes(tag)
          );
          if (!hasMatchingTag) {
            return false;
          }
        }

        // Rating filter
        if (rating && template.rating < rating) {
          return false;
        }

        return true;
      });

      // Sort templates
      filteredTemplates.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'usage':
            comparison = a.usageCount - b.usageCount;
            break;
          case 'date':
            comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            break;
          default:
            comparison = a.rating - b.rating;
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });

      // Calculate facets
      const facets = this.calculateFacets(allTemplates);

      // Apply pagination
      const total = filteredTemplates.length;
      const paginatedTemplates = filteredTemplates.slice(offset, offset + limit);
      const hasMore = offset + limit < total;

      return {
        templates: paginatedTemplates,
        total,
        hasMore,
        facets
      };
    } catch (error) {
      console.error('Error searching templates:', error);
      return {
        templates: [],
        total: 0,
        hasMore: false,
        facets: {
          categories: {},
          targetAudience: {},
          complexity: {},
          style: {},
          tags: {}
        }
      };
    }
  }

  // Template Installation
  async installTemplate(
    installation: TemplateInstallation
  ): Promise<{ success: boolean; pageId?: string; sectionId?: string; error?: string }> {
    try {
      const template = await this.getTemplate(installation.templateId);
      if (!template) {
        return { success: false, error: 'Template not found' };
      }

      // Apply customizations
      const customizedTemplate = await this.applyCustomizations(template, installation.customizations || []);

      if (template.scope === 'page') {
        const pageTemplate = customizedTemplate as PageTemplate;
        const pageId = installation.targetPageId || this.generateId();
        
        // Create new page from template
        const pageData = {
          id: pageId,
          title: pageTemplate.name,
          titleAr: pageTemplate.nameAr,
          slug: this.generateSlug(pageTemplate.name),
          blocks: pageTemplate.blocks,
          settings: pageTemplate.settings,
          layout: pageTemplate.layout,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await this.dataGateway.write(`pages/${pageId}`, pageData);
        
        // Update template usage count
        await this.incrementUsageCount(installation.templateId);
        
        return { success: true, pageId };
      } else if (template.scope === 'section') {
        const sectionTemplate = customizedTemplate as SectionTemplate;
        const sectionId = this.generateId();
        
        // Add section to target page
        if (installation.targetPageId) {
          const page = await this.dataGateway.read(`pages/${installation.targetPageId}`);
          if (page) {
            const sectionBlocks = sectionTemplate.blocks.map(block => ({
              ...block,
              id: this.generateId()
            }));
            
            if (installation.preserveExisting) {
              (page as any).blocks.push(...sectionBlocks);
            } else {
              (page as any).blocks = sectionBlocks;
            }
            
            (page as any).updatedAt = new Date().toISOString();
            await this.dataGateway.write(`pages/${installation.targetPageId}`, page);
          }
        }
        
        // Update template usage count
        await this.incrementUsageCount(installation.templateId);
        
        return { success: true, sectionId };
      }

      return { success: false, error: 'Unsupported template scope' };
    } catch (error) {
      console.error('Error installing template:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Template Customization
  async applyCustomizations(
    template: PageTemplate | SectionTemplate | BlockTemplate,
    customizations: TemplateCustomization[]
  ): Promise<PageTemplate | SectionTemplate | BlockTemplate> {
    const customizedTemplate = JSON.parse(JSON.stringify(template));

    for (const customization of customizations) {
      try {
        this.applyCustomization(customizedTemplate, customization);
      } catch (error) {
        console.warn('Failed to apply customization:', customization, error);
      }
    }

    return customizedTemplate;
  }

  private applyCustomization(
    template: any,
    customization: TemplateCustomization
  ): void {
    const pathParts = customization.path.split('.');
    let current = template;
    
    // Navigate to the parent of the target property
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {};
      }
      current = current[pathParts[i]];
    }
    
    // Set the value
    const lastKey = pathParts[pathParts.length - 1];
    current[lastKey] = customization.value;
  }

  // Template Export/Import
  async exportTemplate(templateId: string): Promise<TemplateExport | null> {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        return null;
      }

      // Collect dependencies
      const dependencies = this.collectDependencies(template);

      return {
        template,
        dependencies,
        assets: [],
        metadata: {
          exportedAt: new Date().toISOString(),
          exportedBy: 'system',
          version: template.version,
          compatibility: ['1.0.0'],
          checksum: this.generateChecksum(template)
        }
      };
    } catch (error) {
      console.error('Error exporting template:', error);
      return null;
    }
  }

  async importTemplate(templateExport: TemplateExport): Promise<{ success: boolean; templateId?: string; error?: string }> {
    try {
      // Validate template
      if (!this.validateTemplate(templateExport.template)) {
        return { success: false, error: 'Invalid template format' };
      }

      // Generate new ID to avoid conflicts
      const newTemplateId = this.generateId();
      const template = {
        ...templateExport.template,
        id: newTemplateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
      };

      // Save template
      await this.dataGateway.write(`templates/${newTemplateId}`, template);
      
      // Clear cache
      this.cache.delete(templateExport.template.id);
      
      return { success: true, templateId: newTemplateId };
    } catch (error) {
      console.error('Error importing template:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Template Management
  async saveTemplate(template: PageTemplate | SectionTemplate | BlockTemplate): Promise<boolean> {
    try {
      template.updatedAt = new Date().toISOString();
      await this.dataGateway.write(`templates/${template.id}`, template);
      
      // Update cache
      this.cache.set(template.id, template);
      
      return true;
    } catch (error) {
      console.error('Error saving template:', error);
      return false;
    }
  }

  async deleteTemplate(templateId: string): Promise<boolean> {
    try {
      await this.dataGateway.delete(`templates/${templateId}`);
      
      // Clear cache
      this.cache.delete(templateId);
      
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      return false;
    }
  }

  async duplicateTemplate(templateId: string, newName?: string): Promise<string | null> {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        return null;
      }

      const newTemplateId = this.generateId();
      const duplicatedTemplate = {
        ...JSON.parse(JSON.stringify(template)),
        id: newTemplateId,
        name: newName || `${template.name} (Copy)`,
        nameAr: `${template.nameAr} (نسخة)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
      };

      await this.saveTemplate(duplicatedTemplate);
      return newTemplateId;
    } catch (error) {
      console.error('Error duplicating template:', error);
      return null;
    }
  }

  // Utility Methods
  private async getAllTemplates(): Promise<(PageTemplate | SectionTemplate | BlockTemplate)[]> {
    try {
      const templateIds = await this.dataGateway.list('templates');
      const templates = await Promise.all(
        templateIds.map(id => this.getTemplate(id))
      );
      return templates.filter(Boolean) as (PageTemplate | SectionTemplate | BlockTemplate)[];
    } catch (error) {
      console.error('Error fetching all templates:', error);
      return [];
    }
  }

  private calculateFacets(templates: (PageTemplate | SectionTemplate | BlockTemplate)[]) {
    const facets = {
      categories: {} as { [key: string]: number },
      targetAudience: {} as { [key: string]: number },
      complexity: {} as { [key: string]: number },
      style: {} as { [key: string]: number },
      tags: {} as { [key: string]: number }
    };

    templates.forEach(template => {
      // Categories
      facets.categories[template.category] = (facets.categories[template.category] || 0) + 1;
      
      // Target audience
      template.targetAudience.forEach(audience => {
        facets.targetAudience[audience] = (facets.targetAudience[audience] || 0) + 1;
      });
      
      // Complexity
      facets.complexity[template.complexity] = (facets.complexity[template.complexity] || 0) + 1;
      
      // Style
      facets.style[template.style] = (facets.style[template.style] || 0) + 1;
      
      // Tags
      template.tags.forEach(tag => {
        facets.tags[tag] = (facets.tags[tag] || 0) + 1;
      });
    });

    return facets;
  }

  private async incrementUsageCount(templateId: string): Promise<void> {
    try {
      const template = await this.getTemplate(templateId);
      if (template) {
        template.usageCount += 1;
        await this.saveTemplate(template);
      }
    } catch (error) {
      console.warn('Failed to increment usage count:', error);
    }
  }

  private collectDependencies(template: PageTemplate | SectionTemplate | BlockTemplate): string[] {
    const dependencies = new Set<string>();
    
    if (template.scope === 'page') {
      const pageTemplate = template as PageTemplate;
      pageTemplate.requiredBlocks.forEach(blockId => dependencies.add(blockId));
      pageTemplate.optionalBlocks.forEach(blockId => dependencies.add(blockId));
    }
    
    return Array.from(dependencies);
  }



  private validateTemplate(template: any): boolean {
    // Basic validation - can be extended with more comprehensive checks
    return (
      template &&
      typeof template.id === 'string' &&
      typeof template.name === 'string' &&
      typeof template.scope === 'string' &&
      ['page', 'section', 'block'].includes(template.scope)
    );
  }

  private generateId(): string {
    return `tpl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private generateChecksum(template: any): string {
    // Simple checksum generation - in production, use a proper hashing algorithm
    return btoa(JSON.stringify(template)).slice(0, 16);
  }

  private async initializeSearchIndex(): Promise<void> {
    // Initialize search index for better performance
    // This could be implemented with a proper search engine like Lunr.js
  }

  // Template Analytics
  async getTemplateAnalytics(templateId: string) {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        return null;
      }

      return {
        usageCount: template.usageCount,
        rating: template.rating,
        reviewCount: template.reviews.length,
        lastUsed: null,
        popularityRank: 0
      };
    } catch (error) {
      console.error('Error fetching template analytics:', error);
      return null;
    }
  }


}