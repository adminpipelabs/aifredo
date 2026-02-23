import { useState } from 'react';
import { ArrowLeft, Rocket, Check, Coins, Loader2 } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';
import { api } from '../../api/client';

interface Props {
  data: OnboardingData;
  onFinish: () => void;
  onBack: () => void;
}

export function DoneStep({ data, onFinish, onBack }: Props) {
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState('');

  const handleLaunch = async () => {
    setLaunching(true);
    setError('');
    try {
      // Check balance to determine initial status
      let status = 'offline';
      try {
        const balRes = await api.get('/api/payments/balance') as { balance_cents: number };
        if (balRes.balance_cents > 0) status = 'online';
      } catch {
        // No balance info — default to offline
      }

      await api.post('/api/bots', {
        name: data.botName,
        persona: data.persona,
        model: data.model,
        channel: data.channel || '',
        system_prompt: data.systemPrompt,
        status,
      });

      onFinish();
    } catch (err: any) {
      setError(err.message || 'Failed to create bot');
      setLaunching(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/20 mb-4">
          <Check className="w-7 h-7 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {data.botName} is Ready!
        </h2>
        <p className="text-slate-400 mt-2">
          Your bot is fully configured. Launch it to your dashboard.
        </p>
      </div>

      {/* Bot summary */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Bot Name</span>
          <span className="text-white font-medium">{data.botName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Personality</span>
          <span className="text-white font-medium capitalize">{data.persona}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Model</span>
          <span className="text-white font-medium capitalize">{data.model === 'anthropic' ? 'Claude' : data.model === 'openai' ? 'GPT' : data.model}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Channel</span>
          <span className="text-white font-medium capitalize">{data.channel || 'None yet'}</span>
        </div>
        {data.integrations.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Skills</span>
            <span className="text-white font-medium">{data.integrations.length} connected</span>
          </div>
        )}
        {data.systemPrompt && (
          <div className="pt-2 border-t border-white/5">
            <span className="text-xs text-slate-500">System prompt</span>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{data.systemPrompt}</p>
          </div>
        )}
      </div>

      {/* What happens next */}
      <div className="bg-indigo-600/10 border border-indigo-500/15 rounded-xl p-4 mb-4">
        <p className="text-sm font-medium text-indigo-300 mb-2">What happens next?</p>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5 font-medium">1.</span>
            Your bot is created on your dashboard
          </li>
          {data.channel && data.channel !== 'webchat' && (
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-0.5 font-medium">2.</span>
              Paste your <span className="text-slate-300 font-medium capitalize">{data.channel}</span> token in Bot Settings to go live on that channel
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5 font-medium">{data.channel && data.channel !== 'webchat' ? '3' : '2'}.</span>
            Add funds to run it 24/7 in the cloud
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-400 mt-0.5 font-medium">{data.channel && data.channel !== 'webchat' ? '4' : '3'}.</span>
            Share it via public link or embed on your website
          </li>
        </ul>
      </div>

      {/* $FREDO teaser */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <Coins className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-amber-300 font-medium">Earn $FREDO</p>
          <p className="text-[11px] text-amber-400/60">
            Connect your Solana wallet on the token page to reserve 1,000 $FREDO — free for bot creators.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} disabled={launching} className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-white transition-colors disabled:opacity-50">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleLaunch}
          disabled={launching}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20"
        >
          {launching ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
          ) : (
            <><Rocket className="w-4 h-4" /> Launch Bot</>
          )}
        </button>
      </div>
    </div>
  );
}
