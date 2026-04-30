import { useState } from 'react';

export default function CrmDashboard() {
  const [showImportModal, setShowImportModal] = useState(false);

  // Mock Pipeline Data
  const stages = ['New Leads', 'In Discussion', 'Trial', 'Negotiation', 'Closed Won'];
  const pipelineLeads = [
    { id: 1, name: 'Acme Corp', stage: 'New Leads', score: 85, usage: 'Video', atRisk: false, upsell: false, dormant: false },
    { id: 2, name: 'Globex Inc', stage: 'Trial', score: 92, usage: 'Chat', atRisk: false, upsell: true, dormant: false },
    { id: 3, name: 'Initech', stage: 'In Discussion', score: 45, usage: 'Messaging', atRisk: true, upsell: false, dormant: false },
    { id: 4, name: 'Soylent', stage: 'New Leads', score: 30, usage: 'Video', atRisk: false, upsell: false, dormant: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-blue pulse-dot-blue" />
            CRM Pipeline & Customer Segmentation
          </h1>
          <p className="text-sm text-text-muted mt-1">Manage leads, outreach, and retention strategies</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-bg-elevated border border-border-subtle rounded-xl text-sm font-medium hover:border-accent-cyan transition-all text-text-primary"
          >
            Import CSV / Web Form
          </button>
          <button className="px-4 py-2 gemini-gradient text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
            Run AI Re-engagement
          </button>
        </div>
      </div>

      {/* Actionable Alerts Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* At-Risk */}
        <div className="glass-card-static p-4 border-l-4 border-l-accent-red">
          <h3 className="text-sm font-semibold text-accent-red mb-2">At-Risk Customers (Churn Warning)</h3>
          <p className="text-xs text-text-muted mb-3">Initech experienced high latency.</p>
          <button className="w-full py-1.5 bg-accent-red/10 text-accent-red rounded text-xs font-medium hover:bg-accent-red/20 transition-all">
            Notify AM & Recommend Follow-up
          </button>
        </div>
        {/* Upsell */}
        <div className="glass-card-static p-4 border-l-4 border-l-accent-emerald">
          <h3 className="text-sm font-semibold text-accent-emerald mb-2">Upsell Opportunities</h3>
          <p className="text-xs text-text-muted mb-3">Globex Inc is near plan limits (Chat).</p>
          <button className="w-full py-1.5 bg-accent-emerald/10 text-accent-emerald rounded text-xs font-medium hover:bg-accent-emerald/20 transition-all">
            Send Personalized Outreach
          </button>
        </div>
        {/* Dormant */}
        <div className="glass-card-static p-4 border-l-4 border-l-accent-amber">
          <h3 className="text-sm font-semibold text-accent-amber mb-2">Dormant Accounts</h3>
          <p className="text-xs text-text-muted mb-3">Soylent inactive for 14 days.</p>
          <button className="w-full py-1.5 bg-accent-amber/10 text-accent-amber rounded text-xs font-medium hover:bg-accent-amber/20 transition-all">
            Auto Re-engage
          </button>
        </div>
      </div>

      {/* Pipeline Kanban */}
      <div className="glass-card-static p-5 overflow-x-auto">
        <h2 className="text-sm font-bold text-text-primary mb-4">Lead Pipeline Stages</h2>
        <div className="flex gap-4 min-w-max">
          {stages.map(stage => (
            <div key={stage} className="w-64 bg-bg-elevated/30 rounded-xl p-3 border border-border-subtle">
              <h3 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-3">{stage}</h3>
              <div className="space-y-3">
                {pipelineLeads.filter(l => l.stage === stage).map(lead => (
                  <div key={lead.id} className="bg-bg-primary p-3 rounded-lg border border-border-subtle hover:border-accent-cyan/30 cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-semibold text-text-primary">{lead.name}</span>
                      <span className={`text-xs font-bold ${lead.score > 80 ? 'text-accent-emerald' : lead.score > 50 ? 'text-accent-amber' : 'text-accent-red'}`}>{lead.score}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-bg-elevated text-text-dim border border-border-subtle">
                        {lead.usage}
                      </span>
                      {lead.atRisk && <span className="w-2 h-2 rounded-full bg-accent-red" title="At Risk" />}
                      {lead.upsell && <span className="w-2 h-2 rounded-full bg-accent-emerald" title="Upsell" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl max-w-md w-full">
            <h2 className="text-lg font-bold text-text-primary mb-2">Import Leads</h2>
            <p className="text-xs text-text-muted mb-4">Upload CSV or configure Web Form webhook. Leads are scored immediately by AI upon entry.</p>
            <div className="border-2 border-dashed border-border-subtle rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent-cyan transition-colors mb-4">
              <svg className="w-8 h-8 text-text-dim mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-sm font-medium text-text-primary">Click to upload CSV</span>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary">Cancel</button>
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 gemini-gradient text-white rounded-lg text-sm font-semibold">Simulate Import</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
