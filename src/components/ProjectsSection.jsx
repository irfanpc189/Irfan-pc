import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'RE-STORE',
    category: 'DIY REPAIR & UPCYCLING',
    year: '2026',
    bgColor: 'bg-[#0047FF]',
    textColor: 'text-white',
    description: 'A community-driven platform promoting sustainable living through repair guides, upcycling tutorials, and a marketplace.',
    img: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'NEXUS UI',
    category: 'DESIGN SYSTEM & COMPONENTS',
    year: '2025',
    bgColor: 'bg-[#FFDE59]',
    textColor: 'text-black',
    description: 'High-performance brutalist component library built for rapid prototyping and accessibility.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'CYBER ARCHIVE',
    category: 'WEB3 PLATFORM',
    year: '2025',
    bgColor: 'bg-[#FF6B6B]',
    textColor: 'text-white',
    description: 'Decentralized digital art archive with dynamic layout grids and custom audio-visual interactions.',
    img: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const outerCardsRef = useRef([]); 
  const innerCardsRef = useRef([]); 

  useEffect(() => {
    let triggers = [];
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      innerCardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Skip scaling the last card
        if (index < projects.length - 1) {
          const t = gsap.to(card, {
            scale: 0.9,
            opacity: 0.6,
            ease: 'none',
            scrollTrigger: {
              // Triggers as the next card stacks over
              trigger: outerCardsRef.current[index + 1], 
              start: 'top bottom-=100',
              end: 'top top+=140',
              scrub: true,
            },
          });
          if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        }
      });

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
        triggers.forEach((t) => t.kill());
        triggers = [];
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="relative w-full py-16 px-4 md:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Pinned Header */}
        <div className="sticky top-4 z-50 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] mb-16 flex justify-between items-center">
          <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tight">SELECTED WORKS</h2>
          <span className="bg-black text-white px-4 py-2 font-mono font-bold text-lg hidden md:block border-2 border-black">
            2024 — 2026
          </span>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative flex flex-col gap-16 pb-32 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={(el) => (outerCardsRef.current[index] = el)}
              className="work-card-wrapper sticky w-full min-h-[70vh]"
              style={{ top: `calc(140px + ${index * 20}px)`, zIndex: 20 + index }}
            >
              <article 
                ref={(el) => (innerCardsRef.current[index] = el)}
                className={`work-card h-full w-full origin-top ${project.bgColor} ${project.textColor} border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_#000] transition-shadow duration-300 flex flex-col lg:flex-row overflow-hidden`}
              >
                
                {/* Main Content Layout */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between pr-0 lg:pr-8 mb-8 lg:mb-0">
                  
                  {/* Top Card Badges */}
                  <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
                    <span className="bg-white text-black font-bold border-2 border-black px-3 py-1 text-sm uppercase shadow-[3px_3px_0px_#000]">
                      {project.category}
                    </span>
                    <span className="bg-black text-white font-mono font-bold px-3 py-1 text-sm border-2 border-black">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    <h3 className="font-display text-5xl md:text-7xl font-black tracking-tight uppercase">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl font-bold leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-4">
                      <button className="bg-black text-white hover:bg-white hover:text-black font-black uppercase text-lg px-6 py-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        VIEW CASE STUDY ↗
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Preview Image */}
                <div className="w-full lg:w-1/2 h-64 lg:h-auto border-4 border-black overflow-hidden bg-gray-200 shadow-[6px_6px_0px_#000]">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-125 grayscale-[20%]"
                  />
                </div>

              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
