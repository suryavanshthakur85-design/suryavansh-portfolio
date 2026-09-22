import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Award, ExternalLink, Calendar, Plus, Edit2, Trash2, ShieldCheck, FileCheck } from 'lucide-react';

export const Certifications = () => {
  const { data, editMode, setEditModalConfig, deleteCertification } = usePortfolio();
  const { certifications } = data;

  return (
    <section id="certifications" className="py-20 relative bg-slate-900/40 light:bg-slate-50 border-t border-slate-800/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Certifications & Courses
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Technical certifications, skill badges, and completed coursework.
            </p>
          </div>

          <button
            onClick={() =>
              setEditModalConfig({
                isOpen: true,
                type: 'certification',
                data: null
              })
            }
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/50 transition-all shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  {editMode && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setEditModalConfig({
                            isOpen: true,
                            type: 'certification',
                            data: cert
                          })
                        }
                        className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete certification "${cert.title}"?`)) {
                            deleteCertification(cert.id);
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-bold font-mono text-slate-100 light:text-slate-900 text-lg leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm font-semibold text-cyan-400 light:text-cyan-600 mt-1">
                  {cert.issuer}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-3">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Issued: {cert.date}</span>
                </div>

                {cert.credentialId && (
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>

              {/* Certificate Image or Link Button */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                {cert.certificateFile ? (
                  <a
                    href={cert.certificateFile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-bold text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>View Certificate</span>
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-500 italic">No image uploaded</span>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-500/40 border border-slate-700/60 light:border-slate-300 transition-colors"
                    title="Verify Credential URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {certifications.length === 0 && (
            <div className="col-span-full p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-slate-400 text-xs font-mono">
              No certifications added yet. Click "Add Certification" to display your certificates!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
