// Template Categories - Comprehensive categorization system
// Defines all available template categories for pages and sections

import { TemplateCategory, SectionCategory } from './types';

// Page Template Categories
export const PAGE_TEMPLATE_CATEGORIES: {
  [key in TemplateCategory]: {
    id: TemplateCategory;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    color: string;
    order: number;
  }
} = {
  'landing-pages': {
    id: 'landing-pages',
    name: 'Landing Pages',
    nameAr: 'صفحات الهبوط',
    description: 'High-converting landing pages for marketing campaigns',
    descriptionAr: 'صفحات هبوط عالية التحويل للحملات التسويقية',
    icon: 'rocket',
    color: '#3B82F6',
    order: 1
  },
  'service-pages': {
    id: 'service-pages',
    name: 'Service Pages',
    nameAr: 'صفحات الخدمات',
    description: 'Detailed service presentation pages',
    descriptionAr: 'صفحات عرض الخدمات التفصيلية',
    icon: 'wrench',
    color: '#10B981',
    order: 2
  },
  'about-pages': {
    id: 'about-pages',
    name: 'About Pages',
    nameAr: 'صفحات من نحن',
    description: 'Company story and team presentation pages',
    descriptionAr: 'صفحات قصة الشركة وعرض الفريق',
    icon: 'users',
    color: '#8B5CF6',
    order: 3
  },
  'contact-pages': {
    id: 'contact-pages',
    name: 'Contact Pages',
    nameAr: 'صفحات التواصل',
    description: 'Contact forms and location pages',
    descriptionAr: 'صفحات نماذج التواصل والمواقع',
    icon: 'phone',
    color: '#F59E0B',
    order: 4
  },
  'portfolio-pages': {
    id: 'portfolio-pages',
    name: 'Portfolio Pages',
    nameAr: 'صفحات الأعمال',
    description: 'Project showcases and work galleries',
    descriptionAr: 'صفحات عرض المشاريع ومعارض الأعمال',
    icon: 'image',
    color: '#EF4444',
    order: 5
  },
  'blog-pages': {
    id: 'blog-pages',
    name: 'Blog Pages',
    nameAr: 'صفحات المدونة',
    description: 'Blog layouts and article pages',
    descriptionAr: 'تخطيطات المدونة وصفحات المقالات',
    icon: 'edit',
    color: '#06B6D4',
    order: 6
  },
  'pricing-pages': {
    id: 'pricing-pages',
    name: 'Pricing Pages',
    nameAr: 'صفحات الأسعار',
    description: 'Service pricing and package comparison pages',
    descriptionAr: 'صفحات أسعار الخدمات ومقارنة الباقات',
    icon: 'dollar-sign',
    color: '#84CC16',
    order: 7
  },
  'emergency-pages': {
    id: 'emergency-pages',
    name: 'Emergency Pages',
    nameAr: 'صفحات الطوارئ',
    description: '24/7 emergency service pages',
    descriptionAr: 'صفحات خدمات الطوارئ على مدار الساعة',
    icon: 'alert-triangle',
    color: '#DC2626',
    order: 8
  },
  'maintenance-pages': {
    id: 'maintenance-pages',
    name: 'Maintenance Pages',
    nameAr: 'صفحات الصيانة',
    description: 'Maintenance service and contract pages',
    descriptionAr: 'صفحات خدمات الصيانة والعقود',
    icon: 'settings',
    color: '#7C3AED',
    order: 9
  },
  'commercial-pages': {
    id: 'commercial-pages',
    name: 'Commercial Pages',
    nameAr: 'صفحات تجارية',
    description: 'B2B and commercial service pages',
    descriptionAr: 'صفحات الخدمات التجارية والشركات',
    icon: 'building',
    color: '#059669',
    order: 10
  },
  'residential-pages': {
    id: 'residential-pages',
    name: 'Residential Pages',
    nameAr: 'صفحات سكنية',
    description: 'Home and residential service pages',
    descriptionAr: 'صفحات الخدمات السكنية والمنزلية',
    icon: 'home',
    color: '#0891B2',
    order: 11
  },
  'seasonal-pages': {
    id: 'seasonal-pages',
    name: 'Seasonal Pages',
    nameAr: 'صفحات موسمية',
    description: 'Summer/winter seasonal service pages',
    descriptionAr: 'صفحات الخدمات الموسمية صيف/شتاء',
    icon: 'sun',
    color: '#EA580C',
    order: 12
  }
};

