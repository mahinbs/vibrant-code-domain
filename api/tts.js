/**
 * Free, keyless, human-sounding text-to-speech proxy.
 *
 * Primary: Microsoft Edge neural voices (edge-tts protocol over WebSocket) —
 * genuinely natural, no API key. Fallback: Google Translate TTS. Returns MP3.
 *
 * GET /api/tts?text=...&voice=en-US-AriaNeural
 */
import crypto from "node:crypto";
import { WebSocket } from "ws";

const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const CHROMIUM_FULL_VERSION = "130.0.2849.68";
const SEC_MS_GEC_VERSION = `1-${CHROMIUM_FULL_VERSION}`;
const WSS_BASE = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}`;

function secMsGecToken() {
  // Windows file time (100ns since 1601), rounded down to 5-minute window.
  let ticks = BigInt(Math.floor(Date.now() / 1000) + 11644473600) * 10000000n;
  ticks -= ticks % 3000000000n;
  const str = `${ticks.toString()}${TRUSTED_CLIENT_TOKEN}`;
  return crypto.createHash("sha256").update(str, "ascii").digest("hex").toUpperCase();
}

function ssml(text, voice) {
  const safe = String(text).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voice}'><prosody rate='+4%' pitch='+0Hz'>${safe}</prosody></voice></speak>`;
}

function edgeTts(text, voice) {
  return new Promise((resolve, reject) => {
    const connId = crypto.randomUUID().replace(/-/g, "");
    const url = `${WSS_BASE}&Sec-MS-GEC=${secMsGecToken()}&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}&ConnectionId=${connId}`;
    const ws = new WebSocket(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
        Origin: "chrome-extension://jdiccldimpfdjdepjfdemgjelgkhgjb",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
    });
    const chunks = [];
    const timer = setTimeout(() => {
      try { ws.terminate(); } catch { /* noop */ }
      reject(new Error("edge-tts timeout"));
    }, 12000);

    ws.on("open", () => {
      ws.send(
        `X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
          `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`,
      );
      ws.send(
        `X-RequestId:${connId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toISOString()}Z\r\nPath:ssml\r\n\r\n${ssml(text, voice)}`,
      );
    });

    ws.on("message", (data, isBinary) => {
      if (isBinary) {
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
        const headerLen = buf.readUInt16BE(0);
        chunks.push(buf.subarray(headerLen + 2));
      } else {
        const msg = data.toString();
        if (msg.includes("Path:turn.end")) {
          clearTimeout(timer);
          try { ws.close(); } catch { /* noop */ }
          if (chunks.length) resolve(Buffer.concat(chunks));
          else reject(new Error("edge-tts: no audio"));
        }
      }
    });
    ws.on("error", (e) => { clearTimeout(timer); reject(e); });
    ws.on("close", () => { clearTimeout(timer); if (!chunks.length) reject(new Error("edge-tts closed empty")); });
  });
}

async function googleTts(text) {
  // Google Translate TTS: ~200 char limit per request, so chunk on sentences.
  const parts = [];
  let cur = "";
  for (const w of String(text).split(/(\s+)/)) {
    if ((cur + w).length > 190) { parts.push(cur); cur = w; }
    else cur += w;
  }
  if (cur.trim()) parts.push(cur);
  const bufs = [];
  for (const p of parts) {
    const u = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(p.trim())}&tl=en&client=tw-ob&ttsspeed=1`;
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
    if (r.ok) bufs.push(Buffer.from(await r.arrayBuffer()));
  }
  if (!bufs.length) throw new Error("google-tts empty");
  return Buffer.concat(bufs);
}

export default async function handler(req, res) {
  const text = String(req.query.text || "").slice(0, 800);
  const voice = /^[a-zA-Z-]+Neural$/.test(String(req.query.voice || "")) ? req.query.voice : "en-US-AriaNeural";
  if (!text.trim()) return res.status(400).json({ error: "text required" });

  let audio = null;
  let via = "edge";
  try {
    audio = await edgeTts(text, voice);
  } catch {
    try { audio = await googleTts(text); via = "google"; } catch { audio = null; }
  }
  if (!audio) return res.status(502).json({ error: "tts failed" });

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("X-TTS-Via", via);
  res.status(200).send(audio);
}
