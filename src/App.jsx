import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Pages (Lazy Loaded)
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProjectsPage = lazy(() => import('./pages/admin/ProjectsPage'));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm'));
const BlogPage = lazy(() => import('./pages/admin/BlogPage'));
const BlogPostForm = lazy(() => import('./pages/admin/BlogPostForm'));
const MessagesPage = lazy(() => import('./pages/admin/MessagesPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const location = useLocation();

  // Initialize Lenis Smooth Inertial Scrolling & GSAP ScrollTrigger Sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen font-body bg-grid">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Routes */}
      <main className={`relative z-10 ${location.pathname === '/' || location.pathname.startsWith('/admin') ? '' : 'pt-24'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <LoginPage />
            </Suspense>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <ProtectedRoute />
            </Suspense>
          }>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/:id" element={<ProjectForm />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/new" element={<BlogPostForm />} />
              <Route path="blog/:id" element={<BlogPostForm />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </main>

    </div>
  );
}
