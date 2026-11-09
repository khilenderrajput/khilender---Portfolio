'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATES_LIST, CertificateItem } from '@/data/portfolioData';
import { ExternalLink } from 'lucide-react';

const FILTER_OPTIONS = [
  'Excel',
  'SQL',
  'Power BI',
  'Data Science',
  'Big Data',
  'Machine Learning',
  'LeetCode',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Excel');

  const filteredCertificates = CERTIFICATES_LIST.filter((cert) => {
    return cert.category === activeFilter || cert.filterCategories?.includes(activeFilter);
  });

  const handleOpenCertificate = (cert: CertificateItem) => {
    const targetUrl = cert.pdfUrl || cert.verificationUrl || cert.image;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="certificates" className="pt-24 sm:pt-28 pb-28 relative z-10 bg-transparent scroll-mt-20">
      {/* Anchor alias to support direct scroll links seamlessly */}
      <div id="certificate" className="absolute -top-24 pointer-events-none" />

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
            CREDENTIALS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#E5DFD3] tracking-tight leading-none">
            Certificates
          </h2>
        </motion.div>

        {/* Interactive Category Filter Buttons Row Matching Projects */}
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

        {/* Certificates Cards List or Clean Empty State */}
        {filteredCertificates.length === 0 ? (
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
              No certificates available in this category yet.
            </p>
            <span className="font-mono text-xs text-[#71717a]">
              New credentials will be added soon.
            </span>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {filteredCertificates.map((cert, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              const isReversed = index % 2 === 1;
              const viewUrl = cert.pdfUrl || cert.verificationUrl || cert.image;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#121214]/95 backdrop-blur-sm border border-[#222226] hover:border-[#33333a] rounded-3xl transition-all duration-300 relative overflow-hidden py-8 sm:py-12 md:py-14 lg:py-16 px-6 sm:px-8 lg:px-7"
                >
                  <div
                    className={
                      isReversed
                        ? 'flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-[60px]'
                        : 'flex flex-col lg:flex-row items-center gap-6 lg:gap-[60px]'
                    }
                  >
                    
                    {/* Visual Media Column (Matching Projects Dimension and Zoom Hover) */}
                    <div
                      className="w-full lg:w-[470px] lg:flex-none rounded-lg overflow-hidden border border-[#2a2a2e] relative cursor-pointer group bg-[#141416] shadow-xl flex items-center justify-center transition-all duration-300 hover:border-gold/30 scale-x-[1.03] scale-y-[1.06] origin-center"
                      onClick={() => handleOpenCertificate(cert)}
                    >
                      <div className="w-full aspect-[1024/724] relative overflow-hidden rounded-lg bg-[#0F0F11]">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        {/* Hover Overlay: Dark translucent overlay with VIEW CERTIFICATE ↗ */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-lg">
                          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.25em] text-[#E5DFD3] font-normal flex items-center gap-2 select-none">
                            <span>VIEW CERTIFICATE</span>
                            <span className="text-sm leading-none">↗</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Body Info Column (Matching Projects Typography and Spacing) */}
                    <div className="w-full lg:w-[530px] lg:flex-none flex flex-col justify-between">
                      
                      {/* Top Metadata */}
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#88888e] block font-semibold mb-3">
                        {formattedIndex} · {cert.category.toUpperCase()}
                      </span>

                      {/* Certificate Title */}
                      <h3
                        onClick={() => handleOpenCertificate(cert)}
                        className="font-display text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-[#F3EFE6] hover:text-gold transition-colors cursor-pointer leading-[1.15] tracking-tight mb-5"
                      >
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-[#9ca3af] text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-2xl mb-7">
                        {cert.description}
                      </p>

                      {/* Key Metrics / Highlights */}
                      <div className="flex flex-wrap items-start gap-8 sm:gap-12 mb-7">
                        {cert.keyMetrics.map((m) => (
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

                      {/* Technologies / Skills Tags & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex flex-wrap gap-2.5">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-xs text-[#a1a1aa] bg-[#18181b] border border-[#2e2e33] px-3.5 py-1.5 rounded-full hover:border-gold/40 hover:text-gold transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Quick Action Links */}
                        <div className="flex items-center gap-6">
                          <a
                            href={viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase tracking-widest font-semibold text-[#E5DFD3] hover:text-gold border-b border-[#333333] hover:border-gold pb-1 transition-colors duration-300 flex items-center gap-1.5"
                          >
                            <span>VIEW</span>
                            <ExternalLink size={12} />
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
