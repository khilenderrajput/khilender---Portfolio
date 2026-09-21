'use client';

import { ArrowUp, BarChart2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-surfaceBorder bg-bgDeep relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-mono text-xs font-bold">
            KR
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-cream tracking-wide">
              KHILENDER RAJPUT
            </p>
            <p className="font-mono text-[11px] text-cream-faint">
              © {new Date().getFullYear()} • Data Analyst Portfolio. All rights reserved.
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 font-mono text-xs text-cream-dim bg-surface px-4 py-1.5 rounded-full border border-surfaceBorder">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Entry-Level Data Analyst Candidate</span>
        </div>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="font-mono text-xs uppercase tracking-wider text-cream-dim hover:text-gold border border-surfaceBorderStrong hover:border-gold px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>

      </div>
    </footer>
  );
}
