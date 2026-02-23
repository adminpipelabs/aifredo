import { ArrowLeft, ExternalLink, Info } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';

const channels = [
  { id: 'telegram', name: 'Telegram', desc: 'Easy setup, great for personal use', tokenName: 'Bot Token', howTo: 'Message @BotFather on Telegram, type /newbot, and copy the token.', link: 'https://t.me/BotFather', linkLabel: 'Open BotFather', free: true },
  { id: 'whatsapp', name: 'WhatsApp', desc: 'Most popular messaging app worldwide', tokenName: 'Business API Key', howTo: 'Create an app on Meta for Developers, enable WhatsApp, and copy the access token.', link: 'https://developers.facebook.com/apps/', linkLabel: 'Meta Developers', free: false },
  { id: 'discord', name: 'Discord', desc: 'Perfect for communities and teams', tokenName: 'Bot Token', howTo: 'Create an app on the Discord Developer Portal, add a bot, and copy the token.', link: 'https://discord.com/developers/applications', linkLabel: 'Discord Developers', free: true },
  { id: 'slack', name: 'Slack', desc: 'Best for workplace and productivity', tokenName: 'Bot Token', howTo: 'Create a Slack App, enable Bot scope, install to workspace, and copy the bot token.', link: 'https://api.slack.com/apps', linkLabel: 'Slack API', free: true },
  { id: 'webchat', name: 'WebChat', desc: 'Built-in browser chat — no setup needed', tokenName: null, howTo: null, link: null, linkLabel: null, free: true },
  { id: 'signal', name: 'Signal', desc: 'Secure and private messaging', tokenName: 'Signal API Key', howTo: 'Requires a Signal API bridge. See the Signal Bot API docs for setup.', link: 'https://github.com/bbernhard/signal-cli-rest-api', linkLabel: 'Signal Bot API', free: true },
];

interface Props {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ChannelStep({ data, update, onNext, onBack }: Props) {
  const selected = channels.find((c) => c.id === data.channel);

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Connect a Channel</h2>
        <p className="text-slate-400 mt-2">Where should your bot live? Pick one to start — add more later.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => update({ channel: ch.id })}
            className={`p-4 rounded-xl border text-left transition-all ${
              data.channel === ch.id
                ? 'bg-indigo-600/20 border-indigo-500/30'
                : 'bg-white/[0.03] border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium block ${data.channel === ch.id ? 'text-indigo-300' : 'text-white'}`}>
                {ch.name}
              </span>
              {!ch.free && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full">Premium</span>
              )}
            </div>
            <span className="text-xs text-slate-500 mt-0.5 block">{ch.desc}</span>
          </button>
        ))}
      </div>

      {selected && selected.tokenName && (
        <div className="mt-5 bg-indigo-600/10 border border-indigo-500/15 rounded-xl px-4 py-3">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div className="space-y-1.5">
              <p className="text-sm text-indigo-300 font-medium">
                You'll need a {selected.tokenName} from {selected.name}
              </p>
              <p className="text-xs text-indigo-400/70 leading-relaxed">{selected.howTo}</p>
              {selected.link && (
                <a href={selected.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors mt-1">
                  {selected.linkLabel} <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <p className="text-[11px] text-slate-500 mt-1">
                Don't have it yet? No worries — you can add it later in <span className="font-medium text-slate-400">Bot Settings</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {selected && !selected.tokenName && (
        <div className="mt-5 bg-emerald-500/10 border border-emerald-500/15 rounded-xl px-4 py-3 flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-emerald-300 font-medium">No setup needed</p>
            <p className="text-xs text-emerald-400/70 mt-0.5">
              WebChat works out of the box — your bot gets a unique chat URL you can share with anyone.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.channel}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
