## Project Overvview
A real-time cryptocurrency exchange latency monitoring system with an interactive 3D globe visualization and comprehensive analytics dashboard. 
The application tracks network latency between various crypto exchanges worldwide and presents the data through both geographical and time-series visualizations.

## Architecture and Tech Stack
•	Next.js - React framework for SSR/SSG
•	TypeScript - Type safety and better development experience
•	Three.js + React Three Fiber - 3D globe visualization
•	Recharts - Time-series charts for latency data
•	Zustand - Lightweight state management
•	CSS - Utility-first styling

## Key Libraries
•	@react-three/fiber - React renderer for Three.js
•	@react-three/drei - Useful helpers for R3F
•	recharts - Chart library for data visualization


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 📁 Folder Structure
📁 crypto-exchange-latency-monitor/
  📄 README.md
  📄 package.json
  📄 tsconfig.json
  📄 next.config.js
  📄 tailwind.config.js
  
  📁 public/
    📁 textures/
      🖼️ earth.jpg
    📄 file.svg, globe.svg, next.svg, vercel.svg, window.svg
  
  📁 components/
    📁 ui/
      📄 dialog.tsx, input.tsx, switch.tsx
    📄 ControlPanelDrawer.tsx
    📄 LatencyChart.tsx
    📄 MetricsDashboard.tsx
    📄 MobileTrendsContainer.tsx
    📄 TimeRangeSelector.tsx
    📄 Tooltip.tsx
    📄 WorldMap.tsx
  
  📁 data/
    📄 exchangeMeta.ts, serverPairs.ts
  
  📁 hooks/
    📄 useMobileScrollLock.ts
  
  📁 pages/
    📄 _app.tsx, index.tsx, trends.tsx
  
  📁 store/
    📄 controlPanelStore.ts, latencyStore.ts, useUiInteractionStore.ts
  
  📁 styles/
    📄 global.css
  
  📁 utils/
    📄 geoUtils.ts



## Deployed on Vercel
I have deployed this project.You can check it out here:- https://latency-topology-visualizer-liart.vercel.app/
