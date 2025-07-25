
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LatencyPoint = {
  timestamp: number;
  latency: number;
};

export type ServerPairKey = string;

type LatencyStore = {
  data: Record<ServerPairKey, LatencyPoint[]>;
  selectedRange: "1h" | "24h" | "7d" | "30d"|null;
  setSelectedRange: (range: LatencyStore["selectedRange"]) => void;
  addLatencyData: (pair: ServerPairKey, point: LatencyPoint) => void;
};

export const useLatencyStore = create<LatencyStore>((set, get) => ({
  data: {},
  selectedRange: null,
  setSelectedRange: (range) => set({ selectedRange: range }),
  addLatencyData: (pair, point) =>
    set((state) => {
      const series = state.data[pair] || [];
      return {
        data: {
          ...state.data,
          [pair]: [...series, point].slice(-1000),
        },
      };
    }),
}));

