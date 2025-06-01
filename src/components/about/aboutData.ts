
import { Target, Users, Globe, TrendingUp, Rocket, Brain, Zap } from 'lucide-react';
import { Statistic, ExpertiseItem, ColorClassesMap } from './aboutTypes';

export const statistics: Statistic[] = [
  { icon: Target, label: 'Successful Projects', value: '1,500+', color: 'cyan' },
  { icon: Users, label: 'Expert Team Members', value: '230+', color: 'blue' },
  { icon: Globe, label: 'Cities Worldwide', value: '56+', color: 'purple' },
  { icon: TrendingUp, label: 'Years of Innovation', value: '7+', color: 'pink' }
];

export const expertise: ExpertiseItem[] = [
  {
    icon: Rocket,
    title: 'Product-Led Growth Approach',
    description: 'We don\'t just develop software—we build products with a clear growth strategy. Every feature, UI component, and integration is designed to improve user engagement, reduce friction, and drive measurable business outcomes.',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80&auto=format&fit=crop'
  },
  {
    icon: Brain,
    title: 'Deep Tech + Business Understanding',
    description: 'Our strength lies in bridging the gap between technology and business. We deeply understand user psychology, business models, and market dynamics, allowing us to build systems that perform under real business pressure.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop'
  },
  {
    icon: Zap,
    title: 'Speed + Iteration Mastery',
    description: 'With 1500+ projects delivered, we\'ve refined the art of rapid prototyping, MVP development, and iterative scaling. Whether you\'re launching in 30 days or scaling to 1M users, our agile frameworks deliver results—fast.',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop'
  },
  {
    icon: Users,
    title: 'True Technology Partner',
    description: 'We don\'t work for our clients. We work with them—as partners. From ideation to launch and beyond, we embed ourselves in your mission and act as your extended tech team, not a vendor.',
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop'
  },
  {
    icon: Target,
    title: 'Complex Problem Solving',
    description: 'From automating legacy business operations to building AI-powered workflows and integrating third-party APIs, we specialize in solving non-obvious, high-impact problems with elegant tech solutions.',
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80&auto=format&fit=crop'
  },
  {
    icon: Globe,
    title: 'Global Delivery Mindset',
    description: 'With a presence in 56+ cities and clients across 10+ countries, we understand the nuances of building systems for global scale—languages, regulations, latency, user behavior, and infrastructure.',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80&auto=format&fit=crop'
  }
];

export const recognitions = [
  'Forbes',
  'Entrepreneur',
  'YourStory'
];

export const colorClasses: ColorClassesMap = {
  cyan: {
    border: 'border-cyan-400/30',
    gradient: 'from-cyan-400/10 to-cyan-600/10',
    icon: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30',
    text: 'text-cyan-400',
    tag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    overlay: 'from-cyan-900/80 via-black/60 to-cyan-900/80'
  },
  blue: {
    border: 'border-blue-400/30',
    gradient: 'from-blue-400/10 to-blue-600/10',
    icon: 'bg-blue-500/10 text-blue-400 border-blue-400/30',
    text: 'text-blue-400',
    tag: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    overlay: 'from-blue-900/80 via-black/60 to-blue-900/80'
  },
  purple: {
    border: 'border-purple-400/30',
    gradient: 'from-purple-400/10 to-purple-600/10',
    icon: 'bg-purple-500/10 text-purple-400 border-purple-400/30',
    text: 'text-purple-400',
    tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    overlay: 'from-purple-900/80 via-black/60 to-purple-900/80'
  },
  pink: {
    border: 'border-pink-400/30',
    gradient: 'from-pink-400/10 to-pink-600/10',
    icon: 'bg-pink-500/10 text-pink-400 border-pink-400/30',
    text: 'text-pink-400',
    tag: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    overlay: 'from-pink-900/80 via-black/60 to-pink-900/80'
  }
};
