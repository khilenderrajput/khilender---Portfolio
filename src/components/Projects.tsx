'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, Project } from '@/data/portfolioData';
import { Github, Eye, ArrowUpRight } from 'lucide-react';

const FILTER_OPTIONS = [
  'Major Projects',
  'Excel',
  'Python',
  'SQL',
  'Power BI',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Major Projects');

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'Major Projects') {
      return project.filterCategories ? project.filterCategories.includes('Major Projects') : true;
    }
    return project.filterCategories?.includes(activeFilter) ?? false;
  });
  // SVG Mock Placeholders for project preview cards
  const getProjectVisual = (id: string) => {
    if (id === 'vande-bharat-performance') {
      return (
        <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between">
          <img
            src="/images/vande-bharat-dashboard.jpg"
            alt="Vande Bharat Train Passenger Performance Dashboard"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-95 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/35 to-[#0A0A0B]/65" />
          <div className="flex justify-between items-center z-10 p-6">
            <span className="font-mono text-xs text-gold border border-gold/30 bg-[#0A0A0B]/80 px-3 py-1 rounded-full backdrop-blur-sm">
              Railway BI
            </span>
            <span className="font-mono text-xs text-emerald-400 font-semibold bg-[#0A0A0B]/80 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Power BI
            </span>
          </div>
          <div className="flex justify-between items-end z-10 p-6">
            <span className="font-mono text-[10px] text-cream-faint bg-[#0A0A0B]/70 px-2.5 py-1 rounded backdrop-blur-sm">
              Power BI • DAX • Power Query
            </span>
            <span className="font-mono text-xs text-gold underline font-medium">
              View Dashboard
            </span>
          </div>
        </div>
      );
    } else if (id === 'airbnb-global-performance') {
      return (
        <div className="w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between">
          <img
            src="/images/airbnb-dashboard.jpg"
            alt="Airbnb Global Performance Dashboard"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-95 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/35 to-[#0A0A0B]/65" />
          <div className="flex justify-between items-center z-10 p-6">
            <span className="font-mono text-xs text-gold border border-gold/30 bg-[#0A0A0B]/80 px-3 py-1 rounded-full backdrop-blur-sm">
              Global BI
            </span>
            <span className="font-mono text-xs text-emerald-400 font-semibold bg-[#0A0A0B]/80 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Power BI
            </span>
          </div>
          <div className="flex justify-between items-end z-10 p-6">
            <span className="font-mono text-[10px] text-cream-faint bg-[#0A0A0B]/70 px-2.5 py-1 rounded backdrop-blur-sm">
              Power BI • Power Query • DAX
            </span>
            <span className="font-mono text-xs text-gold underline font-medium">
              View Dashboard
            </span>
          </div>
        </div>
      );
    } else if (id === 'credit-card-financial-dashboard') {
      return (
        <div className="w-full min-h-[260px] sm:min-h-[290px] h-full bg-gradient-to-br from-bgDeep to-surfaceLight flex flex-col justify-between p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
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
        <div className="w-full min-h-[260px] sm:min-h-[290px] h-full bg-gradient-to-br from-surfaceLight via-bgDeep to-surface flex flex-col justify-between p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="flex justify-between items-center z-10">
            <span className="font-mono text-xs text-gold border border-gold/30 bg-gold/10 px-3 py-1 rounded-full">
              Walmart Sales
            </span>
            <span className="font-mono text-xs text-emerald-400 font-semibold">$8.49M Sales</span>
          </div>
          <div className="my-auto z-10 space-y-2">
            <div className="p-3 bg-surface/80 rounded-xl border border-gold/30 flex items-center justify-between">
              <span className="font-mono text-xs text-cream">Total Sales Revenue</span>
              <span className="stat-number text-sm font-bold text-gold">$8.49M</span>
            </div>
            <div className="h-2 w-full bg-surfaceBorder rounded-full overflow-hidden">
              <div className="h-full bg-gold w-3/4" />
            </div>
          </div>
          <div className="flex justify-between items-end z-10">
            <span className="font-mono text-[10px] text-cream-faint">Python • Pandas • SQL</span>
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
          className="max-w-2xl mb-14 md:mb-16 pl-0"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-[19px] font-semibold">
            WORK
          </span>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-[#E5DFD3] tracking-tight leading-none">
            Projects
          </h2>
        </motion.div>

        {/* Interactive Filter Buttons Row Matching Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-14 md:mb-16"
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-2 rounded-full font-mono text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? 'border border-[#555560] bg-[#16161A] text-[#F3EFE6] font-medium'
                    : 'border border-[#222226] bg-[#0A0A0C] text-[#C4BFB2] hover:text-[#F3EFE6] hover:border-[#44444A]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Cards List or Clean Empty State */}
        {filteredProjects.length === 0 ? (
          <motion.div
            key={`empty-${activeFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121214]/95 backdrop-blur-sm border border-[#222226] rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto my-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold/80 block mb-3 font-semibold">
              {activeFilter}
            </span>
            <p className="font-body text-[#9ca3af] text-sm sm:text-base mb-2">
              No projects in this category yet.
            </p>
            <span className="font-mono text-xs text-[#71717a]">
              New projects will be added soon.
            </span>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {filteredProjects.map((project, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const isCreditCard = project.id === 'credit-card-financial-dashboard';
            const isStandardizedCard = project.id === 'sales-analysis-excel-dashboard' || project.id === 'ipl-capstone-project' || project.id === 'teco-customer-churn-analysis' || project.id === 'retail-sales-analysis-sql';
            const isCompactCard = true;
            const isReversed = isCreditCard;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-[#121214]/95 backdrop-blur-sm border border-[#222226] hover:border-[#33333a] rounded-3xl transition-all duration-300 relative overflow-hidden py-8 sm:py-12 md:py-14 lg:py-16 px-6 sm:px-8 lg:px-7 ${
                  isStandardizedCard ? 'lg:h-[585px]' : ''
                }`}
              >
                <div
                  className={
                    isReversed
                      ? 'flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-[60px]'
                      : 'flex flex-col lg:flex-row items-center gap-6 lg:gap-[60px]'
                  }
                >
                  
                  {/* Visual Media Column (Left on Project 1 & 3, Right on Project 2) */}
                  <div
                    className={
                      isCompactCard
                        ? 'w-full lg:w-[470px] lg:flex-none rounded-lg overflow-hidden border border-[#2a2a2e] relative cursor-pointer group bg-[#141416] shadow-xl flex items-center justify-center transition-all duration-300 hover:border-gold/30 scale-x-[1.03] scale-y-[1.06] origin-center'
                        : 'lg:col-span-5 w-full rounded-lg overflow-hidden border border-[#2a2a2e] relative cursor-pointer group bg-[#141416] shadow-xl flex items-center justify-center transition-all duration-300 hover:border-gold/30'
                    }
                    onClick={() => {
                      if (project.liveUrl) {
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        onSelectProject(project);
                      }
                    }}
                  >
                    {project.image ? (
                      <div
                        className={
                          isStandardizedCard
                            ? 'w-full aspect-[1024/570] relative overflow-hidden rounded-lg'
                            : 'w-full relative overflow-hidden rounded-lg'
                        }
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className={
                            isStandardizedCard
                              ? 'w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
                              : 'w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
                          }
                        />
                        {/* Hover Overlay: Dark translucent overlay with TRY IT LIVE ↗ or VIEW DETAILS ↗ text */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-lg">
                          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.25em] text-[#E5DFD3] font-normal flex items-center gap-2 select-none">
                            <span>{project.liveUrl ? 'TRY IT LIVE' : 'VIEW DETAILS'}</span>
                            <span className="text-sm leading-none">↗</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      getProjectVisual(project.id)
                    )}
                  </div>

                  {/* Body Info Column (Right on Project 1 & 3, Left on Project 2) */}
                  <div
                    className={
                      isCompactCard
                        ? `w-full lg:w-[530px] lg:flex-none flex flex-col ${
                            isStandardizedCard ? 'lg:h-[455px] lg:justify-between' : 'justify-center'
                          }`
                        : 'lg:col-span-7 flex flex-col justify-center'
                    }
                  >
                    
                    {/* Top Metadata */}
                    <span className={`font-mono text-xs uppercase tracking-[0.2em] text-[#88888e] block font-semibold ${
                      isStandardizedCard ? 'mb-3 lg:mb-0' : 'mb-3'
                    }`}>
                      {formattedIndex} · {project.category.toUpperCase()}
                    </span>

                    {/* Project Title */}
                    <h3
                      onClick={() => onSelectProject(project)}
                      className={`font-display text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-[#F3EFE6] hover:text-gold transition-colors cursor-pointer leading-[1.15] tracking-tight ${
                        isStandardizedCard ? 'mb-5 lg:mb-0' : 'mb-5'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className={`font-body text-[#9ca3af] text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-2xl ${
                      isStandardizedCard ? 'mb-7 lg:mb-0' : 'mb-7'
                    }`}>
                      {project.description}
                    </p>

                    {/* Key Metrics / Highlights */}
                    <div className={`flex flex-wrap items-start gap-8 sm:gap-12 ${
                      isStandardizedCard ? 'mb-7 lg:mb-0' : 'mb-7'
                    }`}>
                      {project.keyMetrics.map((m) => (
                        <div key={m.label} className="min-w-[110px]">
                          <b className="stat-number text-lg sm:text-xl font-extrabold text-[#F3EFE6] block mb-1">
                            {m.value}
                          </b>
                          <span className="font-mono text-[10px] sm:text-xs text-[#71717a] uppercase tracking-wider block">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Tags & Actions */}
                    <div className={`flex flex-wrap items-center justify-between gap-4 ${
                      isStandardizedCard ? 'pt-2 lg:pt-0' : 'pt-2'
                    }`}>
                      <div className="flex flex-wrap gap-2.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs text-[#a1a1aa] bg-[#18181b] border border-[#2e2e33] px-3.5 py-1.5 rounded-full hover:border-gold/40 hover:text-gold transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Quick Action Links */}
                      <div className="flex items-center gap-6">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase tracking-widest font-semibold text-[#E5DFD3] hover:text-gold border-b border-[#333333] hover:border-gold pb-1 transition-colors duration-300 flex items-center gap-1.5"
                          >
                            <span>LIVE</span>
                            <span className="text-sm leading-none">↗</span>
                          </a>
                        )}

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs uppercase tracking-widest font-semibold text-[#E5DFD3] hover:text-gold border-b border-[#333333] hover:border-gold pb-1 transition-colors duration-300 flex items-center gap-1.5"
                        >
                          <Github size={13} />
                          <span>GITHUB</span>
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      </div>
    </section>
  );
}
