import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SimulationContext = createContext(null);

const STORAGE_KEY = 'devcrm-simulation-state';

const DEFAULT_STATE = {
  chatApi: { status: 'up', msgPerSec: 120 },
  videoApi: { status: 'up', latencyMs: 45, packetLoss: 0.5 },
  audioApi: { status: 'up', latencyMs: 30 },
  databaseApi: { status: 'up', queryTimeMs: 15 },
  transcription: { status: 'active' },
  sentimentFeedback: [],
  history: [],
};

function loadPersistedState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_STATE, ...parsed, history: [] };
    }
  } catch (e) {
    console.warn('Failed to load persisted simulation state:', e);
  }
  return DEFAULT_STATE;
}

function persistState(state) {
  try {
    const { history, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (e) {
    console.warn('Failed to persist simulation state:', e);
  }
}

export function SimulationProvider({ children }) {
  const [state, setState] = useState(loadPersistedState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const updateApi = useCallback((apiName, updates) => {
    setState(prev => ({
      ...prev,
      [apiName]: { ...prev[apiName], ...updates },
    }));
  }, []);

  const toggleApiStatus = useCallback((apiName) => {
    setState(prev => {
      const current = prev[apiName];
      if (apiName === 'transcription') {
        const next = current.status === 'active' ? 'offline' : 'active';
        return { ...prev, transcription: { ...current, status: next } };
      }
      const next = current.status === 'up' ? 'down' : 'up';
      return { ...prev, [apiName]: { ...current, status: next } };
    });
  }, []);

  const setLatency = useCallback((apiName, field, value) => {
    setState(prev => ({
      ...prev,
      [apiName]: { ...prev[apiName], [field]: value },
    }));
  }, []);

  const addSentiment = useCallback((text) => {
    setState(prev => ({
      ...prev,
      sentimentFeedback: [
        ...prev.sentimentFeedback,
        { text, timestamp: new Date().toISOString(), id: Date.now() },
      ],
    }));
  }, []);

  const clearSentiments = useCallback(() => {
    setState(prev => ({ ...prev, sentimentFeedback: [] }));
  }, []);

  const appendHistory = useCallback((dataPoint) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history.slice(-29), dataPoint],
    }));
  }, []);

  const resetSimulation = useCallback(() => {
    setState({ ...DEFAULT_STATE });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = {
    state,
    updateApi,
    toggleApiStatus,
    setLatency,
    addSentiment,
    clearSentiments,
    appendHistory,
    resetSimulation,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}

export { DEFAULT_STATE };
