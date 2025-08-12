import React from 'react';
import { HeroBlock as HeroBlockType } from '../../types';
import { Upload, Plus, Trash2 } from 'lucide-react';

interface HeroBlockProps {
  block: HeroBlockType;
  isEditing?: boolean;
  onUpdate?: (content: HeroBlockType['content']) => void;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ block, isEditing, onUpdate }) => {
  const { content } = block;
  const { title, subtitle, backgroundImage, backgroundColor, textAlign, buttons } = content;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        title: e.target.value,
      });
    }
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        subtitle: e.target.value,
      });
    }
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        backgroundColor: e.target.value,
      });
    }
  };

  const handleTextAlignChange = (newAlign: HeroBlockType['content']['textAlign']) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        textAlign: newAlign,
      });
    }
  };

  const handleBackgroundImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdate) return;

    try {
      const tempUrl = URL.createObjectURL(file);
      onUpdate({
        ...content,
        backgroundImage: tempUrl,
      });
    } catch (error) {
      console.error('Error uploading background image:', error);
    }
  };

  const addButton = () => {
    if (onUpdate) {
      const newButtons = [
        ...(buttons || []),
        {
          text: 'زر جديد',
          url: '#',
          variant: 'primary' as const,
        },
      ];
      onUpdate({
        ...content,
        buttons: newButtons,
      });
    }
  };

  const updateButton = (index: number, updates: Partial<NonNullable<HeroBlockType['content']['buttons']>[0]>) => {
    if (onUpdate && buttons) {
      const newButtons = buttons.map((button, i) =>
        i === index ? { ...button, ...updates } : button
      );
      onUpdate({
        ...content,
        buttons: newButtons,
      });
    }
  };

  const removeButton = (index: number) => {
    if (onUpdate && buttons) {
      const newButtons = buttons.filter((_, i) => i !== index);
      onUpdate({
        ...content,
        buttons: newButtons,
      });
    }
  };

  const getTextAlignClass = () => {
    switch (textAlign) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  const heroStyle: React.CSSProperties = {
    backgroundColor: backgroundColor || '#f8fafc',
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="hero-block relative group">
      {isEditing && (
        <div className="absolute -top-16 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="grid grid-cols-3 gap-2 text-xs mb-2">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="العنوان الرئيسي"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="text"
              value={subtitle || ''}
              onChange={handleSubtitleChange}
              placeholder="العنوان الفرعي"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="color"
              value={backgroundColor || '#f8fafc'}
              onChange={handleBackgroundColorChange}
              className="w-full h-8 border border-gray-300 dark:border-gray-600 rounded"
            />
          </div>
          
          <div className="flex gap-2 items-center text-xs">
            <select
              value={textAlign}
              onChange={(e) => handleTextAlignChange(e.target.value as HeroBlockType['content']['textAlign'])}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            >
              <option value="left">يسار</option>
              <option value="center">وسط</option>
              <option value="right">يمين</option>
            </select>
            
            <label className="inline-flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition-colors">
              <Upload className="w-3 h-3" />
              صورة خلفية
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="hidden"
              />
            </label>
            
            <button
              onClick={addButton}
              className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
              إضافة زر
            </button>
          </div>
        </div>
      )}
      
      <div
        className="relative min-h-[400px] flex items-center justify-center py-16 px-4"
        style={heroStyle}
      >
        {/* Overlay for better text readability */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        )}
        
        <div className={`relative z-10 max-w-4xl mx-auto ${getTextAlignClass()}`}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full text-4xl md:text-6xl font-bold text-white bg-transparent border-none outline-none placeholder-gray-300 text-center"
                placeholder="العنوان الرئيسي"
              />
              {subtitle !== undefined && (
                <input
                  type="text"
                  value={subtitle}
                  onChange={handleSubtitleChange}
                  className="w-full text-xl md:text-2xl text-white bg-transparent border-none outline-none placeholder-gray-300 text-center mt-4"
                  placeholder="العنوان الفرعي"
                />
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl md:text-2xl text-white mb-8">
                  {subtitle}
                </p>
              )}
            </>
          )}
          
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              {buttons.map((button, index) => (
                <div key={index} className="relative group/button">
                  {isEditing && (
                    <div className="absolute -top-12 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 opacity-0 group-hover/button:opacity-100 transition-opacity z-20">
                      <div className="flex gap-1 text-xs">
                        <input
                          type="text"
                          value={button.text}
                          onChange={(e) => updateButton(index, { text: e.target.value })}
                          className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent flex-1"
                        />
                        <input
                          type="url"
                          value={button.url}
                          onChange={(e) => updateButton(index, { url: e.target.value })}
                          className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent flex-1"
                        />
                        <select
                          value={button.variant}
                          onChange={(e) => updateButton(index, { variant: e.target.value as 'primary' | 'secondary' })}
                          className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
                        >
                          <option value="primary">أساسي</option>
                          <option value="secondary">ثانوي</option>
                        </select>
                        <button
                          onClick={() => removeButton(index)}
                          className="p-0.5 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <a
                    href={button.url}
                    className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      button.variant === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {button.text}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBlock;