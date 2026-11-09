import fs from "node:fs";
import { createPagesServer } from "./serve-pages.mjs";

const port = 4173;
const origin = `http://127.0.0.1:${port}`;
const home = `${origin}/-1/`;

const server = createPagesServer();
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

async function get(url) {
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  return { url, status: res.status, type: res.headers.get("content-type") || "", bytes: buf.length, body: buf };
}

const homeRes = await get(home);
const html = homeRes.body.toString("utf8");
const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
const abs = [...new Set(urls)]
  .filter((u) => u.startsWith("/") || u.startsWith("http://127.0.0.1"))
  .map((u) => (u.startsWith("http") ? u : `${origin}${u}`));

const results = [];
for (const url of abs) results.push(await get(url));

const pages = ["/", "/faq/", "/raboty/", "/podbor/", "/zapis/", "/uslugi/", "/kontakty/"];
const pageResults = [];
for (const p of pages) pageResults.push(await get(`${origin}/-1${p}`));

const failed = [...results, ...pageResults].filter((r) => r.status !== 200);
const css = results.filter((r) => r.url.includes(".css"));
const js = results.filter((r) => r.url.endsWith(".js"));
const images = results.filter((r) => /\.(jpg|jpeg|png|webp|woff2)$/i.test(r.url));

const checks = {
  homeStatus: homeRes.status,
  homeBytes: homeRes.bytes,
  hero: html.includes("Бережный уход") && html.includes("Салон бережного ухода"),
  desire: html.includes("Что вы хотите изменить?"),
  services: html.includes("Услуг") || html.includes("uslugi"),
  beauty: html.includes("Beauty-подбор") || html.includes("beauty-podbor"),
  works: html.includes("До и после") || html.includes("Реальные работы"),
  masters: html.includes("Мастер"),
  reviews: html.includes("отзыв") || html.includes("Отзыв"),
  prices: html.includes("цен") || html.includes("Цен"),
  faq: html.includes("вопрос") || html.includes("FAQ"),
  contacts: html.includes("Контакт"),
  cssOk: css.length > 0 && css.every((r) => r.status === 200 && r.bytes > 100 && r.type.includes("css")),
  jsOk: js.length > 0 && js.every((r) => r.status === 200 && r.bytes > 100),
  imagesOk: images.length > 0 && images.every((r) => r.status === 200 && r.bytes > 50),
  nojekyll: fs.existsSync("out/.nojekyll"),
  failed: failed.map((r) => ({ url: r.url, status: r.status, bytes: r.bytes, type: r.type })),
  cssCount: css.length,
  jsCount: js.length,
  imageCount: images.length,
  pageStatuses: pageResults.map((r) => ({ url: r.url, status: r.status, bytes: r.bytes })),
};

console.log(JSON.stringify(checks, null, 2));
server.close();
if (failed.length || !checks.hero || !checks.cssOk || !checks.imagesOk) process.exit(1);
