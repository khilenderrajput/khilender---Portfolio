'use client';

import { useState } from 'react';
import { X, Download, FileText, Check, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_LIST, CERTIFICATIONS } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    // Trigger download or print window
    window.print();
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-surface border border-surfaceBorderStrong rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-surfaceBorder flex items-center justify-between bg-surfaceLight/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-cream">
                Khilender Rajput — Official Resume
              </h3>
              <p className="font-mono text-xs text-gold">
                Data Analyst | SQL, Python & Power BI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="font-mono text-xs uppercase tracking-wider font-bold text-accent-ink bg-gold hover:bg-gold/90 px-4 py-2 rounded-full transition-all inline-flex items-center gap-1.5 shadow-md shadow-gold/20"
            >
              {downloaded ? <Check size={14} /> : <Download size={14} />}
              <span>{downloaded ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-surfaceBorder text-cream-dim hover:text-gold hover:border-gold transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Viewer Document */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 font-body bg-bgDeep text-cream space-y-8">
          
          {/* Header Contact Row */}
          <div className="border-b border-surfaceBorder pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-cream mb-1">
                {PERSONAL_INFO.name}
              </h1>
              <p className="font-mono text-sm text-gold font-semibold tracking-wide">
                DATA ANALYST | Data Analytics, SQL, Python & Power BI
              </p>
            </div>

            <div className="font-mono text-xs text-cream-dim space-y-1">
              <p className="flex items-center gap-1.5 justify-center sm:justify-start">
                <MapPin size={12} className="text-gold" /> {PERSONAL_INFO.location}
              </p>
              <p className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Phone size={12} className="text-gold" /> {PERSONAL_INFO.phone}
              </p>
              <p className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Mail size={12} className="text-gold" /> {PERSONAL_INFO.email}
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold mb-2 border-b border-surfaceBorder pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="font-body text-sm text-cream-dim leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold mb-2 border-b border-surfaceBorder pb-1">
              CORE COMPETENCIES & TECHNICAL STACK
            </h2>
            <div className="font-body text-xs text-cream-dim space-y-2">
              <p>
                <b className="text-cream">Data Analytics & BI:</b> Data Analytics, Data Analysis, Data Cleaning, Exploratory Data Analysis (EDA), SQL, Data Visualization, Power BI, Dashboard Development, KPI Tracking & Reporting, Customer Segmentation, Churn Analysis, Financial & Revenue Analysis, Business Intelligence (BI), Stakeholder Reporting, Microsoft Excel, Statistical Analysis, Data-Driven Decision Making.
              </p>
              <p>
                <b className="text-cream">Programming & Tools:</b> Python (Pandas, NumPy), Java, C++, Data Structures & Algorithms (DSA), JavaScript (ES6), HTML, CSS, React.js, Machine Learning, Jupyter Notebook, VS Code, Git, GitHub.
              </p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold mb-3 border-b border-surfaceBorder pb-1">
              DATA ANALYTICS PROJECTS
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-display text-sm font-bold text-cream">
                      {p.title}
                    </h3>
                    <span className="font-mono text-[11px] text-gold font-medium">
                      {p.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <ul className="list-disc list-inside font-body text-xs text-cream-dim space-y-1">
                    {p.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold mb-2 border-b border-surfaceBorder pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2">
              {EDUCATION_LIST.map((edu) => (
                <div key={edu.institution} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-display text-sm font-bold text-cream">
                      {edu.institution}
                    </h3>
                    <p className="font-body text-xs text-cream-dim">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-gold font-bold">
                    {edu.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold mb-2 border-b border-surfaceBorder pb-1">
              CERTIFICATIONS
            </h2>
            <ul className="list-disc list-inside font-body text-xs text-cream-dim space-y-1">
              {CERTIFICATIONS.map((c) => (
                <li key={c.title}>
                  <b className="text-cream">{c.title}</b> — {c.issuer}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surfaceBorder bg-surfaceLight/50 flex justify-between items-center">
          <span className="font-mono text-xs text-cream-faint">
            Target Audience: Hiring Managers & Data Analytics Recruiters
          </span>
          <button
            onClick={handleDownload}
            className="font-mono text-xs uppercase tracking-wider font-bold text-accent-ink bg-gold hover:bg-gold/90 px-6 py-2.5 rounded-full shadow-md shadow-gold/20 flex items-center gap-2"
          >
            <Download size={14} />
            <span>Download PDF / Print</span>
          </button>
        </div>

      </div>
    </div>
  );
}
