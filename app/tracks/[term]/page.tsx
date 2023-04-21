import { cookies } from "next/headers";
import styles from "@/app/stats.module.sass";

async function getTracks(accessToken: string, term: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${term}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  console.log("[ getTracks ]");

  if (!res.ok) {
    console.error(res.status);
    return {};
  }

  return res.json();
}

export default async function Tracks({ params }: { params: { term: string } }) {
  const { term } = params;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;

  if (!accessToken) {
    return (
        <p>Log in to see your top tracks</p>
    );
  }

  const { items } = await getTracks(accessToken, term);

  if (!items) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={styles.container}>
      {items.map((track: any, index: number) => (
        <div className={styles.item} key={track.id}>
          <div className={styles.info}>
            <img
              className={styles.image}
              src={track.album.images[0].url}
              alt={track.name}
            />
            <div className={styles.text}>
              <p>
                {index + 1}. {track.name}
              </p>
            </div>
            <img className={styles.blur} src={track.album.images[0].url} />
          </div>
        </div>
      ))}
    </div>
  );
}
