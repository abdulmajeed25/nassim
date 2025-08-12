import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Image Block Schema
export const ImageBlockSchema = BaseBlockSchema.extend({
  type: z.literal('image'),
  data: z.object({
    src: z.string(),
    alt: z.string().default('صورة'),
    caption: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    alignment: z.enum(['left', 'center', 'right']).default('center'),
    borderRadius: z.number().default(8),
    shadow: z.boolean().default(false),
    zoom: z.boolean().default(false),
    link: z.string().optional(),
    objectFit: z.enum(['cover', 'contain', 'fill', 'scale-down']).default('cover'),
  }),
});

export type ImageBlockData = z.infer<typeof ImageBlockSchema>;

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  shape?: 'square' | 'rounded' | 'circle';
  shadow?: boolean;
  border?: boolean;
  borderRadius?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  link?: string;
  zoom?: boolean;
  alignment?: 'left' | 'center' | 'right';
  blockId?: string;
  isPreview?: boolean;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  caption,
  width,
  height,
  shadow,
  borderRadius,
  objectFit,
  link,
  zoom,
  alignment
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageClick = () => {
    if (link) {
      window.open(link, '_blank');
    } else if (zoom) {
      setIsZoomed(true);
    }
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`image-block align-${alignment || 'center'}`}>
      <div className="image-container">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-error">
            <span>❌</span>
            <p>فشل في تحميل الصورة</p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`image ${shadow ? 'with-shadow' : ''} ${zoom || link ? 'clickable' : ''}`}
            style={{
              width: width ? `${width}px` : 'auto',
              height: height ? `${height}px` : 'auto',
              borderRadius: borderRadius ? `${borderRadius}px` : '0px',
              objectFit: objectFit || 'cover',
              display: imageLoaded ? 'block' : 'none',
            }}
            onClick={handleImageClick}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {caption && imageLoaded && !imageError && (
          <p className="image-caption">{caption}</p>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="zoom-modal" onClick={handleZoomClose}>
          <div className="zoom-content">
            <button className="zoom-close" onClick={handleZoomClose}>
              ✕
            </button>
            <img
              src={src}
              alt={alt}
              className="zoomed-image"
            />
          </div>
        </div>
      )}

      <style>{`
        .image-block {
          width: 100%;
          margin: 20px 0;
        }

        .align-left {
          text-align: left;
        }

        .align-center {
          text-align: center;
        }

        .align-right {
          text-align: right;
        }

        .image-container {
          position: relative;
          display: inline-block;
          max-width: 100%;
        }

        .image-placeholder {
          width: 200px;
          height: 150px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 2px dashed #ccc;
        }

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .image-error {
          width: 200px;
          height: 150px;
          background-color: #f8f8f8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 2px solid #e74c3c;
          color: #e74c3c;
        }

        .image-error span {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .image-error p {
          margin: 0;
          font-size: 14px;
        }

        .image {
          max-width: 100%;
          height: auto;
          transition: all 0.3s ease;
        }

        .image.with-shadow {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .image.clickable {
          cursor: pointer;
        }

        .image.clickable:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .image-caption {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
          font-style: italic;
          text-align: center;
        }

        .zoom-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
        }

        .zoom-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }

        .zoom-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
        }

        .zoom-close:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .zoomed-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .image-placeholder,
          .image-error {
            width: 150px;
            height: 100px;
          }

          .zoom-content {
            max-width: 95%;
            max-height: 95%;
          }

          .zoom-close {
            top: -35px;
            font-size: 20px;
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};