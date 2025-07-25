
"use client";

import { useLatencyStore } from "../store/latencyStore";
import { LatencyChart } from "../components/LatencyChart";
import { TimeRangeSelector } from "../components/TimeRangeSelector";
import { useMemo, useEffect, useState, useRef } from "react";
import { SERVER_PAIRS } from "../data/serverPairs";
import { useControlPanelStore } from "@/store/controlPanelStore";
import { EXCHANGE_META } from "@/data/exchangeMeta";
import { useMobileScrollLock } from "../hooks/useMobileScrollLock";

export default function MobileTrendsContainer() {
  const { data, selectedRange } = useLatencyStore();
  const {
    exchangeFilter,
    cloudProviderFilter,
    latencyRange,
    search,
    regionFilter,
    realTime,
  } = useControlPanelStore();

  const { isScrollLocked, toggleScrollLock } = useMobileScrollLock();
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldShowNoDataMessage = !realTime && !selectedRange;

  const filteredData = useMemo(() => {
    if (shouldShowNoDataMessage) return {};

    const result: typeof data = {};
    const now = Date.now();
    const rangeToMs: Record<"1h" | "24h" | "7d" | "30d", number> = {
      "1h": 3600 * 1000,
      "24h": 24 * 3600 * 1000,
      "7d": 7 * 24 * 3600 * 1000,
      "30d": 30 * 24 * 3600 * 1000,
    };

    const cutoff = selectedRange ? now - rangeToMs[selectedRange] : now - 10000;

    for (const pair of SERVER_PAIRS) {
      const [exchangeA, exchangeB] = pair.split("-");
      const metaA = EXCHANGE_META[exchangeA as keyof typeof EXCHANGE_META];
      const metaB = EXCHANGE_META[exchangeB as keyof typeof EXCHANGE_META];

      if (!metaA || !metaB) continue;

      const matchesExchange =
        exchangeFilter === "" ||
        exchangeA.toLowerCase().includes(exchangeFilter.toLowerCase()) ||
        exchangeB.toLowerCase().includes(exchangeFilter.toLowerCase());

      const matchesCloud =
        cloudProviderFilter === "" ||
        metaA.cloud.toLowerCase().includes(cloudProviderFilter.toLowerCase()) ||
        metaB.cloud.toLowerCase().includes(cloudProviderFilter.toLowerCase());

      const matchesRegion =
        regionFilter === "" ||
        metaA.location.toLowerCase().includes(regionFilter.toLowerCase()) ||
        metaB.location.toLowerCase().includes(regionFilter.toLowerCase());

      const matchesSearch =
        search === "" ||
        metaA.location.toLowerCase().includes(search.toLowerCase()) ||
        metaB.location.toLowerCase().includes(search.toLowerCase());

      if (!(matchesExchange && matchesCloud && matchesRegion && matchesSearch)) continue;

      const points = (data[pair] || []).filter((point) => {
        const inLatency =
          point.latency >= latencyRange[0] && point.latency <= latencyRange[1];
        const inTime = point.timestamp >= cutoff;
        return inTime && inLatency;
      });

      if (points.length > 0) {
        result[pair] = points;
      }
    }

    return result;
  }, [
    data,
    selectedRange,
    realTime,
    exchangeFilter,
    cloudProviderFilter,
    regionFilter,
    latencyRange,
    search,
  ]);

  const hasData = Object.keys(filteredData).length > 0;

  const handleExpandToggle = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
      toggleScrollLock();
    }
  };

  return (
    <div className={`trends-container ${isMobile ? 'mobile' : ''} ${isExpanded ? 'expanded' : ''}`}>
      {/* Mobile header with expand button */}
      {isMobile && (
        <div className="mobile-trends-header" onClick={handleExpandToggle}>
          <span className="trends-title">📊 Latency Trends</span>
          <span className="expand-icon">{isExpanded ? '🔽' : '🔼'}</span>
          {isScrollLocked && <div className="scroll-lock-indicator">🔒</div>}
        </div>
      )}

      {/* Scrollable content */}
      <div 
        ref={scrollContainerRef}
        className={`trends-content ${isExpanded ? 'expanded' : ''}`}
      >
        <TimeRangeSelector />

        {shouldShowNoDataMessage ? (
          <div className="no-data-message">
            <p>No data selected. Enable real-time from Filters or choose a Time Range.</p>
          </div>
        ) : hasData ? (
          <div className="charts-container">
            {Object.entries(filteredData).map(([pair, points]) => {
              const [exchangeA, exchangeB] = pair.split("-");
              const metaA = EXCHANGE_META[exchangeA as keyof typeof EXCHANGE_META];
              const metaB = EXCHANGE_META[exchangeB as keyof typeof EXCHANGE_META];
              if (!metaA || !metaB) return null;
              
              return (
                <div key={pair} className="chart-item">
                  <h3 className="latency-heading">
                    {exchangeA} ({metaA.cloud}, {metaA.location}) → {exchangeB} (
                    {metaB.cloud}, {metaB.location})
                  </h3>
                  <LatencyChart pair={pair} points={points} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-data-message">
            <p>No latency data available in the selected range or filters.</p>
          </div>
        )}
      </div>

      {/* Scroll indicators for mobile */}
      {isMobile && isExpanded && hasData && (
        <div className="scroll-indicators">
          <div className="scroll-hint">Swipe up/down to scroll through charts</div>
        </div>
      )}
    </div>
  );
}