// pages/_app.tsx
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Navigation } from '../components/Navigation';
export default function App({ Component, pageProps }: AppProps) {
  <Navigation />
  return <Component {...pageProps} />;
}
