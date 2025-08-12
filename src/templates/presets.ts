// Template Presets - Pre-configured AC Maintenance Templates
// Ready-to-use template combinations for specific business needs



// Preset interface
export interface TemplatePreset {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: 'business-starter' | 'emergency-focused' | 'commercial-pro' | 'residential-plus' | 'seasonal-campaign' | 'smart-tech' | 'complete-solution';
  targetAudience: ('residential' | 'commercial' | 'industrial' | 'emergency')[];
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedSetupTime: string; // in minutes
  thumbnail: string;
  previewImages: string[];
  tags: string[];
  pageTemplates: string[]; // Page template IDs
  sectionTemplates: string[]; // Section template IDs
  requiredPlugins?: string[];
  recommendedSettings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    spacing: {
      section: string;
      container: string;
    };
  };
  features: string[];
  benefits: string[];
  useCases: string[];
  version: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  usageCount: number;
  rating: number;
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Helper function to create preset
const createPreset = (overrides: Partial<TemplatePreset>): TemplatePreset => ({
  id: '',
  name: '',
  nameAr: '',
  description: '',
  descriptionAr: '',
  category: 'business-starter',
  targetAudience: ['residential'],
  complexity: 'simple',
  estimatedSetupTime: '30',
  thumbnail: '/presets/thumbnails/default.jpg',
  previewImages: [],
  tags: [],
  pageTemplates: [],
  sectionTemplates: [],
  recommendedSettings: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Cairo',
      body: 'Inter'
    },
    spacing: {
      section: '4rem',
      container: '1200px'
    }
  },
  features: [],
  benefits: [],
  useCases: [],
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'Nasim AC',
  usageCount: 0,
  rating: 5,
  reviews: [],
  ...overrides
});

// Business Starter Presets
export const BUSINESS_STARTER_PRESETS: TemplatePreset[] = [
  createPreset({
    id: 'ac_business_basic',
    name: 'AC Business Basic',
    nameAr: 'أساسيات أعمال التكييف',
    description: 'Complete basic website for AC maintenance business',
    descriptionAr: 'موقع ويب أساسي كامل لأعمال صيانة التكييف',
    category: 'business-starter',
    targetAudience: ['residential', 'commercial'],
    complexity: 'simple',
    estimatedSetupTime: '45',
    thumbnail: '/presets/thumbnails/ac-business-basic.jpg',
    tags: ['starter', 'basic', 'complete', 'ac-business'],
    pageTemplates: [
      'home_residential_services',
      'services_comprehensive',
      'about_company_story',
      'contact_form_location',
      'pricing_service_packages'
    ],
    sectionTemplates: [
      'hero_emergency_repair',
      'services_grid_3col',
      'testimonials_grid',
      'cta_free_quote',
      'footer_comprehensive'
    ],
    recommendedSettings: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Cairo',
        body: 'Inter'
      },
      spacing: {
        section: '4rem',
        container: '1200px'
      }
    },
    features: [
      'Responsive design',
      'Arabic RTL support',
      'Contact forms',
      'Service showcase',
      'Emergency contact'
    ],
    benefits: [
      'Quick setup',
      'Professional appearance',
      'Mobile-friendly',
      'SEO optimized',
      'Easy to customize'
    ],
    useCases: [
      'New AC business',
      'Small maintenance company',
      'Local service provider',
      'Residential focus'
    ]
  }),

  createPreset({
    id: 'residential_ac_pro',
    name: 'Residential AC Pro',
    nameAr: 'محترف التكييف السكني',
    description: 'Professional residential AC services website',
    descriptionAr: 'موقع خدمات التكييف السكني المحترف',
    category: 'residential-plus',
    targetAudience: ['residential'],
    complexity: 'moderate',
    estimatedSetupTime: '60',
    tags: ['residential', 'professional', 'family-focused'],
    pageTemplates: [
      'home_residential_services',
      'services_residential_focus',
      'about_family_business',
      'portfolio_before_after',
      'blog_ac_tips',
      'contact_appointment_booking'
    ],
    sectionTemplates: [
      'hero_residential_installation',
      'services_residential_focus',
      'testimonials_before_after',
      'pricing_maintenance_plans',
      'faq_maintenance_tips',
      'cta_book_service'
    ],
    features: [
      'Family-focused design',
      'Before/after galleries',
      'Maintenance tips blog',
      'Appointment booking',
      'Customer testimonials'
    ],
    useCases: [
      'Residential AC specialists',
      'Family-owned businesses',
      'Home service providers',
      'Local contractors'
    ]
  })
];

