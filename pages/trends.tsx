"use client";

import { useLatencyStore } from "../store/latencyStore";
import { LatencyChart } from "../components/LatencyChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { useMemo } from "react";
import { SERVER_PAIRS } from "../data/serverPairs";
import { useControlPanelStore } from "@/store/controlPanelStore";
import { EXCHANGE_META } from "@/data/exchangeMeta";

export default function TrendsPage() {
  const { data, selectedRange } = useLatencyStore();
  const {
    exchangeFilter,
    cloudProviderFilter,
    latencyRange,
    search,
    regionFilter,
    realTime,
  } = useControlPanelStore();
  const shouldShowNoDataMessage = !realTime && !selectedRange;

  const filteredData = useMemo(() => {
console.log("realTime:", realTime, "selectedRange:", selectedRange);
    
    // If no data source is selected, return empty object
    if (shouldShowNoDataMessage) {
      return {};
    }

    const result: typeof data = {};

    const now = Date.now();
    const rangeToMs: Record<"1h" | "24h" | "7d" | "30d", number> = {
      "1h": 3600 * 1000,
      "24h": 24 * 3600 * 1000,
      "7d": 7 * 24 * 3600 * 1000,
      "30d": 30 * 24 * 3600 * 1000,
    };

    const cutoff = selectedRange ? now - rangeToMs[selectedRange] : now - 10000;

    for (const pair of SERVER_PAIRS) {
      const [exchangeA, exchangeB] = pair.split("-");

      const metaA = EXCHANGE_META[exchangeA as keyof typeof EXCHANGE_META];
      const metaB = EXCHANGE_META[exchangeB as keyof typeof EXCHANGE_META];

      if (!metaA || !metaB) continue;

      const matchesExchange =
        exchangeFilter === "" ||
        exchangeA.toLowerCase().includes(exchangeFilter.toLowerCase()) ||
        exchangeB.toLowerCase().includes(exchangeFilter.toLowerCase());

      const matchesCloud =
        cloudProviderFilter === "" ||
        metaA.cloud.toLowerCase().includes(cloudProviderFilter.toLowerCase()) ||
        metaB.cloud.toLowerCase().includes(cloudProviderFilter.toLowerCase());

      const matchesRegion =
        regionFilter === "" ||
        metaA.location.toLowerCase().includes(regionFilter.toLowerCase()) ||
        metaB.location.toLowerCase().includes(regionFilter.toLowerCase());

      const matchesSearch =
        search === "" ||
        metaA.location.toLowerCase().includes(search.toLowerCase()) ||
        metaB.location.toLowerCase().includes(search.toLowerCase());

      if (!(matchesExchange && matchesCloud && matchesRegion && matchesSearch)) continue;

      const points = (data[pair] || []).filter((point) => {
        const inLatency =
          point.latency >= latencyRange[0] && point.latency <= latencyRange[1];
        const inTime = point.timestamp >= cutoff;
        return inTime && inLatency;
      });

      if (points.length > 0) {
        result[pair] = points;
      }
    }

    return result;
  }, [
    data,
    selectedRange,
    realTime,
    exchangeFilter,
    cloudProviderFilter,
    regionFilter,
    latencyRange,
    search,
  ]);

  const hasData = Object.keys(filteredData).length > 0;
 return (
  <div style={{ padding: "1rem", backgroundColor: "black" }}>
    <TimeRangeSelector />

    {shouldShowNoDataMessage ? (
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          marginTop: "1rem",
        }}
      >
        No data selected. Enable real-time from Filters  or choose A Time Range.
      </p>
    ) : hasData ? (
      <div style={{ marginTop: "1rem" }}>
        {Object.entries(filteredData).map(([pair, points]) => {
          const [exchangeA, exchangeB] = pair.split("-");
          const metaA = EXCHANGE_META[exchangeA as keyof typeof EXCHANGE_META];
          const metaB = EXCHANGE_META[exchangeB as keyof typeof EXCHANGE_META];
          if (!metaA || !metaB) return null;
          return (
            <div key={pair} style={{ marginBottom: "2rem" }}>
              <h3 className="latency-heading">
                {exchangeA} ({metaA.cloud}, {metaA.location}) → {exchangeB} (
                {metaB.cloud}, {metaB.location})
              </h3>
              <LatencyChart pair={pair} points={points} />
            </div>
          );
        })}
      </div>
    ) : (
      <p
        style={{
          textAlign: "center",
          color: "#6B7280",
          marginTop: "2.5rem",
        }}
      >
        No latency data available in the selected range or filters.
      </p>
    )}
  </div>
);

}
