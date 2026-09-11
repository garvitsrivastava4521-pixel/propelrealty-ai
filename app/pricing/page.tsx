'use client';

import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  { id: 'starter', name: 'Starter', price: 299, variantId: 'VAR_STARTER_ID', audience: 'Individual Agents', features: ['Basic AI lead response', 'Listing copy generator', 'Standard email support'] },
  { id: 'custom', name: 'Custom', price: 800, variantId: 'VAR_CUSTOM_ID', audience: 'Boutique Agencies', features: ['Tailored options', 'Automated tour scheduling', 'CRM integrations'] },
  { id: 'advanced', name: 'Advanced', price: 1500, variantId: 'VAR_ADVANCED_ID', audience: 'Mid-Sized Brokerages', features: ['24/7 AI multi-channel follow-up', 'Market report generator', 'Priority support'] },
  { id: 'enterprise', name: 'Enterprise', price: 4500, variantId: 'VAR_ENTERPRISE_ID', audience: 'Large Agencies', features: ['Dedicated API infrastructure', 'Custom CRM webhooks', 'SLA guarantees'] },
];

export default function PricingPage() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'usdt'>('card');
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (tier: typeof TIERS[0]) => {
    setLoadingTier(tier.id);
    try {
      if (paymentMethod === 'card') {
        const res = await fetch('/api/checkout/lemonsqueezy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variantId: tier.variantId, tierName: tier.name })
        });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      } else {
        const res = await fetch('/api/checkout/nowpayments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: tier.price + 900, tierName: tier.name }) // Price + $900 setup fee
        });
        const data = await res.json();
        if (data.invoice_url) window.location.href = data.invoice_url;
      }
    } catch (err) {
      alert('Checkout initialization failed. Check console.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <header className="max-w-7xl mx-auto flex justify-between items-center pb-12">
        <Link href="/" className="text-2xl font-extrabold text-blue-500">PropelRealty AI</Link>
        <Link href="/onboarding" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-semibold rounded-lg">
          Start 7-Day Free Trial
        </Link>
      </header>

      <section className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Flexible Billing for Every Agency</h1>
        <p className="text-slate-400 text-lg mb-8">All plans include a 7-day free trial. A one-time $900 mandatory setup fee applies upon activation.</p>

        {/* Payment Method Switcher */}
        <div className="inline-flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Credit Card / Card (LemonSqueezy)
          </button>
          <button
            onClick={() => setPaymentMethod('usdt')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${paymentMethod === 'usdt' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            USDT (BEP20 / BSC Network)
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {TIERS.map((tier) => (
          <div key={tier.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
              <p className="text-xs text-slate-400 mb-6">{tier.audience}</p>
              <div className="text-4xl font-extrabold mb-2">${tier.price} <span className="text-sm font-normal text-slate-400">/ mo</span></div>
              <p className="text-xs text-emerald-400 font-medium mb-6">+ $900 setup fee</p>
              
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(tier)}
              disabled={loadingTier === tier.id}
              className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                paymentMethod === 'card'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {loadingTier === tier.id ? 'Processing...' : `Pay via ${paymentMethod === 'card' ? 'Card' : 'USDT BEP20'}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
