import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, FileText, Download, CheckCircle2, Eye, Pencil } from 'lucide-react';

export const Resume = () => {
  const { data, editMode, setEditModalConfig } = usePortfolio();
  const resume = data.resume || {};

  const handleDownload = () => {
    if (resume.resumeUrl) {
      const link = document.createElement('a');
      link.href = resume.resumeUrl;
      link.download = resume.fileName || 'Surya_Thakur_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Resume file is being updated. Please check back shortly.');
    }
  };

  return (
    <section id="resume" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Professional Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Resume / CV
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Download or preview my latest academic & technical resume.
            </p>
          </div>

          {editMode && (
            <button
              onClick={() => setEditModalConfig({ isOpen: true, type: 'resume', data: resume })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Resume</span>
            </button>
          )}
        </div>

        {/* Resume Main Box */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900">
                  Surya Thakur - Resume
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  B.Tech Computer Science & Engineering (CSE Core)
                </p>
                {resume.lastUpdated && (
                  <div className="inline-flex items-center gap-1 mt-2 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>File: {resume.fileName || 'Surya_Thakur_Resume.pdf'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download & Edit Resume Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {editMode && (
                <button
                  onClick={() => setEditModalConfig({ isOpen: true, type: 'resume', data: resume })}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono font-bold text-sm rounded-xl border border-cyan-500/40 flex items-center gap-2 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Update Resume File</span>
                </button>
              )}

              <button
                onClick={handleDownload}
                className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-extrabold text-sm rounded-xl shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Embedded Resume Preview Area */}
          <div className="rounded-2xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-200 p-6 text-center space-y-4">
            <div className="terminal-header justify-between mb-4">
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> Resume Viewer Window
              </span>
              <span className="text-[10px] font-mono text-slate-500">PDF / Document Preview</span>
            </div>

            {resume.resumeUrl ? (
              <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
                {resume.resumeUrl.startsWith('data:application/pdf') || resume.resumeUrl.endsWith('.pdf') ? (
                  <iframe
                    src={resume.resumeUrl}
                    title="Resume PDF Preview"
                    className="w-full h-[500px] rounded-xl border border-slate-800"
                  />
                ) : (
                  <div className="p-8 text-center space-y-4">
                    <FileText className="w-16 h-16 mx-auto text-cyan-400 animate-pulse" />
                    <p className="font-mono text-sm text-slate-300 light:text-slate-700">
                      Document <span className="text-cyan-400">{resume.fileName}</span> is loaded & ready for download.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-xl shadow-lg inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download PDF Now
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 px-4 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-slate-200 light:text-slate-800">
                    Curriculum Vitae
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Official academic and technical resume for Surya Thakur.
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-mono text-xs font-bold rounded-xl hover:bg-cyan-500 hover:text-slate-950 transition-colors inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
