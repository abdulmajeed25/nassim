import { z } from 'zod';

// Base schema for all blocks
export const BaseBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.record(z.string(), z.any()),
  settings: z.object({
    spacing: z.string().optional(),
    background: z.object({
      type: z.enum(['solid', 'gradient', 'pattern', 'image']),
      color: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      pattern: z.string().optional(),
      image: z.string().optional(),
      opacity: z.number().min(0).max(1).optional(),
    }).optional(),
    borders: z.object({
      radius: z.string().optional(),
      width: z.string().optional(),
      color: z.string().optional(),
      style: z.enum(['solid', 'dashed', 'dotted']).optional(),
    }).optional(),
    shadows: z.string().optional(),
    customCSS: z.string().optional(),
    visibility: z.object({
      desktop: z.boolean().default(true),
      tablet: z.boolean().default(true),
      mobile: z.boolean().default(true),
    }).optional(),
    animation: z.object({
      type: z.enum(['none', 'fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']).default('none'),
      duration: z.number().min(0).max(5000).default(500),
      delay: z.number().min(0).max(5000).default(0),
    }).optional(),
  }).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Hero Block Schema
export const HeroBlockSchema = BaseBlockSchema.extend({
  type: z.literal('hero'),
  data: z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    backgroundImage: z.string().optional(),
    backgroundVideo: z.string().optional(),
    overlay: z.object({
      enabled: z.boolean().default(false),
      color: z.string().default('black'),
      opacity: z.number().min(0).max(1).default(0.5),
    }).optional(),
    buttons: z.array(z.object({
      text: z.string(),
      url: z.string(),
      style: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      icon: z.string().optional(),
      target: z.enum(['_self', '_blank']).default('_self'),
    })).optional(),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    height: z.enum(['auto', 'screen', 'large', 'medium', 'small']).default('large'),
  }),
});

// Services Block Schema
export const ServicesBlockSchema = BaseBlockSchema.extend({
  type: z.literal('services'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    services: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
      price: z.string().optional(),
      features: z.array(z.string()).optional(),
      url: z.string().optional(),
      badge: z.string().optional(),
    })),
    layout: z.enum(['grid', 'list', 'cards', 'minimal']).default('grid'),
    columns: z.object({
      desktop: z.number().min(1).max(6).default(3),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1),
    }).optional(),
    showPrices: z.boolean().default(true),
    showIcons: z.boolean().default(true),
  }),
});

// CTA Block Schema
export const CTABlockSchema = BaseBlockSchema.extend({
  type: z.literal('cta'),
  data: z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    description: z.string().optional(),
    buttons: z.array(z.object({
      text: z.string(),
      url: z.string(),
      style: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      icon: z.string().optional(),
      target: z.enum(['_self', '_blank']).default('_self'),
    })),
    layout: z.enum(['horizontal', 'vertical', 'split']).default('horizontal'),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    urgency: z.object({
      enabled: z.boolean().default(false),
      text: z.string().optional(),
      countdown: z.string().optional(), // ISO date string
    }).optional(),
  }),
});

// Testimonial Block Schema
export const TestimonialBlockSchema = BaseBlockSchema.extend({
  type: z.literal('testimonial'),
  data: z.object({
    title: z.string().optional(),
    testimonials: z.array(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        name: z.string(),
        title: z.string().optional(),
        company: z.string().optional(),
        avatar: z.string().optional(),
        location: z.string().optional(),
      }),
      rating: z.number().min(1).max(5).optional(),
      date: z.string().optional(),
      verified: z.boolean().default(false),
    })),
    layout: z.enum(['grid', 'carousel', 'masonry', 'single']).default('grid'),
    showRatings: z.boolean().default(true),
    showDates: z.boolean().default(false),
    autoplay: z.boolean().default(false),
    interval: z.number().min(1000).max(10000).default(5000),
  }),
});

// FAQ Block Schema
export const FAQBlockSchema = BaseBlockSchema.extend({
  type: z.literal('faq'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    faqs: z.array(z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      category: z.string().optional(),
    })),
    layout: z.enum(['accordion', 'tabs', 'grid']).default('accordion'),
    allowMultiple: z.boolean().default(false),
    searchable: z.boolean().default(false),
    categories: z.array(z.string()).optional(),
  }),
});

// Pricing Block Schema
export const PricingBlockSchema = BaseBlockSchema.extend({
  type: z.literal('pricing'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    plans: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      price: z.object({
        amount: z.number(),
        currency: z.string().default('ر.س'),
        period: z.string().default('شهرياً'),
        originalPrice: z.number().optional(),
      }),
      features: z.array(z.object({
        text: z.string(),
        included: z.boolean().default(true),
        highlight: z.boolean().default(false),
      })),
      button: z.object({
        text: z.string(),
        url: z.string(),
        style: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      }),
      popular: z.boolean().default(false),
      badge: z.string().optional(),
    })),
    layout: z.enum(['cards', 'table', 'toggle']).default('cards'),
    billing: z.enum(['monthly', 'yearly', 'both']).default('monthly'),
    showComparison: z.boolean().default(false),
  }),
});

