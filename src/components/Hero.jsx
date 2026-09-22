import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Camera,
  Edit2,
  Terminal
} from 'lucide-react';

export const Hero = () => {
  const { data, editMode, setEditModalConfig, updateHero } = usePortfolio();
  const { hero } = data;
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateHero({ avatarUrl: uploadEvent.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadResumeClick = () => {
    if (data.resume.resumeUrl) {
      const link = document.createElement('a');
      link.href = data.resume.resumeUrl;
      link.download = data.resume.fileName || 'Suryavansh_Thakur_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const resumeSection = document.getElementById('resume');
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Radial glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Developer Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 light:bg-slate-100 border border-cyan-500/30 text-cyan-400 light:text-cyan-600 text-xs font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <Terminal className="w-3.5 h-3.5" />
              <span>B.Tech CSE Core Student</span>
              {hero.availability && (
                <span className="hidden sm:inline-block text-slate-400 border-l border-slate-700 light:border-slate-300 pl-2 ml-1">
                  {hero.availability}
                </span>
              )}
            </div>

            {/* Name Heading */}
            <div className="relative group">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 leading-tight">
                {hero.name || 'Suryavansh Thakur'}
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {hero.tagline || 'B.Tech CSE | Computer Science & Engineering'}
              </p>

              {editMode && (
                <button
                  onClick={() =>
                    setEditModalConfig({
                      isOpen: true,
                      type: 'hero',
                      data: hero
                    })
                  }
                  className="absolute -top-3 right-0 p-1.5 bg-cyan-500 text-slate-950 rounded-full shadow-lg hover:scale-110 transition-transform"
                  title="Edit Hero Title & Intro"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Main Short Introduction */}
            <p className="text-base sm:text-lg text-slate-300 light:text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "{hero.bio}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleDownloadResumeClick}
                className="px-6 py-3 rounded-xl bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-100 light:text-slate-800 font-semibold text-sm border border-slate-700 light:border-slate-300 flex items-center gap-2 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 font-semibold text-sm border border-slate-700 light:border-slate-300 transition-all"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="pt-6 border-t border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-5">
              <span className="text-xs font-mono text-slate-400 light:text-slate-500 uppercase tracking-wider">
                Connect:
              </span>

              {hero.social.github && (
                <a
                  href={hero.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:border-cyan-500/40 border border-slate-700/60 light:border-slate-300 transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {hero.social.linkedin && (
                <a
                  href={hero.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:border-cyan-500/40 border border-slate-700/60 light:border-slate-300 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {hero.social.email && (
                <a
                  href={`mailto:${hero.social.email}`}
                  className="p-2.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:border-cyan-500/40 border border-slate-700/60 light:border-slate-300 transition-all flex items-center gap-2 text-xs font-mono"
                  title="Email Direct"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">{hero.social.email}</span>
                </a>
              )}

              {hero.social.phone && (
                <a
                  href={`tel:${hero.social.phone}`}
                  className="p-2.5 rounded-lg bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:border-cyan-500/40 border border-slate-700/60 light:border-slate-300 transition-all flex items-center gap-2 text-xs font-mono"
                  title="Phone Number"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">{hero.social.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>

              <div className="relative rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 p-4 shadow-2xl overflow-hidden">
                <div className="terminal-header mb-4">
                  <div className="terminal-dot bg-rose-500"></div>
                  <div className="terminal-dot bg-amber-500"></div>
                  <div className="terminal-dot bg-emerald-500"></div>
                  <span className="ml-2 font-mono text-xs text-slate-400">suryavansh_thakur.jpg</span>
                </div>

                <div className="relative aspect-square rounded-2xl bg-slate-800 light:bg-slate-100 overflow-hidden group flex items-center justify-center border border-slate-700 light:border-slate-200">
                  {hero.avatarUrl ? (
                    <img
                      src={hero.avatarUrl}
                      alt="Suryavansh Thakur"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-3xl font-extrabold mb-3">
                        ST
                      </div>
                      <p className="font-mono text-sm text-slate-300 light:text-slate-700 font-semibold">
                        Suryavansh Thakur
                      </p>
                      <p className="text-xs text-slate-400 mt-1">B.Tech CSE Core Student</p>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`absolute bottom-3 right-3 p-3 bg-slate-900/90 text-cyan-400 rounded-xl border border-cyan-500/50 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-mono hover:bg-cyan-500 hover:text-slate-950 transition-all ${
                      editMode ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                    }`}
                    title="Upload or Change Profile Photo"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{hero.avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Major</p>
                    <p className="text-xs font-bold text-slate-200 light:text-slate-800 font-mono mt-0.5">
                      CSE Core
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Focus</p>
                    <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">
                      DSA & Projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
