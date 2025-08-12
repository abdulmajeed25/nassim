// Page Templates - 40+ Ready-to-use Page Templates
// Comprehensive collection of page templates for AC maintenance business

import { PageTemplate } from './types';


// Helper function to create base page template
const createPageTemplate = (overrides: Partial<PageTemplate>): PageTemplate => ({
  id: '',
  name: '',
  nameAr: '',
  description: '',
  descriptionAr: '',
  category: 'landing-pages',
  scope: 'page',
  status: 'active',
  tags: [],
  targetAudience: ['residential'],
  complexity: 'simple',
  style: 'modern',
  customizationLevel: 'basic',
  allowedCustomizations: ['colors', 'fonts', 'spacing', 'content'],
  thumbnail: '/templates/thumbnails/default.jpg',
  previewImages: [],
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'Nasim AC',
  usageCount: 0,
  rating: 5,
  reviews: [],
  blocks: [],
  layout: {
    type: 'single-column',
    header: {
      type: 'sticky',
      height: '80px',
      background: { type: 'color', value: '#ffffff' },
      navigation: {
        type: 'horizontal',
        items: [],
        style: {
          layout: 'inline',
          alignment: 'right',
          spacing: '2rem',
          colors: {
            text: '#1f2937',
            background: 'transparent',
            hover: '#3b82f6',
            active: '#1d4ed8'
          }
        }
      }
    },
    footer: {
      type: 'complex',
      background: { type: 'color', value: '#1f2937' },
      content: {
        sections: [],
        copyright: '© 2024 Nasim AC Maintenance. All rights reserved.',
        copyrightAr: '© 2024 نسيم لصيانة المكيفات. جميع الحقوق محفوظة.',
        socialLinks: []
      }
    },
    gridSystem: 'tailwind',
    breakpoints: [
      { name: 'mobile', minWidth: 0, maxWidth: 767 },
      { name: 'tablet', minWidth: 768, maxWidth: 1023 },
      { name: 'desktop', minWidth: 1024 }
    ],
    spacing: {
      unit: 'rem',
      scale: [0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20],
      default: '1rem'
    },
    container: {
      maxWidth: '1200px',
      padding: '1rem',
      centered: true
    }
  },
  settings: {
    seo: {
      title: '',
      description: '',
      keywords: [],
      robots: 'index,follow'
    },
    performance: {
      lazyLoading: true,
      imageOptimization: true,
      caching: true,
      minification: true,
      compression: true
    },
    accessibility: {
      altTexts: true,
      ariaLabels: true,
      keyboardNavigation: true,
      colorContrast: true,
      screenReader: true
    },
    i18n: {
      defaultLanguage: 'ar',
      supportedLanguages: ['ar', 'en'],
      rtlSupport: true,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'ar-SA'
    },
    analytics: {
      events: []
    }
  },
  requiredBlocks: [],
  optionalBlocks: [],
  variations: [],
  ...overrides
});

