'use client';

import { motion } from 'framer-motion';
import { Database, LineChart, Target, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export function AboutSection() {
  const pillars = [
    {
      icon: Database,
      title: "Data Wrangling & SQL",
      desc: "Cleansing unstructured raw records, writing complex SQL JOINs, CTEs, and window functions for aggregation."
    },
    {
      icon: LineChart,
      title: "BI & Dashboarding",
      desc: "Designing intuitive Power BI reports with DAX measures, dynamic slicers, and interactive stakeholder views."
    },
    {
      icon: Target,
      title: "Business KPI Tracking",
      desc: "Quantifying MRR leakage, Customer Lifetime Value (CLTV), churn risk scoring, and spending trends."
    },
    {
      icon: Layers,
      title: "Python Analytics Pipeline",
      desc: "Leveraging Pandas, NumPy, and Scikit-Learn for statistical EDA, cohort segmentation, and predictive models."
    }
  ];

  return (
    <section id="about" className="py-24 bg-transparent text-left relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14 sm:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-4 font-semibold">
            ABOUT ME
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#E5DFD3] mb-4 tracking-tight leading-none">
            Turning Data into Decisions
          </h2>
          <p className="font-body text-[#999999] text-base sm:text-lg leading-relaxed pt-2">
            I am a Data Analyst driven by curiosity, mathematical precision, and strategic business impact.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Detailed Bio Paragraphs */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-body text-[#888888] leading-relaxed text-base">
            {PERSONAL_INFO.aboutDetailed.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#121212]/90 p-6 sm:p-7 rounded-2xl border border-[#222225] backdrop-blur-sm hover:border-[#333333] transition-colors"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Core Analytical Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl border border-[#222225] bg-[#121212]/90 backdrop-blur-sm flex items-start gap-4 hover:border-[#333333] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#BFA678]/15 border border-[#BFA678]/30 flex items-center justify-center text-[#BFA678] flex-none">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#E5DFD3] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-xs text-[#888888] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;
