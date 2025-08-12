import React, { useState, useCallback } from 'react';
import { Icon } from '../../components/ui/IconRegistry';
// import { useSettingsStore } from '../../store/settingsStore';

// أنواع البيانات
interface SiteSettings {
  general: {
    siteName: string;
    tagline: string;
    description: string;
    siteUrl: string;
    language: string;
    rtl: boolean;
    timezone: string;
    currency: string;
    logo: {
      light: string;
      dark: string;
      favicon: string;
    };
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    workingHours: {
      [key: string]: {
        open: string;
        close: string;
        closed: boolean;
      };
    };
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        base: string;
        sm: string;
        lg: string;
        xl: string;
      };
    };
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
    twitterCard: string;
  };
  integrations: {
    analytics: {
      googleAnalytics?: string;
      googleTagManager?: string;
      facebookPixel?: string;
      hotjar?: string;
    };
    thirdParty: {
      whatsappWidget: boolean;
      liveChatWidget: boolean;
      bookingSystem: boolean;
    };
  };
  features: {
    multiLanguage: boolean;
    darkMode: boolean;
    pwa: boolean;
    notifications: boolean;
    geolocation: boolean;
    reviews: boolean;
    booking: boolean;
    ecommerce: boolean;
  };
  maintenance: {
    enabled: boolean;
    message: string;
    allowedIPs: string[];
  };
}

// خصائص المكون
interface SettingsEditorProps {
  onSave?: (settings: SiteSettings) => void;
  onCancel?: () => void;
}

