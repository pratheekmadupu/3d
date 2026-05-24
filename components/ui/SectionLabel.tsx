import React from "react";

interface SectionLabelProps {
  number: string;
  text: string;
  light?: boolean;
}

export default function SectionLabel({ number, text, light = false }: SectionLabelProps) {
  return (
    <div className="flex items-center space-x-3 mb-6 select-none font-display">
      <span
        className={`text-xs font-bold tracking-widest ${
          light ? "text-primary/70" : "text-primary"
        }`}
      >
        {number}
      </span>
      <span
        className={`h-[1px] w-8 ${
          light ? "bg-primary/30" : "bg-primary/20"
        }`}
      />
      <div className="flex items-center space-x-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            light ? "bg-accent" : "bg-primary"
          } animate-pulse`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
