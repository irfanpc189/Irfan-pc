import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full min-h-[85vh] bg-primary text-white py-12 px-4 md:px-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto w-full relative">
        
        {/* Decorative blocks */}
        <div className="absolute -top-12 -left-4 sm:-left-12 neo-card bg-accent-1 text-black p-4 rotate-6 z-0">
          <span className="font-display font-black text-2xl">FINAL CHAPTER</span>
        </div>
        <div className="absolute -bottom-8 -right-4 sm:-right-8 w-24 h-24 bg-accent-2 border-[3px] border-black rounded-full shadow-[6px_6px_0px_#000] z-0 -rotate-12"></div>

        <div className="relative z-10 flex flex-col items-center text-center mt-12 bg-white text-black border-[3px] border-black p-8 sm:p-16 lg:p-24 shadow-[12px_12px_0px_#000]">
          
          <div className="mb-8 inline-flex items-center gap-2 neo-tag bg-primary text-white border-black transform -rotate-1">
            <span className="w-3 h-3 rounded-full bg-accent-1 border-2 border-black animate-pulse" />
            <span>DESTINATION REACHED</span>
          </div>

          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-[7rem] leading-none tracking-tight mb-8 uppercase" style={{ textShadow: '4px 4px 0px var(--color-accent-1)' }}>
            LET'S COOK<br/>SOMETHING UP.
          </h1>

          <p className="max-w-2xl text-xl sm:text-3xl font-body font-bold mb-16 leading-relaxed">
            Have a project, idea, or opportunity in mind? <br/>
            <span className="inline-block bg-accent-2 text-white px-2 mt-2 transform rotate-1 border-2 border-black shadow-[4px_4px_0px_#000]">Let's create something meaningful.</span>
          </p>

          <a 
            href="mailto:pcirfan918@gmail.com"
            className="group neo-btn bg-accent-1 text-black text-2xl py-6 px-12 rounded-full mb-20"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Social Links inside card */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t-4 border-black pt-8 mt-4 gap-6">
            <p className="font-display font-black text-2xl">FIND ME ON:</p>
            <div className="flex gap-4">
              <a href="#" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                GITHUB
              </a>
              <a href="#" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                LINKEDIN
              </a>
              <a href="#" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                TWITTER
              </a>
            </div>
          </div>
          
        </div>

        <div className="w-full text-center mt-20 pb-4">
          <p className="text-white text-lg font-display font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Irfan PC. Designed & Built manually.
          </p>
        </div>

      </div>
    </div>
  );
}
