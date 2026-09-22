import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sun, Moon, Edit3, CheckCircle, Menu, X, Download, Upload, RotateCcw, Terminal, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    editMode,
    toggleEditMode,
    setIsAdminDashboardOpen,
    exportDataJSON,
    importDataJSON,
    resetToDefault
  } = usePortfolio();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        importDataJSON(e.target.files[0]);
      }
    };
    fileInput.click();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800 light:border-slate-200 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-mono text-lg font-bold text-slate-100 light:text-slate-900 tracking-tight">
            Suryavansh<span className="text-cyan-400 font-extrabold">.Thakur</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 transition-colors rounded-md"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Controls & Edit Mode */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Admin Dashboard Button */}
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all"
            title="Open Edit Portfolio Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Edit Portfolio</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-600 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Edit Mode Toggle Switch */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              editMode
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-slate-800/80 light:bg-slate-100 border-slate-700 light:border-slate-300 text-slate-300 light:text-slate-700 hover:border-cyan-500/50'
            }`}
            title="Toggle Inline Customizer Mode"
          >
            {editMode ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Editing Active</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inline Edit</span>
              </>
            )}
          </button>

          {/* Settings Menu Dropdown (Export / Import / Reset) */}
          <div className="relative">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
              title="Data Options (Export/Import)"
            >
              <span className="font-mono text-xs font-bold border border-slate-700 light:border-slate-300 px-1.5 py-0.5 rounded">
                JSON
              </span>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-xl shadow-2xl py-2 z-50">
                <button
                  onClick={() => {
                    exportDataJSON();
                    setSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Portfolio Data</span>
                </button>
                <button
                  onClick={() => {
                    handleImportClick();
                    setSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100 flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Import JSON Data</span>
                </button>
                <div className="my-1 border-t border-slate-800 light:border-slate-200"></div>
                <button
                  onClick={() => {
                    resetToDefault();
                    setSettingsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 light:hover:bg-slate-100 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="px-2.5 py-1.5 bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold"
          >
            Edit
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 light:text-slate-600 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 light:text-slate-700 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 light:bg-white border-b border-slate-800 light:border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 light:border-slate-200">
            <button
              onClick={() => {
                setIsAdminDashboardOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Edit Portfolio Dashboard</span>
            </button>
            <button
              onClick={exportDataJSON}
              className="text-xs text-cyan-400 flex items-center gap-1 font-mono"
            >
              <Download className="w-3.5 h-3.5" /> Export Data
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:bg-slate-800/50 light:hover:bg-slate-100 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
