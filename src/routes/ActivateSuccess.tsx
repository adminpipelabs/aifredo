import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Check, AlertCircle } from 'lucide-react';

export default function ActivateSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');
  const [data, setData] = useState<{ balance_cents: number; bots_migrated: number } | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) { setStatus('error'); setError('No session ID found'); return; }
    const drafts = JSON.parse(localStorage.getItem('af-draft-bots') || '[]');
    fetch('/api/payments/activate-verify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, draft_bots: drafts }),
    })
      .then(async (res) => { const json = await res.json(); if (!res.ok) throw new Error(json.message || 'Verification failed'); return json; })
      .then((result) => {
        if (result.token) { localStorage.setItem('af-token', result.token); localStorage.setItem('af-user', JSON.stringify(result.user)); }
        localStorage.removeItem('af-draft-bots');
        setData({ balance_cents: result.balance_cents, bots_migrated: result.bots_migrated || 0 });
        setStatus('success');
        setTimeout(() => navigate('/dashboard'), 2500);
      })
      .catch((err) => { setStatus('error'); setError(err.message || 'Something went wrong'); });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-full flex items-center justify-center bg-[#0A0A0F] p-4">
      <div className="w-full max-w-md text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Verifying payment...</h1>
            <p className="text-slate-400 text-sm">Setting up your account and activating your bots.</p>
          </>
        )}
        {status === 'success' && data && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">You're all set!</h1>
            <p className="text-slate-400 text-sm mb-6">
              Balance: <strong className="text-white">${(data.balance_cents / 100).toFixed(2)}</strong>
              {data.bots_migrated > 0 && <> · {data.bots_migrated} bot{data.bots_migrated > 1 ? 's' : ''} activated</>}
            </p>
            <p className="text-xs text-slate-500">Redirecting to dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-red-400 text-sm mb-6">{error}</p>
            <button onClick={() => navigate('/activate')}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg transition-all">
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
