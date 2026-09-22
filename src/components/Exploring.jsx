import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Compass, Plus, Trash2, Edit2, Sparkles, BookOpen } from 'lucide-react';

export const Exploring = () => {
  const { data, editMode, setEditModalConfig, deleteLearningItem } = usePortfolio();
  const { exploring } = data;

  return (
    <section className="py-16 relative bg-slate-900/60 light:bg-slate-50 border-t border-slate-800/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl relative overflow-hidden">
          {/* Subtle bg element */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-cyan-400">
            <Compass className="w-48 h-48" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                    Continuous Growth
                  </span>
                  <h3 className="text-2xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                    Currently Exploring & Learning
                  </h3>
                </div>
              </div>

              <button
                onClick={() =>
                  setEditModalConfig({
                    isOpen: true,
                    type: 'learning',
                    data: null
                  })
                }
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Learning Item</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 max-w-3xl leading-relaxed">
              As a Computer Science student, staying curious is paramount. Here are the technologies, subjects, and engineering domains I am actively learning right now:
            </p>

            {/* Learning Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {exploring &&
                exploring.map((item, idx) => {
                  const isObject = typeof item === 'object' && item !== null;
                  const name = isObject ? item.name : item;
                  const desc = isObject ? item.description : '';
                  const status = isObject ? item.status : 'In Progress';
                  const id = isObject ? item.id : idx;

                  return (
                    <div
                      key={id}
                      className="p-5 rounded-2xl bg-slate-800/80 light:bg-slate-100 border border-slate-700/80 light:border-slate-300 shadow-sm flex flex-col justify-between group hover:border-cyan-500/50 transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                            {status}
                          </span>

                          {editMode && isObject && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  setEditModalConfig({
                                    isOpen: true,
                                    type: 'learning',
                                    data: item
                                  })
                                }
                                className="p-1 text-cyan-400 hover:text-cyan-300"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteLearningItem(item.id)}
                                className="p-1 text-rose-400 hover:text-rose-300"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        <h4 className="font-mono text-sm font-bold text-slate-100 light:text-slate-900">
                          {name}
                        </h4>

                        {desc && (
                          <p className="text-xs text-slate-400 light:text-slate-600 mt-1 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
