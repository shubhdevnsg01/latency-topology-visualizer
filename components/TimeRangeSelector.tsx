
import { useLatencyStore } from '../store/latencyStore'
import { useControlPanelStore } from '@/store/controlPanelStore';
export function TimeRangeSelector() {
  const { selectedRange, setSelectedRange } = useLatencyStore();
  const {setRealTime}=useControlPanelStore();
 const ranges: typeof selectedRange[] = ['1h', '24h', '7d', '30d'];

   return (
    <div className="time-range-selector-wrapper">
      <div className="time-range-selector-buttons">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => {
              setSelectedRange(r);
              setRealTime(false); 
            }}
            className='time-range-button'
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
