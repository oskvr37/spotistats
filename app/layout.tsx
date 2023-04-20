import './globals.sass'

export const metadata = {
  title: 'Spotify Stats',
  description: 'Check your Spotify listening statistics!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
