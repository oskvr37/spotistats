import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { code, state } = Object.fromEntries(searchParams);

  return NextResponse.json({ code, state });
}
