import React from 'react';

const skills = [
  { 
    category: 'DESIGN', 
    color: 'bg-accent-1',
    items: [
      'Figma', 'UI Design', 'UX Design', 'Wireframing', 
      'Prototyping', 'Design Systems', 'Typography', 
      'Visual Hierarchy', 'Photoshop', 'Illustrator'
    ] 
  },
  { 
    category: 'DEVELOPMENT', 
    color: 'bg-primary',
    textColor: 'text-white',
    items: [
      'HTML', 'CSS', 'Bootstrap', 'JavaScript', 
      'React', 'Git', 'GitHub'
    ] 
  }
];

export default function SkillsSection() {
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
          {skills.map((group, idx) => (
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
