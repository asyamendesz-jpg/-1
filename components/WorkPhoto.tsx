import { PlaceholderBadge } from "@/components/Reveal";
import { mediaSrc } from "@/lib/asset";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function WorkPhoto({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  badge = "[ФОТО РАБОТЫ]",
  showBadge = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  badge?: string;
  showBadge?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-powder", className)}>
      <Image
        src={mediaSrc(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {showBadge ? <PlaceholderBadge label={badge} /> : null}
    </div>
  );
}
