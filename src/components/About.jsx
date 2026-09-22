import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code2,
  Cpu,
  Terminal,
  Sparkles,
  Edit2,
  CheckCircle2,
  Target,
  Compass,
  Bookmark,
  Plus,
  Trash2,
  Award
} from 'lucide-react';

export const About = () => {
  const { data, editMode, setEditModalConfig, addInterest, removeInterest } = usePortfolio();
  const { about } = data;

  const [newInterestInput, setNewInterestInput] = React.useState('');

  const handleAddInterestSubmit = (e) => {
    e.preventDefault();
    if (newInterestInput.trim()) {
      addInterest(newInterestInput.trim());
      setNewInterestInput('');
    }
  };

  return (
    <section id="about" className="py-20 relative bg-slate-900/40 light:bg-slate-50 border-y border-slate-800/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Background & Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              {about.title || 'About Me'}
            </h2>
          </div>

          <button
            onClick={() =>
              setEditModalConfig({
                isOpen: true,
                type: 'about',
                data: about
              })
            }
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit About Section</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Intro & Biography */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">
              {about.subtitle}
            </h3>

            {about.shortBio && (
              <p className="text-base sm:text-lg text-slate-200 light:text-slate-800 font-medium leading-relaxed bg-slate-800/50 light:bg-white p-4 rounded-2xl border border-slate-700/50 light:border-slate-200">
                {about.shortBio}
              </p>
            )}

            <div className="space-y-4 text-slate-300 light:text-slate-600 text-sm sm:text-base leading-relaxed">
              {Array.isArray(about.description) ? (
                about.description.map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-900/60 light:bg-white p-5 rounded-2xl border border-slate-800 light:border-slate-200 shadow-sm">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="bg-slate-900/60 light:bg-white p-5 rounded-2xl border border-slate-800 light:border-slate-200 shadow-sm">
                  {about.description}
                </p>
              )}
            </div>

            {/* Interests Tag Cloud */}
            <div className="pt-4 border-t border-slate-800/80 light:border-slate-200">
              <h4 className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold mb-3 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4" />
                <span>Areas of Interest</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.interests &&
                  about.interests.map((interest, iIdx) => (
                    <span
                      key={iIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 light:text-cyan-700 font-mono text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{interest}</span>
                      {editMode && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="text-slate-400 hover:text-rose-400 ml-1"
                          title="Remove interest"
                        >
                          &times;
                        </button>
                      )}
                    </span>
                  ))}
              </div>

              {editMode && (
                <form onSubmit={handleAddInterestSubmit} className="mt-3 flex gap-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="Add new interest (e.g. AI/ML)"
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg"
                  >
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Career Goal & Personal Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Career Goal Card */}
            {about.careerGoal && (
              <div className="p-6 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold font-mono text-slate-100 light:text-slate-900 text-base">
                    Career Objective & Goals
                  </h4>
                </div>

                {about.careerGoal.objective && (
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Objective</p>
                    <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                      {about.careerGoal.objective}
                    </p>
                  </div>
                )}

                {about.careerGoal.futureGoals && (
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Future Goals</p>
                    <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 mt-1 leading-relaxed">
                      {about.careerGoal.futureGoals}
                    </p>
                  </div>
                )}

                {about.careerGoal.areasOfInterest && (
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Core Domains</p>
                    <p className="text-xs font-mono font-semibold text-cyan-400 light:text-cyan-700 mt-0.5">
                      {about.careerGoal.areasOfInterest}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Personal Highlights Cards */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Personal Highlights</span>
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {about.highlights &&
                  about.highlights.map((item, hIdx) => (
                    <div
                      key={item.id || hIdx}
                      className="p-4 rounded-2xl bg-slate-900/80 light:bg-white border border-slate-800 light:border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[10px] font-mono uppercase text-slate-400">{item.label}</p>
                        <p className="text-sm font-bold font-mono text-slate-100 light:text-slate-900 mt-0.5">
                          {item.value}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
