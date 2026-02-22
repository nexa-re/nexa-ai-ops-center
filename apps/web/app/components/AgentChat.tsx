'use client';
import { useState } from 'react';

export default function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: 'assistant', content: 'Hello! I am the Nexa AI Ops Agent. How can I assist you with your project tracking, deal underwriting, or document analysis today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userPrompt = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real implementation this hits /api/ai/chat
      // For standalone frontend demo logic, we simulate the LLM reply here if backend is detached
      const res = await fetch('http://localhost:3001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userPrompt })
      });
      
      let replyText = "I encountered an error connecting to my neural core.";
      
      if (res.ok) {
        const data = await res.json();
        replyText = data.content;
      } else {
        // Fallback for purely static frontend demo if API is offline
        await new Promise(r => setTimeout(r, 1000));
        if (userPrompt.toLowerCase().includes('ocr') || userPrompt.toLowerCase().includes('document')) {
          replyText = "I've reviewed the recently uploaded document. It contains standard commercial real estate lease clauses, but line 42 regarding the tenant's exact HVAC liability looks slightly non-standard compared to our firm's guidelines. Would you like me to flag this for legal review?";
        } else if (userPrompt.toLowerCase().includes('deal') || userPrompt.toLowerCase().includes('underwrite')) {
          replyText = "Based on current cap rates in the submarket and the projected NOI growth from the uploaded pro forma, I estimate an unlevered IRR of 14.2% over a 5-year hold. This exceeds the firm's hurdle rate of 12%.";
        } else {
          replyText = "I am processing your request. Currently, I am optimized for document analysis (try asking about OCR) and deal underwriting calculations.";
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error connecting to Nexa Agent API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? 'hidden' : 'flex'} fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 h-[500px] flex flex-col bg-[#0a0f1d] border border-blue-500/30 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
              <h3 className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Nexa Intelligence</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 border border-gray-700 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center bg-black/40 border border-gray-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-500/50">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Nexa..." 
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-gray-200 focus:outline-none"
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
