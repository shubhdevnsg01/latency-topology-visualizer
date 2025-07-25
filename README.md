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
crypto-exchange-latency-monitor/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── .gitignore
├── .eslintrc.json
│
├── public/
│   ├── textures/
│   │   └── earth.jpg
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── components/
│   ├── ui/
│   │   ├── dialog.tsx                    # Custom dialog components
│   │   ├── input.tsx                     # Input component
│   │   └── switch.tsx                    # Toggle switch component
│   │
│   ├── ControlPanelDrawer.tsx            # Main control panel with filters
│   ├── LatencyChart.tsx                  # Recharts line chart component
│   ├── MetricsDashboard.tsx              # System metrics display
│   ├── MobileTrendsContainer.tsx         # Mobile-optimized trends view
│   ├── TimeRangeSelector.tsx             # Time range selection buttons
│   ├── Tooltip.tsx                       # Custom tooltip component
│   └── WorldMap.tsx                      # Three.js 3D globe visualization
│
├── data/
│   ├── exchangeMeta.ts                   # Static exchange metadata
│   └── serverPairs.ts                    # Predefined connection pairs
│
├── hooks/
│   └── useMobileScrollLock.ts            # Mobile scroll management hook
│
├── pages/
│   ├── api/                              # Next.js API routes (if any)
│   ├── _app.tsx                          # Next.js app wrapper
│   ├── index.tsx                         # Home page with main layout
│   └── trends.tsx                        # Trends analysis page
│
├── store/
│   ├── controlPanelStore.ts              # Zustand store for UI filters
│   ├── latencyStore.ts                   # Zustand store for latency data
│   └── useUiInteractionStore.ts          # UI interaction state
│
├── styles/
│   └── global.css                        # Global CSS styles
│
└── utils/
    └── geoUtils.ts                       # Geographic utility functions



## Deployed on Vercel
I have deployed this project.You can check it out here:- https://latency-topology-visualizer-liart.vercel.app/
