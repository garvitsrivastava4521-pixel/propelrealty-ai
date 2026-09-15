"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-white pb-24">
      {/* HEADER / NAVBAR */}
      <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full border-b border-gray-800/60">
        {/* Unified Home Page Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="PropelAI Real Estate Engine"
            width={180}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Back link */}
        <Link
          href="/"
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* HERO / OVERVIEW SECTION */}
      <main className="max-w-4xl mx-auto px-6 pt-10 pb-6 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-wider uppercase">
          Platform Overview & ROI Breakdown
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
          Powerful Automation for Modern Real Estate
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          See how PropelRealty AI automates lead qualification, schedules property tours sub-15 seconds, and delivers massive ROI across all brokerage sizes.
        </p>

        {/* FEATURES GRID / LIST */}
        <div className="text-left space-y-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Core Features & Workflow
          </h2>

          {/* Feature Card 1 */}
          <div className="bg-[#0D1322] border border-gray-800/80 rounded-2xl p-6 shadow-xl hover:border-gray-700 transition-all">
            <div className="text-amber-400 text-2xl mb-2">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Sub-15s Speed-to-Lead
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Instantly engages web and ad traffic the millisecond a lead submits an inquiry, eliminating lead drop-off and stopping buyers from contacting competing agencies.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#0D1322] border border-gray-800/80 rounded-2xl p-6 shadow-xl hover:border-gray-700 transition-all">
            <div className="text-blue-400 text-2xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Automated Budget & Intent Pre-Screening
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Asks crucial qualification questions (budget range, purchase timeline, preferred location) directly via WhatsApp before handing off site-visit bookings to your human agents.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-[#0D1322] border border-gray-800/80 rounded-2xl p-6 shadow-xl hover:border-gray-700 transition-all">
            <div className="text-emerald-400 text-2xl mb-2">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Direct Site-Visit Booking Engine
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automatically checks agent calendar availability and schedules face-to-face site visits or virtual walkthroughs without manual phone tag.
            </p>
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0E1A]/95 backdrop-blur-md border-t border-gray-800 py-2 px-6 flex justify-around items-center z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white text-xs">
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </Link>
        
        <Link href="/features" className="flex flex-col items-center gap-1 text-blue-400 text-xs font-semibold">
          <span className="text-lg">⚡</span>
          <span>Features</span>
        </Link>

        <Link href="/pricing" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white text-xs">
          <span className="text-lg">💳</span>
          <span>Plans</span>
        </Link>

        {/* Cleaned up tab: Removed "(7-Day Free)" */}
        <Link href="/demo" className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs font-semibold">
          <span className="text-lg">🚀</span>
          <span>Get Started</span>
        </Link>
      </nav>
    </div>
  );
}

