import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const { prompt, sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // 1. Fetch previous history for this session
    const { data: previousMessages } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    // 2. Format history for Gemini SDK
    const contents = (previousMessages || []).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    // Append the current user prompt
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    // 3. Generate response from Gemini
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    });

    const replyText = response.text || '';

    // 4. Save both the user prompt and model response to Supabase
    await supabase.from('messages').insert([
      { session_id: sessionId, role: 'user', content: prompt },
      { session_id: sessionId, role: 'model', content: replyText },
    ]);

    return NextResponse.json({ text: replyText });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}


