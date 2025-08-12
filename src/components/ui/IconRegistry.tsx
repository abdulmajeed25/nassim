import React, { Suspense, lazy, useMemo } from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';

// تعريف أنواع الأيقونات المدعومة
export type IconProvider = 'lucide' | 'tabler' | 'phosphor';
export type IconStyle = 'outline' | 'filled' | 'duotone';
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill';

// واجهة خصائص الأيقونة
export interface IconProps extends Omit<LucideProps, 'size' | 'style'> {
  name: string;
  provider?: IconProvider;
  iconStyle?: IconStyle;
  weight?: IconWeight;
  size?: number | string;
  strokeWidth?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
  rotate?: number;
  className?: string;
}

// واجهة معلومات الأيقونة
export interface IconInfo {
  name: string;
  provider: IconProvider;
  category: string;
  tags: string[];
  keywords: string[];
  component?: React.ComponentType<any>;
}

// فئات الأيقونات
export const ICON_CATEGORIES = {
  general: {
    name: 'عام',
    nameAr: 'عام',
    description: 'أيقونات عامة ومتنوعة'
  },
  navigation: {
    name: 'التنقل',
    nameAr: 'التنقل',
    description: 'أيقونات التنقل والقوائم'
  },
  actions: {
    name: 'الإجراءات',
    nameAr: 'الإجراءات',
    description: 'أيقونات الأزرار والإجراءات'
  },
  communication: {
    name: 'التواصل',
    nameAr: 'التواصل',
    description: 'أيقونات التواصل والاتصال'
  },
  business: {
    name: 'الأعمال',
    nameAr: 'الأعمال',
    description: 'أيقونات الأعمال والخدمات'
  },
  technical: {
    name: 'تقني',
    nameAr: 'تقني',
    description: 'أيقونات تقنية ومتخصصة'
  },
  social: {
    name: 'اجتماعي',
    nameAr: 'اجتماعي',
    description: 'أيقونات وسائل التواصل الاجتماعي'
  },
  ac_maintenance: {
    name: 'صيانة المكيفات',
    nameAr: 'صيانة المكيفات',
    description: 'أيقونات متخصصة لصيانة المكيفات'
  }
};

// تحميل أيقونات Lucide بشكل تدريجي
const loadLucideIcon = (iconName: string) => {
  return lazy(() => 
    import('lucide-react').then(module => {
      const IconComponent = module[iconName as keyof typeof module] as LucideIcon;
      if (!IconComponent) {
        throw new Error(`Icon ${iconName} not found in lucide-react`);
      }
      return { default: IconComponent };
    }).catch(() => {
      // إرجاع أيقونة افتراضية في حالة عدم وجود الأيقونة
      return import('lucide-react').then(module => ({ default: module.HelpCircle }));
    })
  );
};

// سجل الأيقونات
class IconRegistryClass {
  private icons: Map<string, IconInfo> = new Map();
  private loadedIcons: Map<string, React.ComponentType<any>> = new Map();

  constructor() {
    this.initializeDefaultIcons();
  }

