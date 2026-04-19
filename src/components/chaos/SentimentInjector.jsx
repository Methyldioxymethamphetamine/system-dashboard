import { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const PRESETS = [
  { text: 'Screenshare is laggy', sentiment: 'negative' },
  { text: 'Audio keeps cutting out', sentiment: 'negative' },
  { text: 'Great call quality today!', sentiment: 'positive' },
  { text: "Can't connect to the meeting", sentiment: 'negative' },
  { text: 'Video froze during demo', sentiment: 'negative' },
  { text: 'Crystal clear audio', sentiment: 'positive' },
];

export default function SentimentInjector() {
  const { addSentiment, clearSentiments, state } = useSimulation();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addSentiment(input.trim());
      setInput('');
    }
  };

  return (
    <div id="sentiment-injector" className="glass-card-static p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-accent-purple">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
          <h3 className="text-sm font-semibold text-text-primary">Sentiment Injector</h3>
        </div>
        {state.sentimentFeedback.length > 0 && (
          <button onClick={clearSentiments} className="text-xs text-accent-red hover:text-accent-red/80 transition-colors font-medium">
            Clear All
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type mock user feedback..."
          className="flex-1 px-3 py-2 bg-bg-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent-purple/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-4 py-2 bg-accent-purple hover:bg-accent-purple/80 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all"
        >
          Inject
        </button>
      </form>

      <div className="space-y-1.5">
        <p className="text-xs text-text-muted mb-2">Quick presets:</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.text}
              onClick={() => addSentiment(preset.text)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:scale-[1.02] active:scale-95 ${
                preset.sentiment === 'negative'
                  ? 'border-accent-red/20 bg-accent-red/5 text-accent-red hover:bg-accent-red/10'
                  : 'border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald hover:bg-accent-emerald/10'
              }`}
            >
              {preset.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
