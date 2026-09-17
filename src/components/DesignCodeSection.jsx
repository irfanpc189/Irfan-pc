import React from 'react';

export default function DesignCodeSection() {
  return (
    <section className="relative w-full z-10 bg-white text-black border-y-[3px] border-black overflow-hidden">
      
      {/* Visual Split Layout */}
      <div className="flex flex-col md:flex-row w-full min-h-[60vh]">
        
        {/* DESIGN HALF */}
        <div className="w-full md:w-1/2 bg-accent-1 p-8 sm:p-16 flex flex-col justify-center items-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-black relative group">
          <div className="absolute top-8 left-8 neo-tag bg-white text-black transform -rotate-3">
            01. VISUALS
          </div>
          
          <h2 className="font-display font-black text-7xl sm:text-9xl uppercase tracking-tighter transform group-hover:scale-110 transition-transform duration-300">
            DESIGN
          </h2>
          
          <p className="mt-8 font-bold text-xl sm:text-2xl max-w-sm text-center">
            Pixels, auto-layout, components, typography, and visual hierarchy.
          </p>
        </div>

        {/* CODE HALF */}
        <div className="w-full md:w-1/2 bg-primary text-white p-8 sm:p-16 flex flex-col justify-center items-center relative group">
          <div className="absolute top-8 right-8 neo-tag bg-black text-white transform rotate-3">
            02. LOGIC
          </div>
          
          <h2 className="font-display font-black text-7xl sm:text-9xl uppercase tracking-tighter transform group-hover:scale-110 transition-transform duration-300" style={{ textShadow: '6px 6px 0px var(--color-black)' }}>
            + CODE
          </h2>
          
          <p className="mt-8 font-bold text-xl sm:text-2xl max-w-sm text-center">
            React, Tailwind, animations, state management, and semantic markup.
          </p>
        </div>
        
      </div>

      {/* Central overlapping badge */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
        <div className="neo-card bg-accent-2 text-white p-6 rounded-full w-32 h-32 flex items-center justify-center text-center rotate-12 shadow-[8px_8px_0px_#000]">
          <span className="font-display font-black text-2xl uppercase leading-none">NO<br/>HANDOFF</span>
        </div>
      </div>

    </section>
  );
}
