import dynamic from 'next/dynamic';
const ControlPanelDrawer = dynamic(
  () => import('../components/ControlPanelDrawer'),
  { ssr: false }
);
const WorldMap = dynamic(() => import('../components/WorldMap'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative h-screen">
      <WorldMap />
      <ControlPanelDrawer /> 
    </main>
  );
}