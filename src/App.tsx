import { Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthProvider, AuthProvider } from './hooks/useAuth';
import { useBotsProvider, BotsProvider } from './hooks/useBots';
import { SolanaProvider } from './components/SolanaProvider';
import { ThemeProvider } from './hooks/useTheme';
import { AppShell } from './components/layout/AppShell';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Onboarding from './routes/Onboarding';
import Dashboard from './routes/Dashboard';
import Chat from './routes/Chat';
import Integrations from './routes/Integrations';
import Analytics from './routes/Analytics';
import BotSettings from './routes/BotSettings';
import Activate from './routes/Activate';
import ActivateSuccess from './routes/ActivateSuccess';
import TopUp from './routes/TopUp';
import AgentSchool from './routes/AgentSchool';
import TermsOfService from './routes/TermsOfService';
import PrivacyPolicy from './routes/PrivacyPolicy';
import CookiePolicy from './routes/CookiePolicy';
import MagicLinkVerify from './routes/MagicLinkVerify';
import PublicChat from './routes/PublicChat';
import Token from './routes/Token';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'monospace', color: '#ef4444', background: '#0a0a0f', minHeight: '100vh' }}>
          <h2 style={{ color: '#f87171' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, marginTop: 12 }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 11, color: '#94a3b8', marginTop: 8 }}>{this.state.error.stack}</pre>
          <button onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            style={{ marginTop: 16, padding: '8px 16px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasToken = !!localStorage.getItem('af-token');
  if (!hasToken) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppContent() {
  const botsCtx = useBotsProvider();

  return (
    <BotsProvider value={botsCtx}>
      <AppShell />
    </BotsProvider>
  );
}

function AppRoutes() {
  const authCtx = useAuthProvider();

  return (
    <AuthProvider value={authCtx}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/activate/success" element={<ActivateSuccess />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/auth/verify" element={<MagicLinkVerify />} />
        <Route path="/bot/:botId" element={<PublicChat />} />
        <Route path="/token" element={<Token />} />

        {/* Sandbox + authenticated routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppContent />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<BotSettings />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/agent-school" element={<AgentSchool />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <SolanaProvider>
            <AppRoutes />
          </SolanaProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
