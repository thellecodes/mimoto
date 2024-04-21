import Layout from '../components/layout';
import '../app/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [useLayout, setUseLayout] = useState(true);

  useEffect(() => {
    const noLayoutPaths = ['/welcome', '/pay/nkoorty'];
    setUseLayout(!noLayoutPaths.includes(router.pathname));
  }, [router.pathname]);

  const content = useLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <Head>
        <title>Mimoto</title>
        <link rel="icon" href="/Mimoto_bg.png" />
        {/* Other meta tags */}
      </Head>
      {content}
    </>
  );
}

export default MyApp;