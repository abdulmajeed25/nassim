import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Contact Block Schema
export const ContactBlockSchema = BaseBlockSchema.extend({
  type: z.literal('contact'),
  data: z.object({
    title: z.string().default('تواصل معنا'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
      workingHours: z.string().optional(),
      whatsapp: z.string().optional(),
      socialMedia: z.array(z.object({
        platform: z.string(),
        url: z.string(),
        icon: z.string(),
      })).optional(),
    }),
    form: z.object({
      enabled: z.boolean().default(true),
      fields: z.array(z.object({
        name: z.string(),
        label: z.string(),
        type: z.enum(['text', 'email', 'tel', 'textarea', 'select']),
        required: z.boolean().default(false),
        placeholder: z.string().optional(),
        options: z.array(z.string()).optional(),
      })),
      submitText: z.string().default('إرسال الرسالة'),
      submitUrl: z.string().optional(),
    }),
    layout: z.enum(['split', 'stacked', 'sidebar']).default('split'),
    showMap: z.boolean().default(false),
    mapUrl: z.string().optional(),
  }),
});

export type ContactBlockData = z.infer<typeof ContactBlockSchema>;

interface ContactBlockProps {
  data: ContactBlockData['data'];
  settings?: ContactBlockData['settings'];
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  data
}) => {
  const [formData, setFormData] = React.useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.form.submitUrl) {
        // In a real implementation, you would submit to the URL
        console.log('Submitting to:', data.form.submitUrl, formData);
      }
      
      setSubmitStatus('success');
      setFormData({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContactInfo = () => (
    <div className="contact-info">
      <h3>معلومات التواصل</h3>
      
      <div className="contact-items">
        {data.contactInfo.phone && (
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="contact-details">
              <span className="contact-label">الهاتف</span>
              <a href={`tel:${data.contactInfo.phone}`} className="contact-value">
                {data.contactInfo.phone}
              </a>
            </div>
          </div>
        )}
        
        {data.contactInfo.whatsapp && (
          <div className="contact-item">
            <div className="contact-icon whatsapp">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="contact-details">
              <span className="contact-label">واتساب</span>
              <a 
                href={`https://wa.me/${data.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
              >
                {data.contactInfo.whatsapp}
              </a>
            </div>
          </div>
        )}
        
        {data.contactInfo.email && (
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-details">
              <span className="contact-label">البريد الإلكتروني</span>
              <a href={`mailto:${data.contactInfo.email}`} className="contact-value">
                {data.contactInfo.email}
              </a>
            </div>
          </div>
        )}
        
        {data.contactInfo.address && (
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-details">
              <span className="contact-label">العنوان</span>
              <span className="contact-value">{data.contactInfo.address}</span>
            </div>
          </div>
        )}
        
        {data.contactInfo.workingHours && (
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="contact-details">
              <span className="contact-label">ساعات العمل</span>
              <span className="contact-value">{data.contactInfo.workingHours}</span>
            </div>
          </div>
        )}
      </div>
      
      {data.contactInfo.socialMedia && data.contactInfo.socialMedia.length > 0 && (
        <div className="social-media">
          <h4>تابعنا على</h4>
          <div className="social-links">
            {data.contactInfo.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={social.platform}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderForm = () => {
    if (!data.form.enabled) return null;

    return (
      <div className="contact-form">
        <h3>أرسل لنا رسالة</h3>
        
        <form onSubmit={handleSubmit}>
          {data.form.fields.map((field, index) => (
            <div key={index} className="form-group">
              <label htmlFor={field.name} className="form-label">
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="form-input"
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  className="form-input"
                >
                  <option value="">اختر...</option>
                  {field.options?.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="form-input"
                />
              )}
            </div>
          ))}
          
          <button 
            type="submit" 
            className="form-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جاري الإرسال...' : data.form.submitText}
          </button>
          
          {submitStatus === 'success' && (
            <div className="form-message success">
              تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="form-message error">
              حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.
            </div>
          )}
        </form>
      </div>
    );
  };

  const renderMap = () => {
    if (!data.showMap || !data.mapUrl) return null;

    return (
      <div className="contact-map">
        <iframe
          src={data.mapUrl}
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="موقعنا على الخريطة"
        ></iframe>
      </div>
    );
  };

  return (
    <div className={`contact-block layout-${data.layout}`}>
      <div className="contact-header">
        <h2 className="contact-title">{data.title}</h2>
        {data.subtitle && (
          <p className="contact-subtitle">{data.subtitle}</p>
        )}
        {data.description && (
          <p className="contact-description">{data.description}</p>
        )}
      </div>

      <div className="contact-content">
        {data.layout === 'split' ? (
          <>
            <div className="contact-left">
              {renderContactInfo()}
            </div>
            <div className="contact-right">
              {renderForm()}
            </div>
          </>
        ) : data.layout === 'sidebar' ? (
          <>
            <div className="contact-main">
              {renderForm()}
              {renderMap()}
            </div>
            <div className="contact-sidebar">
              {renderContactInfo()}
            </div>
          </>
        ) : (
          <div className="contact-stacked">
            {renderContactInfo()}
            {renderForm()}
            {renderMap()}
          </div>
        )}
      </div>

      <style>{`
        .contact-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .contact-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .contact-description {
          font-size: 1.1rem;
          color: #777;
          line-height: 1.6;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 60px;
        }

        .layout-split .contact-content {
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }

        .layout-sidebar .contact-content {
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .layout-stacked .contact-content {
          grid-template-columns: 1fr;
          max-width: 800px;
        }

        .contact-info {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .contact-info h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 30px;
          color: #333;
        }

        .contact-items {
          margin-bottom: 30px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 25px;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-icon.whatsapp {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        }

        .contact-icon i {
          color: white;
          font-size: 1.2rem;
        }

        .contact-details {
          flex: 1;
        }

        .contact-label {
          display: block;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .contact-value {
          font-size: 1.1rem;
          color: #333;
          text-decoration: none;
          font-weight: 600;
        }

        .contact-value:hover {
          color: #667eea;
        }

        .social-media {
          border-top: 1px solid #e0e0e0;
          padding-top: 25px;
        }

        .social-media h4 {
          font-size: 1.1rem;
          margin-bottom: 15px;
          color: #333;
        }

        .social-links {
          display: flex;
          gap: 10px;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: #f0f0f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #667eea;
          transform: translateY(-2px);
        }

        .social-link i {
          color: #666;
          font-size: 1.1rem;
        }

        .social-link:hover i {
          color: white;
        }

        .contact-form {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .contact-form h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 30px;
          color: #333;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e74c3c;
          margin-left: 3px;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-submit {
          width: 100%;
          padding: 15px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-message {
          margin-top: 15px;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .form-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .form-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .contact-map {
          margin-top: 40px;
        }

        .layout-stacked .contact-map {
          margin-top: 60px;
        }

        @media (max-width: 768px) {
          .contact-block {
            padding: 60px 20px;
          }

          .layout-split .contact-content,
          .layout-sidebar .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-info,
          .contact-form {
            padding: 30px 20px;
          }

          .contact-title {
            font-size: 2rem;
          }

          .contact-item {
            gap: 12px;
          }

          .contact-icon {
            width: 45px;
            height: 45px;
          }

          .social-links {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};