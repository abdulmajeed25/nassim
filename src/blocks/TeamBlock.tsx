import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Team Block Schema
export const TeamBlockSchema = BaseBlockSchema.extend({
  type: z.literal('team'),
  data: z.object({
    title: z.string().default('فريقنا'),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    members: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      bio: z.string().optional(),
      image: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      socialMedia: z.array(z.object({
        platform: z.string(),
        url: z.string(),
        icon: z.string(),
      })).optional(),
    })),
    layout: z.enum(['grid', 'list', 'carousel']).default('grid'),
    columns: z.number().min(1).max(6).default(3),
    showBio: z.boolean().default(true),
    showContact: z.boolean().default(false),
    showSocialMedia: z.boolean().default(true),
  }),
});

export type TeamBlockData = z.infer<typeof TeamBlockSchema>;

interface TeamBlockProps {
  data: TeamBlockData['data'];
  settings?: TeamBlockData['settings'];
}

export const TeamBlock: React.FC<TeamBlockProps> = ({
  data
}) => {
  const renderMember = (member: any) => (
    <div key={member.id} className="team-member">
      {member.image && (
        <div className="member-image">
          <img src={member.image} alt={member.name} />
        </div>
      )}
      
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        
        {data.showBio && member.bio && (
          <p className="member-bio">{member.bio}</p>
        )}
        
        {data.showContact && (member.email || member.phone) && (
          <div className="member-contact">
            {member.email && (
              <a href={`mailto:${member.email}`} className="contact-link">
                <i className="fas fa-envelope"></i>
                {member.email}
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="contact-link">
                <i className="fas fa-phone"></i>
                {member.phone}
              </a>
            )}
          </div>
        )}
        
        {data.showSocialMedia && member.socialMedia && member.socialMedia.length > 0 && (
          <div className="member-social">
            {member.socialMedia.map((social: any, idx: number) => (
              <a
                key={idx}
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
        )}
      </div>
    </div>
  );

  return (
    <div className={`team-block layout-${data.layout}`}>
      <div className="team-header">
        <h2 className="team-title">{data.title}</h2>
        {data.subtitle && (
          <p className="team-subtitle">{data.subtitle}</p>
        )}
        {data.description && (
          <p className="team-description">{data.description}</p>
        )}
      </div>

      <div 
        className="team-container"
        style={{
          gridTemplateColumns: data.layout === 'grid' 
            ? `repeat(${Math.min(data.columns, data.members.length)}, 1fr)`
            : undefined
        }}
      >
        {data.members.map(renderMember)}
      </div>

      <style>{`
        .team-block {
          padding: 80px 20px;
          background: #f8f9fa;
        }

        .team-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .team-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #333;
        }

        .team-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .team-description {
          font-size: 1.1rem;
          color: #777;
          line-height: 1.6;
        }

        .team-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 40px;
        }

        .layout-grid .team-container {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .layout-list .team-container {
          grid-template-columns: 1fr;
          max-width: 800px;
          gap: 30px;
        }

        .layout-carousel .team-container {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          overflow-x: auto;
          scroll-snap-type: x mandatory;
        }

        .team-member {
          background: white;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .layout-list .team-member {
          display: flex;
          text-align: left;
          align-items: center;
          gap: 30px;
          padding: 25px;
        }

        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .member-image {
          width: 150px;
          height: 150px;
          margin: 0 auto 25px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #f0f0f0;
        }

        .layout-list .member-image {
          margin: 0;
          flex-shrink: 0;
          width: 120px;
          height: 120px;
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-info {
          flex: 1;
        }

        .member-name {
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }

        .member-role {
          font-size: 1rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .member-bio {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .member-contact {
          margin-bottom: 20px;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          margin-right: 15px;
          margin-bottom: 5px;
        }

        .contact-link:hover {
          color: #667eea;
        }

        .contact-link i {
          font-size: 0.8rem;
        }

        .member-social {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .layout-list .member-social {
          justify-content: flex-start;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: #f0f0f0;
          border-radius: 50%;
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
          font-size: 1rem;
        }

        .social-link:hover i {
          color: white;
        }

        @media (max-width: 768px) {
          .team-block {
            padding: 60px 20px;
          }

          .team-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .layout-list .team-member {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }

          .layout-list .member-image {
            margin: 0 auto;
          }

          .layout-list .member-social {
            justify-content: center;
          }

          .team-member {
            padding: 25px 20px;
          }

          .team-title {
            font-size: 2rem;
          }

          .member-image {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};