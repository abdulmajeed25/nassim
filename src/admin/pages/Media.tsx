import React, { useState } from 'react';
import Layout from '../shared/Layout';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Upload, Search, Grid, List, Trash2, Download, Eye, Image, File, Video } from 'lucide-react';
import type { MediaFile } from '../../types';

const Media: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      url: '/images/hero-bg.jpg',
      type: 'image',
      size: 1024000,
      uploadedAt: new Date(),
      createdAt: new Date(),
      alt: 'صورة البطل الرئيسية'
    },
    {
      id: '2',
      name: 'service-icon.svg',
      url: '/images/service-icon.svg',
      type: 'image',
      size: 5120,
      uploadedAt: new Date(),
      createdAt: new Date(),
      alt: 'أيقونة الخدمة'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setMediaFiles(mediaFiles.filter(file => file.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getFileTypeText = (type: string) => {
    switch (type) {
      case 'image': return 'صورة';
      case 'video': return 'فيديو';
      case 'document': return 'مستند';
      default: return 'ملف';
    }
  };

  return (
    <Layout>
      <div className="admin-panel">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">مكتبة الوسائط</h1>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            رفع ملفات
          </Button>
        </div>

        {/* Filters and View Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="البحث في الملفات..."
                  value={searchTerm}
                  onChange={(value: string) => setSearchTerm(value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الأنواع</option>
                <option value="image">الصور</option>
                <option value="video">الفيديو</option>
                <option value="document">المستندات</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-1"
              >
                <Grid className="w-4 h-4" />
                شبكة
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-1"
              >
                <List className="w-4 h-4" />
                قائمة
              </Button>
            </div>
          </div>
        </div>

        {/* Media Files */}
        <div className="bg-white rounded-lg shadow-sm border">
          {filteredFiles.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="mb-4">
                <Upload className="w-12 h-12 mx-auto text-gray-300" />
              </div>
              <p>لا توجد ملفات متاحة</p>
              <Button className="mt-4 flex items-center gap-2 mx-auto">
                <Upload className="w-4 h-4" />
                رفع أول ملف
              </Button>
            </div>
          ) : (
            <div className="p-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="group relative border rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatFileSize(file.size)}
                      </div>
                      
                      {/* Actions overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="bg-white text-gray-700">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white text-gray-700">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-white text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الملف
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          النوع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحجم
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ الرفع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFiles.map((file) => (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center ml-3">
                                {file.type === 'image' ? (
                                  <img
                                    src={file.url}
                                    alt={file.alt}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                ) : (
                                  <div className="text-gray-400">
                                    {getFileIcon(file.type)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {file.name}
                                </div>
                                {file.alt && (
                                  <div className="text-sm text-gray-500">
                                    {file.alt}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getFileIcon(file.type)}
                              <span className="mr-2 text-sm text-gray-900">
                                {getFileTypeText(file.type)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {file.uploadedAt.toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                عرض
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                تحميل
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                onClick={() => handleDelete(file.id)}
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Media;