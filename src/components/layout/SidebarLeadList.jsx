import { useEffect, useState } from 'react';

const generateMockLeads = () => {
  return [
    { id: 1, name: 'Acme Corp', status: 'Enterprise', score: 92, activity: 'Experienced 200ms latency' },
    { id: 2, name: 'Globex Inc', status: 'Trial', score: 45, activity: 'Dropped call during demo' },
    { id: 3, name: 'Initech', status: 'New', score: 78, activity: 'Signed up 2 hours ago' },
    { id: 4, name: 'Soylent', status: 'Enterprise', score: 88, activity: 'Added 5 new users' },
    { id: 5, name: 'Umbrella Corp', status: 'Trial', score: 30, activity: 'Video frozen for 15s' },
  ];
};

export default function SidebarLeadList() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setLeads(generateMockLeads());
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Enterprise': return 'text-accent-purple bg-accent-purple/10 border-accent-purple/20';
      case 'Trial': return 'text-accent-amber bg-accent-amber/10 border-accent-amber/20';
      case 'New': return 'text-accent-blue bg-accent-blue/10 border-accent-blue/20';
      default: return 'text-text-muted bg-bg-elevated border-border-subtle';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent-emerald';
    if (score >= 50) return 'text-accent-amber';
    return 'text-accent-red';
  };

  return (
    <aside className="w-80 hidden lg:flex flex-col glass-card-static h-[calc(100vh-120px)] overflow-hidden sticky top-24">
      <div className="p-5 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <svg className="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          Recent Leads
        </h2>
        <p className="text-xs text-text-muted mt-1">AI-prioritized outreach list</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {leads.map(lead => (
          <div key={lead.id} className="p-4 rounded-xl bg-bg-elevated/40 border border-border-subtle hover:border-accent-cyan/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">{lead.name}</h3>
                <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-medium border rounded-full ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-lg font-black tracking-tighter ${getScoreColor(lead.score)}`}>{lead.score}</span>
                <span className="text-[9px] text-text-dim font-medium uppercase tracking-wider">Score</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border-subtle/50">
              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                <span className="font-semibold text-text-dim">Activity:</span> {lead.activity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
