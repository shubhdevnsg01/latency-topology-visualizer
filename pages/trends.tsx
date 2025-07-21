"use client";

import { useLatencyStore } from "../store/latencyStore";
import { LatencyChart } from "../components/LatencyChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { useMemo, useEffect } from "react";
import { SERVER_PAIRS } from "../data/serverPairs";
import { useControlPanelStore } from "@/store/controlPanelStore";

export default function TrendsPage() {
  const { data, selectedRange } = useLatencyStore();
  const {
    exchangeFilter,
    cloudProviderFilter,
    latencyRange,
    search,
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
      const [from, to] = pair.split("-");

      const matchesExchange = exchangeFilter
        ? from.toLowerCase().includes(exchangeFilter.toLowerCase()) ||
          to.toLowerCase().includes(exchangeFilter.toLowerCase())
        : true;

      const matchesCloud = cloudProviderFilter
        ? from.toLowerCase().includes(cloudProviderFilter.toLowerCase()) ||
          to.toLowerCase().includes(cloudProviderFilter.toLowerCase())
        : true;

      const matchesSearch = search
        ? from.toLowerCase().includes(search.toLowerCase()) ||
          to.toLowerCase().includes(search.toLowerCase())
        : true;

      if (!(matchesExchange && matchesCloud && matchesSearch)) continue;

      const points = (data[pair] || []).filter((point) => {
        return (
          point.timestamp >= cutoff &&
          point.latency >= latencyRange[0] &&
          point.latency <= latencyRange[1]
        );
      });

      if (points.length > 0) {
        result[pair] = points;
      }
    }

    return result;
  }, [data, selectedRange, exchangeFilter, cloudProviderFilter, latencyRange, search]);

  const hasData = Object.keys(filteredData).length > 0;

  return (
    <div style={{ padding: '1rem', backgroundColor: 'white' }}>
      <TimeRangeSelector />

      <div style={{ marginTop: '1rem' }}>
        {hasData ? (
          Object.entries(filteredData).map(([pair, points]) => (
            <LatencyChart key={pair} pair={pair} points={points} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#6B7280', marginTop: '2.5rem' }}>
            No latency data available in the selected range or filters.
          </p>
        )}
      </div>
    </div>
  );
}

