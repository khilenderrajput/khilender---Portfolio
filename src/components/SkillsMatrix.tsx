'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import { Code2, BarChart2, Cpu, Wrench } from 'lucide-react';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="skills" className="py-20 border-b border-surfaceBorder">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="eyebrow block mb-2">// TECHNICAL COMPETENCIES</span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream">
              Data & Analytical Skillset
            </h2>
          </div>
          <p className="font-mono text-xs text-cream-faint max-w-sm">
            Categorized tools, programming languages, and analytical frameworks utilized in real-world data projects.
          </p>
        </motion.div>

        {/* Skill Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-surfaceBorder pb-4">
          {SKILL_CATEGORIES.map((cat, index) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(index)}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 border ${
                activeTab === index
                  ? 'bg-gold text-accent-ink font-bold border-gold shadow-lg shadow-gold/20'
                  : 'bg-surface text-cream-dim border-surfaceBorderStrong hover:border-gold/50 hover:text-cream'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES[activeTab].skills.map((skill, idx) => (
            <div
              key={skill.name}
              className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                skill.highlight
                  ? 'bg-surface/90 border-gold/40 hover:border-gold shadow-md hover:scale-[1.02]'
                  : 'bg-surface/50 border-surfaceBorder hover:border-surfaceBorderStrong'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${skill.highlight ? 'bg-gold animate-pulse' : 'bg-cream-faint'}`} />
                <span className="font-mono text-xs font-medium text-cream group-hover:text-gold transition-colors">
                  {skill.name}
                </span>
              </div>
              {skill.highlight && (
                <span className="font-mono text-[10px] uppercase text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                  Core
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Proximity Magnetic Skill Matrix Grid Showcase */}
        <div className="mt-16 glow-card rounded-2xl p-6 sm:p-8 bg-surface/60 border border-surfaceBorder">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="eyebrow block mb-1">Interactive Analytics Stack</span>
              <h3 className="font-display text-xl font-bold text-cream">
                Core Data Analytics Tools
              </h3>
            </div>
            <span className="font-mono text-xs text-gold border border-gold/30 px-3 py-1 rounded-full bg-gold/10">
              Interactive Matrix
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { name: "SQL", level: "Advanced Queries & CTEs", category: "Querying" },
              { name: "Power BI", level: "DAX & Dashboarding", category: "BI" },
              { name: "Python (Pandas)", level: "Data Cleaning & EDA", category: "Analytics" },
              { name: "NumPy", level: "Array Computing", category: "Libraries" },
              { name: "Microsoft Excel", level: "Pivot Tables & VLOOKUP", category: "Spreadsheets" },
              { name: "Exploratory Data Analysis", level: "Pattern Recognition", category: "Methodology" },
              { name: "Customer Segmentation", level: "Cohort Analysis", category: "Strategy" },
              { name: "Churn Risk Modeling", level: "Scikit-Learn ML", category: "Predictive" },
              { name: "KPI Tracking", level: "Stakeholder Metrics", category: "Reporting" },
              { name: "Jupyter Notebook", level: "Analytical Workflows", category: "Tools" },
              { name: "Git & GitHub", level: "Version Control", category: "DevOps" },
              { name: "Data Visualization", level: "Interactive Charts", category: "BI" }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.06, y: -2 }}
                className="tag-pill cursor-pointer flex items-center gap-2 py-2 px-4 bg-surfaceLight/80 hover:bg-gold/15 hover:border-gold transition-all"
              >
                <span className="font-mono text-xs font-bold text-cream">{item.name}</span>
                <span className="font-mono text-[10px] text-gold/80 border-l border-surfaceBorderStrong pl-2">
                  {item.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
