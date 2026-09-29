import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Terminal,
  ArrowLeft,
  AlertCircle,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export const AdminLogin = () => {
  const { login } = useAuth();
  const { showToast } = usePortfolio();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(username.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      showToast('Admin authentication successful. Welcome back!');
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-grid-pattern">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Return to Portfolio Link */}
      <div className="w-full max-w-md mb-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </a>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden relative z-10">
        {/* Terminal Header */}
        <div className="terminal-header justify-between">
          <div className="flex items-center gap-2">
            <div className="terminal-dot bg-rose-500"></div>
            <div className="terminal-dot bg-amber-500"></div>
            <div className="terminal-dot bg-emerald-500"></div>
            <span className="ml-2 font-mono text-xs text-slate-400">
              admin_portal://auth_gateway
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
            Protected
          </span>
        </div>

        {/* Card Body */}
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold font-mono text-slate-100 tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Authorized portfolio administrator access only.
            </p>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Username or Email</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                disabled={isSubmitting}
                autoFocus
                required
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  disabled={isSubmitting}
                  required
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600 pr-11 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 p-1 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Log In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] font-mono text-slate-500">
              Protected by server-side JWT authentication & brute-force rate-limiting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
