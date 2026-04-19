import { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { generateGeminiPrompt, generateMockResponse } from '../../utils/geminiPromptBuilder';

const PRIORITY_COLORS = {
  High: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  Medium: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
  Low: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20',
};

export default function GeminiInsightPanel({ isOpen, onClose }) {
  const { state } = useSimulation();
  const [prompt, setPrompt] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    const p = generateGeminiPrompt(state);
    setPrompt(p);
    setTimeout(() => {
      const r = generateMockResponse(p);
      setResponse(r);
      setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg h-full bg-bg-card border-l border-border-subtle overflow-y-auto animate-fade-in">
        <div className="sticky top-0 z-10 p-5 bg-bg-card/95 backdrop-blur-md border-b border-border-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl gemini-gradient">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-text-primary">Gemini AI Insights</h2>
                <p className="text-xs text-text-muted">AI-powered analysis & recommendations</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-bg-elevated rounded-xl transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-text-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <button
            id="generate-ai-insight"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 px-4 gemini-gradient text-white font-semibold rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing metrics...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Generate AI Insight
              </>
            )}
          </button>

          {response && (
            <div className="space-y-5 animate-fade-in">
              {/* Retention Score */}
              <div className="glass-card-static p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-text-muted">Retention Risk Score</span>
                  <span className={`text-2xl font-bold ${response.retentionScore >= 70 ? 'text-accent-emerald' : response.retentionScore >= 40 ? 'text-accent-amber' : 'text-accent-red'}`}>
                    {response.retentionScore}%
                  </span>
                </div>
                <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${response.retentionScore >= 70 ? 'bg-accent-emerald' : response.retentionScore >= 40 ? 'bg-accent-amber' : 'bg-accent-red'}`}
                    style={{ width: `${response.retentionScore}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-2">{response.summary}</p>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Sales Action Recommendations</h3>
                <div className="space-y-2">
                  {response.recommendations.map((rec, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${PRIORITY_COLORS[rec.priority]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{rec.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-text-primary">{rec.action}</p>
                      <p className="text-xs text-text-muted mt-1">{rec.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Follow-ups */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Smart Follow-ups</h3>
                <div className="space-y-2">
                  {response.smartFollowUps.map((fu, i) => (
                    <div key={i} className="p-3 rounded-xl bg-accent-purple/5 border border-accent-purple/15">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-accent-purple">{fu.target}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-elevated text-text-muted">{fu.channel}</span>
                      </div>
                      <p className="text-sm text-text-primary leading-relaxed">"{fu.message}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggle prompt view */}
              <button onClick={() => setShowPrompt(!showPrompt)} className="text-xs text-accent-blue hover:text-accent-blue/80 transition-colors font-medium flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-3 h-3 transition-transform ${showPrompt ? 'rotate-90' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                {showPrompt ? 'Hide' : 'View'} API Prompt
              </button>

              {showPrompt && prompt && (
                <pre className="p-4 bg-bg-primary rounded-xl text-xs text-text-muted font-mono overflow-x-auto border border-border-subtle max-h-64 overflow-y-auto">
                  {JSON.stringify(prompt, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
