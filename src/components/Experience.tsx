'use client';

import { motion } from 'framer-motion';

const EXPERIENCE_ITEMS = [
  {
    number: '01',
    title: 'SQL Problem Solver',
    subtitle: 'LEETCODE • 75+ QUESTIONS SOLVED',
    description:
      'Solved 75+ SQL problems on LeetCode covering joins, window functions, and performance queries.',
  },
  {
    number: '02',
    title: 'OTT Subscription Churn Analytics',
    subtitle: 'DATA ANALYTICS PIPELINE • PYTHON & SQL & POWER BI',
    description:
      'Built end-to-end churn analytics tracking 20+ KPIs with revenue retention modeling.',
  },
  {
    number: '03',
    title: 'Certified Data & AI Specialist',
    subtitle: 'IBM • CODEALPHA • HP LIFE',
    description:
      'Certifications in Python for Data Science (IBM) and Data Science Internship (CodeAlpha).',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="pt-24 pb-20 bg-transparent relative z-10 border-b border-[#222225] text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-[19px]">
            EXPERIENCE
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#E5DFD3] tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Stacked Entries List */}
        <div className="divide-y divide-[#222225] border-t border-b border-[#222225]">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start group"
            >
              {/* Index Number */}
              <div className="md:col-span-2 font-mono text-3xl font-medium text-[#666668] group-hover:text-[#E5DFD3] transition-colors">
                {item.number}
              </div>

              {/* Title & Subtitle */}
              <div className="md:col-span-5 space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#666668] block">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#E5DFD3] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5 text-[#999999] text-sm md:text-base leading-relaxed pt-1">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
