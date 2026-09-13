'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 pb-24 md:p-12 md:pb-24">
      {/* Centered Header */}
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center py-4 border-b border-slate-800 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
            P
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">PropelRealty AI</span>
        </Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition">
          ← Back to Home
        </Link>
      </header>

      {/* Terms & Conditions Content */}
      <section className="max-w-4xl w-full mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Please read these terms and conditions carefully before using PropelRealty AI services.
          </p>
        </div>

        <div className="space-y-6">
          {/* Term 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600/20 text-blue-400 font-bold px-3 py-1 rounded-md text-sm border border-blue-500/30">
                Term 1
              </span>
              <h2 className="text-xl font-bold">30-Day Billing Cycle</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Any plan purchased on PropelRealty AI strictly operates on a standard 30-day recurring billing cycle.
            </p>
          </div>

          {/* Term 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600/20 text-blue-400 font-bold px-3 py-1 rounded-md text-sm border border-blue-500/30">
                Term 2
              </span>
              <h2 className="text-xl font-bold">Renewal Notice & 24-Hour Payment Window</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              After the 30-day billing cycle completes, the buyer will receive a notification for plan renewal. A 24-hour open window is provided to complete the monthly retainer fee payment to ensure uninterrupted service continuity.
              <br /><br />
              <strong className="text-amber-400">Important:</strong> If the buyer fails to pay the monthly retainer fee within this 24-hour open window, the active plan will be terminated. To reactivate services thereafter, the buyer must purchase a completely new plan, which will require paying the one-time onboarding setup fee again.
            </p>
          </div>

          {/* Term 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-600/20 text-blue-400 font-bold px-3 py-1 rounded-md text-sm border border-blue-500/30">
                Term 3
              </span>
              <h2 className="text-xl font-bold">48-Hour Complaint Window & Anti-Spam Policy</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Any performance complaints regarding the AI chatbot (such as meeting scheduling capabilities) must be formally submitted within 48 hours of initial plan purchase. 
              <br /><br />
              After the 48-hour post-purchase window closes, no complaints, performance disputes, or feedback refund requests will be accepted. This term is strictly enforced to prevent misuse, platform exploitation, and unauthorized refund requests.
            </p>
          </div>
        </div>
      </section>

      {/* Persistent Bottom 4-Option Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 py-3 px-4">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2 text-center">
          <Link href="/" className="flex flex-col items-center justify-center text-xs font-semibold text-slate-400 hover:text-white">
            <span className="text-lg">🏠</span>
            <span>Home</span>
          </Link>

          <Link href="/#features" className="flex flex-col items-center justify-center text-xs font-semibold text-slate-400 hover:text-white">
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

