import React from 'react';
import { Block } from '../types';
import { BlockRenderer } from './BlockRenderer';

interface TemplateRendererProps {
  template: any;
  isPreview?: boolean;
  isEditing?: boolean;
  onEditBlock?: (blockId: string) => void;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
  scope?: 'global' | 'page' | 'block';
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  template,
  isPreview = false,
  isEditing = false,
  onEditBlock,
  customizationLevel = 'basic',
  scope = 'page'
}) => {
  const templateClasses = [
    'template-container',
    template.category && `template-${template.category}`,
    template.variant && `variant-${template.variant}`,
    customizationLevel && `customization-${customizationLevel}`,
    scope && `scope-${scope}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={templateClasses} dir="rtl">
      {/* Template Header (for preview) */}
      {isPreview && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-purple-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-purple-900">{template.name}</h3>
                <p className="text-purple-700 text-sm">{template.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {template.category}
                  </span>
                  {template.tags?.map((tag: string) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-left">
                <div className="text-sm text-purple-600">
                  مستوى التخصيص: <span className="font-semibold">{customizationLevel}</span>
                </div>
                <div className="text-sm text-purple-600">
                  النطاق: <span className="font-semibold">{scope}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Content */}
      <div className="template-content">
        {template.blocks?.map((block: Block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isPreview={isPreview}
            isEditing={isEditing}
            onEdit={onEditBlock}
            customizationLevel={customizationLevel}
          />
        ))}
      </div>

      {/* Template Footer (for preview) */}
      {isPreview && (
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-sm text-gray-600">
          <div className="max-w-4xl mx-auto">
            <p>
              القالب: {template.name} | 
              الفئة: {template.category} | 
              عدد الكتل: {template.blocks?.length || 0} | 
              آخر تحديث: {new Date(template.updatedAt || Date.now()).toLocaleDateString('ar-SA')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};