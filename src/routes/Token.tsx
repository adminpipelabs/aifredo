import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Zap, Bot, ShoppingBag, ArrowRight, ChevronDown, Lock, Coins,
  TrendingUp, Sparkles, Gift, Clock, ExternalLink, Copy, Send,
  Timer, CircleDollarSign, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';
import { PublicNav } from '../components/layout/PublicNav';
import { useClaimStats, useClaimStatus } from '../hooks/useClaims';

/* ────────── Data ────────── */

const TOKENOMICS = [
  { label: 'Ecosystem & Rewards', pct: 30, tokens: '300M', color: 'bg-emerald-500' },
  { label: 'Team & Founders', pct: 15, tokens: '150M', color: 'bg-blue-500' },
  { label: 'Development Fund', pct: 15, tokens: '150M', color: 'bg-violet-500' },
  { label: 'Token Sale', pct: 10, tokens: '100M', color: 'bg-indigo-500' },
  { label: 'DEX Liquidity', pct: 10, tokens: '100M', color: 'bg-cyan-500' },
  { label: 'Partnerships', pct: 10, tokens: '100M', color: 'bg-pink-500' },
  { label: 'Treasury', pct: 9, tokens: '90M', color: 'bg-slate-500' },
  { label: 'Community Claims', pct: 1, tokens: '10M', color: 'bg-amber-500' },
];

const TIERS = [
  { name: 'Builder', amount: '1,000', color: 'from-slate-500 to-slate-600', unlocks: ['Marketplace listing', '1 custom bot', 'Community access', 'Basic analytics'] },
  { name: 'Creator', amount: '10,000', color: 'from-blue-500 to-indigo-600', unlocks: ['White-label branding', 'Custom domain', '5% fee discount', 'Priority support'] },
  { name: 'Pro', amount: '50,000', color: 'from-violet-500 to-purple-600', unlocks: ['Full API access', 'Team accounts', '15% fee discount', 'Advanced analytics'] },
  { name: 'Partner', amount: '250,000', color: 'from-amber-500 to-orange-600', unlocks: ['Revenue share from fees', 'Governance votes', 'Early feature access', 'Partner badge'] },
];

const FAQS = [
  { q: 'What is $FREDO?', a: '$FREDO is the native utility token of the platform. It powers the AI bot economy — use it to create, sell, share, and earn from AI bots.' },
  { q: 'How do I get $FREDO for free?', a: 'Complete 5 simple tasks — connect a wallet, create a bot, join our Telegram, follow us on X, and tweet your bot link. Each task earns $FREDO, up to 100 total. First 10,000 users only.' },
  { q: 'How does the Prorata sale work?', a: 'In Rounds 2 & 3, everyone deposits USDC during an open window (48–72h). When it closes, tokens are distributed proportionally. If demand exceeds the cap, excess USDC is refunded automatically. Everyone gets a fair allocation.' },
  { q: 'What if Round 1 doesn\'t fill?', a: 'All Round 1 contributors get a full USDC refund. Meteora handles this automatically on-chain. No listing happens until Round 1 fills.' },
  { q: 'What blockchain is $FREDO on?', a: '$FREDO is an SPL token on Solana — fast, cheap, and supported by Phantom, Solflare, and all major wallets.' },
  { q: 'Is there vesting?', a: 'Round 1: 25% unlocked, 75% vests over 90 days. Round 2: 50% unlocked, 50% vests over 60 days. Round 3: 100% unlocked. Team tokens: 6-month cliff, 2-year vest.' },
  { q: 'What gives $FREDO value?', a: 'Real platform utility. Required to list on the marketplace, unlock tiers, and access premium features. 10% of platform fees buy back and burn $FREDO.' },
  { q: 'Do I need $FREDO to use the platform?', a: 'No. You can build and run bots using USD/USDC. $FREDO unlocks premium features, marketplace access, and fee discounts.' },
];

/* ────────── Component ────────── */

