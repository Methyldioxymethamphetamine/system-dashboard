import { useSimulation } from '../../context/SimulationContext';
import { getHealthStatus } from '../../hooks/useSimulationEngine';

export default function Navbar({ activeTab, onTabChange, onToggleAI }) {
  const { state } = useSimulation();

  const statuses = [
    getHealthStatus('chatApi', state.chatApi),
    getHealthStatus('videoApi', state.videoApi),
    getHealthStatus('audioApi', state.audioApi),
    getHealthStatus('databaseApi', state.databaseApi),
    getHealthStatus('transcription', state.transcription),
  ];

  const criticalCount = statuses.filter(s => s === 'red').length;
  const degradedCount = statuses.filter(s => s === 'yellow').length;
  const globalStatus = criticalCount > 0 ? 'red' : degradedCount > 0 ? 'yellow' : 'green';

  const globalConfig = {
    green: { label: 'All Systems Operational', color: 'text-accent-emerald', dot: 'bg-accent-emerald pulse-dot-green' },
    yellow: { label: `${degradedCount} Degraded`, color: 'text-accent-amber', dot: 'bg-accent-amber pulse-dot-yellow' },
    red: { label: `${criticalCount} Critical`, color: 'text-accent-red', dot: 'bg-accent-red pulse-dot-red' },
  }[globalStatus];

  return (
    <nav className="sticky top-0 z-40 bg-bg-card/80 backdrop-blur-xl border-b border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gemini-gradient flex items-center justify-center">
                <span className="text-white font-black text-sm">D</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-primary tracking-tight">
                  DEVCRM <span className="text-accent-purple">PRO</span>
                </h1>
                <p className="text-[10px] text-text-dim font-medium tracking-wider uppercase">Communication Intelligence</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-border-subtle hidden sm:block" />

            {/* Tab Switcher */}
            <div className="hidden sm:flex items-center bg-bg-primary rounded-xl p-1 gap-1">
              <button
                onClick={() => onTabChange('health')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'health'
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                Health Monitor
              </button>
              <button
                onClick={() => onTabChange('crm')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'crm'
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                CRM Pipeline
              </button>
              <button
                onClick={() => onTabChange('chaos')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'chaos'
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                Market Stress
              </button>
              <button
                onClick={() => onTabChange('settings')}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'settings'
                  ? 'bg-bg-elevated text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Global Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary">
              <div className={`w-2 h-2 rounded-full ${globalConfig.dot}`} />
              <span className={`text-xs font-medium ${globalConfig.color}`}>{globalConfig.label}</span>
            </div>

            {/* AI Button */}
            <button
              onClick={onToggleAI}
              id="ai-insight-toggle"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl gemini-gradient text-white text-xs font-semibold hover:opacity-90 transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
              <span className="hidden sm:inline">AI Insight</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="sm:hidden flex items-center bg-bg-primary rounded-xl p-1 gap-1 mb-3">
          <button
            onClick={() => onTabChange('health')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${activeTab === 'health' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
              }`}
          >
            Health
          </button>
          <button
            onClick={() => onTabChange('crm')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${activeTab === 'crm' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
              }`}
          >
            CRM
          </button>
          <button
            onClick={() => onTabChange('chaos')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${activeTab === 'chaos' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
              }`}
          >
            Stress
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-center ${activeTab === 'settings' ? 'bg-bg-elevated text-text-primary shadow-sm' : 'text-text-muted'
              }`}
          >
            Config
          </button>
        </div>
      </div>
    </nav>
  );
}
