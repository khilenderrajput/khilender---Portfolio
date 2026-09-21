'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function KPIStats() {
  return (
    <section className="py-10 border-y border-surfaceBorder bg-surface/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-surfaceBorder">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="pt-4 sm:pt-0 px-2 flex flex-col items-center justify-center"
            >
              <b className="stat-number text-3xl sm:text-4xl font-bold text-gold tracking-tight block mb-1">
                {stat.value}
              </b>
              <span className="font-mono text-xs text-cream font-semibold uppercase tracking-wider block mb-0.5">
                {stat.label}
              </span>
              <span className="font-body text-[11px] text-cream-faint">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
