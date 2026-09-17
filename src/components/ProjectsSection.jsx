import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Re-Store',
    category: 'DIY Repair & Upcycling',
    year: '2026',
    description: 'A community-driven platform promoting sustainable living through repair guides, upcycling tutorials, and a marketplace for refurbished goods.',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=1600&auto=format&fit=crop',
    color: 'bg-primary'
  },
  {
    id: 2,
    title: 'Houzing',
    category: 'Real Estate Platform',
    year: '2025',
    description: 'A modern real estate platform that simplifies property discovery with immersive virtual tours and seamless agent communication.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    color: 'bg-accent-1'
  },
  {
    id: 3,
    title: 'Rexecommerce',
    category: 'E-commerce Experience',
    year: '2025',
    description: 'High-end streetwear and sneaker storefront featuring 3D product viewing and an optimized checkout funnel.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=1600&auto=format&fit=crop',
    color: 'bg-white'
  },
  {
    id: 4,
    title: 'Travel App',
    category: 'Mobile Redesign',
    year: '2024',
    description: 'A complete redesign of a travel application focusing on seamless booking, interactive maps, and itinerary management.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1600&auto=format&fit=crop',
    color: 'bg-accent-2'
  },
  {
    id: 5,
    title: 'CareHaven',
    category: 'Senior Care Website',
    year: '2024',
    description: 'A compassionate, highly accessible web presence connecting families with trusted senior care professionals and facilities.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop',
    color: 'bg-primary'
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-24 px-4 md:px-8 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 border-b-4 border-black pb-8 gap-6">
          <h2 className="font-display font-black text-6xl sm:text-8xl uppercase leading-none" style={{ textShadow: '4px 4px 0px var(--color-accent-1)' }}>
            SELECTED<br/>WORKS
          </h2>
          <div className="neo-tag bg-black text-white text-xl py-3 px-6 transform rotate-2">
            2024 — 2026
          </div>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, idx) => (
            <article 
              key={project.id} 
              className={`neo-card ${project.color} flex flex-col lg:flex-row overflow-hidden transform transition-transform duration-300 hover:-translate-y-2`}
            >
              <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black">
                
                <div className="flex justify-between items-start mb-8">
                  <span className="neo-tag bg-white text-black">{project.category}</span>
                  <span className="neo-tag bg-black text-white font-mono">{project.year}</span>
                </div>

                <div>
                  <h3 className={`font-display font-black text-5xl sm:text-6xl uppercase mb-6 ${project.color === 'bg-primary' ? 'text-white' : 'text-black'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-xl font-medium leading-relaxed ${project.color === 'bg-primary' ? 'text-white' : 'text-black'}`}>
                    {project.description}
                  </p>
                </div>
                
                <div className="mt-12">
                  <button className="neo-btn bg-white text-black shadow-[4px_4px_0px_#000]">
                    VIEW PROJECT ↗
                  </button>
                </div>

              </div>

              <div className="w-full lg:w-1/2 h-[400px] lg:h-auto border-l-[3px] lg:border-l-0 lg:border-l-[3px] border-black" style={{ borderLeftColor: 'transparent' }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover filter contrast-125 grayscale-[20%]"
                />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
