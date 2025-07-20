// pages/trends.tsx
"use client";
import { useLatencyStore } from "../store/latencyStore";
import { LatencyChart } from "../components/LatencyChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { useMemo } from "react";
import { SERVER_PAIRS } from "../data/serverPairs"; // 👈 Add this

export default function TrendsPage() {
  const { data, selectedRange } = useLatencyStore();

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
      result[pair] = (data[pair] || []).filter((point) => point.timestamp >= cutoff);
    }

    return result;
  }, [data, selectedRange]);

  const hasData = SERVER_PAIRS.some((pair) => (filteredData[pair] || []).length > 0);

  return (
    <div className="p-4 h-screen overflow-hidden flex flex-col">
      <TimeRangeSelector />

      <div className="overflow-y-scroll flex-1 space-y-6 pr-2">
        {hasData ? (
          SERVER_PAIRS.map((pair) => {
            const points = filteredData[pair] || [];
            return <LatencyChart key={pair} pair={pair} points={points} />;
          })
        ) : (
          <p className="text-center text-gray-500">
            No latency data available in the selected range.
          </p>
        )}
      </div>
    </div>
  );
}
