'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { latLonToVector3 } from '../utils/geoUtils';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useLatencyStore } from '../store/latencyStore';
import { useControlPanelStore } from '@/store/controlPanelStore';

// Initial exchange data (latency will be added via state)
const initialExchanges = [
  { name: 'Binance', location: 'Tokyo', lat: 35.6895, lon: 139.6917, cloud: 'AWS' },
  { name: 'OKX', location: 'London', lat: 51.5074, lon: -0.1278, cloud: 'Azure' },
  { name: 'Bybit', location: 'Singapore', lat: 1.3521, lon: 103.8198, cloud: 'GCP' },
  { name: 'Deribit', location: 'Amsterdam', lat: 52.3676, lon: 4.9041, cloud: 'AWS' },

  { name: 'Coinbase', location: 'San Francisco', lat: 37.7749, lon: -122.4194, cloud: 'AWS' },
  { name: 'Kraken', location: 'Seattle', lat: 47.6062, lon: -122.3321, cloud: 'Azure' },
  { name: 'Gemini', location: 'New York', lat: 40.7128, lon: -74.006, cloud: 'GCP' },
  { name: 'Huobi', location: 'Hong Kong', lat: 22.3193, lon: 114.1694, cloud: 'AWS' },
  { name: 'KuCoin', location: 'Singapore', lat: 1.3521, lon: 103.8198, cloud: 'Azure' },
  { name: 'Bitfinex', location: 'Taipei', lat: 25.033, lon: 121.5654, cloud: 'AWS' },
  { name: 'Bitstamp', location: 'Luxembourg', lat: 49.6117, lon: 6.1319, cloud: 'GCP' },
  { name: 'Upbit', location: 'Seoul', lat: 37.5665, lon: 126.978, cloud: 'AWS' },
  { name: 'Bithumb', location: 'Seoul', lat: 37.5665, lon: 126.978, cloud: 'Azure' },
  { name: 'Gate.io', location: 'Chicago', lat: 41.8781, lon: -87.6298, cloud: 'GCP' },
  { name: 'MEXC', location: 'Mexico City', lat: 19.4326, lon: -99.1332, cloud: 'AWS' },
  { name: 'Bitso', location: 'Buenos Aires', lat: -34.6037, lon: -58.3816, cloud: 'Azure' },
  { name: 'Coincheck', location: 'Osaka', lat: 34.6937, lon: 135.5023, cloud: 'GCP' },
  { name: 'WazirX', location: 'Mumbai', lat: 19.076, lon: 72.8777, cloud: 'AWS' },
  { name: 'ZebPay', location: 'Bangalore', lat: 12.9716, lon: 77.5946, cloud: 'Azure' },
  { name: 'Luno', location: 'Cape Town', lat: -33.9249, lon: 18.4241, cloud: 'GCP' },
  { name: 'Coinone', location: 'Busan', lat: 35.1796, lon: 129.0756, cloud: 'AWS' },
  { name: 'BitBay', location: 'Warsaw', lat: 52.2297, lon: 21.0122, cloud: 'Azure' },
  { name: 'BitFlyer', location: 'Kyoto', lat: 35.0116, lon: 135.7681, cloud: 'GCP' },
  { name: 'Korbit', location: 'Daejeon', lat: 36.3504, lon: 127.3845, cloud: 'AWS' },
  { name: 'Paymium', location: 'Paris', lat: 48.8566, lon: 2.3522, cloud: 'Azure' },
  { name: 'CEX.IO', location: 'Kyiv', lat: 50.4501, lon: 30.5234, cloud: 'GCP' },
  { name: 'Exmo', location: 'Moscow', lat: 55.7558, lon: 37.6173, cloud: 'AWS' },
  { name: 'WhiteBIT', location: 'Vienna', lat: 48.2082, lon: 16.3738, cloud: 'Azure' },
  { name: 'BitMart', location: 'Miami', lat: 25.7617, lon: -80.1918, cloud: 'GCP' },
  { name: 'Coinsbit', location: 'Dubai', lat: 25.2048, lon: 55.2708, cloud: 'AWS' },
  { name: 'Bitget', location: 'Istanbul', lat: 41.0082, lon: 28.9784, cloud: 'Azure' },
];

