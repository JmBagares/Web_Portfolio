import React from 'react';
import { Button } from './Button';
import { SkillChip } from './SkillChip';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  image?: string;
  title: string;
  description: string;
  tags: string[];
  primaryCTA: {
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  };
  onImageClick?: () => void;
}

export function ProjectCard({ 
  image, 
  title, 
  description, 
  tags, 
  primaryCTA, 
  secondaryCTA,
  onImageClick 
}: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover-scale hover-image-zoom group">
      {image && (
        <div 
          className={`aspect-video overflow-hidden ${onImageClick ? 'cursor-pointer' : ''}`}
          onClick={onImageClick}
        >
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <SkillChip key={index} size="small">{tag}</SkillChip>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant={primaryCTA.disabled ? 'disabled' : 'primary'}
            href={primaryCTA.href}
            onClick={primaryCTA.onClick}
            disabled={primaryCTA.disabled}
          >
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button
              variant={secondaryCTA.disabled ? 'disabled' : 'secondary'}
              href={secondaryCTA.href}
              onClick={secondaryCTA.onClick}
              disabled={secondaryCTA.disabled}
            >
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}