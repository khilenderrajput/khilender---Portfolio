'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import ExperienceSection from '@/components/Experience';
import StatsBanner from '@/components/StatsBanner';
import Skills from '@/components/Skills';
import Certificates from '@/components/Certificates';
import ExperienceEducation from '@/components/ExperienceEducation';
import AudioPlayer, { AudioPlayerHandle } from '@/components/AudioPlayer';
import Contact from '@/components/Contact';
import ProjectModal from '@/components/ProjectModal';
import ResumeModal from '@/components/ResumeModal';
import { Project } from '@/data/portfolioData';

export default function Home() {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);

  const handleToggleSound = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.toggleNavbarMusic();
    } else {
      setIsPlayingSound((prev) => !prev);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-cream relative selection:bg-gold selection:text-accent-ink overflow-hidden">
      {/* Background Interactive Canvas (Orbital Stardust Trail) */}
      <BackgroundCanvas />

      {/* Custom Cursor Ring */}
      <CustomCursor />

      {/* Floating Glass Navbar */}
      <Navbar
        isPlaying={isPlayingSound}
        onToggleSound={handleToggleSound}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Projects Grid */}
      <Projects onSelectProject={(project) => setSelectedProject(project)} />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Stats Section (Right Below Certificates) */}
      <StatsBanner />

      {/* Technical Skills Section */}
      <Skills />

      {/* Certificates Section */}
      <Certificates />

      {/* Education Section */}
      <ExperienceEducation />

      {/* Audio Deck Widget */}
      <AudioPlayer
        ref={audioPlayerRef}
        isPlaying={isPlayingSound}
        onPlayStateChange={(playing) => setIsPlayingSound(playing)}
      />

      {/* Contact Section */}
      <Contact />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </main>
  );
}
