import 'bootstrap/scss/bootstrap.scss';
import '@glidejs/glide/dist/css/glide.core.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import '../styles/app.scss';
import { useCallback, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
