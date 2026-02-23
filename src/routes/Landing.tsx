import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, MessageSquare, Globe, ChevronDown, Coins, Shield, TrendingUp, Sparkles, Lock, Gift, Wallet } from 'lucide-react';

const CHANNELS = ['Telegram', 'WhatsApp', 'Discord', 'Slack', 'WebChat', 'Signal', 'Gmail', 'GitHub', 'Calendar', 'Notion'];

const STEPS = [
  { num: '01', title: 'Create Your Bot', desc: 'Name it, pick an AI model, write a system prompt. Takes 2 minutes. No code.', icon: Bot },
  { num: '02', title: 'Connect a Channel', desc: 'Deploy to Telegram, WhatsApp, Discord — or embed on your website with one line of code.', icon: Globe },
  { num: '03', title: 'Go Live & Earn', desc: 'Your bot runs 24/7. Charge end users, sell templates on the marketplace, earn $FREDO.', icon: TrendingUp },
];

const FEATURES = [
  { title: 'Multi-Channel', desc: 'One bot, every platform. Telegram, WhatsApp, Discord, Slack, websites.', icon: MessageSquare },
  { title: 'AI Included', desc: 'Claude, GPT, or bring your own key. 20 free messages/day, then $0.003 each.', icon: Sparkles },
  { title: 'Embeddable Widget', desc: 'One script tag. Chat bubble on any website. Mobile-responsive.', icon: Globe },
  { title: 'Pay Per Use', desc: 'No subscriptions. Prepaid balance. Bots pause at $0. Top up anytime.', icon: Coins },
  { title: 'Bot Marketplace', desc: 'Buy proven templates. Sell your own. Earn from every install.', icon: TrendingUp },
  { title: '$FREDO Token', desc: 'Hold to unlock tiers. Earn from popular bots. The AI bot economy.', icon: Lock },
];

const FAQS = [
  { q: 'Is it free to start?', a: 'Yes. Create bots, connect channels, test them — all free. You get 20 free AI messages/day. Add funds only when you need more.' },
  { q: 'Do I need to code?', a: 'No. Everything is visual — pick a model, write a prompt, choose a channel. Your bot is live in minutes.' },
  { q: 'What is $FREDO?', a: '$FREDO is our utility token on Solana. Hold it to unlock premium features (white-label, marketplace, fee discounts). Earn it by building popular bots.' },
  { q: 'Can I make money from my bots?', a: 'Yes. Charge end users per message or subscription. Sell bot templates on the marketplace. Earn $FREDO creator rewards.' },
  { q: 'What AI models are supported?', a: 'Anthropic Claude, OpenAI GPT, and any model via OpenRouter. AI is included in your plan, or bring your own API key for zero markup.' },
  { q: 'How do I embed a bot on my website?', a: 'Copy one line of code from your bot settings and paste it before </body>. A chat bubble appears instantly.' },
];

const PRICING = [
  { label: 'AI messages', price: '$0.003', unit: '/msg (20/day free)' },
  { label: 'Bot hosting', price: 'Free', unit: 'always' },
  { label: 'All channels', price: 'Free', unit: 'Telegram, Discord, Slack, WebChat' },
  { label: 'BYOK', price: 'Unlimited', unit: 'zero markup' },
];

