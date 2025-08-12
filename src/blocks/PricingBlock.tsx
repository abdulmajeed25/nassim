import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Pricing Block Schema
export const PricingBlockSchema = BaseBlockSchema.extend({
  type: z.literal('pricing'),
  data: z.object({
    title: z.string().default('خطط الأسعار'),
    subtitle: z.string().optional(),
    plans: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      price: z.string(),
      period: z.string().default('شهرياً'),
      originalPrice: z.string().optional(),
      features: z.array(z.string()),
      ctaText: z.string().default('اختر هذه الخطة'),
      ctaUrl: z.string().optional(),
      popular: z.boolean().default(false),
      badge: z.string().optional(),
    })),
    layout: z.enum(['grid', 'list', 'comparison']).default('grid'),
    showOriginalPrice: z.boolean().default(false),
    currency: z.string().default('ر.س'),
  }),
});

export type PricingBlockData = z.infer<typeof PricingBlockSchema>;

interface PricingBlockProps {
  data: PricingBlockData['data'];
  settings?: PricingBlockData['settings'];
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  data
}) => {
  const handlePlanSelect = (plan: any) => {
    if (plan.ctaUrl) {
      window.open(plan.ctaUrl, '_blank');
    }
  };

  const renderPlan = (plan: any) => (
    <div 
      key={plan.id} 
      className={`pricing-plan ${plan.popular ? 'popular' : ''}`}
    >
      {plan.popular && (
        <div className="popular-badge">
          {plan.badge || 'الأكثر شعبية'}
        </div>
      )}
      
      <div className="plan-header">
        <h3 className="plan-name">{plan.name}</h3>
        {plan.description && (
          <p className="plan-description">{plan.description}</p>
        )}
        
        <div className="plan-pricing">
          <div className="price-container">
            {data.showOriginalPrice && plan.originalPrice && (
              <span className="original-price">
                {plan.originalPrice} {data.currency}
              </span>
            )}
            <span className="current-price">
              {plan.price} {data.currency}
            </span>
          </div>
          <span className="price-period">{plan.period}</span>
        </div>
      </div>
      
      <div className="plan-features">
        <ul>
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx}>
              <span className="feature-check">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="plan-footer">
        <button 
          className={`plan-cta ${plan.popular ? 'popular' : ''}`}
          onClick={() => handlePlanSelect(plan)}
        >
          {plan.ctaText}
        </button>
      </div>
    </div>
  );

  return (
    <div className={`pricing-block layout-${data.layout}`}>
      <div className="pricing-header">
        <h2 className="pricing-title">{data.title}</h2>
        {data.subtitle && (
          <p className="pricing-subtitle">{data.subtitle}</p>
        )}
      </div>

      <div className="pricing-container">
        {data.layout === 'comparison' ? (
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="feature-column">الميزات</div>
              {data.plans.map(plan => (
                <div key={plan.id} className="plan-column">
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price} {data.currency}
                    <span>/{plan.period}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="comparison-body">
              {/* Get all unique features */}
              {Array.from(new Set(data.plans.flatMap(plan => plan.features))).map(feature => (
                <div key={feature} className="comparison-row">
                  <div className="feature-name">{feature}</div>
                  {data.plans.map(plan => (
                    <div key={plan.id} className="feature-value">
                      {plan.features.includes(feature) ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="comparison-footer">
              <div className="empty-cell"></div>
              {data.plans.map(plan => (
                <div key={plan.id} className="cta-cell">
                  <button 
                    className={`plan-cta ${plan.popular ? 'popular' : ''}`}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pricing-grid">
            {data.plans.map(renderPlan)}
          </div>
        )}
      </div>

      <style>{`
        .pricing-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .pricing-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .pricing-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          gap: 30px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .layout-list .pricing-grid {
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-plan {
          background: white;
          border-radius: 16px;
          padding: 40px 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          position: relative;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .pricing-plan:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .pricing-plan.popular {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 25px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .plan-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
        }

        .plan-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .plan-pricing {
          margin-bottom: 20px;
        }

        .price-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 5px;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 1.2rem;
        }

        .current-price {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
        }

        .price-period {
          color: #666;
          font-size: 0.9rem;
        }

        .plan-features {
          margin-bottom: 30px;
        }

        .plan-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #555;
          font-size: 0.95rem;
        }

        .feature-check {
          color: #4CAF50;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .plan-footer {
          text-align: center;
        }

        .plan-cta {
          width: 100%;
          padding: 15px 30px;
          border: 2px solid #667eea;
          background: white;
          color: #667eea;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .plan-cta:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .plan-cta.popular {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
        }

        .plan-cta.popular:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .comparison-table {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .comparison-header {
          display: grid;
          grid-template-columns: 1fr repeat(var(--plans-count, 3), 1fr);
          background: #f8f9fa;
          border-bottom: 2px solid #e0e0e0;
        }

        .feature-column {
          padding: 20px;
          font-weight: bold;
          color: #333;
        }

        .plan-column {
          padding: 20px;
          text-align: center;
          border-right: 1px solid #e0e0e0;
        }

        .plan-column h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .plan-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #667eea;
        }

        .plan-price span {
          font-size: 0.8rem;
          color: #666;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 1fr repeat(var(--plans-count, 3), 1fr);
          border-bottom: 1px solid #f0f0f0;
        }

        .feature-name {
          padding: 15px 20px;
          color: #555;
          border-left: 1px solid #f0f0f0;
        }

        .feature-value {
          padding: 15px 20px;
          text-align: center;
          border-right: 1px solid #f0f0f0;
          color: #4CAF50;
          font-weight: bold;
        }

        .comparison-footer {
          display: grid;
          grid-template-columns: 1fr repeat(var(--plans-count, 3), 1fr);
          background: #f8f9fa;
          border-top: 2px solid #e0e0e0;
        }

        .empty-cell {
          padding: 20px;
        }

        .cta-cell {
          padding: 20px;
          border-right: 1px solid #e0e0e0;
        }

        @media (max-width: 768px) {
          .pricing-block {
            padding: 60px 20px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .pricing-plan {
            padding: 30px 20px;
          }

          .pricing-plan.popular {
            transform: none;
          }

          .pricing-title {
            font-size: 2rem;
          }

          .current-price {
            font-size: 2rem;
          }

          .comparison-table {
            overflow-x: auto;
          }

          .comparison-header,
          .comparison-row,
          .comparison-footer {
            min-width: 600px;
          }
        }
      `}</style>
    </div>
  );
};