import React from 'react';

const PageGlowLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Light Pink Glow - Top Left */}
      <div 
        className="absolute w-[700px] h-[700px] -top-32 -left-32 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Teal Glow - Top Right */}
      <div 
        className="absolute w-[600px] h-[600px] -top-20 -right-40 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, rgba(20, 184, 166, 0.18) 45%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />
      
      {/* Blue Glow - Center Left */}
      <div 
        className="absolute w-[800px] h-[800px] top-1/3 -left-60 opacity-28"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.32) 0%, rgba(59, 130, 246, 0.16) 50%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />
      
      {/* Light Pink Glow - Center Right */}
      <div 
        className="absolute w-[500px] h-[500px] top-1/2 -right-30 opacity-22"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, rgba(236, 72, 153, 0.14) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Teal Glow - Bottom Left */}
      <div 
        className="absolute w-[650px] h-[650px] bottom-1/4 -left-50 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.15) 45%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />
      
      {/* Blue Glow - Bottom Right */}
      <div 
        className="absolute w-[550px] h-[550px] bottom-20 -right-45 opacity-26"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)',
          filter: 'blur(65px)',
        }}
      />
      
      {/* Additional scattered smaller glows */}
      <div 
        className="absolute w-[400px] h-[400px] top-20 left-1/3 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      <div 
        className="absolute w-[350px] h-[350px] bottom-40 left-1/2 opacity-18"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(6, 182, 212, 0.14) 45%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />
    </div>
  );
};

export default PageGlowLayer;