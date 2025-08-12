import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Hero Block Schema
export const HeroBlockSchema = BaseBlockSchema.extend({
  type: z.literal('hero'),
  data: z.object({
    title: z.string().default('مرحباً بكم في موقعنا'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    backgroundImage: z.string().optional(),
    backgroundVideo: z.string().optional(),
    ctaText: z.string().default('ابدأ الآن'),
    ctaUrl: z.string().optional(),
    secondaryCtaText: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    overlay: z.object({
      enabled: z.boolean().default(false),
      color: z.string().default('rgba(0,0,0,0.5)'),
    }).optional(),
    height: z.enum(['small', 'medium', 'large', 'fullscreen']).default('large'),
  }),
});

export type HeroBlockData = z.infer<typeof HeroBlockSchema>;

interface HeroBlockProps {
  title: string;
  subtitle: string;
  description: string;
  alignment: 'left' | 'center' | 'right';
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  height: 'auto' | 'screen' | 'large' | 'medium' | 'small';
  blockId?: string;
  isPreview?: boolean;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
}

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const {
    title,
    subtitle,
    description,
    alignment,
    backgroundImage,
    backgroundVideo,
    overlay,
    ctaText,
    ctaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
    height,
  } = props;

  const handleCtaClick = () => {
    if (ctaUrl) {
      window.open(ctaUrl, '_blank');
    }
  };

  const handleSecondaryCtaClick = () => {
    if (secondaryCtaUrl) {
      window.open(secondaryCtaUrl, '_blank');
    }
  };

  return (
    <div className={`hero-block height-${height} align-${alignment}`}>
      {backgroundImage && (
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {backgroundVideo && (
        <video 
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      
      {overlay?.enabled && (
        <div 
          className="hero-overlay"
          style={{ backgroundColor: overlay.color }}
        />
      )}
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{title}</h1>
          {subtitle && (
            <h2 className="hero-subtitle">{subtitle}</h2>
          )}
          {description && (
            <p className="hero-description">{description}</p>
          )}
        </div>
        
        <div className="hero-actions">
          {ctaText && (
            <button 
              className="btn btn-primary hero-cta"
              onClick={handleCtaClick}
            >
              {ctaText}
            </button>
          )}
          
          {secondaryCtaText && (
            <button 
              className="btn btn-secondary hero-secondary-cta"
              onClick={handleSecondaryCtaClick}
            >
              {secondaryCtaText}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .hero-block {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
        }

        .height-small {
          min-height: 300px;
        }

        .height-medium {
          min-height: 500px;
        }

        .height-large {
          min-height: 700px;
        }

        .height-fullscreen {
          min-height: 100vh;
        }

        .hero-background,
        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 800px;
          padding: 40px 20px;
        }

        .align-left .hero-content {
          text-align: left;
          margin-left: 0;
          margin-right: auto;
        }

        .align-right .hero-content {
          text-align: right;
          margin-left: auto;
          margin-right: 0;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .hero-description {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.8;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .align-left .hero-actions {
          justify-content: flex-start;
        }

        .align-right .hero-actions {
          justify-content: flex-end;
        }

        .btn {
          padding: 12px 30px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};