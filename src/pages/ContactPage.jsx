import React, { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await supabase.from('messages').insert([formData]);
    if (!error) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };
  return (
    <div className="w-full min-h-[85vh] bg-primary text-white py-12 px-4 md:px-8 flex flex-col justify-center items-center relative">
      
      {/* Back Button */}
      <Link 
        to="/" 
        aria-label="Back to Home"
        className="fixed z-[999] bg-accent-2 text-black w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group"
        style={{ top: '24px', left: '24px' }}
      >
        <span className="text-2xl md:text-3xl font-black group-hover:-translate-x-1 transition-transform">←</span>
      </Link>

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

          <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6 mb-20 text-left">
            {status === 'success' && (
              <div className="bg-green-100 text-green-800 border-[3px] border-black p-4 text-center font-bold shadow-[4px_4px_0px_#000]">
                Message sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100 text-red-800 border-[3px] border-black p-4 text-center font-bold shadow-[4px_4px_0px_#000]">
                Failed to send message. Please try again.
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full sm:w-1/2 p-4 bg-white text-black border-[3px] border-black font-bold uppercase shadow-[4px_4px_0px_#000] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_#000] transition-all"
              />
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full sm:w-1/2 p-4 bg-white text-black border-[3px] border-black font-bold uppercase shadow-[4px_4px_0px_#000] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_#000] transition-all"
              />
            </div>
            <textarea 
              placeholder="TELL ME ABOUT YOUR PROJECT" 
              required 
              rows={4}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full p-4 bg-white text-black border-[3px] border-black font-bold uppercase shadow-[4px_4px_0px_#000] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_#000] transition-all"
            />
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="group neo-btn flex items-center justify-center bg-accent-1 text-black text-2xl py-6 px-12 rounded-full mx-auto disabled:opacity-50"
            >
              <span>{status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}</span>
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-2" />
            </button>
          </form>

          {/* Social Links inside card */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t-4 border-black pt-8 mt-4 gap-6">
            <p className="font-display font-black text-2xl">FIND ME ON:</p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/irfan-p-c-6011813b1" target="_blank" rel="noopener noreferrer" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                LINKEDIN
              </a>
              <a href="https://www.instagram.com/irf4n_.___?stkn=ZGViZHJmMmJ4N29v&utm_source=qr" target="_blank" rel="noopener noreferrer" className="neo-card bg-primary text-white p-4 font-bold tracking-widest uppercase hover:-translate-y-2 hover:bg-black transition-all">
                INSTAGRAM
              </a>
            </div>
          </div>
          
        </div>

        <div className="w-full text-center mt-20 pb-4">
          <p className="text-white text-lg font-display font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Irfan PC.
          </p>
        </div>

      </div>
    </div>
  );
}
