// /store/latencyStore.ts
import { create } from 'zustand';

type LatencyPoint = { timestamp: number; latency: number };
type ServerPairKey = string; 

type LatencyStore = {
  data: Record<ServerPairKey, LatencyPoint[]>;
  selectedRange: '1h' | '24h' | '7d' | '30d';
  setSelectedRange: (range: LatencyStore['selectedRange']) => void;
  addLatencyData: (pair: ServerPairKey, point: LatencyPoint) => void;
};

export const useLatencyStore = create<LatencyStore>((set) => ({
  data: {},
  selectedRange: '24h',
  setSelectedRange: (range) => set({ selectedRange: range }),
  addLatencyData: (pair, point) =>
    set((state) => {
      const series = state.data[pair] || [];
      console.log(`[ZUSTAND] Adding latency point for ${pair}:`, point);
      return {
        data: {
          ...state.data,
          [pair]: [...series, point].slice(-1000), // Keep it bounded
        },
      };
    }),
}));
