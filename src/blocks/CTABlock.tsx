import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// CTA Block Schema
export const CTABlockSchema = BaseBlockSchema.extend({
  type: z.literal('cta'),
  data: z.object({
    title: z.string().default('ابدأ رحلتك معنا اليوم'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    primaryButtonText: z.string().default('ابدأ الآن'),
    primaryButtonUrl: z.string().optional(),
    secondaryButtonText: z.string().optional(),
    secondaryButtonUrl: z.string().optional(),
    backgroundImage: z.string().optional(),
    backgroundColor: z.string().default('#667eea'),
    textColor: z.string().default('#ffffff'),
    layout: z.enum(['centered', 'split', 'minimal']).default('centered'),
    urgency: z.object({
      enabled: z.boolean().default(false),
      text: z.string().optional(),
      countdown: z.string().optional(),
    }).optional(),
  }),
});

export type CTABlockData = z.infer<typeof CTABlockSchema>;

interface CTABlockProps {
  data: CTABlockData['data'];
  settings?: CTABlockData['settings'];
}

export const CTABlock: React.FC<CTABlockProps> = ({
  data
}) => {
  const [timeLeft, setTimeLeft] = React.useState<string>('');

  React.useEffect(() => {
    if (data.urgency?.enabled && data.urgency.countdown) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const target = new Date(data.urgency!.countdown!).getTime();
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeLeft(`${days}د ${hours}س ${minutes}ق ${seconds}ث`);
        } else {
          setTimeLeft('انتهت المدة');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [data.urgency]);

  const handlePrimaryClick = () => {
    if (data.primaryButtonUrl) {
      window.open(data.primaryButtonUrl, '_blank');
    }
  };

  const handleSecondaryClick = () => {
    if (data.secondaryButtonUrl) {
      window.open(data.secondaryButtonUrl, '_blank');
    }
  };

  return (
    <div 
      className={`cta-block layout-${data.layout}`}
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
      }}
    >
      {data.backgroundImage && (
        <div className="cta-overlay" />
      )}
      
      <div className="cta-content">
        {data.urgency?.enabled && (
          <div className="urgency-banner">
            {data.urgency.text && <span className="urgency-text">{data.urgency.text}</span>}
            {timeLeft && <span className="countdown">{timeLeft}</span>}
          </div>
        )}
        
        <div className="cta-text">
          <h2 className="cta-title">{data.title}</h2>
          {data.subtitle && (
            <h3 className="cta-subtitle">{data.subtitle}</h3>
          )}
          {data.description && (
            <p className="cta-description">{data.description}</p>
          )}
        </div>
        
        <div className="cta-buttons">
          <button 
            className="btn btn-primary"
            onClick={handlePrimaryClick}
          >
            {data.primaryButtonText}
          </button>
          
          {data.secondaryButtonText && (
            <button 
              className="btn btn-secondary"
              onClick={handleSecondaryClick}
            >
              {data.secondaryButtonText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .cta-block {
          position: relative;
          padding: 80px 20px;
          text-align: center;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .cta-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .layout-split .cta-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          text-align: right;
        }

        .layout-minimal {
          padding: 40px 20px;
        }

        .urgency-banner {
          background: rgba(255, 107, 107, 0.9);
          color: white;
          padding: 15px 30px;
          border-radius: 50px;
          margin-bottom: 30px;
          display: inline-flex;
          align-items: center;
          gap: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .urgency-text {
          font-weight: bold;
        }

        .countdown {
          font-family: monospace;
          font-size: 1.1em;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.2);
          padding: 5px 15px;
          border-radius: 20px;
        }

        .cta-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .cta-description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.8;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .layout-split .cta-buttons {
          justify-content: flex-start;
        }

        .btn {
          padding: 15px 40px;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          min-width: 180px;
        }

        .btn-primary {
          background: white;
          color: #333;
        }

        .btn-secondary {
          background: transparent;
          color: inherit;
          border: 2px solid currentColor;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          background: #f8f9fa;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .layout-minimal .cta-title {
          font-size: 2rem;
        }

        .layout-minimal .btn {
          padding: 12px 30px;
          font-size: 1rem;
          min-width: 150px;
        }

        @media (max-width: 768px) {
          .cta-block {
            padding: 60px 20px;
          }

          .layout-split .cta-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .cta-title {
            font-size: 2.5rem;
          }

          .cta-subtitle {
            font-size: 1.3rem;
          }

          .cta-description {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }

          .urgency-banner {
            flex-direction: column;
            gap: 10px;
            padding: 12px 20px;
          }

          .countdown {
            font-size: 1em;
          }
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: 2rem;
          }

          .btn {
            padding: 12px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};