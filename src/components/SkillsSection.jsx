import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SkillsSection() {
  const [dbSkills, setDbSkills] = useState([]);

  useEffect(() => {
    async function fetchSkills() {
      try {
        // Fetch from new skills table
        const { data, error } = await supabase.from('skills').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
          setDbSkills(data);
        } else {
          // Fallback to old site_content if skills table is empty or fails
          const { data: legacyData, error: legacyError } = await supabase.from('site_content').select('*').eq('key', 'skills_list').single();
          if (!legacyError && legacyData?.value?.text) {
            const legacyArray = legacyData.value.text.split(',').map(s => s.trim()).filter(Boolean);
            // Map legacy strings to a default object format so the UI still renders them
            setDbSkills(legacyArray.map((name, i) => ({ id: `legacy-${i}`, name, category: 'development' })));
          }
        }
      } catch (err) {
        console.error("Error fetching skills, using fallback:", err.message);
      }
    }
    fetchSkills();
  }, []);

  const defaultSkills = [
    { 
      category: 'DESIGN SKILLS', 
      color: 'bg-accent-1',
      items: [
        'Figma', 'UI Design', 'UX Design', 'Wireframing', 
        'Prototyping', 'Design Systems', 'Typography', 
        'Visual Hierarchy', 'Photoshop', 'Illustrator'
      ] 
    },
    { 
      category: 'DEVELOPMENT SKILLS', 
      color: 'bg-primary',
      textColor: 'text-white',
      items: [
        'HTML', 'CSS', 'Bootstrap', 'JavaScript', 
        'React', 'Git', 'GitHub'
      ] 
    }
  ];

  // Group fetched skills
  let displayGroups = defaultSkills;
  
  if (dbSkills.length > 0) {
    const designItems = dbSkills.filter(s => s.category === 'design').map(s => s.name);
    const devItems = dbSkills.filter(s => s.category === 'development').map(s => s.name);
    
    // Only use the fetched data if it actually contains items to avoid rendering empty boxes
    if (designItems.length > 0 || devItems.length > 0) {
      displayGroups = [
        {
          category: 'DESIGN SKILLS',
          color: 'bg-accent-1',
          items: designItems
        },
        {
          category: 'DEVELOPMENT SKILLS',
          color: 'bg-primary',
          textColor: 'text-white',
          items: devItems
        }
      ];
    }
  }

  return (
    <section id="skills" className="w-full py-24 px-4 md:px-8 bg-white text-black border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center mb-16">
          <span className="neo-tag bg-accent-2 text-white mb-6 transform -rotate-2">
            ARSENAL
          </span>
          <h2 className="font-display font-black text-6xl sm:text-7xl uppercase text-center" style={{ textShadow: '4px 4px 0px var(--color-accent-1)' }}>
            MY TOOLKIT
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {displayGroups.map((group, idx) => (
            <div 
              key={idx} 
              className={`neo-card ${group.color} ${group.textColor || 'text-black'} p-8 sm:p-12`}
            >
              <h3 className="font-display font-black text-4xl uppercase border-b-4 border-black pb-4 mb-8">
                {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {group.items.map((skill, i) => (
                  <div 
                    key={i}
                    className="neo-tag bg-white text-black text-lg py-2 px-6 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
