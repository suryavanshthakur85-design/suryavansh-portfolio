import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, GraduationCap, Calendar, MapPin, Award, BookOpen, Plus, Edit2, Trash2, Building } from 'lucide-react';

export const Education = () => {
  const { data, editMode, setEditModalConfig, deleteEducation } = usePortfolio();
  const { education } = data;

  return (
    <section id="education" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Education Timeline
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              B.Tech Computer Science & Engineering degree & academic timeline.
            </p>
          </div>

          <button
            onClick={() =>
              setEditModalConfig({
                isOpen: true,
                type: 'education',
                data: null
              })
            }
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800 light:border-slate-300 space-y-12 max-w-4xl">
          {education.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              {/* Timeline Marker Icon */}
              <div className="absolute -left-[31px] md:-left-[39px] top-0 w-10 h-10 rounded-xl bg-slate-900 light:bg-white border-2 border-cyan-500 text-cyan-400 flex items-center justify-center shadow-lg group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>

              {/* Education Card Content */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-md hover:border-cyan-500/40 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="space-y-1">
                    {/* Branch / Specialization Pill */}
                    {item.branch && (
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold inline-block mb-1">
                        {item.branch}
                      </span>
                    )}

                    {/* Degree */}
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 light:text-slate-900">
                      {item.degree}
                    </h3>

                    {/* Institution & Location */}
                    <div className="flex flex-wrap items-center gap-3 text-base text-slate-300 light:text-slate-700 font-semibold">
                      {item.institution && (
                        <span className="flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-cyan-400" />
                          {item.institution}
                        </span>
                      )}
                      {item.location && (
                        <span className="flex items-center gap-1 text-xs font-mono text-slate-400 font-normal">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Dates */}
                  <div className="flex flex-col items-end gap-2">
                    {(item.startYear || item.endYear || item.expectedGraduation) && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/60 light:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-700/50 light:border-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>
                          {item.startYear ? `${item.startYear} - ` : ''}
                          {item.endYear || item.expectedGraduation || 'Present'}
                        </span>
                      </div>
                    )}

                    {editMode && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() =>
                            setEditModalConfig({
                              isOpen: true,
                              type: 'education',
                              data: item
                            })
                          }
                          className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete education entry?')) {
                              deleteEducation(item.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* CGPA / Percentage Badge (Only rendered if present!) */}
                {item.cgpa && item.cgpa.trim() !== '' && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>CGPA / Grade: {item.cgpa}</span>
                  </div>
                )}

                {/* Description (Only rendered if present!) */}
                {item.description && item.description.trim() !== '' && (
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Relevant Coursework (Only rendered if non-empty!) */}
                {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-800/80 light:border-slate-200">
                    <p className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5 font-bold">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Relevant Coursework</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.relevantCoursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 font-mono text-xs text-slate-300 light:text-slate-700"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements (Only rendered if present!) */}
                {item.achievements && item.achievements.trim() !== '' && (
                  <p className="mt-4 text-xs text-slate-400 light:text-slate-500 italic border-l-2 border-cyan-500/40 pl-3 py-0.5">
                    {item.achievements}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
