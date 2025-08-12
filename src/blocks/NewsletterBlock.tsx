import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Newsletter Block Schema
export const NewsletterBlockSchema = BaseBlockSchema.extend({
  type: z.literal('newsletter'),
  data: z.object({
    title: z.string().default('اشترك في النشرة الإخبارية'),
    description: z.string().optional(),
    placeholder: z.string().default('أدخل بريدك الإلكتروني'),
    buttonText: z.string().default('اشترك'),
    successMessage: z.string().default('تم الاشتراك بنجاح!'),
    privacyText: z.string().optional(),
    layout: z.enum(['horizontal', 'vertical']).default('horizontal'),
  }),
});

export type NewsletterBlockData = z.infer<typeof NewsletterBlockSchema>;

interface NewsletterBlockProps {
  data: NewsletterBlockData['data'];
  settings?: NewsletterBlockData['settings'];
}

export const NewsletterBlock: React.FC<NewsletterBlockProps> = ({ data }) => {
  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className={`newsletter-block ${data.layout}`}>
      <div className="newsletter-content">
        <h3>{data.title}</h3>
        {data.description && <p>{data.description}</p>}
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={data.placeholder}
              required
            />
            <button type="submit">{data.buttonText}</button>
          </form>
        ) : (
          <div className="success-message">
            {data.successMessage}
          </div>
        )}
        
        {data.privacyText && (
          <p className="privacy-text">{data.privacyText}</p>
        )}
      </div>
    </div>
  );
};