  // تهيئة الأيقونات الافتراضية
  private initializeDefaultIcons() {
    const defaultIcons: Omit<IconInfo, 'component'>[] = [
      // أيقونات عامة
      { name: 'home', provider: 'lucide', category: 'navigation', tags: ['منزل', 'رئيسية'], keywords: ['home', 'house', 'main'] },
      { name: 'menu', provider: 'lucide', category: 'navigation', tags: ['قائمة', 'تنقل'], keywords: ['menu', 'navigation', 'hamburger'] },
      { name: 'search', provider: 'lucide', category: 'actions', tags: ['بحث', 'عثور'], keywords: ['search', 'find', 'lookup'] },
      { name: 'user', provider: 'lucide', category: 'general', tags: ['مستخدم', 'شخص'], keywords: ['user', 'person', 'profile'] },
      { name: 'users', provider: 'lucide', category: 'general', tags: ['مستخدمين', 'فريق'], keywords: ['users', 'team', 'group'] },
      
      // أيقونات التواصل
      { name: 'phone', provider: 'lucide', category: 'communication', tags: ['هاتف', 'اتصال'], keywords: ['phone', 'call', 'contact'] },
      { name: 'phone-call', provider: 'lucide', category: 'communication', tags: ['مكالمة', 'اتصال'], keywords: ['call', 'phone', 'ring'] },
      { name: 'mail', provider: 'lucide', category: 'communication', tags: ['بريد', 'إيميل'], keywords: ['email', 'mail', 'message'] },
      { name: 'message-circle', provider: 'lucide', category: 'communication', tags: ['رسالة', 'واتساب'], keywords: ['message', 'chat', 'whatsapp'] },
      { name: 'map-pin', provider: 'lucide', category: 'general', tags: ['موقع', 'عنوان'], keywords: ['location', 'address', 'pin'] },
      
      // أيقونات الأعمال
      { name: 'briefcase', provider: 'lucide', category: 'business', tags: ['عمل', 'حقيبة'], keywords: ['business', 'work', 'job'] },
      { name: 'building', provider: 'lucide', category: 'business', tags: ['مبنى', 'شركة'], keywords: ['building', 'company', 'office'] },
      { name: 'calendar', provider: 'lucide', category: 'business', tags: ['تقويم', 'موعد'], keywords: ['calendar', 'date', 'schedule'] },
      { name: 'clock', provider: 'lucide', category: 'business', tags: ['وقت', 'ساعة'], keywords: ['time', 'clock', 'hour'] },
      { name: 'dollar-sign', provider: 'lucide', category: 'business', tags: ['سعر', 'مال'], keywords: ['price', 'money', 'cost'] },
      
      // أيقونات صيانة المكيفات
      { name: 'wrench', provider: 'lucide', category: 'ac_maintenance', tags: ['صيانة', 'إصلاح'], keywords: ['maintenance', 'repair', 'fix'] },
      { name: 'tool', provider: 'lucide', category: 'ac_maintenance', tags: ['أداة', 'معدات'], keywords: ['tool', 'equipment', 'gear'] },
      { name: 'settings', provider: 'lucide', category: 'ac_maintenance', tags: ['إعدادات', 'تركيب'], keywords: ['settings', 'installation', 'config'] },
      { name: 'droplets', provider: 'lucide', category: 'ac_maintenance', tags: ['تنظيف', 'مياه'], keywords: ['cleaning', 'water', 'wash'] },
      { name: 'thermometer', provider: 'lucide', category: 'ac_maintenance', tags: ['حرارة', 'تبريد'], keywords: ['temperature', 'cooling', 'heat'] },
      { name: 'wind', provider: 'lucide', category: 'ac_maintenance', tags: ['هواء', 'تهوية'], keywords: ['air', 'ventilation', 'breeze'] },
      { name: 'zap', provider: 'lucide', category: 'ac_maintenance', tags: ['كهرباء', 'طاقة'], keywords: ['electricity', 'power', 'energy'] },
      { name: 'shield-check', provider: 'lucide', category: 'ac_maintenance', tags: ['ضمان', 'حماية'], keywords: ['warranty', 'protection', 'guarantee'] },
      
      // أيقونات الإجراءات
      { name: 'plus', provider: 'lucide', category: 'actions', tags: ['إضافة', 'جديد'], keywords: ['add', 'new', 'create'] },
      { name: 'edit', provider: 'lucide', category: 'actions', tags: ['تعديل', 'تحرير'], keywords: ['edit', 'modify', 'change'] },
      { name: 'trash', provider: 'lucide', category: 'actions', tags: ['حذف', 'إزالة'], keywords: ['delete', 'remove', 'trash'] },
      { name: 'download', provider: 'lucide', category: 'actions', tags: ['تحميل', 'تنزيل'], keywords: ['download', 'save', 'export'] },
      { name: 'upload', provider: 'lucide', category: 'actions', tags: ['رفع', 'تحميل'], keywords: ['upload', 'import', 'add'] },
      
      // أيقونات التنقل
      { name: 'arrow-right', provider: 'lucide', category: 'navigation', tags: ['سهم', 'يمين'], keywords: ['arrow', 'right', 'next'] },
      { name: 'arrow-left', provider: 'lucide', category: 'navigation', tags: ['سهم', 'يسار'], keywords: ['arrow', 'left', 'back'] },
      { name: 'chevron-down', provider: 'lucide', category: 'navigation', tags: ['سهم', 'أسفل'], keywords: ['arrow', 'down', 'expand'] },
      { name: 'chevron-up', provider: 'lucide', category: 'navigation', tags: ['سهم', 'أعلى'], keywords: ['arrow', 'up', 'collapse'] },
      
      // أيقونات اجتماعية
      { name: 'facebook', provider: 'lucide', category: 'social', tags: ['فيسبوك'], keywords: ['facebook', 'social'] },
      { name: 'twitter', provider: 'lucide', category: 'social', tags: ['تويتر'], keywords: ['twitter', 'social'] },
      { name: 'instagram', provider: 'lucide', category: 'social', tags: ['انستغرام'], keywords: ['instagram', 'social'] },
      { name: 'linkedin', provider: 'lucide', category: 'social', tags: ['لينكدإن'], keywords: ['linkedin', 'social'] },
      { name: 'youtube', provider: 'lucide', category: 'social', tags: ['يوتيوب'], keywords: ['youtube', 'social'] },
      
      // أيقونات أخرى
      { name: 'star', provider: 'lucide', category: 'general', tags: ['نجمة', 'تقييم'], keywords: ['star', 'rating', 'favorite'] },
      { name: 'heart', provider: 'lucide', category: 'general', tags: ['قلب', 'إعجاب'], keywords: ['heart', 'like', 'love'] },
      { name: 'eye', provider: 'lucide', category: 'general', tags: ['عين', 'مشاهدة'], keywords: ['eye', 'view', 'see'] },
      { name: 'image', provider: 'lucide', category: 'general', tags: ['صورة', 'معرض'], keywords: ['image', 'picture', 'gallery'] },
      { name: 'file', provider: 'lucide', category: 'general', tags: ['ملف', 'مستند'], keywords: ['file', 'document', 'paper'] },
      { name: 'package', provider: 'lucide', category: 'business', tags: ['باقة', 'حزمة'], keywords: ['package', 'bundle', 'box'] },
      { name: 'check', provider: 'lucide', category: 'actions', tags: ['صح', 'موافق'], keywords: ['check', 'correct', 'done'] },
      { name: 'x', provider: 'lucide', category: 'actions', tags: ['إغلاق', 'إلغاء'], keywords: ['close', 'cancel', 'remove'] },
      { name: 'alert-circle', provider: 'lucide', category: 'general', tags: ['تنبيه', 'تحذير'], keywords: ['alert', 'warning', 'attention'] },
      { name: 'info', provider: 'lucide', category: 'general', tags: ['معلومات', 'تفاصيل'], keywords: ['info', 'information', 'details'] }
    ];

    defaultIcons.forEach(icon => {
      this.icons.set(icon.name, { ...icon, component: undefined });
    });
  }

