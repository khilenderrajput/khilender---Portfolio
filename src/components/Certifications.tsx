'use client';

import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '@/data/portfolioData';
import { ShieldCheck, Award, ExternalLink } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 border-b border-surfaceBorder">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <span className="eyebrow block mb-2">// INDUSTRY CREDENTIALS</span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-cream mb-4">
            Certifications & Training
          </h2>
          <p className="font-body text-cream-dim text-base">
            Verified technical certifications in Data Science, Big Data, Artificial Intelligence, and Web Development.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={cert.title}
              className="glow-card rounded-2xl p-6 bg-surface/80 border border-surfaceBorder flex flex-col justify-between group"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.badgeColor} flex items-center justify-center text-white shadow-md`}>
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 rounded-full">
                    Verified
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs text-gold/90 font-medium mb-4">
                  {cert.issuer}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] text-cream-dim bg-surfaceLight border border-surfaceBorder px-2.5 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-3 border-t border-surfaceBorder flex items-center justify-between font-mono text-[11px] text-cream-faint">
                <span>Certified Skill Badge</span>
                <Award size={14} className="text-gold" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
