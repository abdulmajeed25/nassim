import React from 'react';
import { ButtonBlock as ButtonBlockType } from '../../types';
import { ExternalLink } from 'lucide-react';

interface ButtonBlockProps {
  block: ButtonBlockType;
  isEditing?: boolean;
  onUpdate?: (content: ButtonBlockType['content']) => void;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ block, isEditing, onUpdate }) => {
  const { content } = block;
  const { text, url, variant, size, target } = content;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        text: e.target.value,
      });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        url: e.target.value,
      });
    }
  };

  const handleVariantChange = (newVariant: ButtonBlockType['content']['variant']) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        variant: newVariant,
      });
    }
  };

  const handleSizeChange = (newSize: ButtonBlockType['content']['size']) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        size: newSize,
      });
    }
  };

  const handleTargetChange = (newTarget: ButtonBlockType['content']['target']) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        target: newTarget,
      });
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Size classes
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };
    
    // Variant classes
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    };
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  const ButtonElement = () => {
    const classes = getButtonClasses();
    const isExternal = target === '_blank';
    
    if (isEditing) {
      return (
        <button className={classes} type="button">
          {text || 'نص الزر'}
          {isExternal && <ExternalLink className="w-4 h-4" />}
        </button>
      );
    }
    
    return (
      <a
        href={url}
        target={target}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {text}
        {isExternal && <ExternalLink className="w-4 h-4" />}
      </a>
    );
  };

  return (
    <div className="button-block relative group text-center">
      {isEditing && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-[300px]">
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="نص الزر"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="الرابط"
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <select
              value={variant}
              onChange={(e) => handleVariantChange(e.target.value as ButtonBlockType['content']['variant'])}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            >
              <option value="primary">أساسي</option>
              <option value="secondary">ثانوي</option>
              <option value="outline">محدد</option>
            </select>
            
            <select
              value={size}
              onChange={(e) => handleSizeChange(e.target.value as ButtonBlockType['content']['size'])}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            >
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
            
            <select
              value={target || '_self'}
              onChange={(e) => handleTargetChange(e.target.value as ButtonBlockType['content']['target'])}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
            >
              <option value="_self">نفس النافذة</option>
              <option value="_blank">نافذة جديدة</option>
            </select>
          </div>
        </div>
      )}
      
      <ButtonElement />
    </div>
  );
};

export default ButtonBlock;