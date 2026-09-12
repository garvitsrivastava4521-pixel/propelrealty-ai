import { NextRequest, NextResponse } from "next/server";
import { Paddle, Environment } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_API_KEY || "", {
  environment:
    process.env.PADDLE_ENVIRONMENT === "production"
      ? Environment.production
      : Environment.sandbox,
});

export async function POST(req: NextRequest) {
  const signature = req.headers.get("paddle-signature");
  const rawBody = await req.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
  }

  try {
    // Unmask and parse the event using the SDK webhook helper
    const event = paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET_KEY || "",
      signature
    );

    switch (event.eventType) {
      case "transaction.completed":
        const transactionData = event.data;
        const userId = transactionData.customData?.userId;
        
        console.log(`Payment received for user: ${userId}`);
        // TODO: Update database status in Supabase
        break;

      default:
        console.log(`Unhandled Paddle event: ${event.eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
