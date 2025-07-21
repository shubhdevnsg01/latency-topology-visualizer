"use client"

import React, { useState } from "react";

export function Dialog({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button className="dialog-button" onClick={onOpen}>
      ⚙️ Filters
    </button>
  );
}

export function DialogOverlay({ onClose }: { onClose: () => void }) {
  return <div className="dialog-overlay" onClick={onClose} />;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="dialog-content">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>{children}</h2>;
}