// Emergency Focused Presets
export const EMERGENCY_FOCUSED_PRESETS: TemplatePreset[] = [
  createPreset({
    id: 'emergency_ac_response',
    name: 'Emergency AC Response',
    nameAr: 'استجابة طوارئ التكييف',
    description: '24/7 emergency AC repair service website',
    descriptionAr: 'موقع خدمة إصلاح طوارئ التكييف 24/7',
    category: 'emergency-focused',
    targetAudience: ['emergency', 'residential', 'commercial'],
    complexity: 'moderate',
    estimatedSetupTime: '40',
    thumbnail: '/presets/thumbnails/emergency-response.jpg',
    tags: ['emergency', '24/7', 'urgent', 'fast-response'],
    pageTemplates: [
      'emergency_ac_repair',
      'services_emergency_focus',
      'contact_emergency_hotline',
      'about_emergency_team'
    ],
    sectionTemplates: [
      'hero_emergency_repair',
      'services_emergency_highlight',
      'contact_emergency_hotline',
      'testimonials_emergency_service',
      'pricing_emergency_rates',
      'cta_emergency_call'
    ],
    recommendedSettings: {
      colors: {
        primary: '#dc2626',
        secondary: '#991b1b',
        accent: '#fbbf24',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Cairo',
        body: 'Inter'
      },
      spacing: {
        section: '3rem',
        container: '1200px'
      }
    },
    features: [
      'Emergency hotline',
      'Urgent response design',
      'Fast contact methods',
      '24/7 availability',
      'Location tracking'
    ],
    benefits: [
      'Immediate customer action',
      'Clear emergency messaging',
      'Fast loading',
      'Mobile-first design',
      'Trust building'
    ],
    useCases: [
      'Emergency repair services',
      '24/7 AC companies',
      'Urgent response teams',
      'Crisis management'
    ]
  }),

  createPreset({
    id: 'summer_emergency_kit',
    name: 'Summer Emergency Kit',
    nameAr: 'طقم طوارئ الصيف',
    description: 'Summer season emergency AC services',
    descriptionAr: 'خدمات طوارئ التكييف لموسم الصيف',
    category: 'seasonal-campaign',
    targetAudience: ['emergency', 'residential'],
    complexity: 'simple',
    estimatedSetupTime: '35',
    tags: ['summer', 'seasonal', 'emergency', 'hot-weather'],
    features: [
      'Summer-themed design',
      'Heat wave alerts',
      'Seasonal pricing',
      'Quick response',
      'Cooling tips'
    ],
    useCases: [
      'Summer campaigns',
      'Seasonal promotions',
      'Heat wave response',
      'Peak season services'
    ]
  })
];

