import React from 'react';
import { cn } from '@/lib/utils';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title: React.FC<TitleProps> = ({ children, className, as = 'h2' }) => {
  const Component = as;
  
  return (
    <Component className={cn("title-effect", className)}>
      {children}
    </Component>
  );
};

export default Title;