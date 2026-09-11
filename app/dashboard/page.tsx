'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock Lead Data - Replaced with Supabase client-side or server fetch in production
const INITIAL_LEADS = [
  {
    id: 'lead-1',
    buyerName: 'Marcus Vance',
    buyerPhone: '+1 (555) 234-5678',
    budget: '$850,000 - $1.1M',
    timeline: '30-60 Days',
    preApproved: true,
    propertyType: 'Waterfront Condo / 3 Bed',
    zoomLink: 'https://zoom.us/j/98234710293',
    status: 'Scheduled',
    createdAt: '12 mins ago',
  },
  {
    id: 'lead-2',
    buyerName: 'Elena Rostova',
    buyerPhone: '+1 (555) 876-5432',
    budget: '$1.5M+',
    timeline: 'Immediate (< 30 Days)',
    preApproved: true,
    propertyType: 'Single Family / Gated',
    zoomLink: 'https://zoom.us/j/81230491823',
    status: 'Scheduled',
    createdAt: '45 mins ago',
  },
  {
    id: 'lead-3',
    buyerName: 'David K. Chen',
    buyerPhone: '+1 (555) 345-6789',
    budget: '$600,000',
    timeline: '3-6 Months',
    preApproved: false,
    propertyType: 'Townhouse',
    zoomLink: 'Pending Qualification',
    status: 'In Progress',
    createdAt: '2 hours ago',
  },
];

export default function DashboardPage() {
  const [leads] = useState(INITIAL_LEADS);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'in_progress'>('all');

  const filteredLeads = leads.filter((lead) => {
    if (filter === 'scheduled') return lead.status === 'Scheduled';
    if (filter === 'in_progress') return lead.status === 'In Progress';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-extrabold text-blue-500 tracking-tight">
              PropelRealty AI
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
              <Link href="/dashboard" className="text-white border-b-2 border-blue-500 pb-1">
                Overview
              </Link>
              <Link href="/chat" className="hover:text-white transition">
                AI Agent Config
              </Link>
              <Link href="/pricing" className="hover:text-white transition">
                Billing & Plan
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              7-Day Trial Active
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              AR
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Workspace Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Apex Realty Workspace</h1>
            <p className="text-slate-400 text-sm mt-1">
              Live AI qualification metrics and automated tour bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Embed Script copied: <script src="https://propelrealty.ai/widget.js" data-agency="apex"></script>')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm font-semibold transition"
            >
              Get Website Widget Script
            </button>
            <Link
              href="/chat"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition text-white"
            >
              Test AI Prompt Sandbox
            </Link>
          </div>
        </div>

        {/* High-Level Operational Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Sub-15s Speed-to-Lead', value: '99.4%', detail: 'Avg response time: 8.2s', color: 'text-blue-400' },
            { label: 'Zoom Tours Scheduled', value: '42', detail: 'Direct to Google/Outlook', color: 'text-emerald-400' },
            { label: 'Lead Qualification Rate', value: '68.5%', detail: 'Budget & pre-approval verified', color: 'text-purple-400' },
            { label: 'Total Inquiries Processed', value: '184', detail: 'Current billing cycle', color: 'text-slate-200' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</span>
              <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-slate-500">{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* Lead Qualification & Booking Table Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Recent Qualified Buyer Leads</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time buyer profiles screened by PropelRealty AI.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md transition ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                All Leads
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-3 py-1.5 rounded-md transition ${filter === 'scheduled' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Tour Booked
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-3 py-1.5 rounded-md transition ${filter === 'in_progress' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                In Qualification
              </button>
            </div>
          </div>

          {/* Responsive Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Buyer Details</th>
                  <th className="px-6 py-4">Budget / Preferences</th>
                  <th className="px-6 py-4">Timeline</th>
                  <th className="px-6 py-4">Financing</th>
                  <th className="px-6 py-4">Zoom Tour Link</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{lead.buyerName}</div>
                      <div className="text-xs text-slate-400">{lead.buyerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{lead.budget}</div>
                      <div className="text-xs text-slate-400">{lead.propertyType}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{lead.timeline}</td>
                    <td className="px-6 py-4">
                      {lead.preApproved ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                          ✓ Pre-Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                          ⚠ Needs Approval
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {lead.zoomLink.startsWith('http') ? (
                        <a
                          href={lead.zoomLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white font-medium transition inline-block"
                        >
                          Launch Zoom Meeting ↗
                        </a>
                      ) : (
                        <span className="text-xs text-slate-500 italic">{lead.zoomLink}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          lead.status === 'Scheduled'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

