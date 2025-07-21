import { useLatencyStore } from "../store/latencyStore";
import { useMemo } from "react";

export default function MetricsDashboard() {
  const { data } = useLatencyStore();

  const { avgLatency, systemStatus } = useMemo(() => {
    let total = 0;
    let count = 0;

    for (const points of Object.values(data)) {
      for (const point of points) {
        total += point.latency;
        count++;
      }
    }

    const avg = count > 0 ? total / count : 0;

    let status = "⚠️ No Data";
    if (count === 0) status = "⚠️ No Data";
    else if (avg < 100) status = "✅ Healthy";
    else if (avg < 200) status = "🟡 Moderate";
    else status = "🔴 Degraded";

    return {
      avgLatency: Math.round(avg),
      systemStatus: status,
    };
  }, [data]);

  return (
    <div style={{ marginTop: 20 }}>
      <strong>📊 Metrics Dashboard</strong>
      <p>Avg Latency: {avgLatency}ms</p>
      <p>System Status: {systemStatus}</p>
    </div>
  );
}
