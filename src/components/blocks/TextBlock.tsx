import React from 'react';
import { TextBlock as TextBlockType } from '../../types';

interface TextBlockProps {
  block: TextBlockType;
  isEditing?: boolean;
  onUpdate?: (content: TextBlockType['content']) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ block, isEditing, onUpdate }) => {
  const { content } = block;
  const { text, format } = content;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        text: e.target.value,
      });
    }
  };

  const handleFormatChange = (newFormat: TextBlockType['content']['format']) => {
    if (onUpdate) {
      onUpdate({
        ...content,
        format: newFormat,
      });
    }
  };

  const getTextElement = () => {
    const className = 'w-full text-gray-900 dark:text-gray-100';
    
    switch (format) {
      case 'heading1':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-4xl font-bold resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان رئيسي"
          />
        ) : (
          <h1 className={`${className} text-4xl font-bold`}>{text}</h1>
        );
      
      case 'heading2':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-3xl font-bold resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان فرعي"
          />
        ) : (
          <h2 className={`${className} text-3xl font-bold`}>{text}</h2>
        );
      
      case 'heading3':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-2xl font-semibold resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان فرعي"
          />
        ) : (
          <h3 className={`${className} text-2xl font-semibold`}>{text}</h3>
        );
      
      case 'heading4':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-xl font-semibold resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان فرعي"
          />
        ) : (
          <h4 className={`${className} text-xl font-semibold`}>{text}</h4>
        );
      
      case 'heading5':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-lg font-medium resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان فرعي"
          />
        ) : (
          <h5 className={`${className} text-lg font-medium`}>{text}</h5>
        );
      
      case 'heading6':
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-base font-medium resize-none bg-transparent border-none outline-none`}
            placeholder="عنوان فرعي"
          />
        ) : (
          <h6 className={`${className} text-base font-medium`}>{text}</h6>
        );
      
      default: // paragraph
        return isEditing ? (
          <textarea
            value={text}
            onChange={handleTextChange}
            className={`${className} text-base leading-relaxed resize-none bg-transparent border-none outline-none min-h-[100px]`}
            placeholder="اكتب النص هنا..."
          />
        ) : (
          <p className={`${className} text-base leading-relaxed`}>{text}</p>
        );
    }
  };

  return (
    <div className="text-block relative group">
      {isEditing && (
        <div className="absolute -top-8 left-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <select
            value={format}
            onChange={(e) => handleFormatChange(e.target.value as TextBlockType['content']['format'])}
            className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
          >
            <option value="paragraph">فقرة</option>
            <option value="heading1">عنوان 1</option>
            <option value="heading2">عنوان 2</option>
            <option value="heading3">عنوان 3</option>
            <option value="heading4">عنوان 4</option>
            <option value="heading5">عنوان 5</option>
            <option value="heading6">عنوان 6</option>
          </select>
        </div>
      )}
      {getTextElement()}
    </div>
  );
};

export default TextBlock;