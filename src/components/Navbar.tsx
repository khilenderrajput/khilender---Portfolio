'use client';

import { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onToggleSound: () => void;
  onOpenResumeModal: () => void;
}

export default function Navbar({ isPlaying, onToggleSound, onOpenResumeModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CERTIFICATE', href: '#certificate' },
    { name: 'ABOUT', href: '#about' },
    { name: 'MUSIC', href: '#music' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 sm:top-5 right-6 md:right-12 translate-y-[2px] z-50 pointer-events-none">
      <nav className="glass-pill pointer-events-auto rounded-full px-5 py-[8.5px] flex items-center justify-between shadow-2xl transition-all duration-300 border border-[rgba(230,225,211,0.22)] bg-[#131315d9] backdrop-blur-md gap-4 sm:gap-6">
        
        {/* Left Group: Brand Monogram & Sound Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="#hero"
            aria-label="Khilender Rajput Home"
            className="font-mono text-[11px] uppercase tracking-[0.06em] text-cream-dim hover:text-cream transition-all flex-none px-1 py-1"
          >
            KR
          </a>

          <button
            onClick={onToggleSound}
            aria-pressed={isPlaying}
            title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
            className={`w-7 h-7 sm:w-7 sm:h-7 rounded-full border flex-none flex items-center justify-center transition-all duration-200 ${
              isPlaying
                ? 'border-gold text-gold bg-gold/15 shadow-[0_0_10px_rgba(200,169,97,0.3)]'
                : 'border-surfaceBorderStrong text-cream-dim hover:border-gold hover:text-gold'
            }`}
          >
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] bg-gold eq-bar-1" />
                <span className="w-[2px] bg-gold eq-bar-2" />
                <span className="w-[2px] bg-gold eq-bar-3" />
              </div>
            ) : (
              <VolumeX size={11} />
            )}
          </button>
        </div>

        {/* Center Group: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-3 sm:gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.06em] text-cream-dim hover:text-cream px-2 py-1 rounded-full hover:bg-surfaceLight transition-all"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Group: RÉSUMÉ Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center font-mono text-[11px] uppercase tracking-wider font-bold text-[#0A0A0A] bg-[#BFA678] hover:bg-[#b0976a] rounded-full px-5 py-1.5 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md flex-none cursor-pointer"
          >
            RÉSUMÉ
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded-full text-cream-dim hover:text-cream border border-surfaceBorder flex-none"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-16 bg-surface/95 border border-surfaceBorderStrong backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xl md:hidden z-50">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-[11px] uppercase tracking-wider text-cream-dim hover:text-gold py-1.5 border-b border-surfaceBorder/40"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center font-mono text-[11px] uppercase tracking-wider font-bold text-[#0A0A0A] bg-[#BFA678] hover:bg-[#b0976a] rounded-xl py-2 shadow-md transition-all cursor-pointer block"
          >
            RÉSUMÉ
          </a>
        </div>
      )}
    </header>
  );
}
