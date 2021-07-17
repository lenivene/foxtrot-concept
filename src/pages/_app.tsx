import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

// Styles
import 'bootstrap/scss/bootstrap.scss';
import '@glidejs/glide/dist/css/glide.core.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import '../styles/app.scss';

// Contexts
import { ProductProvider } from '@contexts/products';

// Components
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider>
      <NextNProgress
        color="#284484"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Head>
        <title>Foxtrot Instrumentos Musicais</title>
      </Head>
      <main className="flex-fill">
        <Header />
        <Component {...pageProps} />
      </main>
      <Footer />
    </ProductProvider>
  )
}

export default MyApp
