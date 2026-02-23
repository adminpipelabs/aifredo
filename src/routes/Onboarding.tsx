import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicNav } from '../components/layout/PublicNav';
import { AccountStep } from '../components/onboarding/AccountStep';
import { NameStep } from '../components/onboarding/NameStep';
import { ModelStep } from '../components/onboarding/ModelStep';
import { ChannelStep } from '../components/onboarding/ChannelStep';
import { SystemPromptStep } from '../components/onboarding/SystemPromptStep';
import { IntegrationsStep } from '../components/onboarding/IntegrationsStep';
import { TestChatStep } from '../components/onboarding/TestChatStep';
import { DoneStep } from '../components/onboarding/DoneStep';

export interface OnboardingData {
  botName: string;
  persona: string;
  model: string;
  channel: string;
  systemPrompt: string;
  integrations: string[];
}

const STEPS = ['Account', 'Name', 'Model', 'Channel', 'System Prompt', 'Skills', 'Test Chat', 'Done'] as const;

export default function Onboarding() {
  const navigate = useNavigate();
  // If already logged in, start at step 1 (skip account)
  const isLoggedIn = !!localStorage.getItem('af-token');
  const [step, setStep] = useState(isLoggedIn ? 1 : 0);
  const [data, setData] = useState<OnboardingData>({
    botName: '',
    persona: 'friendly',
    model: 'anthropic',
    channel: '',
    systemPrompt: 'You are a helpful personal AI assistant. Be concise, friendly, and proactive.',
    integrations: [],
  });

  const update = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const next = () => { if (step < STEPS.length - 1) setStep(step + 1); };
  const back = () => { if (step > (isLoggedIn ? 1 : 0)) setStep(step - 1); };
  const finish = () => { navigate('/dashboard'); };

  // Visible steps for progress bar (exclude Account if logged in)
  const visibleSteps = isLoggedIn ? STEPS.slice(1) : STEPS;
  const visibleIndex = isLoggedIn ? step - 1 : step;

  return (
    <div className="min-h-full flex flex-col bg-[#0A0A0F] text-white">
      <PublicNav minimal />

      {/* Header */}
      <div className="px-4 pt-20 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white">
            {data.botName || 'New Bot'}
          </span>
          <span className="text-xs text-slate-500">
            Step {visibleIndex + 1} / {visibleSteps.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5">
          {visibleSteps.map((_, i) => (
            <div key={i} className="flex-1">
              <div
                className={`h-1 w-full rounded-full transition-colors ${
                  i <= visibleIndex ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-white/10'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-slate-500 text-xs">
            Step {visibleIndex + 1} of {visibleSteps.length} — {visibleSteps[visibleIndex]}
          </p>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {step === 0 && <AccountStep onNext={next} />}
          {step === 1 && <NameStep data={data} update={update} onNext={next} />}
          {step === 2 && <ModelStep data={data} update={update} onNext={next} onBack={back} />}
          {step === 3 && <ChannelStep data={data} update={update} onNext={next} onBack={back} />}
          {step === 4 && <SystemPromptStep data={data} update={update} onNext={next} onBack={back} />}
          {step === 5 && <IntegrationsStep data={data} update={update} onNext={next} onBack={back} />}
          {step === 6 && <TestChatStep data={data} onNext={next} onBack={back} />}
          {step === 7 && <DoneStep data={data} onFinish={finish} onBack={back} />}
        </div>
      </div>
    </div>
  );
}
