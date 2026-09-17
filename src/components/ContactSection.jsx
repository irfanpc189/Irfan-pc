import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative w-full z-10 py-16 px-4 md:px-8 min-h-screen flex flex-col items-center bg-white text-black"
    >
      {/* Top Spacer for centering */}
      <div className="flex-1" />

      <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        
        <div className="mb-8 inline-flex items-center gap-2 neo-tag">
          <span className="w-2 h-2 rounded-full bg-accent-2" style={{ backgroundColor: 'var(--color-accent-2)' }} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-black">
            Destination Reached
          </span>
        </div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-black mb-6 uppercase" style={{ textShadow: '4px 4px 0px var(--color-accent-1)' }}>
          Let's build something together.
        </h2>

        <p className="max-w-2xl text-lg sm:text-2xl font-body leading-relaxed mb-12 text-black font-semibold">
          Have an idea, project, or opportunity? <br/>
          <span className="font-display font-black text-3xl sm:text-4xl text-primary bg-accent-1 px-2 border-2 border-black rounded shadow-[2px_2px_0px_#000] inline-block mt-2 transform -rotate-1">Let's create something meaningful.</span>
        </p>

        <a 
          href="mailto:pcirfan918@gmail.com"
          className="group inline-flex items-center justify-center neo-btn mb-16 text-lg"
          style={{ padding: '16px 32px', gap: '12px', textDecoration: 'none' }}
        >
          <span style={{ textDecoration: 'none' }}>Get in touch</span>
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>

        <div className="flex items-center justify-center gap-6 mb-12">
          <a href="mailto:pcirfan918@gmail.com" className="p-4 rounded-full neo-card bg-white hover:bg-accent-1 transition-colors text-black shadow-[4px_4px_0px_#000]">
            <Mail className="w-6 h-6" />
          </a>
        </div>

      </div>

      {/* Bottom Spacer for centering */}
      <div className="flex-1" />

      {/* Footer minimal credit */}
      <div className="w-full text-center px-4 pt-12 pb-4">
        <p className="text-black text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} Irfan PC. All rights reserved.
        </p>
      </div>
    </section>
  );
}
