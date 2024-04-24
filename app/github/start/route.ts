import { NextResponse } from "next/server";

const baseURL = process.env.GITHUB_OAUTH2_URL!;

export function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: process.env.GITHUB_OAUTH2_SCOPE!,
    allow_signup: process.env.GITHUB_OAUTH2_ALLOW_SIGNUP!,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return NextResponse.redirect(finalUrl);
}
