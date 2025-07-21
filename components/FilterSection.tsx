// components/ControlPanel/FilterSection.tsx
export function FilterSection() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-1">Filters</h3>

      <div className="mb-2">
        <label className="block text-sm font-medium">Exchange</label>
        <select className="w-full border rounded p-1">
          <option>All</option>
          <option>Binance</option>
          <option>Coinbase</option>
          <option>OKX</option>
          {/* Add more as needed */}
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Cloud Provider</label>
        <select className="w-full border rounded p-1">
          <option>All</option>
          <option>AWS</option>
          <option>GCP</option>
          <option>Azure</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium">Latency Range (ms)</label>
        <input type="range" min="0" max="500" className="w-full" />
      </div>
    </div>
  );
}
