'use client';

import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    category: 'LANGUAGES',
    skills: ['Python', 'SQL', 'Java', 'C++', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'DATA ANALYTICS & BI',
    skills: ['Power BI', 'Pandas', 'NumPy', 'EDA', 'KPI Tracking', 'Customer Segmentation'],
  },
  {
    category: 'FRAMEWORKS & TOOLS',
    skills: ['React.js', 'Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'MS Excel'],
  },
  {
    category: 'AI & CORE CS',
    skills: ['Machine Learning', 'Data Structures (DSA)', 'Statistical Analysis', 'Data Preprocessing'],
  },
];

export function Skills() {
  return (
    <section id="about" className="pt-16 sm:pt-20 pb-28 bg-transparent text-left relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-28"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#666668] block mb-6 font-medium">
            About
          </span>
          <h2 className="font-display text-6xl md:text-7xl font-black text-[#E5DFD3] tracking-tight">
            Skills
          </h2>
        </motion.div>

        {/* 2-Column Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-32">
          {SKILL_CATEGORIES.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8C8270] font-medium">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-full font-mono text-[13px] border border-[#222222] bg-[#0A0A0A] text-[#F0E8D5] hover:border-[#444444] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
