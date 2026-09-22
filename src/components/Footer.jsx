import React from 'react';
import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono text-base font-bold text-slate-100">
              Surya<span className="text-cyan-400">.Thakur</span>
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#resume" className="hover:text-cyan-400 transition-colors">Resume</a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Surya Thakur. Built with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            <span>B.Tech Computer Science & Engineering</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
