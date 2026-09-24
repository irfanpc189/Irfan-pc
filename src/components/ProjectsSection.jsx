import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useState } from 'react';
import { supabase } from '../lib/supabase';

// The hardcoded projects have been removed and are now fetched dynamically from Supabase

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const outerCardsRef = useRef([]); 
  const innerCardsRef = useRef([]); 
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          throw new Error("No projects found");
        }
      } catch (err) {
        console.error("Error fetching projects, using fallback:", err.message);
        setProjects([
          {
            id: 'fallback-1',
            title: 'Mock Project 1',
            description: 'This is a fallback project displaying because the database is currently unreachable. Configure your Supabase tables to replace this.',
            tags: ['React', 'Tailwind'],
            image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            live_url: '#',
            updated_at: new Date().toISOString()
          },
          {
            id: 'fallback-2',
            title: 'Mock Project 2',
            description: 'This is another fallback project. Set up your Supabase backend to make this dynamic.',
            tags: ['UI/UX', 'Figma'],
            image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
            live_url: '#',
            updated_at: new Date().toISOString()
          }
        ]);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

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
  }, [projects]);

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
                className={`work-card h-full w-full origin-top bg-[#FFDE59] text-black border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_#000] transition-shadow duration-300 flex flex-col lg:flex-row overflow-hidden`}
              >
                
                {/* Main Content Layout */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between pr-0 lg:pr-8 mb-8 lg:mb-0">
                  
                  {/* Top Card Badges */}
                  <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
                    <span className="bg-white text-black font-bold border-2 border-black px-3 py-1 text-sm uppercase shadow-[3px_3px_0px_#000]">
                      {project.tags?.[0] || 'PROJECT'}
                    </span>
                    <span className="bg-black text-white font-mono font-bold px-3 py-1 text-sm border-2 border-black">
                      {new Date(project.updated_at).getFullYear()}
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
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-block bg-black text-white hover:bg-white hover:text-black font-black uppercase text-lg px-6 py-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                          VIEW CASE STUDY ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Preview Image */}
                <div className="w-full lg:w-1/2 h-64 lg:h-auto border-4 border-black overflow-hidden bg-gray-200 shadow-[6px_6px_0px_#000]">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-125 grayscale-[20%]"
                      loading="lazy"
                    />
                  )}
                </div>

              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
