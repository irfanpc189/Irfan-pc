import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import MDEditor from '@uiw/react-md-editor';

export default function PublicCaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [sections, setSections] = useState([]);
  const [images, setImages] = useState([]);
  const [insights, setInsights] = useState([]);
  const [goals, setGoals] = useState([]);
  const [nextCaseStudy, setNextCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when slug changes
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    async function fetchCaseStudy() {
      setLoading(true);
      setError(null);
      try {
        // Fetch main case study
        const { data: cs, error: csError } = await supabase
          .from('case_studies')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (csError || !cs) {
          throw new Error("Case study not found or not published.");
        }
        
        setCaseStudy(cs);

        // Fetch related data in parallel
        const [
          { data: secs },
          { data: imgs },
          { data: insgs },
          { data: gls },
          { data: nextCsList }
        ] = await Promise.all([
          supabase.from('case_study_sections').select('*').eq('case_study_id', cs.id).order('display_order'),
          supabase.from('case_study_images').select('*').eq('case_study_id', cs.id).order('display_order'),
          supabase.from('case_study_insights').select('*').eq('case_study_id', cs.id).order('display_order'),
          supabase.from('case_study_goals').select('*').eq('case_study_id', cs.id).order('display_order'),
          supabase.from('case_studies').select('title, slug').eq('published', true).gt('display_order', cs.display_order).order('display_order').limit(1)
        ]);

        setSections(secs || []);
        setImages(imgs || []);
        setInsights(insgs || []);
        setGoals(gls || []);

        if (nextCsList && nextCsList.length > 0) {
          setNextCaseStudy(nextCsList[0]);
        } else {
          // Wrap around to the first one if this is the last
          const { data: firstCsList } = await supabase.from('case_studies').select('title, slug').eq('published', true).order('display_order').limit(1);
          if (firstCsList && firstCsList.length > 0 && firstCsList[0].slug !== cs.slug) {
            setNextCaseStudy(firstCsList[0]);
          }
        }

      } catch (err) {
        console.error("Error fetching case study:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudy();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center pt-20 px-4 md:px-12 bg-grid">
      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
        <h1 className="text-4xl font-black uppercase font-display animate-pulse">Loading...</h1>
      </div>
    </div>
  );
  
  if (error || !caseStudy) return (
    <div className="min-h-screen bg-accent-2 flex flex-col items-center justify-center pt-20 px-4 md:px-12 bg-grid">
      <div className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_#000] text-center max-w-2xl">
        <h1 className="text-7xl font-black uppercase font-display mb-8" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>404</h1>
        <p className="text-2xl font-bold mb-12">{error || "Case study not found."}</p>
        <Link to="/#case-studies" className="neo-btn bg-black text-white hover:bg-white hover:text-black">← BACK TO CASE STUDIES</Link>
      </div>
    </div>
  );

  const parsedTools = Array.isArray(caseStudy.tools) ? caseStudy.tools : (typeof caseStudy.tools === 'string' ? JSON.parse(caseStudy.tools || '[]') : []);

  // Helper to get images of a specific type
  const getImagesByType = (type) => images.filter(img => img.image_type === type);

  return (
    <div className="min-h-screen bg-white text-black font-body selection:bg-accent-1 selection:text-black bg-grid overflow-x-hidden">
      
      {/* Back Button (Fixed) */}
      <Link 
        to="/#case-studies" 
        aria-label="Back to Case Studies"
        className="fixed top-[24px] left-[24px] z-[999] bg-accent-1 text-black w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group"
      >
        <span className="text-2xl md:text-3xl font-black group-hover:-translate-x-1 transition-transform">←</span>
      </Link>
      
      {/* HERO SECTION */}
      <header className="relative w-full pt-[180px] md:pt-[240px] pb-16 md:pb-24 px-4 md:px-12 bg-primary border-b-4 border-black flex flex-col items-center text-center">
        <div className="max-w-6xl mx-auto w-full relative z-30">
          <div className="neo-tag bg-accent-1 text-black font-black uppercase text-sm md:text-base border-4 border-black shadow-[4px_4px_0px_#000] transform -rotate-2 inline-block px-4 py-2 mb-8 md:mb-12">
            CASE STUDY // {caseStudy.display_order.toString().padStart(2, '0')}
          </div>
          
          <h1 
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight mb-8 leading-[0.9] text-white"
            style={{ textShadow: '6px 6px 0px var(--color-black)' }}
          >
            {caseStudy.title}
          </h1>
          
          <div className="bg-black text-white p-6 md:p-8 border-4 border-white shadow-[8px_8px_0px_var(--color-accent-1)] max-w-4xl mx-auto transform rotate-1 mt-8">
            <p className="text-xl md:text-3xl font-bold leading-snug">
              {caseStudy.short_description}
            </p>
          </div>
        </div>
      </header>

      {/* Metadata Grid */}
      <div className="w-full bg-white border-b-4 border-black py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row border-4 border-black shadow-[8px_8px_0px_#000] bg-white">
          <div className="flex-1 p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {caseStudy.category?.trim() && (
              <div>
                <h4 className="font-black uppercase text-sm mb-2 opacity-70 tracking-widest">Category</h4>
                <p className="font-black uppercase text-lg md:text-xl leading-tight">{caseStudy.category}</p>
              </div>
            )}
            {caseStudy.project_type?.trim() && (
              <div>
                <h4 className="font-black uppercase text-sm mb-2 opacity-70 tracking-widest">Project Type</h4>
                <p className="font-black uppercase text-lg md:text-xl leading-tight">{caseStudy.project_type}</p>
              </div>
            )}
            {caseStudy.role?.trim() && (
              <div>
                <h4 className="font-black uppercase text-sm mb-2 opacity-70 tracking-widest">Role</h4>
                <p className="font-black uppercase text-lg md:text-xl leading-tight">{caseStudy.role}</p>
              </div>
            )}
            {caseStudy.timeline?.trim() && (
              <div>
                <h4 className="font-black uppercase text-sm mb-2 opacity-70 tracking-widest">Timeline</h4>
                <p className="font-black uppercase text-lg md:text-xl leading-tight">{caseStudy.timeline}</p>
              </div>
            )}
          </div>
          {parsedTools.length > 0 && (
            <div className="md:w-1/3 bg-black text-white p-8 md:p-12 border-t-4 md:border-t-0 md:border-l-4 border-black">
              <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-accent-1">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {parsedTools.map((tool, idx) => (
                  <span key={idx} className="bg-white text-black font-bold px-3 py-1 text-sm uppercase">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Image */}
      {caseStudy.hero_image && (
        <div className="w-full bg-accent-1 border-b-4 border-black p-4 md:p-12">
          <div className="max-w-7xl mx-auto border-4 border-black shadow-[12px_12px_0px_#000] bg-white overflow-hidden relative">
            <div className="w-full h-8 bg-black flex items-center px-4 gap-2 border-b-4 border-black">
               <div className="w-3 h-3 rounded-full bg-accent-2"></div>
               <div className="w-3 h-3 rounded-full bg-accent-1"></div>
               <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <img src={caseStudy.hero_image} alt={`${caseStudy.title} hero`} className="w-full h-auto object-cover block" />
          </div>
        </div>
      )}

      {/* DYNAMIC SECTIONS */}
      <article className="max-w-5xl mx-auto px-4 md:px-12 py-24 space-y-32">
        {sections.map((section, idx) => {
          const sectionNum = (idx + 1).toString().padStart(2, '0');
          
          return (
            <section key={section.id} className="relative w-full">
              <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12 border-b-4 border-black pb-6">
                <span className="font-display font-black text-6xl md:text-8xl text-accent-2 leading-none" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>{sectionNum}</span>
                <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight leading-none">{section.title || section.section_type}</h2>
              </div>
              
              <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-12 mb-12">
                <div className="prose prose-xl prose-p:font-bold prose-headings:font-black prose-headings:uppercase prose-headings:font-display max-w-none leading-relaxed text-black">
                  <MDEditor.Markdown source={section.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: 'inherit', fontFamily: 'inherit' }} />
                </div>
              </div>

              {/* Specific Logic based on section_type */}
              {section.section_type === 'Goals' && goals.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                  {goals.map((goal, gIdx) => (
                    <div key={goal.id} className="neo-card bg-[#FFDE59] p-8 border-4 border-black shadow-[8px_8px_0px_#000] transform hover:-translate-y-2 transition-transform">
                      <span className="font-display font-black text-4xl block mb-4 border-b-4 border-black pb-2">0{gIdx + 1}</span>
                      <h3 className="font-black text-2xl uppercase mb-4 font-display">{goal.title}</h3>
                      <p className="font-bold text-lg">{goal.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.section_type === 'Research' && insights.length > 0 && (
                <div className="space-y-8 my-16">
                  {insights.map((insight, iIdx) => (
                    <div key={insight.id} className="neo-card bg-black text-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_var(--color-accent-2)] transform rotate-1 hover:rotate-0 transition-transform">
                      <span className="font-black uppercase text-sm md:text-base block mb-4 tracking-widest text-accent-1">INSIGHT 0{iIdx + 1}</span>
                      <h3 className="font-display font-black text-3xl md:text-4xl uppercase mb-6">{insight.title}</h3>
                      <p className="font-bold text-lg md:text-xl leading-relaxed text-gray-200">{insight.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Images associated with the section type */}
              {(() => {
                let sectionImages = [];
                if (section.section_type === 'Final UI') sectionImages = getImagesByType('final-ui');
                else if (section.section_type === 'Wireframes') sectionImages = getImagesByType('wireframe');
                else if (section.section_type === 'User Flow') sectionImages = getImagesByType('user-flow');
                else if (section.section_type === 'Design Direction') sectionImages = getImagesByType('design');
                else if (section.section_type === 'Research') sectionImages = getImagesByType('research');
                else if (section.section_type === 'Development') sectionImages = getImagesByType('development');

                if (sectionImages.length > 0) {
                  return (
                    <div className="space-y-16 my-16">
                      {sectionImages.map(img => (
                        <figure key={img.id} className="w-full">
                          <div className="neo-card border-4 border-black shadow-[12px_12px_0px_#000] bg-gray-100 overflow-hidden relative">
                            <img src={img.image_url} alt={img.alt_text || 'Case study image'} className="w-full h-auto block" loading="lazy" />
                          </div>
                          {img.caption && (
                            <figcaption className="mt-6 font-bold uppercase text-base md:text-lg text-center">
                              <span className="bg-white border-2 border-black inline-block px-4 py-2 shadow-[4px_4px_0px_#000] transform -rotate-1">
                                {img.caption}
                              </span>
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  );
                }
                return null;
              })()}

            </section>
          );
        })}
        
        {/* GALLLERY (Any remaining gallery images that haven't been shown) */}
        {getImagesByType('gallery').length > 0 && (
          <section className="my-32 space-y-16">
            <div className="flex items-center justify-center mb-16">
               <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight text-center bg-accent-1 border-4 border-black p-6 shadow-[8px_8px_0px_#000] transform -rotate-2">
                 GALLERY
               </h2>
            </div>
            {getImagesByType('gallery').map(img => (
              <figure key={img.id} className="w-full">
                <div className="neo-card border-4 border-black shadow-[12px_12px_0px_#000] bg-gray-100 overflow-hidden relative">
                  <img src={img.image_url} alt={img.alt_text || 'Gallery image'} className="w-full h-auto block" loading="lazy" />
                </div>
                {img.caption && (
                  <figcaption className="mt-6 font-bold uppercase text-base md:text-lg text-center">
                    <span className="bg-white border-2 border-black inline-block px-4 py-2 shadow-[4px_4px_0px_#000] transform -rotate-1">
                      {img.caption}
                    </span>
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}
      </article>

      {/* NAVIGATION FOOTER */}
      <footer className="w-full bg-accent-2 border-t-4 border-black py-24 px-4 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          
          <h2 className="font-display font-black text-6xl md:text-9xl uppercase mb-12 text-white leading-none" style={{ textShadow: '6px 6px 0px var(--color-black)' }}>
            NEXT <br /> PROJECT
          </h2>

          {nextCaseStudy ? (
            <div className="flex flex-col items-center gap-8 bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_#000] transform rotate-1 max-w-4xl w-full">
              <span className="neo-tag bg-primary text-white text-lg">UP NEXT</span>
              <h3 className="font-display font-black text-4xl md:text-6xl uppercase">{nextCaseStudy.title}</h3>
              <Link 
                to={`/case-studies/${nextCaseStudy.slug}`} 
                className="neo-btn bg-black text-white hover:bg-accent-1 hover:text-black text-xl md:text-2xl px-10 py-5 mt-4"
              >
                READ CASE STUDY ↗
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_#000] transform rotate-1 max-w-4xl w-full">
              <h3 className="font-display font-black text-4xl md:text-6xl uppercase">BACK TO START</h3>
              <Link to="/#case-studies" className="neo-btn bg-black text-white hover:bg-accent-1 hover:text-black text-xl md:text-2xl px-10 py-5 mt-4">
                VIEW ALL PROJECTS ↗
              </Link>
            </div>
          )}

          <div className="mt-24">
            <Link 
              to="/#case-studies" 
              className="font-black uppercase text-xl md:text-2xl border-b-4 border-black pb-1 hover:text-white hover:border-white transition-colors text-black"
            >
              ← BACK TO ALL CASE STUDIES
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