  // تسجيل أيقونة جديدة
  registerIcon(iconInfo: IconInfo) {
    this.icons.set(iconInfo.name, iconInfo);
  }

  // الحصول على معلومات الأيقونة
  getIconInfo(name: string): IconInfo | undefined {
    return this.icons.get(name);
  }

  // الحصول على جميع الأيقونات
  getAllIcons(): IconInfo[] {
    return Array.from(this.icons.values());
  }

  // البحث في الأيقونات
  searchIcons(query: string, category?: string): IconInfo[] {
    const searchTerm = query.toLowerCase();
    return this.getAllIcons().filter(icon => {
      const matchesCategory = !category || icon.category === category;
      const matchesSearch = 
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        icon.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
      
      return matchesCategory && matchesSearch;
    });
  }

  // الحصول على الأيقونات حسب الفئة
  getIconsByCategory(category: string): IconInfo[] {
    return this.getAllIcons().filter(icon => icon.category === category);
  }

  // تحميل مكون الأيقونة
  async loadIcon(name: string, provider: IconProvider = 'lucide'): Promise<React.ComponentType<any> | null> {
    const cacheKey = `${provider}-${name}`;
    
    if (this.loadedIcons.has(cacheKey)) {
      return this.loadedIcons.get(cacheKey)!;
    }

    try {
      let IconComponent: React.ComponentType<any>;

      switch (provider) {
        case 'lucide':
          const LucideIcon = await loadLucideIcon(name);
          IconComponent = LucideIcon;
          break;
        case 'tabler':
          // يمكن إضافة دعم Tabler هنا لاحقاً
          throw new Error('Tabler icons not implemented yet');
        case 'phosphor':
          // يمكن إضافة دعم Phosphor هنا لاحقاً
          throw new Error('Phosphor icons not implemented yet');
        default:
          throw new Error(`Unknown icon provider: ${provider}`);
      }

      this.loadedIcons.set(cacheKey, IconComponent);
      return IconComponent;
    } catch (error) {
      console.warn(`Failed to load icon ${name} from ${provider}:`, error);
      return null;
    }
  }
}

