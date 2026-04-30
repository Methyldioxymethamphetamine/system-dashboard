import { useState } from 'react';

export default function SettingsDashboard() {
  const [weights, setWeights] = useState({
    latency: 30,
    drops: 40,
    sentiment: 20,
    usage: 10
  });

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-purple pulse-dot-purple" />
            CRM Settings & AI Background Tasks
          </h1>
          <p className="text-sm text-text-muted mt-1">Configure scoring, backup, and AI workloads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Scoring Config */}
        <div className="glass-card-static p-6">
          <h2 className="text-base font-bold text-text-primary mb-4">Lead Scoring Weights</h2>
          <p className="text-xs text-text-muted mb-6">Adjust the impact of different metrics on the overall 0-100 lead score. Must sum to 100.</p>
          
          <div className="space-y-4">
            {Object.entries(weights).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-text-primary">{key} Impact</span>
                  <span className="text-accent-cyan font-mono">{val}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={val}
                  onChange={(e) => setWeights({ ...weights, [key]: parseInt(e.target.value) })}
                  className="w-full accent-accent-cyan bg-bg-elevated h-2 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border-subtle flex justify-between items-center">
            <span className={`text-sm font-bold ${totalWeight === 100 ? 'text-accent-emerald' : 'text-accent-red'}`}>
              Total: {totalWeight}%
            </span>
            <button className="px-4 py-2 bg-bg-elevated border border-border-subtle hover:border-accent-cyan rounded-lg text-sm text-text-primary transition-colors">
              Save Weights
            </button>
          </div>
        </div>

        {/* System & AI Workloads */}
        <div className="space-y-6">
          {/* Cloud Backup */}
          <div className="glass-card-static p-6">
            <h2 className="text-base font-bold text-text-primary mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Real-time Cloud Backup
            </h2>
            <div className="flex items-center justify-between bg-bg-elevated p-3 rounded-lg border border-border-subtle">
              <div>
                <p className="text-sm font-medium text-text-primary">Status: Active</p>
                <p className="text-xs text-text-muted">Last synced: Just now</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-accent-emerald pulse-dot-green" />
            </div>
          </div>

          {/* AI Background Tasks */}
          <div className="glass-card-static p-6">
            <h2 className="text-base font-bold text-text-primary mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Background AI Workloads
            </h2>
            <p className="text-xs text-text-muted mb-4">Processes heavy analytics without slowing main app thread.</p>
            
            <div className="space-y-3">
              <div className="bg-bg-primary p-3 rounded-lg border border-border-subtle flex justify-between items-center">
                <span className="text-sm text-text-primary">Thread Summarization</span>
                <span className="text-xs font-mono text-accent-amber animate-pulse">Processing (68%)</span>
              </div>
              <div className="bg-bg-primary p-3 rounded-lg border border-border-subtle flex justify-between items-center">
                <span className="text-sm text-text-primary">Churn Prediction Matrix</span>
                <span className="text-xs font-mono text-text-dim">Idle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
