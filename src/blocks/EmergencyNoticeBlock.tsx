import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, AlertTriangle, X } from 'lucide-react';
interface EmergencyNoticeBlockProps {
  title: string;
  message: string;
  phone: string;
  whatsapp: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  showPulse: boolean;
  autoHide: boolean;
  hideAfter: number;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
  blockId?: string;
  isPreview?: boolean;
  settings?: any;
}

export const EmergencyNoticeBlock: React.FC<EmergencyNoticeBlockProps> = ({
  title = 'خدمة الطوارئ 24/7',
  message,
  phone,
  whatsapp,
  urgencyLevel = 'high',
  showPulse = true,
  autoHide = false,
  hideAfter = 30000,
  isPreview = false,

}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(hideAfter / 1000);

  useEffect(() => {
    if (autoHide && !isPreview) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideAfter);

      const countdown = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
    }
  }, [autoHide, hideAfter, isPreview]);

  if (!isVisible && !isPreview) {
    return null;
  }

  const urgencyColors = {
    low: 'bg-blue-50 border-blue-200 text-blue-900',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    high: 'bg-orange-50 border-orange-200 text-orange-900',
    critical: 'bg-red-50 border-red-200 text-red-900'
  };

  const urgencyIcons = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600'
  };

  const pulseClass = showPulse ? 'animate-pulse' : '';

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 ${urgencyColors[urgencyLevel]} border-2 rounded-lg shadow-lg`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 space-x-reverse flex-1">
            <div className={`${urgencyIcons[urgencyLevel]} ${pulseClass}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="text-sm mb-3">{message}</p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Phone Button */}
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 ml-2" />
                  اتصل الآن: {phone}
                </a>
                
                {/* WhatsApp Button */}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-sm"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    واتساب
                  </a>
                )}
              </div>
              
              {/* Auto-hide countdown */}
              {autoHide && timeLeft > 0 && (
                <div className="mt-2 text-xs opacity-75">
                  سيختفي هذا الإشعار خلال {timeLeft} ثانية
                </div>
              )}
            </div>
          </div>
          
          {/* Close Button */}
          {!isPreview && (
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Progress bar for auto-hide */}
      {autoHide && timeLeft > 0 && (
        <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-current transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / (hideAfter / 1000)) * 100}%` }}
          />
        </div>
      )}
      
      {/* Preview Mode Indicator */}
      {isPreview && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          معاينة
        </div>
      )}
    </div>
  );
};