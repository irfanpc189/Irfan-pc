import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../assets/irfan-portrait-new.png';
import heroImgLarge from '../assets/irfan-portrait-new-large.webp';
import heroImgMedium from '../assets/irfan-portrait-new-medium.webp';
import heroImgSmall from '../assets/irfan-portrait-new-small.webp';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const portraitContainerRef = useRef(null);
  const portraitFloatRef = useRef(null);
  const portraitImgRef = useRef(null);
  
  const [bio, setBio] = useState("I'm Irfan — a UI/UX designer and frontend developer focused on creating digital experiences that look good, feel intuitive, and actually work.");

  useEffect(() => {
    async function fetchBio() {
      try {
        const { data, error } = await supabase.from('site_content').select('*').eq('key', 'about_bio').single();
        if (error) throw error;
        if (data && data.value && data.value.text) {
          setBio(data.value.text);
        }
      } catch (err) {
        console.error("Error fetching bio, using fallback:", err.message);
      }
    }
    fetchBio();
  }, []);

  // Ensure we scroll to top when mounting the new page
  useEffect(() => {
    // 1. Cinematic Entrance Reveal
    gsap.fromTo(portraitContainerRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    // 2. Continuous Ambient Floating (Idle Loop)
    gsap.to(portraitFloatRef.current, {
      y: "-12px",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Cursor Parallax Depth (Interactive Tilt)
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      const targetX = -xPos * 25;
      const targetY = -yPos * 15;

      gsap.to(portraitImgRef.current, {
        x: targetX,
        y: targetY,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 4. Scroll Parallax (On Scroll Away)
    gsap.to(portraitContainerRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-black font-body selection:bg-accent-1 selection:text-black pb-12 relative overflow-x-hidden">
      <style>{`
        @media (max-width: 767px) {
          .about-mobile-hide { display: none !important; }
          .about-mobile-hero-wrapper { max-width: 100% !important; margin-bottom: 2rem !important; }
          .about-mobile-hero-heading { font-size: clamp(2.5rem, 12vw, 4.5rem) !important; }
          .about-mobile-hero-sub { font-size: clamp(1.25rem, 6vw, 2.5rem) !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-mobile-hero-heading { font-size: 3.5rem !important; }
          .about-mobile-hero-sub { font-size: 2rem !important; }
          .about-mobile-hero-wrapper { max-width: 55vw !important; }
        }
      `}</style>
      {/* Back Button */}
      <Link 
        to="/" 
        aria-label="Back to Home"
        className="fixed top-[24px] left-[24px] z-[999] bg-accent-2 text-black w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer group"
      >
        <span className="text-2xl md:text-3xl font-black group-hover:-translate-x-1 transition-transform">←</span>
      </Link>

      {/* ============================================================ */}
      {/* SECTION 01: INTRO (REBUILT HERO)                             */}
      {/* ============================================================ */}
      <section id="hero" className="relative w-full min-h-[100vh] pt-[100px] md:pt-[120px] flex flex-col justify-between px-[24px] md:px-8 bg-primary border-b-4 border-black overflow-hidden pb-0" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col flex-grow">
          
          {/* Top Level Stickers - Independent zones */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 mb-12">
            <div className="neo-tag mt-8 bg-accent-1 text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] transform -rotate-2 inline-block px-4 py-2 w-max">
              ABOUT ME // THE SHORT STORY
            </div>
            <div className="neo-tag mt-8 bg-white text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] transform rotate-3 inline-block px-4 py-2 w-max self-end md:self-auto">
              CREATIVE THINKER & MAKER.
            </div>
          </div>
          
          {/* Typography Wrapper (Left Column Isolation) */}
          <div className="relative z-20 max-w-[45vw] about-mobile-hero-wrapper">
            {/* Headline - 4 lines for more aggressive scale */}
            <h1 
              className="font-display font-black text-6xl sm:text-7xl lg:text-[7rem] uppercase leading-[0.85] text-white tracking-tight mb-8 about-mobile-hero-heading"
              style={{ textShadow: '8px 8px 0px var(--color-black)' }}
            >
              I DESIGN LIKE&nbsp;A<br />DEVELOPER.<br /><br />
              AND CODE LIKE&nbsp;A<br />DESIGNER.
            </h1>
            
            {/* Role Typography */}
            <h2 
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase text-white tracking-wide about-mobile-hero-sub" 
              style={{ textShadow: '4px 4px 0px var(--color-black)' }}
            >
              DESIGNER <span className="text-accent-2 font-black">+</span> FRONTEND DEV
            </h2>

            {/* Red Label (Shorter graphic bar) */}
            <a 
              href="#who-i-am"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('who-i-am')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="neo-tag bg-accent-2 text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform -rotate-1 mt-8 mb-[56px] inline-block px-6 py-3 w-max relative z-30 cursor-pointer group"
            >
              PROBLEM SOLVER. <span className="font-sans ml-2 inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </div>

        </div>

        {/* Unboxed Large Portrait Layer (Overlapping composition) */}
        <div 
          ref={portraitContainerRef}
          className="about-mobile-hide"
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '2%',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div ref={portraitFloatRef}>
            <picture>
              <source media="(max-width: 767px)" srcSet={heroImgSmall} type="image/webp" />
              <source media="(max-width: 1023px)" srcSet={heroImgMedium} type="image/webp" />
              <source media="(min-width: 1024px)" srcSet={heroImgLarge} type="image/webp" />
              <img 
                ref={portraitImgRef}
                src={heroImg} 
                alt="Irfan PC" 
                style={{
                  maxHeight: '75vh',
                  maxWidth: '48vw',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'bottom right'
                }} 
                fetchpriority="high"
                loading="eager"
              />
            </picture>
          </div>
        </div>

        {/* Process Strip at Bottom */}
        <div className="w-full relative z-30 border-t-4 border-black bg-primary mt-auto -mx-4 md:-mx-8 px-[24px] md:px-8">
          <div className="max-w-7xl mx-auto py-6">
            <div className="flex gap-0 w-auto overflow-x-auto pb-2 scrollbar-hide">
              {['01 DESIGN', '02 CODE', '03 BUILD'].map((step) => (
                <div key={step} className="bg-white border-4 border-black px-6 py-2 font-display font-black text-xl uppercase shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform cursor-default inline-block w-max flex-shrink-0 mr-4 md:mr-8 last:mr-2 mb-2">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* SECTION 02: WHO I AM                                         */}
      {/* ============================================================ */}
      <section id="who-i-am" className="w-full min-h-screen bg-[#FFDE59] p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden border-b-4 border-black">
        {/* Left Side */}
        <div className="flex flex-col gap-6 max-w-xl mx-auto lg:mx-0">
          <h2 className="text-6xl lg:text-8xl font-black font-display tracking-tight uppercase" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>WHO I AM</h2>
          <div className="bg-black text-white p-6 border-2 border-black shadow-[6px_6px_0px_#000] -rotate-1">
            <p className="text-lg lg:text-xl font-bold leading-snug">
              "{bio}"
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:mx-0">
          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col gap-4">
            <h3 className="text-2xl font-black font-display uppercase border-b-2 border-black pb-3">
              UI/UX DESIGNER + FRONTEND DEVELOPER
            </h3>
            <p className="text-lg font-bold leading-relaxed">
              I exist in the weird, chaotic middle ground between pixels and logic. I love obsessing over typography, grid systems, and visual rhythm just as much as I enjoy writing clean, maintainable React components.
            </p>
          </div>

          {/* Accent Card to kill blank space */}
          <div className="bg-[#FF6B6B] border-2 border-black p-4 shadow-[4px_4px_0px_#000] flex justify-between items-center font-bold uppercase">
            <span>✦ PIXEL PERFECT CODE</span>
            <span>✦ INTUITIVE UX</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 03: HOW I THINK                                      */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-6xl sm:text-8xl uppercase mb-16 text-center" style={{ textShadow: '4px 4px 0px var(--color-accent-2)' }}>
            HOW I THINK
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="neo-card bg-primary text-white p-8 transform -rotate-1 flex flex-col">
              <span className="text-7xl font-black font-display opacity-50 mb-2">01</span>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-4">Solve The Actual Problem</h3>
              <p className="font-bold text-lg">Good design isn't just decoration. It's about deeply understanding the user's needs and removing friction. If it doesn't solve a problem, it's just art.</p>
            </div>
            <div className="neo-card bg-accent-1 p-8 transform rotate-1 flex flex-col mt-0 md:mt-12">
              <span className="text-7xl font-black font-display opacity-50 mb-2">02</span>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-4">Clear Visual Hierarchy</h3>
              <p className="font-bold text-lg">Users shouldn't have to think about where to look. I use typography, scale, and negative space to guide the eye and make complex interfaces feel simple.</p>
            </div>
            <div className="neo-card bg-black text-white p-8 transform -rotate-2 flex flex-col mt-0 md:mt-24">
              <span className="text-7xl font-black font-display opacity-50 text-accent-1 mb-2">03</span>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-white pb-4">Implementation Matters</h3>
              <p className="font-bold text-lg">A brilliant Figma file is useless if it can't be built. I design with responsive constraints, realistic data, and modern CSS/JS capabilities in mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 04: MY WORKFLOW                                      */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 bg-primary text-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b-4 border-white pb-8">
            <h2 className="font-display font-black text-6xl sm:text-8xl uppercase" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>
              PROCESS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'DISCOVER', desc: 'Understand the problem.' },
              { num: '02', title: 'DEFINE', desc: 'Turn the problem into a clear direction.' },
              { num: '03', title: 'WIREFRAME', desc: 'Structure the experience.' },
              { num: '04', title: 'DESIGN', desc: 'Build the visual language.' },
              { num: '05', title: 'PROTOTYPE', desc: 'Test the interaction.' },
              { num: '06', title: 'BUILD', desc: 'Turn the design into working frontend.' },
              { num: '07', title: 'REFINE', desc: 'Polish the details.' }
            ].map((step, i) => (
              <div key={i} className="border-4 border-black bg-white text-black p-6 brutal-shadow flex flex-col justify-center min-h-[180px] hover:-translate-y-1 transition-transform">
                <span className="text-accent-2 font-black font-display text-2xl mb-1">{step.num}</span>
                <h3 className="font-black text-2xl uppercase font-display border-b-4 border-black pb-2 mb-4">{step.title}</h3>
                <p className="font-bold text-lg">{step.desc}</p>
              </div>
            ))}
            
            {/* Empty block for grid balance */}
            <div className="border-4 border-black bg-accent-1 text-black p-6 flex flex-col justify-center items-center min-h-[180px] opacity-80 border-dashed">
              <span className="font-display font-black text-3xl rotate-12">REPEAT ↻</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 05: THE TOOLBOX                                      */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="font-display font-black text-6xl sm:text-8xl uppercase" style={{ textShadow: '4px 4px 0px var(--color-accent-1)' }}>
              THE TOOLBOX
            </h2>
            <div className="neo-card bg-black text-white p-6 inline-block self-start transform -rotate-2">
              <p className="text-xl font-bold max-w-sm">
                My stack spans both visual design and frontend architecture. I use the right tool for the job.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-12">
            <div className="neo-card bg-accent-1 p-8 sm:p-10">
              <h3 className="font-black font-display text-4xl uppercase mb-8 border-b-4 border-black pb-4">DESIGN</h3>
              <div className="flex flex-wrap gap-4">
                {['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'User Flows', 'Design Systems', 'Responsive Design', 'Typography', 'Visual Design'].map(skill => (
                  <div key={skill} className="border-4 border-black bg-white px-5 py-3 font-black text-lg uppercase shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="neo-card bg-black text-white p-8 sm:p-10">
              <h3 className="font-black font-display text-4xl uppercase mb-8 border-b-4 border-white pb-4 text-accent-1">DEVELOPMENT</h3>
              <div className="flex flex-wrap gap-4">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Git', 'GitHub', 'REST APIs', 'Responsive Development'].map(skill => (
                  <div key={skill} className="border-4 border-white bg-primary px-5 py-3 font-black text-lg uppercase shadow-[4px_4px_0px_var(--color-accent-1)] text-white hover:-translate-y-1 transition-transform cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 06: WHAT I DO                                        */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 bg-accent-2 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-6xl sm:text-8xl uppercase text-white mb-16 text-center" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>
            WHAT I DO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="neo-card bg-white p-10 flex flex-col gap-4 transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-6xl font-black font-display text-accent-2">01</span>
              <h3 className="text-3xl font-black uppercase font-display border-b-4 border-black pb-4 mt-2">UI/UX DESIGN</h3>
              <p className="text-lg font-bold mt-2 leading-relaxed">Crafting intuitive, accessible, and beautiful user interfaces that solve real user problems through systematic design thinking.</p>
            </div>
            <div className="neo-card bg-white p-10 flex flex-col gap-4 transform rotate-1 hover:rotate-0 transition-transform">
              <span className="text-6xl font-black font-display text-accent-2">02</span>
              <h3 className="text-3xl font-black uppercase font-display border-b-4 border-black pb-4 mt-2">WEB DESIGN</h3>
              <p className="text-lg font-bold mt-2 leading-relaxed">Designing engaging marketing sites, landing pages, and web experiences that communicate brand value and drive conversion.</p>
            </div>
            <div className="neo-card bg-white p-10 flex flex-col gap-4 transform rotate-1 hover:rotate-0 transition-transform">
              <span className="text-6xl font-black font-display text-accent-2">03</span>
              <h3 className="text-3xl font-black uppercase font-display border-b-4 border-black pb-4 mt-2">FRONTEND DEVELOPMENT</h3>
              <p className="text-lg font-bold mt-2 leading-relaxed">Translating designs into pixel-perfect, responsive, and performant code using React, modern CSS, and scalable architectures.</p>
            </div>
            <div className="neo-card bg-white p-10 flex flex-col gap-4 transform -rotate-1 hover:rotate-0 transition-transform">
              <span className="text-6xl font-black font-display text-accent-2">04</span>
              <h3 className="text-3xl font-black uppercase font-display border-b-4 border-black pb-4 mt-2">POSTER / VISUAL DESIGN</h3>
              <p className="text-lg font-bold mt-2 leading-relaxed">Pushing creative boundaries with bold typography, stark contrasts, and neo-brutalist experimental graphic design.</p>
            </div>
          </div>
        </div>
      </section>



      {/* ============================================================ */}
      {/* SECTION 08: THE JOURNEY                                      */}
      {/* ============================================================ */}
      <section className="py-24 px-4 md:px-8 bg-black text-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-6xl sm:text-8xl uppercase mb-20 text-accent-1 text-center" style={{ textShadow: '4px 4px 0px var(--color-white)' }}>
            THE JOURNEY
          </h2>
          
          <div className="flex flex-col border-l-8 border-white pl-8 sm:pl-16 gap-20 relative ml-4 sm:ml-8">
            
            <div className="relative">
              <div className="absolute -left-[48px] sm:-left-[76px] top-0 w-10 h-10 bg-accent-2 border-4 border-white brutal-shadow transform -rotate-12"></div>
              <span className="neo-tag bg-white text-black mb-6 inline-block font-black text-lg">THE BEGINNING</span>
              <h3 className="text-3xl font-black uppercase mb-4 text-accent-1">Curiosity & Visuals</h3>
              <p className="font-bold text-xl text-gray-300 leading-relaxed max-w-2xl">Started by messing around with graphic design, posters, and learning how visual communication works. Fell in love with typography and grid systems.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[48px] sm:-left-[76px] top-0 w-10 h-10 bg-primary border-4 border-white brutal-shadow transform rotate-12"></div>
              <span className="neo-tag bg-white text-black mb-6 inline-block font-black text-lg">THE PIVOT</span>
              <h3 className="text-3xl font-black uppercase mb-4 text-accent-1">Discovering UI/UX</h3>
              <p className="font-bold text-xl text-gray-300 leading-relaxed max-w-2xl">Realized static graphics weren't enough. I wanted things to be interactive. Dove deep into Figma, user psychology, and interface design principles.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[48px] sm:-left-[76px] top-0 w-10 h-10 bg-accent-1 border-4 border-white brutal-shadow transform rotate-45"></div>
              <span className="neo-tag bg-white text-black mb-6 inline-block font-black text-lg">THE EVOLUTION</span>
              <h3 className="text-3xl font-black uppercase mb-4 text-accent-1">Learning To Code</h3>
              <p className="font-bold text-xl text-gray-300 leading-relaxed max-w-2xl">Got frustrated handing off designs and seeing them built wrong. Learned HTML, CSS, JavaScript, and React to build exactly what I designed.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 09: WHERE I'M GOING                                  */}
      {/* ============================================================ */}
      <section className="py-32 px-4 md:px-8 bg-primary flex justify-center items-center text-center border-b-4 border-black relative overflow-hidden">
        
        {/* Background decorative text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
          <span className="font-display font-black text-[20vw] whitespace-nowrap leading-none">BUILD BUILD</span>
        </div>

        <div className="max-w-6xl relative z-10 flex flex-col items-center">

          <div className="mt-16 bg-white text-black inline-block p-8 sm:p-12 border-4 border-black brutal-shadow transform rotate-2 max-w-4xl">
            <p className="text-2xl sm:text-4xl font-black uppercase leading-tight">
              My goal is to be a relentless product builder—a hybrid designer who architects the experience and engineers the interface.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 10: WHY ME?                                          */}
      {/* ============================================================ */}
      <section className="py-32 px-4 md:px-8 bg-white border-b-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="neo-tag bg-black text-white mb-8 text-xl shadow-[6px_6px_0px_var(--color-primary)]">THE PITCH</div>
          <h2 className="font-display font-black text-7xl sm:text-9xl uppercase mb-24 text-center" style={{ textShadow: '6px 6px 0px var(--color-accent-1)' }}>
            WHY ME?
          </h2>
          
          <div className="flex flex-col gap-8 w-full max-w-5xl">
            {[
              { text: 'I CARE ABOUT THE DETAILS.', color: 'bg-accent-1 text-black', rot: '-2deg', align: 'self-start' },
              { text: 'I LIKE SOLVING PROBLEMS.', color: 'bg-primary text-white', rot: '1deg', align: 'self-end' },
              { text: 'I DESIGN WITH CODE IN MIND.', color: 'bg-accent-2 text-black', rot: '-1deg', align: 'self-center' },
              { text: 'I LIKE EXPERIMENTING.', color: 'bg-black text-white', rot: '2deg', align: 'self-start' },
              { text: "I DON'T STOP AT THE FIRST VERSION.", color: 'bg-white text-black', rot: '-2deg', align: 'self-end' },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`neo-card ${item.color} p-6 sm:p-8 w-full md:w-[85%] ${item.align} hover:scale-[1.02] transition-transform`}
                style={{ transform: `rotate(${item.rot})` }}
              >
                <h3 className="font-display font-black text-3xl sm:text-5xl uppercase text-center sm:text-left">{item.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 11: CTA                                              */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-accent-1 flex flex-col items-center text-center w-full overflow-hidden relative">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase mb-12 leading-[1.1] relative w-full break-words max-w-4xl mx-auto">
          <span className="relative z-10 block">
            LET'S <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>BUILD</span><br/>
            SOMETHING<br/>
            <span className="inline-block bg-black text-white px-6 py-2 mt-4 transform -rotate-2 shadow-[6px_6px_0px_var(--color-primary)]">
              GREAT.
            </span>
          </span>
        </h2>
        
        <div className="relative z-20 mt-8">
          <Link 
            to="/contact" 
            className="bg-black text-white font-display font-black text-xl sm:text-3xl uppercase px-8 py-5 md:px-10 md:py-6 border-4 border-black inline-flex items-center gap-4 transition-all hover:-translate-y-2 hover:bg-primary group"
            style={{ boxShadow: '8px 8px 0px var(--color-accent-2)' }}
          >
            LET'S WORK TOGETHER <span className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300">↗</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
