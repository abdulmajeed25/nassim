import React from 'react';
import { Block } from '../types';
import { HeroBlock } from '../blocks/HeroBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { ServicesBlock } from '../blocks/ServicesBlock';
import { CTABlock } from '../blocks/CTABlock';
import { TestimonialBlock } from '../blocks/TestimonialBlock';
import { FAQBlock } from '../blocks/FAQBlock';
import { PricingBlock } from '../blocks/PricingBlock';
import { StatsBlock } from '../blocks/StatsBlock';
import { ContactBlock } from '../blocks/ContactBlock';
import { FeatureGridBlock } from '../blocks/FeatureGridBlock';
import { TimelineBlock } from '../blocks/TimelineBlock';
import { TeamBlock } from '../blocks/TeamBlock';
import { LogoCloudBlock } from '../blocks/LogoCloudBlock';
import { NewsletterBlock } from '../blocks/NewsletterBlock';
import { MapBlock } from '../blocks/MapBlock';
import { BeforeAfterBlock } from '../blocks/BeforeAfterBlock';
import { EmergencyNoticeBlock } from '../blocks/EmergencyNoticeBlock';
import { PackagesBlock } from '../blocks/PackagesBlock';
import { GuaranteesBlock } from '../blocks/GuaranteesBlock';
import { WorkShowcaseBlock } from '../blocks/WorkShowcaseBlock';
import { PartnersBlock } from '../blocks/PartnersBlock';
import { BookingCTABlock } from '../blocks/BookingCTABlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
  isEditing?: boolean;
  onEdit?: (blockId: string) => void;
  customizationLevel?: 'basic' | 'medium' | 'advanced';
}

const blockComponents = {
  hero: HeroBlock,
  text: TextBlock,
  image: ImageBlock,
  services: ServicesBlock,
  cta: CTABlock,
  testimonial: TestimonialBlock,
  faq: FAQBlock,
  pricing: PricingBlock,
  stats: StatsBlock,
  contact: ContactBlock,
  featureGrid: FeatureGridBlock,
  timeline: TimelineBlock,
  team: TeamBlock,
  logoCloud: LogoCloudBlock,
  newsletter: NewsletterBlock,
  map: MapBlock,
  beforeAfter: BeforeAfterBlock,
  emergencyNotice: EmergencyNoticeBlock,
  packages: PackagesBlock,
  guarantees: GuaranteesBlock,
  workShowcase: WorkShowcaseBlock,
  partners: PartnersBlock,
  bookingCTA: BookingCTABlock,
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isPreview = false,
  isEditing = false,
  onEdit,
  customizationLevel = 'basic'
}) => {
  const BlockComponent = blockComponents[block.type as keyof typeof blockComponents];

  if (!BlockComponent) {
    console.warn(`Unknown block type: ${block.type}`);
    return (
      <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 text-red-600 text-center">
        <p>نوع الكتلة غير معروف: {block.type}</p>
      </div>
    );
  }

  const wrapperClasses = [
    isEditing && 'relative group',
    isPreview && 'border border-dashed border-blue-300',
    block.settings?.spacing && `py-${block.settings.spacing}`,
    block.settings?.background && getBackgroundClasses(block.settings.background),
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => onEdit?.(block.id)}
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
          >
            تحرير
          </button>
        </div>
      )}
      <BlockComponent
        {...block.data}
        blockId={block.id}
        isPreview={isPreview}
        customizationLevel={customizationLevel}
        settings={block.settings}
      />
    </div>
  );
};

function getBackgroundClasses(background: any): string {
  if (!background) return '';
  
  switch (background.type) {
    case 'solid':
      return `bg-${background.color || 'white'}`;
    case 'gradient':
      return `bg-gradient-to-r from-${background.from} to-${background.to}`;
    case 'pattern':
      return `bg-${background.pattern} bg-${background.color || 'gray-100'}`;
    default:
      return '';
  }
}