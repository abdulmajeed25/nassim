// Section Templates - 100+ Ready-to-use Section Templates
// Comprehensive collection of section templates for AC maintenance business

import { SectionTemplate } from './types';


// Helper function to create base section template
const createSectionTemplate = (overrides: Partial<SectionTemplate>): SectionTemplate => ({
  id: '',
  name: '',
  nameAr: '',
  description: '',
  descriptionAr: '',
  category: 'hero-sections',
  scope: 'section',
  status: 'active',
  tags: [],
  targetAudience: ['residential'],
  complexity: 'simple',
  style: 'modern',
  customizationLevel: 'basic',
  allowedCustomizations: ['colors', 'fonts', 'spacing', 'content'],
  thumbnail: '/templates/thumbnails/default-section.jpg',
  previewImages: [],
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  author: 'Nasim AC',
  usageCount: 0,
  rating: 5,
  reviews: [],
  blocks: [],
  settings: {
    layout: {
      type: 'container',
      alignment: 'center',
      direction: 'column',
      wrap: true
    },
    padding: {
      top: '4rem',
      right: '1rem',
      bottom: '4rem',
      left: '1rem'
    },
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    background: {
      type: 'color',
      value: '#ffffff'
    },
    animation: {
      type: 'fade',
      duration: 600,
      delay: 0,
      easing: 'ease-out',
      trigger: 'scroll'
    },
    responsive: {
      hideOn: [],
      showOn: ['mobile', 'tablet', 'desktop'],
      orderOn: {}
    }
  },
  layoutOptions: [
    {
      id: 'default',
      name: 'Default Layout',
      nameAr: 'التخطيط الافتراضي',
      description: 'Standard single column layout',
      thumbnail: '/layouts/single-column.jpg',
      columns: 1,
      gap: '2rem',
      responsive: {
        mobile: { columns: 1, gap: '1rem' },
        tablet: { columns: 1, gap: '1.5rem' },
        desktop: { columns: 1, gap: '2rem' }
      }
    }
  ],
  contentSlots: [],
  responsiveConfig: {
    breakpoints: [
      { name: 'mobile', minWidth: 0, maxWidth: 767 },
      { name: 'tablet', minWidth: 768, maxWidth: 1023 },
      { name: 'desktop', minWidth: 1024 }
    ],
    behavior: {
      stack: true,
      reorder: false,
      resize: true,
      hide: false
    }
  },
  ...overrides
});

