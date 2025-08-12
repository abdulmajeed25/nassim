import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Before After Block Schema
export const BeforeAfterBlockSchema = BaseBlockSchema.extend({
  type: z.literal('beforeAfter'),
  data: z.object({
    title: z.string().default('قبل وبعد'),
    subtitle: z.string().optional(),
    beforeImage: z.string(),
    afterImage: z.string(),
    beforeLabel: z.string().default('قبل'),
    afterLabel: z.string().default('بعد'),
    description: z.string().optional(),
    layout: z.enum(['slider', 'side-by-side', 'overlay']).default('slider'),
    showLabels: z.boolean().default(true),
    autoPlay: z.boolean().default(false),
    interval: z.number().min(1000).max(10000).default(3000),
  }),
});

export type BeforeAfterBlockData = z.infer<typeof BeforeAfterBlockSchema>;

interface BeforeAfterBlockProps {
  data: BeforeAfterBlockData['data'];
  settings?: BeforeAfterBlockData['settings'];
}

export const BeforeAfterBlock: React.FC<BeforeAfterBlockProps> = ({
  data
}) => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  React.useEffect(() => {
    if (data.autoPlay && data.layout === 'slider') {
      const interval = setInterval(() => {
        setSliderPosition(prev => {
          const next = prev + 10;
          return next > 100 ? 0 : next;
        });
      }, data.interval);
      return () => clearInterval(interval);
    }
  }, [data.autoPlay, data.interval, data.layout]);

  const renderSliderLayout = () => (
    <div 
      ref={containerRef}
      className="before-after-slider"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <img 
        src={data.beforeImage} 
        alt={data.beforeLabel}
        className="before-image"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <div 
        className="after-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <img 
          src={data.afterImage} 
          alt={data.afterLabel}
          className="after-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div 
        className="slider-handle"
        style={{
          position: 'absolute',
          left: `${sliderPosition}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '100%',
          backgroundColor: '#fff',
          cursor: 'ew-resize',
          zIndex: 10
        }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            border: '2px solid #ccc'
          }}
        />
      </div>
      {data.showLabels && (
        <>
          <div className="before-label" style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px'
          }}>
            {data.beforeLabel}
          </div>
          <div className="after-label" style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px'
          }}>
            {data.afterLabel}
          </div>
        </>
      )}
    </div>
  );

  const renderSideBySideLayout = () => (
    <div className="before-after-side-by-side" style={{ display: 'flex', gap: '20px' }}>
      <div className="before-container" style={{ flex: 1 }}>
        {data.showLabels && <h4>{data.beforeLabel}</h4>}
        <img src={data.beforeImage} alt={data.beforeLabel} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="after-container" style={{ flex: 1 }}>
        {data.showLabels && <h4>{data.afterLabel}</h4>}
        <img src={data.afterImage} alt={data.afterLabel} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );

  return (
    <div className="before-after-block">
      {data.title && (
        <div className="block-header">
          <h3>{data.title}</h3>
          {data.subtitle && <p>{data.subtitle}</p>}
        </div>
      )}
      
      <div className="before-after-content">
        {data.layout === 'slider' && renderSliderLayout()}
        {data.layout === 'side-by-side' && renderSideBySideLayout()}
        {data.layout === 'overlay' && renderSliderLayout()}
      </div>
      
      {data.description && (
        <div className="block-description">
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
};