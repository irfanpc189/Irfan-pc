import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useState } from 'react';
import { supabase } from '../lib/supabase';

// The hardcoded projects have been removed and are now fetched dynamically from Supabase

// Helper to parse description into structured sections while strictly preserving original text
function parseProjectDescription(text) {
  if (!text) return [];

  // Match common headings like "Project Overview", "Key Contributions", "Project Outcome"
  const headingRegex = /(?:^|\n+)(Project Overview|Key Contributions|Project Outcome|Contributions|Overview|Outcome):?\s*(?:\n+|$)/gi;
  const matches = [];
  let match;

  while ((match = headingRegex.exec(text)) !== null) {
    matches.push({ title: match[1], start: match.index, end: headingRegex.lastIndex });
  }

  // If no recognized section headers, split into paragraphs
  if (matches.length === 0) {
    return [{
      heading: null,
      paragraphs: text.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
    }];
  }

  const sections = [];
  // Catch any text before the first heading
  if (matches[0].start > 0) {
    const preText = text.slice(0, matches[0].start).trim();
    if (preText) {
      sections.push({
        heading: null,
        paragraphs: preText.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
      });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = matches[i + 1] ? matches[i + 1].start : text.length;
    const body = text.slice(cur.end, nextStart).trim();
    const paragraphs = body.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    sections.push({ heading: cur.title, paragraphs });
  }

  return sections;
}

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
    <section ref={containerRef} id="projects" className="relative w-full pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8 lg:px-12 bg-white text-black">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="w-full bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none text-black">
            SELECTED WORKS
          </h2>
          <span className="bg-black text-white px-4 py-2.5 font-mono font-bold text-base md:text-xl border-2 border-black shadow-[3px_3px_0px_#000] flex-shrink-0">
            2024 — 2026
          </span>
        </div>

        {/* Projects Container */}
        <div className="flex flex-col gap-16 w-full">
          {projects.map((project, index) => {
            const parsedSections = parseProjectDescription(project.description);
            const projectYear = new Date(project.created_at || project.updated_at).getFullYear() || 2026;

            return (
              <div 
                key={project.id} 
                ref={(el) => (outerCardsRef.current[index] = el)}
                className="work-card-wrapper relative w-full"
              >
                <article 
                  ref={(el) => (innerCardsRef.current[index] = el)}
                  className="work-card w-full bg-white text-black border-4 border-black shadow-[8px_8px_0px_#000] md:shadow-[12px_12px_0px_#000] flex flex-col lg:flex-row overflow-hidden"
                >
                  
                  {/* Left Column: Metadata, Title, Structured Overview, CTA */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
                    
                    <div>
                      {/* Top Badges (Category & Year) */}
                      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 border-b-4 border-black pb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {project.tags && project.tags.length > 0 ? (
                            project.tags.map((tag, tIdx) => (
                              <span 
                                key={tIdx} 
                                className="bg-accent-1 text-black font-display font-black text-sm uppercase tracking-wider px-3.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000]"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="bg-accent-1 text-black font-display font-black text-sm uppercase tracking-wider px-3.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                              PROJECT
                            </span>
                          )}
                        </div>
                        <span className="bg-black text-white font-mono font-bold text-sm px-4 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                          {projectYear}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.0] text-black break-words mb-8">
                        {project.title}
                      </h3>

                      {/* Structured Description Sections */}
                      <div className="flex flex-col gap-6 text-black mb-8">
                        {parsedSections.map((sec, sIdx) => {
                          const isContributions = sec.heading && /contribution/i.test(sec.heading);
                          return (
                            <div key={sIdx} className="space-y-3">
                              {sec.heading && (
                                <div className="flex items-center gap-2.5">
                                  <span className="w-3 h-3 bg-primary border-2 border-black inline-block flex-shrink-0 shadow-[1px_1px_0px_#000]" />
                                  <h4 className="font-display font-black text-sm md:text-base uppercase tracking-wider text-black">
                                    {sec.heading}
                                  </h4>
                                </div>
                              )}
                              
                              {isContributions && sec.paragraphs.length > 1 ? (
                                <ul className="space-y-3 my-2.5 pl-4 py-1" style={{ borderLeft: '4px solid #000' }}>
                                  {sec.paragraphs.map((p, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-3 text-base md:text-lg font-medium leading-relaxed text-black/95">
                                      <span className="inline-block w-2 h-2 mt-2 bg-black flex-shrink-0" />
                                      <span>{p}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="space-y-3">
                                  {sec.paragraphs.map((p, pIdx) => (
                                    <p key={pIdx} className="text-base md:text-lg font-medium leading-relaxed text-black/95">
                                      {p}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Prominent Neo-brutalist CTA */}
                    <div className="pt-6 border-t-4 border-black mt-auto">
                      {project.live_url && (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center justify-center gap-3 bg-primary text-white hover:bg-accent-1 hover:text-black font-display font-black uppercase text-base sm:text-lg md:text-xl px-8 sm:px-10 py-4 sm:py-5 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all w-full sm:w-auto"
                        >
                          <span>VIEW CASE STUDY</span>
                          <span className="font-mono text-2xl leading-none">→</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Large Project Preview Image */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-50/50">
                    {project.image_url && (
                      <div className="w-full border-4 border-black bg-white shadow-[8px_8px_0px_#000] overflow-hidden">
                        {/* Frame Top Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-black text-white border-b-4 border-black font-mono text-xs font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 bg-accent-2 border border-black inline-block"></span>
                            <span className="w-2.5 h-2.5 bg-accent-1 border border-black inline-block"></span>
                            <span className="w-2.5 h-2.5 bg-primary border border-black inline-block"></span>
                          </div>
                          <span className="text-xs font-mono font-bold tracking-widest text-white">
                            PROJECT PREVIEW
                          </span>
                        </div>

                        {/* Edge-to-edge Large Image Presentation */}
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-contain block"
                            loading="eager"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
