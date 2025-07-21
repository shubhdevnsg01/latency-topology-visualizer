import { create } from "zustand";

type ControlPanelState = {
  exchangeFilter: string;
  cloudProviderFilter: string;
  regionFilter: string; 
  latencyRange: [number, number];
  realTime: boolean;
  historical: boolean;
  regions: boolean;
  search: string;
  visualizationMode: string;
  setExchangeFilter: (val: string) => void;
  setCloudProviderFilter: (val: string) => void;
  setLatencyRange: (val: [number, number]) => void;
  setRealTime: (val: boolean) => void;
  setHistorical: (val: boolean) => void;
  setRegions: (val: boolean) => void;
  setSearch: (val: string) => void;
  setVisualizationMode: (mode: string) => void;
  setRegionFilter: (filter: string) => void;
  resetFilters: () => void;
};

export const useControlPanelStore = create<ControlPanelState>((set) => ({
  exchangeFilter: "",
  cloudProviderFilter: "",
  regionFilter: "", 
  latencyRange: [0, 300],
  realTime: true,
  historical: true,
  regions: true,
  search: "",
  visualizationMode: "heatmap",

  setExchangeFilter: (val) => set({ exchangeFilter: val }),
  setCloudProviderFilter: (val) => set({ cloudProviderFilter: val }),
  setRegionFilter: (val) => set({ regionFilter: val }), 
  setLatencyRange: (val) => set({ latencyRange: val }),
  setRealTime: (val) => set({ realTime: val }),
  setHistorical: (val) => set({ historical: val }),
  setRegions: (val) => set({ regions: val }),
  setSearch: (val) => set({ search: val }),
  setVisualizationMode: (mode) => set({ visualizationMode: mode }),

  resetFilters: () =>
    set({
      exchangeFilter: "",
      cloudProviderFilter: "",
      regionFilter: "",
      latencyRange: [0, 1000],
      realTime: true,
      historical: true,
      regions: true,
      search: "",
      visualizationMode: "heatmap",
    }),
}));
