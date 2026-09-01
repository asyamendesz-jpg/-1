"use client";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export function QuizStep({
  title,
  question,
  step,
  total,
  children,
}: {
  title: string;
  question: string;
  step: number;
  total: number;
  children: React.ReactNode;
}) {
  const progress = (step / total) * 100;

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">{title}</p>
      <div className="mt-4 h-px bg-line">
        <div className="h-px bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-3 text-xs text-mist">
        Шаг {step} из {total}
      </p>
      <h2 className="mt-6 font-serif text-3xl text-ink md:text-4xl">{question}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function OptionGrid({
  options,
  value,
  onChange,
  multiple = false,
}: {
  options: { value: string; label: string }[];
  value?: string | string[];
  onChange: (value: string) => void;
  multiple?: boolean;
}) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-[1.3rem] border px-5 py-4 text-left text-sm transition duration-300 hover:scale-[1.01]",
              active ? "border-gold bg-cream text-ink" : "border-line bg-ivory text-muted hover:border-sand",
            )}
            aria-pressed={active}
          >
            {option.label}
            {multiple && active ? <span className="ml-2 text-gold">✓</span> : null}
          </button>
        );
      })}
    </div>
  );
}
