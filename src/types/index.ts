// Basic types for the CMS
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Block system for page builder
export interface Block {
  id: string;
  type: string;
  data: any;
  settings?: BlockSettings;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlockSettings {
  spacing?: string;
  background?: {
    type: 'solid' | 'gradient' | 'pattern' | 'image';
    color?: string;
    from?: string;
    to?: string;
    pattern?: string;
    image?: string;
    opacity?: number;
  };
  borders?: {
    radius?: string;
    width?: string;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  shadows?: string;
  customCSS?: string;
  visibility?: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  animation?: {
    type: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut';
    duration: number;
    delay: number;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  blocks: Block[];
  status: 'draft' | 'published' | 'archived';
  template?: string;
  seo?: SEOData;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage?: string;
  seo?: SEOData;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}
export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  createdAt: Date;
  alt?: string;
  caption?: string;
}

export interface Menu {
  id: string;
  name: string;
  location: string;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  label: string;
  title?: string;
  url: string;
  type: 'internal' | 'external' | 'custom';
  target?: '_blank' | '_self';
  order: number;
  parentId?: string;
  children?: MenuItem[];
  isActive: boolean;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  language: string;
  direction: 'ltr' | 'rtl';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    fontFamily: string;
    containerWidth: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo: SEOData;
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    hotjarId?: string;
  };
  features: {
    enableComments: boolean;
    enableNewsletter: boolean;
    enableSearch: boolean;
    enableDarkMode: boolean;
    enableRTL: boolean;
  };
  maintenance: {
    enabled: boolean;
    message: string;
    allowedIPs: string[];
  };
}

// Block types for the page builder
export interface TextBlock {
  type: 'text';
  content: {
    text: string;
    format: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6';
  };
}

export interface ImageBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export interface VideoBlock {
  type: 'video';
  content: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}

export interface ButtonBlock {
  type: 'button';
  content: {
    text: string;
    url: string;
    variant: 'primary' | 'secondary' | 'outline';
    size: 'small' | 'medium' | 'large';
    target?: '_blank' | '_self';
  };
}

export interface HeroBlock {
  type: 'hero';
  content: {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    textAlign: 'left' | 'center' | 'right';
    buttons?: {
      text: string;
      url: string;
      variant: 'primary' | 'secondary';
    }[];
  };
}

export interface ServicesBlock {
  type: 'services';
  content: {
    title: string;
    services: {
      id: string;
      title: string;
      description: string;
      icon?: string;
      image?: string;
    }[];
  };
}

export interface ContactBlock {
  type: 'contact';
  content: {
    title: string;
    description?: string;
    showForm: boolean;
    showMap: boolean;
    mapUrl?: string;
  };
}

export interface TestimonialsBlock {
  type: 'testimonials';
  content: {
    title: string;
    testimonials: {
      id: string;
      name: string;
      role?: string;
      content: string;
      avatar?: string;
      rating?: number;
    }[];
  };
}

// Union type for all block types
export type BlockContent = 
  | TextBlock
  | ImageBlock
  | VideoBlock
  | ButtonBlock
  | HeroBlock
  | ServicesBlock
  | ContactBlock
  | TestimonialsBlock;

// AI Integration types
export interface AIPrompt {
  id: string;
  type: 'page' | 'content' | 'seo' | 'image';
  prompt: string;
  result?: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: string;
}

export interface AISettings {
  openaiApiKey?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
}