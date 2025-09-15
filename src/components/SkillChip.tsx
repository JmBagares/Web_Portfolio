import React from 'react';

interface SkillChipProps {
  children: React.ReactNode;
  size?: 'small' | 'medium';
  className?: string;
}

export function SkillChip({ children, size = 'medium', className = '' }: SkillChipProps) {
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-3 py-1.5"
  };
  
  const classes = `inline-flex items-center bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-muted hover-chip ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
}