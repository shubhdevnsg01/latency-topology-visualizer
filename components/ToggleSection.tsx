// components/ControlPanel/ToggleSection.tsx
export function ToggleSection() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-1">Toggles</h3>

      <div className="flex items-center justify-between mb-1">
        <label>Real-Time Layer</label>
        <input type="checkbox" />
      </div>
      <div className="flex items-center justify-between mb-1">
        <label>Historical Trends</label>
        <input type="checkbox" />
      </div>
      <div className="flex items-center justify-between mb-1">
        <label>Cloud Regions</label>
        <input type="checkbox" />
      </div>
    </div>
  );
}
