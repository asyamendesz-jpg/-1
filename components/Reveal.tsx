"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "ivory",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "ivory" | "cream" | "milk" | "graphite";
}) {
  const tones = {
    ivory: "bg-ivory",
    cream: "bg-cream",
    milk: "bg-milk",
    graphite: "bg-graphite text-ivory",
  };

  return (
    <section id={id} className={cn("px-5 py-20 sm:px-8 md:py-28 lg:px-12", tones[tone], className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
      {children}
    </p>
  );
}

export function PlaceholderBadge({ label = "[ФОТО РАБОТЫ]" }: { label?: string }) {
  return (
    <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-ivory/86 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-chocolate backdrop-blur-sm">
      {label}
    </span>
  );
}
