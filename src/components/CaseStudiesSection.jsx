import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('published', true)
          .order('featured', { ascending: false })
          .order('display_order', { ascending: true });

        if (error) throw error;
        
        const parsedData = (data || []).map(cs => {
          let parsedTools = [];
          if (cs.tools) {
            try {
              parsedTools = typeof cs.tools === 'string' ? JSON.parse(cs.tools) : cs.tools;
            } catch (e) {
              parsedTools = [];
            }
          }
          return { ...cs, tools: parsedTools };
        });
        
        setCaseStudies(parsedData);
      } catch (err) {
        console.error("Error fetching case studies:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();
  }, []);

  if (loading || caseStudies.length === 0) return null;

  return (
    <section id="case-studies" className="relative w-full py-24 px-4 md:px-12 bg-white text-black border-t-8 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b-4 border-black pb-8">
          <span className="inline-block bg-accent-1 text-black font-black uppercase text-sm px-3 py-1 border-2 border-black mb-6 shadow-neo-sm">
            Case Studies
          </span>
          <h2 className="font-display font-black text-5xl md:text-8xl uppercase tracking-tight leading-none mb-6">
            BEHIND THE<br />INTERFACE.
          </h2>
          <p className="text-xl md:text-3xl font-bold max-w-3xl">
            A look at the thinking, process, and decisions behind selected digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mb-16">
          {caseStudies.map((cs, index) => (
            <article key={cs.id} className="group flex flex-col md:flex-row bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-shadow duration-300">
              <div className="w-full md:w-5/12 border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden bg-gray-100 min-h-[300px]">
                {cs.cover_image && (
                  <img
                    src={cs.cover_image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="font-display font-black text-5xl md:text-7xl text-black">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">{cs.title}</h3>
                  
                  <div className="mb-10 flex flex-col gap-6">
                    <span className="font-black uppercase tracking-widest text-sm md:text-base bg-black text-white px-4 py-2 self-start inline-block">
                      {cs.category}
                    </span>
                    <p className="text-xl md:text-2xl font-bold leading-relaxed text-black">
                      {cs.short_description}
                    </p>
                  </div>

                  {cs.tools && cs.tools.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-16">
                      {cs.tools.map((tool, i) => (
                        <span key={i} className="text-base font-bold uppercase border-2 border-black px-4 py-2 bg-gray-50 text-black">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Link to={`/case-studies/${cs.slug}`} className="inline-flex items-center justify-center w-full md:w-auto bg-primary text-white font-black uppercase text-xl md:text-3xl px-8 py-6 md:px-12 md:py-8 border-4 border-black shadow-[8px_8px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#000] transition-all">
                    VIEW CASE STUDY &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
