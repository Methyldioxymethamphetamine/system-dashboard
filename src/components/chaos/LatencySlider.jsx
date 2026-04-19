import { useSimulation } from '../../context/SimulationContext';

const SLIDERS = [
  { api: 'videoApi', field: 'latencyMs', label: 'Video Latency', unit: 'ms', min: 0, max: 2000, thresholds: [100, 500] },
  { api: 'audioApi', field: 'latencyMs', label: 'Audio Latency', unit: 'ms', min: 0, max: 2000, thresholds: [100, 500] },
  { api: 'databaseApi', field: 'queryTimeMs', label: 'DB Query Time', unit: 'ms', min: 0, max: 1000, thresholds: [100, 500] },
  { api: 'videoApi', field: 'packetLoss', label: 'Packet Loss', unit: '%', min: 0, max: 100, thresholds: [2, 10], step: 0.1 },
  { api: 'chatApi', field: 'msgPerSec', label: 'Chat Throughput', unit: 'msg/s', min: 0, max: 500, thresholds: [60, 20], invert: true },
];

function getZone(value, thresholds, invert) {
  if (invert) {
    if (value <= thresholds[1]) return 'red';
    if (value <= thresholds[0]) return 'yellow';
    return 'green';
  }
  if (value >= thresholds[1]) return 'red';
  if (value >= thresholds[0]) return 'yellow';
  return 'green';
}

const ZONE_COLORS = {
  green: { track: 'bg-accent-emerald/30', thumb: 'bg-accent-emerald', text: 'text-accent-emerald', border: 'border-accent-emerald/20' },
  yellow: { track: 'bg-accent-amber/30', thumb: 'bg-accent-amber', text: 'text-accent-amber', border: 'border-accent-amber/20' },
  red: { track: 'bg-accent-red/30', thumb: 'bg-accent-red', text: 'text-accent-red', border: 'border-accent-red/20' },
};

export default function LatencySlider() {
  const { state, setLatency } = useSimulation();

  return (
    <div id="latency-sliders" className="glass-card-static p-5">
      <div className="flex items-center gap-2 mb-4">

        <h3 className="text-sm font-semibold text-text-primary">Latency & Metric Sliders</h3>
      </div>
      <p className="text-xs text-text-muted mb-5">Adjust values to trigger threshold alerts</p>

      <div className="space-y-5">
        {SLIDERS.map(({ api, field, label, unit, min, max, thresholds, step = 1, invert }) => {
          const value = state[api][field];
          const zone = getZone(value, thresholds, invert);
          const colors = ZONE_COLORS[zone];
          const pct = ((value - min) / (max - min)) * 100;

          return (
            <div key={`${api}-${field}`} className={`p-3 rounded-xl border ${colors.border} bg-bg-elevated/30`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-text-primary">{label}</span>
                <span className={`text-sm font-bold font-mono ${colors.text}`}>
                  {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value} {unit}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setLatency(api, field, parseFloat(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, ${zone === 'green' ? '#10b981' : zone === 'yellow' ? '#f59e0b' : '#ef4444'} ${pct}%, #1e293b ${pct}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-text-dim mt-1">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
