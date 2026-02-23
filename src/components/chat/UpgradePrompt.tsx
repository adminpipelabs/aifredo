import { Link } from 'react-router-dom';
import { Zap, Key, MessageSquare, Bot, Globe, Clock, Sparkles } from 'lucide-react';

interface Props {
  remaining: number;
  limit: number;
  isEmbed?: boolean;
}

export function MessageCounter({ remaining }: { remaining: number; limit?: number }) {
  if (remaining > 5) return null;
  const urgent = remaining <= 2;
  return (
    <div className={`text-center py-1.5 text-xs ${urgent ? 'text-amber-400' : 'text-slate-500'}`}>
      {remaining === 0
        ? 'Daily free messages used'
        : `${remaining} free message${remaining !== 1 ? 's' : ''} left today`}
    </div>
  );
}

export function UpgradePrompt({ remaining, limit, isEmbed }: Props) {
  if (remaining > 0) return null;

  return (
    <div className="px-4 py-6 space-y-5">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/20 mb-3">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-white font-semibold text-base">You've used your {limit} free messages today</h3>
        <p className="text-slate-400 text-sm mt-1">Upgrade to keep chatting, or come back tomorrow.</p>
      </div>

      {/* $5/month pitch */}
      <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white">What $5/month gets you</span>
        </div>
        <div className="space-y-2">
          {[
            { icon: MessageSquare, text: '~1,500 AI messages' },
            { icon: Bot, text: '1 bot running 24/7' },
            { icon: Globe, text: 'Telegram, Discord, Slack — included' },
            { icon: Clock, text: 'No daily limits' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </div>
        {isEmbed ? (
          <a
            href="https://aifredo.chat/topup"
            target="_blank"
            rel="noopener"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-xl transition-all"
          >
            <Zap className="w-4 h-4" />
            Add Funds
          </a>
        ) : (
          <Link
            to="/topup"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-xl transition-all"
          >
            <Zap className="w-4 h-4" />
            Add Funds
          </Link>
        )}
      </div>

      {/* BYOK option */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">Or bring your own API key</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Paste your Anthropic or OpenAI key in Bot Settings for <span className="text-emerald-400 font-medium">unlimited messages at zero markup</span>. You pay your provider directly.
        </p>
        {isEmbed ? (
          <a
            href="https://aifredo.chat/settings"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
          >
            <Key className="w-3 h-3" />
            Go to Bot Settings
          </a>
        ) : (
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
          >
            <Key className="w-3 h-3" />
            Go to Bot Settings
          </Link>
        )}
      </div>

      <p className="text-center text-[11px] text-slate-500">
        Free messages reset every day at midnight UTC.
      </p>
    </div>
  );
}
