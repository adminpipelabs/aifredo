import { ArrowLeft, Puzzle, Check, Lock } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';

const integrations = [
  { id: 'gmail', name: 'Gmail', icon: '📧', desc: 'Read, draft & send emails on your behalf', available: true },
  { id: 'calendar', name: 'Google Calendar', icon: '📅', desc: 'Create events, check availability, set reminders', available: true },
  { id: 'github', name: 'GitHub', icon: '🐙', desc: 'Manage repos, PRs, issues & code reviews', available: true },
  { id: 'browser', name: 'Web Browsing', icon: '🌐', desc: 'Search the web, read pages & extract data', available: true },
  { id: 'obsidian', name: 'Obsidian / Notes', icon: '📝', desc: 'Read & write to your knowledge base', available: true },
  { id: 'sheets', name: 'Google Sheets', icon: '📊', desc: 'Read & update spreadsheets automatically', available: true },
  { id: 'notion', name: 'Notion', icon: '📋', desc: 'Manage databases, pages & docs', available: false },
  { id: 'stripe', name: 'Stripe', icon: '💳', desc: 'Check payments, invoices & customer data', available: false },
  { id: 'shopify', name: 'Shopify', icon: '🛒', desc: 'Manage orders, products & inventory', available: false },
  { id: 'hubspot', name: 'HubSpot', icon: '🔶', desc: 'CRM contacts, deals & pipeline', available: false },
];

interface Props {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function IntegrationsStep({ data, update, onNext, onBack }: Props) {
  const toggle = (id: string) => {
    const item = integrations.find(i => i.id === id);
    if (!item?.available) return;
    const current = data.integrations || [];
    if (current.includes(id)) {
      update({ integrations: current.filter(i => i !== id) });
    } else {
      update({ integrations: [...current, id] });
    }
  };

  const isSelected = (id: string) => (data.integrations || []).includes(id);
  const available = integrations.filter(i => i.available);
  const comingSoon = integrations.filter(i => !i.available);

  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 mb-4">
          <Puzzle className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Add Skills</h2>
        <p className="text-slate-400 mt-2">
          Give {data.botName || 'your bot'} superpowers beyond chatting. What should it be able to do?
        </p>
      </div>

      <p className="text-xs text-slate-500 mb-3">These are optional — you can always add or remove skills later.</p>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {available.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              isSelected(item.id)
                ? 'bg-indigo-600/20 border-indigo-500/20'
                : 'bg-white/[0.03] border-white/5 hover:border-white/10'
            }`}
          >
            <span className="text-xl w-8 text-center shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-medium block ${isSelected(item.id) ? 'text-indigo-300' : 'text-white'}`}>
                {item.name}
              </span>
              <span className="text-xs text-slate-500">{item.desc}</span>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
              isSelected(item.id) ? 'bg-indigo-600' : 'border border-white/10'
            }`}>
              {isSelected(item.id) && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
        ))}

        {comingSoon.length > 0 && (
          <>
            <div className="flex items-center gap-2 pt-3 pb-1">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">Coming Soon</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            {comingSoon.map((item) => (
              <div key={item.id} className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] opacity-40">
                <span className="text-xl w-8 text-center shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">{item.name}</span>
                    <Lock className="w-3 h-3 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-600">{item.desc}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3">
        {(data.integrations || []).length} selected · Skills are free while in beta
      </p>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all">
          Continue
        </button>
      </div>
    </div>
  );
}
