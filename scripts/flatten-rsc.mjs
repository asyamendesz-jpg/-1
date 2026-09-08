import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

let copied = 0;
for (const file of walk(outDir)) {
  if (!file.endsWith(`${path.sep}__PAGE__.txt`) && !file.endsWith("/__PAGE__.txt")) continue;
  const rel = path.relative(outDir, file);
  const parts = rel.split(path.sep);
  const nextIdx = parts.findIndex((part) => part.startsWith("__next."));
  if (nextIdx === -1) continue;
  const destName = parts.slice(nextIdx).join(".");
  const destDir = path.join(outDir, ...parts.slice(0, nextIdx));
  const dest = path.join(destDir, destName);
  if (dest === file) continue;
  fs.copyFileSync(file, dest);
  copied += 1;
  console.log(`${path.relative(outDir, file)} -> ${path.relative(outDir, dest)}`);
}

console.log(`flattened ${copied} RSC payloads`);
