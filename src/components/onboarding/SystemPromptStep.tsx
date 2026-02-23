import { ArrowLeft, FileText, Sparkles } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';

const presets = [
  { id: 'assistant', label: 'Personal Assistant', prompt: 'You are a helpful personal AI assistant. Be concise, friendly, and proactive. Help with tasks, answer questions, and anticipate what the user might need next.' },
  { id: 'support', label: 'Customer Support', prompt: 'You are a customer support agent. Be professional, empathetic, and solution-oriented. Always try to resolve the issue in the first response. Ask clarifying questions when needed.' },
  { id: 'creative', label: 'Creative Writer', prompt: 'You are a creative writing assistant. Help brainstorm ideas, write drafts, edit copy, and provide feedback. Match the tone and style the user is going for.' },
  { id: 'dev', label: 'Dev Helper', prompt: 'You are a software development assistant. Help with coding questions, debug issues, review code, and suggest best practices. Be precise and include code examples when helpful.' },
];

interface Props {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SystemPromptStep({ data, update, onNext, onBack }: Props) {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 mb-4">
          <FileText className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">System Prompt</h2>
        <p className="text-slate-400 mt-2">
          Tell {data.botName || 'your bot'} what it is and how to behave. This is its core instruction.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Quick presets — click to apply
        </p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => update({ systemPrompt: p.prompt })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                data.systemPrompt === p.prompt
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:border-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={data.systemPrompt}
        onChange={(e) => update({ systemPrompt: e.target.value })}
        rows={6}
        placeholder="You are a helpful assistant that..."
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all resize-none text-sm leading-relaxed"
      />
      <p className="text-xs text-slate-500 mt-2">
        This is the base instruction. You can always edit this later from your dashboard.
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
