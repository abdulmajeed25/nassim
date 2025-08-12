// Template System - Advanced Templates Library
// This module provides a comprehensive template system with 40+ page templates
// and 100+ section templates specifically designed for AC maintenance businesses

export * from './types';
export * from './TemplateManager';
export * from './categories';
export * from './pageTemplates';
export * from './sectionTemplates';
export * from './presets';
export * from './utils';

// Template Categories
export { TEMPLATE_CATEGORIES } from './categories';

// Page Templates
export { PAGE_TEMPLATES } from './pageTemplates';

// Section Templates
export { CTA_SECTION_TEMPLATES as SECTION_TEMPLATES } from './sectionTemplates';

// AC Maintenance Presets
export { ALL_TEMPLATE_PRESETS as AC_MAINTENANCE_PRESETS } from './presets';

// Template Manager
export { TemplateManager } from './TemplateManager';

// Utility Functions
export {
  searchTemplates,
  generateTemplatePreview as getTemplatePreview,
  validateTemplate,
  mergeTemplates as mergeTemplateData
} from './utils';