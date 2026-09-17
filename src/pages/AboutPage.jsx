import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-portrait.png';

export default function AboutPage() {
  const navigate = useNavigate();

  const handleGoToProjects = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        if (window.lenis && !window.lenis.isDestroyed) {
          window.lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black py-8 px-4 sm:px-6 md:px-12 font-body selection:bg-accent-1 selection:text-black">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-24">

        {/* ============================================================ */}
        {/* SECTION: HERO / MANIFESTO HEADER                             */}
        {/* ============================================================ */}
        <section className="relative w-full pt-6 pb-12 border-b-4 border-black">
          
          {/* Eyebrow Stickers */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="neo-tag bg-accent-1 text-black text-sm md:text-base font-black transform -rotate-2">
              MANIFESTO // 01
            </span>
            <span className="neo-tag bg-black text-white text-sm md:text-base font-black">
              IRFAN PC // THE DEEP DIVE
            </span>
            <span className="neo-tag bg-primary text-white text-sm md:text-base font-black transform rotate-2">
              OPEN FOR WORK 2026
            </span>
          </div>

          {/* Main Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-7 flex flex-col">
              <h1 
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-8xl uppercase tracking-tighter leading-none mb-8"
                style={{ textShadow: '4px 4px 0px var(--color-primary)' }}
              >
                I DESIGN LIKE A DEVELOPER<br/>
                <span className="text-primary" style={{ textShadow: '4px 4px 0px var(--color-black)' }}>
                  AND CODE
                </span><br/>
                LIKE A DESIGNER.
              </h1>

              {/* Sub-quote card */}
              <div className="neo-card bg-accent-1 p-6 md:p-8 transform -rotate-1 max-w-2xl">
                <p className="font-display font-black text-2xl sm:text-3xl uppercase leading-tight text-black">
                  "Which means I argue with myself until the pixels behave."
                </p>
                <p className="font-semibold text-base sm:text-lg mt-3 text-black">
                  Bridging the gap between Figma artboards and responsive React code so zero creative intent is lost in translation.
                </p>
              </div>

              {/* Quick Tags Cluster */}
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="neo-tag bg-white text-black font-mono">LOCATION: INDIA</span>
                <span className="neo-tag bg-white text-black font-mono">FOCUS: UI/UX + FRONTEND</span>
                <span className="neo-tag bg-accent-2 text-white font-mono">FIGMA ⇄ REACT</span>
              </div>
            </div>

            {/* Right Framed Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Decorative background block */}
                <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 border-4 border-black"></div>
                
                {/* Main Card */}
                <div className="relative bg-white border-4 border-black p-4 flex flex-col items-center">
                  
                  {/* Top Bar inside frame */}
                  <div className="w-full flex justify-between items-center border-b-4 border-black pb-3 mb-4">
                    <span className="font-mono font-black text-sm tracking-wider uppercase">IRFAN_PC_PORTRAIT.RAW</span>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-accent-2 border-2 border-black"></div>
                      <div className="w-3 h-3 bg-accent-1 border-2 border-black"></div>
                      <div className="w-3 h-3 bg-primary border-2 border-black"></div>
                    </div>
                  </div>

                  {/* Cutout Image Container */}
                  <div className="w-full h-[420px] bg-accent-1 border-4 border-black overflow-hidden relative flex items-end justify-center">
                    <img 
                      src={heroImg} 
                      alt="Irfan PC Portrait" 
                      className="w-full h-full object-cover object-top filter contrast-110"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-3 left-3 neo-tag bg-black text-white text-xs font-mono">
                      IRFAN PC // HYBRID CRAFTSMAN
                    </div>
                  </div>

                  {/* Bottom Caption inside card */}
                  <div className="w-full pt-4 flex justify-between items-center text-xs font-mono font-bold">
                    <span>STATUS: ACTIVE & AVAILABLE</span>
                    <span>EDITION: 2026.01</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 01: WHO I AM (THE HYBRID IDENTITY)                   */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-black text-white text-lg font-black">
              01 // IDENTITY
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              WHO I AM
            </h2>
          </div>

          {/* Intro Paragraph in brutalist block */}
          <div className="neo-card bg-white p-8 sm:p-12 border-4 border-black shadow-neo-lg">
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase mb-6 leading-tight">
              A Product Designer & Frontend Developer who refuses to treat design and engineering as two separate worlds.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg sm:text-xl font-semibold leading-relaxed">
              <p>
                In standard digital production, a massive chasm exists between the design phase and the engineering phase. Designers build gorgeous mockups in Figma that look breathtaking in static viewports, but often fail under real DOM stress, dynamic state mutations, or responsive constraints.
              </p>
              <p>
                Meanwhile, developers tasked with implementing those mockups frequently lack the spatial intuition to notice mismatched kerning, incorrect transition curves, or awkward optical alignments. I eliminate this entire friction by owning both sides of the equation.
              </p>
            </div>
          </div>

          {/* 4-Pillar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="neo-card bg-accent-1 text-black p-6 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-4xl leading-none">50/50</span>
                <h4 className="font-display font-black text-2xl uppercase mt-4 mb-2">DUAL DNA</h4>
                <p className="font-semibold text-base leading-snug">
                  Equal parts Figma system architect and React/CSS code engineer.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                FIGMA + REACT
              </div>
            </div>

            <div className="neo-card bg-primary text-white p-6 flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-4xl leading-none">ZERO</span>
                <h4 className="font-display font-black text-2xl uppercase mt-4 mb-2">HANDOFF DRAMA</h4>
                <p className="font-semibold text-base leading-snug">
                  No specs lost in translation. What is designed is exactly what ships to production.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                SEAMLESS EXECUTION
              </div>
            </div>

            <div className="neo-card bg-accent-2 text-white p-6 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-4xl leading-none">100%</span>
                <h4 className="font-display font-black text-2xl uppercase mt-4 mb-2">TACTILE CRAFT</h4>
                <p className="font-semibold text-base leading-snug">
                  Micro-interactions, button snap, typography rhythm, and intentional delight.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                FEELS PHYSICAL
              </div>
            </div>

            <div className="neo-card bg-white text-black p-6 flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-4xl leading-none">SPEED</span>
                <h4 className="font-display font-black text-2xl uppercase mt-4 mb-2">RAPID SPRINTS</h4>
                <p className="font-semibold text-base leading-snug">
                  Faster iterations, fewer sync meetings, and production-ready code from sprint one.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                HIGH VELOCITY
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 02: MY DESIGN PHILOSOPHY                             */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-primary text-white text-lg font-black">
              02 // PHILOSOPHY
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              HOW I THINK & DESIGN
            </h2>
          </div>

          {/* Banner Quote */}
          <div className="neo-card bg-accent-1 text-black p-8 sm:p-14 border-4 border-black text-center transform -rotate-1">
            <h3 
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase leading-tight max-w-5xl mx-auto"
              style={{ textShadow: '3px 3px 0px #ffffff' }}
            >
              "GOOD UX IS LIKE A GOOD JOKE — IF YOU HAVE TO EXPLAIN IT, IT'S TERRIBLE."
            </h3>
            <p className="font-mono text-base sm:text-lg font-black mt-6 tracking-widest uppercase">
              // PRINCIPLE: CLARITY FIRST, NOVELTY SECOND, CRAFT ALWAYS
            </p>
          </div>

          {/* 4 Detailed Principle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono font-black text-2xl bg-black text-white px-3 py-1">PILLAR 01</span>
                  <span className="font-mono font-bold text-sm">ERGONOMICS</span>
                </div>
                <h4 className="font-display font-black text-3xl uppercase mb-4">
                  FUNCTION FIRST, PERSONALITY ALWAYS
                </h4>
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  A sterile, cookie-cutter gray interface is forgettable. But an eccentric interface that confuses the user is unusable. I strike the delicate balance: rock-solid usability, instant affordance, and intuitive wayfinding infused with bold character and memorable flair.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-sm font-bold text-primary">
                NO BLAND TEMPLATES
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono font-black text-2xl bg-black text-white px-3 py-1">PILLAR 02</span>
                  <span className="font-mono font-bold text-sm">ARCHITECTURE</span>
                </div>
                <h4 className="font-display font-black text-3xl uppercase mb-4">
                  SYSTEMIC DESIGN THINKING
                </h4>
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  I don't design isolated screens; I design cohesive ecosystems. Every button variant, elevation token, typography scale, and form state is part of a scalable design system that translates cleanly into reusable React components.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-sm font-bold text-primary">
                ATOMIC & SCALABLE
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono font-black text-2xl bg-black text-white px-3 py-1">PILLAR 03</span>
                  <span className="font-mono font-bold text-sm">REALISM</span>
                </div>
                <h4 className="font-display font-black text-3xl uppercase mb-4">
                  CODE-AWARE PROTOTYPING
                </h4>
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  A prototype shouldn't just be an illusion. When I mock up a layout, I already consider network latencies, empty states, error boundaries, keyboard focus traversal, and dynamic text wrapping on mobile screens.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-sm font-bold text-primary">
                BONDED WITH REALITY
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono font-black text-2xl bg-black text-white px-3 py-1">PILLAR 04</span>
                  <span className="font-mono font-bold text-sm">TACTILITY</span>
                </div>
                <h4 className="font-display font-black text-3xl uppercase mb-4">
                  PHYSICAL INTERACTION DELIGHT
                </h4>
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  Software feels best when it responds like a physical object. Hover lifts, button depress offsets, clean easing curves, and tactile feedback make the browser feel alive rather than like static ink on glass.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-sm font-bold text-primary">
                INTENTIONAL MOTION
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 03: MY 6-STEP WORKFLOW                               */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-accent-2 text-white text-lg font-black">
              03 // WORKFLOW
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              FROM CHAOS TO SHIPPED REALITY
            </h2>
          </div>

          <div className="neo-card bg-primary text-white p-6 sm:p-10 border-4 border-black">
            <p className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide">
              THE 6-STAGE ENGINE: HOW AN IDEA BECOMES HIGH-PERFORMANCE CODE
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-primary leading-none block mb-4">01</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">DISCOVER & DECONSTRUCT</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Dig deep into user problems, business goals, and technical constraints. Unpack the core job-to-be-done before drawing a single frame.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: PROBLEM AUDIT
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-primary leading-none block mb-4">02</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">DEFINE & WIREFRAME</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Construct user journeys, navigation mental models, and structural wireframe blueprints. Test ergonomics and information hierarchy early.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: WIREFRAME BLUEPRINT
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-primary leading-none block mb-4">03</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">DESIGN SYSTEM & HIGH-FI</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Build atomic color palettes, typography ramps, responsive auto-layouts, and component states directly within Figma.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: FIGMA DESIGN SYSTEM
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-accent-2 leading-none block mb-4">04</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">PROTOTYPE & VALIDATE</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Pressure-test click-paths, interaction pacing, and responsive transitions. Validate whether the flow feels seamless or awkward.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: INTERACTIVE PROTOTYPE
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-accent-2 leading-none block mb-4">05</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">FRONTEND ENGINEERING</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Write clean, modular, semantic React components. Hook up states, animations (GSAP/Lenis), and ensure zero layout shifting.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: MODULAR REACT CODE
              </div>
            </div>

            <div className="neo-card bg-white p-8 border-4 border-black flex flex-col justify-between hover:-translate-y-2 transition-transform">
              <div>
                <span className="font-display font-black text-6xl text-accent-2 leading-none block mb-4">06</span>
                <h3 className="font-display font-black text-2xl uppercase mb-3">POLISH, TEST & SHIP</h3>
                <p className="font-semibold text-base leading-relaxed text-neutral-800">
                  Cross-browser sanity testing, accessibility audits, mobile touch tuning, and automated build verification before pushing live.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-black uppercase">
                DELIVERABLE: LIVE DEPLOYMENT
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 04: SKILLS & ARSENAL                                 */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-black text-white text-lg font-black">
              04 // ARSENAL
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              SKILLS & TOOLKIT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* UI/UX Column */}
            <div className="neo-card bg-white border-4 border-black p-8 flex flex-col justify-between">
              <div>
                <div className="bg-accent-1 text-black font-display font-black text-2xl p-4 border-2 border-black mb-6 uppercase flex justify-between items-center">
                  <span>UI/UX DESIGN</span>
                  <span>🎨</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    'Figma Master',
                    'Auto-Layout & Variants',
                    'Design Systems',
                    'Wireframing',
                    'Interactive Prototyping',
                    'Information Architecture',
                    'Visual Hierarchy',
                    'Typography Rhythms',
                    'Mobile-First UX',
                    'WCAG Accessibility',
                    'User Testing',
                    'Micro-Interactions'
                  ].map((skill, idx) => (
                    <span 
                      key={idx}
                      className="neo-tag bg-white text-black text-sm font-bold border-2 border-black hover:-translate-y-1 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                CORE: FIGMA + SYSTEM SPECIFICATIONS
              </div>
            </div>

            {/* Frontend Column */}
            <div className="neo-card bg-white border-4 border-black p-8 flex flex-col justify-between">
              <div>
                <div className="bg-primary text-white font-display font-black text-2xl p-4 border-2 border-black mb-6 uppercase flex justify-between items-center">
                  <span>FRONTEND DEV</span>
                  <span>⚡</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    'React.js',
                    'JavaScript (ES6+)',
                    'HTML5 Semantics',
                    'Modern CSS3',
                    'TailwindCSS',
                    'GSAP & ScrollTrigger',
                    'Lenis Smooth Scroll',
                    'React Router',
                    'Responsive Layouts',
                    'DOM Performance',
                    'Git & GitHub',
                    'Vite & Tooling'
                  ].map((skill, idx) => (
                    <span 
                      key={idx}
                      className="neo-tag bg-primary text-white text-sm font-bold border-2 border-black hover:-translate-y-1 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                CORE: REACT + CSS + GSAP
              </div>
            </div>

            {/* Strategy & Tools Column */}
            <div className="neo-card bg-white border-4 border-black p-8 flex flex-col justify-between">
              <div>
                <div className="bg-accent-2 text-white font-display font-black text-2xl p-4 border-2 border-black mb-6 uppercase flex justify-between items-center">
                  <span>METHOD & TOOLS</span>
                  <span>🛠️</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    'Zero-Handoff Workflow',
                    'Component Architecture',
                    'Rapid Iteration',
                    'Design QA',
                    'DevTools Profiling',
                    'VS Code Power User',
                    'Agile Sprint Velocity',
                    'Cross-Browser Tuning',
                    'Design Token Pipelines',
                    'Creative Problem Solving',
                    'Continuous Experimentation'
                  ].map((skill, idx) => (
                    <span 
                      key={idx}
                      className="neo-tag bg-accent-2 text-white text-sm font-bold border-2 border-black hover:-translate-y-1 transition-transform"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-xs font-bold">
                CORE: SPEED + CRAFT + RIGOR
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 05: EXPERIENCE & STORIES                             */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-accent-1 text-black text-lg font-black">
              05 // CASE STUDY LOG
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              THE WORK & LESSONS
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            
            {/* Project 1 */}
            <div className="neo-card bg-white border-4 border-black p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8 hover:-translate-y-1 transition-transform">
              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="neo-tag bg-primary text-white text-xs font-mono">2026</span>
                    <span className="neo-tag bg-black text-white text-xs font-mono">CASE STUDY</span>
                  </div>
                  <h3 className="font-display font-black text-4xl uppercase">RE-STORE</h3>
                  <p className="font-mono text-sm font-bold text-neutral-600 mt-1 uppercase">
                    DIY REPAIR & CIRCULAR ECONOMY
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-primary">
                  ROLE: UX ARCHITECTURE + REACT BUILD
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col justify-between">
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  Built a community-powered repair platform designed to reduce electronic waste. Tackled the UX challenge of breaking down high-density technical fix manuals into step-by-step interactive card sequences with progress checkpoints. Engineered responsive React components and intuitive search filters.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="neo-tag bg-accent-1 text-black text-xs font-mono">STEP-BY-STEP UX</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">COMMUNITY GUIDES</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">REACT + TAILWIND</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="neo-card bg-white border-4 border-black p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8 hover:-translate-y-1 transition-transform">
              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="neo-tag bg-accent-1 text-black text-xs font-mono">2025</span>
                    <span className="neo-tag bg-black text-white text-xs font-mono">CASE STUDY</span>
                  </div>
                  <h3 className="font-display font-black text-4xl uppercase">HOUZING</h3>
                  <p className="font-mono text-sm font-bold text-neutral-600 mt-1 uppercase">
                    MODERN REAL ESTATE PORTAL
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-primary">
                  ROLE: END-TO-END UI/UX & FRONTEND
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col justify-between">
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  Redesigned the property discovery journey to replace cluttered MLS listings with clean spatial visual hierarchy. Created interactive 360-degree tour cards, sticky agent inquiry modules, and smart neighborhood data visualizations that reduced discovery friction by 40%.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="neo-tag bg-primary text-white text-xs font-mono">SPATIAL CARDS</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">VIRTUAL TOURS</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">CONVERSION UX</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="neo-card bg-white border-4 border-black p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8 hover:-translate-y-1 transition-transform">
              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="neo-tag bg-accent-2 text-white text-xs font-mono">2025</span>
                    <span className="neo-tag bg-black text-white text-xs font-mono">CASE STUDY</span>
                  </div>
                  <h3 className="font-display font-black text-4xl uppercase">REXECOMMERCE</h3>
                  <p className="font-mono text-sm font-bold text-neutral-600 mt-1 uppercase">
                    STREETWEAR & SNEAKER STOREFRONT
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-primary">
                  ROLE: CREATIVE DIRECTION & FRONTEND
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col justify-between">
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  Engineered an editorial e-commerce platform blending high-fashion brutalism with smooth cart ergonomics. Built interactive product rotators, micro-animated hover states, and a streamlined single-step checkout that keeps users immersed in the brand aesthetic.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="neo-tag bg-accent-2 text-white text-xs font-mono">3D PRODUCT PREVIEWS</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">BRUTALIST COMMERCE</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">FAST CHECKOUT</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="neo-card bg-white border-4 border-black p-8 sm:p-10 flex flex-col lg:flex-row justify-between gap-8 hover:-translate-y-1 transition-transform">
              <div className="lg:w-1/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="neo-tag bg-black text-white text-xs font-mono">2024</span>
                    <span className="neo-tag bg-black text-white text-xs font-mono">CASE STUDY</span>
                  </div>
                  <h3 className="font-display font-black text-4xl uppercase">CAREHAVEN</h3>
                  <p className="font-mono text-sm font-bold text-neutral-600 mt-1 uppercase">
                    ACCESSIBLE SENIOR HEALTH PLATFORM
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-black font-mono text-xs font-bold text-primary">
                  ROLE: ACCESSIBILITY & UX DESIGN
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col justify-between">
                <p className="font-semibold text-lg leading-relaxed text-neutral-800">
                  Focused on high-empathy, high-accessibility design for families seeking certified senior care. Built with WCAG AAA typography contrast standards, simplified navigation trees, and instant-click emergency contact hotlines to ensure zero frustration for older users.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="neo-tag bg-white text-black text-xs font-mono">WCAG COMPLIANCE</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">SENIOR UX</span>
                  <span className="neo-tag bg-white text-black text-xs font-mono">HIGH CONTRAST</span>
                </div>
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 06: DIRECTION & WHY ME                               */}
        {/* ============================================================ */}
        <section className="flex flex-col gap-10">
          
          <div className="flex items-center gap-4">
            <span className="neo-tag bg-primary text-white text-lg font-black">
              06 // DIRECTION
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              WHAT I'M BECOMING & WHY ME
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* What I want to become */}
            <div className="neo-card bg-primary text-white p-8 sm:p-12 border-4 border-black flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-sm bg-black text-white px-3 py-1 uppercase">
                  THE FUTURE VISION
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase mt-6 mb-6">
                  EVOLVING INTO A CREATIVE TECHNOLOGIST
                </h3>
                <p className="font-semibold text-lg leading-relaxed mb-6">
                  I believe the web should not be a dull sea of cookie-cutter SaaS layouts. As AI makes generic UI effortless to generate, true distinction will come from taste, intentional craft, and tactile individuality.
                </p>
                <p className="font-semibold text-lg leading-relaxed">
                  I am expanding deeper into WebGL, creative motion systems, and experimental interfaces to craft digital software that feels physical, resilient, and unmistakably memorable.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t-2 border-white font-mono text-sm font-bold">
                // CREATIVE TECH + TASTE + CODE
              </div>
            </div>

            {/* Why Work With Me */}
            <div className="neo-card bg-accent-1 text-black p-8 sm:p-12 border-4 border-black flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform">
              <div>
                <span className="font-mono font-black text-sm bg-black text-white px-3 py-1 uppercase">
                  VALUE DELIVERED
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase mt-6 mb-6">
                  WHY WORK WITH ME?
                </h3>
                
                <ul className="flex flex-col gap-4 font-semibold text-lg leading-snug">
                  <li className="flex items-start gap-3">
                    <span className="font-black text-xl">⚡</span>
                    <span><strong>Two disciplines, one brain:</strong> Eliminate weeks of back-and-forth between design and engineering teams.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-black text-xl">🎯</span>
                    <span><strong>Pixel perfection guaranteed:</strong> Because I code what I design, nothing gets butchered during development.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-black text-xl">🛠️</span>
                    <span><strong>Production-ready code:</strong> Clean, component-based, responsive, and performance-minded frontend architecture.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-black text-xl">🔥</span>
                    <span><strong>Radical ownership:</strong> I care about user delight and conversion results, not just marking tickets done.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 pt-4 border-t-2 border-black font-mono text-sm font-bold">
                // HIGH IMPACT + FAST ITERATION
              </div>
            </div>

          </div>

        </section>


        {/* ============================================================ */}
        {/* SECTION 07: CALL TO ACTION FOOTER BANNER                     */}
        {/* ============================================================ */}
        <section className="w-full my-8">
          
          <div className="neo-card bg-black text-white p-8 sm:p-16 border-4 border-black shadow-neo-xl flex flex-col items-center text-center">
            
            <span className="neo-tag bg-accent-1 text-black font-black text-base uppercase mb-6 transform -rotate-2">
              LET'S COLLABORATE
            </span>

            <h2 
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase max-w-4xl leading-tight mb-6"
              style={{ textShadow: '4px 4px 0px var(--color-primary)' }}
            >
              HAVE A VISION IN MIND?<br/>LET'S BUILD SOMETHING GREAT.
            </h2>

            <p className="font-semibold text-lg sm:text-2xl max-w-2xl text-neutral-300 mb-10 leading-relaxed">
              Available for full-stack UI/UX design, custom frontend builds, and design system contracts. Let's create an interface users will never forget.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:irfanpc189@gmail.com"
                className="neo-btn bg-accent-1 text-black text-lg font-black border-4 border-black"
              >
                GET IN TOUCH ↗
              </a>
              
              <button 
                onClick={handleGoToProjects}
                className="neo-btn bg-white text-black text-lg font-black border-4 border-black"
              >
                EXPLORE PROJECTS ↗
              </button>
              
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-primary text-white text-lg font-black border-4 border-black"
              >
                LINKEDIN ↗
              </a>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}
