import dynamic from 'next/dynamic';
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
export default function Home() {
  return (
    <main className="main-layout">
      <div className="worldmap-container">
        <WorldMap />
      </div>

      <ControlPanelDrawer />

      <div className="trends-panel">
        <Trends/>
      </div>
    </main>
  );
}