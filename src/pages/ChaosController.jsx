import DowntimeToggle from '../components/chaos/DowntimeToggle';
import LatencySlider from '../components/chaos/LatencySlider';
import SentimentInjector from '../components/chaos/SentimentInjector';
import { useSimulation } from '../context/SimulationContext';

export default function ChaosController() {
  const { resetSimulation } = useSimulation();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">

            Chaos Controller
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Dev-only fault injection panel • Changes reflect on Health Monitor in real-time
          </p>
        </div>
        <button
          onClick={resetSimulation}
          className="px-4 py-2 bg-bg-elevated hover:bg-bg-hover text-text-muted hover:text-text-primary border border-border-subtle rounded-xl text-xs font-medium transition-all flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M4.031 9.865 4.031 14.652" />
          </svg>
          Reset All
        </button>
      </div>



      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DowntimeToggle />
          <SentimentInjector />
        </div>
        <LatencySlider />
      </div>
    </div>
  );
}
