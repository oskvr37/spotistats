import Link from "next/link"
import styles from "./page.module.sass"
export default function Home() {
  return (
    <main>
      <div className={styles.nav}>
      <Link href="/artists/long_term">
        Check top artists
      </Link>
      <Link href="/tracks/long_term">
        Check top tracks
      </Link>
      </div>
    </main>
  )
}
