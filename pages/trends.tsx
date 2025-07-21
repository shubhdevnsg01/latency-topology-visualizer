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
  } = useControlPanelStore();

  const filteredData = useMemo(() => {
    const rangeToMs: Record<typeof selectedRange, number> = {
      "1h": 3600 * 1000,
      "24h": 24 * 3600 * 1000,
      "7d": 7 * 24 * 3600 * 1000,
      "30d": 30 * 24 * 3600 * 1000,
    };

    const cutoff = Date.now() - rangeToMs[selectedRange];
    const result: typeof data = {};

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
        exchangeA.toLowerCase().includes(search.toLowerCase()) ||
        exchangeB.toLowerCase().includes(search.toLowerCase());

      if (!(matchesExchange && matchesCloud && matchesRegion && matchesSearch)) continue;

      const points = (data[pair] || []).filter(
        (point) =>
          point.timestamp >= cutoff &&
          point.latency >= latencyRange[0] &&
          point.latency <= latencyRange[1]
      );

      if (points.length > 0) {
        result[pair] = points;
      }
    }

    return result;
  }, [
    data,
    selectedRange,
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

      <div style={{ marginTop: "1rem" }}>
        {hasData ? (
          Object.entries(filteredData).map(([pair, points]) => {
            const [exchangeA, exchangeB] = pair.split("-");
            const metaA = EXCHANGE_META[exchangeA as keyof typeof EXCHANGE_META];
            const metaB = EXCHANGE_META[exchangeB as keyof typeof EXCHANGE_META];
            return (
              <div key={pair} style={{ marginBottom: "2rem" }}>
               <h3 className="latency-heading">
  {exchangeA} ({metaA.cloud}, {metaA.location}) → {exchangeB} (
  {metaB.cloud}, {metaB.location})
</h3>
                <LatencyChart pair={pair} points={points} />
              </div>
            );
          })
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
    </div>
  );
}
