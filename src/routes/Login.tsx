import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { api } from '../api/client';
import { PublicNav } from '../components/layout/PublicNav';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/api/auth/magic-link', { email });
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#0A0A0F]">
      <PublicNav />
      <div className="min-h-full flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">

          {!sent ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                <p className="text-slate-400 mt-1">Enter your email and we'll send you a sign-in link.</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" required disabled={loading} autoFocus
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
                    />
                  </div>
                </div>

                {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                <button type="submit" disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </form>

              <p className="text-center text-slate-500 text-sm mt-6">
                No account yet?{' '}
                <Link to="/onboarding" className="text-indigo-400 hover:text-indigo-300 transition-colors">Create a bot</Link>
              </p>
            </>
          ) : (
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/20 mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
              <p className="text-slate-400 mb-1">
                We sent a sign-in link to
              </p>
              <p className="text-white font-medium mb-6">{email}</p>
              <p className="text-slate-500 text-sm mb-6">
                Click the link in the email to sign in. It expires in 15 minutes.
              </p>
              <button
                onClick={() => { setSent(false); setError(''); }}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Use a different email
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
