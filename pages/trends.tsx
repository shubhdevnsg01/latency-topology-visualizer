// pages/trends.tsx
"use client";
import { useLatencyStore } from "../store/latencyStore";
import { LatencyChart } from "../components/LatencyChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { useMemo } from "react";
import { useEffect } from "react";
import { SERVER_PAIRS } from "../data/serverPairs";

export default function TrendsPage() {
  const { data, selectedRange } = useLatencyStore();
  console.log("🧪 Zustand Data Keys:", Object.keys(data));
  console.log("🧪 SERVER_PAIRS:", SERVER_PAIRS);
  useEffect(() => {
    document.body.classList.add("trends-page");
    return () => {
      document.body.classList.remove("trends-page");
    };
  }, []);
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
      result[pair] = (data[pair] || []).filter(
        (point) => point.timestamp >= cutoff
      );
    }

    return result;
  }, [data, selectedRange]);

  const hasData = SERVER_PAIRS.some(
    (pair) => (filteredData[pair] || []).length > 0
  );

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="p-4">
        <TimeRangeSelector />
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {hasData ? (
          SERVER_PAIRS.map((pair) => {
            const points = filteredData[pair] || [];
            return <LatencyChart key={pair} pair={pair} points={points} />;
          })
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No latency data available in the selected range.
          </p>
        )}
      </div>
    </div>
  );
}
