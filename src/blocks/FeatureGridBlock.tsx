import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Feature Grid Block Schema
export const FeatureGridBlockSchema = BaseBlockSchema.extend({
  type: z.literal('featureGrid'),
  data: z.object({
    title: z.string().default('مميزاتنا'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      image: z.string().optional(),
      link: z.string().optional(),
      linkText: z.string().optional(),
      color: z.string().optional(),
    })),
    layout: z.enum(['grid', 'masonry', 'list', 'cards']).default('grid'),
    columns: z.number().min(1).max(6).default(3),
    showIcons: z.boolean().default(true),
    showImages: z.boolean().default(false),
    iconStyle: z.enum(['solid', 'outline', 'gradient']).default('solid'),
    cardStyle: z.enum(['flat', 'shadow', 'border', 'gradient']).default('shadow'),
    animation: z.enum(['none', 'fade', 'slide', 'scale']).default('fade'),
  }),
});

export type FeatureGridBlockData = z.infer<typeof FeatureGridBlockSchema>;

interface FeatureGridBlockProps {
  data: FeatureGridBlockData['data'];
  settings?: FeatureGridBlockData['settings'];
}

export const FeatureGridBlock: React.FC<FeatureGridBlockProps> = ({
  data
}) => {
  const [visibleFeatures, setVisibleFeatures] = React.useState<Set<string>>(new Set());
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (data.animation === 'none') {
      setVisibleFeatures(new Set(data.features.map(f => f.id)));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureId = entry.target.getAttribute('data-feature-id');
            if (featureId) {
              setVisibleFeatures(prev => new Set([...prev, featureId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [data.animation, data.features]);

  const handleFeatureRef = React.useCallback((element: HTMLDivElement | null, featureId: string) => {
    if (element && observerRef.current && data.animation !== 'none') {
      element.setAttribute('data-feature-id', featureId);
      observerRef.current.observe(element);
    }
  }, [data.animation]);

  const handleFeatureClick = (feature: any) => {
    if (feature.link) {
      window.open(feature.link, '_blank');
    }
  };

  const getAnimationClass = (featureId: string) => {
    if (data.animation === 'none') return '';
    
    const isVisible = visibleFeatures.has(featureId);
    const baseClass = `animate-${data.animation}`;
    
    return `${baseClass} ${isVisible ? 'animate-in' : 'animate-out'}`;
  };

  const renderFeature = (feature: any, index: number) => (
    <div
      key={feature.id}
      ref={(el) => handleFeatureRef(el, feature.id)}
      className={`feature-item ${data.cardStyle} ${getAnimationClass(feature.id)} ${feature.link ? 'clickable' : ''}`}
      onClick={() => handleFeatureClick(feature)}
      style={{
        animationDelay: data.animation !== 'none' ? `${index * 100}ms` : undefined,
        borderColor: feature.color,
      }}
    >
      {data.showImages && feature.image && (
        <div className="feature-image">
          <img src={feature.image} alt={feature.title} />
        </div>
      )}
      
      {data.showIcons && feature.icon && (
        <div 
          className={`feature-icon ${data.iconStyle}`}
          style={{
            color: feature.color,
            background: data.iconStyle === 'gradient' && feature.color 
              ? `linear-gradient(135deg, ${feature.color}, ${feature.color}80)` 
              : undefined
          }}
        >
          <i className={feature.icon}></i>
        </div>
      )}
      
      <div className="feature-content">
        <h3 className="feature-title" style={{ color: feature.color }}>
          {feature.title}
        </h3>
        <p className="feature-description">
          {feature.description}
        </p>
        
        {feature.link && feature.linkText && (
          <div className="feature-link">
            <span className="link-text">{feature.linkText}</span>
            <i className="fas fa-arrow-left"></i>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`feature-grid-block layout-${data.layout}`}>
      <div className="feature-grid-header">
        <h2 className="feature-grid-title">{data.title}</h2>
        {data.subtitle && (
          <p className="feature-grid-subtitle">{data.subtitle}</p>
        )}
        {data.description && (
          <p className="feature-grid-description">{data.description}</p>
        )}
      </div>

      <div 
        className="features-container"
        style={{
          gridTemplateColumns: data.layout === 'grid' 
            ? `repeat(${Math.min(data.columns, data.features.length)}, 1fr)`
            : undefined
        }}
      >
        {data.features.map(renderFeature)}
      </div>

      <style>{`
        .feature-grid-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .feature-grid-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-grid-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .feature-grid-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .feature-grid-description {
          font-size: 1.1rem;
          color: #777;
          line-height: 1.6;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 30px;
        }

        .layout-grid .features-container {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .layout-masonry .features-container {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          grid-auto-rows: auto;
        }

        .layout-list .features-container {
          grid-template-columns: 1fr;
          max-width: 800px;
          gap: 20px;
        }

        .layout-cards .features-container {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .feature-item {
          background: white;
          border-radius: 16px;
          padding: 30px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-item.clickable {
          cursor: pointer;
        }

        .feature-item.clickable:hover {
          transform: translateY(-5px);
        }

        .feature-item.flat {
          box-shadow: none;
          border: 1px solid #e0e0e0;
        }

        .feature-item.shadow {
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          border: none;
        }

        .feature-item.shadow:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .feature-item.border {
          border: 2px solid #e0e0e0;
          box-shadow: none;
        }

        .feature-item.border:hover {
          border-color: #667eea;
        }

        .feature-item.gradient {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #e0e0e0;
        }

        .layout-list .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 25px;
          padding: 25px;
        }

        .layout-list .feature-content {
          flex: 1;
        }

        .feature-image {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
          border-radius: 12px;
          overflow: hidden;
        }

        .layout-list .feature-image {
          width: 120px;
          height: 120px;
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 25px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #667eea;
        }

        .layout-list .feature-icon {
          margin: 0;
          flex-shrink: 0;
        }

        .feature-icon.solid {
          background: #f0f4ff;
        }

        .feature-icon.outline {
          border: 2px solid currentColor;
          background: transparent;
        }

        .feature-icon.gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .feature-content {
          text-align: center;
        }

        .layout-list .feature-content {
          text-align: left;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }

        .feature-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #667eea;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .feature-link:hover {
          gap: 12px;
        }

        .feature-link i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .feature-link:hover i {
          transform: translateX(-3px);
        }

        /* Animation classes */
        .animate-fade {
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .animate-fade.animate-in {
          opacity: 1;
        }

        .animate-slide {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate-slide.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.6s ease;
        }

        .animate-scale.animate-in {
          opacity: 1;
          transform: scale(1);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .feature-grid-block {
            padding: 60px 20px;
          }

          .features-container {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .layout-list .feature-item {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .layout-list .feature-image {
            width: 100%;
            height: 150px;
          }

          .layout-list .feature-icon {
            margin: 0 auto;
          }

          .layout-list .feature-content {
            text-align: center;
          }

          .feature-item {
            padding: 25px 20px;
          }

          .feature-grid-title {
            font-size: 2rem;
          }

          .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
          }

          .feature-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .feature-item {
            padding: 20px 15px;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            margin-bottom: 20px;
          }

          .feature-title {
            font-size: 1.1rem;
            margin-bottom: 12px;
          }

          .feature-description {
            font-size: 0.95rem;
          }
        }

        /* Color variations for features */
        .feature-item:nth-child(6n+1) .feature-icon.solid {
          background: #f0f4ff;
          color: #667eea;
        }

        .feature-item:nth-child(6n+2) .feature-icon.solid {
          background: #fff0f5;
          color: #f093fb;
        }

        .feature-item:nth-child(6n+3) .feature-icon.solid {
          background: #f0f9ff;
          color: #4facfe;
        }

        .feature-item:nth-child(6n+4) .feature-icon.solid {
          background: #f0fff4;
          color: #43e97b;
        }

        .feature-item:nth-child(6n+5) .feature-icon.solid {
          background: #fffbf0;
          color: #f6ad55;
        }

        .feature-item:nth-child(6n+6) .feature-icon.solid {
          background: #fdf2f8;
          color: #ed64a6;
        }
      `}</style>
    </div>
  );
};