import { AppProps } from 'next/app';

import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
