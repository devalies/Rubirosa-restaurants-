import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  return (
    <aside
      aria-label="Notification alert"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900 text-white rounded-xl shadow-2xl p-4 border border-stone-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200 font-sans"
    >
      <div className="shrink-0 mt-0.5">
        {toast.type === 'info' ? (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Info className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex-1 text-xs">
        <div className="font-medium text-stone-100">{toast.message}</div>
      </div>

      <button
        onClick={dismissToast}
        className="text-stone-400 hover:text-stone-200 p-1 cursor-pointer shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
