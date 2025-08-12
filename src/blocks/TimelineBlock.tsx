import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Timeline Block Schema
export const TimelineBlockSchema = BaseBlockSchema.extend({
  type: z.literal('timeline'),
  data: z.object({
    title: z.string().default('رحلتنا'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    events: z.array(z.object({
      id: z.string(),
      date: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
      icon: z.string().optional(),
      link: z.string().optional(),
      linkText: z.string().optional(),
      category: z.string().optional(),
    })),
    layout: z.enum(['vertical', 'horizontal', 'alternating']).default('vertical'),
    showImages: z.boolean().default(true),
    showIcons: z.boolean().default(true),
    showCategories: z.boolean().default(false),
    dateFormat: z.enum(['full', 'short', 'year']).default('short'),
    animation: z.boolean().default(true),
  }),
});

export type TimelineBlockData = z.infer<typeof TimelineBlockSchema>;

interface TimelineBlockProps {
  data: TimelineBlockData['data'];
  settings?: TimelineBlockData['settings'];
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({
  data
}) => {
  const [visibleEvents, setVisibleEvents] = React.useState<Set<string>>(new Set());
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (!data.animation) {
      setVisibleEvents(new Set(data.events.map(e => e.id)));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute('data-event-id');
            if (eventId) {
              setVisibleEvents(prev => new Set([...prev, eventId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [data.animation, data.events]);

  const handleEventRef = React.useCallback((element: HTMLDivElement | null, eventId: string) => {
    if (element && observerRef.current && data.animation) {
      element.setAttribute('data-event-id', eventId);
      observerRef.current.observe(element);
    }
  }, [data.animation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    switch (data.dateFormat) {
      case 'full':
        return date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'year':
        return date.getFullYear().toString();
      default:
        return date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'short'
        });
    }
  };

  const handleEventClick = (event: any) => {
    if (event.link) {
      window.open(event.link, '_blank');
    }
  };

  const getAnimationClass = (eventId: string) => {
    if (!data.animation) return '';
    
    const isVisible = visibleEvents.has(eventId);
    return `animate ${isVisible ? 'animate-in' : 'animate-out'}`;
  };

  const renderEvent = (event: any, index: number) => (
    <div
      key={event.id}
      ref={(el) => handleEventRef(el, event.id)}
      className={`timeline-event ${data.layout === 'alternating' && index % 2 === 1 ? 'right' : 'left'} ${getAnimationClass(event.id)} ${event.link ? 'clickable' : ''}`}
      onClick={() => handleEventClick(event)}
      style={{
        animationDelay: data.animation ? `${index * 200}ms` : undefined,
      }}
    >
      <div className="event-marker">
        {data.showIcons && event.icon ? (
          <div className="event-icon">
            <i className={event.icon}></i>
          </div>
        ) : (
          <div className="event-dot"></div>
        )}
      </div>
      
      <div className="event-content">
        <div className="event-date">{formatDate(event.date)}</div>
        
        {data.showCategories && event.category && (
          <div className="event-category">{event.category}</div>
        )}
        
        <h3 className="event-title">{event.title}</h3>
        
        {data.showImages && event.image && (
          <div className="event-image">
            <img src={event.image} alt={event.title} />
          </div>
        )}
        
        <p className="event-description">{event.description}</p>
        
        {event.link && event.linkText && (
          <div className="event-link">
            <span className="link-text">{event.linkText}</span>
            <i className="fas fa-arrow-left"></i>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`timeline-block layout-${data.layout}`}>
      <div className="timeline-header">
        <h2 className="timeline-title">{data.title}</h2>
        {data.subtitle && (
          <p className="timeline-subtitle">{data.subtitle}</p>
        )}
        {data.description && (
          <p className="timeline-description">{data.description}</p>
        )}
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-events">
          {data.events.map(renderEvent)}
        </div>
      </div>

      <style>{`
        .timeline-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .timeline-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .timeline-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .timeline-description {
          font-size: 1.1rem;
          color: #777;
          line-height: 1.6;
        }

        .timeline-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .timeline-line {
          position: absolute;
          background: #e0e0e0;
          z-index: 1;
        }

        .layout-vertical .timeline-line {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          transform: translateX(-50%);
        }

        .layout-alternating .timeline-line {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          transform: translateX(-50%);
        }

        .layout-horizontal .timeline-line {
          top: 50%;
          left: 0;
          right: 0;
          height: 3px;
          transform: translateY(-50%);
        }

        .timeline-events {
          position: relative;
          z-index: 2;
        }

        .layout-vertical .timeline-events,
        .layout-alternating .timeline-events {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .layout-horizontal .timeline-events {
          display: flex;
          gap: 60px;
          overflow-x: auto;
          padding: 40px 0;
        }

        .timeline-event {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 30px;
        }

        .layout-vertical .timeline-event {
          justify-content: center;
        }

        .layout-alternating .timeline-event.left {
          justify-content: flex-end;
        }

        .layout-alternating .timeline-event.right {
          justify-content: flex-start;
          flex-direction: row-reverse;
        }

        .layout-horizontal .timeline-event {
          flex-direction: column;
          align-items: center;
          min-width: 300px;
        }

        .timeline-event.clickable {
          cursor: pointer;
        }

        .timeline-event.clickable:hover .event-content {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .event-marker {
          position: relative;
          z-index: 3;
          flex-shrink: 0;
        }

        .event-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .event-dot {
          width: 20px;
          height: 20px;
          background: #667eea;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 0 0 3px #667eea;
        }

        .event-content {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          max-width: 400px;
          transition: all 0.3s ease;
          border: 1px solid #e0e0e0;
        }

        .layout-horizontal .event-content {
          max-width: 280px;
        }

        .event-date {
          font-size: 0.9rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .event-category {
          display: inline-block;
          background: #f0f4ff;
          color: #667eea;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .event-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }

        .event-image {
          width: 100%;
          height: 150px;
          margin-bottom: 15px;
          border-radius: 8px;
          overflow: hidden;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .event-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #667eea;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .event-link:hover {
          gap: 12px;
        }

        .event-link i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .event-link:hover i {
          transform: translateX(-3px);
        }

        /* Animation classes */
        .animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .layout-alternating .timeline-event.right .animate {
          transform: translateY(30px) translateX(30px);
        }

        .layout-alternating .timeline-event.right .animate.animate-in {
          transform: translateY(0) translateX(0);
        }

        .layout-horizontal .animate {
          transform: translateX(30px);
        }

        .layout-horizontal .animate.animate-in {
          transform: translateX(0);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .timeline-block {
            padding: 60px 20px;
          }

          .layout-vertical .timeline-line,
          .layout-alternating .timeline-line {
            left: 30px;
          }

          .layout-vertical .timeline-event,
          .layout-alternating .timeline-event {
            justify-content: flex-start;
            flex-direction: row;
          }

          .layout-alternating .timeline-event.right {
            flex-direction: row;
          }

          .timeline-events {
            gap: 40px;
          }

          .event-content {
            max-width: none;
            padding: 25px 20px;
          }

          .timeline-title {
            font-size: 2rem;
          }

          .event-icon {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .event-title {
            font-size: 1.2rem;
          }

          .layout-horizontal .timeline-events {
            flex-direction: column;
            gap: 40px;
            overflow-x: visible;
          }

          .layout-horizontal .timeline-line {
            display: none;
          }

          .layout-horizontal .timeline-event {
            flex-direction: row;
            align-items: flex-start;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .timeline-event {
            gap: 20px;
          }

          .event-content {
            padding: 20px 15px;
          }

          .event-image {
            height: 120px;
          }

          .event-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .event-dot {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};