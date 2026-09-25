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
          .eq('featured', true)
          .order('display_order', { ascending: true })
          .limit(3);
        
        if (error) throw error;
        setCaseStudies(data || []);
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>
              
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono font-black text-2xl">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="font-black uppercase tracking-widest text-sm bg-black text-white px-3 py-1">{cs.category}</span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-black uppercase mb-4">{cs.title}</h3>
                  <p className="text-lg font-bold mb-8">{cs.short_description}</p>
                  
                  {cs.tools && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(typeof cs.tools === 'string' ? JSON.parse(cs.tools) : cs.tools)?.map((tool, i) => (
                        <span key={i} className="text-sm font-bold uppercase border-2 border-black px-2 py-1 bg-gray-50">{tool}</span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <Link to={`/case-studies/${cs.slug}`} className="inline-block bg-primary text-white font-black uppercase px-6 py-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                    VIEW CASE STUDY →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center border-t-4 border-black pt-16">
          <Link to="/case-studies" className="bg-white text-black font-black uppercase text-xl px-8 py-4 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            VIEW ALL CASE STUDIES →
          </Link>
        </div>
      </div>
    </section>
  );
}