// Section Template Categories
export const SECTION_TEMPLATE_CATEGORIES: {
  [key in SectionCategory]: {
    id: SectionCategory;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
    color: string;
    order: number;
  }
} = {
  'hero-sections': {
    id: 'hero-sections',
    name: 'Hero Sections',
    nameAr: 'أقسام البطل',
    description: 'Eye-catching header sections with call-to-action',
    descriptionAr: 'أقسام رأس جذابة مع دعوة للعمل',
    icon: 'star',
    color: '#3B82F6',
    order: 1
  },
  'service-sections': {
    id: 'service-sections',
    name: 'Service Sections',
    nameAr: 'أقسام الخدمات',
    description: 'Service listings and feature presentations',
    descriptionAr: 'قوائم الخدمات وعروض المميزات',
    icon: 'grid',
    color: '#10B981',
    order: 2
  },
  'testimonial-sections': {
    id: 'testimonial-sections',
    name: 'Testimonial Sections',
    nameAr: 'أقسام الشهادات',
    description: 'Customer reviews and testimonials',
    descriptionAr: 'مراجعات العملاء والشهادات',
    icon: 'message-circle',
    color: '#F59E0B',
    order: 3
  },
  'pricing-sections': {
    id: 'pricing-sections',
    name: 'Pricing Sections',
    nameAr: 'أقسام الأسعار',
    description: 'Pricing tables and package comparisons',
    descriptionAr: 'جداول الأسعار ومقارنات الباقات',
    icon: 'dollar-sign',
    color: '#84CC16',
    order: 4
  },
  'contact-sections': {
    id: 'contact-sections',
    name: 'Contact Sections',
    nameAr: 'أقسام التواصل',
    description: 'Contact forms and information sections',
    descriptionAr: 'نماذج التواصل وأقسام المعلومات',
    icon: 'phone',
    color: '#EF4444',
    order: 5
  },
  'about-sections': {
    id: 'about-sections',
    name: 'About Sections',
    nameAr: 'أقسام من نحن',
    description: 'Company information and story sections',
    descriptionAr: 'أقسام معلومات الشركة والقصة',
    icon: 'info',
    color: '#8B5CF6',
    order: 6
  },
  'portfolio-sections': {
    id: 'portfolio-sections',
    name: 'Portfolio Sections',
    nameAr: 'أقسام الأعمال',
    description: 'Work showcases and project galleries',
    descriptionAr: 'عروض الأعمال ومعارض المشاريع',
    icon: 'image',
    color: '#06B6D4',
    order: 7
  },
  'blog-sections': {
    id: 'blog-sections',
    name: 'Blog Sections',
    nameAr: 'أقسام المدونة',
    description: 'Blog post listings and article previews',
    descriptionAr: 'قوائم مقالات المدونة ومعاينات المقالات',
    icon: 'edit',
    color: '#7C3AED',
    order: 8
  },
  'cta-sections': {
    id: 'cta-sections',
    name: 'Call-to-Action Sections',
    nameAr: 'أقسام دعوة للعمل',
    description: 'Action-oriented sections to drive conversions',
    descriptionAr: 'أقسام موجهة للعمل لزيادة التحويلات',
    icon: 'arrow-right',
    color: '#DC2626',
    order: 9
  },
  'feature-sections': {
    id: 'feature-sections',
    name: 'Feature Sections',
    nameAr: 'أقسام المميزات',
    description: 'Product and service feature highlights',
    descriptionAr: 'إبراز مميزات المنتجات والخدمات',
    icon: 'check-circle',
    color: '#059669',
    order: 10
  },
  'team-sections': {
    id: 'team-sections',
    name: 'Team Sections',
    nameAr: 'أقسام الفريق',
    description: 'Team member presentations and profiles',
    descriptionAr: 'عروض أعضاء الفريق والملفات الشخصية',
    icon: 'users',
    color: '#0891B2',
    order: 11
  },
  'faq-sections': {
    id: 'faq-sections',
    name: 'FAQ Sections',
    nameAr: 'أقسام الأسئلة الشائعة',
    description: 'Frequently asked questions and answers',
    descriptionAr: 'الأسئلة الشائعة والإجابات',
    icon: 'help-circle',
    color: '#7C2D12',
    order: 12
  },
  'emergency-sections': {
    id: 'emergency-sections',
    name: 'Emergency Sections',
    nameAr: 'أقسام الطوارئ',
    description: '24/7 emergency service sections',
    descriptionAr: 'أقسام خدمات الطوارئ على مدار الساعة',
    icon: 'alert-triangle',
    color: '#B91C1C',
    order: 13
  },
  'guarantee-sections': {
    id: 'guarantee-sections',
    name: 'Guarantee Sections',
    nameAr: 'أقسام الضمانات',
    description: 'Service guarantees and warranty information',
    descriptionAr: 'ضمانات الخدمة ومعلومات الكفالة',
    icon: 'shield',
    color: '#166534',
    order: 14
  },
  'process-sections': {
    id: 'process-sections',
    name: 'Process Sections',
    nameAr: 'أقسام العمليات',
    description: 'Step-by-step process explanations',
    descriptionAr: 'شرح العمليات خطوة بخطوة',
    icon: 'list',
    color: '#92400E',
    order: 15
  },
  'stats-sections': {
    id: 'stats-sections',
    name: 'Statistics Sections',
    nameAr: 'أقسام الإحصائيات',
    description: 'Company statistics and achievements',
    descriptionAr: 'إحصائيات الشركة والإنجازات',
    icon: 'bar-chart',
    color: '#7C3AED',
    order: 16
  },
  'brand-sections': {
    id: 'brand-sections',
    name: 'Brand Sections',
    nameAr: 'أقسام العلامات التجارية',
    description: 'Partner brands and certifications',
    descriptionAr: 'العلامات التجارية الشريكة والشهادات',
    icon: 'award',
    color: '#059669',
    order: 17
  },
  'footer-sections': {
    id: 'footer-sections',
    name: 'Footer Sections',
    nameAr: 'أقسام التذييل',
    description: 'Website footer layouts and designs',
    descriptionAr: 'تخطيطات وتصاميم تذييل الموقع',
    icon: 'layout',
    color: '#374151',
    order: 18
  },
  'header-sections': {
    id: 'header-sections',
    name: 'Header Sections',
    nameAr: 'أقسام الرأس',
    description: 'Website header and navigation layouts',
    descriptionAr: 'تخطيطات رأس الموقع والتنقل',
    icon: 'menu',
    color: '#1F2937',
    order: 19
  }
};