// AC Maintenance Specific Schemas

// Emergency Notice Block Schema
export const EmergencyNoticeBlockSchema = BaseBlockSchema.extend({
  type: z.literal('emergencyNotice'),
  data: z.object({
    title: z.string().default('خدمة الطوارئ 24/7'),
    message: z.string(),
    phone: z.string(),
    whatsapp: z.string().optional(),
    urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']).default('high'),
    showPulse: z.boolean().default(true),
    autoHide: z.boolean().default(false),
    hideAfter: z.number().min(5000).max(60000).default(30000),
  }),
});

// Packages Block Schema
export const PackagesBlockSchema = BaseBlockSchema.extend({
  type: z.literal('packages'),
  data: z.object({
    title: z.string().default('باقات الصيانة'),
    subtitle: z.string().optional(),
    packages: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.object({
        amount: z.number(),
        currency: z.string().default('ر.س'),
        period: z.string().default('سنوياً'),
      }),
      services: z.array(z.string()),
      visits: z.number(),
      warranty: z.string(),
      response: z.string(), // Response time
      popular: z.boolean().default(false),
      savings: z.string().optional(),
      button: z.object({
        text: z.string().default('اختر الباقة'),
        url: z.string(),
      }),
    })),
    showSavings: z.boolean().default(true),
    showComparison: z.boolean().default(true),
  }),
});

// Work Showcase Block Schema
export const WorkShowcaseBlockSchema = BaseBlockSchema.extend({
  type: z.literal('workShowcase'),
  data: z.object({
    title: z.string().default('أعمالنا'),
    subtitle: z.string().optional(),
    projects: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      beforeImage: z.string(),
      afterImage: z.string(),
      location: z.string().optional(),
      date: z.string().optional(),
      services: z.array(z.string()),
      client: z.string().optional(),
      duration: z.string().optional(),
    })),
    layout: z.enum(['grid', 'masonry', 'carousel']).default('grid'),
    showBeforeAfter: z.boolean().default(true),
    showDetails: z.boolean().default(true),
  }),
});

// Guarantees Block Schema
export const GuaranteesBlockSchema = BaseBlockSchema.extend({
  type: z.literal('guarantees'),
  data: z.object({
    title: z.string().default('ضماناتنا'),
    guarantees: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      duration: z.string().optional(),
      terms: z.array(z.string()).optional(),
    })),
    layout: z.enum(['grid', 'list', 'timeline']).default('grid'),
    showIcons: z.boolean().default(true),
    showTerms: z.boolean().default(false),
  }),
});

export type HeroBlockData = z.infer<typeof HeroBlockSchema>;
export type ServicesBlockData = z.infer<typeof ServicesBlockSchema>;
export type CTABlockData = z.infer<typeof CTABlockSchema>;
export type TestimonialBlockData = z.infer<typeof TestimonialBlockSchema>;
export type FAQBlockData = z.infer<typeof FAQBlockSchema>;
export type PricingBlockData = z.infer<typeof PricingBlockSchema>;
export type EmergencyNoticeBlockData = z.infer<typeof EmergencyNoticeBlockSchema>;
export type PackagesBlockData = z.infer<typeof PackagesBlockSchema>;
export type WorkShowcaseBlockData = z.infer<typeof WorkShowcaseBlockSchema>;
export type GuaranteesBlockData = z.infer<typeof GuaranteesBlockSchema>;

// Newsletter Block Schema
export const NewsletterBlockSchema = BaseBlockSchema.extend({
  type: z.literal('newsletter'),
  data: z.object({
    title: z.string().default('اشترك في النشرة الإخبارية'),
    subtitle: z.string().optional(),
    placeholder: z.string().default('أدخل بريدك الإلكتروني'),
    buttonText: z.string().default('اشترك'),
    successMessage: z.string().default('تم الاشتراك بنجاح!'),
    privacyText: z.string().optional(),
    layout: z.enum(['horizontal', 'vertical']).default('horizontal'),
  }),
});

// Map Block Schema
export const MapBlockSchema = BaseBlockSchema.extend({
  type: z.literal('map'),
  data: z.object({
    address: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    zoom: z.number().default(15),
    height: z.number().default(400),
    showControls: z.boolean().default(true),
    showMarker: z.boolean().default(true),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      hours: z.string().optional(),
    }).optional(),
  }),
});

