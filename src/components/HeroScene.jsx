import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-portrait.png';
import heroImgLarge from '../assets/hero-portrait-large.webp';
import heroImgMedium from '../assets/hero-portrait-medium.webp';
import heroImgSmall from '../assets/hero-portrait-small.webp';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const containerRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const portraitFloatRef = useRef(null);
  const portraitImgRef = useRef(null);

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero"
      className="relative w-full font-display bg-primary"
      style={{ height: '100vh', minHeight: '700px', backgroundColor: '#0e4bfe' }}
    >
      <style>{`
        #hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          padding-top: 100px;
          background-color: #0e4bfe !important;
          overflow: hidden;
        }
        .brutal-shadow {
          box-shadow: 8px 8px 0 black;
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .brutal-shadow:hover {
          transform: translate(4px, 4px) rotate(var(--rot, 0deg)) !important;
          box-shadow: 4px 4px 0 black;
        }
        .brutal-shadow:active {
          transform: translate(7px, 7px) rotate(var(--rot, 0deg)) !important;
          box-shadow: 1px 1px 0 black;
        }
        .text-stroke-heavy {
          -webkit-text-stroke: 4px black;
          text-shadow: 10px 10px 0 black;
        }
        .hero-portfolio-text {
          font-size: clamp(5rem, 18vw, 15rem);
          line-height: 0.9;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .hero-role-heading {
          font-size: clamp(2rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          text-shadow: 3px 3px 0px var(--color-black);
        }
        .hero-portrait-layer {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(340px, 65vw, 850px);
          height: clamp(520px, 75vh, 900px);
          max-height: 75vh;
          z-index: 20;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .hero-portrait-layer {
            display: none !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .tablet-hero-portrait {
            width: clamp(240px, 45vw, 600px) !important;
            height: clamp(360px, 50vh, 650px) !important;
            max-height: 55vh !important;
          }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[1600px] mx-auto h-full px-4"
        style={{ height: '100%' }}
      >
        

        {/* Social Links (Hero) */}
        <div 
          className="absolute z-50 flex gap-4 pointer-events-auto" 
          style={{ top: 'calc(38% - 120px)', left: '6%' }}
        >
          <a href="https://www.instagram.com/irf4n_.___?stkn=ZGViZHJmMmJ4N29v&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white text-black p-2 md:p-3 border-[3px] border-black brutal-shadow hover:-translate-y-1 transition-transform cursor-pointer">
            <InstagramIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="https://www.linkedin.com/in/irfan-p-c-6011813b1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white text-black p-2 md:p-3 border-[3px] border-black brutal-shadow hover:-translate-y-1 transition-transform cursor-pointer">
            <LinkedinIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="bg-white text-black p-2 md:p-3 border-[3px] border-black brutal-shadow hover:-translate-y-1 transition-transform cursor-pointer">
            <GithubIcon className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>

        {/* Role Typography */}
        <div 
          className="absolute z-10 pointer-events-none"
          style={{ top: '38%', left: '6%' }}
        >
          <div className="flex flex-col items-start pointer-events-none">
            <h2 className="hero-role-heading">
              UI/UX<br/>DESIGNER
            </h2>
            <span className="text-white font-black text-4xl md:text-6xl leading-none inline-block my-2" style={{ textShadow: '3px 3px 0px var(--color-black)' }}>+</span>
            <h2 className="hero-role-heading">
              FRONTEND<br/>DEVELOPER
            </h2>
          </div>
        </div>

        {/* Graphic Stickers */}
        
        {/* IRFAN PC Block */}
        <h1 
          className="absolute left-1/2 -translate-x-1/2 w-full text-center font-black leading-none tracking-tight text-white uppercase whitespace-nowrap z-10 pointer-events-none mb-20"
          style={{ fontSize: '15vw', top: '-60px', textShadow: '8px 8px 0px var(--color-black)' }}
        >
          IRFAN PC
        </h1>

        {/* Creative Text Block (Right Side) */}
        <div 
          className="absolute z-20"
          style={{ bottom: '35%', right: '6%' }}
        >
          <div 
            className="bg-white text-black font-black px-4 py-3 md:px-5 md:py-3 border-4 border-black brutal-shadow cursor-pointer"
            style={{ '--rot': '-4deg', transform: 'rotate(-4deg)' }}
          >
            <p className="text-lg md:text-xl lg:text-2xl uppercase leading-tight m-0 tracking-wide">
              CREATIVE<br/>THINKER<br/>& MAKER.
            </p>
          </div>
        </div>

        {/* LET'S BUILD Block */}
        <Link 
          to="/contact"
          className="absolute z-20 block text-black no-underline hover:text-black"
          style={{ bottom: '12%', right: '8%' }}
        >
          <div 
            className="bg-accent-1 text-black font-black px-4 py-3 md:px-6 md:py-4 border-4 border-black brutal-shadow cursor-pointer"
            style={{ '--rot': '4deg', transform: 'rotate(4deg)' }}
          >
            <p className="text-lg md:text-2xl lg:text-3xl uppercase leading-tight m-0 tracking-wide">
              LET'S<br/>BUILD<br/>SOMETHING<br/>GREAT.
            </p>
          </div>
        </Link>

        {/* Red Accent Block & Text */}
        <div 
          className="absolute z-20 flex flex-col md:flex-row items-end md:items-start gap-4"
          style={{ top: '100px', right: '48px' }}
        >
          <Link 
            to="/about"
            className="bg-accent-2 text-black font-black w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-4 border-black brutal-shadow flex-shrink-0 cursor-pointer"
            style={{ '--rot': '12deg', transform: 'rotate(12deg)' }}
          >
            <span className="text-2xl md:text-4xl">↗</span>
          </Link>
          
          <div className="hidden md:flex flex-col items-start mt-2 pointer-events-none select-none">
            <p className="text-white text-sm md:text-base font-bold uppercase leading-tight tracking-widest" style={{ fontFamily: 'var(--font-body)', transform: 'rotate(-4deg)' }}>
              GOOD<br/>DESIGN<br/>BUILDS<br/>BETTER<br/>EXPERIENCES.
            </p>
          </div>
        </div>

        {/* Portrait Image Layer */}
        <div className="hero-portrait-layer tablet-hero-portrait" ref={portraitContainerRef}>
          <div 
            ref={portraitFloatRef} 
            className="absolute" 
            style={{ width: 'calc(100% + 60px)', height: 'calc(100% + 60px)', bottom: '-30px', left: '-30px' }}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={heroImgSmall} type="image/webp" />
              <source media="(max-width: 1023px)" srcSet={heroImgMedium} type="image/webp" />
              <source media="(min-width: 1024px)" srcSet={heroImgLarge} type="image/webp" />
              <img 
                ref={portraitImgRef}
                src={heroImg} 
                alt="My Portrait" 
                className="w-full h-full object-cover object-top" 
                fetchpriority="high"
                loading="eager"
              />
            </picture>
          </div>
        </div>

      </div>
    </section>
  );
}
