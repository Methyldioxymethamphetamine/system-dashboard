import { useEffect, useRef } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const NEGATIVE_KEYWORDS = ['lag', 'slow', 'bad', 'terrible', 'awful', 'can\'t', 'broken', 'down', 'issue', 'error', 'cutting', 'disconnect', 'freeze', 'crash', 'glitch', 'buffer', 'drop'];
const POSITIVE_KEYWORDS = ['great', 'good', 'awesome', 'excellent', 'perfect', 'smooth', 'fast', 'love', 'wonderful', 'clear', 'crisp', 'amazing'];

function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  const negScore = NEGATIVE_KEYWORDS.filter(w => lower.includes(w)).length;
  const posScore = POSITIVE_KEYWORDS.filter(w => lower.includes(w)).length;
  if (negScore > posScore) return 'negative';
  if (posScore > negScore) return 'positive';
  return 'neutral';
}

const SENTIMENT_CONFIG = {
  positive: { label: 'Positive', bg: 'bg-accent-emerald/15', text: 'text-accent-emerald', border: 'border-accent-emerald/20' },
  neutral: { label: 'Neutral', bg: 'bg-accent-blue/15', text: 'text-accent-blue', border: 'border-accent-blue/20' },
  negative: { label: 'Negative', bg: 'bg-accent-red/15', text: 'text-accent-red', border: 'border-accent-red/20' },
};

export default function SentimentFeed() {
  const { state } = useSimulation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.sentimentFeedback]);

  return (
    <div id="sentiment-feed" className="glass-card-static p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent-purple">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            User Sentiment Feed
          </h3>
          <p className="text-xs text-text-muted mt-0.5">{state.sentimentFeedback.length} entries</p>
        </div>
        <div className="flex gap-1.5">
          {['positive', 'neutral', 'negative'].map(s => {
            const count = state.sentimentFeedback.filter(f => analyzeSentiment(f.text) === s).length;
            const cfg = SENTIMENT_CONFIG[s];
            return (
              <span key={s} className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} font-medium`}>
                {count}
              </span>
            );
          })}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto max-h-52 pr-1">
        {state.sentimentFeedback.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-text-dim text-sm">
            <div className="text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 mx-auto mb-2 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <p>No feedback yet</p>
              <p className="text-xs mt-1 opacity-60">Use the Chaos Controller to inject sentiment</p>
            </div>
          </div>
        ) : (
          state.sentimentFeedback.map((feedback) => {
            const sentiment = analyzeSentiment(feedback.text);
            const cfg = SENTIMENT_CONFIG[sentiment];
            const time = new Date(feedback.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
            });
            return (
              <div
                key={feedback.id}
                className={`p-3 rounded-xl border ${cfg.bg} ${cfg.border} animate-fade-in`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-text-dim font-mono">{time}</span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">"{feedback.text}"</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export { analyzeSentiment };
