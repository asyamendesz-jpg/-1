"use client";

import { Button } from "@/components/Button";
import { usePathname } from "next/navigation";

export function MobileStickyCTA() {
  const pathname = usePathname();
  if (pathname === "/zapis" || pathname === "/podbor") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/94 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <Button href="/podbor" variant="secondary" className="flex-1 py-3">
          Подобрать процедуру
        </Button>
        <Button href="/zapis" className="flex-1 py-3">
          Записаться
        </Button>
      </div>
    </div>
  );
}
