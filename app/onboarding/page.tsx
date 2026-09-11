'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    agencyName: '',
    teamSize: '1-5',
    marketCity: '',
    plan: 'starter'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Initialize workspace logic & route to trial dashboard
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Setup Your Agency Workspace</h1>
        <p className="text-sm text-slate-400 mb-6">Start your 7-day free trial. Setup fee ($900) processed on trial completion.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Agency / Brokerage Name</label>
            <input
              required
              type="text"
              value={formData.agencyName}
              onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Apex Realty Group"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Team Size</label>
            <select
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="1-5">1 - 5 Agents</option>
              <option value="6-20">6 - 20 Agents</option>
              <option value="21-50">21 - 50 Agents</option>
              <option value="50+">50+ Agents</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Primary Market City</label>
            <input
              required
              type="text"
              value={formData.marketCity}
              onChange={(e) => setFormData({ ...formData, marketCity: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Miami, FL"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Select Plan Tier</label>
            <select
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="starter">Starter ($299/mo)</option>
              <option value="custom">Custom ($800/mo)</option>
              <option value="advanced">Advanced ($1,500/mo)</option>
              <option value="enterprise">Enterprise ($4,500/mo)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-sm transition mt-4">
            Authorize Calendar & Start 7-Day Trial
          </button>
        </form>
      </div>
    </main>
  );
}