// إنشاء مثيل واحد من سجل الأيقونات
export const IconRegistry = new IconRegistryClass();

// مكون الأيقونة الرئيسي
export const Icon: React.FC<IconProps> = ({
  name,
  provider = 'lucide',
  iconStyle,
  size = 24,
  strokeWidth = 2,
  flip,
  rotate,
  className = '',
  ...props
}) => {
  const IconComponent = useMemo(() => {
    return loadLucideIcon(name);
  }, [name]);

  const computedStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    if (flip) {
      if (flip === 'horizontal' || flip === 'both') {
        style.transform = (style.transform || '') + ' scaleX(-1)';
      }
      if (flip === 'vertical' || flip === 'both') {
        style.transform = (style.transform || '') + ' scaleY(-1)';
      }
    }
    
    if (rotate) {
      style.transform = (style.transform || '') + ` rotate(${rotate}deg)`;
    }
    
    return style;
  }, [flip, rotate]);

  return (
    <Suspense fallback={<div className={`inline-block ${className}`} style={{ width: size, height: size }} />}>
      <IconComponent
        size={size}
        strokeWidth={strokeWidth}
        className={className}
        style={computedStyle}
        {...props}
      />
    </Suspense>
  );
};

// مكون اختيار الأيقونة
export interface IconPickerProps {
  selectedIcon?: string;
  onIconSelect: (iconName: string) => void;
  category?: string;
  searchPlaceholder?: string;
  className?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onIconSelect,
  category,
  searchPlaceholder = 'البحث في الأيقونات...',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(category || '');

  const filteredIcons = useMemo(() => {
    if (searchQuery) {
      return IconRegistry.searchIcons(searchQuery, selectedCategory || undefined);
    }
    return selectedCategory 
      ? IconRegistry.getIconsByCategory(selectedCategory)
      : IconRegistry.getAllIcons();
  }, [searchQuery, selectedCategory]);

  const categories = Object.entries(ICON_CATEGORIES);

  return (
    <div className={`icon-picker ${className}`}>
      {/* شريط البحث */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* فلتر الفئات */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">جميع الفئات</option>
          {categories.map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* شبكة الأيقونات */}
      <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
        {filteredIcons.map((iconInfo) => (
          <button
            key={iconInfo.name}
            onClick={() => onIconSelect(iconInfo.name)}
            className={`
              p-2 rounded-md border-2 transition-colors
              ${selectedIcon === iconInfo.name 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            title={iconInfo.tags.join(', ')}
          >
            <Icon name={iconInfo.name} size={20} className="mx-auto" />
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لم يتم العثور على أيقونات مطابقة
        </div>
      )}
    </div>
  );
};

export default Icon;