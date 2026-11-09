import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userData = path.join(process.env.TEMP, `berezhny-chrome-profile-${Date.now()}`);
fs.mkdirSync(userData, { recursive: true });
const url = process.argv[2] || "http://127.0.0.1:4173/-1/";
const outFile = process.argv[3] || path.join(process.env.TEMP, "berezhny-shots", "pages-home.png");

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=9333",
    `--user-data-dir=${userData}`,
    url,
  ],
  { stdio: "ignore" },
);

await new Promise((r) => setTimeout(r, 2500));
const list = await (await fetch("http://127.0.0.1:9333/json/list")).json();
const page = list.find((item) => item.type === "page" && item.webSocketDebuggerUrl);
if (!page) {
  console.error(JSON.stringify({ error: "no page target", list }, null, 2));
  chrome.kill();
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const errors = [];
const requests = [];
const failed = [];

function send(method, params = {}) {
  const messageId = ++id;
  ws.send(JSON.stringify({ id: messageId, method, params }));
  return new Promise((resolve) => pending.set(messageId, resolve));
}

await new Promise((resolve) => ws.addEventListener("open", resolve));
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
  if (msg.method === "Runtime.exceptionThrown") {
    errors.push(msg.params.exceptionDetails?.text || msg.params.exceptionDetails?.exception?.description);
  }
  if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
    errors.push(msg.params.args?.map((a) => a.value || a.description).join(" "));
  }
  if (msg.method === "Network.responseReceived") {
    const { response } = msg.params;
    requests.push({ url: response.url, status: response.status, mime: response.mimeType });
    if (response.status >= 400) failed.push({ url: response.url, status: response.status, mime: response.mimeType });
  }
  if (msg.method === "Network.loadingFailed") {
    failed.push({ errorText: msg.params.errorText, canceled: msg.params.canceled });
  }
});

await send("Runtime.enable");
await send("Network.enable");
await send("Page.enable");
await send("Page.reload", { ignoreCache: true });
await new Promise((r) => setTimeout(r, 4000));
const shot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
fs.mkdirSync(path.dirname(outFile), { recursive: true });
if (!shot?.data) {
  console.error(JSON.stringify({ error: "no screenshot", errors, failed, requests: requests.slice(0, 20) }, null, 2));
  ws.close();
  chrome.kill();
  process.exit(1);
}
fs.writeFileSync(outFile, Buffer.from(shot.data, "base64"));
console.log(
  JSON.stringify(
    {
      screenshot: outFile,
      errors: errors.filter(Boolean),
      failed: failed.filter((item) => !item.canceled),
      requestCount: requests.length,
      css: requests.filter((r) => String(r.mime).includes("css")),
      next404: requests.filter((r) => r.url.includes("_next") && r.status >= 400),
      img404: requests.filter((r) => /images|icon\.png/.test(r.url) && r.status >= 400),
      sample: requests.slice(0, 15),
    },
    null,
    2,
  ),
);
ws.close();
chrome.kill();
