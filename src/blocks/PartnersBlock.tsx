import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Partners Block Schema
export const PartnersBlockSchema = BaseBlockSchema.extend({
  type: z.literal('partners'),
  data: z.object({
    title: z.string().default('شركاؤنا'),
    subtitle: z.string().optional(),
    partners: z.array(z.object({
      id: z.string(),
      name: z.string(),
      logo: z.string(),
      website: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
    })),
    layout: z.enum(['grid', 'carousel', 'list']).default('grid'),
    columns: z.object({
      desktop: z.number().min(2).max(8).default(4),
      tablet: z.number().min(2).max(6).default(3),
      mobile: z.number().min(1).max(3).default(2),
    }).optional(),
    showNames: z.boolean().default(true),
    showDescriptions: z.boolean().default(false),
    autoPlay: z.boolean().default(false),
    interval: z.number().min(2000).max(10000).default(4000),
    grayscale: z.boolean().default(false),
  }),
});

export type PartnersBlockData = z.infer<typeof PartnersBlockSchema>;

interface PartnersBlockProps {
  data: PartnersBlockData['data'];
  settings?: PartnersBlockData['settings'];
}

export const PartnersBlock: React.FC<PartnersBlockProps> = ({
  data
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (data.autoPlay && data.layout === 'carousel') {
      const interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev >= data.partners.length - 1 ? 0 : prev + 1
        );
      }, data.interval);
      return () => clearInterval(interval);
    }
  }, [data.autoPlay, data.interval, data.layout, data.partners.length]);

  const renderPartner = (partner: any) => (
    <div 
      key={partner.id}
      className={`partner-item ${data.grayscale ? 'grayscale' : ''}`}
      style={{
        textAlign: 'center',
        padding: '20px',
        transition: 'all 0.3s ease'
      }}
    >
      {partner.website ? (
        <a 
          href={partner.website} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img 
            src={partner.logo} 
            alt={partner.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '80px',
              objectFit: 'contain',
              filter: data.grayscale ? 'grayscale(100%)' : 'none',
              transition: 'filter 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (data.grayscale) {
                e.currentTarget.style.filter = 'grayscale(0%)';
              }
            }}
            onMouseLeave={(e) => {
              if (data.grayscale) {
                e.currentTarget.style.filter = 'grayscale(100%)';
              }
            }}
          />
          {data.showNames && (
            <h4 style={{ marginTop: '10px', fontSize: '14px' }}>{partner.name}</h4>
          )}
        </a>
      ) : (
        <>
          <img 
            src={partner.logo} 
            alt={partner.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '80px',
              objectFit: 'contain',
              filter: data.grayscale ? 'grayscale(100%)' : 'none'
            }}
          />
          {data.showNames && (
            <h4 style={{ marginTop: '10px', fontSize: '14px' }}>{partner.name}</h4>
          )}
        </>
      )}
      {data.showDescriptions && partner.description && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          {partner.description}
        </p>
      )}
    </div>
  );

  const renderGridLayout = () => (
    <div 
      className="partners-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.columns?.desktop || 4}, 1fr)`,
        gap: '20px',
        alignItems: 'center'
      }}
    >
      {data.partners.map((partner) => renderPartner(partner))}
    </div>
  );

  const renderCarouselLayout = () => (
    <div className="partners-carousel" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        className="carousel-track"
        style={{
          display: 'flex',
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.5s ease'
        }}
      >
        {data.partners.map((partner) => (
          <div 
            key={partner.id}
            style={{ minWidth: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {renderPartner(partner)}
          </div>
        ))}
      </div>
      
      {/* Carousel Controls */}
      <div className="carousel-controls" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
        {data.partners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentSlide === index ? '#007bff' : '#ccc',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderListLayout = () => (
    <div className="partners-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {data.partners.map((partner) => (
        <div 
          key={partner.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '15px',
            border: '1px solid #eee',
            borderRadius: '8px'
          }}
        >
          <img 
            src={partner.logo} 
            alt={partner.name}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain',
              filter: data.grayscale ? 'grayscale(100%)' : 'none'
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{partner.name}</h4>
            {partner.description && (
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {partner.description}
              </p>
            )}
          </div>
          {partner.website && (
            <a 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              زيارة الموقع
            </a>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="partners-block">
      {data.title && (
        <div className="block-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3>{data.title}</h3>
          {data.subtitle && <p>{data.subtitle}</p>}
        </div>
      )}
      
      <div className="partners-content">
        {data.layout === 'grid' && renderGridLayout()}
        {data.layout === 'carousel' && renderCarouselLayout()}
        {data.layout === 'list' && renderListLayout()}
      </div>
    </div>
  );
};