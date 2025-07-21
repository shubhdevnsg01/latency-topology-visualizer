import React, { useState } from "react";

export const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (val: boolean) => void }) => {
  return (
    <div
      className="switch"
      data-checked={checked}
      onClick={() => onCheckedChange(!checked)}
    >
      <div className="switch-thumb" />
    </div>
  );
};
