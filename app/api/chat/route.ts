import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are PropelRealty AI, an elite autonomous sales qualification engine for real estate agencies.
Your core goal is to qualify prospective buyers in under 60 seconds by extracting:
1. Target Purchase Budget
2. Buying Timeline
3. Financing / Pre-approval Status
4. Specific Property Preferences

Keep replies concise (under 2 sentences) and conversational. Once criteria are collected, ask for a preferred date and time slot to send an auto-generated Zoom property tour link.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...messages
      ],
    });

    return NextResponse.json({ reply: response.text });
  } catch {
    return NextResponse.json({ error: 'AI Qualification Engine Busy' }, { status: 500 });
  }
}
