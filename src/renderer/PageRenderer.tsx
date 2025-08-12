import React from 'react';
import { Page, Block } from '../types';
import { BlockRenderer } from './BlockRenderer';

interface PageRendererProps {
  page: Page;
  isPreview?: boolean;
  isEditing?: boolean;
  onEditBlock?: (blockId: string) => void;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  isPreview = false,
  isEditing = false,
  onEditBlock,
  customizationLevel = 'basic'
}) => {
  const pageClasses = [
    'min-h-screen',
    'bg-white text-gray-900',
  ].filter(Boolean).join(' ');

  return (
    <div className={pageClasses} dir="rtl">
      {/* SEO Meta Tags (for preview) */}
      {isPreview && (
        <div className="bg-blue-50 p-4 border-b border-blue-200 text-sm text-blue-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-semibold mb-2">معاينة SEO:</h3>
            <div className="space-y-1">
              <div><strong>العنوان:</strong> {page.seo?.ogTitle || page.title}</div>
              <div><strong>الوصف:</strong> {page.seo?.ogDescription}</div>
              <div><strong>الكلمات المفتاحية:</strong> {page.seo?.keywords?.join(', ')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="relative">
        {page.blocks?.map((block: Block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isPreview={isPreview}
            isEditing={isEditing}
            onEdit={onEditBlock}
            customizationLevel={customizationLevel}
          />
        ))}
      </main>


    </div>
  );
};