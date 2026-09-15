import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAgencyInventory } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing" }, { status: 500 });
    }

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

    // STEP 1: Multi-Tenant Lookup (Supabase)
    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .select("id, name, google_refresh_token, google_sheet_id")
      .eq("whatsapp_number", agencyWhatsAppNumber)
      .single();

    if (agencyError || !agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // STEP 2: Fetch Agency Inventory from Google Sheets
    let inventoryData = [];
    try {
      inventoryData = await getAgencyInventory(
        agency.google_refresh_token,
        agency.google_sheet_id
      );
    } catch (sheetErr) {
      console.error("Sheet read error:", sheetErr);
      return NextResponse.json(
        { error: "Failed to read agency inventory sheet" },
        { status: 500 }
      );
    }

    // STEP 3: Initialize Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
You are an AI Sales Agent representing ${agency.name}.
Answer prospective client queries using ONLY the live property inventory data below.

RULES:
1. Be polite, clear, and professional.
2. If a matching property is found, state its price, location, and key features concisely.
3. Encourage the client to schedule a site visit.
4. If unavailable, state so politely.

LIVE INVENTORY DATA FOR ${agency.name}:
${JSON.stringify(inventoryData)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
            contents: "CLIENT INQUIRY:\n" + leadMessage,

      config: {
        systemInstruction: systemInstruction,
      },
    });

    const replyText = response.text || "";

    // STEP 4: Save Conversation Record in Supabase
    if (leadPhone) {
      const { error: dbError } = await supabase.from("conversations").insert({
        agency_id: agency.id,
        lead_phone: leadPhone,
        message_history: [
          { role: "user", content: leadMessage, timestamp: new Date().toISOString() },
          { role: "assistant", content: replyText, timestamp: new Date().toISOString() },
        ],
      });

      if (dbError) console.error("Database logging error:", dbError);
    }

    return NextResponse.json({
      success: true,
      agency: agency.name,
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error?.message },
      { status: 500 }
    );
  }
}







