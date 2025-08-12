import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Services Block Schema
export const ServicesBlockSchema = BaseBlockSchema.extend({
  type: z.literal('services'),
  data: z.object({
    title: z.string().default('خدماتنا'),
    subtitle: z.string().optional(),
    services: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
      price: z.string().optional(),
      features: z.array(z.string()).optional(),
      ctaText: z.string().optional(),
      ctaUrl: z.string().optional(),
    })),
    layout: z.enum(['grid', 'list', 'carousel']).default('grid'),
    columns: z.number().min(1).max(4).default(3),
    showPrices: z.boolean().default(false),
    showFeatures: z.boolean().default(true),
    showCta: z.boolean().default(true),
  }),
});

export type ServicesBlockData = z.infer<typeof ServicesBlockSchema>;

interface ServicesBlockProps {
  data: ServicesBlockData['data'];
  settings?: ServicesBlockData['settings'];
}

export const ServicesBlock: React.FC<ServicesBlockProps> = ({
  data
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === data.services.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? data.services.length - 1 : prev - 1
    );
  };

  const handleServiceClick = (service: any) => {
    if (service.ctaUrl) {
      window.open(service.ctaUrl, '_blank');
    }
  };

  return (
    <div className={`services-block layout-${data.layout}`}>
      <div className="services-header">
        <h2 className="services-title">{data.title}</h2>
        {data.subtitle && (
          <p className="services-subtitle">{data.subtitle}</p>
        )}
      </div>

      <div className="services-container">
        {data.layout === 'carousel' && (
          <>
            <button className="carousel-btn prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
              ›
            </button>
          </>
        )}

        <div 
          className="services-grid"
          style={{
            gridTemplateColumns: data.layout === 'grid' 
              ? `repeat(${data.columns}, 1fr)` 
              : undefined,
            transform: data.layout === 'carousel' 
              ? `translateX(-${currentSlide * 100}%)` 
              : undefined,
          }}
        >
          {data.services.map((service) => (
            <div 
              key={service.id}
              className={`service-card ${data.layout === 'carousel' ? 'carousel-slide' : ''}`}
              onClick={() => handleServiceClick(service)}
            >
              {service.image && (
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
              )}
              
              {service.icon && !service.image && (
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
              )}
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                {data.showFeatures && service.features && service.features.length > 0 && (
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                {data.showPrices && service.price && (
                  <div className="service-price">
                    <span className="price-label">السعر:</span>
                    <span className="price-value">{service.price}</span>
                  </div>
                )}
                
                {data.showCta && service.ctaText && (
                  <button className="service-cta">
                    {service.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.layout === 'carousel' && (
          <div className="carousel-indicators">
            {data.services.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .services-block {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .services-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .services-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .services-container {
          position: relative;
        }

        .services-grid {
          display: grid;
          gap: 30px;
          transition: transform 0.3s ease;
        }

        .layout-list .services-grid {
          grid-template-columns: 1fr;
        }

        .layout-carousel .services-grid {
          display: flex;
          overflow: hidden;
        }

        .service-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #f0f0f0;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .carousel-slide {
          min-width: 100%;
          flex-shrink: 0;
        }

        .service-image {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-icon {
          text-align: center;
          margin-bottom: 20px;
        }

        .service-icon span {
          font-size: 3rem;
          display: inline-block;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          color: white;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-content {
          text-align: center;
        }

        .layout-list .service-content {
          text-align: right;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }

        .service-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 20px 0;
          text-align: right;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: #555;
        }

        .feature-check {
          color: #4CAF50;
          font-weight: bold;
        }

        .service-price {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-label {
          color: #666;
          font-weight: 500;
        }

        .price-value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
        }

        .service-cta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .service-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 2px solid #ddd;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .carousel-btn:hover {
          background: #f8f9fa;
          border-color: #bbb;
        }

        .carousel-btn.prev {
          left: -25px;
        }

        .carousel-btn.next {
          right: -25px;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .indicator.active {
          background: #667eea;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px;
          }

          .service-card {
            padding: 20px;
          }

          .services-title {
            font-size: 2rem;
          }

          .carousel-btn {
            display: none;
          }
        }

        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};