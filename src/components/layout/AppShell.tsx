import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Wallet, Plus, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { useTheme } from '../../hooks/useTheme';

function BalanceBadge() {
  const [balanceCents, setBalanceCents] = useState<number | null>(null);
  const isLoggedIn = !!localStorage.getItem('af-token');

  useEffect(() => {
    if (!isLoggedIn) return;
    api.get('/api/payments/balance')
      .then((res: any) => setBalanceCents(res.balance_cents ?? 0))
      .catch(() => {});
  }, [isLoggedIn]);

  if (!isLoggedIn || balanceCents === null) return null;

  const dollars = (balanceCents / 100).toFixed(2);
  const isLow = balanceCents < 500;

  return (
    <Link
      to="/topup"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isLow
          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
      }`}
      title="Account balance — click to top up"
    >
      <Wallet className="w-3.5 h-3.5" />
      <span>${dollars}</span>
      <Plus className="w-3 h-3 opacity-50" />
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-slate-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
    </button>
  );
}

const INTERN_BOT_ID = '743fba77-8927-4807-9dfc-183f314f103f';

function InternWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/embed.js';
    script.setAttribute('data-bot-id', INTERN_BOT_ID);
    script.setAttribute('data-color', '#4f46e5');
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelectorAll('.af-widget-btn, .af-widget-frame').forEach(el => el.remove());
    };
  }, []);

  return null;
}

export function AppShell() {
  return (
    <div className="flex h-full bg-[#0A0A0F]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="hidden lg:flex items-center justify-between gap-3 px-6 py-3 border-b border-white/5 bg-[#0A0A0F] shrink-0">
          <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            Home
          </Link>
          <div className="flex items-center gap-3">
            <BalanceBadge />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <InternWidget />
    </div>
  );
}
