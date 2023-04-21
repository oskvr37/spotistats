import Link from "next/link";
import styles from "@/app/stats.module.sass";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className={styles.header}>
        <Link href="/">Go back</Link>
        <h1>Top Artists</h1>
      </div>
      <div className={styles.nav}>
        <Link href="/artists/long_term">All time</Link>
        <Link href="/artists/medium_term">6 months</Link>
        <Link href="/artists/short_term">4 weeks</Link>
      </div>
      {children}
    </main>
  );
}
