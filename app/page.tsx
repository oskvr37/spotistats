import { cookies } from 'next/headers';

import Profile from "@/components/Profile"

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('token')?.value;

  return (
    <main>
      <h1>Spotify Stats</h1>

      {/* @ts-ignore */}
      <Profile accessToken={accessToken} />
    </main>
  )
}
