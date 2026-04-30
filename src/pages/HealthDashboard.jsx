import TopStatsBar from '../components/health/TopStatsBar';
import LatencyChart from '../components/health/LatencyChart';
import SentimentFeed from '../components/health/SentimentFeed';
import VoiceToCRM from '../components/health/VoiceToCRM';

export default function HealthDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-emerald pulse-dot-green" />
            System Health Monitor
          </h1>
          <p className="text-sm text-text-muted mt-1">Real-time communication stack overview</p>
        </div>
        <div className="text-xs text-text-dim font-mono px-3 py-1.5 bg-bg-elevated rounded-lg">
          LIVE • 2s refresh
        </div>
      </div>

      {/* Top Stats Bar */}
      <TopStatsBar />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LatencyChart chartType="latency" />
        <LatencyChart chartType="throughput" />
        <LatencyChart chartType="churn" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SentimentFeed />
        <VoiceToCRM />
      </div>
    </div>
  );
}
