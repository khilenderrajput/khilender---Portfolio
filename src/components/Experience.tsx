'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  number: string;
  title: string;
  organization: string;
  duration?: string;
  mode?: string;
  descriptions: string[];
}

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    number: '01',
    title: 'Data Analytics Intern',
    organization: 'iNeuBytes Technology & Services Pvt. Ltd.',
    descriptions: [
      'Completing project-based Data Analytics assignments covering data cleaning, EDA, and KPI reporting to turn raw datasets into business insights.',
      'Submitting documented analysis, project work, and deliverables through the iNeuBytes portal within defined timelines.',
    ],
  },
  {
    number: '02',
    title: 'UI/UX Design Intern',
    organization: 'GENIUS CYBER SECURITY COUNCIL',
    descriptions: [
      'Built the official Genius Cyber Security Council website, focusing on UI/UX, responsive design, and user experience.',
    ],
  },
  {
    number: '03',
    title: 'Team Leader – Planning & Coordination',
    organization: 'GENIUS CYBER SECURITY COUNCIL',
    descriptions: [
      '• Led team coordination and managed client relationships, project requirements, and stakeholder communication.',
      '• Supported business expansion by engaging with universities, meeting Deans, and building professional institutional partnerships.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-20 pb-28 bg-transparent text-left relative z-10 scroll-mt-20">
      {/* Anchor alias to support navbar #certificate links seamlessly */}
      <div id="certificate" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20 md:mb-28 lg:mb-32"
        >
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-[#E5DFD3] tracking-tight leading-none">
            Experience
          </h2>
        </motion.div>

        {/* Compact Stacked Flex List */}
        <div className="space-y-[35px] sm:space-y-[40px]">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              className="flex items-start gap-6 sm:gap-10 group"
            >
              {/* Left Side: Index Number */}
              <div className="font-mono text-xl md:text-2xl font-medium text-[#BFA678] flex-none pt-0.5 w-8">
                {item.number}
              </div>

              {/* Right Side: Vertical Stacked Content */}
              <div className="max-w-3xl">
                <h3 className="text-xl md:text-2xl font-bold text-[#E5DFD3] leading-snug mb-2.5 sm:mb-3">
                  {item.title}
                </h3>

                <div className="mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#666668] block">
                    {item.organization}
                  </span>
                  {(item.duration || item.mode) && (
                    <div className="font-mono text-[11px] text-[#78786C] tracking-wider flex flex-wrap items-center gap-x-2 mt-1">
                      {item.duration && <span>Duration: {item.duration}</span>}
                      {item.duration && item.mode && <span className="text-[#444448]">•</span>}
                      {item.mode && <span>Mode: {item.mode}</span>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {item.descriptions.map((desc, i) => (
                    <p key={i} className="text-xs md:text-sm text-[#888888] leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ExperienceSection;