// مكون تبويب الإعدادات
const SettingsTab: React.FC<{
  id: string;
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-right rounded-lg transition-colors
      ${active 
        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }
    `}
  >
    <Icon name={icon} size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

// مكون حقل الإدخال
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}> = ({ label, value, onChange, type = 'text', placeholder, required, description }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 mr-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
    {description && (
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    )}
  </div>
);

// مكون منطقة النص
const TextareaField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  description?: string;
}> = ({ label, value, onChange, placeholder, rows = 3, description }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      rows={rows}
    />
    {description && (
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    )}
  </div>
);

// مكون مفتاح التبديل
const SwitchField: React.FC<{
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}> = ({ label, value, onChange, description }) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${value ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${value ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  </div>
);

// المكون الرئيسي
export const SettingsEditor: React.FC<SettingsEditorProps> = ({ onSave, onCancel }) => {
  // const { settings, updateSettings } = useSettingsStore();
  const settings: SiteSettings = {} as SiteSettings;
  const updateSettings = (_path: string, _value: any) => {
    // Mock implementation
  };
  const [activeTab, setActiveTab] = useState('general');
  const [editedSettings, setEditedSettings] = useState<SiteSettings>(settings);
  const [isLoading, setIsLoading] = useState(false);

  // التبويبات
  const tabs = [
    { id: 'general', label: 'عام', icon: 'settings' },
    { id: 'contact', label: 'التواصل', icon: 'phone' },
    { id: 'social', label: 'وسائل التواصل', icon: 'share-2' },
    { id: 'theme', label: 'المظهر', icon: 'palette' },
    { id: 'seo', label: 'SEO', icon: 'search' },
    { id: 'integrations', label: 'التكاملات', icon: 'plug' },
    { id: 'features', label: 'الميزات', icon: 'toggle-left' },
    { id: 'maintenance', label: 'الصيانة', icon: 'tool' }
  ];

  // تحديث الإعدادات
  const updateSetting = useCallback((path: string, value: any) => {
    const keys = path.split('.');
    const newSettings = { ...editedSettings };
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditedSettings(newSettings);
  }, [editedSettings]);

  // حفظ الإعدادات
  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      // await updateSettings(editedSettings);
      onSave?.(editedSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [editedSettings, updateSettings, onSave]);

  // عرض محتوى التبويب
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="اسم الموقع"
                value={editedSettings.general.siteName}
                onChange={(value) => updateSetting('general.siteName', value)}
                required
                placeholder="شركة الخدمات المتميزة"
              />
              
              <InputField
                label="الشعار"
                value={editedSettings.general.tagline}
                onChange={(value) => updateSetting('general.tagline', value)}
                placeholder="أفضل خدمات التكييف في المملكة"
              />
            </div>
            
            <TextareaField
              label="وصف الموقع"
              value={editedSettings.general.description}
              onChange={(value) => updateSetting('general.description', value)}
              placeholder="وصف مختصر عن الموقع والخدمات المقدمة"
              description="سيظهر في نتائج البحث ووسائل التواصل الاجتماعي"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="رابط الموقع"
                value={editedSettings.general.siteUrl}
                onChange={(value) => updateSetting('general.siteUrl', value)}
                type="url"
                placeholder="https://example.com"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اللغة
                </label>
                <select
                  value={editedSettings.general.language}
                  onChange={(e) => updateSetting('general.language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنطقة الزمنية
                </label>
                <select
                  value={editedSettings.general.timezone}
                  onChange={(e) => updateSetting('general.timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                  <option value="Asia/Dubai">دبي (GMT+4)</option>
                  <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العملة
                </label>
                <select
                  value={editedSettings.general.currency}
                  onChange={(e) => updateSetting('general.currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                  <option value="EGP">جنيه مصري (EGP)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">الشعارات</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="الشعار الفاتح"
                  value={editedSettings.general.logo.light}
                  onChange={(value) => updateSetting('general.logo.light', value)}
                  placeholder="/images/logo-light.svg"
                />
                
                <InputField
                  label="الشعار الداكن"
                  value={editedSettings.general.logo.dark}
                  onChange={(value) => updateSetting('general.logo.dark', value)}
                  placeholder="/images/logo-dark.svg"
                />
                
                <InputField
                  label="أيقونة المفضلة"
                  value={editedSettings.general.logo.favicon}
                  onChange={(value) => updateSetting('general.logo.favicon', value)}
                  placeholder="/favicon.ico"
                />
              </div>
            </div>
            
            <SwitchField
              label="دعم RTL"
              value={editedSettings.general.rtl}
              onChange={(value) => updateSetting('general.rtl', value)}
              description="تفعيل دعم الكتابة من اليمين إلى اليسار"
            />
          </div>
        );
        
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="رقم الهاتف"
                value={editedSettings.contact.phone}
                onChange={(value) => updateSetting('contact.phone', value)}
                type="tel"
                placeholder="+966501234567"
                required
              />
              
              <InputField
                label="واتساب"
                value={editedSettings.contact.whatsapp}
                onChange={(value) => updateSetting('contact.whatsapp', value)}
                type="tel"
                placeholder="+966501234567"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="البريد الإلكتروني"
                value={editedSettings.contact.email}
                onChange={(value) => updateSetting('contact.email', value)}
                type="email"
                placeholder="info@example.com"
                required
              />
              
              <TextareaField
                label="العنوان"
                value={editedSettings.contact.address}
                onChange={(value) => updateSetting('contact.address', value)}
                placeholder="الرياض، المملكة العربية السعودية"
                rows={2}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">ساعات العمل</h3>
              
              <div className="space-y-4">
                {Object.entries(editedSettings.contact.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-20">
                      <span className="text-sm font-medium text-gray-700">
                        {day === 'sunday' ? 'الأحد' :
                         day === 'monday' ? 'الاثنين' :
                         day === 'tuesday' ? 'الثلاثاء' :
                         day === 'wednesday' ? 'الأربعاء' :
                         day === 'thursday' ? 'الخميس' :
                         day === 'friday' ? 'الجمعة' : 'السبت'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => updateSetting(`contact.workingHours.${day}.closed`, !e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">مفتوح</span>
                    </div>
                    
                    {!hours.closed && (
                      <>
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => updateSetting(`contact.workingHours.${day}.open`, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">إلى</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => updateSetting(`contact.workingHours.${day}.close`, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'social':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="فيسبوك"
                value={editedSettings.social.facebook || ''}
                onChange={(value) => updateSetting('social.facebook', value || undefined)}
                type="url"
                placeholder="https://facebook.com/yourpage"
              />
              
              <InputField
                label="تويتر"
                value={editedSettings.social.twitter || ''}
                onChange={(value) => updateSetting('social.twitter', value || undefined)}
                type="url"
                placeholder="https://twitter.com/youraccount"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="إنستغرام"
                value={editedSettings.social.instagram || ''}
                onChange={(value) => updateSetting('social.instagram', value || undefined)}
                type="url"
                placeholder="https://instagram.com/youraccount"
              />
              
              <InputField
                label="لينكد إن"
                value={editedSettings.social.linkedin || ''}
                onChange={(value) => updateSetting('social.linkedin', value || undefined)}
                type="url"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="يوتيوب"
                value={editedSettings.social.youtube || ''}
                onChange={(value) => updateSetting('social.youtube', value || undefined)}
                type="url"
                placeholder="https://youtube.com/yourchannel"
              />
              
              <InputField
                label="تيك توك"
                value={editedSettings.social.tiktok || ''}
                onChange={(value) => updateSetting('social.tiktok', value || undefined)}
                type="url"
                placeholder="https://tiktok.com/@youraccount"
              />
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className="space-y-6">
            <SwitchField
              label="دعم متعدد اللغات"
              value={editedSettings.features.multiLanguage}
              onChange={(value) => updateSetting('features.multiLanguage', value)}
              description="تفعيل دعم أكثر من لغة واحدة"
            />
            
            <SwitchField
              label="الوضع الداكن"
              value={editedSettings.features.darkMode}
              onChange={(value) => updateSetting('features.darkMode', value)}
              description="السماح للمستخدمين بالتبديل بين الوضع الفاتح والداكن"
            />
            
            <SwitchField
              label="تطبيق ويب تقدمي (PWA)"
              value={editedSettings.features.pwa}
              onChange={(value) => updateSetting('features.pwa', value)}
              description="تحويل الموقع إلى تطبيق قابل للتثبيت"
            />
            
            <SwitchField
              label="الإشعارات"
              value={editedSettings.features.notifications}
              onChange={(value) => updateSetting('features.notifications', value)}
              description="إرسال إشعارات للمستخدمين"
            />
            
            <SwitchField
              label="تحديد الموقع الجغرافي"
              value={editedSettings.features.geolocation}
              onChange={(value) => updateSetting('features.geolocation', value)}
              description="استخدام موقع المستخدم لتحسين الخدمة"
            />
            
            <SwitchField
              label="نظام التقييمات"
              value={editedSettings.features.reviews}
              onChange={(value) => updateSetting('features.reviews', value)}
              description="السماح للعملاء بترك تقييمات"
            />
            
            <SwitchField
              label="نظام الحجز"
              value={editedSettings.features.booking}
              onChange={(value) => updateSetting('features.booking', value)}
              description="تفعيل نظام حجز المواعيد"
            />
            
            <SwitchField
              label="التجارة الإلكترونية"
              value={editedSettings.features.ecommerce}
              onChange={(value) => updateSetting('features.ecommerce', value)}
              description="تفعيل بيع المنتجات والخدمات"
            />
          </div>
        );
        
      case 'maintenance':
        return (
          <div className="space-y-6">
            <SwitchField
              label="وضع الصيانة"
              value={editedSettings.maintenance.enabled}
              onChange={(value) => updateSetting('maintenance.enabled', value)}
              description="تفعيل وضع الصيانة لإخفاء الموقع مؤقتاً"
            />
            
            {editedSettings.maintenance.enabled && (
              <>
                <TextareaField
                  label="رسالة الصيانة"
                  value={editedSettings.maintenance.message}
                  onChange={(value) => updateSetting('maintenance.message', value)}
                  placeholder="الموقع تحت الصيانة، سنعود قريباً..."
                  description="الرسالة التي ستظهر للزوار أثناء الصيانة"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عناوين IP المسموحة
                  </label>
                  <textarea
                    value={editedSettings.maintenance.allowedIPs.join('\n')}
                    onChange={(e) => updateSetting('maintenance.allowedIPs', e.target.value.split('\n').filter(ip => ip.trim()))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="192.168.1.1\n10.0.0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    عناوين IP التي يمكنها الوصول للموقع أثناء الصيانة (كل عنوان في سطر منفصل)
                  </p>
                </div>
              </>
            )}
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <Icon name="construction" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">قيد التطوير</h3>
            <p className="text-gray-500">هذا القسم قيد التطوير وسيكون متاحاً قريباً.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* رأس الصفحة */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>
            <p className="text-gray-600 mt-1">إدارة الإعدادات العامة للموقع</p>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              إلغاء
            </button>
            
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Icon name="loader" size={16} className="animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                'حفظ التغييرات'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* الشريط الجانبي */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <SettingsTab
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;