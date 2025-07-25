
'use client';
import React from 'react';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

const Tooltip = ({ visible, x, y, content }: TooltipProps) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: y + 10,
        left: x + 10,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        pointerEvents: 'none',
        fontSize: '14px',
        zIndex: 1000,
        whiteSpace: 'nowrap',
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
