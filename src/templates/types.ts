// Template System Types
// Comprehensive type definitions for the advanced template system

import { Block } from '../blocks/schemas';

// Template Categories
export type TemplateCategory = 
  | 'landing-pages'
  | 'service-pages'
  | 'about-pages'
  | 'contact-pages'
  | 'portfolio-pages'
  | 'blog-pages'
  | 'pricing-pages'
  | 'emergency-pages'
  | 'maintenance-pages'
  | 'commercial-pages'
  | 'residential-pages'
  | 'seasonal-pages';

// Section Categories
export type SectionCategory =
  | 'hero-sections'
  | 'service-sections'
  | 'testimonial-sections'
  | 'pricing-sections'
  | 'contact-sections'
  | 'about-sections'
  | 'portfolio-sections'
  | 'blog-sections'
  | 'cta-sections'
  | 'feature-sections'
  | 'team-sections'
  | 'faq-sections'
  | 'emergency-sections'
  | 'guarantee-sections'
  | 'process-sections'
  | 'stats-sections'
  | 'brand-sections'
  | 'footer-sections'
  | 'header-sections';

// Customization Levels
export type CustomizationLevel = 'basic' | 'medium' | 'advanced';

// Template Scope
export type TemplateScope = 'page' | 'section' | 'block';

// Template Status
export type TemplateStatus = 'active' | 'draft' | 'archived';

// Template Target Audience
export type TargetAudience = 
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'emergency'
  | 'maintenance'
  | 'installation'
  | 'repair';

// Template Complexity
export type TemplateComplexity = 'simple' | 'moderate' | 'complex';

// Template Style
export type TemplateStyle = 
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'professional'
  | 'creative'
  | 'corporate'
  | 'friendly'
  | 'technical';

// Base Template Interface
export interface BaseTemplate {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: TemplateCategory | SectionCategory;
  scope: TemplateScope;
  status: TemplateStatus;
  
  // Metadata
  tags: string[];
  targetAudience: TargetAudience[];
  complexity: TemplateComplexity;
  style: TemplateStyle;
  
  // Customization
  customizationLevel: CustomizationLevel;
  allowedCustomizations: string[];
  
  // Preview
  thumbnail: string;
  previewImages: string[];
  demoUrl?: string;
  
  // Technical
  version: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  
  // Usage
  usageCount: number;
  rating: number;
  reviews: TemplateReview[];
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Page Template
export interface PageTemplate extends BaseTemplate {
  scope: 'page';
  category: TemplateCategory;
  
  // Page Structure
  blocks: Block[];
  layout: PageLayout;
  
  // Page Settings
  settings: PageSettings;
  
  // Navigation
  navigation?: NavigationConfig;
  
  // Dependencies
  requiredBlocks: string[];
  optionalBlocks: string[];
  
  // Variations
  variations: TemplateVariation[];
}

// Section Template
export interface SectionTemplate extends BaseTemplate {
  scope: 'section';
  category: SectionCategory;
  
  // Section Structure
  blocks: Block[];
  
  // Section Settings
  settings: SectionSettings;
  
  // Layout Options
  layoutOptions: LayoutOption[];
  
  // Content Slots
  contentSlots: ContentSlot[];
  
  // Responsive Behavior
  responsiveConfig: ResponsiveConfig;
}

// Block Template
export interface BlockTemplate extends BaseTemplate {
  scope: 'block';
  
  // Block Data
  blockType: string;
  defaultData: any;
  
  // Configuration
  configSchema: any;
  
  // Styling
  defaultStyles: any;
  styleVariations: StyleVariation[];
}

// Template Variation
export interface TemplateVariation {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  thumbnail: string;
  
