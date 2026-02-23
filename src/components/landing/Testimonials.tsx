const testimonials = [
  { quote: "It is running my company.", author: 'therno' },
  { quote: 'The amount of things I done from my phone just during my breakfast is absolutely breathtaking.', author: 'SedRicKCZ' },
  { quote: 'After years of AI hype, I thought nothing could faze me. Then I installed it. AI as teammate, not tool.', author: 'lycfyi' },
  { quote: 'Everything Siri was supposed to be. And it goes so much further.', author: 'crossiBuilds' },
  { quote: 'Controlling Gmail, Calendar, WordPress, Hetzner from Telegram like a boss. Smooth as single malt.', author: 'Abhay08' },
  { quote: 'A glimpse into the future of how normal people will use AI.', author: 'tysonhutchins_' },
];

export function Testimonials() {
  return (
    <section className="px-4 py-20 sm:py-28 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Loved by Builders
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Join thousands already running their own AI bots.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-slate-400 text-sm font-medium">@{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