// Commercial Pro Presets
export const COMMERCIAL_PRO_PRESETS: TemplatePreset[] = [
  createPreset({
    id: 'commercial_hvac_enterprise',
    name: 'Commercial HVAC Enterprise',
    nameAr: 'مؤسسة التكييف التجاري',
    description: 'Enterprise-level commercial HVAC services',
    descriptionAr: 'خدمات التكييف التجاري على مستوى المؤسسات',
    category: 'commercial-pro',
    targetAudience: ['commercial', 'industrial'],
    complexity: 'complex',
    estimatedSetupTime: '90',
    thumbnail: '/presets/thumbnails/commercial-enterprise.jpg',
    tags: ['commercial', 'enterprise', 'b2b', 'industrial'],
    pageTemplates: [
      'commercial_hvac_solutions',
      'services_commercial_focus',
      'portfolio_commercial_projects',
      'about_enterprise_team',
      'contact_multi_location',
      'pricing_commercial_rates'
    ],
    sectionTemplates: [
      'hero_commercial_hvac',
      'services_commercial_focus',
      'portfolio_commercial_projects',
      'testimonials_commercial_clients',
      'pricing_commercial_rates',
      'contact_multi_location'
    ],
    recommendedSettings: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
        accent: '#059669',
        background: '#f8fafc',
        text: '#1e293b'
      },
      fonts: {
        heading: 'Cairo',
        body: 'Inter'
      },
      spacing: {
        section: '5rem',
        container: '1400px'
      }
    },
    features: [
      'B2B focused design',
      'Enterprise solutions',
      'Multi-location support',
      'Commercial portfolio',
      'Advanced pricing'
    ],
    benefits: [
      'Professional credibility',
      'Enterprise appeal',
      'Scalable solutions',
      'B2B conversion',
      'Industry expertise'
    ],
    useCases: [
      'Large HVAC companies',
      'Commercial contractors',
      'Industrial services',
      'Multi-location businesses'
    ]
  }),

  createPreset({
    id: 'industrial_cooling_systems',
    name: 'Industrial Cooling Systems',
    nameAr: 'أنظمة التبريد الصناعية',
    description: 'Specialized industrial cooling solutions',
    descriptionAr: 'حلول التبريد الصناعية المتخصصة',
    category: 'commercial-pro',
    targetAudience: ['industrial', 'commercial'],
    complexity: 'complex',
    estimatedSetupTime: '75',
    tags: ['industrial', 'cooling', 'specialized', 'technical'],
    features: [
      'Technical specifications',
      'Industrial portfolio',
      'Custom solutions',
      'Engineering focus',
      'Compliance standards'
    ],
    useCases: [
      'Industrial facilities',
      'Manufacturing plants',
      'Data centers',
      'Specialized cooling'
    ]
  })
];

// Smart Technology Presets
export const SMART_TECH_PRESETS: TemplatePreset[] = [
  createPreset({
    id: 'smart_ac_automation',
    name: 'Smart AC Automation',
    nameAr: 'أتمتة التكييف الذكي',
    description: 'Smart AC systems and IoT integration',
    descriptionAr: 'أنظمة التكييف الذكية وتكامل إنترنت الأشياء',
    category: 'smart-tech',
    targetAudience: ['residential', 'commercial'],
    complexity: 'complex',
    estimatedSetupTime: '80',
    thumbnail: '/presets/thumbnails/smart-automation.jpg',
    tags: ['smart', 'iot', 'automation', 'technology'],
    pageTemplates: [
      'smart_ac_solutions',
      'services_smart_technology',
      'portfolio_smart_installations',
      'about_tech_innovation'
    ],
    sectionTemplates: [
      'hero_smart_ac',
      'services_smart_technology',
      'features_smart_technology',
      'portfolio_video_showcase',
      'pricing_calculator'
    ],
    recommendedSettings: {
      colors: {
        primary: '#7c3aed',
        secondary: '#64748b',
        accent: '#06b6d4',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Cairo',
        body: 'Inter'
      },
      spacing: {
        section: '4rem',
        container: '1200px'
      }
    },
    features: [
      'IoT integration',
      'Smart controls',
      'Energy monitoring',
      'Remote management',
      'Automation systems'
    ],
    benefits: [
      'Technology leadership',
      'Energy efficiency',
      'Modern solutions',
      'Future-ready',
      'Cost savings'
    ],
    useCases: [
      'Smart home providers',
      'Tech-savvy customers',
      'Energy-conscious clients',
      'Modern buildings'
    ]
  }),

  createPreset({
    id: 'energy_efficient_solutions',
    name: 'Energy Efficient Solutions',
    nameAr: 'حلول الكفاءة في الطاقة',
    description: 'Energy-saving AC solutions and green technology',
    descriptionAr: 'حلول التكييف الموفرة للطاقة والتكنولوجيا الخضراء',
    category: 'smart-tech',
    targetAudience: ['residential', 'commercial'],
    complexity: 'moderate',
    estimatedSetupTime: '65',
    tags: ['energy', 'efficient', 'green', 'sustainable'],
    features: [
      'Energy calculations',
      'Green certifications',
      'Efficiency ratings',
      'Cost savings',
      'Environmental impact'
    ],
    useCases: [
      'Eco-friendly businesses',
      'Energy consultants',
      'Green building projects',
      'Cost-conscious customers'
    ]
  })
];

