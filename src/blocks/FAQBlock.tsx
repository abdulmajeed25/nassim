import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// FAQ Block Schema
export const FAQBlockSchema = BaseBlockSchema.extend({
  type: z.literal('faq'),
  data: z.object({
    title: z.string().default('الأسئلة الشائعة'),
    subtitle: z.string().optional(),
    faqs: z.array(z.object({
      id: z.string(),
      question: z.string(),
      answer: z.string(),
      category: z.string().optional(),
    })),
    layout: z.enum(['accordion', 'grid', 'tabs']).default('accordion'),
    allowMultiple: z.boolean().default(false),
    showCategories: z.boolean().default(false),
  }),
});

export type FAQBlockData = z.infer<typeof FAQBlockSchema>;

interface FAQBlockProps {
  data: FAQBlockData['data'];
  settings?: FAQBlockData['settings'];
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  data
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const categories = React.useMemo(() => {
    const cats = new Set(data.faqs.map(faq => faq.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [data.faqs]);

  const filteredFaqs = React.useMemo(() => {
    if (activeCategory === 'all') return data.faqs;
    return data.faqs.filter(faq => faq.category === activeCategory);
  }, [data.faqs, activeCategory]);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (data.allowMultiple) {
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
    } else {
      if (newOpenItems.has(id)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(id);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  const renderFAQItem = (faq: any) => (
    <div key={faq.id} className="faq-item">
      <button 
        className={`faq-question ${openItems.has(faq.id) ? 'active' : ''}`}
        onClick={() => toggleItem(faq.id)}
      >
        <span>{faq.question}</span>
        <span className="faq-icon">
          {openItems.has(faq.id) ? '−' : '+'}
        </span>
      </button>
      <div className={`faq-answer ${openItems.has(faq.id) ? 'open' : ''}`}>
        <div className="faq-answer-content">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`faq-block layout-${data.layout}`}>
      <div className="faq-header">
        <h2 className="faq-title">{data.title}</h2>
        {data.subtitle && (
          <p className="faq-subtitle">{data.subtitle}</p>
        )}
      </div>

      {data.showCategories && categories.length > 1 && (
        <div className="faq-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category || 'all')}
            >
              {category === 'all' ? 'الكل' : category}
            </button>
          ))}
        </div>
      )}

      <div className="faq-content">
        {data.layout === 'accordion' && (
          <div className="faq-accordion">
            {filteredFaqs.map(renderFAQItem)}
          </div>
        )}

        {data.layout === 'grid' && (
          <div className="faq-grid">
            {filteredFaqs.map(renderFAQItem)}
          </div>
        )}

        {data.layout === 'tabs' && (
          <div className="faq-tabs">
            <div className="tab-headers">
              {filteredFaqs.map((faq) => (
                <button
                  key={faq.id}
                  className={`tab-header ${openItems.has(faq.id) ? 'active' : ''}`}
                  onClick={() => toggleItem(faq.id)}
                >
                  {faq.question}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {filteredFaqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`tab-panel ${openItems.has(faq.id) ? 'active' : ''}`}
                >
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .faq-block {
          padding: 80px 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .faq-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-categories {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 10px 20px;
          border: 2px solid #ddd;
          background: white;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .category-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .category-btn.active {
          background: #667eea;
          border-color: #667eea;
          color: white;
        }

        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .faq-item {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .faq-question {
          width: 100%;
          padding: 20px;
          background: none;
          border: none;
          text-align: right;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: #f8f9fa;
        }

        .faq-question.active {
          background: #667eea;
          color: white;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .faq-question.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .faq-answer.open {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 0 20px 20px 20px;
          color: #666;
          line-height: 1.6;
        }

        .faq-answer-content p {
          margin: 0;
        }

        .faq-tabs {
          display: flex;
          flex-direction: column;
        }

        .tab-headers {
          display: flex;
          border-bottom: 2px solid #e0e0e0;
          overflow-x: auto;
        }

        .tab-header {
          padding: 15px 25px;
          border: none;
          background: none;
          cursor: pointer;
          white-space: nowrap;
          font-weight: 500;
          color: #666;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-header:hover {
          color: #667eea;
          background: #f8f9fa;
        }

        .tab-header.active {
          color: #667eea;
          border-bottom-color: #667eea;
          background: #f8f9fa;
        }

        .tab-content {
          position: relative;
          min-height: 200px;
        }

        .tab-panel {
          display: none;
          padding: 30px;
          background: white;
          border-radius: 0 0 12px 12px;
        }

        .tab-panel.active {
          display: block;
        }

        .tab-panel p {
          margin: 0;
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .faq-block {
            padding: 60px 20px;
          }

          .faq-title {
            font-size: 2rem;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .faq-question {
            padding: 15px;
            font-size: 1rem;
          }

          .faq-answer-content {
            padding: 0 15px 15px 15px;
          }

          .tab-headers {
            flex-direction: column;
          }

          .tab-header {
            text-align: right;
            border-bottom: 1px solid #e0e0e0;
            border-left: 3px solid transparent;
          }

          .tab-header.active {
            border-bottom-color: #e0e0e0;
            border-left-color: #667eea;
          }

          .category-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};