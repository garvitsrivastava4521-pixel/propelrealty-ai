'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am PropelRealty AI. Looking to buy, sell, or schedule a tour today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error connecting to engine.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="max-w-7xl w-full mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-extrabold tracking-tight text-blue-500">PropelRealty AI</div>
        <div className="flex gap-4">
          <a href="#pricing" className="px-4 py-2 text-sm text-slate-300 hover:text-white transition">Pricing</a>
          <Link href="/onboarding" className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition">
            Start 7-Day Free Trial
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center my-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
            Autonomous Sales Funnel
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-6 leading-tight">
            Capture Every Real Estate Lead 24/7 with Autonomous AI.
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Intercept incoming web traffic in sub-15 seconds, pre-screen budgets, and auto-book Zoom property tours directly onto agent calendars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/onboarding" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-bold text-lg transition">
              Start 7-Day Free Trial
            </Link>
            <a href="#pricing" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-center font-bold text-lg transition">
              View Pricing
            </a>
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
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-semibold transition">
              Send
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="pricing" className="max-w-7xl w-full mx-auto my-16">
        <h2 className="text-3xl font-bold text-center mb-4">Transparent Pricing for Agencies of All Sizes</h2>
        <p className="text-center text-slate-400 mb-12">All tiers include a 7-day free trial. Mandatory $900 onboarding fee applies upon activation.</p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Starter', price: '$299', audience: 'Individual Agents', features: ['Basic AI lead response', 'Listing copy generator', 'Standard email support'] },
            { title: 'Custom', price: '$800', audience: 'Boutique Agencies', features: ['Tailored options', 'Automated tour scheduling', 'CRM integrations'] },
            { title: 'Advanced', price: '$1,500', audience: 'Mid-Sized Brokerages', features: ['24/7 AI multi-channel follow-up', 'Market report generator', 'Priority support'] },
            { title: 'Enterprise', price: '$4,500', audience: 'Large Agencies', features: ['Dedicated API infrastructure', 'Custom CRM webhooks', 'SLA guarantees'] }
          ].map((tier, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition">
              <div>
                <h3 className="text-xl font-bold mb-1">{tier.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{tier.audience}</p>
                <div className="text-3xl font-extrabold mb-6">{tier.price} <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                <ul className="space-y-2 mb-6 text-sm text-slate-300">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">✓ {f}</li>
                  ))}
                </ul>
              </div>
              <Link href="/onboarding" className="w-full block text-center bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-transparent py-2 rounded-lg font-semibold text-sm transition">
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
