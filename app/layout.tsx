import "./globals.sass";
import { cookies } from "next/headers";
import Header from "@/components/Header";

export const metadata = {
  title: "Spotify Stats",
  description: "Check your Spotify listening statistics!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;

  return (
    <html lang="en">
      <body>
        <Header token={accessToken} />
        {children}
      </body>
    </html>
  );
}
