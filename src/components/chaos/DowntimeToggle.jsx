import { useSimulation } from '../../context/SimulationContext';

const SERVICES = [
  { key: 'chatApi', name: 'Chat API', icon: '' },
  { key: 'videoApi', name: 'Video API', icon: '' },
  { key: 'audioApi', name: 'Audio API', icon: '' },
  { key: 'databaseApi', name: 'Database API', icon: '' },
  { key: 'transcription', name: 'Transcription', icon: '' },
];

export default function DowntimeToggle() {
  const { state, toggleApiStatus } = useSimulation();

  return (
    <div id="downtime-toggles" className="glass-card-static p-5">
      <div className="flex items-center gap-2 mb-4">

        <h3 className="text-sm font-semibold text-text-primary">Downtime Toggles</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Kill specific APIs to simulate outages</p>

      <div className="space-y-3">
        {SERVICES.map(({ key, name, icon }) => {
          const isUp = key === 'transcription'
            ? state[key].status === 'active'
            : state[key].status === 'up';

          return (
            <div key={key} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${isUp ? 'bg-bg-elevated/50' : 'bg-accent-red/5 border border-accent-red/20'}`}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <div>
                  <span className="text-sm font-medium text-text-primary">{name}</span>
                  <div className={`text-xs ${isUp ? 'text-accent-emerald' : 'text-accent-red'}`}>
                    {isUp ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleApiStatus(key)}
                className={`toggle-switch ${isUp ? 'active' : ''}`}
                aria-label={`Toggle ${name}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
