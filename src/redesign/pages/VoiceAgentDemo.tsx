import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

/**
 * AI Voice Agent demo (link-only, noindex) — lets a client talk to an agent.
 *
 * Two modes, both free-tier friendly:
 * 1. ElevenLabs Conversational Agent (recommended): paste a public agent-id
 *    (created free at elevenlabs.io → Agents). Embeds their official widget —
 *    no API key in the browser.
 * 2. Built-in demo (zero setup): browser speech-recognition + a scripted
 *    Boostmysites automation assistant. Speaks via ElevenLabs TTS when an
 *    API key is pasted (stored only in this browser), else browser voice.
 */

const LS_AGENT = "bms_el_agent_id";
const LS_KEY = "bms_el_api_key";
const DEFAULT_VOICE = "21m00Tcm4TlvDq8ikWAM"; // Rachel

const AGENT_ID_ENV = (import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined) || "";

type Msg = { role: "you" | "agent"; text: string };

/** Tiny scripted brain for the fallback demo — sounds like a BMS sales agent. */
function demoBrain(input: string, turn: number): string {
  const t = input.toLowerCase();
  if (/\b(hi|hello|hey|good (morning|afternoon|evening))\b/.test(t))
    return "Hi! I'm the Boostmysites AI voice agent. I can tell you how we automate businesses — ask me about services, pricing, or booking a free audit.";
  if (/price|cost|charge|budget|fee/.test(t))
    return "Pricing depends on how many workflows we automate. Most projects start after a free 30-minute audit, where we map your bottlenecks and give you an exact quote. Shall I tell you how the audit works?";
  if (/audit|book|call|meeting|demo/.test(t))
    return "Great — the free AI audit is a 30-minute call. We identify three things your team does manually that can be automated this month. You can book it right on boostmysites.com, or message us on WhatsApp.";
  if (/service|automate|automation|what.*do|offer/.test(t))
    return "We build AI employees — lead follow-up, WhatsApp sales assistants, invoice and document processing, CRM updates, meeting scheduling, and daily business reports. Which of those sounds like your biggest time sink?";
  if (/whatsapp/.test(t))
    return "Yes — WhatsApp automation is one of our most popular builds. Your assistant can answer product questions, qualify leads and book appointments twenty four seven. Want to hear a real example?";
  if (/example|case study|client/.test(t))
    return "One industrial client processed fifteen quotation requests a day, each taking an hour. Our agent now does each one in about two and a half minutes — a ninety five percent reduction in manual effort.";
  if (/thank|bye|goodbye/.test(t))
    return "Thanks for trying the demo! If you'd like this voice agent trained on your own business, book a free audit at boostmysites.com. Goodbye!";
  if (turn === 0)
    return "Welcome! I'm a demo of the AI voice agents Boostmysites builds. Ask me what we can automate, what it costs, or how to get started.";
  return "Good question — in the full version I'd be trained on your business data and connected to your CRM. For this demo, try asking about our services, pricing, or a real case study.";
}

async function speakElevenLabs(text: string, apiKey: string): Promise<boolean> {
  try {
    const r = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      },
    );
    if (!r.ok) return false;
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    await new Promise<void>((res) => {
      const a = new Audio(url);
      a.onended = () => res();
      a.onerror = () => res();
      void a.play().catch(() => res());
    });
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

/** Free, human-sounding neural voice via our /api/tts proxy (Microsoft neural
 *  → Google TTS fallback). No API key, no login. */
async function speakNeural(text: string, voice = "en-US-AriaNeural"): Promise<boolean> {
  try {
    const r = await fetch(`/api/tts?voice=${voice}&text=${encodeURIComponent(text)}`);
    if (!r.ok) return false;
    const blob = await r.blob();
    if (!blob.size || !blob.type.includes("audio")) return false;
    const url = URL.createObjectURL(blob);
    await new Promise<void>((res) => {
      const a = new Audio(url);
      a.onended = () => res();
      a.onerror = () => res();
      void a.play().catch(() => res());
    });
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

/** Pick the most natural-sounding system voice available. */
function pickBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  if (!voices.length) return null;
  const rank = (v: SpeechSynthesisVoice): number => {
    const n = v.name.toLowerCase();
    if (!v.lang.toLowerCase().startsWith("en")) return -1;
    if (n.includes("natural") || n.includes("neural")) return 100; // Edge neural voices
    if (n.includes("premium") || n.includes("enhanced")) return 90; // iOS/macOS enhanced
    if (n.includes("google uk english female")) return 80;
    if (n.includes("google us english")) return 75;
    if (n.includes("google")) return 70;
    if (n.includes("samantha") || n.includes("karen") || n.includes("daniel") || n.includes("moira")) return 60;
    return 10;
  };
  return voices.slice().sort((a, b) => rank(b) - rank(a))[0] ?? null;
}

function speakBrowser(text: string): Promise<void> {
  return new Promise((res) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      const best = pickBestVoice();
      if (best) u.voice = best;
      u.rate = 1.02;
      u.pitch = 1;
      u.onend = () => res();
      u.onerror = () => res();
      window.speechSynthesis.speak(u);
    } catch {
      res();
    }
  });
}

