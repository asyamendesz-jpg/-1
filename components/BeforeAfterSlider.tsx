"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}) {
  const [value, setValue] = useState(52);
  const ref = useRef<HTMLDivElement>(null);

  const onPointer = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(96, Math.max(4, next)));
  };

  return (
    <div
      ref={ref}
      className={cn("relative aspect-[4/3] overflow-hidden bg-powder select-none", className)}
      onPointerDown={(event) => {
        (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
        onPointer(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.buttons !== 1) return;
        onPointer(event.clientX);
      }}
    >
      <Image src={after} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
        <Image src={before} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-ivory" style={{ left: `${value}%` }} />
      <div
        className="pointer-events-none absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-ivory/85 text-[10px] uppercase tracking-[0.14em] text-chocolate"
        style={{ left: `${value}%` }}
      >
        ↔
      </div>
      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/45 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-ivory">
        До
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/45 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-ivory">
        После
      </div>
      <input
        aria-label="Сравнить до и после"
        type="range"
        min={4}
        max={96}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="absolute inset-0 z-20 cursor-ew-resize opacity-0"
      />
    </div>
  );
}
