import { useState } from 'react';

export default function CustomerSupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I can help you with call quality, group chat performance, and platform features. What do you need assistance with?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm not sure about that. Let me connect you with an agent.";
      if (currentInput.toLowerCase().includes('quality')) {
        reply = "For call quality issues, we recommend checking your network latency. If it exceeds 150ms, you might experience drops. Should I run a diagnostic on your account?";
      } else if (currentInput.toLowerCase().includes('chat')) {
        reply = "Group chat performance is fully operational. If you are seeing delays in message delivery, please try clearing your app cache.";
      } else if (currentInput.toLowerCase().includes('feature')) {
        reply = "Our newest feature is the DevCRM Pro AI Insights panel! Have you tried it yet?";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-bg-card border border-border-subtle rounded-2xl shadow-2xl flex flex-col h-96 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="gemini-gradient p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="font-semibold text-sm">DevCRM Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-bg-primary">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent-cyan text-black rounded-tr-none' 
                    : 'bg-bg-elevated border border-border-subtle text-text-primary rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-3 bg-bg-card border-t border-border-subtle flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about call quality..."
              className="flex-1 bg-bg-primary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-cyan"
            />
            <button 
              onClick={handleSend}
              className="p-2 gemini-gradient text-white rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gemini-gradient text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
}
