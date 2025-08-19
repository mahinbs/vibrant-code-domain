import React from 'react';

const PageGlowLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary glow zones - positioned to create seamless flow */}
      <div 
        className="absolute w-[800px] h-[800px] -top-40 -right-40 opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] top-1/4 -left-60 opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, hsl(var(--accent) / 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div 
        className="absolute w-[1000px] h-[1000px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{
          background: 'radial-gradient(ellipse, hsl(var(--secondary) / 0.2) 0%, hsl(var(--secondary) / 0.1) 50%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />
      
      <div 
        className="absolute w-[700px] h-[700px] bottom-1/4 -right-60 opacity-35"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.08) 45%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />
      
      <div 
        className="absolute w-[500px] h-[500px] bottom-10 left-1/4 opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, hsl(var(--accent) / 0.1) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      {/* Subtle connecting gradients for seamless flow */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(var(--primary) / 0.1) 0%, 
              transparent 25%, 
              hsl(var(--accent) / 0.1) 50%, 
              transparent 75%, 
              hsl(var(--secondary) / 0.1) 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default PageGlowLayer;