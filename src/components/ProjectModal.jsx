import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Github,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  FileText,
  Video,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Compass,
  Cpu
} from 'lucide-react';

export const ProjectModal = () => {
  const { activeProject, setActiveProject } = usePortfolio();

  if (!activeProject) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="terminal-header justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="terminal-dot bg-rose-500"></div>
            <div className="terminal-dot bg-amber-500"></div>
            <div className="terminal-dot bg-emerald-500"></div>
            <span className="ml-2 font-mono text-xs text-slate-400">
              project_details://{activeProject.title?.toLowerCase().replace(/[^a-z0-9]/g, '_')}
            </span>
          </div>
          <button
            onClick={() => setActiveProject(null)}
            className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Project Header Title & Category */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
                {activeProject.category || 'Web Development'}
              </span>
              {activeProject.status && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {activeProject.status}
                </span>
              )}
              {activeProject.date && (
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeProject.date}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight font-mono">
              {activeProject.title}
            </h2>
            <p className="mt-2 text-base text-slate-300 light:text-slate-600 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-100 light:text-slate-900 font-mono text-xs font-bold border border-slate-700 light:border-slate-300 flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {activeProject.demo && (
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}

              {activeProject.video && (
                <a
                  href={activeProject.video}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>Watch Demo Video</span>
                </a>
              )}

              {activeProject.docUrl && (
                <a
                  href={activeProject.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Documentation</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Image Banner / Gallery */}
          {activeProject.image && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 light:border-slate-200 bg-slate-950">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full max-h-96 object-cover object-center"
              />
            </div>
          )}

          {/* Technologies Used Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technologies & Libraries</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies &&
                activeProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 font-mono text-xs text-cyan-400 light:text-cyan-700 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>

          {/* Problem Statement & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProject.problemStatement && (
              <div className="p-5 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/60 light:border-slate-200">
                <h4 className="font-mono text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Problem Statement
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {activeProject.problemStatement}
                </p>
              </div>
            )}

            {activeProject.solution && (
              <div className="p-5 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/60 light:border-slate-200">
                <h4 className="font-mono text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Proposed Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {activeProject.solution}
                </p>
              </div>
            )}
          </div>

          {/* Key Features List */}
          {activeProject.features && activeProject.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Key Features</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeProject.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="p-3 rounded-xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 text-xs text-slate-300 light:text-slate-700 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture / Workflow */}
          {activeProject.architecture && (
            <div className="p-5 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/60 light:border-slate-200 space-y-2">
              <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-1.5 font-bold">
                <Cpu className="w-4 h-4" />
                <span>System Architecture & Workflow</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 font-mono whitespace-pre-line leading-relaxed">
                {activeProject.architecture}
              </p>
            </div>
          )}

          {/* Challenges & Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {activeProject.challenges && (
              <div className="p-5 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/60 light:border-slate-200">
                <h4 className="font-mono text-sm font-bold text-rose-400 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Technical Challenges Faced
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {activeProject.challenges}
                </p>
              </div>
            )}

            {activeProject.whatILearned && (
              <div className="p-5 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/60 light:border-slate-200">
                <h4 className="font-mono text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Key Takeaways & Learnings
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {activeProject.whatILearned}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
