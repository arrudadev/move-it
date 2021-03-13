import { AppProps } from 'next/app';

import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
