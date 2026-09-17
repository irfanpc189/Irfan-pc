import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../assets/hero-portrait.png';

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
          transition: all 0.2s ease-out;
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
      `}</style>
      
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[1600px] mx-auto h-full px-4"
        style={{ height: '100%' }}
      >
        

        {/* Role Typography */}
        <div 
          className="absolute z-10"
          style={{ top: '38%', left: '6%' }}
        >
          <div className="flex flex-col items-start">
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
        <div 
          className="absolute z-20"
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
        </div>

        {/* Red Accent Block & Text */}
        <div 
          className="absolute z-20 flex flex-col md:flex-row items-end md:items-start gap-4"
          style={{ top: '100px', right: '48px' }}
        >
          <div 
            className="bg-accent-2 text-black font-black w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-4 border-black brutal-shadow flex-shrink-0 cursor-pointer"
            style={{ '--rot': '12deg', transform: 'rotate(12deg)' }}
          >
            <span className="text-2xl md:text-4xl">↗</span>
          </div>
          
          <div className="hidden md:flex flex-col items-start mt-2">
            <p className="text-white text-sm md:text-base font-bold uppercase leading-tight tracking-widest" style={{ fontFamily: 'var(--font-body)', transform: 'rotate(-4deg)' }}>
              GOOD<br/>DESIGN<br/>BUILDS<br/>BETTER<br/>EXPERIENCES.
            </p>
          </div>
        </div>

        {/* Portrait Image Layer */}
        <div className="hero-portrait-layer" ref={portraitContainerRef}>
          <div 
            ref={portraitFloatRef} 
            className="absolute" 
            style={{ width: 'calc(100% + 60px)', height: 'calc(100% + 60px)', bottom: '-30px', left: '-30px' }}
          >
            <img 
              ref={portraitImgRef}
              src={heroImg} 
              alt="My Portrait" 
              className="w-full h-full object-cover object-top" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
