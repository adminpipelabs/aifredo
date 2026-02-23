import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  LogOut,
  ChevronDown,
  Bot,
  Wallet,
  Coins,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useBots } from '../../hooks/useBots';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/agent-school', label: 'Agent School', icon: GraduationCap },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/topup', label: 'Balance', icon: Wallet },
];

export function Sidebar() {
  const { auth, logout } = useAuth();
  const { bots, selectedBot, selectBot } = useBots();
  const [showBotMenu, setShowBotMenu] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0D0D14] border-r border-white/5 h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/5">
        <img src="/aifredo-logo.svg" alt="Aifredo" className="w-8 h-8 rounded-lg" />
        <span className="text-white font-bold text-lg tracking-tight">Aifredo</span>
      </div>

      {/* Bot switcher */}
      {bots.length > 0 && (
        <div className="px-3 py-3 border-b border-white/5 relative">
          <button
            onClick={() => setShowBotMenu(!showBotMenu)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              selectedBot?.status === 'online' ? 'bg-emerald-500/20' :
              selectedBot?.status === 'draft' ? 'bg-amber-500/20' : 'bg-indigo-600/20'
            }`}>
              <Bot className={`w-4 h-4 ${
                selectedBot?.status === 'online' ? 'text-emerald-400' :
                selectedBot?.status === 'draft' ? 'text-amber-400' : 'text-indigo-400'
              }`} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm text-white font-medium truncate">
                {selectedBot?.name || 'Select bot'}
              </p>
              <p className={`text-[10px] capitalize ${
                selectedBot?.status === 'draft' ? 'text-amber-400' :
                selectedBot?.status === 'online' ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                {selectedBot?.status === 'draft' ? 'Draft' : selectedBot?.status || 'none'} · {selectedBot?.model || ''}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showBotMenu ? 'rotate-180' : ''}`} />
          </button>

          {showBotMenu && (
            <div className="absolute left-3 right-3 top-full mt-1 bg-[#14141F] border border-white/10 rounded-xl shadow-xl z-20 py-1 max-h-60 overflow-y-auto">
              {bots.map((bot) => (
                <button
                  key={bot.id}
                  onClick={() => { selectBot(bot.id); setShowBotMenu(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white/5 transition-colors ${
                    selectedBot?.id === bot.id ? 'bg-indigo-600/10' : ''
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    bot.status === 'online' ? 'bg-emerald-400' :
                    bot.status === 'draft' ? 'bg-amber-400' :
                    'bg-slate-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{bot.name}</p>
                    <p className={`text-[10px] capitalize ${
                      bot.status === 'draft' ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {bot.status === 'draft' ? 'Draft' : bot.channel || 'no channel'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}

        <a
          href="/token"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-indigo-400 hover:bg-white/5 transition-colors"
        >
          <Coins className="w-5 h-5" />
          $FREDO
        </a>

      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-sm text-indigo-400 font-medium">
            {auth.user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{auth.user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{auth.user?.email}</p>
          </div>
          <button onClick={logout} className="p-1.5 text-slate-500 hover:text-white transition-colors" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
