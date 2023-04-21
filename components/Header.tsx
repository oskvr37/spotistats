import Link from "next/link";
import Profile from "./Profile";
export default function Header({ token }: { token: string | undefined }) {
  return (
    <header>
      <div>
        <Link href="/">
        Spotify Stats
        </Link>
        {/* @ts-ignore */}
        <Profile accessToken={token} />
      </div>
    </header>
  );
}
