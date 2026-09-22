import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id) => {
    if (id === 'about') {
      if (location.pathname !== '/about') {
        navigate('/about');
      } else {
        if (window.lenis && !window.lenis.isDestroyed) {
          window.lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    // For other links: 'hero' (WORK), 'skills', 'projects'
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis && !window.lenis.isDestroyed) {
            window.lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        if (window.lenis && !window.lenis.isDestroyed) {
          window.lenis.scrollTo(element);
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navLinks = [
    { id: 'hero', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' }
  ];

  const isActive = (id) => {
    if (id === 'about') return location.pathname === '/about';
    if (id === 'hero') return location.pathname === '/';
    return false;
  };

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-[800px] flex flex-wrap items-center justify-center gap-2 px-4">
      <style>{`
        @media (max-width: 450px) {
          .mobile-nav-btn {
            padding: 0.4rem 0.25rem !important;
            font-size: 0.65rem !important;
            border-width: 2px !important;
            letter-spacing: 0.05em !important;
          }
          .mobile-nav-container {
            padding: 0.25rem !important;
          }
        }
      `}</style>
      
      {/* Main Nav Block */}
      <div 
        className="flex items-center bg-white border-[3px] border-black px-2 py-2 shadow-[8px_8px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 mobile-nav-container"
      >
        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.id);
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 text-sm font-black tracking-widest uppercase transition-all duration-200 border-[3px] cursor-pointer mobile-nav-btn ${
                  active 
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0px_#000]' 
                    : 'hover:bg-accent-1 hover:border-black text-black border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Social Links */}
      <a 
        href="https://www.linkedin.com/in/irfan-p-c-6011813b1"
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex items-center gap-2 bg-primary text-white border-[3px] border-black px-4 py-3 shadow-[8px_8px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 uppercase text-sm font-black tracking-wider"
      >
        <span className="font-bold">in</span>
        LINKEDIN
      </a>
      
      <a 
        href="https://www.instagram.com/irf4n_.___?stkn=ZGViZHJmMmJ4N29v&utm_source=qr"
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex items-center gap-2 bg-primary text-white border-[3px] border-black px-4 py-3 shadow-[8px_8px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_#000] transition-all duration-200 uppercase text-sm font-black tracking-wider"
      >
        <span className="font-bold">ig</span>
        INSTAGRAM
      </a>

    </header>
  );
}
