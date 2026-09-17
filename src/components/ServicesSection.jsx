import React from 'react';

const services = [
  {
    num: '01',
    title: 'UI/UX DESIGN',
    color: 'bg-primary',
    textColor: 'text-white'
  },
  {
    num: '02',
    title: 'WEB DESIGN',
    color: 'bg-accent-1',
    textColor: 'text-black'
  },
  {
    num: '03',
    title: 'FRONTEND DEVELOPMENT',
    color: 'bg-accent-2',
    textColor: 'text-black'
  },
  {
    num: '04',
    title: 'VISUAL DESIGN',
    color: 'bg-white',
    textColor: 'text-black'
  }
];

export default function ServicesSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-white border-y-[3px] border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display font-black text-6xl sm:text-7xl uppercase mb-16" style={{ textShadow: '4px 4px 0px var(--color-primary)' }}>
          WHAT I DO
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv, idx) => (
            <div 
              key={idx} 
              className={`neo-card flex flex-col justify-between p-8 ${srv.color} ${srv.textColor} transform transition-transform hover:scale-105 min-h-[320px]`}
              style={{
                transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`
              }}
            >
              <div className="font-display font-black text-6xl border-b-4 border-black pb-4 mb-4" style={{ opacity: 0.9 }}>
                {srv.num}
              </div>
              <h3 className="font-display font-black text-3xl uppercase leading-tight">
                {srv.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
