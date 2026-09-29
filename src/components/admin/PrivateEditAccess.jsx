import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Pencil,
  Unlock,
  Lock,
  X,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Shield,
  LogOut
} from 'lucide-react';

export const PrivateEditAccess = () => {
  const { login, logout } = useAuth();
  const { editMode, setEditMode, showToast, setEditModalConfig } = usePortfolio();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const passwordInputRef = useRef(null);

  // Auto-focus password input when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setPassword('');
      setErrorMessage('');
      setShowPassword(false);
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 100);
    }
  }, [isDialogOpen]);

  // Handle escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDialogOpen) {
        handleCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Please enter the administrator password.');
      return;
    }

    setIsAuthenticating(true);
    setErrorMessage('');

    try {
      const result = await login(password);
      if (result.success) {
        if (typeof setEditMode === 'function') {
          setEditMode(true);
        }
        setIsDialogOpen(false);
        setPassword('');
        showToast('Edit Mode Activated. You can now edit portfolio sections.');
      } else {
        if (result.isNetworkError) {
          setErrorMessage('Backend server is unavailable. Please make sure the server is running on port 5000.');
        } else if (result.status === 401 || result.error?.toLowerCase().includes('password')) {
          setErrorMessage('Incorrect password. Please try again.');
        } else {
          setErrorMessage(result.error || 'Incorrect password. Please try again.');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setErrorMessage('Authentication request failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPassword('');
    setErrorMessage('');
  };

  const handleExitEditMode = () => {
    if (typeof setEditMode === 'function') {
      setEditMode(false);
    }
    logout();
    if (setEditModalConfig) {
      setEditModalConfig({ isOpen: false, type: null, data: null });
    }
    showToast('Exited Edit Mode. Portfolio is now in View-Only mode.');
  };

  return (
    <>
      {/* Upper-Left Fixed Element */}
      {!editMode ? (
        // Clean, subtle Edit Icon in Upper-Left Corner
        <div className="fixed top-3.5 left-3 sm:top-4 sm:left-4 z-50">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md group"
            title="Private Admin Access"
            aria-label="Private Admin Access"
          >
            <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ) : (
        // Active Edit Mode Banner with Exit Option
        <div className="fixed top-3.5 left-3 sm:top-4 sm:left-4 z-50 flex items-center gap-2.5 bg-slate-900/95 light:bg-white/95 border border-cyan-500/50 rounded-xl px-3 py-1.5 shadow-xl shadow-cyan-500/10 backdrop-blur-md text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">🔓 Edit Mode</span>
            <span className="sm:hidden">Edit</span>
          </div>

          <span className="text-slate-700 light:text-slate-300">|</span>

          <button
            onClick={handleExitEditMode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-rose-100 border border-rose-500/40 font-semibold transition-colors text-[11px]"
            title="Exit Edit Mode and return to View Only"
          >
            <LogOut className="w-3 h-3" />
            <span>Exit Edit Mode</span>
          </button>
        </div>
      )}

      {/* Password Authentication Modal Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}
        >
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative font-sans">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-mono">
                    Admin Access
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Enter Password
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleUnlock} className="p-6 space-y-4">
              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordInputRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter password"
                    disabled={isAuthenticating}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isAuthenticating}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlock Edit Mode</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
