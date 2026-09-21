'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    value: '650+',
    label: 'DSA PROBLEMS SOLVED',
  },
  {
    value: '1707',
    label: 'LEETCODE MAX RATING',
  },
  {
    value: '1513',
    label: 'CODECHEF MAX RATING',
  },
];

export default function StatsBanner() {
  return (
    <section className="pt-0 pb-12 -mt-4 bg-transparent text-left relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl items-start mb-16 sm:mb-20">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="space-y-1"
            >
              <div className="font-mono text-4xl md:text-5xl font-bold text-[#BFA678] tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#666668] leading-tight font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
