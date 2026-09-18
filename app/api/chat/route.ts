import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAgencyInventory } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const agencyWhatsAppNumber =
      body.agencyWhatsAppNumber ||
      body.agencywhatsappNumber ||
      body.whatsapp_number ||
      body.agency_whatsapp_number;
    const leadPhone = body.leadPhone || body.lead_phone;
    const leadMessage = body.leadMessage || body.message || body.lead_message;

    if (!agencyWhatsAppNumber || !leadMessage) {
      return NextResponse.json(
        { error: "Missing agencyWhatsAppNumber or leadMessage" },
        { status: 400 }
      );
    }

    // 1. Fetch Agency & Trial Status
    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .select("id, name, created_at, trial_ends_at, is_paid, google_refresh_token, google_sheet_id")
      .eq("whatsapp_number", agencyWhatsAppNumber)
      .single();

    if (agencyError || !agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // 2. Check 7-Day Free Trial Expiration
    const now = new Date();
    const trialEnd = agency.trial_ends_at 
      ? new Date(agency.trial_ends_at) 
      : new Date(new Date(agency.created_at).getTime() + 7 * 24 * 60 * 60 * 1000);

    if (!agency.is_paid && now > trialEnd) {
      return NextResponse.json(
        { error: "Your 7-day free trial has expired. Please upgrade to a paid plan." },
        { status: 403 }
      );
    }

    // 3. Fetch Agency Sheet Inventory
    let inventoryData = [];
    try {
      inventoryData = await getAgencyInventory(
        agency.google_refresh_token,
        agency.google_sheet_id
      );
    } catch (sheetErr) {
      console.error("Sheet read error:", sheetErr);
      return NextResponse.json({ error: "Failed to read agency inventory sheet" }, { status: 500 });
    }

    const systemInstruction = `You are an AI Sales Agent representing ${agency.name}.
Answer prospective client queries using ONLY the live property inventory data below.

RULES:
1. Be polite, clear, and professional.
2. If a matching property is found, state its price, location, and key features concisely.
3. Encourage the client to schedule a site visit.
4. If unavailable, state so politely.

LIVE INVENTORY DATA FOR ${agency.name}:
${JSON.stringify(inventoryData)}`;

    let replyText = "";

    // 4. Generate AI Response (Prefers OpenAI if available, falls back to Gemini)
    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Very cheap/free tier friendly
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: leadMessage }
        ]
      });
      replyText = completion.choices[0]?.message?.content || "";
    } else if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "CLIENT INQUIRY:\n" + leadMessage,
        config: { systemInstruction },
      });
      replyText = response.text || "";
    } else {
      return NextResponse.json({ error: "No AI API key configured" }, { status: 500 });
    }

    // 5. Save Conversation Record
    if (leadPhone) {
      await supabase.from("conversations").insert({
        agency_id: agency.id,
        lead_phone: leadPhone,
        message_history: [
          { role: "user", content: leadMessage, timestamp: new Date().toISOString() },
          { role: "assistant", content: replyText, timestamp: new Date().toISOString() },
        ],
      });
    }

    return NextResponse.json({ reply: replyText });
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}



