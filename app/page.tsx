'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 pb-24 md:p-12 md:pb-24">
      {/* Centered Top Header */}
      <header className="max-w-7xl w-full mx-auto flex justify-center items-center py-4">
        <Link href="/" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 120" className="h-14 w-auto">
            <defs>
              <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            <rect x="15" y="15" width="90" height="90" rx="22" fill="url(#badgeGrad)"/>
            <path d="M 42 78 L 42 38 L 68 38 C 78 38, 82 44, 82 53 C 82 62, 78 68, 68 68 L 56 68 L 56 78 Z" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 56 53 L 70 38" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round"/>
            <text x="130" y="65" fontFamily="Inter, system-ui, sans-serif" fontSize="38" fontWeight="800" fill="#FFFFFF">
              Propel<tspan fill="#60A5FA">AI</tspan>
            </text>
            <text x="132" y="88" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#64748B" letterSpacing="3">
              REAL ESTATE ENGINE
            </text>
          </svg>
        </Link>
      </header>

      {/* Main Hero Section */}
      <section className="max-w-3xl w-full mx-auto text-center my-auto py-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
            Autonomous Sales Funnel
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 mb-6 leading-tight">
          Capture Every Real Estate Lead 24/7 with Autonomous AI.
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          Intercept incoming web traffic in sub-15 seconds, pre-screen budgets, and auto-book Zoom property tours directly into your calendar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link href="/terms" className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-bold transition shadow-lg shadow-blue-600/30">
            Terms and Conditions
          </Link>
          <Link href="/demo" className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-center font-semibold transition">
            Try Demo
          </Link>
        </div>
        <p className="text-xs text-slate-500 mt-4">*All plans include a mandatory $900 setup fee after trial.</p>
      </section>

      {/* Persistent Bottom Navigation Bar */}
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

          <Link href="/demo" className="flex flex-col items-center justify-center text-xs font-semibold text-green-400 hover:text-green-300">
            <span className="text-lg">🚀</span>
            <span>Demo (7-Day Free)</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}






