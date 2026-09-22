import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = usePortfolio();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-md text-xs font-mono font-bold ${
          toast.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-300'
            : 'bg-slate-900/95 border-emerald-500/50 text-emerald-400'
        }`}
      >
        {toast.type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-rose-400" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
