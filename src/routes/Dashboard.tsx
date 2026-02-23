import { Link } from 'react-router-dom';
import { Plus, MessageSquare, Power, Settings, Trash2, MoreVertical, Rocket, Wallet, CheckCircle, Circle, Lightbulb, HelpCircle, ArrowRight, Sparkles, BookOpen, MessageCircle, ChevronDown, Share2, Copy, Check, ExternalLink, Gift, Coins } from 'lucide-react';
import { useBots, type BotData } from '../hooks/useBots';
import { useClaimStatus } from '../hooks/useClaims';
import { QuickStats } from '../components/dashboard/QuickStats';
import { OpportunityCards } from '../components/dashboard/OpportunityCards';
import { useState, useEffect } from 'react';
import { api } from '../api/client';

function BotCard({ bot, isSelected, onSelect, onDelete }: {
  bot: BotData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDraft = bot.status === 'draft';
  const isLive = !isDraft;

  const statusColors: Record<string, string> = {
    online: 'bg-emerald-400',
    offline: 'bg-slate-600',
    starting: 'bg-amber-400 animate-pulse',
    draft: 'bg-amber-400',
  };

  const statusLabels: Record<string, string> = {
    online: 'Online — 24/7',
    offline: 'Offline',
    starting: 'Starting...',
    draft: 'Draft — Not Active',
  };

  const chatUrl = `https://aifredo.chat/bot/${bot.id}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(chatUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onSelect}
      className={`relative bg-white/[0.03] border rounded-2xl p-5 cursor-pointer transition-all hover:border-white/10 ${
        isSelected ? 'border-indigo-500/30 ring-1 ring-indigo-500/20' : 'border-white/5'
      } ${isDraft ? 'border-dashed' : ''}`}
    >
      {/* Status + menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${statusColors[bot.status] || statusColors.offline}`} />
          <span className={`text-xs capitalize ${
            isDraft ? 'text-amber-400' : bot.status === 'online' ? 'text-emerald-400' : 'text-slate-500'
          }`}>
            {statusLabels[bot.status] || bot.status}
          </span>
        </div>
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="p-1 text-slate-500 hover:text-white transition-colors rounded"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-[#14141F] border border-white/10 rounded-lg shadow-xl z-10 py-1 min-w-[160px]">
              <Link
                to="/settings"
                onClick={(e) => { e.stopPropagation(); onSelect(); setShowMenu(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Settings
              </Link>
              {isLive && (
                <>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors w-full text-left"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Share Link'}
                  </button>
                  <a
                    href={chatUrl}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Public Chat
                  </a>
                </>
              )}
              <div className="border-t border-white/5 mt-1 pt-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); setShowMenu(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors w-full text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bot info */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isDraft ? 'bg-amber-500/20' : bot.status === 'online' ? 'bg-emerald-500/20' : 'bg-indigo-600/20'
        }`}>
          <Power className={`w-5 h-5 ${
            isDraft ? 'text-amber-400' : bot.status === 'online' ? 'text-emerald-400' : 'text-indigo-400'
          }`} />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{bot.name}</h3>
          <p className="text-xs text-slate-500 capitalize">{bot.persona} &middot; {bot.model}</p>
        </div>
      </div>

      {/* Channel */}
      {bot.channel && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-md capitalize border border-white/5">
            {bot.channel}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        {isDraft ? (
          <>
            <Link
              to="/chat"
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 transition-colors border border-white/5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Test Chat
            </Link>
            <Link
              to="/activate"
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              <Rocket className="w-3.5 h-3.5" />
              Activate
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/chat"
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-indigo-600/15 text-indigo-400 rounded-lg hover:bg-indigo-600/25 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat
            </Link>
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Share'}
            </button>
            <Link
              to="/settings"
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium bg-white/5 text-slate-400 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </div>

      {/* Status badge */}
      {isLive && (
        <div className={`absolute -top-px -right-px px-2 py-0.5 text-white text-[10px] font-medium rounded-bl-lg rounded-tr-2xl ${
          bot.status === 'online' ? 'bg-emerald-600' : 'bg-indigo-600'
        }`}>
          {bot.status === 'online' ? 'Live' : 'Active'}
        </div>
      )}
    </div>
  );
}

function GettingStarted({ bots, isAuthenticated }: { bots: BotData[]; isAuthenticated: boolean }) {
  const hasBots = bots.length > 0;
  const hasMultipleBots = bots.length > 1;
  const hasCustomPrompt = bots.some(b => b.system_prompt && b.system_prompt !== 'You are a helpful personal AI assistant. Be concise, friendly, and proactive.');
  const hasActivated = isAuthenticated;

  const steps = [
    { label: 'Create your first bot', done: hasBots, tip: 'Name it, pick a model, choose a channel' },
    { label: 'Customize the system prompt', done: hasCustomPrompt, tip: 'Tell your bot who it is and how to behave' },
    { label: 'Activate with Stripe', done: hasActivated, tip: 'Add funds to go live — bots run 24/7 in the cloud' },
    { label: 'Create a second bot', done: hasMultipleBots, tip: 'Different bots for different tasks or channels' },
  ];

  const completedCount = steps.filter(s => s.done).length;
  const allDone = completedCount === steps.length;

  if (allDone) return null;

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white font-semibold text-sm">Getting Started</h3>
        </div>
        <span className="text-xs text-slate-500">{completedCount}/{steps.length} complete</span>
      </div>

      <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / steps.length) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            {step.done ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${step.done ? 'text-slate-600 line-through' : 'text-white font-medium'}`}>
                {step.label}
              </p>
              {!step.done && (
                <p className="text-xs text-slate-500 mt-0.5">{step.tip}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickTips() {
  const tips = [
    { icon: Lightbulb, title: 'Use a detailed system prompt', text: 'The more specific your prompt, the better your bot performs. Include tone, role, and boundaries.' },
    { icon: MessageCircle, title: 'Test before you activate', text: 'Use the Test Chat in the setup wizard to see how your bot responds before going live.' },
    { icon: BookOpen, title: 'One bot per use case', text: 'A customer support bot and a personal assistant should be separate bots with different prompts.' },
  ];

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-slate-500" />
        <h3 className="text-white font-semibold text-sm">Quick Tips</h3>
      </div>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/15 flex items-center justify-center shrink-0 mt-0.5">
              <tip.icon className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">{tip.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BotSuggestions({ bots }: { bots: BotData[] }) {
  const suggestions: { text: string; action: string; link: string }[] = [];

  for (const bot of bots) {
    if (bot.status === 'draft') {
      suggestions.push({ text: `"${bot.name}" is still a draft — activate it to go live 24/7`, action: 'Activate', link: '/activate' });
    }
    if (!bot.system_prompt || bot.system_prompt === 'You are a helpful personal AI assistant. Be concise, friendly, and proactive.') {
      suggestions.push({ text: `"${bot.name}" is using the default prompt — customize it for better results`, action: 'Edit Prompt', link: '/settings' });
    }
  }

  const liveBots = bots.filter(b => b.status !== 'draft');
  if (liveBots.length > 0) {
    suggestions.push({ text: 'Share your bot! Copy its public chat link or embed it on your website', action: 'Go to Settings', link: '/settings' });
  }

  if (bots.length === 1) {
    suggestions.push({ text: 'Create a second bot for a different channel or purpose', action: 'New Bot', link: '/onboarding' });
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-indigo-400" />
        <h3 className="text-indigo-300 font-semibold text-sm">Suggestions</h3>
      </div>
      <div className="space-y-2">
        {suggestions.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-center justify-between gap-3 bg-white/[0.03] rounded-xl px-4 py-2.5 border border-white/5">
            <p className="text-xs text-slate-400 flex-1">{s.text}</p>
            <Link
              to={s.link}
              className="shrink-0 inline-flex items-center gap-1 text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              {s.action}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const dashboardFaqs = [
  { q: 'How does billing work?', a: 'Every bot gets 20 free AI messages per day. After that, add funds to keep chatting — $0.003/message, no subscription. Or bring your own API key for unlimited messages at zero markup.' },
  { q: 'What does $5 get me?', a: 'About 1,500 AI messages — enough to run a bot 24/7 for a month with moderate usage. Plus Telegram, Discord, and Slack channels are all included free.' },
  { q: 'Can I use my own API key?', a: 'Yes — paste your Anthropic or OpenAI key in Bot Settings. Your messages go through your key with zero markup, and you get unlimited messages.' },
  { q: 'What is free?', a: 'Creating bots, the dashboard, all channels (except WhatsApp), system prompt editing, and 20 AI messages per day. You only pay when you need more messages.' },
  { q: 'What happens when my balance hits $0?', a: 'You fall back to the free tier (20 messages/day). Nothing is deleted — settings, history, everything stays. Top up to remove the limit.' },
  { q: 'How do I log back in on another device?', a: 'Click "I Have an Account" on the homepage, enter the email you used with Stripe, and we will send you a login link. No password needed.' },
];

function DashboardFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-slate-500" />
        <h3 className="text-white font-semibold text-sm">FAQ</h3>
      </div>
      <div className="divide-y divide-white/5">
        {dashboardFaqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-start justify-between gap-3 py-3 text-left"
            >
              <span className="text-sm text-white font-medium">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 mt-0.5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <p className="text-xs text-slate-400 pb-3 -mt-1 leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClaimBanner() {
  const { status, isAuthenticated } = useClaimStatus();

  // Don't show if not authenticated or still loading
  if (!isAuthenticated || !status) return null;

  // Already claimed — show confirmation
  if (status.claimed && status.claim) {
    return (
      <div className="mb-6 bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-emerald-300 font-medium">100 $FREDO Reserved</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Wallet: <span className="font-mono text-slate-400">{status.claim.wallet_address.slice(0, 6)}...{status.claim.wallet_address.slice(-4)}</span>
            {' · '}Tokens will be distributed at launch.
          </p>
        </div>
        <Link
          to="/token"
          className="shrink-0 inline-flex items-center gap-1 text-xs text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
        >
          Details
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  // Eligible — show CTA to claim
  if (status.has_bots && !status.claimed && status.spots_remaining > 0) {
    return (
      <div className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/15 rounded-xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-300 font-medium">Earn 100 $FREDO — Free</p>
          <p className="text-xs text-slate-500 mt-0.5">
            You've created a bot! Connect your Phantom wallet and reserve your tokens.
            <span className="text-amber-400/60"> {status.spots_remaining.toLocaleString()} spots left.</span>
          </p>
        </div>
        <Link
          to="/token#claim"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-amber-500/10"
        >
          <Coins className="w-3.5 h-3.5" />
          Claim
        </Link>
      </div>
    );
  }

  return null;
}

export default function Dashboard() {
  const { bots, selectedBot, selectBot, deleteBot } = useBots();
  const [balanceCents, setBalanceCents] = useState<number | null>(null);

  useEffect(() => {
    api.get('/api/payments/balance')
      .then((res: any) => setBalanceCents(res.balance_cents ?? 0))
      .catch(() => setBalanceCents(0));
  }, []);

  return (
    <div className="px-4 sm:px-8 py-6 max-w-5xl mx-auto">
      {/* Balance widget */}
      {balanceCents !== null && (
        <div className="mb-6 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Balance</p>
              <p className={`text-lg font-bold ${balanceCents > 0 ? 'text-white' : 'text-slate-500'}`}>
                ${(balanceCents / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {balanceCents === 0 && (
              <p className="text-xs text-slate-500 hidden sm:block">
                Add funds to enable 24/7 hosting
              </p>
            )}
            <Link
              to="/topup"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Funds
            </Link>
          </div>
        </div>
      )}

      {/* $FREDO Claim Banner */}
      <ClaimBanner />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            {bots.length} bot{bots.length !== 1 ? 's' : ''} — manage them all from here
          </p>
        </div>
        <Link
          to="/onboarding"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          New Bot
        </Link>
      </div>

      <div className="space-y-6">
        {/* Bot grid */}
        {bots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                isSelected={selectedBot?.id === bot.id}
                onSelect={() => selectBot(bot.id)}
                onDelete={() => {
                  if (confirm(`Delete "${bot.name}"? This cannot be undone.`)) {
                    deleteBot(bot.id);
                  }
                }}
              />
            ))}

            {/* New bot card */}
            <Link
              to="/onboarding"
              className="flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-8 hover:border-indigo-500/30 hover:bg-white/[0.03] transition-all min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-slate-500" />
              </div>
              <span className="text-sm text-slate-500 font-medium">Create Another Bot</span>
            </Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <Power className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">No bots yet</h2>
            <p className="text-slate-500 mb-6">Create your first bot to get started.</p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Your First Bot
            </Link>
          </div>
        )}

        {bots.length > 0 && <BotSuggestions bots={bots} />}
        {bots.length > 0 && <GettingStarted bots={bots} isAuthenticated={true} />}

        {selectedBot && (
          <>
            <div>
              <h2 className="text-sm font-medium text-slate-500 mb-3">
                Stats for {selectedBot.name}
              </h2>
              <QuickStats />
            </div>
            <OpportunityCards />
          </>
        )}

        {bots.length > 0 && bots.length <= 3 && <QuickTips />}
        {bots.length > 0 && <DashboardFAQ />}
      </div>
    </div>
  );
}
