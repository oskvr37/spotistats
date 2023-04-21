import { NextResponse } from "next/server";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = "user-read-private user-read-email";

function generateRandomString() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function GET() {
  const state = generateRandomString();
  const redirect_uri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}`;

  // store state in cookies and then redirect to Spotify auth

  const headers = new Headers();

  headers.set(
    "Set-Cookie",
    `AUTH_STATE=${state}; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  return NextResponse.redirect(redirect_uri, { headers });
}
