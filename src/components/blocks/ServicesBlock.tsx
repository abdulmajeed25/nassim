import React from 'react';
import { ServicesBlock as ServicesBlockType } from '../../types';
import { Plus, Trash2, Upload, Wrench, Shield, Clock, Star } from 'lucide-react';

interface ServicesBlockProps {
  block: ServicesBlockType;
  isEditing?: boolean;
  onUpdate?: (content: ServicesBlockType['content']) => void;
}

const ServicesBlock: React.FC<ServicesBlockProps> = ({ block, isEditing, onUpdate }) => {
  const { content } = block;
  const { title, services } = content;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        title: e.target.value,
      });
    }
  };

  const addService = () => {
    if (onUpdate) {
      const newServices = [
        ...services,
        {
          id: Date.now().toString(),
          title: 'خدمة جديدة',
          description: 'وصف الخدمة',
          icon: 'wrench',
        },
      ];
      onUpdate({
        ...content,
        services: newServices,
      });
    }
  };

  const updateService = (index: number, updates: Partial<ServicesBlockType['content']['services'][0]>) => {
    if (onUpdate) {
      const newServices = services.map((service, i) =>
        i === index ? { ...service, ...updates } : service
      );
      onUpdate({
        ...content,
        services: newServices,
      });
    }
  };

  const removeService = (index: number) => {
    if (onUpdate) {
      const newServices = services.filter((_, i) => i !== index);
      onUpdate({
        ...content,
        services: newServices,
      });
    }
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const tempUrl = URL.createObjectURL(file);
      updateService(index, { image: tempUrl });
    } catch (error) {
      console.error('Error uploading service image:', error);
    }
  };

  const getIcon = (iconName?: string) => {
    const iconProps = { className: 'w-8 h-8' };
    
    switch (iconName) {
      case 'wrench':
        return <Wrench {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'clock':
        return <Clock {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  return (
    <div className="services-block relative group py-16 px-4">
      {isEditing && (
        <div className="absolute -top-12 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="flex gap-2 items-center text-xs">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="عنوان القسم"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent flex-1"
            />
            <button
              onClick={addService}
              className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
              إضافة خدمة
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none text-center w-full"
              placeholder="عنوان القسم"
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative group/service bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {isEditing && (
                <div className="absolute -top-16 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 opacity-0 group-hover/service:opacity-100 transition-opacity z-20">
                  <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(index, { title: e.target.value })}
                      className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
                      placeholder="عنوان الخدمة"
                    />
                    <select
                      value={service.icon || 'wrench'}
                      onChange={(e) => updateService(index, { icon: e.target.value })}
                      className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
                    >
                      <option value="wrench">أدوات</option>
                      <option value="shield">حماية</option>
                      <option value="clock">وقت</option>
                      <option value="star">نجمة</option>
                    </select>
                  </div>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(index, { description: e.target.value })}
                    className="w-full px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-xs resize-none"
                    rows={2}
                    placeholder="وصف الخدمة"
                  />
                  <div className="flex gap-1 mt-1">
                    <label className="inline-flex items-center gap-1 bg-blue-600 text-white px-1 py-0.5 rounded cursor-pointer hover:bg-blue-700 transition-colors text-xs">
                      <Upload className="w-2 h-2" />
                      صورة
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => removeService(index)}
                      className="p-0.5 text-red-600 hover:bg-red-100 rounded text-xs"
                    >
                      <Trash2 className="w-2 h-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Service Image or Icon */}
              <div className="text-center mb-4">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {getIcon(service.icon)}
                  </div>
                )}
              </div>
              
              {/* Service Content */}
              <div className="text-center">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(index, { title: e.target.value })}
                      className="text-xl font-semibold text-gray-900 dark:text-white bg-transparent border-none outline-none text-center w-full mb-2"
                      placeholder="عنوان الخدمة"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(index, { description: e.target.value })}
                      className="text-gray-600 dark:text-gray-300 bg-transparent border-none outline-none text-center w-full resize-none"
                      rows={3}
                      placeholder="وصف الخدمة"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Service Button (when editing and no services) */}
        {isEditing && services.length === 0 && (
          <div className="text-center py-12">
            <button
              onClick={addService}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              إضافة أول خدمة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesBlock;