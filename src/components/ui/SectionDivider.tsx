import React from 'react';

const SectionDivider: React.FC = () => {
  return (
    <div className="relative w-full h-px my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default SectionDivider;