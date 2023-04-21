import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import styles from "./profile.module.sass";

// TODO: handle errors

async function getProfile(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    return {};
  }

  return res.json();
}

export default async function Profile({
  accessToken,
}: {
  accessToken: string;
}) {
  const { display_name, images } = await getProfile(accessToken);

  if (!display_name) {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }

  const { url } = images[0];

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <p>{`Hello, ${display_name}`}</p>
        <img src={url} alt="profile picture" />
      </div>
      <LogoutButton />
    </div>
  );
}
