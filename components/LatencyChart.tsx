// components/LatencyChart.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LatencyPoint = {
  timestamp: number;
  latency: number;
};

type Props = {
  pair: string;
  points: LatencyPoint[];
};

export function LatencyChart({ pair, points }: Props) {
  const formatTime = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString();

  const stats = {
    min: Math.min(...points.map((p) => p.latency)),
    max: Math.max(...points.map((p) => p.latency)),
    avg:
      points.reduce((sum, p) => sum + p.latency, 0) /
      (points.length || 1),
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* <h2 className="text-lg font-semibold mb-1 text-gray-800">{pair}</h2> */}
      <p className="text-sm text-gray-600 mb-2">
        Min: {stats.min.toFixed(1)}ms | Max: {stats.max.toFixed(1)}ms | Avg: {stats.avg.toFixed(1)}ms
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={points}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            minTickGap={30}
          />
          <YAxis unit="ms" />
          <Tooltip
            labelFormatter={(ts) => new Date(ts).toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
