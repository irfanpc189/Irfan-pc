import React from 'react';
import HeroScene from '../components/HeroScene';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import WorkflowSection from '../components/WorkflowSection';
import DesignCodeSection from '../components/DesignCodeSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroScene />
      <AboutSection />
      <ServicesSection />
      <WorkflowSection />
      <DesignCodeSection />
      <ProjectsSection />
      <SkillsSection />
    </div>
  );
}