const connections = [
  ['Binance', 'OKX'],
  ['OKX', 'Bybit'],
  ['Bybit', 'Deribit'],
  ['Deribit', 'Binance'],
  ['Binance', 'Coinbase'],
  ['Coinbase', 'Kraken'],
  ['Kraken', 'Gemini'],
  ['Gemini', 'Huobi'],
  ['Huobi', 'Upbit'],
  ['Upbit', 'Bitstamp'],
  ['Bitstamp', 'BitFlyer'],
  ['BitFlyer', 'Luno'],
  ['Luno', 'BitMart'],
  ['BitMart', 'Bitso'],
  ['Bitso', 'Coinsbit'],
  ['Coinsbit', 'ZebPay'],
  ['ZebPay', 'Gate.io'],
  ['Gate.io', 'WazirX'],
  ['WazirX', 'Bybit'],
  ['Bybit', 'Coincheck'],
  ['Coincheck', 'Bitget'],
  ['Bitget', 'Paymium'],
  ['Paymium', 'CEX.IO'],
  ['CEX.IO', 'WhiteBIT'],
  ['WhiteBIT', 'Deribit'],
  ['Deribit', 'MEXC'],
  ['MEXC', 'Coinone'],
  ['Coinone', 'Korbit'],
  ['Korbit', 'Exmo'],
  ['Exmo', 'OKX'],
];

const getColorByCloud = (cloud: string): string => {
  switch (cloud) {
    case 'AWS': return 'orange';
    case 'GCP': return 'blue';
    case 'Azure': return 'pink';
    default: return 'gray';
  }
};

const getColorByLatency = (latency: number) => {
  if (latency < 100) return 'green';
  if (latency < 200) return 'yellow';
  return 'red';
};

const ArcConnection = ({ from, to }: { from: [number, number]; to: [number, number] }) => {
  const R = 2;
  const toVec3 = ([lat, lon]: [number, number]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new Vector3(
      -R * Math.sin(phi) * Math.cos(theta),
      R * Math.cos(phi),
      R * Math.sin(phi) * Math.sin(theta)
    );
  };

  const start = toVec3(from);
  const end = toVec3(to);
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.4);
  const curve = new CatmullRomCurve3([start, mid, end]);

  return (
    <Line
      points={curve.getPoints(30)}
      color="cyan"
      lineWidth={1}
      dashed={false}
      transparent
      opacity={0.7}
    />
  );
};

const ServerMarker = ({ server }: { server: any }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  const position = latLonToVector3(server.lat, server.lon);

  useFrame(() => {
    if (hovered && meshRef.current) {
      meshRef.current.scale.set(1.5, 1.5, 1.5);
    } else {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial color={getColorByCloud(server.cloud)} />
      {hovered && (
        <Html distanceFactor={10}>
          <div style={{
            background: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            whiteSpace: 'nowrap'
          }}>
            <strong>{server.name}</strong><br />
            {server.location} - {server.cloud}<br />
            <span style={{ color: getColorByLatency(server.latency) }}>
              Latency: {server.latency} ms
            </span>
          </div>
        </Html>
      )}
    </mesh>
  );
};

const Earth = () => {
  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/textures/earth.jpg')}
      />
    </mesh>
  );
};

const WorldMap = () => {
const {
  exchangeFilter,
  cloudProviderFilter,
  latencyRange,
  realTime,
  historical,
  regions,
  search,
} = useControlPanelStore();

const [allServers, setAllServers] = useState(
  initialExchanges.map(server => ({
    ...server,
    latency: Math.floor(Math.random() * 300)
  }))
);

// Apply filters
const exchangeServers = allServers.filter(server => {
  const matchesExchange = exchangeFilter ? server.name.toLowerCase().includes(exchangeFilter.toLowerCase()) : true;
  const matchesCloud = cloudProviderFilter ? server.cloud.toLowerCase().includes(cloudProviderFilter.toLowerCase()) : true;
  const matchesLatency = server.latency >= latencyRange[0] && server.latency <= latencyRange[1];
  const matchesSearch = search
    ? server.name.toLowerCase().includes(search.toLowerCase()) ||
      server.location.toLowerCase().includes(search.toLowerCase())
    : true;
  return matchesExchange && matchesCloud && matchesLatency && matchesSearch;
});

  // Simulate real-time latency every 5 seconds
  useEffect(() => {
  const interval = setInterval(() => {
    const updated = allServers.map(server => ({
      ...server,
      latency: Math.floor(Math.random() * 300),
    }));

    // Push connection pair data to Zustand
    connections.forEach(([fromName, toName]) => {
      const from = updated.find(e => e.name === fromName);
      const to = updated.find(e => e.name === toName);

      if (from && to) {
        const pairKey = `${from.name}-${to.name}`;
        const avgLatency = Math.round((from.latency + to.latency) / 2);

        useLatencyStore.getState().addLatencyData(pairKey, {
          timestamp: Date.now(),
          latency: avgLatency,
        });
      }
    });

    setAllServers(updated);
  }, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Earth />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />

          {exchangeServers.map((server, index) => (
            <ServerMarker key={index} server={server} />
          ))}

         {connections.map(([fromName, toName], index) => {
  const from = exchangeServers.find(e => e.name === fromName);
  const to = exchangeServers.find(e => e.name === toName);
  if (!from || !to) return null;

  return (
    <ArcConnection
      key={index}
      from={[from.lat, from.lon]}
      to={[to.lat, to.lon]}
    />
  );
})}

          <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan enableZoom />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WorldMap;
