import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Wallet, Check, Bot, MessageSquare, Plug, Zap, CreditCard } from 'lucide-react';
import { api } from '../api/client';

const topups = [
  { amount: 500, display: '$5', label: '~1,500 messages', id: 'topup-5' },
  { amount: 1000, display: '$10', label: '~3,300 messages', id: 'topup-10', popular: true },
  { amount: 2500, display: '$25', label: '~8,300 messages', id: 'topup-25' },
];

const costBreakdown = [
  { icon: MessageSquare, label: 'AI messages', cost: '$0.003 each (20/day free)' },
  { icon: Bot, label: 'Bot creation & hosting', cost: 'Free' },
  { icon: Plug, label: 'Channels (Telegram, Discord, etc.)', cost: 'Free' },
];

export default function TopUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTopup, setSelectedTopup] = useState(1000);
  const [balanceCents, setBalanceCents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isLoggedIn = !!localStorage.getItem('af-token');

  useEffect(() => {
    if (isLoggedIn) api.get('/api/payments/balance').then((res: any) => setBalanceCents(res.balance_cents ?? 0)).catch(() => {});
  }, [isLoggedIn]);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId && isLoggedIn) {
      setLoading(true);
      api.post('/api/payments/verify', { session_id: sessionId })
        .then((res: any) => {
          setBalanceCents(res.balance_cents);
          setSuccess(res.already_credited ? 'Funds already added.' : `$${(res.credited / 100).toFixed(2)} added!`);
          window.history.replaceState({}, '', '/topup');
        })
        .catch((err: any) => setError(err.message || 'Failed to verify'))
        .finally(() => setLoading(false));
    }
  }, [searchParams, isLoggedIn]);

  const handleTopUp = async () => {
    if (!isLoggedIn) { navigate('/activate'); return; }
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/payments/create-checkout', { amount_cents: selectedTopup }) as { url: string };
      if (res.url) window.location.href = res.url;
      else { setError('Failed to create payment session'); setLoading(false); }
    } catch (err: any) { setError(err.message || 'Payment system unavailable.'); setLoading(false); }
  };

  return (
    <div className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </button>
        <h1 className="text-2xl font-bold text-white">Add Funds</h1>
        <p className="text-sm text-slate-500 mt-1">Top up your balance. Your bots consume it while they run.</p>
      </div>

      {success && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/15 rounded-xl p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm text-emerald-300 font-medium">{success}</p>
            <p className="text-xs text-slate-500 mt-0.5">Current balance: <strong className="text-white">${(balanceCents / 100).toFixed(2)}</strong></p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center"><Wallet className="w-5 h-5 text-indigo-400" /></div>
            <div>
              <p className="text-xs text-slate-500">Current balance</p>
              <p className={`text-xl font-bold ${balanceCents > 0 ? 'text-white' : 'text-slate-500'}`}>${(balanceCents / 100).toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-3">Choose amount</h2>
            <div className="grid grid-cols-3 gap-3">
              {topups.map((t) => (
                <button key={t.id} onClick={() => setSelectedTopup(t.amount)}
                  className={`relative p-4 rounded-xl border text-center transition-all ${
                    selectedTopup === t.amount ? 'bg-indigo-600/20 border-indigo-500/30 ring-1 ring-indigo-500/20' : 'bg-white/[0.03] border-white/5 hover:border-white/10'
                  }`}>
                  {t.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0 bg-indigo-600 text-white text-[9px] font-medium rounded-full">Popular</div>}
                  <p className="text-2xl font-bold text-white">{t.display}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

          <button onClick={handleTopUp} disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all">
            <CreditCard className="w-5 h-5" />
            {loading ? 'Processing...' : `Add ${topups.find(t => t.amount === selectedTopup)?.display} to Balance`}
          </button>
          <p className="text-center text-xs text-slate-500">Secure payment via Stripe. Balance never expires.</p>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 sticky top-6">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> What costs what</h3>
            <div className="space-y-4">
              {costBreakdown.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5"><item.icon className="w-4 h-4 text-slate-500" /></div>
                  <div><p className="text-sm text-white font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.cost}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <p className="text-xs text-slate-500 mb-2">Example: $5 gets you</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500"><span>~1,500 AI messages</span><span>$0.003 ea</span></div>
                <div className="flex justify-between text-slate-500"><span>Bot hosting</span><span>Free</span></div>
                <div className="flex justify-between text-slate-500"><span>Telegram, Discord, Slack</span><span>Free</span></div>
                <div className="flex justify-between text-white font-medium pt-1 border-t border-white/5"><span>20 msgs/day</span><span>Free forever</span></div>
              </div>
              <p className="text-[10px] text-slate-600 mt-2">Or bring your own API key for unlimited at zero markup</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['No subscription', 'Pause anytime', 'No penalty'].map((t) => (
                <span key={t} className="flex items-center gap-1 text-[10px] text-emerald-400"><Check className="w-3 h-3" /> {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
