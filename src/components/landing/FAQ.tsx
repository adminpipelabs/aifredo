import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "What happens when my balance hits $0?",
    a: "You fall back to the free tier — 20 AI messages per day. Nothing is deleted. All your bots, settings, conversations, and integrations stay exactly as they are. Top up any amount to remove the daily limit.",
  },
  {
    q: "Is there a subscription? Will I get charged monthly?",
    a: "No. There is no subscription and no recurring charge. You add funds manually whenever you want. Your balance is consumed while bots run. You are always in control. Nothing charges your card automatically.",
  },
  {
    q: "Do I need my own AI API key?",
    a: "No. We provide managed AI out of the box — 20 free messages per day, then $0.003 each. No setup needed. But if you already have an Anthropic or OpenAI account, paste your API key in settings for unlimited messages at zero markup.",
  },
  {
    q: "How does Bring Your Own Key (BYOK) work?",
    a: "Go to your bot settings, paste your Anthropic or OpenAI API key, and save. Copy-paste, done. We store it encrypted. Your bot will use your key for all AI requests. You still pay us for hosting and channels, but AI costs go directly to your provider at their rates.",
  },
  {
    q: "Can I set a spending limit?",
    a: "Your balance IS your spending limit. If you add $10, you can never spend more than $10. When it runs out, you fall back to 20 free msgs/day. No overdraft, no credit, no surprise charges.",
  },
  {
    q: "What is free?",
    a: "Almost everything. Creating bots, the dashboard, all channels (Telegram, Discord, Slack, WebChat), bot settings, and 20 AI messages per day — all free, forever. You only pay when you need more than 20 messages a day. Or bring your own API key for unlimited at zero markup.",
  },
  {
    q: "Which channels are free vs paid?",
    a: "All channels are free — Telegram, Discord, Slack, WebChat, and website embeds. The only thing that costs money is AI messages beyond your 20 free per day ($0.003 each). Or bring your own API key and everything is free.",
  },
  {
    q: "Can I get a refund on unused balance?",
    a: "Yes. If you have remaining balance and want it back, contact us and we will refund the unused amount. No questions asked.",
  },
  {
    q: "Can I pause a bot and resume later?",
    a: "Absolutely. Pause a bot anytime from the dashboard. While paused, it receives no messages and costs nothing. Resume whenever you want. Your settings and history are preserved.",
  },
  {
    q: "What if I have 5 bots but only want 2 running?",
    a: "All bots are free to create and run. You only pay for AI messages beyond 20/day across all your bots. Keep as many bots as you want — no per-bot fee.",
  },
  {
    q: "How is this different from running a bot in a terminal?",
    a: "A terminal bot dies when your laptop sleeps, has no monitoring, no analytics, and runs one bot per session. Aifredo hosts your bots on cloud infrastructure 24/7 with automatic restarts, health monitoring, usage analytics, and a visual dashboard to manage everything. No SSH, no Docker, no babysitting.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Aifredo is built on open-source OpenClaw. Your bots run on isolated infrastructure. Conversations and data are yours. We do not train on your data, sell it, or share it. When you use BYOK, AI requests go directly to your provider.",
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 mt-0.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section className="px-4 py-20 sm:py-28 border-t border-slate-200" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            Transparency first
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No fine print. Here is exactly how it works.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-6 shadow-sm">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            Still have questions?{" "}
            <a
              href="https://discord.gg/clawd"
              target="_blank"
              rel="noopener"
              className="text-blue-700 hover:text-blue-600 underline"
            >
              Ask us on Discord
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
