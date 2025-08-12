import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Stats Block Schema
export const StatsBlockSchema = BaseBlockSchema.extend({
  type: z.literal('stats'),
  data: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    stats: z.array(z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      color: z.string().optional(),
    })),
    layout: z.enum(['grid', 'horizontal', 'vertical', 'cards']).default('grid'),
    columns: z.number().min(1).max(6).default(4),
    showIcons: z.boolean().default(true),
    animateNumbers: z.boolean().default(true),
    backgroundColor: z.string().optional(),
    textColor: z.string().optional(),
  }),
});

export type StatsBlockData = z.infer<typeof StatsBlockSchema>;

interface StatsBlockProps {
  data: StatsBlockData['data'];
  settings?: StatsBlockData['settings'];
}

export const StatsBlock: React.FC<StatsBlockProps> = ({
  data
}) => {
  const [animatedValues, setAnimatedValues] = React.useState<{[key: string]: number}>({});
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const blockRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!data.animateNumbers || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          
          data.stats.forEach((stat) => {
            const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
            if (!isNaN(numericValue)) {
              animateValue(stat.id, 0, numericValue, 2000);
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => observer.disconnect();
  }, [data.stats, data.animateNumbers, hasAnimated]);

  const animateValue = (id: string, start: number, end: number, duration: number) => {
    const startTime = Date.now();
    
    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (end - start) * easeOutQuart;
      
      setAnimatedValues(prev => ({
        ...prev,
        [id]: Math.floor(currentValue)
      }));
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  };

  const formatStatValue = (stat: any) => {
    if (data.animateNumbers && animatedValues[stat.id] !== undefined) {
      const animatedValue = animatedValues[stat.id];
      return `${stat.prefix || ''}${animatedValue.toLocaleString()}${stat.suffix || ''}`;
    }
    return `${stat.prefix || ''}${stat.value}${stat.suffix || ''}`;
  };

  const renderStat = (stat: any) => (
    <div 
      key={stat.id} 
      className={`stat-item ${data.layout}`}
      style={{
        color: stat.color || data.textColor,
      }}
    >
      {data.showIcons && stat.icon && (
        <div className="stat-icon">
          <i className={stat.icon}></i>
        </div>
      )}
      
      <div className="stat-content">
        <div className="stat-value">
          {formatStatValue(stat)}
        </div>
        <div className="stat-label">{stat.label}</div>
        {stat.description && (
          <div className="stat-description">{stat.description}</div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      ref={blockRef}
      className={`stats-block layout-${data.layout}`}
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
      }}
    >
      {(data.title || data.subtitle) && (
        <div className="stats-header">
          {data.title && (
            <h2 className="stats-title">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="stats-subtitle">{data.subtitle}</p>
          )}
        </div>
      )}

      <div 
        className="stats-container"
        style={{
          gridTemplateColumns: data.layout === 'grid' 
            ? `repeat(${Math.min(data.columns, data.stats.length)}, 1fr)`
            : undefined
        }}
      >
        {data.stats.map(renderStat)}
      </div>

      <style>{`
        .stats-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stats-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .stats-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 40px;
        }

        .layout-grid .stats-container {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .layout-horizontal .stats-container {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .layout-vertical .stats-container {
          grid-template-columns: 1fr;
          max-width: 600px;
          gap: 30px;
        }

        .layout-cards .stats-container {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .stat-item {
          text-align: center;
          transition: all 0.3s ease;
        }

        .layout-cards .stat-item {
          background: white;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          border: 1px solid #e0e0e0;
        }

        .layout-cards .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .layout-vertical .stat-item {
          display: flex;
          align-items: center;
          text-align: left;
          gap: 20px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .layout-horizontal .stat-item {
          padding: 20px;
        }

        .stat-icon {
          margin-bottom: 20px;
        }

        .layout-vertical .stat-icon {
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .stat-icon i {
          font-size: 3rem;
          color: #667eea;
          opacity: 0.8;
        }

        .layout-vertical .stat-icon i {
          font-size: 2.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
          line-height: 1;
        }

        .layout-horizontal .stat-value {
          font-size: 2.5rem;
        }

        .layout-vertical .stat-value {
          font-size: 2.2rem;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .layout-vertical .stat-label {
          font-size: 1rem;
          margin-bottom: 3px;
        }

        .stat-description {
          font-size: 0.9rem;
          color: #777;
          line-height: 1.4;
        }

        .layout-vertical .stat-description {
          font-size: 0.85rem;
        }

        /* Animation classes */
        .stat-value {
          transition: all 0.3s ease;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .stats-block {
            padding: 60px 20px;
          }

          .stats-container {
            gap: 30px;
          }

          .layout-grid .stats-container,
          .layout-horizontal .stats-container,
          .layout-cards .stats-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .layout-vertical .stat-item {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .layout-vertical .stat-icon {
            margin-bottom: 0;
          }

          .stat-value {
            font-size: 2.5rem;
          }

          .layout-horizontal .stat-value,
          .layout-vertical .stat-value {
            font-size: 2rem;
          }

          .stats-title {
            font-size: 2rem;
          }

          .stat-icon i {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-container {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .layout-cards .stat-item {
            padding: 30px 20px;
          }

          .stat-value {
            font-size: 2.2rem;
          }

          .stat-label {
            font-size: 1rem;
          }
        }

        /* Custom color variations */
        .stat-item:nth-child(4n+1) .stat-icon i {
          color: #667eea;
        }

        .stat-item:nth-child(4n+2) .stat-icon i {
          color: #f093fb;
        }

        .stat-item:nth-child(4n+3) .stat-icon i {
          color: #4facfe;
        }

        .stat-item:nth-child(4n+4) .stat-icon i {
          color: #43e97b;
        }
      `}</style>
    </div>
  );
};