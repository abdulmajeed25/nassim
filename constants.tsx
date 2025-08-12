import type { Service } from './src/types';

export const WHATSAPP_NUMBER = "+966501234567";
export const PHONE_NUMBER = "+966501234567";
export const LANDLINE_NUMBER = "0112345678";

export const SERVICES: Service[] = [
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'صيانة دورية وشاملة',
    description: 'فحص كامل لجميع أجزاء المكيف لضمان أفضل أداء وتجنب الأعطال المفاجئة.',
    price: '150 ريال'
  },
  {
    id: 'cleaning',
    icon: '🧹',
    title: 'تنظيف عميق للوحدات',
    description: 'تنظيف الفلاتر والمكونات الداخلية والخارجية لتحسين جودة الهواء وكفاءة التبريد.',
    price: '100 ريال'
  },
  {
    id: 'gas-refill',
    icon: '❄️',
    title: 'تعبئة غاز الفريون',
    description: 'قياس وإعادة تعبئة غاز الفريون للوصول إلى مستوى التبريد المثالي.',
    price: '200 ريال'
  },
  {
    id: 'repair',
    icon: '🛠️',
    title: 'إصلاح جميع الأعطال',
    description: 'تشخيص دقيق وإصلاح احترافي لجميع المشاكل والأعطال في نظام التكييف.',
    price: '300 ريال'
  }
];