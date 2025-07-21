// components/ControlPanel/ControlPanel.tsx
"use client";
import { FilterSection } from "./FilterSection";
import { ToggleSection } from "./ToggleSection";
import { SearchInput } from "./SearchInput";
import { MetricsDashboard } from "./MetricsDashboard";

export function ControlPanel() {
  return (
    <div className="w-full md:w-72 bg-white border-r h-full p-4 shadow-md space-y-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Control Panel</h2>
      <SearchInput />
      <FilterSection />
      <ToggleSection />
      <MetricsDashboard />
    </div>
  );
}
