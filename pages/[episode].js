export default function EpisodePage({ episode }) {
  return (
    <>
      <pre>{JSON.stringify(episode, null, 2)}</pre>
    </>
  );
}

export async function getStaticProps({ params }) {
  const episode = await fetch(
    `https://www.learnwithjason.dev/api/episode/${params.episode}`,
  ).then((res) => res.json());

  return {
    props: { episode },
  };
}

export async function getStaticPaths() {
  const episodes = await fetch(
    'https://www.learnwithjason.dev/api/episodes',
  ).then((res) => res.json());

  const paths = episodes.map((episode) => {
    return {
      params: {
        episode: episode.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
