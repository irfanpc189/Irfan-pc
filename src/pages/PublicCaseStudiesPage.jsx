import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function PublicCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [categories, setCategories] = useState(['ALL', 'UI/UX', 'PRODUCT', 'FRONTEND']);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setCaseStudies(data);
          // Extract unique categories dynamically, maintaining the required ones
          const uniqueCats = new Set(['ALL', 'UI/UX', 'PRODUCT', 'FRONTEND']);
          data.forEach(cs => {
            if (cs.category) uniqueCats.add(cs.category.toUpperCase());
          });
          setCategories(Array.from(uniqueCats));
        }
      } catch (err) {
        console.error("Error fetching case studies:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();
  }, []);

  const filteredStudies = filter === 'ALL' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category?.toUpperCase() === filter);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-12 bg-white text-black font-body">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 border-b-4 border-black pb-12">
          <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tight mb-6">CASE STUDIES</h1>
          <p className="text-2xl font-bold max-w-3xl">Selected projects, documented from problem → process → solution.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-black uppercase px-6 py-3 border-2 border-black transition-all ${
                filter === cat 
                  ? 'bg-black text-white shadow-neo-sm transform translate-x-1 translate-y-1' 
                  : 'bg-white text-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-3xl font-black uppercase">Loading...</div>
        ) : filteredStudies.length === 0 ? (
          <div className="text-3xl font-black uppercase">No case studies found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredStudies.map((cs, index) => (
              <article key={cs.id} className="group flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-shadow duration-300">
                <div className="w-full h-[300px] border-b-4 border-black overflow-hidden bg-gray-100">
                  {cs.cover_image && (
                    <img
                      src={cs.cover_image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono font-black text-xl">{(index + 1).toString().padStart(2, '0')}</span>
                      <span className="font-black uppercase tracking-widest text-xs bg-black text-white px-2 py-1">{cs.category}</span>
                    </div>
                    <h3 className="font-display text-3xl font-black uppercase mb-4">{cs.title}</h3>
                    <p className="text-lg font-bold mb-8">{cs.short_description}</p>
                  </div>
                  
                  <div>
                    <Link to={`/case-studies/${cs.slug}`} className="inline-block bg-accent-1 text-black font-black uppercase px-6 py-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                      READ STUDY →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
