import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import HealthDashboard from './pages/HealthDashboard'
import ChaosController from './pages/ChaosController'
import GeminiInsightPanel from './components/ai/GeminiInsightPanel'
import SidebarLeadList from './components/layout/SidebarLeadList'
import CrmDashboard from './pages/CrmDashboard'
import SettingsDashboard from './pages/SettingsDashboard'
import CustomerSupportChatbot from './components/chaos/CustomerSupportChatbot'
import { useSimulationEngine } from './hooks/useSimulationEngine'

function App() {
  const [activeTab, setActiveTab] = useState('health')
  const [aiPanelOpen, setAiPanelOpen] = useState(false)

  // Start the simulation engine (generates data every 2s)
  useSimulationEngine()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleAI={() => setAiPanelOpen(true)}
      />

      <main className="max-w-[1440px] mx-auto px-6 py-6 flex gap-6 items-start">
        <SidebarLeadList />
        <div className="flex-1 min-w-0">
          {activeTab === 'health' && <HealthDashboard />}
          {activeTab === 'chaos' && <ChaosController />}
          {activeTab === 'crm' && <CrmDashboard />}
          {activeTab === 'settings' && <SettingsDashboard />}
        </div>
      </main>

      <GeminiInsightPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
      />
      <CustomerSupportChatbot />
    </div>
  )
}

export default App
