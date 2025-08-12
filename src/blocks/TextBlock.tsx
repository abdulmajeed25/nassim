import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Text Block Schema
export const TextBlockSchema = BaseBlockSchema.extend({
  type: z.literal('text'),
  data: z.object({
    content: z.string().default('أدخل النص هنا'),
    alignment: z.enum(['left', 'center', 'right', 'justify']).default('right'),
    fontSize: z.enum(['small', 'medium', 'large', 'xl']).default('medium'),
    fontWeight: z.enum(['normal', 'bold', 'light']).default('normal'),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    maxWidth: z.number().optional(),
    lineHeight: z.number().default(1.6),
  }),
});

export type TextBlockData = z.infer<typeof TextBlockSchema>;

interface TextBlockProps {
  data: TextBlockData['data'];
  settings?: TextBlockData['settings'];
}

export const TextBlock: React.FC<TextBlockProps> = ({
  data
}) => {
  const getFontSize = () => {
    switch (data.fontSize) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      case 'xl': return '24px';
      default: return '16px';
    }
  };

  const getFontWeight = () => {
    switch (data.fontWeight) {
      case 'light': return '300';
      case 'normal': return '400';
      case 'bold': return '700';
      default: return '400';
    }
  };

  return (
    <div className="text-block">
      <div 
        className="text-content"
        style={{
          textAlign: data.alignment,
          fontSize: getFontSize(),
          fontWeight: getFontWeight(),
          color: data.color,
          backgroundColor: data.backgroundColor,
          maxWidth: data.maxWidth ? `${data.maxWidth}px` : undefined,
          lineHeight: data.lineHeight,
          margin: data.maxWidth ? '0 auto' : undefined,
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      <style>{`
        .text-block {
          width: 100%;
        }

        .text-content {
          padding: 20px;
          border-radius: 8px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .text-content p {
          margin-bottom: 1em;
        }

        .text-content p:last-child {
          margin-bottom: 0;
        }

        .text-content h1,
        .text-content h2,
        .text-content h3,
        .text-content h4,
        .text-content h5,
        .text-content h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }

        .text-content h1:first-child,
        .text-content h2:first-child,
        .text-content h3:first-child,
        .text-content h4:first-child,
        .text-content h5:first-child,
        .text-content h6:first-child {
          margin-top: 0;
        }

        .text-content ul,
        .text-content ol {
          margin: 1em 0;
          padding-right: 2em;
        }

        .text-content li {
          margin-bottom: 0.5em;
        }

        .text-content blockquote {
          border-right: 4px solid #ddd;
          margin: 1em 0;
          padding: 1em 2em;
          background-color: #f9f9f9;
          font-style: italic;
        }

        .text-content code {
          background-color: #f4f4f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .text-content pre {
          background-color: #f4f4f4;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }

        .text-content pre code {
          background: none;
          padding: 0;
        }

        .text-content a {
          color: #007bff;
          text-decoration: none;
        }

        .text-content a:hover {
          text-decoration: underline;
        }

        .text-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }

        .text-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }

        .text-content th,
        .text-content td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: right;
        }

        .text-content th {
          background-color: #f8f9fa;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .text-content {
            padding: 15px;
          }

          .text-content ul,
          .text-content ol {
            padding-right: 1.5em;
          }

          .text-content blockquote {
            padding: 0.8em 1.5em;
          }
        }
      `}</style>
    </div>
  );
};