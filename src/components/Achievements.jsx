import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Trophy, ExternalLink, Calendar, Plus, Pencil, Trash2 } from 'lucide-react';

export const Achievements = () => {
  const { data, editMode, setEditModalConfig, deleteAchievement } = usePortfolio();
  const achievements = data.achievements || [];

  return (
    <section id="achievements" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Honors & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Achievements & Competitions
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Hackathons, coding contests, academic awards, and achievements.
            </p>
          </div>

          {editMode && (
            <button
              onClick={() => setEditModalConfig({ isOpen: true, type: 'achievement', data: null })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Achievement</span>
            </button>
          )}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wide">
                        {item.organization || 'Honor / Award'}
                      </span>
                      <h3 className="font-bold font-mono text-slate-100 light:text-slate-900 text-xl leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditModalConfig({ isOpen: true, type: 'achievement', data: item })}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs transition-colors"
                        title="Edit Achievement"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete achievement "${item.title}"?`)) {
                            deleteAchievement(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs transition-colors"
                        title="Delete Achievement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {item.date && (
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.date}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {item.image && (
                  <div className="mt-4 rounded-2xl overflow-hidden border border-slate-800 light:border-slate-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover object-center"
                    />
                  </div>
                )}
              </div>

              {item.link && (
                <div className="pt-4 mt-4 border-t border-slate-800/80 light:border-slate-200">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>View Certificate / Event Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}

          {achievements.length === 0 && (
            <div className="col-span-full p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-slate-400 text-xs font-mono">
              Achievements and contest milestones will be showcased here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
