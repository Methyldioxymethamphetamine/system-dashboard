import { useSimulation } from '../../context/SimulationContext';

export default function TranscriptionStatus() {
  const { state } = useSimulation();
  const status = state.transcription.status;

  const cfg = {
    active: { label: 'Active', color: 'text-accent-emerald', bg: 'bg-accent-emerald', glow: 'glow-green' },
    degraded: { label: 'Degraded', color: 'text-accent-amber', bg: 'bg-accent-amber', glow: 'glow-yellow' },
    offline: { label: 'Offline', color: 'text-accent-red', bg: 'bg-accent-red', glow: 'glow-red' },
  }[status];

  return (
    <div id="transcription-status" className={`glass-card-static ${cfg.glow} p-5`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${status === 'active' ? 'bg-accent-emerald/10' : status === 'degraded' ? 'bg-accent-amber/10' : 'bg-accent-red/10'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-5 h-5 ${cfg.color}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Voice-to-CRM</h3>
            <span className={`text-xs font-medium ${cfg.color}`}>Transcription {cfg.label}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${cfg.bg} ${status === 'active' ? 'pulse-dot-green' : status === 'degraded' ? 'pulse-dot-yellow' : 'pulse-dot-red'}`} />
      </div>

      <div className="flex items-end justify-center gap-1 h-8 mt-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${status === 'offline' ? 'bg-accent-red/20 h-1' : `${cfg.bg} waveform-bar`}`}
            style={status !== 'offline' ? { animationDelay: `${i * 0.08}s`, minHeight: '4px' } : {}}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-text-muted">
        <span>Pipeline</span>
        <div className="flex gap-0.5">
          {['STT', 'NLP', 'CRM'].map((step, i) => (
            <span key={step} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${status === 'offline' ? 'bg-accent-red/10 text-accent-red/50' : status === 'degraded' && i > 0 ? 'bg-accent-amber/10 text-accent-amber/50' : 'bg-accent-emerald/10 text-accent-emerald'}`}>
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
