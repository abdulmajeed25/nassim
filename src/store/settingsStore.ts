import { StateCreator } from 'zustand';
import { SiteSettings } from '../types';

export interface SettingsStore {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  updateSettings: (updates: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'شركة نسيم لصيانة المكيفات',
  siteDescription: 'الشركة الرائدة في صيانة وتركيب وتنظيف جميع أنواع المكيفات في المملكة العربية السعودية',
  logo: '/images/nasim-logo.svg',
  favicon: '/favicon.ico',
  language: 'ar',
  direction: 'rtl',
  theme: {
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#059669',
    backgroundColor: '#f8fafc',
    textColor: '#1f2937',
    borderRadius: '12px',
    fontFamily: 'Cairo, Tajawal, sans-serif',
    containerWidth: '1280px',
  },
  contact: {
    email: 'info@nasim-ac.com',
    phone: '+966920001234',
    whatsapp: '+966555123456',
    address: 'شارع الأمير محمد بن عبدالعزيز، حي العليا، الرياض 12211، المملكة العربية السعودية',
  },
  social: {
    facebook: 'https://facebook.com/nasim.ac.maintenance',
    twitter: 'https://twitter.com/nasim_ac_ksa',
    instagram: 'https://instagram.com/nasim_ac_maintenance',
    linkedin: 'https://linkedin.com/company/nasim-ac-maintenance',
    youtube: 'https://youtube.com/@nasim-ac-maintenance',
  },
  seo: {
    metaTitle: 'شركة نسيم - خبراء صيانة وتركيب المكيفات في المملكة العربية السعودية',
    metaDescription: 'شركة نسيم الرائدة في صيانة وتركيب وتنظيف جميع أنواع المكيفات. خدمة سريعة وموثوقة على مدار 24 ساعة مع ضمان شامل وأسعار تنافسية في الرياض وجدة والدمام.',
    keywords: ['صيانة مكيفات الرياض', 'تركيب مكيفات جدة', 'تنظيف مكيفات الدمام', 'شركة نسيم', 'صيانة مكيفات 24 ساعة', 'فني مكيفات معتمد'],
    ogImage: '/images/nasim-og-image.jpg',
    twitterCard: 'summary_large_image',
  },
  analytics: {
    googleAnalyticsId: '',
    facebookPixelId: '',
    hotjarId: '',
  },
  features: {
    enableComments: true,
    enableNewsletter: true,
    enableSearch: true,
    enableDarkMode: false,
    enableRTL: true,
  },
  maintenance: {
    enabled: false,
    message: 'الموقع تحت الصيانة، سنعود قريباً',
    allowedIPs: [],
  },
};

export const createSettingsSlice: StateCreator<SettingsStore> = (set) => ({
  settings: defaultSettings,

  setSettings: (settings) => set({ settings }),

  updateSettings: (updates) => {
    set((state) => ({
      settings: {
        ...state.settings,
        ...updates,
        // Handle nested objects properly
        theme: updates.theme ? { ...state.settings.theme, ...updates.theme } : state.settings.theme,
        contact: updates.contact ? { ...state.settings.contact, ...updates.contact } : state.settings.contact,
        social: updates.social ? { ...state.settings.social, ...updates.social } : state.settings.social,
        seo: updates.seo ? { ...state.settings.seo, ...updates.seo } : state.settings.seo,
        analytics: updates.analytics ? { ...state.settings.analytics, ...updates.analytics } : state.settings.analytics,
        features: updates.features ? { ...state.settings.features, ...updates.features } : state.settings.features,
        maintenance: updates.maintenance ? { ...state.settings.maintenance, ...updates.maintenance } : state.settings.maintenance,
      },
    }));
  },
});