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

export default function ControlPanelDrawer() {
  const [open, setOpen] = useState(false)
  const [exchangeFilter, setExchangeFilter] = useState("")
  const [cloudProviderFilter, setCloudProviderFilter] = useState("")
  const [latencyRange, setLatencyRange] = useState<[number, number]>([0, 300])
  const [realTime, setRealTime] = useState(true)
  const [historical, setHistorical] = useState(true)
  const [regions, setRegions] = useState(true)
  const [search, setSearch] = useState("")

  return (
    <Dialog>
      <DialogTrigger onOpen={() => setOpen(true)} />
      {open && (
        <>
          <DialogOverlay onClose={() => setOpen(false)} />
          <DialogContent>
            <DialogTitle>Control Panel</DialogTitle>

            <label>Exchange</label>
            <Input
              value={exchangeFilter}
              onChange={(e) => setExchangeFilter(e.target.value)}
              placeholder="e.g. Binance"
            />

            <label>Cloud</label>
            <Input
              value={cloudProviderFilter}
              onChange={(e) => setCloudProviderFilter(e.target.value)}
              placeholder="e.g. AWS"
            />

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
              <Switch checked={realTime} onCheckedChange={setRealTime} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span>Show Historical</span>
              <Switch checked={historical} onCheckedChange={setHistorical} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <span>Show Regions</span>
              <Switch checked={regions} onCheckedChange={setRegions} />
            </div>

            <label style={{ marginTop: "12px" }}>Search</label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Exchange or Region"
            />

            <div style={{ marginTop: 20 }}>
              <strong>📊 Metrics Dashboard</strong>
              <p>Avg Latency: 78ms</p>
              <p>System Status: ✅ Healthy</p>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}
