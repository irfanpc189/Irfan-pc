import React from 'react';

export default function AboutSection() {
  return (
    <section 
      id="about-home"
      className="relative w-full z-10 py-24 px-4 md:px-8 bg-white text-black"
    >
      <div className="max-w-6xl mx-auto w-full relative">
        <div className="flex flex-col">
          
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="neo-tag bg-accent-2 text-white">
              ABOUT ME // THE SHORT STORY
            </span>
          </div>

          <h3 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-black leading-tight max-w-4xl uppercase"
            style={{ textShadow: '2px 2px 0px var(--color-primary)' }}
          >
            I design like a developer and code like a designer. Which means I argue with myself until the pixels behave.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            
            <div className="flex flex-col gap-4 neo-card bg-accent-1 p-8 transform -rotate-1">
              <h4 className="text-xl font-display font-black uppercase border-b-4 border-black pb-2">WHO I AM</h4>
              <p className="font-semibold text-lg leading-relaxed">
                I'm Irfan—a UI/UX designer and frontend developer. I craft high-performance web apps with living backgrounds, buttery-smooth animations, and clean, intuitive interactions.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 neo-card bg-white p-8 transform rotate-1">
              <h4 className="text-xl font-display font-black uppercase border-b-4 border-black pb-2">MY UX PHILOSOPHY</h4>
              <p className="font-semibold text-lg leading-relaxed">
                Good UX is like a good joke—if you have to explain it, it's terrible. Software should feel so natural that people don't even think about the interface.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 neo-card bg-primary text-white p-8 transform -rotate-2">
              <h4 className="text-xl font-display font-black uppercase border-b-4 border-black pb-2">HOW I HELP YOU</h4>
              <p className="font-semibold text-lg leading-relaxed">
                Zero 'designer vs. developer' handoff drama. I design the Figma auto-layouts AND write the responsive React code that powers them—cutting out spec-translation meetings, speeding up sprint cycles, and shipping web experiences that actually convert.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
