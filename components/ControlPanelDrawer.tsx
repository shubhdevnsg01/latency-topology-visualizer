"use client"

import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle
} from "./ui/dialog"
import { useState } from "react"
import { Switch } from "./ui/switch"
import { Input } from "./ui/input"
import { useControlPanelStore } from "@/store/controlPanelStore"
import MetricsDashboard from "./MetricsDashboard"
import { useLatencyStore } from "@/store/latencyStore"
import { EXCHANGE_META } from "@/data/exchangeMeta"

export default function ControlPanelDrawer() {
  const [open, setOpen] = useState(false)

  const {
    exchangeFilter,
    setExchangeFilter,
    cloudProviderFilter,
    setCloudProviderFilter,
    latencyRange,
    setLatencyRange,
    realTime,
    setRealTime,
    regions,
    setRegions,
    search,
    setSearch,
    visualizationMode,
    setVisualizationMode,
    resetFilters
  } = useControlPanelStore()

  const { setSelectedRange } = useLatencyStore()

  const exchangeOptions = Object.keys(EXCHANGE_META)
  const cloudOptions = [...new Set(Object.values(EXCHANGE_META).map(meta => meta.cloud))]
  const locationOptions = [...new Set(Object.values(EXCHANGE_META).map(meta => meta.location))]

  const handleExchangeChange = (selected: string) => {
    setExchangeFilter(selected)

    if (selected && selected in EXCHANGE_META) {
      const meta = EXCHANGE_META[selected as keyof typeof EXCHANGE_META]
      setCloudProviderFilter(meta.cloud)
      setSearch(meta.location)
    } else {
      setCloudProviderFilter("")
      setSearch("")
    }
  }

  return (
    <Dialog>
      {!open && <DialogTrigger onOpen={() => setOpen(true)} />}
      {open && (
        <>
          <DialogOverlay onClose={() => setOpen(false)} />
          <DialogContent>
            <DialogTitle>Control Panel</DialogTitle>

            <label>Exchange</label>
            <select
              value={exchangeFilter}
              onChange={(e) => handleExchangeChange(e.target.value)}
              className="dropdown"
            >
              <option value="">All Exchanges</option>
              {exchangeOptions.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>

            <label>Cloud</label>
            <select
              value={cloudProviderFilter}
              onChange={(e) => setCloudProviderFilter(e.target.value)}
              className="dropdown"
            >
              <option value="">All Providers</option>
              {cloudOptions.map((cloud) => (
                <option key={cloud} value={cloud}>
                  {cloud}
                </option>
              ))}
            </select>

            <label>Latency Range</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                type="number"
                value={latencyRange[0]}
                onChange={(e) =>
                  setLatencyRange([parseInt(e.target.value), latencyRange[1]])
                }
              />
              <Input
                type="number"
                value={latencyRange[1]}
                onChange={(e) =>
                  setLatencyRange([latencyRange[0], parseInt(e.target.value)])
                }
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span>Show Real-time</span>
              <Switch
                checked={realTime}
                onCheckedChange={(checked) => {
                  setRealTime(checked)
                  if (checked) setSelectedRange(null)
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span>Show Regions</span>
              <Switch checked={regions} onCheckedChange={setRegions} />
            </div>

            <label style={{ marginTop: "12px" }}>Location</label>
            <select
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dropdown"
            >
              <option value="">All Locations</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <MetricsDashboard />

            <div className="control-panel-buttons">
              <button onClick={resetFilters} className="reset-button">
                Reset to Default
              </button>

              <div className="visualization-mode">
                <label className="visualization-label">Visualization Mode</label>
                <div className="mode-buttons">
                  <button
                    onClick={() => setVisualizationMode("heatmap")}
                    className={`mode-button ${visualizationMode === "heatmap" ? "selected" : ""}`}
                  >
                    🔥 Heatmap
                  </button>
                  <button
                    onClick={() => setVisualizationMode("topology")}
                    className={`mode-button ${visualizationMode === "topology" ? "selected" : ""}`}
                  >
                    🌐 Topology
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
