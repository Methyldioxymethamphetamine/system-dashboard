import { useEffect, useRef } from 'react';
import { useSimulation } from '../context/SimulationContext';

function addJitter(base, jitterPercent = 15) {
  const jitter = base * (jitterPercent / 100);
  return Math.max(0, base + (Math.random() - 0.5) * 2 * jitter);
}

export function getHealthStatus(apiName, metrics) {
  if (apiName === 'transcription') {
    return metrics.status === 'active' ? 'green' : metrics.status === 'degraded' ? 'yellow' : 'red';
  }

  if (metrics.status === 'down') return 'red';

  switch (apiName) {
    case 'chatApi': {
      if (metrics.msgPerSec < 20) return 'red';
      if (metrics.msgPerSec < 60) return 'yellow';
      return 'green';
    }
    case 'videoApi': {
      if (metrics.latencyMs > 500 || metrics.packetLoss > 10) return 'red';
      if (metrics.latencyMs > 100 || metrics.packetLoss > 2) return 'yellow';
      return 'green';
    }
    case 'audioApi': {
      if (metrics.latencyMs > 500) return 'red';
      if (metrics.latencyMs > 100) return 'yellow';
      return 'green';
    }
    case 'databaseApi': {
      if (metrics.queryTimeMs > 500) return 'red';
      if (metrics.queryTimeMs > 100) return 'yellow';
      return 'green';
    }
    default:
      return 'green';
  }
}

export function useSimulationEngine() {
  const { state, appendHistory } = useSimulation();
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const dataPoint = {
        time: timeLabel,
        timestamp: now.getTime(),
        chatMsgPerSec: s.chatApi.status === 'down' ? 0 : Math.round(addJitter(s.chatApi.msgPerSec)),
        videoLatency: s.videoApi.status === 'down' ? 0 : Math.round(addJitter(s.videoApi.latencyMs)),
        videoPacketLoss: s.videoApi.status === 'down' ? 100 : parseFloat(addJitter(s.videoApi.packetLoss, 25).toFixed(1)),
        audioLatency: s.audioApi.status === 'down' ? 0 : Math.round(addJitter(s.audioApi.latencyMs)),
        dbQueryTime: s.databaseApi.status === 'down' ? 0 : Math.round(addJitter(s.databaseApi.queryTimeMs)),
        chatStatus: getHealthStatus('chatApi', s.chatApi),
        videoStatus: getHealthStatus('videoApi', s.videoApi),
        audioStatus: getHealthStatus('audioApi', s.audioApi),
        dbStatus: getHealthStatus('databaseApi', s.databaseApi),
        transcriptionStatus: getHealthStatus('transcription', s.transcription),
      };

      appendHistory(dataPoint);
    }, 2000);

    return () => clearInterval(interval);
  }, [appendHistory]);
}
