import { Paddle, EventName } from '@paddle/paddle-node-sdk';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const paddle = new Paddle(process.env.PADDLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = await headers();
    const signature = headersList.get('paddle-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Await the asynchronous unmarshal call
    const event = await paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET_KEY!,
      signature
    );

    switch (event.eventType) {
      case EventName.TransactionCompleted: {
        const transactionData = event.data;
        const userId = transactionData.customData?.userId;
        // Handle successful transaction logic here
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
