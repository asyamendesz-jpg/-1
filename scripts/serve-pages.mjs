import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT || 4173);
const basePath = "/-1";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

export function createPagesServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/" || urlPath === "") {
      res.writeHead(302, { Location: `${basePath}/` });
      res.end();
      return;
    }
    if (urlPath !== basePath && !urlPath.startsWith(`${basePath}/`)) {
      return send(res, 404, "Not found (missing /-1 base path)");
    }
    let relative = urlPath.slice(basePath.length) || "/";
    let filePath = path.join(root, relative);
    if (relative.endsWith("/")) filePath = path.join(filePath, "index.html");
    if (!path.extname(filePath) && fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const html404 = path.join(root, "404.html");
      return send(res, 404, fs.existsSync(html404) ? fs.readFileSync(html404) : "Not found", {
        "Content-Type": "text/html; charset=utf-8",
      });
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, fs.readFileSync(filePath), {
      "Content-Type": mime[ext] || "application/octet-stream",
    });
  });
}

if (process.argv[1] && path.normalize(process.argv[1]).endsWith("serve-pages.mjs")) {
  const server = createPagesServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(`GitHub Pages preview: http://127.0.0.1:${port}${basePath}/`);
  });
}
