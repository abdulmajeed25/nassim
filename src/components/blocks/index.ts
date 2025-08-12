// Export all block components
export { default as TextBlock } from './TextBlock';
export { default as ImageBlock } from './ImageBlock';
export { default as ButtonBlock } from './ButtonBlock';
export { default as HeroBlock } from './HeroBlock';
export { default as ServicesBlock } from './ServicesBlock';
export { default as BlockRenderer } from './BlockRenderer';

// Block templates for easy creation
export const blockTemplates = {
  text: {
    type: 'text',
    content: {
      text: 'اكتب النص هنا...',
      format: 'paragraph' as const,
    },
    settings: {
      spacing: {
        margin: '0',
        padding: '16px',
      },
    },
    order: 0,
  },
  
  image: {
    type: 'image',
    content: {
      src: '',
      alt: '',
      caption: '',
    },
    settings: {
      spacing: {
        margin: '0',
        padding: '16px',
      },
    },
    order: 0,
  },
  
  button: {
    type: 'button',
    content: {
      text: 'انقر هنا',
      url: '#',
      variant: 'primary' as const,
      size: 'medium' as const,
      target: '_self' as const,
    },
    settings: {
      spacing: {
        margin: '0',
        padding: '16px',
      },
    },
    order: 0,
  },
  
  hero: {
    type: 'hero',
    content: {
      title: 'مرحباً بكم في موقعنا',
      subtitle: 'نقدم أفضل الخدمات والحلول',
      backgroundColor: '#f8fafc',
      textAlign: 'center' as const,
      buttons: [
        {
          text: 'ابدأ الآن',
          url: '#',
          variant: 'primary' as const,
        },
      ],
    },
    settings: {
      spacing: {
        margin: '0',
        padding: '0',
      },
    },
    order: 0,
  },
  
  services: {
    type: 'services',
    content: {
      title: 'خدماتنا',
      services: [
        {
          id: '1',
          title: 'صيانة المكيفات',
          description: 'نقدم خدمات صيانة شاملة لجميع أنواع المكيفات',
          icon: 'wrench',
        },
        {
          id: '2',
          title: 'تركيب المكيفات',
          description: 'تركيب احترافي للمكيفات بأعلى معايير الجودة',
          icon: 'shield',
        },
        {
          id: '3',
          title: 'خدمة سريعة',
          description: 'استجابة سريعة وخدمة على مدار الساعة',
          icon: 'clock',
        },
      ],
    },
    settings: {
      spacing: {
        margin: '0',
        padding: '0',
      },
    },
    order: 0,
  },
};

// Available block types
export const availableBlocks = [
  {
    type: 'text',
    label: 'نص',
    description: 'إضافة نص أو عناوين',
    icon: 'Type',
    category: 'محتوى',
  },
  {
    type: 'image',
    label: 'صورة',
    description: 'إضافة صورة مع تسمية توضيحية',
    icon: 'Image',
    category: 'وسائط',
  },
  {
    type: 'button',
    label: 'زر',
    description: 'إضافة زر للتفاعل',
    icon: 'MousePointer',
    category: 'تفاعل',
  },
  {
    type: 'hero',
    label: 'قسم البطل',
    description: 'قسم رئيسي مع عنوان وأزرار',
    icon: 'Layout',
    category: 'تخطيط',
  },
  {
    type: 'services',
    label: 'الخدمات',
    description: 'عرض قائمة الخدمات',
    icon: 'Grid',
    category: 'تخطيط',
  },
];