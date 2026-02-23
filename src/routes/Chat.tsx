import { useEffect, useRef, useState } from 'react';
import { useGateway } from '../hooks/useGateway';
import { useMessageLimit } from '../hooks/useMessageLimit';
import { MessageCounter, UpgradePrompt } from '../components/chat/UpgradePrompt';
import { Wifi, WifiOff, Send, Square, Bot, Loader2 } from 'lucide-react';
import { useBots } from '../hooks/useBots';
import type { Message } from '../types';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://5.161.64.209:18789';
const GATEWAY_TOKEN = import.meta.env.VITE_GATEWAY_TOKEN || '';

function Bubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center px-4 my-2">
        <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 sm:px-6`}>
      <div className={`flex items-end gap-2 max-w-[80%] sm:max-w-[65%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0 mb-0.5">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        )}
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed rounded-2xl ${
            isUser
              ? 'bg-indigo-600 rounded-br-md'
              : 'bg-white/5 border border-white/5 rounded-bl-md'
          }`}
          style={isUser ? { color: '#ffffff' } : { color: 'var(--text-primary)' }}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.content}
            {message.streaming && (
              <span className="inline-block w-1.5 h-4 bg-current opacity-50 animate-pulse ml-0.5 align-text-bottom rounded-sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ botName }: { botName: string }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-lg font-semibold text-white mb-1">{botName}</h2>
        <p className="text-sm text-slate-500">Send a message to start chatting</p>
      </div>
    </div>
  );
}

function ChatInput({ onSend, onAbort, isStreaming, disabled }: {
  onSend: (text: string) => void;
  onAbort: () => void;
  isStreaming: boolean;
  disabled: boolean;
}) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  }, [text]);

  const submit = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  return (
    <div className="border-t border-white/5 px-4 sm:px-6 py-3 safe-bottom" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
          placeholder="Message..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 text-[15px] leading-relaxed transition-all disabled:opacity-50"
        />
        {isStreaming ? (
          <button
            onClick={onAbort}
            className="shrink-0 w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full transition-colors"
            style={{ color: '#ffffff' }}
            aria-label="Stop"
          >
            <Square className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!text.trim() || disabled}
            className="shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/5 disabled:text-slate-600 rounded-full transition-colors"
            style={{ color: (!text.trim() || disabled) ? undefined : '#ffffff' }}
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Chat() {
  const { messages, connection, isStreaming, connect, sendMessage, abortChat } = useGateway();
  const { selectedBot } = useBots();
  const { remaining, isLimited, limit, increment } = useMessageLimit();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isConnected = connection.status === 'connected';
  const isConnecting = connection.status === 'connecting';
  const botName = selectedBot?.name || 'AiFredo Intern';

  useEffect(() => {
    if (connection.status === 'disconnected' && GATEWAY_TOKEN) connect(GATEWAY_URL, GATEWAY_TOKEN);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSend = (text: string) => {
    if (isLimited) return;
    increment();
    sendMessage(text);
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white">{botName}</h1>
            <div className="flex items-center gap-1.5">
              {isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-400 font-medium">Online</span>
                </>
              ) : isConnecting ? (
                <>
                  <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
                  <span className="text-xs text-amber-400">Connecting...</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="text-xs text-slate-500">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
        {isConnected && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Live</span>
          </div>
        )}
        {!isConnected && !isConnecting && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
            <WifiOff className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Disconnected</span>
          </div>
        )}
      </div>

      {isConnected && <MessageCounter remaining={remaining} limit={limit} />}

      {isConnected ? (
        isLimited ? (
          <div className="flex-1 overflow-y-auto">
            <UpgradePrompt remaining={remaining} limit={limit} />
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                <EmptyState botName={botName} />
              ) : (
                <div className="py-4 space-y-3 max-w-3xl mx-auto">
                  {messages.map((msg) => (
                    <Bubble key={msg.id} message={msg} />
                  ))}
                  {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex justify-start px-4 sm:px-6">
                      <div className="flex items-end gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                          <Bot className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <div className="px-4 py-3 bg-white/5 rounded-2xl rounded-bl-md">
                          <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <ChatInput onSend={handleSend} onAbort={abortChat} isStreaming={isStreaming} disabled={false} />
          </>
        )
      ) : (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              {isConnecting
                ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                : <WifiOff className="w-8 h-8 text-slate-500" />
              }
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">
              {isConnecting ? 'Connecting...' : 'Not connected'}
            </h2>
            <p className="text-sm text-slate-500">
              {isConnecting
                ? 'Setting up a live connection to your bot'
                : connection.error || 'Unable to connect to the AI gateway.'
              }
            </p>
            {!isConnecting && GATEWAY_TOKEN && (
              <button
                onClick={() => connect(GATEWAY_URL, GATEWAY_TOKEN)}
                className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-sm font-medium rounded-lg transition-colors"
                style={{ color: '#ffffff' }}
              >
                Retry connection
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
