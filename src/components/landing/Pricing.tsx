import { Check, DollarSign, Bot, MessageSquare, Plug, ArrowRight, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const rates = [
  {
    icon: MessageSquare,
    label: 'AI messages',
    rate: '$0.003 / message',
    detail: '20 free messages per day. After that, pay as you go. $5 gets you ~1,500 messages.',
    example: 'Light use? The free tier might be all you need',
  },
  {
    icon: Bot,
    label: 'Bot creation & hosting',
    rate: 'Free',
    detail: 'Create unlimited bots. Dashboard, settings, WebChat — all included at no cost.',
    example: 'Build and test as many bots as you want',
  },
  {
    icon: Plug,
    label: 'All channels',
    rate: 'Free',
    detail: 'Telegram, Discord, Slack, and website embeds are all included. No per-channel fees.',
    example: 'Connect everywhere, pay nothing extra',
  },
];

export function Pricing() {
  return (
    <section className="px-4 py-20 sm:py-28 border-t border-slate-200 bg-white" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            <DollarSign className="w-3.5 h-3.5" />
            No subscriptions. No surprises.
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Pay For What You Use
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Add funds to your balance. Your bots consume it while they run.
            Stop using it? Costs stop. No monthly bills, no cancellation headaches.
          </p>
        </div>

        {/* Rate cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {rates.map((rate) => (
            <div
              key={rate.label}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <rate.icon className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="text-slate-900 font-semibold mb-1">{rate.label}</h3>
              <p className="text-2xl font-bold text-slate-900 mb-2">{rate.rate}</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">{rate.detail}</p>
              <p className="text-xs text-slate-400 italic">{rate.example}</p>
            </div>
          ))}
        </div>

        {/* Always free */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10">
          <h3 className="text-emerald-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Always free — no balance needed
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {[
              'Creating, configuring, and activating bots',
              'Full dashboard and bot management',
              'All channels (Telegram, Discord, Slack, WebChat)',
              '20 free AI messages per day',
              'Account creation and bot ownership',
              'Bring Your Own Key for unlimited at zero markup',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            You only pay for AI messages beyond the free 20/day. Everything else is included.
          </p>
        </div>

        {/* BYOK */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Key className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Bring Your Own API Key
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Already have an Anthropic or OpenAI account? Paste your API key in settings
                and get unlimited messages at zero markup. You pay the provider directly,
                we handle the infrastructure.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Copy-paste setup</span>
                <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Stored encrypted</span>
                <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> No AI markup from us</span>
                <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Switch providers anytime</span>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-amber-200/60">
            <p className="text-xs text-slate-500">
              <strong className="text-slate-700">No API key?</strong> No problem. We provide managed AI —
              20 free messages/day, then $0.003/message. No setup needed.
            </p>
          </div>
        </div>

        {/* How billing works */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h3 className="text-lg font-semibold text-slate-900 text-center mb-6">How Billing Works</h3>
          <div className="grid sm:grid-cols-4 gap-4 text-center">
            {[
              { step: '1', title: 'Start free', desc: 'Create bots, connect channels, chat 20 msgs/day — no card needed' },
              { step: '2', title: 'Add funds when ready', desc: '$5 gets ~1,500 messages. Card, Apple Pay, or Google Pay' },
              { step: '3', title: 'Track spending', desc: 'See exactly where every cent goes in real time' },
              { step: '4', title: 'Top up or stay free', desc: 'Hit $0? You keep the 20 free msgs/day. Nothing is deleted.' },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-sm text-slate-900 font-medium mb-1">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real cost examples */}
        <div className="mb-14">
          <h3 className="text-center text-lg font-semibold text-slate-900 mb-6">Real Cost Examples</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Casual use',
                setup: '1 bot, WebChat, ~20 msgs/day',
                daily: '$0.00',
                monthly: 'Free',
                note: 'Stays within the free 20 msgs/day',
              },
              {
                title: 'Active bot on Telegram',
                setup: '1 bot, Telegram, ~100 msgs/day',
                daily: '$0.24',
                monthly: '~$7/mo',
                note: '20 free + 80 paid × $0.003. Telegram is free.',
              },
              {
                title: 'Power user (BYOK)',
                setup: '3 bots, multiple channels, unlimited msgs',
                daily: '$0.00',
                monthly: '$0 from us',
                note: 'Bring your own API key — zero markup, unlimited',
              },
            ].map((ex) => (
              <div key={ex.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h4 className="text-slate-900 font-medium text-sm mb-1">{ex.title}</h4>
                <p className="text-[11px] text-slate-400 mb-3">{ex.setup}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xl font-bold text-slate-900">{ex.daily}</span>
                  <span className="text-xs text-slate-400">/day</span>
                </div>
                <p className="text-xs text-emerald-600 font-medium mb-2">{ex.monthly}</p>
                <p className="text-[10px] text-slate-400">{ex.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-700/20"
          >
            Create Your Bot — Free to Start
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> No credit card upfront</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> No subscription</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Pause anytime, costs stop</span>
          </div>
        </div>
      </div>
    </section>
  );
}
