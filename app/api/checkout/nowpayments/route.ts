import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, tierName } = await req.json();

    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: 'usd',
        pay_currency: 'usdtbsc', // USDT on BEP20 (Binance Smart Chain)
        order_id: `PROPEL_${tierName}_${Date.now()}`,
        order_description: `PropelRealty AI ${tierName} Plan + $900 Setup Fee`,
        ipn_callback_url: 'https://propelrealty.ai/api/webhook/nowpayments',
        success_url: 'https://propelrealty.ai/dashboard',
        cancel_url: 'https://propelrealty.ai/pricing'
      })
    });

    const data = await response.json();
    return NextResponse.json({ invoice_url: data.invoice_url });
  } catch {
    return NextResponse.json({ error: 'NOWPayments USDT generation failed' }, { status: 500 });
  }
}

