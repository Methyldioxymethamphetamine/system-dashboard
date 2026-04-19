import { analyzeSentiment } from '../components/health/SentimentFeed';
import { getHealthStatus } from '../hooks/useSimulationEngine';

export function generateGeminiPrompt(simulationState) {
  const { chatApi, videoApi, audioApi, databaseApi, transcription, sentimentFeedback } = simulationState;

  const services = {
    chatApi: { ...chatApi, health: getHealthStatus('chatApi', chatApi) },
    videoApi: { ...videoApi, health: getHealthStatus('videoApi', videoApi) },
    audioApi: { ...audioApi, health: getHealthStatus('audioApi', audioApi) },
    databaseApi: { ...databaseApi, health: getHealthStatus('databaseApi', databaseApi) },
    transcription: { ...transcription, health: getHealthStatus('transcription', transcription) },
  };

  const failedServices = Object.entries(services)
    .filter(([, v]) => v.health === 'red')
    .map(([k]) => k);

  const degradedServices = Object.entries(services)
    .filter(([, v]) => v.health === 'yellow')
    .map(([k]) => k);

  const negativeSentiments = sentimentFeedback
    .filter(f => analyzeSentiment(f.text) === 'negative')
    .map(f => f.text);

  const positiveSentiments = sentimentFeedback
    .filter(f => analyzeSentiment(f.text) === 'positive')
    .map(f => f.text);

  const prompt = {
    system: `You are an AI CRM analyst for DEVCRM PRO, a communication platform. Analyze the provided system health metrics and user sentiment data. Generate actionable Sales Action Recommendations and Smart Follow-ups to mitigate customer churn and capitalize on engagement opportunities.`,
    context: {
      timestamp: new Date().toISOString(),
      systemHealth: {
        failedServices,
        degradedServices,
        metrics: {
          chatApi: { msgPerSec: chatApi.msgPerSec, status: chatApi.status },
          videoApi: { latencyMs: videoApi.latencyMs, packetLoss: videoApi.packetLoss, status: videoApi.status },
          audioApi: { latencyMs: audioApi.latencyMs, status: audioApi.status },
          databaseApi: { queryTimeMs: databaseApi.queryTimeMs, status: databaseApi.status },
          transcription: { status: transcription.status },
        },
      },
      userSentiment: {
        negativeFeedback: negativeSentiments,
        positiveFeedback: positiveSentiments,
        totalEntries: sentimentFeedback.length,
      },
    },
    task: `Based on the current system state:
1. Generate 3 prioritized Sales Action Recommendations.
2. Suggest Smart Follow-up messages for affected customers.
3. Identify upsell or retention opportunities.

Output as JSON:
{
  "recommendations": [
    { "priority": "High/Medium/Low", "action": "...", "rationale": "..." }
  ],
  "smartFollowUps": [
    { "target": "...", "message": "...", "channel": "email/call/chat" }
  ],
  "retentionScore": 0-100,
  "summary": "..."
}`,
  };

  return prompt;
}

export function generateMockResponse(prompt) {
  const { failedServices, degradedServices } = prompt.context.systemHealth;
  const { negativeFeedback } = prompt.context.userSentiment;
  const hasIssues = failedServices.length > 0 || degradedServices.length > 0 || negativeFeedback.length > 0;

  if (!hasIssues) {
    return {
      recommendations: [
        { priority: 'Low', action: 'Send satisfaction survey to active users', rationale: 'All systems operational — ideal time to gather positive testimonials.' },
        { priority: 'Low', action: 'Schedule quarterly business review', rationale: 'Stable period presents opportunity for strategic planning.' },
        { priority: 'Medium', action: 'Promote premium features', rationale: 'High system reliability supports upsell conversations.' },
      ],
      smartFollowUps: [
        { target: 'Enterprise Accounts', message: 'Your platform uptime has been 99.9% this month. Let\'s discuss scaling your plan!', channel: 'email' },
      ],
      retentionScore: 92,
      summary: 'All systems nominal. Focus on growth and upsell opportunities.',
    };
  }

  const recs = [];
  if (failedServices.length > 0) {
    recs.push({
      priority: 'High',
      action: `Proactively notify affected customers about ${failedServices.join(', ')} outage`,
      rationale: 'Transparent communication during outages reduces churn by up to 25%.',
    });
  }
  if (negativeFeedback.length > 0) {
    recs.push({
      priority: 'High',
      action: 'Deploy customer success team for immediate outreach',
      rationale: `${negativeFeedback.length} negative feedback entries detected — proactive engagement critical.`,
    });
  }
  if (degradedServices.length > 0) {
    recs.push({
      priority: 'Medium',
      action: `Offer service credits for ${degradedServices.join(', ')} degradation`,
      rationale: 'Pre-emptive credits demonstrate accountability.',
    });
  }
  recs.push({
    priority: 'Medium',
    action: 'Schedule technical deep-dive with engineering',
    rationale: 'Root cause analysis prevents repeat incidents.',
  });

  return {
    recommendations: recs.slice(0, 3),
    smartFollowUps: [
      {
        target: 'Affected Enterprise Clients',
        message: `We're aware of the current service issues and our team is actively working on resolution. We'll provide a full incident report within 24 hours.`,
        channel: 'email',
      },
      {
        target: 'Users with Negative Feedback',
        message: 'We heard your feedback and want to make it right. Our support team will reach out shortly.',
        channel: 'chat',
      },
    ],
    retentionScore: Math.max(20, 90 - failedServices.length * 20 - negativeFeedback.length * 5),
    summary: `${failedServices.length} critical failure(s), ${degradedServices.length} degraded service(s), ${negativeFeedback.length} negative sentiment(s). Immediate action required.`,
  };
}
