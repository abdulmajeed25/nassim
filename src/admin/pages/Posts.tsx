import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import type { Post } from '../../types';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'مقال تجريبي عن صيانة المكيفات',
      content: 'محتوى المقال هنا...',
      excerpt: 'مقدمة قصيرة عن المقال',
      slug: 'maintenance-article',
      status: 'published',
      featuredImage: '',
      author: 'المدير',
      category: 'صيانة',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['صيانة', 'مكيفات'],
      seo: {
        ogTitle: 'مقال تجريبي عن صيانة المكيفات',
        ogDescription: 'مقدمة قصيرة عن المقال',
        keywords: ['صيانة', 'مكيفات']
      }
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  return (
    <Layout>
      <div className="admin-panel">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">المقالات</h1>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            مقال جديد
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="البحث في المقالات..."
                  value={searchTerm}
                  onChange={(value: string) => setSearchTerm(value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
                <option value="archived">مؤرشف</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border">
          {filteredPosts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="mb-4">
                <Edit className="w-12 h-12 mx-auto text-gray-300" />
              </div>
              <p>لا توجد مقالات متاحة</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العنوان
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكاتب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ النشر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 ml-2" />
                          <span className="text-sm text-gray-900">{post.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getStatusColor(post.status)
                        }`}>
                          {getStatusText(post.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 ml-2" />
                          {post.createdAt?.toLocaleDateString('ar-SA')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            عرض
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            تحرير
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;