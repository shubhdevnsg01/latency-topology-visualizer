// components/Navigation.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const router = useRouter();
  
  return (
    <nav className="fixed top-4 left-4 z-50 flex gap-3">
      <Link 
        href="/" 
        className={`nav-button ${
          router.pathname === '/' ? 'bg-blue-700' : ''
        }`}
      >
        🌍 World Map
      </Link>
      <Link 
        href="/trends" 
        className={`nav-button ${
          router.pathname === '/trends' ? 'bg-blue-700' : ''
        }`}
      >
        📊 Trends
      </Link>
    </nav>
  );
}