export default function Token() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reserving, setReserving] = useState(false);
  const [reserveError, setReserveError] = useState<string | null>(null);
  const [tweetUrl, setTweetUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Solana wallet
  const { publicKey, connected } = useWallet();

  // Claim data from API
  const { stats } = useClaimStats();
  const { status: claimStatus, completeTask, reserve, isAuthenticated } = useClaimStatus();

  const claimsCurrent = stats?.total_claimed ?? 0;
  const claimsMax = stats?.max_claims ?? 10_000;

  const tasks = claimStatus?.tasks ?? [];
  const completedCount = claimStatus?.completed_count ?? 0;
  const totalTasks = claimStatus?.total_tasks ?? 5;
  const alreadyClaimed = claimStatus?.claimed ?? false;
  const hasBots = claimStatus?.has_bots ?? false;
  const allTasksDone = completedCount === totalTasks;
  const earnedFredo = tasks.reduce((sum, t) => sum + (t.completed ? t.reward : 0), 0);

  const sampleTweet = 'Just built my first AI agent on @aifredochat 🤖\n\nCheck it out: aifredo.chat/bot/MyAgent\n\n#Aifredo $FREDO';

  const copyTweet = () => {
    navigator.clipboard.writeText(sampleTweet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReserve = async () => {
    setReserving(true);
    setReserveError(null);
    try {
      await reserve();
    } catch (err: any) {
      setReserveError(err.message || 'Failed to reserve claim');
    } finally {
      setReserving(false);
    }
  };

  const handleTaskAction = async (taskId: string, proof?: string) => {
    try {
      await completeTask(taskId, proof);
    } catch (err: any) {
      setReserveError(err.message || 'Failed to complete task');
    }
  };

  return (
    <div className="min-h-full bg-[#0A0A0F] text-white">

      <PublicNav cta={{ label: 'Claim $FREDO', to: '#claim' }} />

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-indigo-600/20 via-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-to-l from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-slate-300 font-medium">Claim $FREDO — First 10,000 Bot Creators on Solana</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95] mb-6">
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">The AI Bot Economy.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">Powered by $FREDO.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create a bot on Aifredo. Claim 100 $FREDO — free, on Solana.
            <br className="hidden sm:block" />
            First <span className="text-white font-medium">10,000 users</span> only. Your early access to the AI bot economy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-2xl transition-all text-lg shadow-xl shadow-amber-500/30 hover:shadow-amber-500/40 hover:scale-[1.02]"
            >
              <Gift className="w-5 h-5" />
              Create Bot & Claim $FREDO
            </Link>
            <a
              href="#tokenomics"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl transition-all"
            >
              <ChevronDown className="w-4 h-4" />
              View Tokenomics
            </a>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '1B', label: 'Total Supply', sub: '$FREDO' },
              { value: '10,000', label: 'Free Claims', sub: '100 each' },
              { value: '$0', label: 'Claim Cost', sub: 'Just create a bot' },
              { value: 'SOL', label: 'Blockchain', sub: 'SPL Token' },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
                <p className="text-xl sm:text-2xl font-black text-white">{s.value}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</p>
                <p className="text-[10px] text-slate-600">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Free Claim ───── */}
      <section className="border-t border-white/5" id="claim">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/5 border border-amber-500/20 rounded-2xl p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                  {alreadyClaimed ? <CheckCircle2 className="w-7 h-7 text-white" /> : <Gift className="w-7 h-7 text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2">
                    {alreadyClaimed ? '100 $FREDO Reserved!' : 'Claim 100 $FREDO Free'}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {alreadyClaimed ? (
                      <>Your reservation is locked in. Tokens will be distributed to your wallet when the token launches.</>
                    ) : (
                      <>Complete 5 tasks to earn 100 $FREDO — no purchase required. First 10,000 users only.</>
                    )}
                  </p>
                </div>
              </div>

              {/* Claim progress */}
              <div className="bg-black/20 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Reservations</span>
                  <span className="text-white font-bold">{claimsCurrent.toLocaleString()} / {claimsMax.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
                    style={{ width: `${Math.max((claimsCurrent / claimsMax) * 100, 0.5)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600">{(claimsMax - claimsCurrent).toLocaleString()} spots remaining · 1,000,000 $FREDO allocated (0.1% of supply)</p>
              </div>

              {/* Already claimed — show confirmation */}
              {alreadyClaimed && claimStatus?.claim && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-300">Reservation Confirmed</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <p>
                      <span className="text-slate-500">Wallet:</span>{' '}
                      <span className="font-mono text-white">
                        {claimStatus.claim.wallet_address.slice(0, 6)}...{claimStatus.claim.wallet_address.slice(-4)}
                      </span>
                    </p>
                    <p>
                      <span className="text-slate-500">Amount:</span>{' '}
                      <span className="text-white font-bold">{claimStatus.claim.amount.toLocaleString()} $FREDO</span>
                    </p>
                    <p>
                      <span className="text-slate-500">Status:</span>{' '}
                      <span className="text-amber-400 font-medium capitalize">{claimStatus.claim.status}</span>
                      {claimStatus.claim.status === 'reserved' && ' — tokens will be sent at launch'}
                    </p>
                    <p>
                      <span className="text-slate-500">Reserved:</span>{' '}
                      <span className="text-white">{new Date(claimStatus.claim.reserved_at).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Task checklist */}
              {!alreadyClaimed && (
                <>
                  {!isAuthenticated ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-slate-400 mb-4">Sign up and complete 5 tasks to earn your $FREDO.</p>
                      <Link
                        to="/onboarding"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                      >
                        Create Bot & Claim $FREDO
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Task progress */}
                      <div className="bg-black/20 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-400">Tasks completed</span>
                          <span className="text-white font-bold">{completedCount}/{totalTasks} · {earnedFredo} $FREDO earned</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                            style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Tasks */}
                      <div className="space-y-3 mb-6">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`rounded-xl px-4 py-3 ${
                              task.completed
                                ? 'bg-emerald-500/10 border border-emerald-500/20'
                                : 'bg-white/[0.03] border border-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                task.completed ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                              }`}>
                                {task.completed
                                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  : <Coins className="w-4 h-4 text-amber-400" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">{task.label}</p>
                                <p className="text-xs text-amber-400 font-semibold">+{task.reward} $FREDO</p>
                              </div>
                              <div className="shrink-0">
                                {task.completed ? (
                                  <span className="text-xs text-emerald-400 font-medium">Done</span>
                                ) : task.id === 'wallet' ? (
                                  !connected ? (
                                    <WalletMultiButton className="!bg-gradient-to-r !from-indigo-600 !to-violet-600 hover:!from-indigo-500 hover:!to-violet-500 !text-white !font-bold !rounded-lg !transition-all !h-auto !py-2 !px-4 !text-xs" />
                                  ) : (
                                    <button
                                      onClick={() => handleTaskAction('wallet', publicKey!.toBase58())}
                                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
                                    >
                                      Verify Wallet
                                    </button>
                                  )
                                ) : task.id === 'bot' ? (
                                  !hasBots ? (
                                    <Link
                                      to="/onboarding"
                                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-all inline-block"
                                    >
                                      Create Bot
                                    </Link>
                                  ) : (
                                    <button
                                      onClick={() => handleTaskAction('bot')}
                                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all"
                                    >
                                      Verify
                                    </button>
                                  )
                                ) : task.id === 'telegram' ? (
                                  <button
                                    onClick={() => { window.open('https://t.me/AiFredoChannel', '_blank'); handleTaskAction('telegram'); }}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-all"
                                  >
                                    <Send className="w-3 h-3" />
                                    Join
                                  </button>
                                ) : task.id === 'x_follow' ? (
                                  <button
                                    onClick={() => { window.open('https://x.com/aifredochat', '_blank'); handleTaskAction('x_follow'); }}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-all"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Follow
                                  </button>
                                ) : null}
                              </div>
                            </div>
                            {task.id === 'tweet' && !task.completed && (
                              <div className="flex items-center gap-2 mt-3 ml-12">
                                <input
                                  type="text"
                                  value={tweetUrl}
                                  onChange={(e) => setTweetUrl(e.target.value)}
                                  placeholder="Paste your tweet URL"
                                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                                />
                                <button
                                  onClick={() => { if (tweetUrl.trim()) handleTaskAction('tweet', tweetUrl.trim()); }}
                                  disabled={!tweetUrl.trim()}
                                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all shrink-0"
                                >
                                  Submit
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Sample tweet */}
                      <div className="bg-black/20 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500 font-medium">Sample tweet — copy & post</span>
                          <button
                            onClick={copyTweet}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">{sampleTweet}</p>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Error message */}
              {reserveError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-xs text-red-300">{reserveError}</p>
                </div>
              )}

              {/* Claim button — all tasks must be done */}
              {!alreadyClaimed && isAuthenticated && (
                <button
                  onClick={handleReserve}
                  disabled={reserving || !allTasksDone}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  {reserving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Reserving...
                    </>
                  ) : allTasksDone ? (
                    <>
                      <Gift className="w-5 h-5" />
                      Claim 100 $FREDO
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Complete all {totalTasks} tasks to claim
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Token Sale — Coming Soon ───── */}
      <section className="border-t border-white/5" id="sale">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600/20 border border-indigo-500/20 rounded-full mb-6">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Coming Soon</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">Token Sale — 3 Rounds</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
                100,000,000 $FREDO (10% of supply) will be available across 3 sale rounds via{' '}
                <a href="https://docs.meteora.ag/overview/other-products/presale-vault/what-is-presale-vault" target="_blank" rel="noopener" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  Meteora Presale Vault
                </a> on Solana. Claim your $FREDO first to get whitelisted for Round 1.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { round: 'Round 1 — Seed', tokens: '10M', price: '$0.005', mode: 'Fixed Price', access: 'Whitelist', gradient: 'from-emerald-500 to-teal-600' },
                  { round: 'Round 2 — Community', tokens: '30M', price: '$0.005–0.01', mode: 'Dynamic (Prorata)', access: 'Open', gradient: 'from-indigo-500 to-violet-600' },
                  { round: 'Round 3 — Public', tokens: '60M', price: '$0.017–0.05', mode: 'Dynamic (Prorata)', access: 'Open', gradient: 'from-amber-500 to-orange-600' },
                ].map((r) => (
                  <div key={r.round} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-left">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${r.gradient} flex items-center justify-center mb-3 opacity-60`}>
                      <Coins className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{r.round}</p>
                    <p className="text-xs text-slate-500">{r.tokens} tokens · {r.price}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{r.mode} · {r.access}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-600">
                Round 1 filling guarantees DEX listing · Audited by{' '}
                <a href="https://github.com/MeteoraAg/audits" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">Meteora</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Two Layers ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Two Layers. One Economy.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Infrastructure runs on stables. Value runs on $FREDO.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                <CircleDollarSign className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Infrastructure Layer</h3>
              <p className="text-sm text-slate-500 mb-4">Pay for what you use — hosting, messages, compute.</p>
              <div className="space-y-2">
                {['USDC / Fiat payments', 'API call metering', 'Bot hosting costs', 'Channel fees'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-8 hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">$FREDO Value Layer</h3>
              <p className="text-sm text-slate-400 mb-4">Unlock, earn, and grow in the bot economy.</p>
              <div className="space-y-2">
                {['Marketplace access', 'Premium feature tiers', 'Creator rewards', 'Fee discounts & governance'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-indigo-300">
                    <div className="w-1 h-1 rounded-full bg-indigo-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Spend / Hold / Earn ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Spend. Hold. Earn.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Three ways to use $FREDO — each one makes the ecosystem stronger.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShoppingBag, title: 'Spend', gradient: 'from-emerald-500 to-teal-600', items: ['List bots on marketplace', 'Buy premium templates', 'Promote to Featured', 'Unlock advanced skills'] },
              { icon: Lock, title: 'Hold', gradient: 'from-indigo-500 to-violet-600', items: ['Unlock tier benefits', 'Custom domains & white-label', 'Fee discounts up to 15%', 'Revenue share & governance'] },
              { icon: TrendingUp, title: 'Earn', gradient: 'from-amber-500 to-orange-600', items: ['Create popular bots', 'Sell templates', 'Refer new users', 'Community contributions'] },
            ].map((card) => (
              <div key={card.title} className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <div className="space-y-2.5">
                  {card.items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <Zap className="w-3 h-3 text-slate-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Staking Tiers ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Hold to Unlock</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              The more $FREDO you hold, the more you can do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all ${
                  i === 1 ? 'sm:scale-[1.02] border-indigo-500/20' : ''
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Popular
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}>
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                <p className="text-2xl font-black text-white mb-4">
                  {tier.amount}
                  <span className="text-sm font-medium text-slate-500 ml-1">$FREDO</span>
                </p>
                <div className="space-y-2">
                  {tier.unlocks.map((u) => (
                    <div key={u} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-indigo-400" />
                      {u}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Tokenomics ───── */}
      <section className="border-t border-white/5" id="tokenomics">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Tokenomics</h2>
            <p className="text-slate-400">
              1,000,000,000 $FREDO — transparent allocation, on-chain verifiable.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Bar */}
            <div className="flex rounded-xl overflow-hidden h-8 mb-8">
              {TOKENOMICS.map((t) => (
                <div
                  key={t.label}
                  className={`${t.color} transition-all hover:opacity-90`}
                  style={{ width: `${t.pct}%` }}
                  title={`${t.label}: ${t.pct}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TOKENOMICS.map((t) => (
                <div key={t.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-sm ${t.color} shrink-0`} />
                  <div>
                    <p className="text-sm text-white font-medium">{t.pct}%</p>
                    <p className="text-[10px] text-slate-500">{t.label}</p>
                    <p className="text-[10px] text-slate-600">{t.tokens}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vesting summary */}
            <div className="mt-10 bg-white/[0.03] border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Timer className="w-4 h-4 text-indigo-400" />
                Vesting & Lockups
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Community Claims', detail: 'Unlocked immediately', color: 'text-amber-400' },
                  { label: 'Sale Round 1', detail: '25% at TGE → 75% vests over 90 days', color: 'text-emerald-400' },
                  { label: 'Sale Round 2', detail: '50% at TGE → 50% vests over 60 days', color: 'text-indigo-400' },
                  { label: 'Sale Round 3', detail: '100% unlocked at TGE', color: 'text-amber-400' },
                  { label: 'Team & Founders', detail: '6-month cliff → 2-year linear vest', color: 'text-blue-400' },
                  { label: 'DEX Liquidity', detail: 'LP locked for 12 months', color: 'text-cyan-400' },
                  { label: 'Development Fund', detail: '12-month linear release', color: 'text-violet-400' },
                ].map((v) => (
                  <div key={v.label} className="flex items-center justify-between">
                    <span className="text-slate-400">{v.label}</span>
                    <span className={`font-medium ${v.color}`}>{v.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buyback & Burn */}
            <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold">Buyback & Burn</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                10% of all platform fees (in USDC) buy $FREDO from the open market.
                50% distributed to Partner-tier holders. 50% burned permanently — reducing supply over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── How It Connects ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">How It All Connects</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { step: '01', icon: Bot, title: 'Create a Bot', desc: 'Build an AI bot in minutes — name, model, channel, system prompt. No code.' },
              { step: '02', icon: Gift, title: 'Claim $FREDO', desc: 'Complete 5 tasks and claim 100 $FREDO. Free. Yours to keep.' },
              { step: '03', icon: Zap, title: 'Launch & Share', desc: 'Deploy to Telegram, embed on your website, share the public link.' },
              { step: '04', icon: ShoppingBag, title: 'Monetize', desc: 'Charge end users, sell bot templates, earn $FREDO from usage rewards.' },
              { step: '05', icon: TrendingUp, title: 'Scale', desc: 'Hold $FREDO to unlock white-label, API access, fee discounts. Build a business.' },
            ].map((s, i) => (
              <div key={s.step} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  {i < 4 && <div className="w-px flex-1 bg-white/5 mt-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Step {s.step}</p>
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="border-t border-white/5">
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

      {/* ───── CTA ───── */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">The agent economy starts here.</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
            Create your first bot. Claim 100 $FREDO. Be one of the first 10,000.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-2xl text-lg transition-all shadow-xl shadow-amber-500/30 hover:shadow-amber-500/40 hover:scale-[1.02]"
          >
            <Gift className="w-5 h-5" />
            Create Bot & Claim $FREDO
          </Link>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="border-t border-white/5 bg-[#08080D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <img src="/aifredo-logo.svg" alt="Aifredo" className="w-7 h-7 rounded-lg" />
              <span className="font-bold text-sm">Aifredo</span>
              <span className="text-xs text-slate-600 ml-2">Build. Launch. Earn.</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-slate-300 transition-colors">Platform</Link>
              <a href="#tokenomics" className="hover:text-slate-300 transition-colors">Tokenomics</a>
              <a href="https://github.com/MeteoraAg/presale-sdk" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">Meteora SDK</a>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-700 mt-8">
            $FREDO is a utility token. It is not an investment product. Presale powered by Meteora on Solana. Please review our terms before participating.
          </p>
        </div>
      </footer>
    </div>
  );
}
