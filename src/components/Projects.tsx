'use client';

import { motion } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import { Github, Eye, ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  // SVG Mock Placeholders for project preview cards
  const getProjectVisual = (id: string) => {
    if (id === 'retail-customer-analytics') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-surfaceLight to-bgDeep flex flex-col justify-between p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex justify-end items-center z-10">
            <span className="font-mono text-xs text-emerald-400 font-semibold">+28% Efficiency</span>
          </div>
          <div className="my-auto z-10 space-y-2">
            <div className="h-2 w-3/4 bg-gold/40 rounded-full" />
            <div className="h-2 w-1/2 bg-surfaceBorderStrong rounded-full" />
            <div className="h-10 w-full bg-surface/80 rounded-xl border border-gold/20 p-3 flex items-center justify-between">
              <span className="font-mono text-xs text-cream">SQL Cohort Queries</span>
              <span className="font-mono text-xs text-gold">100k+ Transactions</span>
            </div>
          </div>
          <div className="flex justify-between items-end z-10">
            <span className="font-mono text-[10px] text-cream-faint">Power BI • Python • SQL</span>
            <span className="font-mono text-xs text-gold underline">View Dashboard</span>
          </div>
        </div>
      );
    } else if (id === 'credit-card-financial-dashboard') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-bgDeep to-surfaceLight flex flex-col justify-between p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex justify-between items-center z-10">
            <span className="font-mono text-xs text-gold border border-gold/30 bg-gold/10 px-3 py-1 rounded-full">
              Financial BI
            </span>
            <span className="font-mono text-xs text-emerald-400 font-semibold">Real-Time KPIs</span>
          </div>
          <div className="my-auto z-10 grid grid-cols-2 gap-2">
            <div className="p-3 bg-surface/80 rounded-xl border border-surfaceBorder text-center">
              <span className="font-mono text-[10px] text-cream-faint block">Total Volume</span>
              <span className="stat-number text-lg font-bold text-cream">$54.2M</span>
            </div>
            <div className="p-3 bg-surface/80 rounded-xl border border-surfaceBorder text-center">
              <span className="font-mono text-[10px] text-cream-faint block">Delinquency</span>
              <span className="stat-number text-lg font-bold text-gold">1.42%</span>
            </div>
          </div>
          <div className="flex justify-between items-end z-10">
            <span className="font-mono text-[10px] text-cream-faint">DAX • SQL • Power BI</span>
            <span className="font-mono text-xs text-gold underline">Explore Metrics</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full bg-gradient-to-br from-surfaceLight via-bgDeep to-surface flex flex-col justify-between p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex justify-between items-center z-10">
            <span className="font-mono text-xs text-gold border border-gold/30 bg-gold/10 px-3 py-1 rounded-full">
              OTT Churn Model
            </span>
            <span className="font-mono text-xs text-emerald-400 font-semibold">20+ Churn KPIs</span>
          </div>
          <div className="my-auto z-10 space-y-2">
            <div className="p-3 bg-surface/80 rounded-xl border border-gold/30 flex items-center justify-between">
              <span className="font-mono text-xs text-cream">MRR Leakage Uncovered</span>
              <span className="stat-number text-sm font-bold text-gold">$142K/mo</span>
            </div>
            <div className="h-2 w-full bg-surfaceBorder rounded-full overflow-hidden">
              <div className="h-full bg-gold w-3/4" />
            </div>
          </div>
          <div className="flex justify-between items-end z-10">
            <span className="font-mono text-[10px] text-cream-faint">Python • Pandas • ML</span>
            <span className="font-mono text-xs text-gold underline">View Analytics</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="projects" className="pt-36 pb-28 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20 pl-0"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-[19px] font-semibold">
            WORK
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#E5DFD3] tracking-tight leading-none">
            Projects
          </h2>
        </motion.div>

        {/* Projects Cards List */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#121212]/90 backdrop-blur-sm border border-[#222222] hover:border-[#333333] rounded-3xl p-10 md:p-16 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch h-full ${
                    isReverse ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Visual Media Column (Left) */}
                  <div
                    className={`lg:col-span-5 min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden border border-[#222222] relative cursor-pointer group bg-[#18181A] flex flex-col justify-between ${
                      isReverse ? 'lg:order-2' : 'lg:order-1'
                    }`}
                    onClick={() => onSelectProject(project)}
                  >
                    {getProjectVisual(project.id)}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#0A0A0A] bg-[#C5A880] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl">
                        <Eye size={15} />
                        <span>Explore Analytics & Code</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Info Column (Right) */}
                  <div className={`lg:col-span-7 flex flex-col justify-between h-full ${
                    isReverse ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    
                    {/* Top Content Block */}
                    <div>
                      {/* Top Metadata */}
                      <span className="font-mono text-xs uppercase tracking-wider text-[#666668] block mb-3 font-medium">
                        {formattedIndex} • {project.category.toUpperCase()}
                      </span>

                      {/* Project Title */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#E5DFD3] hover:text-[#C5A880] transition-colors cursor-pointer mb-4 leading-tight"
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-[#999999] text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Data Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#1F1F22] mb-6">
                        {project.keyMetrics.map((m) => (
                          <div key={m.label}>
                            <b className="stat-number text-xl sm:text-2xl font-bold text-[#E5DFD3] block mb-0.5">
                              {m.value}
                            </b>
                            <span className="font-mono text-[10px] sm:text-xs text-[#666668] uppercase tracking-wider block">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs text-[#999999] bg-[#18181A] border border-[#262629] px-3.5 py-1.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="flex flex-wrap items-center gap-8 pt-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="font-mono text-xs uppercase tracking-widest font-semibold text-[#E5DFD3] border-b border-[#333333] hover:border-[#E5DFD3] pb-1 transition-colors duration-300 flex items-center gap-1.5 cursor-pointer bg-transparent"
                      >
                        <span>LIVE</span>
                        <span className="text-sm leading-none">↗</span>
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-widest font-semibold text-[#E5DFD3] border-b border-[#333333] hover:border-[#E5DFD3] pb-1 transition-colors duration-300 flex items-center gap-1.5"
                      >
                        <Github size={14} />
                        <span>GITHUB</span>
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
