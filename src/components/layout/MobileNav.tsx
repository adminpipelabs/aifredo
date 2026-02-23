import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bot, ChevronUp, Wallet, Plus, GraduationCap } from 'lucide-react';
import { useBots } from '../../hooks/useBots';
import { useState } from 'react';

export function MobileNav() {
  const { bots, selectedBot, selectBot } = useBots();
  const [showBotMenu, setShowBotMenu] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/agent-school', label: 'School', icon: GraduationCap },
    { to: '/onboarding', label: 'New Bot', icon: Plus },
    { to: '/topup', label: 'Balance', icon: Wallet },
  ];

  return (
    <div className="lg:hidden">
      {/* Bot picker popup */}
      {showBotMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowBotMenu(false)}>
          <div className="absolute bottom-20 left-4 right-4 bg-[#14141F] border border-white/10 rounded-2xl shadow-lg p-2 max-h-60 overflow-y-auto">
            <p className="px-3 py-1 text-xs text-slate-500 font-medium">Switch Bot</p>
            {bots.map((bot) => (
              <button
                key={bot.id}
                onClick={(e) => { e.stopPropagation(); selectBot(bot.id); setShowBotMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedBot?.id === bot.id ? 'bg-indigo-600/10' : 'hover:bg-white/5'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  bot.status === 'online' ? 'bg-emerald-400' :
                  bot.status === 'draft' ? 'bg-amber-400' :
                  'bg-slate-600'
                }`} />
                <span className="text-sm text-white truncate">{bot.name}</span>
                {bot.status === 'draft' && (
                  <span className="text-[10px] text-amber-400 ml-auto">Draft</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D14]/95 backdrop-blur-xl border-t border-white/5 px-2 pb-[env(safe-area-inset-bottom)] z-30">
        {/* Bot name bar */}
        {bots.length > 0 && (
          <button
            onClick={() => setShowBotMenu(!showBotMenu)}
            className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-500 border-b border-white/5"
          >
            <Bot className={`w-3 h-3 ${
              selectedBot?.status === 'online' ? 'text-emerald-400' :
              selectedBot?.status === 'draft' ? 'text-amber-400' : 'text-indigo-400'
            }`} />
            <span className="truncate max-w-[150px] text-slate-400">{selectedBot?.name || 'No bot'}</span>
            {selectedBot?.status === 'draft' && (
              <span className="text-[10px] text-amber-400 px-1.5 py-0 bg-amber-500/10 rounded">Draft</span>
            )}
            <ChevronUp className={`w-3 h-3 transition-transform ${showBotMenu ? 'rotate-180' : ''}`} />
          </button>
        )}

        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                  isActive ? 'text-indigo-400' : 'text-slate-600'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
