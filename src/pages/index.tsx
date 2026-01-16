import Head from 'next/head';

import { Home } from '../components/home/Home';
import { Header } from '../components/layout/Header';
import { Projects } from '../components/project/Projects';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  const title = `Kreatli | ${isSignedIn ? 'Projects' : 'Video Collaboration & Review Platform'}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Kreatli is a Video Collaboration & Review Platform that helps creative teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <link rel="canonical" href="https://kreatli.com" />
        <meta property="og:url" content="https://kreatli.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Kreatli is a Video Collaboration & Review Platform that helps creative teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="Kreatli is a Video Collaboration & Review Platform that helps creative teams streamline video production workflows. Get frame-accurate feedback, manage projects, collaborate in real-time, and deliver faster—all in one place."
        />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      {isSignedIn ? <Projects /> : <Home />}
    </>
  );
}