// Hero Sections (15 templates)
export const HERO_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'hero_emergency_repair',
    name: 'Emergency Repair Hero',
    nameAr: 'بطل الإصلاح الطارئ',
    description: 'Urgent emergency repair hero section',
    descriptionAr: 'قسم بطل الإصلاح الطارئ العاجل',
    category: 'hero-sections',
    tags: ['emergency', 'repair', 'urgent', 'hero'],
    targetAudience: ['emergency', 'residential', 'commercial'],
    complexity: 'simple',
    style: 'professional',
    thumbnail: '/templates/thumbnails/hero-emergency.jpg',
    blocks: [
      {
        id: 'hero_emergency_block',
        type: 'hero',
        data: {
          title: 'مكيفك معطل؟ نحن هنا للمساعدة!',
          subtitle: 'خدمة إصلاح طارئة 24/7 - فنيون معتمدون - وصول خلال 30 دقيقة',
          alignment: 'center',
          backgroundImage: '/images/emergency-hero-bg.jpg',
          overlay: { enabled: true, color: '#000000', opacity: 0.4 },
          height: 'screen'
        }
      }
    ],
    contentSlots: [
      {
        id: 'title',
        name: 'Main Title',
        nameAr: 'العنوان الرئيسي',
        type: 'text',
        required: true,
        defaultContent: 'مكيفك معطل؟ نحن هنا للمساعدة!'
      },
      {
        id: 'subtitle',
        name: 'Subtitle',
        nameAr: 'العنوان الفرعي',
        type: 'text',
        required: false,
        defaultContent: 'خدمة إصلاح طارئة 24/7'
      },
      {
        id: 'background',
        name: 'Background Image',
        nameAr: 'صورة الخلفية',
        type: 'image',
        required: false
      }
    ]
  }),

  createSectionTemplate({
    id: 'hero_summer_maintenance',
    name: 'Summer Maintenance Hero',
    nameAr: 'بطل الصيانة الصيفية',
    description: 'Summer AC maintenance campaign hero',
    descriptionAr: 'بطل حملة صيانة المكيفات الصيفية',
    category: 'hero-sections',
    tags: ['summer', 'maintenance', 'seasonal', 'campaign'],
    complexity: 'moderate',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_commercial_hvac',
    name: 'Commercial HVAC Hero',
    nameAr: 'بطل التكييف التجاري',
    description: 'Professional commercial HVAC hero section',
    descriptionAr: 'قسم بطل التكييف التجاري المحترف',
    category: 'hero-sections',
    tags: ['commercial', 'hvac', 'professional', 'b2b'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'moderate',
    style: 'corporate'
  }),

  createSectionTemplate({
    id: 'hero_residential_installation',
    name: 'Residential Installation Hero',
    nameAr: 'بطل التركيب السكني',
    description: 'Home AC installation hero section',
    descriptionAr: 'قسم بطل تركيب المكيفات المنزلية',
    category: 'hero-sections',
    tags: ['residential', 'installation', 'home'],
    targetAudience: ['residential'],
    complexity: 'simple',
    style: 'friendly'
  }),

  createSectionTemplate({
    id: 'hero_energy_efficient',
    name: 'Energy Efficient Hero',
    nameAr: 'بطل الكفاءة في الطاقة',
    description: 'Energy-saving AC solutions hero',
    descriptionAr: 'بطل حلول المكيفات الموفرة للطاقة',
    category: 'hero-sections',
    tags: ['energy', 'efficient', 'savings', 'eco'],
    complexity: 'moderate',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_smart_ac',
    name: 'Smart AC Systems Hero',
    nameAr: 'بطل أنظمة التكييف الذكية',
    description: 'Smart AC automation hero section',
    descriptionAr: 'قسم بطل أتمتة التكييف الذكية',
    category: 'hero-sections',
    tags: ['smart', 'automation', 'technology', 'iot'],
    complexity: 'complex',
    style: 'technical'
  }),

  createSectionTemplate({
    id: 'hero_winter_prep',
    name: 'Winter Preparation Hero',
    nameAr: 'بطل التحضير الشتوي',
    description: 'Winter AC preparation hero section',
    descriptionAr: 'قسم بطل تحضير المكيفات للشتاء',
    category: 'hero-sections',
    tags: ['winter', 'preparation', 'seasonal'],
    complexity: 'simple',
    style: 'professional'
  }),

  createSectionTemplate({
    id: 'hero_cleaning_service',
    name: 'AC Cleaning Hero',
    nameAr: 'بطل تنظيف المكيفات',
    description: 'Professional AC cleaning hero',
    descriptionAr: 'بطل تنظيف المكيفات المحترف',
    category: 'hero-sections',
    tags: ['cleaning', 'sanitization', 'health'],
    complexity: 'simple',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_split_screen',
    name: 'Split Screen Hero',
    nameAr: 'بطل الشاشة المقسمة',
    description: 'Split screen layout hero section',
    descriptionAr: 'قسم بطل تخطيط الشاشة المقسمة',
    category: 'hero-sections',
    tags: ['split', 'layout', 'modern'],
    complexity: 'moderate',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_video_background',
    name: 'Video Background Hero',
    nameAr: 'بطل خلفية الفيديو',
    description: 'Hero section with video background',
    descriptionAr: 'قسم بطل مع خلفية فيديو',
    category: 'hero-sections',
    tags: ['video', 'background', 'dynamic'],
    complexity: 'complex',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_animated_text',
    name: 'Animated Text Hero',
    nameAr: 'بطل النص المتحرك',
    description: 'Hero with animated text effects',
    descriptionAr: 'بطل مع تأثيرات النص المتحرك',
    category: 'hero-sections',
    tags: ['animated', 'text', 'effects'],
    complexity: 'complex',
    style: 'creative'
  }),

  createSectionTemplate({
    id: 'hero_minimal_clean',
    name: 'Minimal Clean Hero',
    nameAr: 'بطل نظيف بسيط',
    description: 'Clean minimal hero design',
    descriptionAr: 'تصميم بطل نظيف وبسيط',
    category: 'hero-sections',
    tags: ['minimal', 'clean', 'simple'],
    complexity: 'simple',
    style: 'minimal'
  }),

  createSectionTemplate({
    id: 'hero_gradient_overlay',
    name: 'Gradient Overlay Hero',
    nameAr: 'بطل التدرج المتراكب',
    description: 'Hero with gradient overlay effects',
    descriptionAr: 'بطل مع تأثيرات التدرج المتراكب',
    category: 'hero-sections',
    tags: ['gradient', 'overlay', 'modern'],
    complexity: 'moderate',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_parallax_scroll',
    name: 'Parallax Scroll Hero',
    nameAr: 'بطل التمرير المتوازي',
    description: 'Hero with parallax scrolling effect',
    descriptionAr: 'بطل مع تأثير التمرير المتوازي',
    category: 'hero-sections',
    tags: ['parallax', 'scroll', 'interactive'],
    complexity: 'complex',
    style: 'modern'
  }),

  createSectionTemplate({
    id: 'hero_countdown_timer',
    name: 'Countdown Timer Hero',
    nameAr: 'بطل العد التنازلي',
    description: 'Hero with countdown timer for offers',
    descriptionAr: 'بطل مع مؤقت العد التنازلي للعروض',
    category: 'hero-sections',
    tags: ['countdown', 'timer', 'offers', 'urgency'],
    complexity: 'moderate',
    style: 'modern'
  })
];