const DEMO_BOT_ID = '743fba77-8927-4807-9dfc-183f314f103f';

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/embed.js';
    script.setAttribute('data-bot-id', DEMO_BOT_ID);
    script.setAttribute('data-color', '#4f46e5');
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelectorAll('.af-widget-btn, .af-widget-frame').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-full bg-[#0A0A0F] text-white">

      {/* ───── Nav ───── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/aifredo-logo.svg" alt="Aifredo" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg tracking-tight">Aifredo</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/dashboard" className="hidden sm:inline text-sm text-slate-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <a href="#pricing" className="hidden sm:inline text-sm text-slate-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hidden sm:inline text-sm text-slate-400 hover:text-white transition-colors">
              FAQ
            </a>
            <Link to="/token" className="hidden sm:inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              $FREDO
            </Link>
            <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-indigo-600/15 via-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-60 -right-20 w-[400px] h-[400px] bg-gradient-to-l from-amber-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-20 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/20 rounded-full hover:bg-indigo-600/20 transition-colors">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs text-indigo-300 font-medium">Hosted Bot Service — Powered by OpenClaw</span>
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-slate-300 font-medium">The AI Bot Economy — $FREDO on Solana</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95] mb-6">
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">Build AI Bots.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">Deploy Everywhere.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create AI bots in minutes. Deploy to Telegram, WhatsApp, Discord, or any website.
            <br className="hidden sm:block" />
            Monetize with your audience. Earn <span className="text-indigo-400 font-medium">$FREDO</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl transition-all text-lg shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:scale-[1.02]"
            >
              Create Your First Bot
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/token"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl transition-all"
            >
              <Coins className="w-4 h-4 text-indigo-400" />
              Learn About $FREDO
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center">
            {[
              { value: 'Free', label: 'to start' },
              { value: '6+', label: 'channels' },
              { value: '24/7', label: 'hosting' },
              { value: '<2min', label: 'setup' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Problem → Solution ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Stop Running Bots From a Terminal</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Most people run bots on their laptop. It dies when they sleep. That's not a service — that's a hack.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8">
              <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-5">The Old Way</h3>
              <div className="space-y-3">
                {['SSH into server, run command manually', 'Bot dies when terminal closes', 'No monitoring or alerts', 'One bot per session', 'No analytics', 'Config files and env vars'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="text-red-500/60">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-8">
              <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-5">The Aifredo Way</h3>
              <div className="space-y-3">
                {['Click "Create" — live in seconds', 'Runs 24/7 on cloud infrastructure', 'Health monitoring & auto-restart', 'Manage 100 bots from one dashboard', 'Built-in analytics & insights', 'Visual config — no code needed'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── How It Works ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Three Steps to Live</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2">Step {step.num}</p>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Features Grid ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Everything You Need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From creation to monetization — one platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                  <f.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Channels Strip ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-6">Connects to Everything</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CHANNELS.map((ch) => (
              <span key={ch} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-sm text-slate-400">
                {ch}
              </span>
            ))}
            <span className="px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full text-sm text-indigo-400 font-medium">
              50+ more
            </span>
          </div>
        </div>
      </section>

      {/* ───── $FREDO Claim + Sale ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          {/* Claim card */}
          <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/5 border border-amber-500/20 rounded-3xl p-8 sm:p-10 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black">Earn 100 $FREDO Free</h2>
                    <p className="text-xs text-slate-500">First 10,000 bot creators only</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-lg">
                  Complete 5 simple tasks and earn 100 $FREDO — no purchase required.
                  Connect your Phantom wallet and receive tokens instantly on Solana.
                </p>

                {/* Mini claim steps */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { icon: Bot, label: 'Create a Bot' },
                    { icon: Wallet, label: 'Connect Wallet' },
                    { icon: MessageSquare, label: 'Join Telegram' },
                    { icon: ArrowRight, label: 'Follow on X' },
                    { icon: Globe, label: 'Tweet Bot Link' },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2">
                      <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center">
                        <s.icon className="w-3 h-3 text-amber-400" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium">{i + 1}. {s.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  Start Earning $FREDO
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Claim counter */}
              <div className="lg:w-72 shrink-0">
                <div className="bg-black/20 rounded-xl p-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Claims</span>
                    <span className="text-white font-bold">0 / 10,000</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <p className="text-[10px] text-slate-600">10,000 spots remaining</p>
                  <p className="text-[10px] text-slate-600">1,000,000 $FREDO allocated (0.1%)</p>
                </div>

                {/* Token sale teaser */}
                <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-2">Token Sale — 3 Rounds</p>
                  <div className="space-y-1.5">
                    {[
                      { label: 'R1 Seed', price: '$0.005', tag: 'Fixed' },
                      { label: 'R2 Community', price: '$0.005–0.01', tag: 'Dynamic' },
                      { label: 'R3 Public', price: '$0.017–0.05', tag: 'Dynamic' },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{r.label}</span>
                        <span className="text-white font-medium">{r.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/token" className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs text-indigo-400 font-medium transition-colors">
                    View Token Sale
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Utility row */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, label: 'Spend to list & promote' },
              { icon: Lock, label: 'Hold to unlock tiers' },
              { icon: TrendingUp, label: 'Earn from bot usage' },
              { icon: Sparkles, label: 'Powered by Solana' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-slate-500">
                <item.icon className="w-3.5 h-3.5 text-indigo-400" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Pricing ───── */}
      <section className="border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Simple Pricing</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              No subscriptions. No lock-in. Pay for what you use from a prepaid balance.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
              {PRICING.map((item, i) => (
                <div key={item.label} className={`flex items-center justify-between px-6 py-4 ${i !== PRICING.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">{item.price}</span>
                    <span className="text-xs text-slate-500 ml-1">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-emerald-500" /> Free to create & test</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-emerald-500" /> Balance never expires</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-emerald-500" /> Bots pause at $0</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="border-t border-white/5" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">FAQ</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Your bots deserve</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">better than a terminal.</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
            Create your first bot in 2 minutes. Free to start.
            Earn $FREDO when you go live.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-2xl text-lg transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:scale-[1.02]"
          >
            Start Building — Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            No credit card. No subscription. Build first, pay later.
          </p>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-white/5 bg-[#08080D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <img src="/aifredo-logo.svg" alt="Aifredo" className="w-7 h-7 rounded-lg" />
                <span className="font-bold text-sm">Aifredo</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xs mb-4">
                Build, deploy, and monetize AI bots. Powered by $FREDO on Solana.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a href="https://x.com/aifredochat" target="_blank" rel="noopener" className="text-slate-600 hover:text-white transition-colors" title="Follow us on X">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener" className="text-slate-600 hover:text-white transition-colors" title="View on GitHub">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <p className="text-slate-300 font-medium mb-3">Product</p>
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard" className="text-slate-500 hover:text-slate-300 transition-colors">Dashboard</Link>
                  <Link to="/onboarding" className="text-slate-500 hover:text-slate-300 transition-colors">Create a Bot</Link>
                  <a href="#pricing" className="text-slate-500 hover:text-slate-300 transition-colors">Pricing</a>
                  <Link to="/token" className="text-slate-500 hover:text-slate-300 transition-colors">$FREDO Token</Link>
                </div>
              </div>
              <div>
                <p className="text-slate-300 font-medium mb-3">Community</p>
                <div className="flex flex-col gap-2">
                  <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-300 transition-colors">GitHub</a>
                  <a href="https://x.com/aifredochat" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-300 transition-colors">X / Twitter</a>
                </div>
              </div>
              <div>
                <p className="text-slate-300 font-medium mb-3">Legal</p>
                <div className="flex flex-col gap-2">
                  <Link to="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
                  <Link to="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
                  <Link to="/cookies" className="text-slate-500 hover:text-slate-300 transition-colors">Cookies</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Powered by */}
          <div className="pt-4 pb-4 border-t border-white/5 flex items-center justify-center gap-2">
            <span className="text-[11px] text-slate-600">Powered by</span>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors font-medium">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              OpenClaw
            </a>
          </div>
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            <span>&copy; {new Date().getFullYear()} Pipe Labs, LLC. All rights reserved.</span>
            <span>$FREDO is a utility token. Not an investment product.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
