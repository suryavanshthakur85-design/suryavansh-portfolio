import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Terminal,
  Code,
  Cpu,
  Database,
  Layers,
  Wrench,
  Globe,
  Server,
  Shield,
  Box,
  Binary,
  FolderGit2,
  Plus,
  Pencil,
  Trash2,
  X
} from 'lucide-react';

export const Skills = () => {
  const {
    data,
    editMode,
    setEditModalConfig,
    removeSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory
  } = usePortfolio();
  const categories = data.skills?.categories || [];

  const renderIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'layers':
      case 'development':
        return <Layers className="w-5 h-5" />;
      case 'wrench':
      case 'tools':
        return <Wrench className="w-5 h-5" />;
      case 'cpu':
      case 'cs':
      case 'computerscience':
        return <Cpu className="w-5 h-5" />;
      case 'globe':
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'server':
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'shield':
      case 'security':
        return <Shield className="w-5 h-5" />;
      case 'binary':
        return <Binary className="w-5 h-5" />;
      case 'git':
      case 'foldergit2':
        return <FolderGit2 className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Technical Skills
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              * Categorized technical proficiencies & core computer science knowledge
            </p>
          </div>

          {editMode && (
            <button
              onClick={() => setEditModalConfig({ isOpen: true, type: 'skillCategory', data: null })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          )}
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all shadow-md flex flex-col justify-between group relative"
            >
              <div>
                {/* Category Card Header */}
                <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-800 light:border-slate-200 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-cyan-400">
                      {renderIcon(category.icon || 'Code')}
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-slate-100 light:text-slate-900 text-base flex items-center gap-1.5">
                        <span>{category.name}</span>
                      </h3>
                      {category.description && (
                        <p className="text-[11px] text-slate-400 light:text-slate-500 font-mono mt-0.5 line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {editMode && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditModalConfig({ isOpen: true, type: 'skillCategory', data: category })}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs transition-colors"
                        title="Edit Category"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${category.name}" and all its skills?`)) {
                            removeSkillCategory(category.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Skill Pills Container */}
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  {category.skills &&
                    category.skills.map((skill, sIdx) => {
                      const isObj = typeof skill === 'object' && skill !== null;
                      const skillName = isObj ? skill.name : skill;
                      const skillIcon = isObj ? skill.icon : '';

                      return (
                        <div
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-slate-200 light:text-slate-800 text-xs font-mono font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                        >
                          {skillIcon && <span>{skillIcon}</span>}
                          <span>{skillName}</span>

                          {editMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSkillFromCategory(category.id, sIdx);
                              }}
                              className="ml-1 text-slate-400 hover:text-rose-400 transition-colors"
                              title={`Remove ${skillName}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}

                  {editMode && (
                    <button
                      onClick={() => {
                        const skillName = window.prompt(`Enter skill name to add to "${category.name}":`);
                        if (skillName && skillName.trim()) {
                          addSkillToCategory(category.id, skillName.trim());
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-dashed border-cyan-500/40 text-xs font-mono font-semibold transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  )}

                  {(!category.skills || category.skills.length === 0) && !editMode && (
                    <p className="text-xs text-slate-500 italic py-2">No skills in this category yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
