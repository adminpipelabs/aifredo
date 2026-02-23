import { useState } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';
import type { OnboardingData } from '../../routes/Onboarding';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

function generateBotResponse(userMsg: string, data: OnboardingData): string {
  const name = data.botName || 'Bot';
  const lower = userMsg.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hey there! I'm ${name}. I'm all set up and ready to help. What can I do for you?`;
  }
  if (lower.includes('what can you do') || lower.includes('help')) {
    const skills: string[] = [];
    if (data.channel) skills.push(`chat on ${data.channel}`);
    if (data.integrations?.includes('gmail')) skills.push('manage your emails');
    if (data.integrations?.includes('calendar')) skills.push('check your calendar');
    if (data.integrations?.includes('github')) skills.push('work with GitHub repos');
    if (data.integrations?.includes('browser')) skills.push('browse the web');
    if (data.integrations?.includes('obsidian')) skills.push('search your notes');

    if (skills.length > 0) {
      return `I can ${skills.join(', ')}, and much more. Just ask me anything!`;
    }
    return `I can help with all sorts of tasks — answering questions, managing your day, and more. What do you need?`;
  }
  if (lower.includes('who are you') || lower.includes('your name')) {
    return `I'm ${name}, your ${data.persona} AI assistant powered by ${data.model === 'anthropic' ? 'Claude' : data.model === 'openai' ? 'GPT' : 'a local model'}. Nice to meet you!`;
  }

  const responses = [
    `Got it! I'll work on that. As ${name}, I'm here to help with anything you need.`,
    `Great question! Let me think about that... I'd be happy to help you figure this out.`,
    `Sure thing! That's exactly the kind of thing I'm set up for. Want me to go deeper on this?`,
    `I'm on it. Once I'm fully live, I'll be able to do this 24/7 without you even asking.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

interface Props {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

export function TestChatStep({ data, onNext, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: `Hi! I'm ${data.botName || 'your bot'}. Try talking to me — this is a preview of how I'll respond based on your setup.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = ['Hello!', 'What can you do?', 'Who are you?'];

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(text, data);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white">Test Your Bot</h2>
        <p className="text-slate-400 mt-1 text-sm">
          See how {data.botName || 'your bot'} responds. This is a preview — the real thing connects to your AI model.
        </p>
      </div>

      {/* Chat window */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-white font-medium">{data.botName || 'Your Bot'}</p>
            <p className="text-[10px] text-emerald-400">Preview mode</p>
          </div>
        </div>

        {/* Messages */}
        <div className="px-4 py-4 space-y-3 h-[280px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-indigo-400" />
                  </div>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : 'bg-white/5 text-slate-300 rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-slate-400" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-indigo-400" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/5 rounded-bl-md">
                  <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-slate-400 hover:bg-white/10 transition-colors border border-white/5"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 text-white disabled:text-slate-600 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        This is a simulated preview. Once live, your bot will use {data.model === 'anthropic' ? 'Claude' : data.model === 'openai' ? 'GPT' : 'your chosen model'} for real responses.
      </p>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all">
          Finish Setup
        </button>
      </div>
    </div>
  );
}
