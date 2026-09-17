import React from 'react';

export default function PersistentBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none select-none bg-[#f4f4f0]">
      {/* Neo-Brutalist Grid */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center'
        }}
      />
    </div>
  );
}
