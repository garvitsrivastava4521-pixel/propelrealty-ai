import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [paymentMethod, setPaymentMethod] = useState<"paddle" | "nowpayments">("nowpayments");

  return (
    <div className="min-h-screen bg-[#090D16] text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center">
          {/* SVG Logo */}
          <Image
            src="/logo.svg"
            alt="PropelRealty AI Logo"
            width={180}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navbar CTA Button */}
        <Link
          href="/demo"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          Book Live Demo
        </Link>
      </nav>

      {/* PRICING SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Flexible Billing for Every Agency
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
          A one-time $900 mandatory setup fee applies upon activation.
        </p>

        {/* PAYMENT METHOD TOGGLE */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto mb-10 bg-[#111827] p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setPaymentMethod("paddle")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              paymentMethod === "paddle"
                ? "bg-blue-600 text-white shadow-sm font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Credit Card (Paddle)
          </button>
          <button
            onClick={() => setPaymentMethod("nowpayments")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              paymentMethod === "nowpayments"
                ? "bg-[#10B981] text-white shadow-sm font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Crypto (NOWPayments)
          </button>
        </div>

        {/* PRICING CARD */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 max-w-md mx-auto text-left shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Starter</h2>
            <p className="text-gray-400 text-sm">Individual brokers & small agencies</p>
          </div>

          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl sm:text-5xl font-extrabold text-white">$299</span>
            <span className="text-gray-400 font-medium">/ mo</span>
          </div>

          <ul className="space-y-3 mb-8 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span> Automated WhatsApp Lead Responder
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span> 30-Second Instant Qualification
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span> Direct Site-Visit Booking Engine
            </li>
          </ul>

          {/* DYNAMIC CHECKOUT BUTTON */}
          {paymentMethod === "paddle" ? (
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl text-center transition-colors shadow-lg">
              Pay via Card (Paddle)
            </button>
          ) : (
            <button className="w-full bg-[#10B981] hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl text-center transition-colors shadow-lg">
              Pay via Crypto (NOWPayments)
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

