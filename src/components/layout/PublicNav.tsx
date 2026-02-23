import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface PublicNavProps {
  minimal?: boolean;
  cta?: { label: string; to: string };
}

export function PublicNav({ minimal = false, cta }: PublicNavProps) {
  const ctaLabel = cta?.label ?? 'Start Building';
  const ctaTo = cta?.to ?? '/onboarding';
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/aifredo-logo.svg" alt="Aifredo" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-lg tracking-tight text-white">Aifredo</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {!minimal && (
            <>
              <Link to="/dashboard" className="hidden sm:inline text-sm text-slate-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/token" className="hidden sm:inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                $FREDO
              </Link>
              <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                Login
              </Link>
            </>
          )}

          <button
            onClick={toggle}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-slate-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
          </button>

          {!minimal && (
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