// Before After Block Schema
export const BeforeAfterBlockSchema = BaseBlockSchema.extend({
  type: z.literal('beforeAfter'),
  data: z.object({
    beforeImage: z.string(),
    afterImage: z.string(),
    beforeLabel: z.string().default('قبل'),
    afterLabel: z.string().default('بعد'),
    layout: z.enum(['slider', 'side-by-side', 'overlay']).default('slider'),
    autoplay: z.boolean().default(false),
    interval: z.number().default(3000),
  }),
});

// Partners Block Schema
export const PartnersBlockSchema = BaseBlockSchema.extend({
  type: z.literal('partners'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    partners: z.array(z.object({
      name: z.string(),
      logo: z.string(),
      website: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'list']).default('grid'),
    columns: z.number().default(4),
    showNames: z.boolean().default(true),
    showDescriptions: z.boolean().default(false),
    autoplay: z.boolean().default(false),
    interval: z.number().default(3000),
    grayscale: z.boolean().default(false),
  }),
});

// Booking CTA Block Schema
export const BookingCTABlockSchema = BaseBlockSchema.extend({
  type: z.literal('bookingCTA'),
  data: z.object({
    title: z.string().default('احجز موعدك الآن'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    phone: z.string(),
    whatsapp: z.string().optional(),
    bookingUrl: z.string().optional(),
    emergencyText: z.string().default('خدمة طوارئ 24/7'),
    features: z.array(z.string()).optional(),
    urgency: z.object({
      enabled: z.boolean().default(false),
      text: z.string().optional(),
      countdown: z.string().optional(),
    }).optional(),
    layout: z.enum(['card', 'banner', 'floating']).default('card'),
    showFeatures: z.boolean().default(true),
    showEmergency: z.boolean().default(true),
  }),
});

export type NewsletterBlockData = z.infer<typeof NewsletterBlockSchema>;
export type MapBlockData = z.infer<typeof MapBlockSchema>;
export type BeforeAfterBlockData = z.infer<typeof BeforeAfterBlockSchema>;
export type PartnersBlockData = z.infer<typeof PartnersBlockSchema>;
export type BookingCTABlockData = z.infer<typeof BookingCTABlockSchema>;

// Text Block Schema
export const TextBlockSchema = BaseBlockSchema.extend({
  type: z.literal('text'),
  data: z.object({
    content: z.string().min(1, 'المحتوى مطلوب'),
    alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
    fontSize: z.enum(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']).default('base'),
    fontWeight: z.enum(['normal', 'medium', 'semibold', 'bold']).default('normal'),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    maxWidth: z.string().optional(),
    lineHeight: z.enum(['tight', 'normal', 'relaxed', 'loose']).default('normal'),
  }),
});

// Image Block Schema
export const ImageBlockSchema = BaseBlockSchema.extend({
  type: z.literal('image'),
  data: z.object({
    src: z.string().min(1, 'مصدر الصورة مطلوب'),
    alt: z.string().optional(),
    caption: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    borderRadius: z.string().optional(),
    shadow: z.boolean().default(false),
    zoom: z.boolean().default(false),
    link: z.string().optional(),
    objectFit: z.enum(['cover', 'contain', 'fill', 'none', 'scale-down']).default('cover'),
  }),
});

// Stats Block Schema
export const StatsBlockSchema = BaseBlockSchema.extend({
  type: z.literal('stats'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    stats: z.array(z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      color: z.string().optional(),
    })),
    layout: z.enum(['grid', 'horizontal', 'vertical', 'cards']).default('grid'),
    columns: z.object({
      desktop: z.number().min(1).max(6).default(4),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1),
    }).optional(),
    showIcons: z.boolean().default(true),
    animateNumbers: z.boolean().default(true),
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
  }),
});

// Contact Block Schema
export const ContactBlockSchema = BaseBlockSchema.extend({
  type: z.literal('contact'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
      workingHours: z.string().optional(),
      whatsapp: z.string().optional(),
      socialMedia: z.array(z.object({
        platform: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      })).optional(),
    }).optional(),
    form: z.object({
      enabled: z.boolean().default(true),
      fields: z.array(z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(['text', 'email', 'tel', 'textarea', 'select']),
        required: z.boolean().default(false),
        placeholder: z.string().optional(),
        options: z.array(z.string()).optional(),
      })),
      submitText: z.string().default('إرسال'),
      successMessage: z.string().default('تم إرسال رسالتك بنجاح!'),
    }).optional(),
    map: z.object({
      enabled: z.boolean().default(false),
      address: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }).optional(),
    layout: z.enum(['split', 'stacked', 'sidebar']).default('split'),
  }),
});

