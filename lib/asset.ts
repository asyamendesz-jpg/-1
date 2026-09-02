/** Префикс репозитория на GitHub Pages. Локально пустой. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function mediaSrc(src: string) {
  if (!src || /^(https?:|data:|blob:)/i.test(src)) return src;
  if (basePath && (src === basePath || src.startsWith(`${basePath}/`))) return src;
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}
