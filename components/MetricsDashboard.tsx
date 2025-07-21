// components/ControlPanel/MetricsDashboard.tsx
export function MetricsDashboard() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Metrics Dashboard</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 border rounded bg-gray-100 text-center">
          <p className="text-sm">Avg Latency</p>
          <p className="font-bold text-lg">124ms</p>
        </div>
        <div className="p-2 border rounded bg-gray-100 text-center">
          <p className="text-sm">Max Latency</p>
          <p className="font-bold text-lg">287ms</p>
        </div>
        <div className="p-2 border rounded bg-gray-100 text-center">
          <p className="text-sm">Connections</p>
          <p className="font-bold text-lg">42</p>
        </div>
        <div className="p-2 border rounded bg-green-100 text-center">
          <p className="text-sm">System Status</p>
          <p className="font-bold text-green-800">✅ Live</p>
        </div>
      </div>
    </div>
  );
}
