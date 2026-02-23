import { BarChart3, MessageSquare, Users, Clock, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBots } from '../hooks/useBots';

const PREVIEW_STATS = [
  { label: 'Total Messages', icon: MessageSquare, desc: 'Messages handled by your bot' },
  { label: 'Unique Users', icon: Users, desc: 'People who chatted with your bot' },
  { label: 'Avg Response Time', icon: Clock, desc: 'How fast your bot replies' },
  { label: 'Satisfaction', icon: TrendingUp, desc: 'User feedback and ratings' },
];

export default function Analytics() {
  const { selectedBot } = useBots();
  const isOnline = selectedBot?.status === 'online';

  return (
    <div className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">
          {selectedBot
            ? <>Insights for <span className="text-white font-medium">{selectedBot.name}</span></>
            : 'Select a bot to view analytics'}
        </p>
      </div>

      {/* Coming Soon banner */}
      <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/5 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Analytics — Coming Soon</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-lg">
              {isOnline
                ? `Once ${selectedBot?.name} starts handling messages, you'll see real-time stats here — message volume, unique users, response times, and more.`
                : 'Activate a bot and start receiving messages to unlock analytics. We\'ll track everything automatically.'}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {isOnline ? (
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/20 text-indigo-300 text-sm font-medium rounded-xl transition-all"
                >
                  Test Your Bot
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/20 text-indigo-300 text-sm font-medium rounded-xl transition-all"
                >
                  Create a Bot
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 text-sm font-medium rounded-xl transition-all"
              >
                Bot Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview cards */}
      <p className="text-xs text-slate-600 uppercase tracking-wider font-medium mb-4">What you'll see</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {PREVIEW_STATS.map((stat) => (
          <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 opacity-60">
            <stat.icon className="w-4 h-4 text-slate-600 mb-3" />
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Planned features */}
      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Planned Analytics Features</h3>
        <div className="space-y-2.5">
          {[
            'Message volume chart (daily / weekly / monthly)',
            'Unique users over time',
            'Average response time tracking',
            'Most asked questions',
            'Peak usage hours heatmap',
            'User satisfaction scores',
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2.5 text-sm">
              <Zap className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="text-slate-400">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
