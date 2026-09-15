import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAgencyInventory } from "@/lib/sheets";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { agencyWhatsappNumber, leadPhone, leadMessage } = await req.json();

    if (!agencyWhatsappNumber || !leadMessage) {
      return NextResponse.json(
        { error: "Missing agencyWhatsappNumber or leadMessage" },
        { status: 400 }
      );
    }

    // STEP 1: Multi-Tenant Data Isolation (Lookup specific agency in Supabase)
    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .select("id, name, google_refresh_token, google_sheet_id")
      .eq("whatsapp_number", agencyWhatsappNumber)
      .single();

    if (agencyError || !agency) {
      console.error("Agency lookup failed:", agencyError);
      return NextResponse.json(
        { error: "Agency not found or inactive" },
        { status: 404 }
      );
    }

    // STEP 2: Fetch LIVE inventory from THIS agency's Google Sheet only
    let inventoryData = [];
    try {
      inventoryData = await getAgencyInventory(
        agency.google_refresh_token,
        agency.google_sheet_id
      );
    } catch (sheetErr) {
      console.error("Failed to read agency Google Sheet:", sheetErr);
      return NextResponse.json(
        { error: "Unable to access agency inventory sheet" },
        { status: 500 }
      );
    }

    // STEP 3: Isolated Context Execution for Gemini 2.5
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      You are an AI Sales Agent representing ${agency.name}.
      Your primary job is to answer prospective client queries using ONLY the live property inventory data provided below.
      
      RULES:
      1. Be polite, clear, and professional.
      2. If a matching property is found, state its price, location, and key features concisely.
      3. Encourage the client to schedule a site visit.
      4. If the requested property or budget range is not in the data, state politely that it is currently unavailable.

      LIVE INVENTORY DATA FOR ${agency.name}:
      ${JSON.stringify(inventoryData)}

      CLIENT INQUIRY:
      ${leadMessage}
    `;

    const result = await model.generateContent(systemPrompt);
    const replyText = result.response.text();

    // STEP 4: Store Conversation History in Supabase
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
  } catch (error) {
    console.error("Chat route processing error:", error);
    return NextResponse.json(
      { error: "Internal server error processing request" },
      { status: 500 }
    );
  }
}



