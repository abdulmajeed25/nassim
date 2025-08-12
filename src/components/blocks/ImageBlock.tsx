import React, { useState } from 'react';
import { ImageBlock as ImageBlockType } from '../../types';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageBlockProps {
  block: ImageBlockType;
  isEditing?: boolean;
  onUpdate?: (content: ImageBlockType['content']) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, isEditing, onUpdate }) => {
  const { content } = block;
  const { src, alt, caption, width, height } = content;
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdate) return;

    setIsUploading(true);
    
    try {
      // Create a temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      
      // In a real implementation, you would upload to your storage service
      // For now, we'll use the temporary URL
      onUpdate({
        ...content,
        src: tempUrl,
        alt: alt || file.name,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        alt: e.target.value,
      });
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        caption: e.target.value,
      });
    }
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: string) => {
    if (onUpdate) {
      const numValue = value ? parseInt(value) : undefined;
      onUpdate({
        ...content,
        [dimension]: numValue,
      });
    }
  };

  if (!src && isEditing) {
    return (
      <div className="image-block border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">اختر صورة لرفعها</p>
            <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4" />
              {isUploading ? 'جاري الرفع...' : 'رفع صورة'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (!src) {
    return null;
  }

  return (
    <div className="image-block relative group">
      {isEditing && (
        <div className="absolute -top-16 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              value={alt}
              onChange={handleAltChange}
              placeholder="النص البديل"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="text"
              value={caption || ''}
              onChange={handleCaptionChange}
              placeholder="التسمية التوضيحية"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="number"
              value={width || ''}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              placeholder="العرض"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="number"
              value={height || ''}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              placeholder="الارتفاع"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
          </div>
          <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded mt-2 cursor-pointer hover:bg-blue-700 transition-colors text-xs">
            <Upload className="w-3 h-3" />
            تغيير الصورة
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      )}
      
      <div className="text-center">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="max-w-full h-auto rounded-lg shadow-sm"
          style={{
            width: width ? `${width}px` : 'auto',
            height: height ? `${height}px` : 'auto',
          }}
        />
        {caption && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;