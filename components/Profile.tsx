import LoginButton from "@/components/LoginButton";

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
  const { display_name } = await getProfile(accessToken);

  if (!display_name) {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }

  return (
    <div>
      <h1>{`Hello, ${display_name}`}</h1>
    </div>
  );
}
