import { useState } from 'react';
import { Send, User, Sparkles, Plus, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi Creator! I'm your AI Copilot. I've analyzed your recent audience data. I noticed a 15% drop in retention at the 3-minute mark in your last video. How can I help you improve today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { 
        role: 'assistant', 
        content: "Based on your channel's history, I recommend tightening the script around the 3-minute mark. Avoid asking open-ended questions there, and instead use a 'pattern interrupt'—like a quick visual change or a bold statement. I can generate a 10-second script for you to test this. Would you like me to draft it?" 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-white flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] flex items-center">
            <Sparkles className="h-5 w-5 text-[#2563EB] mr-2" /> AI Copilot
          </h1>
          <p className="text-sm text-[#64748B]">Your intelligent content assistant.</p>
        </div>
        <button className="flex items-center text-sm font-medium text-[#2563EB] bg-[#EFF6FF] px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <Plus className="h-4 w-4 mr-2" /> New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex max-w-3xl ${msg.role === 'user' ? 'ml-auto' : ''}`}>
            
            {msg.role === 'assistant' && (
              <div className="h-8 w-8 bg-[#2563EB] text-white rounded-xl flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            <div className="flex-1">
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-[#2563EB] text-white rounded-br-none shadow-sm' 
                  : 'bg-white border border-[#E2E8F0] text-[#0F172A] rounded-bl-none shadow-sm'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {msg.content}
                </p>
              </div>
              
              {msg.role === 'assistant' && (
                <div className="flex items-center space-x-3 mt-2 ml-1">
                  <button className="text-[#94A3B8] hover:text-[#2563EB] transition-colors p-1"><Copy className="h-3.5 w-3.5" /></button>
                  <button className="text-[#94A3B8] hover:text-[#16A34A] transition-colors p-1"><ThumbsUp className="h-3.5 w-3.5" /></button>
                  <button className="text-[#94A3B8] hover:text-[#DC2626] transition-colors p-1"><ThumbsDown className="h-3.5 w-3.5" /></button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="h-8 w-8 bg-[#0F172A] text-white rounded-xl flex items-center justify-center ml-3 mt-1 flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-[#E2E8F0] flex-shrink-0">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center">
          <input
            type="text"
            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
            placeholder="Ask Copilot for ideas, script reviews, or audience insights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`absolute right-3 p-2.5 rounded-xl flex items-center justify-center transition-colors ${
              input.trim() 
                ? 'bg-[#2563EB] text-white hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </form>
        <p className="text-center text-xs text-[#94A3B8] mt-3">
          Copilot uses your analytics and audience data to generate responses.
        </p>
      </div>
    </div>
  );
}
