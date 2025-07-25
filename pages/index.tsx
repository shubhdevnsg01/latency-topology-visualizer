import dynamic from 'next/dynamic';
import { useState,useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next"
const ControlPanelDrawer = dynamic(
  () => import('../components/ControlPanelDrawer'),
  { ssr: false }
);
const WorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false,
});
const Trends = dynamic(() => import('../pages/trends'), {
  ssr: false,
});
const MobileTrendsContainer = dynamic(
  () => import('../components/MobileTrendsContainer'),
  { ssr: false }
);
export default function Home() {
   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="main-layout">
      <div className="worldmap-container">
        <WorldMap />
      </div>

      <ControlPanelDrawer />
        <Analytics />

      {/* Conditional rendering based on screen size */}
      {isMobile ? (
        <MobileTrendsContainer />
      ) : (
        <div className="trends-panel">
          <Trends />
        </div>
      )}
    </main>
  );
}