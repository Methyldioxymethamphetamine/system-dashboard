import { useSimulation } from '../../context/SimulationContext';
import { getHealthStatus } from '../../hooks/useSimulationEngine';

const SERVICE_ICONS = {
  chatApi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  ),
  videoApi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  audioApi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
  ),
  databaseApi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
};

const SERVICE_NAMES = {
  chatApi: 'Chat API',
  videoApi: 'Video API',
  audioApi: 'Audio API',
  databaseApi: 'Database API',
};

const METRIC_LABELS = {
  chatApi: (m) => ({ value: `${Math.round(m.msgPerSec)} msg/s`, sub: 'Throughput' }),
  videoApi: (m) => ({ value: `${Math.round(m.latencyMs)} ms`, sub: `${m.packetLoss.toFixed(1)}% loss` }),
  audioApi: (m) => ({ value: `${Math.round(m.latencyMs)} ms`, sub: 'Latency' }),
  databaseApi: (m) => ({ value: `${Math.round(m.queryTimeMs)} ms`, sub: 'Query Time' }),
};

const STATUS_CONFIG = {
  green: {
    label: 'Operational',
    dotClass: 'bg-accent-emerald pulse-dot-green',
    glowClass: 'glow-green',
    textClass: 'text-accent-emerald',
  },
  yellow: {
    label: 'Degraded',
    dotClass: 'bg-accent-amber pulse-dot-yellow',
    glowClass: 'glow-yellow',
    textClass: 'text-accent-amber',
  },
  red: {
    label: 'Critical',
    dotClass: 'bg-accent-red pulse-dot-red',
    glowClass: 'glow-red',
    textClass: 'text-accent-red',
  },
};

export default function StatusCard({ apiName }) {
  const { state } = useSimulation();
  const metrics = state[apiName];
  const health = getHealthStatus(apiName, metrics);
  const config = STATUS_CONFIG[health];
  const metric = METRIC_LABELS[apiName](metrics);

  return (
    <div
      id={`status-card-${apiName}`}
      className={`glass-card ${config.glowClass} p-5 animate-fade-in`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${health === 'green' ? 'bg-accent-emerald/10 text-accent-emerald' : health === 'yellow' ? 'bg-accent-amber/10 text-accent-amber' : 'bg-accent-red/10 text-accent-red'}`}>
            {SERVICE_ICONS[apiName]}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{SERVICE_NAMES[apiName]}</h3>
            <span className={`text-xs font-medium ${config.textClass}`}>
              {config.label}
            </span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${config.dotClass}`} />
      </div>

      {/* Metric */}
      <div className="mt-2">
        <div className={`text-3xl font-bold tracking-tight ${metrics.status === 'down' ? 'text-accent-red' : 'text-text-primary'}`}>
          {metrics.status === 'down' ? 'OFFLINE' : metric.value}
        </div>
        <div className="text-xs text-text-muted mt-1">{metric.sub}</div>
      </div>

      {/* Mini bar */}
      <div className="mt-4 h-1 bg-bg-elevated rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            health === 'green' ? 'bg-accent-emerald' : health === 'yellow' ? 'bg-accent-amber' : 'bg-accent-red'
          }`}
          style={{
            width: health === 'green' ? '100%' : health === 'yellow' ? '60%' : '25%',
          }}
        />
      </div>
    </div>
  );
}
