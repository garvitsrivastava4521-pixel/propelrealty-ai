import { google } from "googleapis";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000"}/api/auth/google/callback`
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const agencyId = searchParams.get("state");

  if (!code || !agencyId) {
    return NextResponse.json(
      { error: "Missing required authorization code or agency ID" },
      { status: 400 }
    );
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return NextResponse.json(
        { error: "Failed to retrieve refresh token. Re-prompt user consent." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("agencies")
      .update({ google_refresh_token: tokens.refresh_token })
      .eq("id", agencyId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Failed to save agency tokens" }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    return NextResponse.redirect(`${appUrl}/dashboard?status=sheets_connected`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

