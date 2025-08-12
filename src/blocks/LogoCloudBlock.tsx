import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Logo Cloud Block Schema
export const LogoCloudBlockSchema = BaseBlockSchema.extend({
  type: z.literal('logoCloud'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    logos: z.array(z.object({
      id: z.string(),
      name: z.string(),
      logo: z.string(),
      url: z.string().optional(),
      description: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'masonry']).default('grid'),
    columns: z.number().min(2).max(8).default(5),
    showNames: z.boolean().default(false),
    grayscale: z.boolean().default(true),
    autoplay: z.boolean().default(false),
    interval: z.number().default(3000),
    spacing: z.enum(['tight', 'normal', 'loose']).default('normal'),
  }),
});

export type LogoCloudBlockData = z.infer<typeof LogoCloudBlockSchema>;

interface LogoCloudBlockProps {
  data: LogoCloudBlockData['data'];
  settings?: LogoCloudBlockData['settings'];
}

export const LogoCloudBlock: React.FC<LogoCloudBlockProps> = ({
  data
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (data.layout === 'carousel' && data.autoplay && data.logos.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.logos.length);
      }, data.interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [data.layout, data.autoplay, data.interval, data.logos.length]);

  const handleLogoClick = (logo: any) => {
    if (logo.url) {
      window.open(logo.url, '_blank');
    }
  };

  const getSpacingClass = () => {
    switch (data.spacing) {
      case 'tight': return 'spacing-tight';
      case 'loose': return 'spacing-loose';
      default: return 'spacing-normal';
    }
  };

  const renderLogo = (logo: any) => (
    <div 
      key={logo.id} 
      className={`logo-item ${logo.url ? 'clickable' : ''} ${data.grayscale ? 'grayscale' : ''}`}
      onClick={() => handleLogoClick(logo)}
      title={logo.description || logo.name}
    >
      <div className="logo-image">
        <img src={logo.logo} alt={logo.name} />
      </div>
      {data.showNames && (
        <div className="logo-name">{logo.name}</div>
      )}
    </div>
  );

  const renderCarousel = () => {
    const visibleLogos = data.logos.slice(currentIndex, currentIndex + data.columns)
      .concat(data.logos.slice(0, Math.max(0, (currentIndex + data.columns) - data.logos.length)));

    return (
      <div className="carousel-container">
        <div className="carousel-track">
          {visibleLogos.map((logo) => renderLogo(logo))}
        </div>
        
        {data.logos.length > data.columns && (
          <div className="carousel-dots">
            {Array.from({ length: Math.ceil(data.logos.length / data.columns) }).map((_, index) => (
              <button
                key={index}
                className={`dot ${Math.floor(currentIndex / data.columns) === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index * data.columns)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`logo-cloud-block layout-${data.layout} ${getSpacingClass()}`}>
      {(data.title || data.subtitle) && (
        <div className="logo-cloud-header">
          {data.title && (
            <h2 className="logo-cloud-title">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="logo-cloud-subtitle">{data.subtitle}</p>
          )}
        </div>
      )}

      <div className="logos-container">
        {data.layout === 'carousel' ? (
          renderCarousel()
        ) : (
          <div 
            className="logos-grid"
            style={{
              gridTemplateColumns: data.layout === 'grid' 
                ? `repeat(${Math.min(data.columns, data.logos.length)}, 1fr)`
                : undefined
            }}
          >
            {data.logos.map(renderLogo)}
          </div>
        )}
      </div>

      <style>{`
        .logo-cloud-block {
          padding: 60px 20px;
          background: #fafafa;
        }

        .logo-cloud-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .logo-cloud-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .logo-cloud-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .logos-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .logos-grid {
          display: grid;
          gap: 30px;
          align-items: center;
        }

        .layout-grid .logos-grid {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .layout-masonry .logos-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          grid-auto-rows: auto;
        }

        .spacing-tight .logos-grid {
          gap: 15px;
        }

        .spacing-loose .logos-grid {
          gap: 50px;
        }

        .logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
        }

        .logo-item.clickable {
          cursor: pointer;
        }

        .logo-item.clickable:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border-color: #667eea;
        }

        .logo-item.grayscale .logo-image img {
          filter: grayscale(100%);
          opacity: 0.7;
        }

        .logo-item.grayscale:hover .logo-image img {
          filter: grayscale(0%);
          opacity: 1;
        }

        .logo-image {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }

        .logo-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .logo-name {
          font-size: 0.9rem;
          color: #666;
          text-align: center;
          font-weight: 500;
        }

        .carousel-container {
          position: relative;
        }

        .carousel-track {
          display: grid;
          grid-template-columns: repeat(var(--visible-columns, 5), 1fr);
          gap: 30px;
          align-items: center;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #667eea;
          transform: scale(1.2);
        }

        .dot:hover {
          background: #667eea;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .logo-cloud-block {
            padding: 50px 20px;
          }

          .logos-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
          }

          .spacing-loose .logos-grid {
            gap: 30px;
          }

          .logo-item {
            padding: 15px;
          }

          .logo-image {
            height: 60px;
          }

          .logo-cloud-title {
            font-size: 1.8rem;
          }

          .carousel-track {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .logos-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .logo-item {
            padding: 12px;
          }

          .logo-image {
            height: 50px;
            margin-bottom: 8px;
          }

          .logo-name {
            font-size: 0.8rem;
          }

          .carousel-track {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
        }

        /* Animation for carousel */
        .carousel-track {
          animation: ${data.layout === 'carousel' && data.autoplay ? 'slideIn 0.5s ease-in-out' : 'none'};
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom grid columns based on data.columns */
        .layout-grid .logos-grid {
          grid-template-columns: repeat(${Math.min(data.columns, 8)}, 1fr);
        }

        .carousel-track {
          grid-template-columns: repeat(${Math.min(data.columns, data.logos.length)}, 1fr);
        }

        @media (max-width: 768px) {
          .layout-grid .logos-grid {
            grid-template-columns: repeat(${Math.min(Math.ceil(data.columns / 2), 4)}, 1fr);
          }

          .carousel-track {
            grid-template-columns: repeat(${Math.min(3, data.columns)}, 1fr);
          }
        }

        @media (max-width: 480px) {
          .layout-grid .logos-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .carousel-track {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};