import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {eyebrow && (
        <p className="text-accent mb-2 uppercase tracking-wide font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}