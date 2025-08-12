import React from 'react';
import { BaseBlockSchema } from './schemas';
import { z } from 'zod';

// Map Block Schema
export const MapBlockSchema = BaseBlockSchema.extend({
  type: z.literal('map'),
  data: z.object({
    title: z.string().optional(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    zoom: z.number().min(1).max(20).default(15),
    height: z.string().default('400px'),
    showMarker: z.boolean().default(true),
    showControls: z.boolean().default(true),
    mapType: z.enum(['roadmap', 'satellite', 'hybrid', 'terrain']).default('roadmap'),
    contactInfo: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      hours: z.string().optional(),
    }).optional(),
  }),
});

export type MapBlockData = z.infer<typeof MapBlockSchema>;

interface MapBlockProps {
  data: MapBlockData['data'];
  settings?: MapBlockData['settings'];
}

export const MapBlock: React.FC<MapBlockProps> = ({ data }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Initialize map (placeholder for actual map implementation)
    if (mapRef.current) {
      // This would integrate with Google Maps, OpenStreetMap, etc.
      console.log('Map initialized with coordinates:', data.latitude, data.longitude);
    }
  }, [data.latitude, data.longitude]);

  return (
    <div className="map-block">
      {data.title && (
        <div className="map-header">
          <h3>{data.title}</h3>
        </div>
      )}
      
      <div className="map-container">
        <div 
          ref={mapRef}
          className="map-element"
          style={{ height: data.height }}
        >
          {/* Map placeholder */}
          <div className="map-placeholder">
            <div className="map-info">
              <h4>الموقع</h4>
              <p>{data.address}</p>
              {data.contactInfo && (
                <div className="contact-info">
                  {data.contactInfo.phone && (
                    <p>الهاتف: {data.contactInfo.phone}</p>
                  )}
                  {data.contactInfo.email && (
                    <p>البريد: {data.contactInfo.email}</p>
                  )}
                  {data.contactInfo.hours && (
                    <p>ساعات العمل: {data.contactInfo.hours}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};