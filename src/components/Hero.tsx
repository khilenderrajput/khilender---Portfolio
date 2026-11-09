'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import ParticleName from './ParticleName';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export default function Hero({ onOpenResumeModal }: HeroProps) {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-4 flex items-start justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* Left Column: Particle Name & Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left w-full">

            {/* Particle Name Title - Top of page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full lg:w-[124%] mb-1 sm:mb-2 relative z-20"
            >
              <ParticleName text={PERSONAL_INFO.name} align="left" />
            </motion.div>

            {/* Short Bio & Sub-Content Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-xl top-0 md:top-[-160px] lg:top-[-220px] mb-0 md:mb-[-120px] lg:mb-[-180px] pt-1 sm:pt-3 lg:pt-16 flex flex-col gap-6"
            >
              {/* Introduction Text */}
              <p className="font-body text-[#888888] text-sm md:text-base leading-relaxed">
                Hi everyone! I'm an aspiring Data Analyst and B.Tech CSE student specializing in Artificial intellegence, Machine Learning, and Deep learning at Teerthanker Mahaveer University. I love turning raw data into actionable business insights—from analyzing retail shopping trends and building credit card financial dashboards to engineering OTT churn & revenue analytics pipelines with Power BI, SQL, and Python. Right now, I'm actively seeking entry-level Data Analyst roles to solve real-world business problems!
              </p>

              {/* Mobile Hero Photo: Placed prominently near the top in correct order with name & intro */}
              <div className="flex lg:hidden w-full justify-center my-1 sm:my-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative w-full max-w-[210px] sm:max-w-[250px] aspect-[3/4] rounded-2xl overflow-hidden border border-surfaceBorderStrong shadow-[0_25px_50px_-15px_rgba(0,0,0,0.85)] bg-surface flex-shrink-0"
                >
                  <img
                    src="/hero-profile.jpg"
                    alt="Khilender Rajput - Profile Photo"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.02]"
                  />
                </motion.div>
              </div>

              {/* 3-Column Metadata Section */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#666668] block mb-1">
                    STATUS
                  </span>
                  <span className="font-body text-[#888888] text-xs sm:text-sm md:text-base font-normal">
                    Final year
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#666668] block mb-1">
                    COLLEGE
                  </span>
                  <span className="font-body text-[#888888] text-xs sm:text-sm md:text-base font-normal">
                    TMU Mbd
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#666668] block mb-1">
                    FOCUS
                  </span>
                  <span className="font-body text-[#888888] text-xs sm:text-sm md:text-base font-normal break-words">
                    Excel, Python, PowerBI, SQL
                  </span>
                </div>
              </div>

              {/* Action Pill CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider font-bold text-[#0A0A0A] bg-[#C5A880] hover:bg-[#b59870] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center justify-center cursor-pointer select-none"
                >
                  VIEW RÉSUMÉ
                </a>

                <a
                  href="#projects"
                  className="font-mono text-xs uppercase tracking-wider font-medium text-[#C8C8C8] bg-[#111113] hover:bg-[#1a1a1e] border border-[#222222] hover:border-[#333333] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 select-none"
                >
                  <span>SEE THE PROJECTS</span>
                  <span className="text-sm leading-none">↘</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Desktop Photo Column: Visible on desktop */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-start -translate-x-5 flex-shrink-0 relative">
            {/* Physical Spacer */}
            <div style={{ height: '42px' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -1.4, y: 26 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative', top: '26px' }}
              className="relative w-full max-w-[240px] sm:max-w-[272px] aspect-[3/4] rounded-2xl overflow-hidden border border-surfaceBorderStrong shadow-[0_40px_70px_-25px_rgba(0,0,0,0.85)] group bg-surface flex-shrink-0"
            >
              {/* Profile Image */}
              <img
                src="/hero-profile.jpg"
                alt="Khilender Rajput - Profile Photo"
                className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.02] transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