// Complete Solution Presets
export const COMPLETE_SOLUTION_PRESETS: TemplatePreset[] = [
  createPreset({
    id: 'full_service_ac_company',
    name: 'Full Service AC Company',
    nameAr: 'شركة التكييف الشاملة',
    description: 'Complete AC business website with all features',
    descriptionAr: 'موقع شركة التكييف الكامل مع جميع المميزات',
    category: 'complete-solution',
    targetAudience: ['residential', 'commercial', 'industrial', 'emergency'],
    complexity: 'complex',
    estimatedSetupTime: '120',
    thumbnail: '/presets/thumbnails/full-service.jpg',
    tags: ['complete', 'full-service', 'comprehensive', 'all-in-one'],
    pageTemplates: [
      'home_comprehensive',
      'services_comprehensive',
      'about_full_company',
      'portfolio_complete_showcase',
      'blog_comprehensive',
      'contact_multi_channel',
      'pricing_comprehensive',
      'emergency_ac_repair'
    ],
    sectionTemplates: [
      'hero_video_background',
      'services_filter_sort',
      'testimonials_video',
      'portfolio_filter_categories',
      'pricing_toggle_monthly_yearly',
      'blog_featured_articles',
      'contact_live_chat',
      'footer_comprehensive'
    ],
    features: [
      'Complete service range',
      'Multi-audience targeting',
      'Advanced functionality',
      'Professional design',
      'Full customization'
    ],
    benefits: [
      'One-stop solution',
      'Professional image',
      'All business needs',
      'Scalable platform',
      'Future-proof'
    ],
    useCases: [
      'Established AC companies',
      'Growing businesses',
      'Multi-service providers',
      'Regional companies'
    ]
  })
];

// All presets combined
export const ALL_TEMPLATE_PRESETS: TemplatePreset[] = [
  ...BUSINESS_STARTER_PRESETS,
  ...EMERGENCY_FOCUSED_PRESETS,
  ...COMMERCIAL_PRO_PRESETS,
  ...SMART_TECH_PRESETS,
  ...COMPLETE_SOLUTION_PRESETS
];

// Utility functions
export const getPresetsByCategory = (category: string): TemplatePreset[] => {
  return ALL_TEMPLATE_PRESETS.filter(preset => preset.category === category);
};

export const getPresetsByAudience = (audience: string): TemplatePreset[] => {
  return ALL_TEMPLATE_PRESETS.filter(preset => 
    preset.targetAudience.includes(audience as any)
  );
};

export const getPresetsByComplexity = (complexity: string): TemplatePreset[] => {
  return ALL_TEMPLATE_PRESETS.filter(preset => preset.complexity === complexity);
};

export const searchPresets = (query: string): TemplatePreset[] => {
  const lowercaseQuery = query.toLowerCase();
  return ALL_TEMPLATE_PRESETS.filter(preset => 
    preset.name.toLowerCase().includes(lowercaseQuery) ||
    preset.nameAr.includes(lowercaseQuery) ||
    preset.description.toLowerCase().includes(lowercaseQuery) ||
    preset.descriptionAr.includes(lowercaseQuery) ||
    preset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getPresetById = (id: string): TemplatePreset | undefined => {
  return ALL_TEMPLATE_PRESETS.find(preset => preset.id === id);
};

export const getPopularPresets = (limit: number = 5): TemplatePreset[] => {
  return ALL_TEMPLATE_PRESETS
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
};

export const getRecommendedPresets = (audience: string, complexity?: string): TemplatePreset[] => {
  let filtered = getPresetsByAudience(audience);
  
  if (complexity) {
    filtered = filtered.filter(preset => preset.complexity === complexity);
  }
  
  return filtered.sort((a, b) => b.rating - a.rating);
};

export const getQuickStartPresets = (): TemplatePreset[] => {
  return ALL_TEMPLATE_PRESETS
    .filter(preset => preset.complexity === 'simple')
    .sort((a, b) => parseInt(a.estimatedSetupTime) - parseInt(b.estimatedSetupTime))
    .slice(0, 3);
};