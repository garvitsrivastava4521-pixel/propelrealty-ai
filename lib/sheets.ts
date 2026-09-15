import { google } from "googleapis";

export async function getAgencyInventory(refreshToken: string, spreadsheetId: string) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // Authorize dynamically using the specific agency's refresh token
  auth.setCredentials({ refresh_token: refreshToken });

  const sheets = google.sheets({ version: "v4", auth });
  
  // Read range from agency's sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:Z100",
  });

  return response.data.values || [];
}

