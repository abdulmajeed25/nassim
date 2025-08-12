import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { GuaranteesBlockData } from './schemas';

type Guarantee = GuaranteesBlockData['data']['guarantees'][number];

interface GuaranteesBlockProps {
  title: string;
  guarantees: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    duration?: string;
    terms?: string[];
  }>;
  layout: 'grid' | 'list' | 'timeline';
  showIcons: boolean;
  showTerms: boolean;
  blockId?: string;
  isPreview?: boolean;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
  settings?: any;
}

export const GuaranteesBlock: React.FC<GuaranteesBlockProps> = ({
  title = 'ضماناتنا',
  guarantees,
  layout = 'grid',
  showIcons = true,
  showTerms = false,

}) => {
  const [expandedTerms, setExpandedTerms] = useState<{[key: string]: boolean}>({});

  const toggleTerms = (guaranteeId: string) => {
    setExpandedTerms(prev => ({
      ...prev,
      [guaranteeId]: !prev[guaranteeId]
    }));
  };

  const getIcon = (iconName: string) => {
    const icons: {[key: string]: React.ReactNode} = {
      shield: <Shield className="w-8 h-8" />,
      check: <CheckCircle className="w-8 h-8" />,
      clock: <Clock className="w-8 h-8" />,
      file: <FileText className="w-8 h-8" />,
    };
    return icons[iconName] || <Shield className="w-8 h-8" />;
  };

  const GuaranteeCard = ({ guarantee }: { guarantee: Guarantee }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Icon */}
      {showIcons && (
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            {getIcon(guarantee.icon)}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {guarantee.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {guarantee.description}
        </p>
        
        {/* Duration */}
        {guarantee.duration && (
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <Clock className="w-4 h-4 ml-1" />
            {guarantee.duration}
          </div>
        )}
        
        {/* Terms */}
        {showTerms && guarantee.terms && guarantee.terms.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleTerms(guarantee.id)}
              className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              <span>شروط الضمان</span>
              {expandedTerms[guarantee.id] ? (
                <ChevronUp className="w-4 h-4 mr-1" />
              ) : (
                <ChevronDown className="w-4 h-4 mr-1" />
              )}
            </button>
            
            {expandedTerms[guarantee.id] && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-right">
                <ul className="space-y-2 text-sm text-gray-700">
                  {guarantee.terms.map((term: string, termIndex: number) => (
                    <li key={termIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const TimelineItem = ({ guarantee, index }: { guarantee: Guarantee; index: number }) => (
    <div className="flex items-start">
      {/* Timeline Line */}
      <div className="flex flex-col items-center ml-6">
        <div className="bg-blue-600 text-white p-3 rounded-full">
          {showIcons && getIcon(guarantee.icon)}
        </div>
        {index < guarantees.length - 1 && (
          <div className="w-0.5 h-16 bg-blue-200 mt-4"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6 mr-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {guarantee.title}
        </h3>
        <p className="text-gray-600 mb-3">
          {guarantee.description}
        </p>
        
        {guarantee.duration && (
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4 ml-1" />
            {guarantee.duration}
          </div>
        )}
      </div>
    </div>
  );

  const ListItem = ({ guarantee }: { guarantee: Guarantee }) => (
    <div className="flex items-start p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Icon */}
      {showIcons && (
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full ml-4 flex-shrink-0">
          {getIcon(guarantee.icon)}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">
            {guarantee.title}
          </h3>
          {guarantee.duration && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {guarantee.duration}
            </span>
          )}
        </div>
        <p className="text-gray-600">
          {guarantee.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن نقف وراء جودة خدماتنا بضمانات شاملة لراحة بالك
          </p>
        </div>

        {/* Guarantees Content */}
        {layout === 'timeline' ? (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {guarantees.map((guarantee: Guarantee, index: number) => (
                <TimelineItem key={guarantee.id} guarantee={guarantee} index={index} />
              ))}
            </div>
          </div>
        ) : layout === 'list' ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {guarantees.map((guarantee: Guarantee) => (
              <ListItem key={guarantee.id} guarantee={guarantee} />
            ))}
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guarantees.map((guarantee: Guarantee) => (
              <GuaranteeCard key={guarantee.id} guarantee={guarantee} />
            ))}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              لماذا تثق في ضماناتنا؟
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">ضمان مكتوب</h4>
              <p className="text-gray-600 text-sm">
                جميع ضماناتنا مكتوبة ومؤرخة مع تفاصيل واضحة
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">خبرة 15+ سنة</h4>
              <p className="text-gray-600 text-sm">
                خبرة طويلة في مجال صيانة المكيفات تضمن جودة الخدمة
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">استجابة سريعة</h4>
              <p className="text-gray-600 text-sm">
                نلتزم بأوقات الاستجابة المحددة في جميع ضماناتنا
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              هل لديك استفسار حول الضمانات؟
            </h3>
            <p className="mb-6 opacity-90">
              فريق خدمة العملاء جاهز للإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966501234567"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                اتصل بنا الآن
              </a>
              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};