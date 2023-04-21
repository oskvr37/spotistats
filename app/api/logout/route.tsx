import {NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const headers = new Headers();

    // set the cookie to expire in the past to delete it

    headers.set(
      "Set-Cookie",
      `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
  
    return NextResponse.redirect(new URL(request.url).origin, { headers });
}