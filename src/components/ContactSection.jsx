import React, { useState } from 'react';
import { Mail, ArrowUpRight, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const payload = { ...formData, email: formData.email.trim().toLowerCase() };
      
      // 1. Save to Supabase
      const { error: supabaseError } = await supabase.from('messages').insert([payload]);
      if (supabaseError) throw supabaseError;

      console.log("SUPABASE INSERT SUCCESS");

      // 2. Send notification via Web3Forms
      const web3formsPayload = {
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: "New Portfolio Contact Enquiry",
        from_name: "IRFAN PC Portfolio",
        replyto: formData.email
      };

      console.log("WEB3FORMS REQUEST STARTED");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3formsPayload),
      });

      console.log("WEB3FORMS STATUS:", response.status);

      const rawResponse = await response.text();
      console.log("WEB3FORMS RAW RESPONSE:", rawResponse);

      let result;
      try {
        result = JSON.parse(rawResponse);
        console.log("WEB3FORMS PARSED RESULT:", result);
      } catch (parseError) {
        console.error("WEB3FORMS RESPONSE IS NOT JSON:", parseError);
      }

      if (!response.ok || !result?.success) {
        console.error("WEB3FORMS ERROR:", result || rawResponse);
        setStatus('error');
        return; // Exit early, do not clear form data
      }

      // Both succeeded
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Error sending message:", err.message || err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

        {status === 'success' ? (
          <div className="neo-card bg-accent-1 p-8 mb-16 max-w-lg w-full transform rotate-1">
            <h3 className="font-display font-black text-3xl uppercase mb-2">Message Sent!</h3>
            <p className="font-bold">Thanks for reaching out. I'll get back to you soon.</p>
            <button onClick={() => setStatus('idle')} className="mt-6 neo-btn bg-black text-white text-sm">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-lg text-left flex flex-col gap-6 mb-16 bg-white p-8 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div>
              <label htmlFor="name" className="block text-sm font-black uppercase tracking-wider mb-2">Name</label>
              <input 
                id="name"
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0px_#000] transition-all" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-black uppercase tracking-wider mb-2">Email</label>
              <input 
                id="email"
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0px_#000] transition-all" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-black uppercase tracking-wider mb-2">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-black font-bold focus:outline-none focus:bg-white focus:-translate-y-1 focus:shadow-[4px_4px_0px_#000] transition-all resize-none" 
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-500 text-white p-4 font-bold border-2 border-black">
                There was a problem sending your message. Please try again or email me directly at <a href="mailto:pcirfan918@gmail.com" className="underline">pcirfan918@gmail.com</a>.
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="group inline-flex items-center justify-center neo-btn text-lg mt-4 disabled:opacity-75"
              style={{ padding: '16px 32px', gap: '12px' }}
            >
              <span>{status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}</span>
              {!status.loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 mb-12">
          <a href="mailto:pcirfan918@gmail.com" className="p-4 rounded-full neo-card bg-white hover:bg-accent-1 transition-colors text-black shadow-[4px_4px_0px_#000]" title="Email me directly">
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
