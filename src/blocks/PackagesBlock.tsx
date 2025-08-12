import React from 'react';
import { Check, Star, Phone, MessageCircle, Calendar, Shield, Clock } from 'lucide-react';
import { PackagesBlockData } from './schemas';

interface PackagesBlockProps {
  data: PackagesBlockData['data'];
  settings?: PackagesBlockData['settings'];
}

export const PackagesBlock: React.FC<PackagesBlockProps> = ({
  data
}) => {
  const {
    title = 'باقات الصيانة',
    subtitle,
    packages,
    showSavings = true,
    showComparison = true,

  } = data;
  const handlePackageSelect = (packageData: any) => {
    // Handle package selection - could open booking form or redirect
    if (packageData.button?.url) {
      if (packageData.button.url.startsWith('tel:') || packageData.button.url.startsWith('https://wa.me/')) {
        window.open(packageData.button.url, '_blank');
      } else {
        window.location.href = packageData.button.url;
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg: any) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 ml-1" />
                    الأكثر طلباً
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {pkg.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {pkg.price.amount}
                      </span>
                      <span className="text-lg text-gray-600 mr-2">
                        {pkg.price.currency}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {pkg.price.period}
                    </div>
                  </div>

                  {/* Savings Badge */}
                  {showSavings && pkg.savings && (
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      وفر {pkg.savings}
                    </div>
                  )}
                </div>

                {/* Package Features */}
                <div className="space-y-4 mb-8">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-blue-900">
                        {pkg.visits} زيارات
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-semibold text-green-900">
                        ضمان {pkg.warranty}
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-center justify-center p-3 bg-orange-50 rounded-lg mb-4">
                    <Clock className="w-5 h-5 text-orange-600 ml-2" />
                    <span className="text-sm font-semibold text-orange-900">
                      استجابة خلال {pkg.response}
                    </span>
                  </div>

                  {/* Services List */}
                  <div className="space-y-2">
                    {pkg.services.map((service: any, serviceIndex: number) => (
                      <div key={serviceIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  disabled={false}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } hover:shadow-lg`}
                >
                  {pkg.button.text}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {showComparison && packages.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h3 className="text-xl font-bold text-gray-900 text-center">
                مقارنة الباقات
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      المميزات
                    </th>
                    {packages.map((pkg: any) => (
                      <th key={pkg.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      عدد الزيارات السنوية
                    </td>
                    {packages.map((pkg: any) => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-sm text-gray-700">
                        {pkg.visits}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      فترة الضمان
                    </td>
                    {packages.map((pkg: any) => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-sm text-gray-700">
                        {pkg.warranty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      وقت الاستجابة
                    </td>
                    {packages.map((pkg: any) => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-sm text-gray-700">
                        {pkg.response}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      السعر السنوي
                    </td>
                    {packages.map((pkg: any) => (
                      <td key={pkg.id} className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                        {pkg.price.amount} {pkg.price.currency}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            هل تحتاج باقة مخصصة؟ تواصل معنا لنصمم لك الباقة المناسبة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+966501234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا
            </a>
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};