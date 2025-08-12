import React, { useState, useCallback, useRef } from 'react';
import { Icon } from '../../components/ui/IconRegistry';
// import { useMediaStore } from '../../store/mediaStore';

// أنواع البيانات
interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video' | 'document' | 'audio';
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  uploadedBy: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// interface MediaCategory {
//   id: string;
//   name: string;
//   description?: string;
//   icon: string;
//   color: string;
//   count: number;
// }

// خصائص المكون
interface MediaManagerProps {
  mode?: 'select' | 'manage';
  allowedTypes?: string[];
  maxFiles?: number;
  onSelect?: (files: MediaFile[]) => void;
  onClose?: () => void;
}

// مكون عرض الملف
const MediaFileCard: React.FC<{
  file: MediaFile;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  mode: 'select' | 'manage';
}> = ({ file, selected, onSelect, onEdit, onDelete, mode }) => {
  const [imageError, setImageError] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    switch (file.type) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'document':
        return 'file-text';
      case 'audio':
        return 'music';
      default:
        return 'file';
    }
  };

  return (
    <div
      className={`
        relative group bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all
        ${selected 
          ? 'border-blue-500 ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={onSelect}
    >
      {/* معاينة الملف */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {file.type === 'image' && !imageError ? (
          <img
            src={file.thumbnailUrl || file.url}
            alt={file.alt || file.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <Icon name={getFileIcon()} size={48} className="text-gray-400" />
        )}
      </div>

      {/* معلومات الملف */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
          {file.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatFileSize(file.size)}
        </p>
        {file.dimensions && (
          <p className="text-xs text-gray-500">
            {file.dimensions.width} × {file.dimensions.height}
          </p>
        )}
      </div>

      {/* أزرار الإجراءات */}
      {mode === 'manage' && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-1 space-x-reverse">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              title="تعديل"
            >
              <Icon name="edit" size={14} className="text-gray-600" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 bg-white rounded-md shadow-sm hover:bg-red-50 transition-colors"
              title="حذف"
            >
              <Icon name="trash" size={14} className="text-red-600" />
            </button>
          </div>
        </div>
      )}

      {/* علامة التحديد */}
      {selected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Icon name="check" size={14} className="text-white" />
          </div>
        </div>
      )}

      {/* شارة النوع */}
      <div className="absolute bottom-2 right-2">
        <span className="px-2 py-1 text-xs bg-black bg-opacity-75 text-white rounded">
          {file.type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

// مكون رفع الملفات
const FileUploader: React.FC<{
  onUpload: (files: File[]) => void;
  allowedTypes?: string[];
  maxFiles?: number;
}> = ({ onUpload, allowedTypes, maxFiles = 10 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files.slice(0, maxFiles));
    }
  }, [onUpload, maxFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files.slice(0, maxFiles));
    }
    // إعادة تعيين قيمة الإدخال
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onUpload, maxFiles]);

  const acceptedTypes = allowedTypes?.join(',') || 'image/*,video/*,.pdf,.doc,.docx';

  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Icon name="upload" size={48} className="mx-auto text-gray-400 mb-4" />
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        اسحب الملفات هنا أو انقر للتحديد
      </h3>
      
      <p className="text-gray-500 mb-4">
        يمكنك رفع حتى {maxFiles} ملف في المرة الواحدة
      </p>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
      >
        اختر الملفات
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {allowedTypes && (
        <p className="text-xs text-gray-400 mt-2">
          الأنواع المدعومة: {allowedTypes.join(', ')}
        </p>
      )}
    </div>
  );
};

// مكون تحرير الملف
const FileEditor: React.FC<{
  file: MediaFile;
  onSave: (file: MediaFile) => void;
  onCancel: () => void;
}> = ({ file, onSave, onCancel }) => {
  const [editedFile, setEditedFile] = useState<MediaFile>(file);

  const handleSave = () => {
    onSave(editedFile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">تحرير الملف</h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <Icon name="x" size={20} />
            </button>
          </div>

          {/* معاينة الملف */}
          <div className="mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.alt || file.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <Icon name="file" size={64} className="text-gray-400" />
              )}
            </div>
          </div>

          {/* نموذج التحرير */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الملف
              </label>
              <input
                type="text"
                value={editedFile.name}
                onChange={(e) => setEditedFile({ ...editedFile, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النص البديل (Alt Text)
              </label>
              <input
                type="text"
                value={editedFile.alt || ''}
                onChange={(e) => setEditedFile({ ...editedFile, alt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="وصف الصورة للمكفوفين ومحركات البحث"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                التعليق
              </label>
              <textarea
                value={editedFile.caption || ''}
                onChange={(e) => setEditedFile({ ...editedFile, caption: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="تعليق أو وصف للملف"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة
              </label>
              <select
                value={editedFile.category}
                onChange={(e) => setEditedFile({ ...editedFile, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">عام</option>
                <option value="hero">الصور الرئيسية</option>
                <option value="services">الخدمات</option>
                <option value="portfolio">معرض الأعمال</option>
                <option value="team">الفريق</option>
                <option value="branding">العلامة التجارية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العلامات
              </label>
              <input
                type="text"
                value={editedFile.tags.join(', ')}
                onChange={(e) => setEditedFile({ 
                  ...editedFile, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="تكييف، صيانة، تركيب (افصل بفاصلة)"
              />
            </div>

            {/* إعدادات SEO */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">إعدادات SEO</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان SEO
                  </label>
                  <input
                    type="text"
                    value={editedFile.seo?.title || ''}
                    onChange={(e) => setEditedFile({ 
                      ...editedFile, 
                      seo: { ...editedFile.seo, title: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="عنوان محسن لمحركات البحث"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وصف SEO
                  </label>
                  <textarea
                    value={editedFile.seo?.description || ''}
                    onChange={(e) => setEditedFile({ 
                      ...editedFile, 
                      seo: { ...editedFile.seo, description: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="وصف محسن لمحركات البحث"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* أزرار الحفظ والإلغاء */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6 pt-6 border-t">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              إلغاء
            </button>
            
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// المكون الرئيسي
export const MediaManager: React.FC<MediaManagerProps> = ({
  mode = 'manage',
  allowedTypes,
  maxFiles = 1,
  onSelect,
  onClose
}) => {
  // const { files, categories, uploadFiles, updateFile, deleteFile } = useMediaStore();
  const files: MediaFile[] = [];
  const categories: any[] = [];
  const uploadFiles = (_files: any) => {};
  const updateFile = (_id: string, _data: any) => {};
  const deleteFile = (_id: string) => {};
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // تصفية الملفات
  const filteredFiles = files.filter(file => {
    const matchesCategory = currentCategory === 'all' || file.category === currentCategory;
    const matchesSearch = searchQuery === '' || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !allowedTypes || allowedTypes.includes(file.type);
    
    return matchesCategory && matchesSearch && matchesType;
  });

  // رفع الملفات
  const handleUpload = useCallback(async (newFiles: File[]) => {
    setIsUploading(true);
    try {
      await uploadFiles(newFiles);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  }, [uploadFiles]);

  // تحديد الملفات
  const handleFileSelect = useCallback((fileId: string) => {
    if (mode === 'select') {
      if (maxFiles === 1) {
        setSelectedFiles([fileId]);
      } else {
        setSelectedFiles(prev => 
          prev.includes(fileId)
            ? prev.filter(id => id !== fileId)
            : prev.length < maxFiles
            ? [...prev, fileId]
            : prev
        );
      }
    }
  }, [mode, maxFiles]);

  // تأكيد التحديد
  const handleConfirmSelection = useCallback(() => {
    if (onSelect) {
      const selected = files.filter(file => selectedFiles.includes(file.id));
      onSelect(selected);
    }
  }, [files, selectedFiles, onSelect]);

  // حذف الملف
  const handleDeleteFile = useCallback(async (fileId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      try {
        await deleteFile(fileId);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }, [deleteFile]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* رأس الصفحة */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === 'select' ? 'اختيار الوسائط' : 'إدارة الوسائط'}
            </h1>
            <p className="text-gray-600 mt-1">
              {mode === 'select' 
                ? `اختر ${maxFiles === 1 ? 'ملف واحد' : `حتى ${maxFiles} ملفات`}`
                : 'رفع وإدارة الصور والملفات'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            {mode === 'select' && (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  إلغاء
                </button>
                
                <button
                  onClick={handleConfirmSelection}
                  disabled={selectedFiles.length === 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  تأكيد التحديد ({selectedFiles.length})
                </button>
              </>
            )}
            
            {/* أزرار العرض */}
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                title="عرض شبكي"
              >
                <Icon name="grid" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                title="عرض قائمة"
              >
                <Icon name="list" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* الشريط الجانبي */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">الفئات</h3>
            
            <nav className="space-y-1">
              <button
                onClick={() => setCurrentCategory('all')}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-right rounded-md transition-colors
                  ${currentCategory === 'all' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <span>جميع الملفات</span>
                <span className="text-sm text-gray-500">{files.length}</span>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setCurrentCategory(category.id)}
                  className={`
                    flex items-center justify-between w-full px-3 py-2 text-right rounded-md transition-colors
                    ${currentCategory === category.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Icon name={category.icon} size={16} />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* البحث */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">البحث</h3>
            
            <div className="relative">
              <Icon name="search" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="البحث في الملفات..."
              />
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1">
          {/* منطقة الرفع */}
          {mode === 'manage' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <FileUploader
                onUpload={handleUpload}
                allowedTypes={allowedTypes}
                maxFiles={10}
              />
              
              {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                  <Icon name="loader" size={20} className="animate-spin ml-2" />
                  <span className="text-gray-600">جاري رفع الملفات...</span>
                </div>
              )}
            </div>
          )}

          {/* عرض الملفات */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="image" size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد ملفات</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? 'لم يتم العثور على ملفات تطابق البحث'
                    : 'ابدأ برفع الملفات الأولى'
                  }
                </p>
              </div>
            ) : (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                  : 'space-y-2'
                }
              `}>
                {filteredFiles.map((file) => (
                  <MediaFileCard
                    key={file.id}
                    file={file}
                    selected={selectedFiles.includes(file.id)}
                    onSelect={() => handleFileSelect(file.id)}
                    onEdit={() => setEditingFile(file)}
                    onDelete={() => handleDeleteFile(file.id)}
                    mode={mode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* محرر الملف */}
      {editingFile && (
        <FileEditor
          file={editingFile}
          onSave={async (updatedFile) => {
            await updateFile(updatedFile.id, updatedFile);
            setEditingFile(null);
          }}
          onCancel={() => setEditingFile(null)}
        />
      )}
    </div>
  );
};

export default MediaManager;