// Combined categories for search and filtering
export const TEMPLATE_CATEGORIES = {
  pages: PAGE_TEMPLATE_CATEGORIES,
  sections: SECTION_TEMPLATE_CATEGORIES
};

// Category utilities
export const getCategoryInfo = (categoryId: string, scope: 'page' | 'section') => {
  if (scope === 'page') {
    return PAGE_TEMPLATE_CATEGORIES[categoryId as TemplateCategory];
  } else {
    return SECTION_TEMPLATE_CATEGORIES[categoryId as SectionCategory];
  }
};

export const getAllCategories = (scope?: 'page' | 'section') => {
  if (scope === 'page') {
    return Object.values(PAGE_TEMPLATE_CATEGORIES);
  } else if (scope === 'section') {
    return Object.values(SECTION_TEMPLATE_CATEGORIES);
  } else {
    return {
      pages: Object.values(PAGE_TEMPLATE_CATEGORIES),
      sections: Object.values(SECTION_TEMPLATE_CATEGORIES)
    };
  }
};

export const getCategoriesByOrder = (scope?: 'page' | 'section') => {
  const categories = getAllCategories(scope);
  
  if (scope) {
    return (categories as any[]).sort((a, b) => a.order - b.order);
  } else {
    return {
      pages: (categories as any).pages.sort((a: any, b: any) => a.order - b.order),
      sections: (categories as any).sections.sort((a: any, b: any) => a.order - b.order)
    };
  }
};

// AC Maintenance specific category mappings
export const AC_MAINTENANCE_CATEGORY_MAPPING = {
  // High priority categories for AC maintenance business
  primary: [
    'emergency-pages',
    'service-pages',
    'maintenance-pages',
    'contact-pages',
    'hero-sections',
    'emergency-sections',
    'service-sections',
    'contact-sections'
  ],
  
  // Secondary categories
  secondary: [
    'commercial-pages',
    'residential-pages',
    'pricing-pages',
    'about-pages',
    'pricing-sections',
    'testimonial-sections',
    'guarantee-sections',
    'process-sections'
  ],
  
  // Seasonal and specialized
  seasonal: [
    'seasonal-pages',
    'landing-pages',
    'portfolio-pages',
    'cta-sections',
    'feature-sections',
    'stats-sections'
  ]
};