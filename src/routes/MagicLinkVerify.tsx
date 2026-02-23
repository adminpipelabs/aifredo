import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { api } from '../api/client';
import { PublicNav } from '../components/layout/PublicNav';

export default function MagicLinkVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('Invalid or missing login link.');
      return;
    }

    (async () => {
      try {
        const res = await api.post('/api/auth/verify-magic-link', { token }) as {
          token: string;
          user: { id: string; name: string; email: string };
        };

        // Store auth
        localStorage.setItem('af-token', res.token);
        localStorage.setItem('af-user', JSON.stringify(res.user));

        setStatus('success');

        // Redirect to dashboard after a brief moment
        setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'Login link is invalid or expired.');
      }
    })();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-full bg-[#0A0A0F]">
      <PublicNav minimal />
      <div className="min-h-full flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md text-center">

        {status === 'verifying' && (
          <>
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white">Signing you in...</h1>
            <p className="text-slate-300 mt-1">Verifying your login link</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-14 h-14 rounded-full bg-emerald-600/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-white">You're in!</h1>
            <p className="text-slate-300 mt-1">Redirecting to your dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-7 h-7 text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Link expired or invalid</h1>
            <p className="text-slate-300 mt-1">{error}</p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition-colors"
            >
              Request a new link
            </Link>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
