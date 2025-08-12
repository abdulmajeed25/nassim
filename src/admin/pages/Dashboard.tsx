import React from 'react';
import { FileText, Image, Eye, TrendingUp, Calendar } from 'lucide-react';
import Layout from '../shared/Layout';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'إجمالي الصفحات',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'المقالات المنشورة',
      value: '8',
      change: '+1',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'ملفات الوسائط',
      value: '45',
      change: '+5',
      changeType: 'increase',
      icon: Image,
      color: 'bg-purple-500'
    },
    {
      title: 'الزيارات الشهرية',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Eye,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      action: 'تم تحديث صفحة الخدمات',
      item: 'إضافة خدمة صيانة الوحدات المركزية',
      time: 'منذ 3 ساعات',
      user: 'م. أحمد النسيم'
    },
    {
      action: 'تم نشر مقال جديد',
      item: 'دليل شامل لصيانة المكيفات قبل فصل الصيف',
      time: 'منذ 6 ساعات',
      user: 'أ. سارة المطيري'
    },
    {
      action: 'تم تحديث معلومات الاتصال',
      item: 'إضافة رقم الواتساب الجديد',
      time: 'منذ يوم واحد',
      user: 'إدارة شركة نسيم'
    },
    {
      action: 'تم إضافة شهادة عميل جديدة',
      item: 'تقييم من عميل في حي الملقا',
      time: 'منذ يومين',
      user: 'فريق خدمة العملاء'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك في نظام إدارة المحتوى</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="mr-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`mr-2 text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/nasim/admin/pages/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-600 ml-3" />
              <span className="font-medium">إنشاء صفحة جديدة</span>
            </a>
            <a
              href="/nasim/admin/posts"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-green-600 ml-3" />
              <span className="font-medium">إدارة المقالات</span>
            </a>
            <a
              href="/nasim/admin/pages"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-5 h-5 text-purple-600 ml-3" />
              <span className="font-medium">إدارة الصفحات</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">النشاط الأخير</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{activity.time}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">إجراءات سريعة</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">صفحة جديدة</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">مقال جديد</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">رفع صورة</p>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                  <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">التقارير</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 ml-2" />
              <h2 className="text-lg font-medium text-gray-900">المهام القادمة</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>لا توجد مهام مجدولة</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;