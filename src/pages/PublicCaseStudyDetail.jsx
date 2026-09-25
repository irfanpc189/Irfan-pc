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

  if (loading) return <div className="min-h-screen pt-40 px-4 md:px-12 text-3xl font-black uppercase text-center">Loading Case Study...</div>;
  
  if (error || !caseStudy) return (
    <div className="min-h-screen pt-40 px-4 md:px-12 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-black uppercase mb-8">404</h1>
      <p className="text-xl font-bold mb-8">{error || "Case study not found."}</p>
      <Link to="/case-studies" className="neo-btn">← BACK TO CASE STUDIES</Link>
    </div>
  );

  const parsedTools = Array.isArray(caseStudy.tools) ? caseStudy.tools : (typeof caseStudy.tools === 'string' ? JSON.parse(caseStudy.tools || '[]') : []);

  // Helper to get images of a specific type
  const getImagesByType = (type) => images.filter(img => img.image_type === type);

  return (
    <div className="min-h-screen bg-white text-black font-body pt-32 pb-24">
      
      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-4 md:px-12 mb-24">
        <div className="mb-12">
          <span className="inline-block bg-accent-1 text-black font-black uppercase text-sm px-3 py-1 border-2 border-black mb-6 shadow-neo-sm">
            CASE STUDY / {caseStudy.display_order.toString().padStart(2, '0')}
          </span>
          <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tight mb-8 leading-none">
            {caseStudy.title}
          </h1>
          <p className="text-2xl md:text-3xl font-bold max-w-4xl leading-snug">
            {caseStudy.short_description}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8 border-t-4 border-b-4 border-black mb-16">
          <div>
            <h4 className="font-black uppercase text-sm mb-2 text-gray-500">Category</h4>
            <p className="font-bold uppercase">{caseStudy.category}</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-2 text-gray-500">Role</h4>
            <p className="font-bold uppercase">{caseStudy.role}</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-2 text-gray-500">Timeline</h4>
            <p className="font-bold uppercase">{caseStudy.timeline}</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-2 text-gray-500">Project Type</h4>
            <p className="font-bold uppercase">{caseStudy.project_type}</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-2 text-gray-500">Tools</h4>
            <p className="font-bold uppercase">{parsedTools.join(', ')}</p>
          </div>
        </div>

        {/* Hero Image */}
        {caseStudy.hero_image && (
          <div className="w-full border-4 border-black shadow-[12px_12px_0px_#000] bg-gray-100 hidden md:block">
            <img src={caseStudy.hero_image} alt={`${caseStudy.title} hero`} className="w-full h-auto object-cover" />
          </div>
        )}
      </header>

      {/* DYNAMIC SECTIONS */}
      <article className="max-w-4xl mx-auto px-4 md:px-12 space-y-32">
        {sections.map((section, idx) => {
          const sectionNum = (idx + 1).toString().padStart(2, '0');
          
          return (
            <section key={section.id} className="relative">
              <div className="flex items-center gap-6 mb-12">
                <span className="font-mono font-black text-4xl text-primary">{sectionNum}</span>
                <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">{section.title || section.section_type}</h2>
              </div>
              
              <div className="prose prose-lg prose-p:font-bold prose-headings:font-black prose-headings:uppercase max-w-none text-xl leading-relaxed mb-12">
                <MDEditor.Markdown source={section.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: 'inherit' }} />
              </div>

              {/* Specific Logic based on section_type */}
              {section.section_type === 'Goals' && goals.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  {goals.map((goal, gIdx) => (
                    <div key={goal.id} className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
                      <span className="font-mono font-black text-2xl block mb-4">0{gIdx + 1}</span>
                      <h3 className="font-black text-2xl uppercase mb-4">{goal.title}</h3>
                      <p className="font-bold">{goal.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.section_type === 'Research' && insights.length > 0 && (
                <div className="space-y-8 my-12">
                  {insights.map((insight, iIdx) => (
                    <div key={insight.id} className="bg-accent-2 text-white p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
                      <span className="font-black uppercase text-sm block mb-2 tracking-widest">Insight 0{iIdx + 1}</span>
                      <h3 className="font-black text-3xl uppercase mb-4">{insight.title}</h3>
                      <p className="font-bold text-lg">{insight.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Images associated with the section type (fallback to 'gallery' if Final UI) */}
              {(() => {
                let sectionImages = [];
                if (section.section_type === 'Final UI') sectionImages = getImagesByType('final-ui');
                else if (section.section_type === 'Wireframes') sectionImages = getImagesByType('wireframe');
                else if (section.section_type === 'User Flow') sectionImages = getImagesByType('user-flow');
                else if (section.section_type === 'Design Direction') sectionImages = getImagesByType('design');
                else if (section.section_type === 'Research') sectionImages = getImagesByType('research');
                else if (section.section_type === 'Development') sectionImages = getImagesByType('development');

                // Check for gallery images at the end if it's outcome or learnings, or if it's just custom
                
                if (sectionImages.length > 0) {
                  return (
                    <div className="space-y-12 my-16">
                      {sectionImages.map(img => (
                        <figure key={img.id} className="w-full">
                          <div className="border-4 border-black shadow-[12px_12px_0px_#000] bg-gray-100 overflow-hidden">
                            <img src={img.image_url} alt={img.alt_text || 'Case study image'} className="w-full h-auto" />
                          </div>
                          {img.caption && (
                            <figcaption className="mt-4 font-bold uppercase text-sm text-center">
                              {img.caption}
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
          <section className="my-24 space-y-12">
            <h2 className="font-display font-black text-4xl uppercase tracking-tight mb-12">Gallery</h2>
            {getImagesByType('gallery').map(img => (
              <figure key={img.id} className="w-full">
                <div className="border-4 border-black shadow-[12px_12px_0px_#000] bg-gray-100 overflow-hidden">
                  <img src={img.image_url} alt={img.alt_text || 'Gallery image'} className="w-full h-auto" />
                </div>
                {img.caption && (
                  <figcaption className="mt-4 font-bold uppercase text-sm text-center">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}
      </article>

      {/* NAVIGATION FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 md:px-12 mt-32 border-t-4 border-black pt-16 flex flex-col md:flex-row justify-between items-center gap-12">
        <Link to="/case-studies" className="font-black uppercase text-xl border-b-4 border-transparent hover:border-black transition-colors pb-1">
          ← BACK TO CASE STUDIES
        </Link>

        {nextCaseStudy && (
          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4">
            <span className="font-black uppercase text-gray-500 tracking-widest text-sm">Next Case Study</span>
            <h3 className="font-display font-black text-4xl md:text-5xl uppercase">{nextCaseStudy.title}</h3>
            <Link to={`/case-studies/${nextCaseStudy.slug}`} className="bg-black text-white font-black uppercase px-8 py-4 border-2 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              READ CASE STUDY →
            </Link>
          </div>
        )}
      </footer>

    </div>
  );
}
