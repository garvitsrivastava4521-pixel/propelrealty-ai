'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am PropelRealty AI. Looking to buy, sell, or schedule a tour today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 9));

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          sessionId: sessionId,
        }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: 'assistant', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error connecting to engine.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 pb-24 md:p-12 md:pb-24">
      {/* Centered Top Header with Logo Only */}
      <header className="max-w-7xl w-full mx-auto flex justify-center items-center py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
            P
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">PropelRealty AI</span>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center my-8">
        <div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
              Autonomous Sales Funnel
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-6 leading-tight">
            Capture Every Real Estate Lead 24/7 with Autonomous AI.
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Intercept incoming web traffic in sub-15 seconds, pre-screen budgets, and auto-book Zoom property tours directly into your calendar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/terms" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-bold transition">
              Terms and Conditions
            </Link>
            <Link href="/pricing" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-center font-semibold transition">
              View Pricing
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-3">*All plans include a mandatory $900 setup fee after trial.</p>
        </div>

        {/* Live Interactive Chat Sandbox */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col h-[480px]">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">Live AI Lead Qualifier Sandbox</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-500 italic">PropelRealty AI is typing...</div>}
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-800 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Test the buyer bot..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
            />
            <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition">
              Send
            </button>
          </div>
        </div>
      </section>

      {/* Persistent Bottom 4-Option Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 py-3 px-4">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2 text-center">
          <Link href="/" className="flex flex-col items-center justify-center text-xs font-semibold text-blue-400 hover:text-blue-300">
            <span className="text-lg">🏠</span>
            <span>Home</span>
          </Link>

          <Link href="#features" className="flex flex-col items-center justify-center text-xs font-semibold text-slate-400 hover:text-white">
            <span className="text-lg">⚡</span>
            <span>Features</span>
          </Link>

          <Link href="/pricing" className="flex flex-col items-center justify-center text-xs font-semibold text-slate-400 hover:text-white">
            <span className="text-lg">💳</span>
            <span>Plans</span>
          </Link>

          <Link href="/onboarding" className="flex flex-col items-center justify-center text-xs font-semibold text-green-400 hover:text-green-300">
            <span className="text-lg">🚀</span>
            <span>Demo (7-Day Free)</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}



