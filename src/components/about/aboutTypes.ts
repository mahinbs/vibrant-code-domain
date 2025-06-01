
import { LucideIcon } from 'lucide-react';

export interface Statistic {
  icon: LucideIcon;
  label: string;
  value: string;
  color: ColorKey;
}

export interface ExpertiseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorKey;
  image: string;
}

export type ColorKey = 'cyan' | 'blue' | 'purple' | 'pink';

export interface ColorClasses {
  border: string;
  gradient: string;
  icon: string;
  text: string;
  tag: string;
  overlay: string;
}

export type ColorClassesMap = Record<ColorKey, ColorClasses>;
