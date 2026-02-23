import { MessageSquare, Clock, Wifi, TrendingUp } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  { label: 'Messages Today', value: '0', icon: MessageSquare },
  { label: 'Avg Response', value: '—', icon: Clock },
  { label: 'Active Channels', value: '0', icon: Wifi },
  { label: 'This Week', value: '0', icon: TrendingUp },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-xl font-bold text-slate-500">{stat.value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
