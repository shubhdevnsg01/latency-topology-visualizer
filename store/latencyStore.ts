// /store/latencyStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LatencyPoint = {
  timestamp: number;
  latency: number;
};

export type ServerPairKey = string;

type LatencyStore = {
  data: Record<ServerPairKey, LatencyPoint[]>;
  selectedRange: "1h" | "24h" | "7d" | "30d";
  setSelectedRange: (range: LatencyStore["selectedRange"]) => void;
  addLatencyData: (pair: ServerPairKey, point: LatencyPoint) => void;
};

export const useLatencyStore = create<LatencyStore>()(
  persist(
    (set, get) => ({
      data: {},
      selectedRange: "24h",
      setSelectedRange: (range) => set({ selectedRange: range }),
      addLatencyData: (pair, point) =>
        set((state) => {
          const series = state.data[pair] || [];
          return {
            data: {
              ...state.data,
              [pair]: [...series, point].slice(-1000), // Trim to 1000 entries
            },
          };
        }),
    }),
    {
      name: "latency-store", // localStorage key
      partialize: (state) => ({
        data: state.data,
        selectedRange: state.selectedRange,
      }),
    }
  )
);
