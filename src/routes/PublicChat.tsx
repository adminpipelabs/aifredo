import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { PublicNav } from '../components/layout/PublicNav';
import { useMessageLimit } from '../hooks/useMessageLimit';
import { MessageCounter, UpgradePrompt } from '../components/chat/UpgradePrompt';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || '';
const GATEWAY_TOKEN = import.meta.env.VITE_GATEWAY_TOKEN || '';

function extractText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part: unknown) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) return (part as { text: string }).text;
        return '';
      })
      .join('');
  }
  return '';
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  streaming?: boolean;
}

interface BotInfo {
  id: string;
  name: string;
  persona: string;
  model: string;
  channel: string;
  status: string;
}

export default function PublicChat() {
  const { botId } = useParams();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';
  const [bot, setBot] = useState<BotInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const { remaining, isLimited, limit, increment } = useMessageLimit();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const streamBufferRef = useRef('');
  const reqCounterRef = useRef(0);

  const nextId = useCallback(() => `req-${++reqCounterRef.current}-${Date.now()}`, []);

  const connectGateway = useCallback(() => {
    if (!GATEWAY_URL || !GATEWAY_TOKEN) return;
    const ws = new WebSocket(GATEWAY_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'req', id: nextId(), method: 'connect',
        params: {
          minProtocol: 3, maxProtocol: 3,
          client: { id: 'webchat', version: '1.0.0', platform: 'web', mode: 'webchat' },
          role: 'operator', scopes: ['operator.read', 'operator.write'],
          auth: { token: GATEWAY_TOKEN },
          locale: navigator.language || 'en-US',
        },
      }));
    };

    ws.onmessage = (e) => {
      try {
        const frame = JSON.parse(e.data);
        if (frame.type === 'res' && frame.ok !== undefined) {
          if (frame.ok) {
            setWsConnected(true);
          } else {
            console.warn('[PublicChat] gateway rejected connect:', frame.error);
          }
        }
        if (frame.type === 'event' && frame.event === 'chat') {
          const evt = frame.payload;
          if (evt.state === 'delta' && evt.message?.content) {
            streamBufferRef.current += extractText(evt.message.content);
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.streaming) return [...prev.slice(0, -1), { ...last, text: streamBufferRef.current }];
              return [...prev, { id: `bot-${Date.now()}`, role: 'bot', text: streamBufferRef.current, streaming: true }];
            });
          } else if (evt.state === 'final') {
            const finalText = (evt.message?.content ? extractText(evt.message.content) : '') || streamBufferRef.current;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.streaming) return [...prev.slice(0, -1), { ...last, text: finalText, streaming: false }];
              return prev;
            });
            streamBufferRef.current = '';
            setIsTyping(false);
          } else if (evt.state === 'error') {
            setMessages(prev => [...prev, { id: `err-${Date.now()}`, role: 'bot', text: evt.errorMessage || 'Something went wrong.' }]);
            streamBufferRef.current = '';
            setIsTyping(false);
          }
        }
      } catch { /* ignore */ }
    };

    ws.onclose = () => setWsConnected(false);
    ws.onerror = () => setWsConnected(false);
  }, [botId, nextId]);

  useEffect(() => {
    if (!botId) { setError('No bot ID provided'); setLoading(false); return; }
    fetch(`/api/bots/public/${botId}`)
      .then((r) => { if (!r.ok) throw new Error('Bot not found'); return r.json(); })
      .then((data) => {
        setBot(data.bot);
        setMessages([{ id: 'welcome', role: 'bot', text: `Hi! I'm ${data.bot.name}. How can I help you today?` }]);
      })
      .catch(() => setError('Bot not found or unavailable'))
      .finally(() => setLoading(false));
  }, [botId]);

  useEffect(() => { connectGateway(); return () => { wsRef.current?.close(); }; }, [connectGateway]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || !bot || isTyping || isLimited) return;
    increment();
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: text.trim() }]);
    setInput('');
    setIsTyping(true);
    streamBufferRef.current = '';

    if (wsConnected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'req', id: nextId(), method: 'chat.send',
        params: { sessionKey: 'agent:main:main', message: text.trim(), idempotencyKey: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}` },
      }));
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: `I'm having trouble connecting right now. Please try again in a moment!` }]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0A0F]">
        {!isEmbed && <PublicNav />}
        <div className="min-h-[100dvh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !bot) {
    return (
      <div className="min-h-[100dvh] bg-[#0A0A0F]">
        {!isEmbed && <PublicNav />}
        <div className="min-h-[100dvh] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Bot Not Found</h1>
          <p className="text-slate-300 text-sm mb-6">
            This bot doesn't exist or is no longer available.
          </p>
          {!isEmbed && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Visit Aifredo
            </Link>
          )}
        </div>
        </div>
      </div>
    );
  }

  const suggestions = ['Hello!', 'What can you do?', 'Tell me about yourself'];

  return (
    <div className={`flex flex-col bg-[#0A0A0F] ${isEmbed ? 'h-full' : 'min-h-[100dvh]'}`}>
      {!isEmbed && <PublicNav />}
      {/* Bot Header */}
      <header className={`flex-shrink-0 border-b border-white/10 bg-white/[0.03] backdrop-blur-lg ${!isEmbed ? 'mt-16' : ''}`}>
        <div className={`${isEmbed ? 'px-3 py-2' : 'max-w-2xl mx-auto px-4 py-3'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`${isEmbed ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-600/20`}>
              <Bot className={`${isEmbed ? 'w-4 h-4' : 'w-5 h-5'} text-white`} />
            </div>
            <div>
              <h1 className={`${isEmbed ? 'text-sm' : 'text-base'} font-semibold text-white leading-tight`}>{bot.name}</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
          {isEmbed ? (
            <button
              onClick={() => window.parent?.postMessage('af-close-widget', '*')}
              className="p-1.5 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              title="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-300 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>Powered by <span className="font-medium text-slate-300">Aifredo</span></span>
            </Link>
          )}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className={`${isEmbed ? 'px-3 py-3' : 'max-w-2xl mx-auto px-4 py-4'} space-y-4`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-md'
                    : 'bg-white/[0.03] text-slate-200 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/[0.03] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {isLimited && <UpgradePrompt remaining={remaining} limit={limit} isEmbed={isEmbed} />}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Quick suggestions (only when few messages) */}
      {messages.length <= 2 && (
        <div className="flex-shrink-0 border-t border-white/5">
          <div className={`${isEmbed ? 'px-3' : 'max-w-2xl mx-auto px-4'} py-2 flex gap-2 overflow-x-auto`}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="shrink-0 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.05] text-slate-300 text-xs rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <footer className="flex-shrink-0 border-t border-white/10 bg-[#0A0A0F] sticky bottom-0">
        <MessageCounter remaining={remaining} limit={limit} />
        <form onSubmit={handleSubmit} className={`${isEmbed ? 'px-3 py-2' : 'max-w-2xl mx-auto px-4 py-3'} flex gap-2`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLimited ? 'Daily limit reached' : 'Type a message...'}
            disabled={isTyping || isLimited}
            className={`flex-1 px-4 ${isEmbed ? 'py-2.5 text-xs' : 'py-3 text-sm'} bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping || isLimited}
            className={`${isEmbed ? 'w-10 h-10' : 'w-12 h-12'} flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:bg-white/[0.03] text-white disabled:text-slate-400 rounded-xl transition-colors shrink-0`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        {!isEmbed && (
          <div className="max-w-2xl mx-auto px-4 pb-2">
            <p className="text-[10px] text-slate-400 text-center">
              Conversations may be logged. This bot is powered by AI and may make mistakes.
            </p>
          </div>
        )}
      </footer>
    </div>
  );
}
