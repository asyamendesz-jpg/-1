export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isPlaceholder(value?: string | null) {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

export function hasUsableLink(value?: string | null) {
  if (!value || isPlaceholder(value)) return false;
  return /^(https?:\/\/|tel:|mailto:)/i.test(value) || value.startsWith("/");
}

export function formatPlaceholder(value: string) {
  return value;
}