// Feature Grid Block Schema
export const FeatureGridBlockSchema = BaseBlockSchema.extend({
  type: z.literal('featureGrid'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
      link: z.string().optional(),
      color: z.string().optional(),
    })),
    layout: z.enum(['grid', 'masonry', 'list', 'cards']).default('grid'),
    columns: z.object({
      desktop: z.number().min(1).max(6).default(3),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1),
    }).optional(),
    showIcons: z.boolean().default(true),
    showImages: z.boolean().default(false),
    iconStyle: z.enum(['outline', 'filled', 'duotone']).default('outline'),
    cardStyle: z.enum(['default', 'bordered', 'shadow', 'minimal']).default('default'),
    animation: z.boolean().default(true),
  }),
});

// Team Block Schema
export const TeamBlockSchema = BaseBlockSchema.extend({
  type: z.literal('team'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    members: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      bio: z.string().optional(),
      image: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      socialMedia: z.array(z.object({
        platform: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      })).optional(),
    })),
    layout: z.enum(['grid', 'list', 'carousel']).default('grid'),
    columns: z.object({
      desktop: z.number().min(1).max(6).default(3),
      tablet: z.number().min(1).max(4).default(2),
      mobile: z.number().min(1).max(2).default(1),
    }).optional(),
    showBio: z.boolean().default(true),
    showContact: z.boolean().default(false),
    showSocialMedia: z.boolean().default(true),
  }),
});

// Logo Cloud Block Schema
export const LogoCloudBlockSchema = BaseBlockSchema.extend({
  type: z.literal('logoCloud'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    logos: z.array(z.object({
      id: z.string(),
      name: z.string(),
      logo: z.string(),
      url: z.string().optional(),
      description: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'masonry']).default('grid'),
    columns: z.object({
      desktop: z.number().min(1).max(8).default(6),
      tablet: z.number().min(1).max(6).default(4),
      mobile: z.number().min(1).max(4).default(2),
    }).optional(),
    showNames: z.boolean().default(false),
    grayscale: z.boolean().default(true),
    autoplay: z.boolean().default(false),
    interval: z.number().min(1000).max(10000).default(3000),
    spacing: z.enum(['tight', 'normal', 'relaxed']).default('normal'),
  }),
});

// Timeline Block Schema
export const TimelineBlockSchema = BaseBlockSchema.extend({
  type: z.literal('timeline'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    events: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.string(),
      image: z.string().optional(),
      icon: z.string().optional(),
      link: z.string().optional(),
      category: z.string().optional(),
    })),
    layout: z.enum(['vertical', 'horizontal', 'alternating']).default('vertical'),
    showImages: z.boolean().default(true),
    showIcons: z.boolean().default(true),
    showCategories: z.boolean().default(false),
    dateFormat: z.enum(['full', 'short', 'year']).default('short'),
    animation: z.boolean().default(true),
  }),
});

export type TextBlockData = z.infer<typeof TextBlockSchema>;
export type ImageBlockData = z.infer<typeof ImageBlockSchema>;
export type StatsBlockData = z.infer<typeof StatsBlockSchema>;
export type ContactBlockData = z.infer<typeof ContactBlockSchema>;
export type FeatureGridBlockData = z.infer<typeof FeatureGridBlockSchema>;
export type TeamBlockData = z.infer<typeof TeamBlockSchema>;
export type LogoCloudBlockData = z.infer<typeof LogoCloudBlockSchema>;
export type TimelineBlockData = z.infer<typeof TimelineBlockSchema>;

// Union type for all blocks
export type Block = 
  | z.infer<typeof HeroBlockSchema>
  | z.infer<typeof TextBlockSchema>
  | z.infer<typeof ImageBlockSchema>
  | z.infer<typeof ServicesBlockSchema>
  | z.infer<typeof CTABlockSchema>
  | z.infer<typeof TestimonialBlockSchema>
  | z.infer<typeof FAQBlockSchema>
  | z.infer<typeof PricingBlockSchema>
  | z.infer<typeof StatsBlockSchema>
  | z.infer<typeof ContactBlockSchema>
  | z.infer<typeof FeatureGridBlockSchema>
  | z.infer<typeof TeamBlockSchema>
  | z.infer<typeof LogoCloudBlockSchema>
  | z.infer<typeof TimelineBlockSchema>
  | z.infer<typeof EmergencyNoticeBlockSchema>
  | z.infer<typeof PackagesBlockSchema>
  | z.infer<typeof WorkShowcaseBlockSchema>
  | z.infer<typeof GuaranteesBlockSchema>
  | z.infer<typeof NewsletterBlockSchema>
  | z.infer<typeof MapBlockSchema>
  | z.infer<typeof BeforeAfterBlockSchema>
  | z.infer<typeof PartnersBlockSchema>
  | z.infer<typeof BookingCTABlockSchema>;