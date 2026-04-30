import { useSimulation } from '../../context/SimulationContext';

export default function TopStatsBar() {
  const { state } = useSimulation();
  const crmStats = state.crmStats || { activeLeads: 0, csat: 0, churnRisk: 0, pipelineHealth: 0 };
  const history = state.history;
  const currentChurn = history.length > 0 ? history[history.length - 1].churnRisk : crmStats.churnRisk;
  const currentCsat = Math.max(10, Math.min(100, 100 - (currentChurn * 0.5))); // approximate CSAT dependent on churn

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card-static p-5 border border-border-subtle" style={{boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)'}}>
        <h3 className="text-sm font-semibold text-text-muted">Active Leads</h3>
        <p className="text-3xl font-black text-text-primary mt-2">{crmStats.activeLeads.toLocaleString()}</p>
        <p className="text-xs text-accent-emerald mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          +12% from last week
        </p>
      </div>
      <div className="glass-card-static p-5 border border-border-subtle">
        <h3 className="text-sm font-semibold text-text-muted">CSAT %</h3>
        <p className="text-3xl font-black text-text-primary mt-2">{currentCsat.toFixed(1)}%</p>
        <p className="text-xs text-text-dim mt-1">Customer Satisfaction Score</p>
      </div>
      <div className={`glass-card-static p-5 border ${currentChurn > 50 ? 'border-accent-red/30 glow-red' : 'border-border-subtle'}`}>
        <h3 className="text-sm font-semibold text-text-muted">Churn Risk</h3>
        <p className={`text-3xl font-black mt-2 ${currentChurn > 50 ? 'text-accent-red' : currentChurn > 20 ? 'text-accent-amber' : 'text-accent-emerald'}`}>
          {currentChurn.toFixed(1)}%
        </p>
        <p className="text-xs text-text-dim mt-1">Users facing high latency</p>
      </div>
      <div className="glass-card-static p-5 border border-border-subtle" style={{boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)'}}>
        <h3 className="text-sm font-semibold text-text-muted">Pipeline Health</h3>
        <p className="text-3xl font-black text-text-primary mt-2">${crmStats.pipelineHealth}M</p>
        <p className="text-xs text-accent-emerald mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          Projected revenue
        </p>
      </div>
    </div>
  );
}
