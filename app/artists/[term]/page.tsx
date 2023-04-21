import { cookies } from "next/headers";
import styles from "@/app/stats.module.sass";

async function getArtists(accessToken: string, term: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${term}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  console.log("[ getArtists ]");

  if (!res.ok) {
    console.error(res.status);
    return {};
  }

  return res.json();
}

export default async function Artists({
  params,
}: {
  params: { term: string };
}) {
  const { term } = params;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token")?.value;

  if (!accessToken) {
    return (
        <p>Log in to see your top artists</p>
    );
  }

  const { items } = await getArtists(accessToken, term);

  if (!items) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={styles.container}>
      {items.map((artist: any, index: number) => (
        <div className={styles.item} key={artist.id}>
          <div className={styles.info}>
            <img
              className={styles.image}
              src={artist.images[0].url}
              alt={artist.name}
            />
            <p>
              {index + 1}. {artist.name}
            </p>
          </div>
          <img
            className={styles.blur}
            src={artist.images[0].url}
            alt={artist.name}
          />
        </div>
      ))}
    </div>
  );
}