// Landing Pages (8 templates)
export const LANDING_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'lp_emergency_ac_repair',
    name: 'Emergency AC Repair Landing',
    nameAr: 'صفحة هبوط إصلاح المكيفات الطارئ',
    description: 'High-converting landing page for emergency AC repair services',
    descriptionAr: 'صفحة هبوط عالية التحويل لخدمات إصلاح المكيفات الطارئة',
    category: 'landing-pages',
    tags: ['emergency', 'repair', 'landing', 'conversion'],
    targetAudience: ['emergency', 'residential', 'commercial'],
    complexity: 'moderate',
    style: 'professional',
    thumbnail: '/templates/thumbnails/emergency-landing.jpg',
    blocks: [
      {
        id: 'hero_emergency',
        type: 'hero',
        data: {
          title: 'خدمة إصلاح المكيفات الطارئة 24/7',
          subtitle: 'فنيون معتمدون - استجابة فورية - ضمان شامل',
          alignment: 'center',
          backgroundImage: '/images/emergency-hero.jpg',
          height: 'screen'
        }
      },
      {
        id: 'emergency_notice',
        type: 'emergencyNotice',
        data: {
          title: 'خدمة طوارئ على مدار الساعة',
          message: 'مكيفك معطل؟ لا تقلق! فريقنا جاهز للوصول إليك خلال 30 دقيقة',
          phone: '+966501234567',
          urgencyLevel: 'high',
          showPulse: true,
          autoHide: false,
          hideAfter: 0
        }
      },
      {
        id: 'services_emergency',
        type: 'services',
        data: {
          title: 'خدمات الإصلاح الطارئة',
          layout: 'grid',
          showPrices: true,
          showIcons: true,
          services: [
            {
              id: 'emergency_repair',
              title: 'إصلاح فوري',
              description: 'إصلاح جميع أعطال المكيفات خلال ساعات',
              icon: 'wrench'
            },
            {
              id: 'original_parts',
              title: 'قطع غيار أصلية',
              description: 'نستخدم قطع غيار أصلية مع ضمان شامل',
              icon: 'settings'
            },
            {
              id: 'certified_technicians',
              title: 'فنيون معتمدون',
              description: 'فريق من الفنيين المعتمدين والمدربين',
              icon: 'user-check'
            }
          ]
        }
      }
    ],
    requiredBlocks: ['Hero', 'EmergencyNotice', 'Services'],
    optionalBlocks: ['Testimonials', 'CTA', 'FAQ']
  }),

  createPageTemplate({
    id: 'lp_summer_maintenance',
    name: 'Summer AC Maintenance Campaign',
    nameAr: 'حملة صيانة المكيفات الصيفية',
    description: 'Seasonal landing page for summer AC maintenance packages',
    descriptionAr: 'صفحة هبوط موسمية لباقات صيانة المكيفات الصيفية',
    category: 'seasonal-pages',
    tags: ['summer', 'maintenance', 'seasonal', 'packages'],
    targetAudience: ['residential', 'commercial'],
    complexity: 'moderate',
    style: 'modern',
    thumbnail: '/templates/thumbnails/summer-maintenance.jpg'
  }),

  createPageTemplate({
    id: 'lp_commercial_hvac',
    name: 'Commercial HVAC Solutions',
    nameAr: 'حلول التكييف التجارية',
    description: 'B2B landing page for commercial HVAC services',
    descriptionAr: 'صفحة هبوط للشركات لخدمات التكييف التجارية',
    category: 'commercial-pages',
    tags: ['commercial', 'b2b', 'hvac', 'enterprise'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'complex',
    style: 'corporate'
  }),

  createPageTemplate({
    id: 'lp_residential_installation',
    name: 'Home AC Installation',
    nameAr: 'تركيب مكيفات المنازل',
    description: 'Residential AC installation and replacement services',
    descriptionAr: 'خدمات تركيب واستبدال مكيفات المنازل',
    category: 'residential-pages',
    tags: ['residential', 'installation', 'home', 'replacement'],
    targetAudience: ['residential', 'installation'],
    complexity: 'simple',
    style: 'friendly'
  }),

  createPageTemplate({
    id: 'lp_energy_efficient',
    name: 'Energy Efficient AC Solutions',
    nameAr: 'حلول المكيفات الموفرة للطاقة',
    description: 'Eco-friendly and energy-saving AC solutions',
    descriptionAr: 'حلول المكيفات الصديقة للبيئة والموفرة للطاقة',
    category: 'landing-pages',
    tags: ['energy', 'eco-friendly', 'savings', 'efficient'],
    targetAudience: ['residential', 'commercial'],
    complexity: 'moderate',
    style: 'modern'
  }),

  createPageTemplate({
    id: 'lp_smart_ac_systems',
    name: 'Smart AC Control Systems',
    nameAr: 'أنظمة التحكم الذكية بالمكيفات',
    description: 'Modern smart AC automation and control solutions',
    descriptionAr: 'حلول التحكم والأتمتة الذكية للمكيفات الحديثة',
    category: 'landing-pages',
    tags: ['smart', 'automation', 'iot', 'control'],
    targetAudience: ['commercial', 'residential'],
    complexity: 'complex',
    style: 'technical'
  }),

  createPageTemplate({
    id: 'lp_winter_preparation',
    name: 'Winter AC Preparation',
    nameAr: 'تحضير المكيفات للشتاء',
    description: 'Winter maintenance and preparation services',
    descriptionAr: 'خدمات الصيانة والتحضير الشتوية',
    category: 'seasonal-pages',
    tags: ['winter', 'preparation', 'maintenance', 'seasonal'],
    targetAudience: ['residential', 'commercial'],
    complexity: 'simple',
    style: 'professional'
  }),

  createPageTemplate({
    id: 'lp_ac_cleaning_service',
    name: 'Professional AC Cleaning',
    nameAr: 'خدمة تنظيف المكيفات المحترفة',
    description: 'Deep cleaning and sanitization services for AC units',
    descriptionAr: 'خدمات التنظيف العميق والتعقيم لوحدات التكييف',
    category: 'service-pages',
    tags: ['cleaning', 'sanitization', 'health', 'maintenance'],
    targetAudience: ['residential', 'commercial'],
    complexity: 'moderate',
    style: 'modern'
  })
];

