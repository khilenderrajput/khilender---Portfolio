'use client';

import { motion } from 'framer-motion';
import { EDUCATION_LIST } from '@/data/portfolioData';
import { GraduationCap } from 'lucide-react';

export default function ExperienceEducation() {
  return (
    <section id="education" className="pt-20 pb-28 bg-transparent text-left relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-4 font-semibold">
            ACADEMICS
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#E5DFD3] tracking-tight leading-none">
            Education
          </h2>
        </motion.div>

        {/* Education Timeline Items */}
        <div className="space-y-8">
          {EDUCATION_LIST.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl p-8 sm:p-10 bg-[#121212]/90 border border-[#222225] backdrop-blur-sm hover:border-[#333333] transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Index Number */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-[#BFA678]">
                    0{index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#BFA678]/15 border border-[#BFA678]/30 flex items-center justify-center text-[#BFA678] md:hidden">
                    <GraduationCap size={20} />
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#E5DFD3]">
                      {edu.institution}
                    </h3>
                    {edu.grade && (
                      <span className="font-mono text-xs text-[#BFA678] border border-[#BFA678]/30 bg-[#BFA678]/10 px-3 py-1 rounded-full w-fit">
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-xs text-[#999999] uppercase tracking-wider">
                    {edu.degree} <span className="text-[#666668]">• {edu.duration}</span>
                  </p>

                  <ul className="space-y-2 font-body text-sm text-[#888888] pt-2">
                    {edu.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BFA678] mt-2 flex-none" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
