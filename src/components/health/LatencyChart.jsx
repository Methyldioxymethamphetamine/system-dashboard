import { useSimulation } from '../../context/SimulationContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="text-xs text-text-muted mb-2 font-medium">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-semibold text-text-primary">
            {entry.value}{entry.unit || 'ms'}
          </span>
        </div>
      ))}
    </div>
  );
}

const CHART_CONFIGS = {
  latency: {
    title: 'Latency Trends',
    subtitle: 'Real-time API response times',
    lines: [
      { dataKey: 'videoLatency', name: 'Video', stroke: '#3b82f6', unit: 'ms' },
      { dataKey: 'audioLatency', name: 'Audio', stroke: '#8b5cf6', unit: 'ms' },
      { dataKey: 'dbQueryTime', name: 'Database', stroke: '#06b6d4', unit: 'ms' },
    ],
  },
  throughput: {
    title: 'Chat Throughput',
    subtitle: 'Messages per second',
    lines: [
      { dataKey: 'chatMsgPerSec', name: 'Messages/s', stroke: '#10b981', unit: ' msg/s' },
    ],
  },
  packetLoss: {
    title: 'Packet Loss',
    subtitle: 'Video stream quality',
    lines: [
      { dataKey: 'videoPacketLoss', name: 'Loss %', stroke: '#f59e0b', unit: '%' },
    ],
  },
};

export default function LatencyChart({ chartType = 'latency' }) {
  const { state } = useSimulation();
  const config = CHART_CONFIGS[chartType];

  return (
    <div id={`chart-${chartType}`} className="glass-card-static p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-text-primary">{config.title}</h3>
        <p className="text-xs text-text-muted mt-0.5">{config.subtitle}</p>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={state.history}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }}
            />
            {config.lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
                unit={line.unit}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
