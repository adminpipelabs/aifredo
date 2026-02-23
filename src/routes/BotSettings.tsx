import { useState, useEffect } from 'react';
import { Save, Trash2, Key, Eye, EyeOff, Globe, HelpCircle, ChevronDown, Shield, ExternalLink, MessageSquare, CheckCircle2, Share2, Link2, Code2, Copy, Check } from 'lucide-react';
import { useBots } from '../hooks/useBots';
import { useNavigate } from 'react-router-dom';

const CHANNEL_CONFIG: Record<string, { label: string; tokenName: string; placeholder: string; howTo: string; link: string; linkLabel: string }> = {
  telegram: { label: 'Telegram', tokenName: 'Bot Token', placeholder: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz', howTo: 'Message @BotFather on Telegram, type /newbot, follow the prompts, and copy the token it gives you.', link: 'https://t.me/BotFather', linkLabel: 'Open BotFather' },
  whatsapp: { label: 'WhatsApp', tokenName: 'Business API Access Token', placeholder: 'EAABsbCS1i...', howTo: 'Create an app on Meta for Developers, enable WhatsApp Business API, and copy the permanent access token.', link: 'https://developers.facebook.com/apps/', linkLabel: 'Meta Developers' },
  discord: { label: 'Discord', tokenName: 'Bot Token', placeholder: 'MTk4NjIzOT...', howTo: 'Go to the Discord Developer Portal, create an app, add a Bot, and copy the token. Then invite the bot to your server.', link: 'https://discord.com/developers/applications', linkLabel: 'Discord Developers' },
  slack: { label: 'Slack', tokenName: 'Bot OAuth Token', placeholder: 'xoxb-...', howTo: 'Create a Slack App, add Bot Token Scopes (chat:write, app_mentions:read), install to workspace, and copy the Bot User OAuth Token.', link: 'https://api.slack.com/apps', linkLabel: 'Slack API' },
  webchat: { label: 'WebChat', tokenName: '', placeholder: '', howTo: '', link: '', linkLabel: '' },
  signal: { label: 'Signal', tokenName: 'API Key', placeholder: 'Your Signal API bridge key', howTo: 'Set up a Signal CLI REST API bridge, then use the API key from your bridge config.', link: 'https://github.com/bbernhard/signal-cli-rest-api', linkLabel: 'Signal Bot API' },
};

function ShareEmbed({ botId, botName }: { botId: string; botName: string }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const isDraft = botId.startsWith('draft-');
  const chatUrl = `https://aifredo.chat/bot/${botId}`;
  const embedCode = `<script src="https://aifredo.chat/embed.js" data-bot-id="${botId}"></script>`;

  const copy = async (text: string, type: 'link' | 'embed') => {
    await navigator.clipboard.writeText(text);
    if (type === 'link') { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
    else { setCopiedEmbed(true); setTimeout(() => setCopiedEmbed(false), 2000); }
  };

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <Share2 className="w-4 h-4 text-indigo-400" />
        <h3 className="text-white font-semibold">Share & Embed</h3>
      </div>
      <p className="text-xs text-slate-500 mb-5">Let anyone chat with {botName} via a direct link or embed it on your website.</p>

      {isDraft && (
        <div className="bg-amber-500/10 border border-amber-500/15 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-amber-300"><strong>Activate first</strong> — sharing is available once your bot is live.</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="w-3.5 h-3.5 text-slate-500" />
            <label className="text-sm font-medium text-slate-300">Public Chat Link</label>
          </div>
          <p className="text-xs text-slate-500 mb-2">Share this URL — anyone can chat with your bot.</p>
          <div className="flex gap-2">
            <input type="text" value={chatUrl} readOnly className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400 font-mono truncate" />
            <button onClick={() => copy(chatUrl, 'link')} disabled={isDraft}
              className="px-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-slate-600 text-white rounded-xl transition-colors flex items-center gap-1.5 text-sm shrink-0">
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <label className="text-sm font-medium text-slate-300">Website Widget</label>
          </div>
          <p className="text-xs text-slate-500 mb-2">Paste before <code className="bg-white/5 px-1 rounded text-[11px]">&lt;/body&gt;</code> on your website.</p>
          <div className="relative">
            <pre className="px-3 py-2.5 bg-[#0D0D14] text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all leading-relaxed border border-white/5">
              {embedCode}
            </pre>
            <button onClick={() => copy(embedCode, 'embed')} disabled={isDraft}
              className="absolute top-2 right-2 px-2.5 py-1 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-slate-600 text-white text-xs rounded-lg transition-colors flex items-center gap-1">
              {copiedEmbed ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedEmbed ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-3 bg-indigo-600/10 border border-indigo-500/15 rounded-xl px-3 py-2.5">
            <p className="text-[11px] text-indigo-300 leading-relaxed">
              <strong>Customization:</strong> Add <code className="bg-indigo-600/20 px-1 rounded">data-position="left"</code> or <code className="bg-indigo-600/20 px-1 rounded">data-color="#FF6600"</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BotSettings() {
  const { selectedBot, updateBot, deleteBot } = useBots();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [persona, setPersona] = useState('friendly');
  const [model, setModel] = useState('anthropic');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [channelToken, setChannelToken] = useState('');
  const [showChannelToken, setShowChannelToken] = useState(false);
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [gatewayToken, setGatewayToken] = useState('');
  const [showGatewayToken, setShowGatewayToken] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (selectedBot) {
      setName(selectedBot.name); setPersona(selectedBot.persona); setModel(selectedBot.model);
      setSystemPrompt(selectedBot.system_prompt || '');
      setApiKey((selectedBot as any).api_key || '');
      setChannelToken((selectedBot as any).channel_token || '');
      setGatewayUrl((selectedBot as any).gateway_url || '');
      setGatewayToken((selectedBot as any).gateway_token || '');
    }
  }, [selectedBot]);

  if (!selectedBot) return <div className="flex items-center justify-center h-full text-slate-500">Select a bot from the dashboard first</div>;

  const handleSave = async () => {
    await updateBot(selectedBot.id, { name, persona, model, system_prompt: systemPrompt, api_key: apiKey, channel_token: channelToken, gateway_url: gatewayUrl, gateway_token: gatewayToken } as any);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (confirm(`Delete "${selectedBot.name}"? This cannot be undone.`)) { await deleteBot(selectedBot.id); navigate('/dashboard'); }
  };

  const toggleFaq = (id: string) => setActiveSection(activeSection === id ? null : id);

  const modelLinks: Record<string, { name: string; url: string }> = {
    anthropic: { name: 'Anthropic Console', url: 'https://console.anthropic.com/settings/keys' },
    openai: { name: 'OpenAI Dashboard', url: 'https://platform.openai.com/api-keys' },
    local: { name: 'OpenRouter', url: 'https://openrouter.ai/keys' },
  };

  const channel = (selectedBot as any).channel || '';
  const chConfig = CHANNEL_CONFIG[channel];
  const isWebChat = channel === 'webchat';

  const inputClasses = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/30 transition-all";
  const inputMonoClasses = `${inputClasses} font-mono text-sm`;

  return (
    <div className="px-4 sm:px-8 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Bot Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Configure {selectedBot.name}</p>
        </div>
        <button onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-lg transition-all">
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="space-y-6">
        {/* General */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Bot Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Personality</label>
              <select value={persona} onChange={(e) => setPersona(e.target.value)} className={inputClasses}>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 1: Model */}
        <div className="relative">
          <div className="absolute -left-8 top-6 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center hidden sm:flex">1</div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">AI Model</h3>
            <p className="text-xs text-slate-500 mb-4">AI is included. Choose which model powers your bot.</p>
            <select value={model} onChange={(e) => setModel(e.target.value)} className={inputClasses}>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI (GPT)</option>
              <option value="local">Local / OpenRouter</option>
            </select>

            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2"><Key className="w-4 h-4 text-indigo-400" /><span className="text-sm font-medium text-slate-300">Bring Your Own Key</span></div>
                <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider">Optional</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Skip this to use our managed AI (20 free messages/day, then $0.003/msg). Or paste your own key for unlimited messages at zero markup.</p>
              <div className="relative">
                <input type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                  placeholder={model === 'anthropic' ? 'sk-ant-...' : model === 'openai' ? 'sk-...' : 'sk-or-...'}
                  className={`${inputMonoClasses} pr-12`} />
                <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors">
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500"><Shield className="w-3 h-3" /> Stored encrypted. Never shared.</div>
                <a href={modelLinks[model]?.url || '#'} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Get key from {modelLinks[model]?.name || 'provider'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Channel */}
        <div className="relative">
          <div className="absolute -left-8 top-6 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center hidden sm:flex">2</div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-400" /><h3 className="text-white font-semibold">Channel Connection</h3></div>
              {chConfig && channelToken && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              )}
            </div>

            {isWebChat ? (
              <div className="mt-3 bg-emerald-500/10 border border-emerald-500/15 rounded-xl px-4 py-3">
                <p className="text-sm text-emerald-300 font-medium">WebChat — no token needed</p>
                <p className="text-xs text-emerald-400/70 mt-1">Your bot uses built-in web chat with a unique URL.</p>
              </div>
            ) : chConfig ? (
              <>
                <p className="text-xs text-slate-500 mb-4">Paste your <strong className="text-slate-400">{chConfig.label} {chConfig.tokenName}</strong> to connect.</p>
                <div className="relative">
                  <input type={showChannelToken ? 'text' : 'password'} value={channelToken} onChange={(e) => setChannelToken(e.target.value)}
                    placeholder={chConfig.placeholder} className={`${inputMonoClasses} pr-12`} />
                  <button type="button" onClick={() => setShowChannelToken(!showChannelToken)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors">
                    {showChannelToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-4 bg-indigo-600/10 border border-indigo-500/15 rounded-xl px-4 py-3">
                  <p className="text-xs text-indigo-300 font-medium mb-1">How to get your {chConfig.label} {chConfig.tokenName}:</p>
                  <p className="text-xs text-indigo-400/70 leading-relaxed">{chConfig.howTo}</p>
                  <a href={chConfig.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-medium hover:text-indigo-300 transition-colors mt-2">
                    {chConfig.linkLabel} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3"><Shield className="w-3 h-3" /> Your channel token is stored encrypted and never shared.</div>
              </>
            ) : (
              <div className="mt-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
                <p className="text-xs text-slate-500">No channel selected. Go back to setup to pick a channel.</p>
              </div>
            )}
          </div>
        </div>

        <ShareEmbed botId={selectedBot.id} botName={selectedBot.name} />

        {/* System Prompt */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">System Prompt</h3>
          <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={6}
            className={`${inputClasses} resize-none text-sm leading-relaxed`} />
          <p className="text-xs text-slate-500 mt-2">Base instruction for this bot.</p>
        </div>

        {/* Gateway */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-400" /><h3 className="text-white font-semibold">Gateway Connection</h3></div>
            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider">Advanced</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Connect to the OpenClaw gateway for live AI chat.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Gateway URL</label>
              <input type="text" value={gatewayUrl} onChange={(e) => setGatewayUrl(e.target.value)} placeholder="ws://your-server:18789" className={inputMonoClasses} />
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-slate-500 mb-1">Gateway Token</label>
              <input type={showGatewayToken ? 'text' : 'password'} value={gatewayToken} onChange={(e) => setGatewayToken(e.target.value)}
                placeholder="Your gateway auth token" className={`${inputMonoClasses} pr-12`} />
              <button type="button" onClick={() => setShowGatewayToken(!showGatewayToken)} className="absolute right-3 bottom-3 p-1 text-slate-500 hover:text-white transition-colors">
                {showGatewayToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {!gatewayUrl && (
            <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-500 leading-relaxed"><strong className="text-slate-400">Not sure?</strong> If you're using Aifredo's managed hosting, the gateway is configured automatically.</p>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4"><HelpCircle className="w-4 h-4 text-slate-500" /><h3 className="text-white font-semibold">Help</h3></div>
          <div className="divide-y divide-white/5">
            {[
              { id: 'flow', q: "What's the setup order?", a: "1) Choose your AI model (included free). 2) Connect a channel by pasting its API token. 3) Add funds or bring your own API key to start chatting." },
              { id: 'byok', q: 'Do I need my own AI API key?', a: 'No — you get 20 free AI messages/day. After that, add $5 for ~1,500 messages or paste your own key for unlimited at zero markup.' },
              { id: 'channel-key', q: 'Where do I get my channel token?', a: 'Each platform has its own setup. Telegram: @BotFather. Discord: Developer Portal. Slack: Slack App. Links are above.' },
              { id: 'prompt', q: 'Tips for a good system prompt?', a: "Be specific: define role, boundaries, tone, and examples of ideal responses." },
              { id: 'security', q: 'Are my keys safe?', a: 'Yes. Stored encrypted, never in logs, never shared.' },
            ].map((faq) => (
              <div key={faq.id}>
                <button onClick={() => toggleFaq(faq.id)} className="w-full flex items-start justify-between gap-3 py-3 text-left">
                  <span className="text-sm text-slate-300 font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 mt-0.5 transition-transform ${activeSection === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {activeSection === faq.id && <p className="text-xs text-slate-500 pb-3 -mt-1 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
          <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
          <p className="text-sm text-slate-500 mb-4">Permanently delete this bot and all its data.</p>
          <button onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 transition-colors">
            <Trash2 className="w-4 h-4" /> Delete Bot
          </button>
        </div>
      </div>
    </div>
  );
}
