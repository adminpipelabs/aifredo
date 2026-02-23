import { ArrowLeft, Sparkles, Key } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';

const models = [
  { id: 'anthropic', name: 'Anthropic (Claude)', desc: 'Best for complex tasks, long context, and coding.', badge: 'Recommended' },
  { id: 'openai', name: 'OpenAI (GPT)', desc: 'Great general-purpose model with wide capabilities.', badge: null },
  { id: 'local', name: 'Local / OpenRouter', desc: 'Run open models locally or via OpenRouter. Full privacy.', badge: 'Advanced' },
];

interface Props {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ModelStep({ data, update, onNext, onBack }: Props) {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Choose Your Model</h2>
        <p className="text-slate-400 mt-2">Which AI provider should power your bot? You can change this later.</p>
      </div>

      {/* Included banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-emerald-300 font-medium">AI is included in your plan</p>
          <p className="text-xs text-emerald-400/70 mt-0.5">
            Pick a model and we handle the rest. 20 free messages/day, then $0.003 each. No API key needed.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => update({ model: m.id })}
            className={`w-full p-4 rounded-xl border text-left transition-all ${
              data.model === m.id
                ? 'bg-indigo-600/20 border-indigo-500/30'
                : 'bg-white/[0.03] border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${data.model === m.id ? 'text-indigo-300' : 'text-white'}`}>
                {m.name}
              </span>
              {m.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  m.badge === 'Recommended' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-white/5 text-slate-500'
                }`}>
                  {m.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 px-1">
        <Key className="w-3.5 h-3.5 text-slate-600" />
        <p className="text-xs text-slate-500">
          Have your own API key? You can add it later in <span className="text-slate-400 font-medium">Bot Settings</span> for zero-markup direct access.
        </p>
      </div>

      <div className="flex gap-3 mt-8">
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
