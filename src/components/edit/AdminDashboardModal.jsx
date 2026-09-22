import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Compass,
  FileText,
  Mail,
  Share2,
  LayoutDashboard,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardModal = () => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    setEditModalConfig,
    data,
    toggleEditMode,
    editMode,
    exportDataJSON
  } = usePortfolio();

  if (!isAdminDashboardOpen) return null;

  const dashboardItems = [
    {
      id: 'hero',
      title: 'Update Hero & Profile',
      desc: 'Name, Tagline, Introduction, Location, and Availability',
      icon: User,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'hero', data: data.hero });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'about',
      title: 'Edit About Me & Goals',
      desc: 'Short bio, biography, interests, career objective, and highlights',
      icon: User,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'about', data: data.about });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'education',
      title: 'Manage Education',
      desc: 'Degree, Branch, Institution, Graduation, CGPA, and Coursework',
      icon: GraduationCap,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'education', data: null });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'projects',
      title: 'Manage Projects',
      desc: 'Upload new projects, GitHub links, live demos, and specifications',
      icon: FolderGit2,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'project', data: null });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'certifications',
      title: 'Manage Certifications',
      desc: 'Add certificates, issuers, credential IDs, and file uploads',
      icon: Award,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'certification', data: null });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'achievements',
      title: 'Manage Achievements',
      desc: 'Hackathons, coding contests, academic awards, and certificates',
      icon: Trophy,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'achievement', data: null });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'learning',
      title: 'Currently Exploring / Learning',
      desc: 'Add or update technologies and subjects currently being learned',
      icon: Compass,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
      action: () => {
        setEditModalConfig({ isOpen: true, type: 'learning', data: null });
        setIsAdminDashboardOpen(false);
      }
    },
    {
      id: 'resume',
      title: 'Update Resume / CV',
      desc: 'Upload or replace your official PDF resume file',
      icon: FileText,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      action: () => {
        const resumeSection = document.getElementById('resume');
        if (resumeSection) resumeSection.scrollIntoView({ behavior: 'smooth' });
        setIsAdminDashboardOpen(false);
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Dashboard Header */}
        <div className="terminal-header justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300">
              admin_dashboard://suryavansh_thakur_portfolio
            </span>
          </div>
          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 light:border-slate-200">
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-slate-100 light:text-slate-900">
                Portfolio Content Dashboard
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select a module to update your projects, skills, education, certifications, and bio.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleEditMode}
                className={`px-3 py-1.5 text-xs font-semibold font-mono rounded-xl border ${
                  editMode
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {editMode ? 'Inline Editing ON' : 'Enable Inline Editing'}
              </button>
            </div>
          </div>

          {/* Grid of Dashboard Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboardItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="p-5 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/60 light:border-slate-200 hover:border-cyan-500/50 transition-all text-left flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-xl border shrink-0 ${item.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold font-mono text-slate-100 light:text-slate-900 text-sm group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 light:text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 light:border-slate-200 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>All edits are auto-saved to browser storage.</span>
            <button
              onClick={exportDataJSON}
              className="text-cyan-400 hover:underline"
            >
              Export JSON Backup &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