export default function VoiceAgentDemo() {
  const [agentId, setAgentId] = useState<string>(() => AGENT_ID_ENV || localStorage.getItem(LS_AGENT) || "");
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(LS_KEY) || "");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [supportsSTT, setSupportsSTT] = useState(true);
  const [interim, setInterim] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);
  const turnRef = useRef(0);
  const logRef = useRef<HTMLDivElement | null>(null);

  // Load the ElevenLabs widget script when an agent id is set.
  useEffect(() => {
    if (!agentId) return;
    if (document.querySelector('script[data-el-convai]')) return;
    const s = document.createElement("script");
    s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    s.async = true;
    s.setAttribute("data-el-convai", "1");
    document.body.appendChild(s);
  }, [agentId]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, interim]);

  // Warm up the system voice list (fallback) so it's ready if needed.
  useEffect(() => {
    if (agentId) return;
    window.speechSynthesis?.getVoices?.();
    const onVoices = () => window.speechSynthesis?.getVoices?.();
    window.speechSynthesis?.addEventListener?.("voiceschanged", onVoices);
    return () => window.speechSynthesis?.removeEventListener?.("voiceschanged", onVoices);
  }, [agentId]);

  async function respond(userText: string) {
    const reply = demoBrain(userText, turnRef.current);
    turnRef.current += 1;
    setMsgs((m) => [...m, { role: "agent", text: reply }]);
    setSpeaking(true);
    // Voice chain: ElevenLabs (if key) → free neural (Microsoft/Google) → best system voice.
    let ok = false;
    if (apiKey) ok = await speakElevenLabs(reply, apiKey);
    if (!ok) ok = await speakNeural(reply);
    if (!ok) await speakBrowser(reply);
    setSpeaking(false);
  }

  function startListening() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupportsSTT(false);
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    setListening(true);
    setInterim("");
    let finalText = "";
    rec.onresult = (e: { results: SpeechRecognitionResultList; resultIndex: number }) => {
      let interimTxt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else interimTxt += res[0].transcript;
      }
      setInterim(interimTxt || finalText);
    };
    rec.onend = () => {
      setListening(false);
      setInterim("");
      const text = finalText.trim();
      if (text) {
        setMsgs((m) => [...m, { role: "you", text }]);
        void respond(text);
      }
    };
    rec.onerror = () => {
      setListening(false);
      setInterim("");
    };
    rec.start();
  }

  function stopListening() {
    recRef.current?.stop();
  }

  function saveSettings(nextAgent: string, nextKey: string) {
    localStorage.setItem(LS_AGENT, nextAgent.trim());
    localStorage.setItem(LS_KEY, nextKey.trim());
    setAgentId(nextAgent.trim());
    setApiKey(nextKey.trim());
    setSettingsOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#06070c] text-white">
      <Helmet>
        <title>AI Voice Agent Demo | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="mx-auto flex w-full max-w-[900px] items-center justify-between px-5 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
          <span className="text-sm font-semibold">Boostmysites</span>
        </a>
        <button
          onClick={() => setSettingsOpen(true)}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-[13px] text-white/70 hover:text-white"
        >
          ⚙️ Setup
        </button>
      </header>

      <main className="mx-auto w-full max-w-[900px] px-5 pb-16">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple">
            Live demo
          </p>
          <h1 className="text-[38px] font-medium -tracking-[0.03em] leading-[1.05] md:text-[52px]">
            Talk to our <span className="impact-highlight">AI voice agent</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] text-white/60">
            {agentId
              ? "Tap the widget below and start speaking — the agent listens and answers in real time."
              : "Tap the mic, ask about our services, pricing, or automation — the agent answers out loud."}
          </p>
        </div>

        {agentId ? (
          /* Mode 1: real ElevenLabs conversational agent */
          <div>
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.02] p-6">
              {/* @ts-expect-error — custom element from the ElevenLabs embed script */}
              <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
            </div>
            <p className="mt-3 text-center text-[12px] text-white/40">
              Powered by your ElevenLabs agent{" "}
              <code className="text-white/55">{agentId.slice(0, 10)}…</code> ·{" "}
              <button onClick={() => setSettingsOpen(true)} className="text-[#7aa2ff] hover:underline">change</button>
            </p>
          </div>
        ) : (
          <>
          {/* Connect an ElevenLabs public agent for the real widget */}
          <div className="mb-5 rounded-2xl border border-[#4b78ff]/30 bg-[#4b78ff]/[0.06] p-5">
            <p className="text-[14px] font-medium text-white">🎧 Connect your ElevenLabs agent</p>
            <p className="mt-1 text-[12px] text-white/55">
              Create a <b>public agent</b> (auth disabled) at elevenlabs.io → Agents, then paste its Agent ID for the real ElevenLabs voice widget.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = (new FormData(e.currentTarget).get("aid") as string || "").trim();
                if (v) saveSettings(v, apiKey);
              }}
              className="mt-3 flex flex-wrap gap-2"
            >
              <input
                name="aid"
                placeholder="agent_xxxxxxxxxxxxxxxx"
                className="min-w-[220px] flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#4b78ff] focus:outline-none"
              />
              <button type="submit" className="rounded-lg bg-[#4b78ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d63d8]">
                Load widget
              </button>
            </form>
          </div>

          {/* Mode 2: built-in demo (works with no setup) */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <div className="flex flex-col items-center gap-5">
              <button
                onClick={listening ? stopListening : startListening}
                disabled={speaking}
                className={`relative flex size-28 items-center justify-center rounded-full text-4xl transition-all ${
                  listening
                    ? "bg-red-500/90 shadow-[0_0_60px_rgba(239,68,68,0.5)] animate-pulse"
                    : speaking
                      ? "bg-[#4b78ff]/40"
                      : "bg-[#4b78ff] shadow-[0_0_50px_rgba(75,120,255,0.45)] hover:scale-105"
                }`}
                aria-label={listening ? "Stop listening" : "Start talking"}
              >
                {listening ? "⏹" : speaking ? "🔊" : "🎙️"}
              </button>
              <p className="text-[13px] text-white/50">
                {listening
                  ? interim
                    ? `“${interim}”`
                    : "Listening… speak now, tap to finish"
                  : speaking
                    ? "Agent is speaking…"
                    : "Tap the mic and speak"}
              </p>
              {!supportsSTT ? (
                <p className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-[13px] text-amber-200">
                  This browser doesn&apos;t support speech recognition — please use Chrome or Edge.
                </p>
              ) : null}
              {!apiKey ? (
                <p className="text-[11px] text-white/35">
                  Natural voice included — add a free ElevenLabs key in ⚙️ Setup for the most realistic voice.
                </p>
              ) : (
                <p className="text-[11px] text-white/35">Voice by ElevenLabs.</p>
              )}
            </div>

            {/* Transcript */}
            <div ref={logRef} className="mt-6 max-h-[300px] space-y-2 overflow-y-auto">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                      m.role === "you" ? "bg-[#4b78ff]/25 text-white" : "bg-white/[0.06] text-white/85"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
        )}

        <p className="mt-6 text-center text-[12px] text-white/35">
          Built by Boostmysites — in production this agent is trained on your business and connected to your CRM, calendar and WhatsApp.
        </p>
      </main>

      {settingsOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <SettingsForm
            initialAgent={agentId}
            initialKey={apiKey}
            onClose={() => setSettingsOpen(false)}
            onSave={saveSettings}
          />
        </div>
      ) : null}
    </div>
  );
}

