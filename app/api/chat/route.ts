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

    const { agencyWhatsappNumber, leadPhone, leadMessage } = await req.json();

    if (!agencyWhatsappNumber || !leadMessage) {
      return NextResponse.json(
        { error: "Missing agencyWhatsappNumber or leadMessage" },
        { status: 400 }
      );
    }

    // STEP 1: Multi-Tenant Lookup (Supabase)
    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .select("id, name, google_refresh_token, google_sheet_id")
      .eq("whatsapp_number", agencyWhatsappNumber)
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

    const systemPrompt = `
      You are an AI Sales Agent representing ${agency.name}.
      Answer prospective client queries using ONLY the live property inventory data below.
      
      RULES:
      1. Be polite, clear, and professional.
      2. If a matching property is found, state its price, location, and key features concisely.
      3. Encourage the client to schedule a site visit.
      4. If unavailable, state so politely.

      LIVE INVENTORY DATA FOR ${agency.name}:
      ${JSON.stringify(inventoryData)}

      CLIENT INQUIRY:
      ${leadMessage}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    const replyText = response.text || "";

    // STEP 4: Save Conversation Record in Supabase
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




