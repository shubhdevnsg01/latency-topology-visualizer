// /components/TimeRangeSelector.tsx
import { useLatencyStore } from '../store/latencyStore'

export function TimeRangeSelector() {
  const { selectedRange, setSelectedRange } = useLatencyStore();

  const ranges: typeof selectedRange[] = ['1h', '24h', '7d', '30d'];

  return (
    <div className="flex space-x-2 mb-4">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => setSelectedRange(r)}
          className={`px-3 py-1 rounded ${
            selectedRange === r ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
