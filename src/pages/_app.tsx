import { AppProps } from 'next/app';

import { UserProvider } from '../contexts/UserContext';

import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
