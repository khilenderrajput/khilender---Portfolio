'use client';

import { useState } from 'react';
import { X, Code, BarChart3, Database, ExternalLink, Check, Copy, TrendingUp, AlertCircle } from 'lucide-react';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'powerbi' | 'code'>('overview');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!project) return null;

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-surface border border-surfaceBorderStrong rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Modal Header */}
        <div className="p-6 border-b border-surfaceBorder flex items-start justify-between bg-surfaceLight/50">
          <div>
            <span className="eyebrow block mb-1">{project.category}</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
              {project.title}
            </h3>
            <p className="font-body text-sm text-cream-dim mt-1">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-surfaceBorder text-cream-dim hover:text-gold hover:border-gold transition-colors flex-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-surfaceBorder bg-bgDark/60 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`font-mono text-xs uppercase tracking-wider py-3 px-4 border-b-2 font-semibold transition-all flex items-center gap-2 ${activeTab === 'overview'
                ? 'border-gold text-gold bg-gold/10 rounded-t-lg'
                : 'border-transparent text-cream-dim hover:text-cream'
              }`}
          >
            <BarChart3 size={15} />
            <span>Overview & Metrics</span>
          </button>

          {project.powerBiPreview && (
            <button
              onClick={() => setActiveTab('powerbi')}
              className={`font-mono text-xs uppercase tracking-wider py-3 px-4 border-b-2 font-semibold transition-all flex items-center gap-2 ${activeTab === 'powerbi'
                  ? 'border-gold text-gold bg-gold/10 rounded-t-lg'
                  : 'border-transparent text-cream-dim hover:text-cream'
                }`}
            >
              <TrendingUp size={15} />
              <span>Simulated Power BI BI Dashboard</span>
            </button>
          )}

          {(project.sqlSnippet || project.pythonSnippet) && (
            <button
              onClick={() => setActiveTab('code')}
              className={`font-mono text-xs uppercase tracking-wider py-3 px-4 border-b-2 font-semibold transition-all flex items-center gap-2 ${activeTab === 'code'
                  ? 'border-gold text-gold bg-gold/10 rounded-t-lg'
                  : 'border-transparent text-cream-dim hover:text-cream'
                }`}
            >
              <Code size={15} />
              <span>SQL & Python Code</span>
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 font-body">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-lg font-bold text-cream mb-2">
                  Business Problem & Approach
                </h4>
                <p className="text-cream-dim leading-relaxed text-sm">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Impact Stats */}
              <div>
                <h4 className="font-display text-base font-bold text-cream mb-3">
                  Measurable Business Impact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.keyMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-4 rounded-xl bg-surfaceLight border border-surfaceBorder text-center"
                    >
                      <b className="stat-number text-2xl font-bold text-gold block mb-1">
                        {m.value}
                      </b>
                      <span className="font-mono text-xs text-cream-dim uppercase tracking-wider">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Workflow Highlights */}
              <div>
                <h4 className="font-display text-base font-bold text-cream mb-3">
                  End-to-End Analytical Workflow
                </h4>
                <ul className="space-y-2 text-sm text-cream-dim">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-none" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="font-display text-base font-bold text-cream mb-3">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POWER BI SIMULATION */}
          {activeTab === 'powerbi' && project.powerBiPreview && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-surfaceBorder pb-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-cream">
                    Interactive Power BI KPI Visualizer
                  </h4>
                  <p className="text-xs text-cream-dim">
                    Simulated operational metrics and trend visualizer for stakeholder decision-making.
                  </p>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Model
                </span>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.powerBiPreview.kpis.map((kpi) => (
                  <div
                    key={kpi.title}
                    className="p-4 rounded-xl bg-bgDark border border-gold/30 flex flex-col justify-between"
                  >
                    <span className="font-mono text-[11px] text-cream-faint uppercase truncate">
                      {kpi.title}
                    </span>
                    <div className="my-2">
                      <span className="stat-number text-2xl font-bold text-cream">
                        {kpi.value}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <TrendingUp size={12} />
                      {kpi.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Visualizer */}
              <div className="p-5 rounded-xl bg-bgDark border border-surfaceBorder">
                <h5 className="font-mono text-xs font-bold text-gold uppercase tracking-wider mb-4">
                  {project.powerBiPreview.chartTitle}
                </h5>

                {/* SVG Bar Chart Visualization */}
                <div className="space-y-3">
                  {project.powerBiPreview.chartData.map((d) => (
                    <div key={d.name} className="space-y-1">
                      <div className="flex justify-between font-mono text-xs text-cream-dim">
                        <span>{d.name}</span>
                        <span className="text-gold font-semibold">${d.val1}K</span>
                      </div>
                      <div className="h-3 w-full bg-surfaceLight rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (d.val1 / 300) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CODE EXPLORER */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              {project.sqlSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase text-gold font-bold flex items-center gap-1.5">
                      <Database size={14} /> SQL Query Architecture
                    </span>
                    <button
                      onClick={() => handleCopyCode(project.sqlSnippet!, 'sql')}
                      className="font-mono text-[11px] text-cream-dim hover:text-gold flex items-center gap-1 bg-surfaceLight border border-surfaceBorder px-3 py-1 rounded-md transition-colors"
                    >
                      {copiedType === 'sql' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedType === 'sql' ? 'Copied SQL!' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-bgDeep text-cream font-mono text-xs overflow-x-auto border border-surfaceBorder max-h-72 leading-relaxed">
                    <code>{project.sqlSnippet}</code>
                  </pre>
                </div>
              )}

              {project.pythonSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs uppercase text-gold font-bold flex items-center gap-1.5">
                      <Code size={14} /> Python Data Wrangling Pipeline
                    </span>
                    <button
                      onClick={() => handleCopyCode(project.pythonSnippet!, 'python')}
                      className="font-mono text-[11px] text-cream-dim hover:text-gold flex items-center gap-1 bg-surfaceLight border border-surfaceBorder px-3 py-1 rounded-md transition-colors"
                    >
                      {copiedType === 'python' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedType === 'python' ? 'Copied Python!' : 'Copy Python'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-bgDeep text-cream font-mono text-xs overflow-x-auto border border-surfaceBorder max-h-72 leading-relaxed">
                    <code>{project.pythonSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surfaceBorder bg-surfaceLight/40 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-accent-ink bg-gold hover:bg-gold/90 px-5 py-2.5 rounded-full font-bold transition-all inline-flex items-center gap-2 shadow-md shadow-gold/20"
          >
            <span>View Source Code on GitHub</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={onClose}
            className="font-mono text-xs uppercase text-cream-dim hover:text-cream px-4 py-2"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
