import React from 'react';

const workflow = [
  { num: '01', title: 'DISCOVER', desc: 'Understand the problem.' },
  { num: '02', title: 'DEFINE', desc: 'Clarify the goal and user needs.' },
  { num: '03', title: 'DESIGN', desc: 'Wireframes → UI → Prototype.' },
  { num: '04', title: 'BUILD', desc: 'Turn the design into a real interface.' },
  { num: '05', title: 'REFINE', desc: 'Test, improve and polish.' },
];

export default function WorkflowSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-primary text-white border-y-[3px] border-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-16">
          <h2 className="font-display font-black text-6xl sm:text-8xl uppercase leading-none" style={{ textShadow: '6px 6px 0px var(--color-black)' }}>
            WORKFLOW
          </h2>
        </div>

        <div className="relative flex flex-col gap-8 md:gap-12">
          {/* Visual connecting line */}
          <div className="absolute left-8 md:left-24 top-0 bottom-0 w-[4px] bg-black z-0 hidden md:block"></div>

          {workflow.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 group">
              
              <div className="flex-shrink-0 w-16 h-16 md:w-48 md:h-48 neo-card bg-accent-1 text-black flex items-center justify-center rotate-3 group-hover:-rotate-3 transition-transform">
                <span className="font-display font-black text-3xl md:text-7xl">{step.num}</span>
              </div>
              
              <div className="flex flex-col gap-2 neo-card bg-white text-black p-6 md:p-10 w-full transform -rotate-1 group-hover:rotate-1 transition-transform">
                <h3 className="font-display font-black text-3xl md:text-5xl uppercase">{step.title}</h3>
                <p className="font-semibold text-lg md:text-2xl">{step.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
