import { useState } from 'react';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { api } from '../../api/client';

interface Props {
  onNext: () => void;
}

export function AccountStep({ onNext }: Props) {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const isLoggedIn = !!localStorage.getItem('af-token');

  if (isLoggedIn) {
    onNext();
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
      if (password.length < 8) { setError('Password must be at least 8 characters'); setLoading(false); return; }

      const res = await api.post('/api/auth/signup', { name: name.trim(), email, password }) as { user: any; token: string };
      localStorage.setItem('af-token', res.token);
      localStorage.setItem('af-user', JSON.stringify(res.user));
      onNext();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/auth/magic-link', { email });
      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'login' && magicLinkSent) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/20 mb-4">
          <CheckCircle className="w-7 h-7 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
        <p className="text-slate-400 mb-1">We sent a sign-in link to</p>
        <p className="text-white font-medium mb-4">{email}</p>
        <p className="text-slate-500 text-sm mb-6">
          Click the link in the email to sign in, then come back here to continue building your bot.
        </p>
        <button
          onClick={() => { setMagicLinkSent(false); setError(''); }}
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 mb-4">
          <UserPlus className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-slate-400 mt-2">
          {mode === 'signup'
            ? 'Quick signup — then we\'ll build your bot.'
            : 'Enter your email and we\'ll send a sign-in link.'}
        </p>
      </div>

      {mode === 'signup' ? (
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Your name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name" autoFocus
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters" required
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Please wait...' : 'Create Account & Continue'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required autoFocus
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      )}

      <p className="text-center text-slate-500 text-sm mt-6">
        {mode === 'signup' ? (
          <>Already have an account?{' '}<button onClick={() => { setMode('login'); setError(''); }} className="text-indigo-400 hover:text-indigo-300 transition-colors">Log in with magic link</button></>
        ) : (
          <>New here?{' '}<button onClick={() => { setMode('signup'); setError(''); }} className="text-indigo-400 hover:text-indigo-300 transition-colors">Create account</button></>
        )}
      </p>
    </div>
  );
}