// Service Sections (20 templates)
export const SERVICE_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'services_grid_3col',
    name: '3-Column Services Grid',
    nameAr: 'شبكة الخدمات 3 أعمدة',
    description: 'Three-column services grid layout',
    descriptionAr: 'تخطيط شبكة الخدمات بثلاثة أعمدة',
    category: 'service-sections',
    tags: ['grid', '3-column', 'services'],
    complexity: 'simple',
    layoutOptions: [
      {
        id: 'grid-3col',
        name: '3 Columns',
        nameAr: '3 أعمدة',
        description: 'Three equal columns',
        thumbnail: '/layouts/grid-3col.jpg',
        columns: 3,
        gap: '2rem',
        responsive: {
          mobile: { columns: 1, gap: '1rem' },
          tablet: { columns: 2, gap: '1.5rem' },
          desktop: { columns: 3, gap: '2rem' }
        }
      }
    ]
  }),

  createSectionTemplate({
    id: 'services_grid_4col',
    name: '4-Column Services Grid',
    nameAr: 'شبكة الخدمات 4 أعمدة',
    description: 'Four-column services grid layout',
    descriptionAr: 'تخطيط شبكة الخدمات بأربعة أعمدة',
    category: 'service-sections',
    tags: ['grid', '4-column', 'services'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'services_carousel',
    name: 'Services Carousel',
    nameAr: 'دوار الخدمات',
    description: 'Interactive services carousel',
    descriptionAr: 'دوار الخدمات التفاعلي',
    category: 'service-sections',
    tags: ['carousel', 'interactive', 'services'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_tabs',
    name: 'Services Tabs',
    nameAr: 'علامات تبويب الخدمات',
    description: 'Tabbed services presentation',
    descriptionAr: 'عرض الخدمات بعلامات التبويب',
    category: 'service-sections',
    tags: ['tabs', 'interactive', 'organized'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_accordion',
    name: 'Services Accordion',
    nameAr: 'أكورديون الخدمات',
    description: 'Expandable services accordion',
    descriptionAr: 'أكورديون الخدمات القابل للتوسيع',
    category: 'service-sections',
    tags: ['accordion', 'expandable', 'compact'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_timeline',
    name: 'Services Timeline',
    nameAr: 'جدول زمني للخدمات',
    description: 'Timeline-style services presentation',
    descriptionAr: 'عرض الخدمات بأسلوب الجدول الزمني',
    category: 'service-sections',
    tags: ['timeline', 'process', 'sequential'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_masonry',
    name: 'Services Masonry',
    nameAr: 'بناء الخدمات',
    description: 'Masonry-style services layout',
    descriptionAr: 'تخطيط الخدمات بأسلوب البناء',
    category: 'service-sections',
    tags: ['masonry', 'dynamic', 'varied'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'services_icon_boxes',
    name: 'Icon Box Services',
    nameAr: 'صناديق أيقونات الخدمات',
    description: 'Services with prominent icons',
    descriptionAr: 'الخدمات مع أيقونات بارزة',
    category: 'service-sections',
    tags: ['icons', 'boxes', 'visual'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'services_hover_effects',
    name: 'Hover Effects Services',
    nameAr: 'خدمات تأثيرات التمرير',
    description: 'Services with hover animations',
    descriptionAr: 'الخدمات مع رسوم متحركة للتمرير',
    category: 'service-sections',
    tags: ['hover', 'effects', 'interactive'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_pricing_cards',
    name: 'Service Pricing Cards',
    nameAr: 'بطاقات أسعار الخدمات',
    description: 'Services with integrated pricing',
    descriptionAr: 'الخدمات مع الأسعار المدمجة',
    category: 'service-sections',
    tags: ['pricing', 'cards', 'integrated'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_before_after',
    name: 'Before/After Services',
    nameAr: 'خدمات قبل/بعد',
    description: 'Services with before/after showcases',
    descriptionAr: 'الخدمات مع عروض قبل/بعد',
    category: 'service-sections',
    tags: ['before-after', 'showcase', 'results'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_video_preview',
    name: 'Video Preview Services',
    nameAr: 'خدمات معاينة الفيديو',
    description: 'Services with video previews',
    descriptionAr: 'الخدمات مع معاينات الفيديو',
    category: 'service-sections',
    tags: ['video', 'preview', 'multimedia'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'services_comparison_table',
    name: 'Service Comparison Table',
    nameAr: 'جدول مقارنة الخدمات',
    description: 'Detailed service comparison table',
    descriptionAr: 'جدول مقارنة الخدمات التفصيلي',
    category: 'service-sections',
    tags: ['comparison', 'table', 'detailed'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'services_filter_sort',
    name: 'Filterable Services',
    nameAr: 'الخدمات القابلة للتصفية',
    description: 'Services with filter and sort options',
    descriptionAr: 'الخدمات مع خيارات التصفية والترتيب',
    category: 'service-sections',
    tags: ['filter', 'sort', 'interactive'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'services_emergency_highlight',
    name: 'Emergency Services Highlight',
    nameAr: 'تسليط الضوء على خدمات الطوارئ',
    description: 'Emergency services with special highlighting',
    descriptionAr: 'خدمات الطوارئ مع تسليط ضوء خاص',
    category: 'emergency-sections',
    tags: ['emergency', 'highlight', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'services_seasonal_offers',
    name: 'Seasonal Service Offers',
    nameAr: 'عروض الخدمات الموسمية',
    description: 'Seasonal service promotions',
    descriptionAr: 'عروض الخدمات الموسمية الترويجية',
    category: 'service-sections',
    tags: ['seasonal', 'offers', 'promotions'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_commercial_focus',
    name: 'Commercial Services Focus',
    nameAr: 'التركيز على الخدمات التجارية',
    description: 'Commercial-focused service presentation',
    descriptionAr: 'عرض الخدمات المركز على التجارة',
    category: 'service-sections',
    tags: ['commercial', 'b2b', 'professional'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_residential_focus',
    name: 'Residential Services Focus',
    nameAr: 'التركيز على الخدمات السكنية',
    description: 'Residential-focused service presentation',
    descriptionAr: 'عرض الخدمات المركز على السكن',
    category: 'service-sections',
    tags: ['residential', 'home', 'family'],
    targetAudience: ['residential'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'services_maintenance_packages',
    name: 'Maintenance Package Services',
    nameAr: 'خدمات باقات الصيانة',
    description: 'Maintenance package presentations',
    descriptionAr: 'عروض باقات الصيانة',
    category: 'service-sections',
    tags: ['maintenance', 'packages', 'subscription'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'services_smart_technology',
    name: 'Smart Technology Services',
    nameAr: 'خدمات التكنولوجيا الذكية',
    description: 'Smart AC technology services',
    descriptionAr: 'خدمات تكنولوجيا التكييف الذكية',
    category: 'service-sections',
    tags: ['smart', 'technology', 'iot', 'automation'],
    complexity: 'complex'
  })
];

// Testimonial Sections (12 templates)
export const TESTIMONIAL_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'testimonials_carousel',
    name: 'Testimonials Carousel',
    nameAr: 'دوار الشهادات',
    description: 'Rotating testimonials carousel',
    descriptionAr: 'دوار الشهادات الدوار',
    category: 'testimonial-sections',
    tags: ['carousel', 'rotating', 'testimonials'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'testimonials_grid',
    name: 'Testimonials Grid',
    nameAr: 'شبكة الشهادات',
    description: 'Grid layout testimonials',
    descriptionAr: 'شهادات تخطيط الشبكة',
    category: 'testimonial-sections',
    tags: ['grid', 'layout', 'testimonials'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'testimonials_video',
    name: 'Video Testimonials',
    nameAr: 'شهادات الفيديو',
    description: 'Video testimonials section',
    descriptionAr: 'قسم شهادات الفيديو',
    category: 'testimonial-sections',
    tags: ['video', 'testimonials', 'multimedia'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'testimonials_before_after',
    name: 'Before/After Testimonials',
    nameAr: 'شهادات قبل/بعد',
    description: 'Testimonials with before/after photos',
    descriptionAr: 'شهادات مع صور قبل/بعد',
    category: 'testimonial-sections',
    tags: ['before-after', 'photos', 'results'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'testimonials_star_ratings',
    name: 'Star Rating Testimonials',
    nameAr: 'شهادات تقييم النجوم',
    description: 'Testimonials with star ratings',
    descriptionAr: 'شهادات مع تقييمات النجوم',
    category: 'testimonial-sections',
    tags: ['ratings', 'stars', 'reviews'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'testimonials_social_proof',
    name: 'Social Proof Testimonials',
    nameAr: 'شهادات الدليل الاجتماعي',
    description: 'Social media integrated testimonials',
    descriptionAr: 'شهادات متكاملة مع وسائل التواصل الاجتماعي',
    category: 'testimonial-sections',
    tags: ['social', 'proof', 'integration'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'testimonials_case_studies',
    name: 'Case Study Testimonials',
    nameAr: 'شهادات دراسات الحالة',
    description: 'Detailed case study testimonials',
    descriptionAr: 'شهادات دراسات الحالة التفصيلية',
    category: 'testimonial-sections',
    tags: ['case-studies', 'detailed', 'analysis'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'testimonials_quote_style',
    name: 'Quote Style Testimonials',
    nameAr: 'شهادات أسلوب الاقتباس',
    description: 'Large quote style testimonials',
    descriptionAr: 'شهادات أسلوب الاقتباس الكبير',
    category: 'testimonial-sections',
    tags: ['quotes', 'style', 'large'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'testimonials_timeline',
    name: 'Timeline Testimonials',
    nameAr: 'شهادات الجدول الزمني',
    description: 'Timeline-based testimonials',
    descriptionAr: 'شهادات قائمة على الجدول الزمني',
    category: 'testimonial-sections',
    tags: ['timeline', 'chronological', 'history'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'testimonials_industry_specific',
    name: 'Industry Specific Testimonials',
    nameAr: 'شهادات خاصة بالصناعة',
    description: 'AC industry specific testimonials',
    descriptionAr: 'شهادات خاصة بصناعة التكييف',
    category: 'testimonial-sections',
    tags: ['industry', 'specific', 'ac'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'testimonials_emergency_service',
    name: 'Emergency Service Testimonials',
    nameAr: 'شهادات خدمة الطوارئ',
    description: 'Emergency service testimonials',
    descriptionAr: 'شهادات خدمة الطوارئ',
    category: 'testimonial-sections',
    tags: ['emergency', 'service', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'testimonials_commercial_clients',
    name: 'Commercial Client Testimonials',
    nameAr: 'شهادات العملاء التجاريين',
    description: 'B2B commercial client testimonials',
    descriptionAr: 'شهادات العملاء التجاريين B2B',
    category: 'testimonial-sections',
    tags: ['commercial', 'b2b', 'clients'],
    targetAudience: ['commercial'],
    complexity: 'moderate'
  })
];

// Pricing Sections (10 templates)
export const PRICING_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'pricing_table_3col',
    name: '3-Column Pricing Table',
    nameAr: 'جدول الأسعار 3 أعمدة',
    description: 'Three-tier pricing table',
    descriptionAr: 'جدول الأسعار ثلاثي المستويات',
    category: 'pricing-sections',
    tags: ['pricing', 'table', '3-column'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'pricing_cards_comparison',
    name: 'Pricing Cards Comparison',
    nameAr: 'مقارنة بطاقات الأسعار',
    description: 'Comparison-focused pricing cards',
    descriptionAr: 'بطاقات الأسعار المركزة على المقارنة',
    category: 'pricing-sections',
    tags: ['pricing', 'cards', 'comparison'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'pricing_toggle_monthly_yearly',
    name: 'Monthly/Yearly Toggle Pricing',
    nameAr: 'تبديل الأسعار الشهرية/السنوية',
    description: 'Toggle between monthly and yearly pricing',
    descriptionAr: 'التبديل بين الأسعار الشهرية والسنوية',
    category: 'pricing-sections',
    tags: ['toggle', 'monthly', 'yearly'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'pricing_service_packages',
    name: 'Service Package Pricing',
    nameAr: 'أسعار باقات الخدمة',
    description: 'AC service package pricing',
    descriptionAr: 'أسعار باقات خدمة التكييف',
    category: 'pricing-sections',
    tags: ['packages', 'service', 'ac'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'pricing_maintenance_plans',
    name: 'Maintenance Plan Pricing',
    nameAr: 'أسعار خطط الصيانة',
    description: 'Maintenance plan pricing options',
    descriptionAr: 'خيارات أسعار خطط الصيانة',
    category: 'pricing-sections',
    tags: ['maintenance', 'plans', 'subscription'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'pricing_emergency_rates',
    name: 'Emergency Service Rates',
    nameAr: 'أسعار خدمة الطوارئ',
    description: 'Emergency service pricing',
    descriptionAr: 'أسعار خدمة الطوارئ',
    category: 'pricing-sections',
    tags: ['emergency', 'rates', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'pricing_commercial_rates',
    name: 'Commercial Pricing Rates',
    nameAr: 'أسعار التجارية',
    description: 'Commercial and industrial pricing',
    descriptionAr: 'الأسعار التجارية والصناعية',
    category: 'pricing-sections',
    tags: ['commercial', 'industrial', 'b2b'],
    targetAudience: ['commercial', 'industrial'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'pricing_calculator',
    name: 'Interactive Pricing Calculator',
    nameAr: 'حاسبة الأسعار التفاعلية',
    description: 'Dynamic pricing calculator',
    descriptionAr: 'حاسبة الأسعار الديناميكية',
    category: 'pricing-sections',
    tags: ['calculator', 'interactive', 'dynamic'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'pricing_seasonal_offers',
    name: 'Seasonal Pricing Offers',
    nameAr: 'عروض الأسعار الموسمية',
    description: 'Seasonal pricing promotions',
    descriptionAr: 'عروض الأسعار الموسمية الترويجية',
    category: 'pricing-sections',
    tags: ['seasonal', 'offers', 'promotions'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'pricing_value_proposition',
    name: 'Value Proposition Pricing',
    nameAr: 'أسعار عرض القيمة',
    description: 'Value-focused pricing presentation',
    descriptionAr: 'عرض الأسعار المركز على القيمة',
    category: 'pricing-sections',
    tags: ['value', 'proposition', 'benefits'],
    complexity: 'moderate'
  })
];

// Contact Sections (8 templates)
export const CONTACT_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'contact_form_map',
    name: 'Contact Form with Map',
    nameAr: 'نموذج التواصل مع الخريطة',
    description: 'Contact form alongside location map',
    descriptionAr: 'نموذج التواصل بجانب خريطة الموقع',
    category: 'contact-sections',
    tags: ['form', 'map', 'location'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'contact_emergency_hotline',
    name: 'Emergency Contact Hotline',
    nameAr: 'خط ساخن للتواصل الطارئ',
    description: '24/7 emergency contact section',
    descriptionAr: 'قسم التواصل الطارئ 24/7',
    category: 'emergency-sections',
    tags: ['emergency', 'hotline', '24/7'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'contact_multi_location',
    name: 'Multi-Location Contact',
    nameAr: 'تواصل متعدد المواقع',
    description: 'Multiple office locations contact',
    descriptionAr: 'تواصل مواقع المكاتب المتعددة',
    category: 'contact-sections',
    tags: ['multi-location', 'offices', 'branches'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'contact_service_request',
    name: 'Service Request Form',
    nameAr: 'نموذج طلب الخدمة',
    description: 'Detailed service request form',
    descriptionAr: 'نموذج طلب الخدمة التفصيلي',
    category: 'contact-sections',
    tags: ['service', 'request', 'detailed'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'contact_quote_calculator',
    name: 'Quote Calculator Contact',
    nameAr: 'تواصل حاسبة العرض',
    description: 'Contact with integrated quote calculator',
    descriptionAr: 'التواصل مع حاسبة العرض المدمجة',
    category: 'contact-sections',
    tags: ['quote', 'calculator', 'integrated'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'contact_social_media',
    name: 'Social Media Contact',
    nameAr: 'تواصل وسائل التواصل الاجتماعي',
    description: 'Social media integrated contact',
    descriptionAr: 'التواصل المدمج مع وسائل التواصل الاجتماعي',
    category: 'contact-sections',
    tags: ['social', 'media', 'integrated'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'contact_appointment_booking',
    name: 'Appointment Booking Contact',
    nameAr: 'تواصل حجز المواعيد',
    description: 'Contact with appointment booking',
    descriptionAr: 'التواصل مع حجز المواعيد',
    category: 'contact-sections',
    tags: ['appointment', 'booking', 'scheduling'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'contact_live_chat',
    name: 'Live Chat Contact',
    nameAr: 'تواصل الدردشة المباشرة',
    description: 'Contact with live chat integration',
    descriptionAr: 'التواصل مع تكامل الدردشة المباشرة',
    category: 'contact-sections',
    tags: ['live-chat', 'real-time', 'support'],
    complexity: 'complex'
  })
];

// About Sections (8 templates)
export const ABOUT_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'about_company_story',
    name: 'Company Story Section',
    nameAr: 'قسم قصة الشركة',
    description: 'Company history and story',
    descriptionAr: 'تاريخ وقصة الشركة',
    category: 'about-sections',
    tags: ['story', 'history', 'company'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'about_team_grid',
    name: 'Team Grid Section',
    nameAr: 'قسم شبكة الفريق',
    description: 'Team members grid layout',
    descriptionAr: 'تخطيط شبكة أعضاء الفريق',
    category: 'about-sections',
    tags: ['team', 'grid', 'members'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'about_mission_vision',
    name: 'Mission & Vision Section',
    nameAr: 'قسم الرسالة والرؤية',
    description: 'Company mission and vision',
    descriptionAr: 'رسالة ورؤية الشركة',
    category: 'about-sections',
    tags: ['mission', 'vision', 'values'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'about_certifications',
    name: 'Certifications Section',
    nameAr: 'قسم الشهادات',
    description: 'Company certifications and awards',
    descriptionAr: 'شهادات وجوائز الشركة',
    category: 'about-sections',
    tags: ['certifications', 'awards', 'credentials'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'about_timeline',
    name: 'Company Timeline',
    nameAr: 'الجدول الزمني للشركة',
    description: 'Company milestones timeline',
    descriptionAr: 'الجدول الزمني لمعالم الشركة',
    category: 'about-sections',
    tags: ['timeline', 'milestones', 'history'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'about_statistics',
    name: 'Company Statistics',
    nameAr: 'إحصائيات الشركة',
    description: 'Key company statistics and numbers',
    descriptionAr: 'إحصائيات وأرقام الشركة الرئيسية',
    category: 'stats-sections',
    tags: ['statistics', 'numbers', 'achievements'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'about_service_areas',
    name: 'Service Areas Section',
    nameAr: 'قسم مناطق الخدمة',
    description: 'Geographic service coverage',
    descriptionAr: 'التغطية الجغرافية للخدمة',
    category: 'about-sections',
    tags: ['service-areas', 'coverage', 'locations'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'about_why_choose_us',
    name: 'Why Choose Us Section',
    nameAr: 'قسم لماذا تختارنا',
    description: 'Reasons to choose our company',
    descriptionAr: 'أسباب اختيار شركتنا',
    category: 'about-sections',
    tags: ['why-choose', 'benefits', 'advantages'],
    complexity: 'moderate'
  })
];

// Portfolio Sections (6 templates)
export const PORTFOLIO_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'portfolio_project_grid',
    name: 'Project Grid Portfolio',
    nameAr: 'محفظة شبكة المشاريع',
    description: 'Grid layout project portfolio',
    descriptionAr: 'محفظة المشاريع بتخطيط الشبكة',
    category: 'portfolio-sections',
    tags: ['portfolio', 'grid', 'projects'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'portfolio_before_after',
    name: 'Before/After Portfolio',
    nameAr: 'محفظة قبل/بعد',
    description: 'Before and after project showcase',
    descriptionAr: 'عرض المشاريع قبل وبعد',
    category: 'portfolio-sections',
    tags: ['before-after', 'showcase', 'transformation'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'portfolio_case_studies',
    name: 'Case Studies Portfolio',
    nameAr: 'محفظة دراسات الحالة',
    description: 'Detailed case studies portfolio',
    descriptionAr: 'محفظة دراسات الحالة التفصيلية',
    category: 'portfolio-sections',
    tags: ['case-studies', 'detailed', 'analysis'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'portfolio_video_showcase',
    name: 'Video Portfolio Showcase',
    nameAr: 'عرض محفظة الفيديو',
    description: 'Video-based portfolio showcase',
    descriptionAr: 'عرض المحفظة القائم على الفيديو',
    category: 'portfolio-sections',
    tags: ['video', 'showcase', 'multimedia'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'portfolio_filter_categories',
    name: 'Filterable Portfolio',
    nameAr: 'المحفظة القابلة للتصفية',
    description: 'Portfolio with category filters',
    descriptionAr: 'المحفظة مع مرشحات الفئات',
    category: 'portfolio-sections',
    tags: ['filterable', 'categories', 'interactive'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'portfolio_commercial_projects',
    name: 'Commercial Projects Portfolio',
    nameAr: 'محفظة المشاريع التجارية',
    description: 'Commercial project portfolio',
    descriptionAr: 'محفظة المشاريع التجارية',
    category: 'portfolio-sections',
    tags: ['commercial', 'projects', 'b2b'],
    targetAudience: ['commercial'],
    complexity: 'moderate'
  })
];

// Blog Sections (5 templates)
export const BLOG_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'blog_latest_posts',
    name: 'Latest Blog Posts',
    nameAr: 'أحدث مقالات المدونة',
    description: 'Latest blog posts showcase',
    descriptionAr: 'عرض أحدث مقالات المدونة',
    category: 'blog-sections',
    tags: ['blog', 'latest', 'posts'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'blog_featured_articles',
    name: 'Featured Articles',
    nameAr: 'المقالات المميزة',
    description: 'Featured blog articles section',
    descriptionAr: 'قسم مقالات المدونة المميزة',
    category: 'blog-sections',
    tags: ['featured', 'articles', 'highlight'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'blog_categories_grid',
    name: 'Blog Categories Grid',
    nameAr: 'شبكة فئات المدونة',
    description: 'Blog categories in grid layout',
    descriptionAr: 'فئات المدونة في تخطيط الشبكة',
    category: 'blog-sections',
    tags: ['categories', 'grid', 'organization'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'blog_ac_tips',
    name: 'AC Tips Blog Section',
    nameAr: 'قسم مدونة نصائح التكييف',
    description: 'AC maintenance tips blog section',
    descriptionAr: 'قسم مدونة نصائح صيانة التكييف',
    category: 'blog-sections',
    tags: ['ac-tips', 'maintenance', 'advice'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'blog_newsletter_signup',
    name: 'Blog Newsletter Signup',
    nameAr: 'اشتراك نشرة المدونة',
    description: 'Blog with newsletter signup',
    descriptionAr: 'المدونة مع اشتراك النشرة الإخبارية',
    category: 'blog-sections',
    tags: ['newsletter', 'signup', 'subscription'],
    complexity: 'moderate'
  })
];

// CTA Sections (8 templates)
export const CTA_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'cta_emergency_call',
    name: 'Emergency Call CTA',
    nameAr: 'دعوة للعمل للاتصال الطارئ',
    description: 'Emergency call-to-action section',
    descriptionAr: 'قسم دعوة للعمل للاتصال الطارئ',
    category: 'cta-sections',
    tags: ['emergency', 'call', 'urgent'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'cta_free_quote',
    name: 'Free Quote CTA',
    nameAr: 'دعوة للعمل للعرض المجاني',
    description: 'Free quote call-to-action',
    descriptionAr: 'دعوة للعمل للعرض المجاني',
    category: 'cta-sections',
    tags: ['free', 'quote', 'estimate'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'cta_book_service',
    name: 'Book Service CTA',
    nameAr: 'دعوة للعمل لحجز الخدمة',
    description: 'Service booking call-to-action',
    descriptionAr: 'دعوة للعمل لحجز الخدمة',
    category: 'cta-sections',
    tags: ['booking', 'service', 'appointment'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'cta_maintenance_plan',
    name: 'Maintenance Plan CTA',
    nameAr: 'دعوة للعمل لخطة الصيانة',
    description: 'Maintenance plan subscription CTA',
    descriptionAr: 'دعوة للعمل لاشتراك خطة الصيانة',
    category: 'cta-sections',
    tags: ['maintenance', 'plan', 'subscription'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'cta_seasonal_offer',
    name: 'Seasonal Offer CTA',
    nameAr: 'دعوة للعمل للعرض الموسمي',
    description: 'Seasonal promotion call-to-action',
    descriptionAr: 'دعوة للعمل للترويج الموسمي',
    category: 'cta-sections',
    tags: ['seasonal', 'offer', 'promotion'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'cta_whatsapp_contact',
    name: 'WhatsApp Contact CTA',
    nameAr: 'دعوة للعمل للتواصل عبر واتساب',
    description: 'WhatsApp contact call-to-action',
    descriptionAr: 'دعوة للعمل للتواصل عبر واتساب',
    category: 'cta-sections',
    tags: ['whatsapp', 'contact', 'messaging'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'cta_newsletter_signup',
    name: 'Newsletter Signup CTA',
    nameAr: 'دعوة للعمل لاشتراك النشرة',
    description: 'Newsletter subscription call-to-action',
    descriptionAr: 'دعوة للعمل لاشتراك النشرة الإخبارية',
    category: 'cta-sections',
    tags: ['newsletter', 'signup', 'subscription'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'cta_download_guide',
    name: 'Download Guide CTA',
    nameAr: 'دعوة للعمل لتحميل الدليل',
    description: 'Guide download call-to-action',
    descriptionAr: 'دعوة للعمل لتحميل الدليل',
    category: 'cta-sections',
    tags: ['download', 'guide', 'resource'],
    complexity: 'moderate'
  })
];

// Feature Sections (6 templates)
export const FEATURE_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'features_icon_grid',
    name: 'Icon Features Grid',
    nameAr: 'شبكة المميزات بالأيقونات',
    description: 'Features grid with icons',
    descriptionAr: 'شبكة المميزات مع الأيقونات',
    category: 'feature-sections',
    tags: ['features', 'icons', 'grid'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'features_alternating_layout',
    name: 'Alternating Features Layout',
    nameAr: 'تخطيط المميزات المتناوب',
    description: 'Alternating left-right features layout',
    descriptionAr: 'تخطيط المميزات المتناوب يسار-يمين',
    category: 'feature-sections',
    tags: ['alternating', 'layout', 'features'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'features_tabbed_interface',
    name: 'Tabbed Features Interface',
    nameAr: 'واجهة المميزات بعلامات التبويب',
    description: 'Features with tabbed interface',
    descriptionAr: 'المميزات مع واجهة علامات التبويب',
    category: 'feature-sections',
    tags: ['tabbed', 'interface', 'interactive'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'features_comparison_table',
    name: 'Features Comparison Table',
    nameAr: 'جدول مقارنة المميزات',
    description: 'Feature comparison table',
    descriptionAr: 'جدول مقارنة المميزات',
    category: 'feature-sections',
    tags: ['comparison', 'table', 'features'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'features_smart_technology',
    name: 'Smart Technology Features',
    nameAr: 'مميزات التكنولوجيا الذكية',
    description: 'Smart AC technology features',
    descriptionAr: 'مميزات تكنولوجيا التكييف الذكية',
    category: 'feature-sections',
    tags: ['smart', 'technology', 'advanced'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'features_energy_efficiency',
    name: 'Energy Efficiency Features',
    nameAr: 'مميزات الكفاءة في الطاقة',
    description: 'Energy-saving AC features',
    descriptionAr: 'مميزات التكييف الموفرة للطاقة',
    category: 'feature-sections',
    tags: ['energy', 'efficiency', 'savings'],
    complexity: 'moderate'
  })
];

// FAQ Sections (5 templates)
export const FAQ_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'faq_accordion',
    name: 'FAQ Accordion',
    nameAr: 'أكورديون الأسئلة الشائعة',
    description: 'Expandable FAQ accordion',
    descriptionAr: 'أكورديون الأسئلة الشائعة القابل للتوسيع',
    category: 'faq-sections',
    tags: ['faq', 'accordion', 'expandable'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'faq_search_filter',
    name: 'Searchable FAQ',
    nameAr: 'الأسئلة الشائعة القابلة للبحث',
    description: 'FAQ with search and filter',
    descriptionAr: 'الأسئلة الشائعة مع البحث والتصفية',
    category: 'faq-sections',
    tags: ['faq', 'search', 'filter'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'faq_categories',
    name: 'Categorized FAQ',
    nameAr: 'الأسئلة الشائعة المصنفة',
    description: 'FAQ organized by categories',
    descriptionAr: 'الأسئلة الشائعة منظمة حسب الفئات',
    category: 'faq-sections',
    tags: ['faq', 'categories', 'organized'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'faq_emergency_ac',
    name: 'Emergency AC FAQ',
    nameAr: 'أسئلة شائعة عن طوارئ التكييف',
    description: 'Emergency AC service FAQ',
    descriptionAr: 'أسئلة شائعة عن خدمة طوارئ التكييف',
    category: 'faq-sections',
    tags: ['faq', 'emergency', 'ac'],
    targetAudience: ['emergency'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'faq_maintenance_tips',
    name: 'Maintenance Tips FAQ',
    nameAr: 'أسئلة شائعة عن نصائح الصيانة',
    description: 'AC maintenance tips FAQ',
    descriptionAr: 'أسئلة شائعة عن نصائح صيانة التكييف',
    category: 'faq-sections',
    tags: ['faq', 'maintenance', 'tips'],
    complexity: 'simple'
  })
];

// Stats Sections (4 templates)
export const STATS_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'stats_counter_grid',
    name: 'Stats Counter Grid',
    nameAr: 'شبكة عدادات الإحصائيات',
    description: 'Animated stats counter grid',
    descriptionAr: 'شبكة عدادات الإحصائيات المتحركة',
    category: 'stats-sections',
    tags: ['stats', 'counter', 'animated'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'stats_circular_progress',
    name: 'Circular Progress Stats',
    nameAr: 'إحصائيات التقدم الدائري',
    description: 'Stats with circular progress bars',
    descriptionAr: 'الإحصائيات مع أشرطة التقدم الدائرية',
    category: 'stats-sections',
    tags: ['stats', 'circular', 'progress'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'stats_company_achievements',
    name: 'Company Achievement Stats',
    nameAr: 'إحصائيات إنجازات الشركة',
    description: 'Company milestone statistics',
    descriptionAr: 'إحصائيات معالم الشركة',
    category: 'stats-sections',
    tags: ['achievements', 'milestones', 'company'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'stats_service_metrics',
    name: 'Service Metrics Stats',
    nameAr: 'إحصائيات مقاييس الخدمة',
    description: 'Service performance metrics',
    descriptionAr: 'مقاييس أداء الخدمة',
    category: 'stats-sections',
    tags: ['service', 'metrics', 'performance'],
    complexity: 'moderate'
  })
];

// Footer Sections (4 templates)
export const FOOTER_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'footer_comprehensive',
    name: 'Comprehensive Footer',
    nameAr: 'تذييل شامل',
    description: 'Full-featured footer section',
    descriptionAr: 'قسم تذييل كامل المميزات',
    category: 'footer-sections',
    tags: ['footer', 'comprehensive', 'full'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'footer_minimal',
    name: 'Minimal Footer',
    nameAr: 'تذييل بسيط',
    description: 'Clean minimal footer',
    descriptionAr: 'تذييل نظيف وبسيط',
    category: 'footer-sections',
    tags: ['footer', 'minimal', 'clean'],
    complexity: 'simple'
  }),

  createSectionTemplate({
    id: 'footer_emergency_contact',
    name: 'Emergency Contact Footer',
    nameAr: 'تذييل التواصل الطارئ',
    description: 'Footer with emergency contact info',
    descriptionAr: 'تذييل مع معلومات التواصل الطارئ',
    category: 'footer-sections',
    tags: ['footer', 'emergency', 'contact'],
    targetAudience: ['emergency'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'footer_social_media',
    name: 'Social Media Footer',
    nameAr: 'تذييل وسائل التواصل الاجتماعي',
    description: 'Footer with social media integration',
    descriptionAr: 'تذييل مع تكامل وسائل التواصل الاجتماعي',
    category: 'footer-sections',
    tags: ['footer', 'social', 'media'],
    complexity: 'moderate'
  })
];

// Navigation Sections (3 templates)
export const NAVIGATION_SECTION_TEMPLATES: SectionTemplate[] = [
  createSectionTemplate({
    id: 'nav_mega_menu',
    name: 'Mega Menu Navigation',
    nameAr: 'تنقل القائمة الضخمة',
    description: 'Advanced mega menu navigation',
    descriptionAr: 'تنقل القائمة الضخمة المتقدم',
    category: 'feature-sections',
    tags: ['navigation', 'mega-menu', 'advanced'],
    complexity: 'complex'
  }),

  createSectionTemplate({
    id: 'nav_sticky_header',
    name: 'Sticky Header Navigation',
    nameAr: 'تنقل الرأس اللاصق',
    description: 'Sticky navigation header',
    descriptionAr: 'رأس التنقل اللاصق',
    category: 'feature-sections',
    tags: ['navigation', 'sticky', 'header'],
    complexity: 'moderate'
  }),

  createSectionTemplate({
    id: 'nav_mobile_friendly',
    name: 'Mobile-Friendly Navigation',
    nameAr: 'تنقل متوافق مع الجوال',
    description: 'Mobile-optimized navigation',
    descriptionAr: 'تنقل محسن للجوال',
    category: 'feature-sections',
    tags: ['navigation', 'mobile', 'responsive'],
    complexity: 'moderate'
  })
];

// All section templates combined
export const ALL_SECTION_TEMPLATES: SectionTemplate[] = [
  ...HERO_SECTION_TEMPLATES,
  ...SERVICE_SECTION_TEMPLATES,
  ...TESTIMONIAL_SECTION_TEMPLATES,
  ...PRICING_SECTION_TEMPLATES,
  ...CONTACT_SECTION_TEMPLATES,
  ...ABOUT_SECTION_TEMPLATES,
  ...PORTFOLIO_SECTION_TEMPLATES,
  ...BLOG_SECTION_TEMPLATES,
  ...CTA_SECTION_TEMPLATES,
  ...FEATURE_SECTION_TEMPLATES,
  ...FAQ_SECTION_TEMPLATES,
  ...STATS_SECTION_TEMPLATES,
  ...FOOTER_SECTION_TEMPLATES,
  ...NAVIGATION_SECTION_TEMPLATES
];

// Utility functions
export const getSectionTemplatesByCategory = (category: string): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES.filter(template => template.category === category);
};

export const getSectionTemplatesByTags = (tags: string[]): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES.filter(template => 
    tags.some(tag => template.tags.includes(tag))
  );
};

export const getSectionTemplatesByAudience = (audience: string): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES.filter(template => 
    template.targetAudience.includes(audience as any)
  );
};

export const getSectionTemplatesByComplexity = (complexity: string): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES.filter(template => template.complexity === complexity);
};

export const searchSectionTemplates = (query: string): SectionTemplate[] => {
  const lowercaseQuery = query.toLowerCase();
  return ALL_SECTION_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.nameAr.includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.descriptionAr.includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getSectionTemplateById = (id: string): SectionTemplate | undefined => {
  return ALL_SECTION_TEMPLATES.find(template => template.id === id);
};

export const getPopularSectionTemplates = (limit: number = 10): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, limit);
};

export const getRecentSectionTemplates = (limit: number = 10): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

export const getHighRatedSectionTemplates = (minRating: number = 4, limit: number = 10): SectionTemplate[] => {
  return ALL_SECTION_TEMPLATES
    .filter(template => template.rating >= minRating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};