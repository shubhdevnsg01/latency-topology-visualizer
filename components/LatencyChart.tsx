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

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Timestamp,Latency"]
        .concat(
          points.map(
            (p) =>
              `${new Date(p.timestamp).toISOString()},${p.latency}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `${pair.replace(/[^a-zA-Z0-9]/g, "_")}_latency.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
     <div className="chart-header">
  <p className="text-sm text-gray-600 mb-2">
  Min: {stats.min.toFixed(1)}ms | Max: {stats.max.toFixed(1)}ms | Avg: {stats.avg.toFixed(1)}ms
</p>
  <button onClick={downloadCSV} className="csv-button">
    📥 Download CSV
  </button>
</div>




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