  // Changes from base template
  blockChanges: BlockChange[];
  settingChanges: SettingChange[];
  styleChanges: StyleChange[];
}

// Block Change
export interface BlockChange {
  blockId: string;
  action: 'add' | 'remove' | 'modify' | 'replace';
  data?: any;
  position?: number;
}

// Setting Change
export interface SettingChange {
  path: string;
  value: any;
  action: 'set' | 'merge' | 'delete';
}

// Style Change
export interface StyleChange {
  selector: string;
  properties: { [key: string]: any };
  action: 'add' | 'modify' | 'remove';
}

// Page Layout
export interface PageLayout {
  type: 'single-column' | 'two-column' | 'three-column' | 'custom';
  header: HeaderConfig;
  footer: FooterConfig;
  sidebar?: SidebarConfig;
  
  // Grid System
  gridSystem: 'bootstrap' | 'tailwind' | 'css-grid' | 'flexbox';
  breakpoints: Breakpoint[];
  
  // Spacing
  spacing: SpacingConfig;
  
  // Container
  container: ContainerConfig;
}

// Page Settings
export interface PageSettings {
  // SEO
  seo: SEOSettings;
  
  // Performance
  performance: PerformanceSettings;
  
  // Accessibility
  accessibility: AccessibilitySettings;
  
  // Internationalization
  i18n: I18nSettings;
  
  // Analytics
  analytics: AnalyticsSettings;
  
  // Custom Code
  customCSS?: string;
  customJS?: string;
  customHead?: string;
}

// Section Settings
export interface SectionSettings {
  // Layout
  layout: SectionLayout;
  
  // Spacing
  padding: SpacingValue;
  margin: SpacingValue;
  
  // Background
  background: BackgroundConfig;
  
  // Animation
  animation: AnimationConfig;
  
  // Responsive
  responsive: ResponsiveSettings;
}

// Layout Option
export interface LayoutOption {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  thumbnail: string;
  
  // Grid Configuration
  columns: number;
  rows?: number;
  gap: string;
  
