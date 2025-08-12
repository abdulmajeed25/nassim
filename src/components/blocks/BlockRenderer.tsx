import React from 'react';
import { Block } from '../../types';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import ButtonBlock from './ButtonBlock';
import HeroBlock from './HeroBlock';
import ServicesBlock from './ServicesBlock';
import { Trash2, GripVertical, Copy, Settings } from 'lucide-react';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
  isSelected?: boolean;
  onUpdate?: (blockId: string, content: any) => void;
  onDelete?: (blockId: string) => void;
  onDuplicate?: (blockId: string) => void;
  onSelect?: (blockId: string) => void;
  dragHandleProps?: any;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isEditing = false,
  isSelected = false,
  onUpdate,
  onDelete,
  onDuplicate,
  onSelect,
  dragHandleProps,
}) => {
  const handleContentUpdate = (content: any) => {
    if (onUpdate) {
      onUpdate(block.id, content);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(block.id);
    }
  };

  const handleDuplicate = () => {
    if (onDuplicate) {
      onDuplicate(block.id);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(block.id);
    }
  };

  const renderBlock = () => {
    const blockProps = {
      block: { ...block, data: block.data } as any,
      isEditing,
      onUpdate: handleContentUpdate,
    };

    switch (block.type) {
      case 'text':
        return <TextBlock {...blockProps} />;
      case 'image':
        return <ImageBlock {...blockProps} />;
      case 'button':
        return <ButtonBlock {...blockProps} />;
      case 'hero':
        return <HeroBlock {...blockProps} />;
      case 'services':
        return <ServicesBlock {...blockProps} />;
      default:
        return (
          <div className="p-4 border-2 border-dashed border-red-300 rounded-lg text-center text-red-600">
            نوع كتلة غير معروف: {block.type}
          </div>
        );
    }
  };

  const blockClasses = `
    relative
    ${isEditing ? 'group hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50' : ''}
    ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-75' : ''}
    ${block.settings?.customCSS || ''}
  `;

  const blockStyle: React.CSSProperties = {
    margin: typeof block.settings?.spacing === 'string' ? block.settings.spacing : '0',
    padding: typeof block.settings?.spacing === 'string' ? block.settings.spacing : '0',
  };

  return (
    <div
      className={blockClasses}
      style={blockStyle}
      onClick={isEditing ? handleSelect : undefined}
    >
      {/* Editing Controls */}
      {isEditing && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="flex items-center gap-1">
            {/* Drag Handle */}
            <div
              {...dragHandleProps}
              className="p-1 bg-gray-800 text-white rounded cursor-move hover:bg-gray-700"
            >
              <GripVertical className="w-4 h-4" />
            </div>
            
            {/* Block Type Label */}
            <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
              {getBlockTypeLabel(block.type)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Settings Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Open block settings modal
              }}
              className="p-1 bg-gray-800 text-white rounded hover:bg-gray-700"
              title="إعدادات الكتلة"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            {/* Duplicate Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDuplicate();
              }}
              className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              title="نسخ الكتلة"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
              title="حذف الكتلة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Block Content */}
      <div className={isEditing ? 'pointer-events-auto' : ''}>
        {renderBlock()}
      </div>
      
      {/* Selection Indicator */}
      {isSelected && isEditing && (
        <div className="absolute inset-0 border-2 border-blue-500 border-opacity-75 rounded pointer-events-none" />
      )}
    </div>
  );
};

function getBlockTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    text: 'نص',
    image: 'صورة',
    button: 'زر',
    hero: 'بطل',
    services: 'خدمات',
    video: 'فيديو',
    contact: 'اتصال',
    testimonials: 'شهادات',
  };
  
  return labels[type] || type;
}

export default BlockRenderer;