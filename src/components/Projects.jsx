import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Github,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Terminal,
  FolderGit2,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  Code2
} from 'lucide-react';

export const Projects = () => {
  const {
    data,
    editMode,
    setActiveProject,
    setEditModalConfig,
    deleteProject
  } = usePortfolio();

  const { projects, projectCategories } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative bg-slate-900/40 light:bg-slate-50 border-t border-slate-800/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Projects & Engineering Work
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Real-world software, tools, and technical solutions built during my B.Tech journey.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setEditModalConfig({
                  isOpen: true,
                  type: 'project',
                  data: null // New project
                })
              }
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 light:bg-white text-slate-300 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-100 border border-slate-700/60 light:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden"
            >
              {/* Project Card Thumbnail / Header Image */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-850 p-6">
                    <div className="text-center">
                      <FolderGit2 className="w-12 h-12 mx-auto text-cyan-500/40 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs text-slate-500">No Image Uploaded</span>
                    </div>
                  </div>
                )}

                {/* Category & Status Overlay Pills */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono text-[10px] font-bold">
                    {project.category}
                  </span>
                  {project.status && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Admin Quick Action Controls */}
                {editMode && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditModalConfig({
                          isOpen: true,
                          type: 'project',
                          data: project
                        });
                      }}
                      className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete project "${project.title}"?`)) {
                          deleteProject(project.id);
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      onClick={() => setActiveProject(project)}
                      className="text-xl font-bold font-mono text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies &&
                      project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-800 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-[11px] font-mono text-slate-300 light:text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-slate-800 light:bg-slate-100 text-[11px] font-mono text-slate-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Buttons & Details Trigger */}
                <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono font-semibold text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 flex items-center gap-1 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4 text-cyan-400" />
                        <span>Code</span>
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono font-semibold text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 flex items-center gap-1 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State Callout Card */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full p-12 rounded-3xl bg-slate-900/60 light:bg-white border-2 border-dashed border-slate-800 light:border-slate-300 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code2 className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900">
                  Ready to add your projects!
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
                  You haven't uploaded any projects under this category yet. Click below to add project title, descriptions, GitHub links, live demo links, and tech stack.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditModalConfig({
                    isOpen: true,
                    type: 'project',
                    data: null
                  })
                }
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Your First Project</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
