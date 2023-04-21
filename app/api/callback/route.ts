import { NextResponse, NextRequest } from "next/server";

// response contains state and code / error

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const { state, code, error } = Object.fromEntries(searchParams);
  
  const auth_state = request.cookies.get("AUTH_STATE")?.value;

  console.log('auth_state', auth_state)

  // TODO: handle errors
  // if error is `access_denied` then redirect
  // to login page with error message

  if (error) {
    return NextResponse.json({ error });
  }

  // app should compare the state parameter that it received in
  // the redirection URI with the state parameter it originally
  // provided to Spotify in the authorization URI
  
  // the state is generated at api/login and passed to Spotify
  // and then is returned from Spotify to api/callback
  // we need to store initial state somewhere to compare it with
  // the state returned from Spotify
  
  // the first problem that i encountered is that the state is
  // stored in cookies and i can't access it from api/callback
  // because the cookies aren't sent when request was redirected

  // the solution was simple, i had to remove SameSite attribute
  // from the cookie, so it would be sent with the request
  
  if (!auth_state) {
    return NextResponse.json({ error: "invalid_cookies" });
  }

  if (state !== auth_state) {
    return NextResponse.json({ error: "state_mismatch" });
  }

  // successful authentication

  // If the user accepted your request, then your app is ready to
  // exchange the authorization code for an Access Token.
  // It can do this by making a POST request to the /api/token endpoint.

  return NextResponse.json({ code });
}
