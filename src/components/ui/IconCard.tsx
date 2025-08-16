import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconCardProps {
  icon: LucideIcon;
  text: string;
}

const IconCard: React.FC<IconCardProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
      <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
      <span className="text-white text-sm font-medium">{text}</span>
    </div>
  );
};

export default IconCard;