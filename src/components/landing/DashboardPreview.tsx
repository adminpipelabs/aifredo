import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Puzzle,
  Settings,
  Bot,
  TrendingUp,
  Clock,
  Users,
} from 'lucide-react';

export function DashboardPreview() {
  return (
    <section className="px-4 py-20 sm:py-28 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            One Dashboard. All Your Bots.
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Manage multiple bots from a single interface. Monitor performance,
            switch between bots, and never lose track of what is running.
          </p>
        </div>

        {/* Dashboard mockup — kept dark for contrast/authenticity */}
        <div className="relative">
          <div className="absolute -inset-4 bg-slate-200/50 rounded-3xl blur-2xl" />

          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-slate-700/50 rounded-md text-xs text-slate-400">
                  aifredo.chat/dashboard
                </div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar mock */}
              <div className="hidden md:flex flex-col w-56 bg-slate-800/50 border-r border-slate-700/40 p-3 shrink-0">
                <div className="flex items-center gap-2 px-3 py-2 mb-4">
                  <img src="/aifredo-logo.svg" alt="Aifredo" className="w-7 h-7 rounded-lg" />
                  <span className="text-white font-semibold text-sm">Aifredo</span>
                </div>

                <div className="px-2 py-2 mb-3 bg-slate-700/20 rounded-lg">
                  <div className="flex items-center gap-2 px-2">
                    <Bot className="w-4 h-4 text-blue-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate">Support Bot</p>
                      <p className="text-[9px] text-emerald-400">online</p>
                    </div>
                  </div>
                </div>

                {[
                  { icon: LayoutDashboard, label: 'Dashboard', active: true },
                  { icon: MessageSquare, label: 'Chat', active: false },
                  { icon: Puzzle, label: 'Integrations', active: false },
                  { icon: BarChart3, label: 'Analytics', active: false },
                  { icon: Settings, label: 'Settings', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                      item.active ? 'bg-blue-600/15 text-blue-300' : 'text-slate-500'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content mock */}
              <div className="flex-1 p-4 sm:p-6 min-h-[380px]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Dashboard</h3>
                    <p className="text-[10px] text-slate-500">3 bots — manage them all from here</p>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-medium rounded-md">
                    + New Bot
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { name: 'Support Bot', status: 'online', model: 'Claude', msgs: '2,341' },
                    { name: 'Sales Assistant', status: 'online', model: 'GPT-4', msgs: '891' },
                    { name: 'Dev Helper', status: 'offline', model: 'Claude', msgs: '456' },
                  ].map((bot) => (
                    <div key={bot.name} className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`w-2 h-2 rounded-full ${bot.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <span className="text-[10px] text-slate-400 capitalize">{bot.status}</span>
                      </div>
                      <p className="text-xs text-white font-medium mb-0.5">{bot.name}</p>
                      <p className="text-[10px] text-slate-500">{bot.model} · {bot.msgs} msgs</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: MessageSquare, label: 'Messages', value: '3,688', change: '+18%' },
                    { icon: Clock, label: 'Avg Response', value: '0.8s', change: '-0.2s' },
                    { icon: Users, label: 'Active Users', value: '234', change: '+12' },
                    { icon: TrendingUp, label: 'Satisfaction', value: '96%', change: '+3%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-800/30 border border-slate-700/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500">{stat.label}</span>
                        <stat.icon className="w-3 h-3 text-slate-600" />
                      </div>
                      <p className="text-sm text-white font-semibold">{stat.value}</p>
                      <p className="text-[9px] text-emerald-400">{stat.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Real dashboard. Real-time stats. All bots in one place.
        </p>
      </div>
    </section>
  );
}
