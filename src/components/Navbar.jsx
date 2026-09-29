import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Menu, X, Terminal, Shield } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = usePortfolio();
  const { isAuthenticated } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 light:bg-white/85 backdrop-blur-md border-b border-slate-800/80 light:border-slate-200 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Terminal Brand */}
        <a href="#hero" className="flex items-center gap-2 group pl-10 sm:pl-11 lg:pl-0">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-mono text-lg font-bold text-slate-100 light:text-slate-900 tracking-tight">
            Surya<span className="text-cyan-400">.Thakur</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-mono font-medium text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 transition-colors rounded-lg hover:bg-slate-800/50 light:hover:bg-slate-100"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-600 rounded-lg hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
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
        <div className="lg:hidden bg-slate-900 light:bg-white border-b border-slate-800 light:border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 hover:bg-slate-800/50 light:hover:bg-slate-100 rounded-md font-mono"
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