// Service Pages (10 templates)
export const SERVICE_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'sp_ac_installation',
    name: 'AC Installation Services',
    nameAr: 'خدمات تركيب المكيفات',
    description: 'Comprehensive AC installation service page',
    descriptionAr: 'صفحة خدمات تركيب المكيفات الشاملة',
    category: 'service-pages',
    tags: ['installation', 'service', 'comprehensive'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'sp_ac_repair',
    name: 'AC Repair Services',
    nameAr: 'خدمات إصلاح المكيفات',
    description: 'Professional AC repair and troubleshooting',
    descriptionAr: 'إصلاح المكيفات المحترف واستكشاف الأخطاء',
    category: 'service-pages',
    tags: ['repair', 'troubleshooting', 'professional'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'sp_ac_maintenance',
    name: 'AC Maintenance Services',
    nameAr: 'خدمات صيانة المكيفات',
    description: 'Regular maintenance and preventive care',
    descriptionAr: 'الصيانة الدورية والرعاية الوقائية',
    category: 'maintenance-pages',
    tags: ['maintenance', 'preventive', 'regular'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'sp_duct_cleaning',
    name: 'Air Duct Cleaning',
    nameAr: 'تنظيف مجاري الهواء',
    description: 'Professional air duct cleaning and sanitization',
    descriptionAr: 'تنظيف وتعقيم مجاري الهواء المحترف',
    category: 'service-pages',
    tags: ['duct', 'cleaning', 'air-quality'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'sp_hvac_design',
    name: 'HVAC System Design',
    nameAr: 'تصميم أنظمة التكييف',
    description: 'Custom HVAC system design and consultation',
    descriptionAr: 'تصميم أنظمة التكييف المخصصة والاستشارة',
    category: 'commercial-pages',
    tags: ['design', 'consultation', 'custom'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'complex'
  }),

  createPageTemplate({
    id: 'sp_emergency_repair',
    name: '24/7 Emergency Repair',
    nameAr: 'إصلاح الطوارئ 24/7',
    description: 'Round-the-clock emergency AC repair services',
    descriptionAr: 'خدمات إصلاح المكيفات الطارئة على مدار الساعة',
    category: 'emergency-pages',
    tags: ['emergency', '24/7', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'sp_ac_replacement',
    name: 'AC Unit Replacement',
    nameAr: 'استبدال وحدات التكييف',
    description: 'Complete AC unit replacement and upgrade services',
    descriptionAr: 'خدمات استبدال وترقية وحدات التكييف الكاملة',
    category: 'service-pages',
    tags: ['replacement', 'upgrade', 'new-units'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'sp_preventive_maintenance',
    name: 'Preventive Maintenance Plans',
    nameAr: 'خطط الصيانة الوقائية',
    description: 'Scheduled preventive maintenance programs',
    descriptionAr: 'برامج الصيانة الوقائية المجدولة',
    category: 'maintenance-pages',
    tags: ['preventive', 'scheduled', 'plans'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'sp_ac_inspection',
    name: 'AC System Inspection',
    nameAr: 'فحص أنظمة التكييف',
    description: 'Comprehensive AC system inspection and diagnostics',
    descriptionAr: 'فحص وتشخيص أنظمة التكييف الشامل',
    category: 'service-pages',
    tags: ['inspection', 'diagnostics', 'assessment'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'sp_energy_audit',
    name: 'Energy Efficiency Audit',
    nameAr: 'تدقيق كفاءة الطاقة',
    description: 'Energy efficiency assessment and optimization',
    descriptionAr: 'تقييم وتحسين كفاءة الطاقة',
    category: 'service-pages',
    tags: ['energy', 'audit', 'efficiency'],
    complexity: 'complex'
  })
];

// About Pages (5 templates)
export const ABOUT_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'ap_company_story',
    name: 'Our Company Story',
    nameAr: 'قصة شركتنا',
    description: 'Company history and mission page',
    descriptionAr: 'صفحة تاريخ الشركة ورسالتها',
    category: 'about-pages',
    tags: ['story', 'history', 'mission'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'ap_team_expertise',
    name: 'Our Expert Team',
    nameAr: 'فريقنا الخبير',
    description: 'Team members and their expertise',
    descriptionAr: 'أعضاء الفريق وخبراتهم',
    category: 'about-pages',
    tags: ['team', 'expertise', 'professionals'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'ap_certifications',
    name: 'Certifications & Awards',
    nameAr: 'الشهادات والجوائز',
    description: 'Company certifications and industry awards',
    descriptionAr: 'شهادات الشركة وجوائز الصناعة',
    category: 'about-pages',
    tags: ['certifications', 'awards', 'credentials'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'ap_service_areas',
    name: 'Service Areas',
    nameAr: 'مناطق الخدمة',
    description: 'Geographic coverage and service locations',
    descriptionAr: 'التغطية الجغرافية ومواقع الخدمة',
    category: 'about-pages',
    tags: ['locations', 'coverage', 'areas'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'ap_company_values',
    name: 'Our Values & Mission',
    nameAr: 'قيمنا ورسالتنا',
    description: 'Company values, mission, and vision',
    descriptionAr: 'قيم الشركة ورسالتها ورؤيتها',
    category: 'about-pages',
    tags: ['values', 'mission', 'vision'],
    complexity: 'simple'
  })
];

// Contact Pages (4 templates)
export const CONTACT_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'cp_main_contact',
    name: 'Main Contact Page',
    nameAr: 'صفحة التواصل الرئيسية',
    description: 'Primary contact page with all contact methods',
    descriptionAr: 'صفحة التواصل الأساسية مع جميع طرق التواصل',
    category: 'contact-pages',
    tags: ['contact', 'main', 'comprehensive'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'cp_emergency_contact',
    name: 'Emergency Contact',
    nameAr: 'تواصل الطوارئ',
    description: 'Emergency contact page for urgent services',
    descriptionAr: 'صفحة تواصل الطوارئ للخدمات العاجلة',
    category: 'emergency-pages',
    tags: ['emergency', 'urgent', 'contact'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'cp_quote_request',
    name: 'Request a Quote',
    nameAr: 'طلب عرض سعر',
    description: 'Quote request form and contact page',
    descriptionAr: 'نموذج طلب عرض السعر وصفحة التواصل',
    category: 'contact-pages',
    tags: ['quote', 'request', 'pricing'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'cp_service_booking',
    name: 'Book a Service',
    nameAr: 'حجز خدمة',
    description: 'Service booking and appointment scheduling',
    descriptionAr: 'حجز الخدمة وجدولة المواعيد',
    category: 'contact-pages',
    tags: ['booking', 'appointment', 'scheduling'],
    complexity: 'complex'
  })
];

// Portfolio Pages (4 templates)
export const PORTFOLIO_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'pp_project_showcase',
    name: 'Project Showcase',
    nameAr: 'عرض المشاريع',
    description: 'Portfolio of completed AC installation projects',
    descriptionAr: 'محفظة مشاريع تركيب المكيفات المكتملة',
    category: 'portfolio-pages',
    tags: ['projects', 'showcase', 'portfolio'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'pp_before_after',
    name: 'Before & After Gallery',
    nameAr: 'معرض قبل وبعد',
    description: 'Before and after photos of AC installations',
    descriptionAr: 'صور قبل وبعد تركيبات المكيفات',
    category: 'portfolio-pages',
    tags: ['before-after', 'gallery', 'transformation'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'pp_commercial_projects',
    name: 'Commercial Projects',
    nameAr: 'المشاريع التجارية',
    description: 'Commercial and industrial AC projects',
    descriptionAr: 'مشاريع التكييف التجارية والصناعية',
    category: 'commercial-pages',
    tags: ['commercial', 'industrial', 'projects'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'pp_residential_gallery',
    name: 'Residential Gallery',
    nameAr: 'معرض المشاريع السكنية',
    description: 'Residential AC installation gallery',
    descriptionAr: 'معرض تركيبات المكيفات السكنية',
    category: 'residential-pages',
    tags: ['residential', 'gallery', 'homes'],
    targetAudience: ['residential'],
    complexity: 'simple'
  })
];

// Blog Pages (3 templates)
export const BLOG_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'bp_main_blog',
    name: 'Main Blog Page',
    nameAr: 'صفحة المدونة الرئيسية',
    description: 'Main blog listing page with categories',
    descriptionAr: 'صفحة قائمة المدونة الرئيسية مع الفئات',
    category: 'blog-pages',
    tags: ['blog', 'articles', 'listing'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'bp_ac_tips',
    name: 'AC Tips & Guides',
    nameAr: 'نصائح وأدلة المكيفات',
    description: 'AC maintenance tips and how-to guides',
    descriptionAr: 'نصائح صيانة المكيفات والأدلة الإرشادية',
    category: 'blog-pages',
    tags: ['tips', 'guides', 'maintenance'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'bp_industry_news',
    name: 'Industry News',
    nameAr: 'أخبار الصناعة',
    description: 'HVAC industry news and updates',
    descriptionAr: 'أخبار وتحديثات صناعة التكييف',
    category: 'blog-pages',
    tags: ['news', 'industry', 'updates'],
    complexity: 'simple'
  })
];

// Pricing Pages (3 templates)
export const PRICING_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'pr_service_pricing',
    name: 'Service Pricing',
    nameAr: 'أسعار الخدمات',
    description: 'Comprehensive service pricing page',
    descriptionAr: 'صفحة أسعار الخدمات الشاملة',
    category: 'pricing-pages',
    tags: ['pricing', 'services', 'rates'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'pr_maintenance_packages',
    name: 'Maintenance Packages',
    nameAr: 'باقات الصيانة',
    description: 'Maintenance package pricing and comparison',
    descriptionAr: 'أسعار ومقارنة باقات الصيانة',
    category: 'maintenance-pages',
    tags: ['packages', 'maintenance', 'comparison'],
    complexity: 'moderate'
  }),

  createPageTemplate({
    id: 'pr_installation_costs',
    name: 'Installation Costs',
    nameAr: 'تكاليف التركيب',
    description: 'AC installation cost calculator and pricing',
    descriptionAr: 'حاسبة تكلفة تركيب المكيفات والأسعار',
    category: 'pricing-pages',
    tags: ['installation', 'costs', 'calculator'],
    complexity: 'complex'
  })
];

// Emergency Pages (3 templates)
export const EMERGENCY_PAGE_TEMPLATES: PageTemplate[] = [
  createPageTemplate({
    id: 'ep_24_7_service',
    name: '24/7 Emergency Service',
    nameAr: 'خدمة الطوارئ 24/7',
    description: 'Round-the-clock emergency service page',
    descriptionAr: 'صفحة خدمة الطوارئ على مدار الساعة',
    category: 'emergency-pages',
    tags: ['emergency', '24/7', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'ep_urgent_repair',
    name: 'Urgent AC Repair',
    nameAr: 'إصلاح المكيفات العاجل',
    description: 'Urgent AC repair and troubleshooting',
    descriptionAr: 'إصلاح واستكشاف أخطاء المكيفات العاجل',
    category: 'emergency-pages',
    tags: ['urgent', 'repair', 'troubleshooting'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createPageTemplate({
    id: 'ep_summer_emergency',
    name: 'Summer Emergency Response',
    nameAr: 'استجابة طوارئ الصيف',
    description: 'Summer heat emergency AC services',
    descriptionAr: 'خدمات طوارئ المكيفات في حر الصيف',
    category: 'seasonal-pages',
    tags: ['summer', 'emergency', 'heat'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  })
];

// Combine all page templates
export const PAGE_TEMPLATES: PageTemplate[] = [
  ...LANDING_PAGE_TEMPLATES,
  ...SERVICE_PAGE_TEMPLATES,
  ...ABOUT_PAGE_TEMPLATES,
  ...CONTACT_PAGE_TEMPLATES,
  ...PORTFOLIO_PAGE_TEMPLATES,
  ...BLOG_PAGE_TEMPLATES,
  ...PRICING_PAGE_TEMPLATES,
  ...EMERGENCY_PAGE_TEMPLATES
];

// Template utilities
export const getPageTemplatesByCategory = (category: string) => {
  return PAGE_TEMPLATES.filter(template => template.category === category);
};

export const getPageTemplatesByAudience = (audience: string) => {
  return PAGE_TEMPLATES.filter(template => 
    template.targetAudience.includes(audience as any)
  );
};

export const getPageTemplatesByComplexity = (complexity: string) => {
  return PAGE_TEMPLATES.filter(template => template.complexity === complexity);
};

export const getPageTemplatesByStyle = (style: string) => {
  return PAGE_TEMPLATES.filter(template => template.style === style);
};

export const getPopularPageTemplates = (limit: number = 10) => {
  return PAGE_TEMPLATES
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
};

export const getHighRatedPageTemplates = (minRating: number = 4.5, limit: number = 10) => {
  return PAGE_TEMPLATES
    .filter(template => template.rating >= minRating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};