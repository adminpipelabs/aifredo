import { Lightbulb, Sparkles } from 'lucide-react';

export function OpportunityCards() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        <h3 className="text-white font-semibold">Insights</h3>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-6 text-center">
        <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400 font-medium">No insights yet</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Once your bot starts handling messages, we will surface integration suggestions,
          performance tips, and optimization opportunities here.
        </p>
      </div>
    </div>
  );
}
