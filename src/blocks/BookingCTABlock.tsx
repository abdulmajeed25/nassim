import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Booking CTA Block Schema
export const BookingCTABlockSchema = BaseBlockSchema.extend({
  type: z.literal('bookingCTA'),
  data: z.object({
    title: z.string().default('احجز موعدك الآن'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    phone: z.string(),
    whatsapp: z.string().optional(),
    bookingUrl: z.string().optional(),
    emergencyText: z.string().default('خدمة طوارئ 24/7'),
    features: z.array(z.string()).optional(),
    urgency: z.object({
      enabled: z.boolean().default(false),
      text: z.string().optional(),
      countdown: z.string().optional(),
    }).optional(),
    layout: z.enum(['card', 'banner', 'floating']).default('card'),
    showFeatures: z.boolean().default(true),
    showEmergency: z.boolean().default(true),
  }),
});

export type BookingCTABlockData = z.infer<typeof BookingCTABlockSchema>;

interface BookingCTABlockProps {
  data: BookingCTABlockData['data'];
  settings?: BookingCTABlockData['settings'];
}

export const BookingCTABlock: React.FC<BookingCTABlockProps> = ({
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
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeLeft('انتهت المدة');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [data.urgency]);

  const handlePhoneCall = () => {
    window.location.href = `tel:${data.phone}`;
  };

  const handleWhatsApp = () => {
    if (data.whatsapp) {
      window.open(`https://wa.me/${data.whatsapp}`, '_blank');
    }
  };

  const handleBooking = () => {
    if (data.bookingUrl) {
      window.open(data.bookingUrl, '_blank');
    }
  };

  return (
    <div className={`booking-cta-block layout-${data.layout}`}>
      <div className="booking-cta-content">
        {data.urgency?.enabled && (
          <div className="urgency-banner">
            {data.urgency.text && <span>{data.urgency.text}</span>}
            {timeLeft && <span className="countdown">{timeLeft}</span>}
          </div>
        )}
        
        <div className="cta-header">
          <h3>{data.title}</h3>
          {data.subtitle && <p className="subtitle">{data.subtitle}</p>}
          {data.description && <p className="description">{data.description}</p>}
        </div>

        {data.showFeatures && data.features && data.features.length > 0 && (
          <div className="features-list">
            {data.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="checkmark">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="cta-buttons">
          <button 
            className="btn btn-primary phone-btn"
            onClick={handlePhoneCall}
          >
            <span className="icon">📞</span>
            اتصل الآن: {data.phone}
          </button>

          {data.whatsapp && (
            <button 
              className="btn btn-success whatsapp-btn"
              onClick={handleWhatsApp}
            >
              <span className="icon">💬</span>
              واتساب
            </button>
          )}

          {data.bookingUrl && (
            <button 
              className="btn btn-secondary booking-btn"
              onClick={handleBooking}
            >
              <span className="icon">📅</span>
              احجز موعد
            </button>
          )}
        </div>

        {data.showEmergency && (
          <div className="emergency-notice">
            <span className="emergency-icon">🚨</span>
            <span>{data.emergencyText}</span>
          </div>
        )}
      </div>

      <style>{`
        .booking-cta-block {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .layout-floating {
          position: fixed;
          bottom: 20px;
          right: 20px;
          max-width: 300px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .layout-banner {
          border-radius: 0;
          margin: 0 -20px;
        }

        .urgency-banner {
          background: rgba(255,255,255,0.2);
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .countdown {
          font-weight: bold;
          font-family: monospace;
          font-size: 18px;
        }

        .cta-header h3 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin: 0 0 10px 0;
        }

        .description {
          font-size: 14px;
          opacity: 0.8;
          margin: 0 0 20px 0;
        }

        .features-list {
          margin: 20px 0;
          text-align: right;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .checkmark {
          color: #4CAF50;
          font-weight: bold;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0;
        }

        .btn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: #FF6B6B;
          color: white;
        }

        .btn-success {
          background: #25D366;
          color: white;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 2px solid white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .emergency-notice {
          background: rgba(255,107,107,0.2);
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .emergency-icon {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};