  // Responsive Behavior
  responsive: {
    mobile: { columns: number; gap: string };
    tablet: { columns: number; gap: string };
    desktop: { columns: number; gap: string };
  };
}

// Content Slot
export interface ContentSlot {
  id: string;
  name: string;
  nameAr: string;
  type: 'text' | 'image' | 'video' | 'block' | 'custom';
  required: boolean;
  defaultContent?: any;
  validation?: any;
}

// Responsive Config
export interface ResponsiveConfig {
  breakpoints: Breakpoint[];
  behavior: ResponsiveBehavior;
  hiddenOn?: ('mobile' | 'tablet' | 'desktop')[];
  orderOn?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

// Style Variation
export interface StyleVariation {
  id: string;
  name: string;
  nameAr: string;
  thumbnail: string;
  styles: { [key: string]: any };
  variables?: { [key: string]: any };
}

// Template Review
export interface TemplateReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

// Configuration Interfaces
export interface HeaderConfig {
  type: 'fixed' | 'static' | 'sticky';
  height: string;
  background: BackgroundConfig;
  navigation: NavigationConfig;
}

export interface FooterConfig {
  type: 'simple' | 'complex' | 'minimal';
  background: BackgroundConfig;
  content: FooterContent;
}

export interface SidebarConfig {
  position: 'left' | 'right';
  width: string;
  background: BackgroundConfig;
  content: any;
}

export interface NavigationConfig {
  type: 'horizontal' | 'vertical' | 'mega' | 'mobile';
  items: NavigationItem[];
  style: NavigationStyle;
}

export interface NavigationItem {
  id: string;
  label: string;
  labelAr: string;
  url: string;
  icon?: string;
  children?: NavigationItem[];
  target?: '_blank' | '_self';
}

export interface NavigationStyle {
  layout: 'inline' | 'dropdown' | 'accordion';
  alignment: 'left' | 'center' | 'right';
  spacing: string;
  colors: {
    text: string;
    background: string;
    hover: string;
    active: string;
  };
}

export interface FooterContent {
  sections: FooterSection[];
  copyright: string;
  copyrightAr: string;
  socialLinks: SocialLink[];
}

export interface FooterSection {
  id: string;
  title: string;
  titleAr: string;
  type: 'links' | 'contact' | 'newsletter' | 'custom';
  content: any;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Utility Types
export interface Breakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
}

export interface SpacingConfig {
  unit: 'px' | 'rem' | 'em' | '%';
  scale: number[];
  default: string;
}

export interface ContainerConfig {
  maxWidth: string;
  padding: string;
  centered: boolean;
}

export interface SpacingValue {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image' | 'video';
  value: string;
  overlay?: {
    color: string;
    opacity: number;
  };
  position?: string;
  size?: string;
  repeat?: string;
}

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'zoom' | 'bounce' | 'none';
  duration: number;
  delay: number;
  easing: string;
  trigger: 'scroll' | 'hover' | 'click' | 'load';
}

export interface SectionLayout {
  type: 'container' | 'full-width' | 'boxed';
  alignment: 'left' | 'center' | 'right';
  direction: 'row' | 'column';
  wrap: boolean;
}

export interface ResponsiveSettings {
  hideOn: ('mobile' | 'tablet' | 'desktop')[];
  showOn: ('mobile' | 'tablet' | 'desktop')[];
  orderOn: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export interface ResponsiveBehavior {
  stack: boolean;
  reorder: boolean;
  resize: boolean;
  hide: boolean;
}

// Settings Interfaces
export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  robots?: string;
  schema?: any;
}

export interface PerformanceSettings {
  lazyLoading: boolean;
  imageOptimization: boolean;
  caching: boolean;
  minification: boolean;
  compression: boolean;
}

export interface AccessibilitySettings {
  altTexts: boolean;
  ariaLabels: boolean;
  keyboardNavigation: boolean;
  colorContrast: boolean;
  screenReader: boolean;
}

export interface I18nSettings {
  defaultLanguage: 'ar' | 'en';
  supportedLanguages: ('ar' | 'en')[];
  rtlSupport: boolean;
  dateFormat: string;
  numberFormat: string;
}

export interface AnalyticsSettings {
  googleAnalytics?: string;
  facebookPixel?: string;
  customTracking?: string;
  events: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  name: string;
  trigger: string;
  parameters: { [key: string]: any };
}

// Template Search and Filter
export interface TemplateSearchOptions {
  query?: string;
  category?: TemplateCategory | SectionCategory;
  scope?: TemplateScope;
  targetAudience?: TargetAudience[];
  complexity?: TemplateComplexity;
  style?: TemplateStyle;
  tags?: string[];
  rating?: number;
  sortBy?: 'name' | 'rating' | 'usage' | 'date';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface TemplateSearchResult {
  templates: (PageTemplate | SectionTemplate | BlockTemplate)[];
  total: number;
  hasMore: boolean;
  facets: {
    categories: { [key: string]: number };
    targetAudience: { [key: string]: number };
    complexity: { [key: string]: number };
    style: { [key: string]: number };
    tags: { [key: string]: number };
  };
}

// Template Installation
export interface TemplateInstallation {
  templateId: string;
  targetPageId?: string;
  targetSectionId?: string;
  customizations?: TemplateCustomization[];
  preserveExisting?: boolean;
}

export interface TemplateCustomization {
  path: string;
  value: any;
  type: 'content' | 'style' | 'setting';
}

// Template Export/Import
export interface TemplateExport {
  template: PageTemplate | SectionTemplate | BlockTemplate;
  dependencies: string[];
  assets: TemplateAsset[];
  metadata: TemplateExportMetadata;
}

export interface TemplateAsset {
  id: string;
  type: 'image' | 'video' | 'font' | 'icon' | 'css' | 'js';
  url: string;
  localPath?: string;
  size: number;
}

export interface TemplateExportMetadata {
  exportedAt: string;
  exportedBy: string;
  version: string;
  compatibility: string[];
  checksum: string;
}