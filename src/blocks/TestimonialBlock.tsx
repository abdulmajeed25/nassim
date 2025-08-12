import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Testimonial Block Schema
export const TestimonialBlockSchema = BaseBlockSchema.extend({
  type: z.literal('testimonial'),
  data: z.object({
    title: z.string().default('آراء عملائنا'),
    subtitle: z.string().optional(),
    testimonials: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      content: z.string(),
      rating: z.number().min(1).max(5).default(5),
      avatar: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'single']).default('carousel'),
    showRatings: z.boolean().default(true),
    autoplay: z.boolean().default(true),
    interval: z.number().default(5000),
  }),
});

export type TestimonialBlockData = z.infer<typeof TestimonialBlockSchema>;

interface TestimonialBlockProps {
  data: TestimonialBlockData['data'];
  settings?: TestimonialBlockData['settings'];
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  data
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (data.autoplay && data.layout === 'carousel') {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === data.testimonials.length - 1 ? 0 : prev + 1
        );
      }, data.interval);
      return () => clearInterval(interval);
    }
  }, [data.autoplay, data.interval, data.testimonials.length, data.layout]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const renderTestimonial = (testimonial: any) => (
    <div key={testimonial.id} className="testimonial-card">
      <div className="testimonial-content">
        <p className="testimonial-text">"{testimonial.content}"</p>
        {data.showRatings && (
          <div className="testimonial-rating">
            {renderStars(testimonial.rating)}
          </div>
        )}
      </div>
      <div className="testimonial-author">
        {testimonial.avatar && (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="author-avatar"
          />
        )}
        <div className="author-info">
          <h4 className="author-name">{testimonial.name}</h4>
          {testimonial.role && (
            <p className="author-role">
              {testimonial.role}
              {testimonial.company && ` في ${testimonial.company}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`testimonial-block layout-${data.layout}`}>
      <div className="testimonial-header">
        <h2 className="testimonial-title">{data.title}</h2>
        {data.subtitle && (
          <p className="testimonial-subtitle">{data.subtitle}</p>
        )}
      </div>

      <div className="testimonials-container">
        {data.layout === 'carousel' ? (
          <>
            <div className="carousel-wrapper">
              <div 
                className="testimonials-carousel"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {data.testimonials.map((testimonial) =>
              renderTestimonial(testimonial)
            )}
              </div>
            </div>
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev"
                onClick={() => setCurrentSlide(prev => 
                  prev === 0 ? data.testimonials.length - 1 : prev - 1
                )}
              >
                ‹
              </button>
              <button 
                className="carousel-btn next"
                onClick={() => setCurrentSlide(prev => 
                  prev === data.testimonials.length - 1 ? 0 : prev + 1
                )}
              >
                ›
              </button>
            </div>
            <div className="carousel-indicators">
              {data.testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="testimonials-grid">
            {data.testimonials.map((testimonial) => 
              renderTestimonial(testimonial)
            )}
          </div>
        )}
      </div>

      <style>{`
        .testimonial-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .testimonial-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonial-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .testimonial-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .carousel-wrapper {
          overflow: hidden;
          border-radius: 12px;
        }

        .testimonials-carousel {
          display: flex;
          transition: transform 0.5s ease;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .layout-single .testimonials-grid {
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          min-width: 100%;
          flex-shrink: 0;
          position: relative;
        }

        .layout-grid .testimonial-card,
        .layout-single .testimonial-card {
          min-width: auto;
        }

        .testimonial-content {
          margin-bottom: 30px;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-rating {
          display: flex;
          gap: 5px;
        }

        .star {
          font-size: 1.2rem;
          color: #ddd;
        }

        .star.filled {
          color: #ffc107;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f0f0f0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }

        .author-role {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        .carousel-controls {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .carousel-btn {
          background: white;
          border: 2px solid #ddd;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .carousel-btn:hover {
          background: #f8f9fa;
          border-color: #bbb;
          transform: scale(1.1);
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
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: #667eea;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .testimonial-block {
            padding: 60px 20px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .testimonial-card {
            padding: 30px 20px;
          }

          .testimonial-title {
            font-size: 2rem;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .author-avatar {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};