import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Save, Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Palette, Shield, Database } from 'lucide-react';
import type { SiteSettings } from '../../types';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'تقنية النسيم',
    siteDescription: 'شركة متخصصة في صيانة وتنظيف المكيفات',

    contact: {
      email: 'info@nasim-tech.com',
      phone: '+966501234567',
      address: 'الرياض، المملكة العربية السعودية'
    },
    social: {
      facebook: 'https://facebook.com/nasimtech',
      twitter: 'https://twitter.com/nasimtech',
      instagram: 'https://instagram.com/nasimtech',
      linkedin: 'https://linkedin.com/company/nasimtech'
    },
    language: 'ar',
    direction: 'rtl',
    features: {
      enableComments: true,
      enableNewsletter: true,
      enableSearch: true,
      enableDarkMode: false,
      enableRTL: true
    },
    maintenance: {
      enabled: false,
      message: 'نحن نقوم بإجراء صيانة. سنعود قريباً!',
      allowedIPs: []
    },

    seo: {
      metaTitle: 'تقنية النسيم - صيانة وتنظيف المكيفات',
      metaDescription: 'شركة متخصصة في صيانة وتنظيف المكيفات بأحدث التقنيات وأفضل الأسعار',
      keywords: ['صيانة مكيفات', 'تنظيف مكيفات', 'تقنية النسيم']
    },
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      accentColor: '#F59E0B',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      borderRadius: '8px',
      fontFamily: 'Cairo, sans-serif',
      containerWidth: '1200px'
    }
  });
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const updateSettings = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const updateDirectSetting = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'general', label: 'عام', icon: Globe },
    { id: 'contact', label: 'معلومات الاتصال', icon: Phone },
    { id: 'social', label: 'وسائل التواصل', icon: Facebook },
    { id: 'seo', label: 'تحسين محركات البحث', icon: Database },
    { id: 'theme', label: 'المظهر', icon: Palette },
    { id: 'security', label: 'الأمان', icon: Shield }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اسم الموقع
        </label>
        <Input
          type="text"
          value={settings.siteName}
          onChange={(value) => updateDirectSetting('siteName', value)}
          placeholder="اسم الموقع"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          وصف الموقع
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateDirectSetting('siteDescription', e.target.value)}
          placeholder="وصف مختصر عن الموقع"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رابط الموقع
        </label>
        <Input
          type="url"
          value="https://nasim-tech.com"
          onChange={(value) => updateDirectSetting('siteUrl', value)}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني للإدارة
        </label>
        <Input
          type="email"
          value="admin@nasim-tech.com"
          onChange={(value) => updateDirectSetting('adminEmail', value)}
          placeholder="admin@example.com"
        />
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Phone className="w-4 h-4 inline ml-2" />
          رقم الهاتف
        </label>
        <Input
          type="tel"
          value={settings.contact.phone}
          onChange={(value) => updateSettings('contactInfo', 'phone', value)}
          placeholder="+966 50 123 4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 inline ml-2" />
          البريد الإلكتروني
        </label>
        <Input
          type="email"
          value={settings.contact.email}
          onChange={(value) => updateSettings('contactInfo', 'email', value)}
          placeholder="info@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline ml-2" />
          العنوان
        </label>
        <textarea
          value={settings.contact.address}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSettings('contactInfo', 'address', e.target.value)}
          placeholder="العنوان الكامل"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ساعات العمل
        </label>
        <Input
          type="text"
          value="الأحد - الخميس: 8:00 ص - 6:00 م"
          onChange={(value) => updateSettings('contactInfo', 'workingHours', value)}
          placeholder="السبت - الخميس: 8:00 ص - 6:00 م"
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Facebook className="w-4 h-4 inline ml-2" />
          فيسبوك
        </label>
        <Input
          type="url"
          value={settings.social.facebook}
          onChange={(value) => updateSettings('socialMedia', 'facebook', value)}
          placeholder="https://facebook.com/yourpage"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Twitter className="w-4 h-4 inline ml-2" />
          تويتر
        </label>
        <Input
          type="url"
          value={settings.social.twitter}
          onChange={(value) => updateSettings('socialMedia', 'twitter', value)}
          placeholder="https://twitter.com/yourhandle"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Instagram className="w-4 h-4 inline ml-2" />
          إنستغرام
        </label>
        <Input
          type="url"
          value={settings.social.instagram}
          onChange={(value) => updateSettings('socialMedia', 'instagram', value)}
          placeholder="https://instagram.com/yourhandle"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          لينكد إن
        </label>
        <Input
          type="url"
          value={settings.social.linkedin}
          onChange={(value) => updateSettings('socialMedia', 'linkedin', value)}
          placeholder="https://linkedin.com/company/yourcompany"
        />
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          عنوان الصفحة (Meta Title)
        </label>
        <Input
          type="text"
          value={settings.seo.metaTitle}
          onChange={(value) => updateSettings('seo', 'metaTitle', value)}
          placeholder="عنوان الصفحة في محركات البحث"
        />
        <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 60 حرف</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          وصف الصفحة (Meta Description)
        </label>
        <textarea
          value={settings.seo.metaDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSettings('seo', 'metaDescription', e.target.value)}
          placeholder="وصف الصفحة في محركات البحث"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">الحد الأقصى: 160 حرف</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الكلمات المفتاحية
        </label>
        <Input
          type="text"
          value={settings.seo.keywords?.join(', ') || ''}
          onChange={(value) => updateSettings('seo', 'keywords', value.split(', '))}
          placeholder="كلمة1, كلمة2, كلمة3"
        />
        <p className="text-xs text-gray-500 mt-1">افصل بين الكلمات بفاصلة ومسافة</p>
      </div>
    </div>
  );

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اللون الأساسي
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={settings.theme.primaryColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings('theme', 'primaryColor', e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <Input
            type="text"
            value={settings.theme.primaryColor}
            onChange={(value: string) => updateSettings('theme', 'primaryColor', value)}
            placeholder="#3B82F6"
            className="flex-1"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اللون الثانوي
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={settings.theme.secondaryColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings('theme', 'secondaryColor', e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <Input
            type="text"
            value={settings.theme.secondaryColor}
            onChange={(value: string) => updateSettings('theme', 'secondaryColor', value)}
            placeholder="#10B981"
            className="flex-1"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          لون التمييز
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={settings.theme.accentColor}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings('theme', 'accentColor', e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
          <Input
            type="text"
            value={settings.theme.accentColor}
            onChange={(value: string) => updateSettings('theme', 'accentColor', value)}
            placeholder="#F59E0B"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <Shield className="w-5 h-5 text-yellow-400 ml-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              إعدادات الأمان
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              هذه الإعدادات تؤثر على أمان الموقع. يرجى التعامل معها بحذر.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">تفعيل المصادقة الثنائية</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">تسجيل محاولات تسجيل الدخول</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            defaultChecked
            className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">تفعيل HTTPS</span>
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'social': return renderSocialSettings();
      case 'seo': return renderSEOSettings();
      case 'theme': return renderThemeSettings();
      case 'security': return renderSecuritySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <Layout>
      <div className="admin-panel">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-900">أقسام الإعدادات</h3>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-right p-3 rounded-md transition-colors flex items-center gap-3 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;