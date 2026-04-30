import { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';

const ACTION_ITEMS = [
  "Fix screenshare lag for Enterprise User A",
  "Schedule follow-up with Trial User B",
  "Investigate high latency in EU region",
  "Escalate dropped call issue to Tier 2",
  "Send 'Welcome' email to New Signups"
];

export default function VoiceToCRM() {
  const { state } = useSimulation();
  const status = state.transcription.status;
  const [currentLine, setCurrentLine] = useState('');
  const [items, setItems] = useState([ACTION_ITEMS[0], ACTION_ITEMS[1]]);

  useEffect(() => {
    if (status !== 'active') return;
    
    // Simulate real-time transcription
    const phrases = ["User is complaining about...", "latency seems to be...", "okay, I'll log that.", "let's fix the screen sharing."];
    let phraseIndex = 0;
    
    const interval = setInterval(() => {
      setCurrentLine(phrases[phraseIndex]);
      phraseIndex = (phraseIndex + 1) % phrases.length;
      
      if (Math.random() < 0.2) {
        setItems(prev => {
          const newItem = ACTION_ITEMS[Math.floor(Math.random() * ACTION_ITEMS.length)];
          if (prev.includes(newItem)) return prev;
          return [newItem, ...prev].slice(0, 3);
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  const cfg = {
    active: { label: 'Recording', color: 'text-accent-emerald', bg: 'bg-accent-emerald', glow: 'glow-green' },
    degraded: { label: 'Degraded', color: 'text-accent-amber', bg: 'bg-accent-amber', glow: 'glow-yellow' },
    offline: { label: 'Offline', color: 'text-accent-red', bg: 'bg-accent-red', glow: 'glow-red' },
  }[status];

  return (
    <div id="voice-to-crm" className={`glass-card-static ${cfg.glow} p-5 flex flex-col h-full`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${status === 'active' ? 'bg-accent-emerald/10' : status === 'degraded' ? 'bg-accent-amber/10' : 'bg-accent-red/10'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-5 h-5 ${cfg.color}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Live Call Transcription</h3>
            <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${cfg.bg} ${status === 'active' ? 'pulse-dot-green' : status === 'degraded' ? 'pulse-dot-yellow' : 'pulse-dot-red'}`} />
      </div>

      <div className="flex-1 min-h-[80px] bg-bg-primary/50 rounded-lg p-3 border border-border-subtle mt-2 mb-3">
        <p className="text-xs text-text-muted font-mono mb-2 border-b border-border-subtle/50 pb-1">Real-time Feed</p>
        <p className="text-sm text-text-primary italic">
          {status === 'active' ? `"...${currentLine}"` : '[Transcription Paused]'}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-accent-cyan mb-2">Extracted Action Items</p>
        <ul className="space-y-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="text-xs text-text-primary flex items-start gap-2 bg-bg-elevated/40 p-2 rounded-lg border border-border-subtle">
              <svg className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