function SettingsForm({
  initialAgent,
  initialKey,
  onClose,
  onSave,
}: {
  initialAgent: string;
  initialKey: string;
  onClose: () => void;
  onSave: (agent: string, key: string) => void;
}) {
  const [agent, setAgent] = useState(initialAgent);
  const [key, setKey] = useState(initialKey);
  const inputCls =
    "mt-1 w-full rounded-lg border border-white/15 bg-black/40 p-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#4b78ff] focus:outline-none";
  return (
    <div className="my-8 w-full max-w-[520px] rounded-2xl border border-white/15 bg-[#0c1020] p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">⚙️ Demo setup</h2>
        <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">✕</button>
      </div>
      <div className="flex flex-col gap-4 text-[13px] text-white/70">
        <label>
          ElevenLabs Agent ID <span className="text-white/40">(recommended — full conversational AI)</span>
          <input value={agent} onChange={(e) => setAgent(e.target.value)} placeholder="agent_..." className={inputCls} />
          <p className="mt-1 text-[11px] text-white/40">
            Free at elevenlabs.io → Agents → Create agent → set it Public → copy the Agent ID.
          </p>
        </label>
        <label>
          ElevenLabs API key <span className="text-white/40">(optional — premium voice for the built-in demo)</span>
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk_..." type="password" className={inputCls} />
          <p className="mt-1 text-[11px] text-white/40">
            Stored only in this browser (localStorage). Free tier: ~10 min of speech per month.
          </p>
        </label>
        <div className="mt-1 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">Cancel</button>
          <button onClick={() => onSave(agent, key)} className="rounded-lg bg-[#4b78ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d63d8]">Save</button>
        </div>
      </div>
    </div>
  );
}
