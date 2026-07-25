import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Conversation } from "@elevenlabs/client";

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

// Default public Boostmysites agent (published, auth disabled). Override via
// env or the on-page connect bar (stored per-browser in localStorage).
const DEFAULT_AGENT_ID = "agent_9501kyc7wq2nfh7811r6td7kp9f8";
const AGENT_ID_ENV =
  (import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined) || DEFAULT_AGENT_ID;

type Msg = { role: "you" | "agent"; text: string };

const GREETING =
  "Hi there! I'm the Boostmysites AI voice agent. I can tell you how we automate businesses — ask me about our services, pricing, a real example, or how to get started.";

/** Scripted brain for the built-in demo — sounds like a BMS sales agent. */
function demoBrain(input: string, turn: number): string {
  const t = input.toLowerCase();
  if (/\b(hi|hello|hey|yo|good (morning|afternoon|evening)|how are you)\b/.test(t))
    return "Hey! Great to have you. I help businesses replace repetitive work with AI. What would you like to automate — sales, support, operations, or finance?";
  if (/price|cost|charge|budget|fee|how much|expensive/.test(t))
    return "Pricing depends on how many workflows we automate for you. Most projects begin with a free thirty-minute audit, where we map your bottlenecks and give you an exact quote. Would you like to know how the audit works?";
  if (/audit|book|call|meeting|demo|get started|sign up|onboard/.test(t))
    return "Perfect. The free AI audit is a thirty-minute call where we find three things your team does manually that we can automate this month. You can book it on boostmysites.com, or just message us on WhatsApp. Shall I point you there?";
  if (/service|automate|automation|what (can|do) you|offer|help me with|solution/.test(t))
    return "We build AI employees — lead follow-up, WhatsApp sales assistants, invoice and document processing, CRM updates, meeting scheduling, and daily business reports. Which of those sounds like your biggest time sink?";
  if (/whatsapp/.test(t))
    return "WhatsApp automation is one of our most popular builds. Your assistant can answer product questions, qualify leads, and book appointments twenty four seven, right inside WhatsApp. Want to hear a real example?";
  if (/example|case study|client|proof|result|who.*use/.test(t))
    return "Sure. One industrial client was processing fifteen quotation requests a day, each taking about an hour. Our agent now handles each one in roughly two and a half minutes — a ninety-five percent cut in manual effort. Want another example?";
  if (/lead|follow.?up|crm|sales/.test(t))
    return "For sales, we automate lead capture, instant follow-up, and CRM updates, so leads get a reply in minutes instead of days and nothing slips through. Would a WhatsApp sales assistant help your team?";
  if (/support|customer|ticket|complaint|24|after hours/.test(t))
    return "Our AI handles customer support around the clock — answering common questions, qualifying enquiries, and escalating the serious ones with full context. So your business is always responsive, even after hours.";
  if (/invoice|document|accounting|finance|report|data/.test(t))
    return "We automate document and invoice processing — extracting data, validating it, and posting clean entries — plus daily business reports. Month-end that took days can drop to hours. Is finance a pain point for you?";
  if (/how (does it|it) work|integrate|setup|implement|time|long|weeks/.test(t))
    return "We connect the tools you already use — no rip and replace — and go live in about thirty days. You stay in the loop while the AI handles the repetitive work. Want to book a free audit to scope it?";
  if (/industry|business|manufactur|real estate|health|ecommerce|retail|do you work with/.test(t))
    return "We work across industries — manufacturing, real estate, healthcare, e-commerce, education, and more. The playbook adapts to your workflows. What industry are you in?";
  if (/human|real|are you (a )?(bot|ai|robot)|voice/.test(t))
    return "Good question — yes, I'm an AI voice agent, a demo of what Boostmysites builds. In the full version I'd be trained on your business data and connected to your CRM, calendar, and WhatsApp.";
  if (/thank|bye|goodbye|that.?s all|no more/.test(t))
    return "Thanks for trying the demo! If you'd like an agent like this trained on your own business, book a free audit at boostmysites.com. Have a great day!";
  if (turn === 0) return GREETING;
  return "That's a great question. In production I'd be trained on your exact business and data. For this demo, try asking about our services, pricing, how it works, or a real case study.";
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

/** Custom, centered "Start a call" UI using the ElevenLabs SDK (public agent). */
function AgentCall({ agentId }: { agentId: string }) {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [mode, setMode] = useState<"listening" | "speaking">("listening");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convRef = useRef<any>(null);

  async function start() {
    setError(null);
    setStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const conv = await Conversation.startSession({
        agentId,
        connectionType: "webrtc",
        onStatusChange: ({ status: s }) => {
          if (s === "connected") setStatus("connected");
          if (s === "disconnected") setStatus("idle");
        },
        onModeChange: ({ mode: m }) => setMode(m),
        onError: (m) => { setError(m || "Something went wrong."); setStatus("idle"); },
        onDisconnect: () => setStatus("idle"),
      });
      convRef.current = conv;
    } catch (e) {
      setError(
        e instanceof Error && /permission|denied|NotAllowed/i.test(e.message)
          ? "Microphone access is needed — please allow it and try again."
          : "Couldn't start the call. Please try again.",
      );
      setStatus("idle");
    }
  }

  async function end() {
    try { await convRef.current?.endSession?.(); } catch { /* noop */ }
    convRef.current = null;
    setStatus("idle");
  }

  useEffect(() => () => { void convRef.current?.endSession?.(); }, []);

  const connected = status === "connected";
  const connecting = status === "connecting";

  return (
    <div
      className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/12 p-8 text-center"
      style={{ background: "radial-gradient(60% 80% at 50% 20%, rgba(75,120,255,0.18), rgba(6,7,12,0) 70%)" }}
    >
      {/* Animated Boostmysites logo orb */}
      <style>{`
        @keyframes bmsFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes bmsSpin { to { transform: rotate(360deg) } }
        @keyframes bmsPulseRing { 0%{transform:scale(.8);opacity:.6} 80%,100%{transform:scale(1.9);opacity:0} }
        @keyframes bmsCallGlow {
          0%,100% { box-shadow: 0 0 22px rgba(16,220,150,.55), 0 0 60px rgba(16,220,150,.25), inset 0 0 12px rgba(255,255,255,.25); }
          50%     { box-shadow: 0 0 34px rgba(16,220,150,.85), 0 0 90px rgba(16,220,150,.45), inset 0 0 16px rgba(255,255,255,.35); }
        }
        @keyframes bmsShimmer { to { background-position: 200% center; } }
      `}</style>
      <button
        onClick={connected ? end : start}
        disabled={connecting}
        className="relative z-[1] flex size-48 items-center justify-center rounded-full disabled:opacity-70"
        aria-label={connected ? "End call" : "Start a call"}
        style={{ animation: "bmsFloat 4s ease-in-out infinite" }}
      >
        {/* Expanding pulse rings (faster + blue while speaking) */}
        {connected ? (
          <>
            <span
              className={`absolute rounded-full ${mode === "speaking" ? "bg-[#4b78ff]/40" : "bg-emerald-400/30"}`}
              style={{ width: 176, height: 176, animation: `bmsPulseRing ${mode === "speaking" ? "1.1s" : "1.8s"} ease-out infinite` }}
            />
            <span
              className={`absolute rounded-full ${mode === "speaking" ? "bg-[#4b78ff]/30" : "bg-emerald-400/20"}`}
              style={{ width: 176, height: 176, animation: `bmsPulseRing ${mode === "speaking" ? "1.1s" : "1.8s"} ease-out .5s infinite` }}
            />
          </>
        ) : null}
        {/* Rotating gradient halo */}
        <span
          className="absolute rounded-full"
          style={{
            width: 192,
            height: 192,
            background: connected && mode === "speaking"
              ? "conic-gradient(from 0deg, #4b78ff, #9dbaff, #4b78ff, #1e3a8a, #4b78ff)"
              : "conic-gradient(from 0deg, #4b78ff, #7aa2ff, #22d3a5, #4b78ff)",
            filter: "blur(14px)",
            opacity: connected ? 0.85 : 0.5,
            animation: `bmsSpin ${connected && mode === "speaking" ? "3s" : "8s"} linear infinite`,
          }}
        />
        {/* Logo disc */}
        <span
          className="relative flex size-40 items-center justify-center rounded-full bg-white ring-1 ring-white/30"
          style={{ boxShadow: connected ? "0 0 70px rgba(75,120,255,0.6)" : "0 0 45px rgba(75,120,255,0.4)" }}
        >
          <img src="/bms-logo.png" alt="Boostmysites" className="size-24 object-contain" />
        </span>
      </button>

      <div>
        <p className="text-[17px] font-medium text-white">
          {connecting ? "Connecting…" : connected ? (mode === "speaking" ? "Agent is speaking…" : "Listening — go ahead") : "Talk to the Boostmysites AI Voice Agent"}
        </p>
        <p className="mt-1 text-[13px] text-white/50">
          {connected ? "Speak naturally — it responds in real time." : "Tap to start, allow the microphone, and just talk."}
        </p>
      </div>

      {!connected ? (
        <button
          onClick={start}
          disabled={connecting}
          className="group relative overflow-hidden rounded-full px-10 py-4 text-[15px] font-bold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.04] disabled:opacity-60"
          style={{
            background: "linear-gradient(90deg, #059669, #10dc96, #34ffd0, #10dc96, #059669)",
            backgroundSize: "200% auto",
            border: "1px solid rgba(120,255,214,0.6)",
            animation: connecting ? "none" : "bmsCallGlow 2s ease-in-out infinite, bmsShimmer 3.5s linear infinite",
          }}
        >
          <span className="relative z-[1] flex items-center gap-2">
            <span className="text-[18px]">📞</span>
            {connecting ? "Connecting…" : "Start a call"}
          </span>
          {/* sheen sweep */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </button>
      ) : (
        <button
          onClick={end}
          className="rounded-xl border border-red-400/40 bg-red-500/15 px-8 py-3.5 text-[15px] font-semibold text-red-200 hover:bg-red-500/25"
        >
          ⏹ End call
        </button>
      )}

      {error ? <p className="max-w-[360px] text-[13px] text-amber-300/90">{error}</p> : null}
    </div>
  );
}

export default function VoiceAgentDemo() {
  const [agentId, setAgentId] = useState<string>(() => localStorage.getItem(LS_AGENT) || AGENT_ID_ENV);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(LS_KEY) || "");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [supportsSTT, setSupportsSTT] = useState(true);
  const [interim, setInterim] = useState("");
  const [convo, setConvo] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);
  const turnRef = useRef(0);
  const convoRef = useRef(false);
  const logRef = useRef<HTMLDivElement | null>(null);

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

  async function agentSay(text: string) {
    setMsgs((m) => [...m, { role: "agent", text }]);
    setSpeaking(true);
    // Voice chain: ElevenLabs (if key) → free neural (Microsoft/Google) → best system voice.
    let ok = false;
    if (apiKey) ok = await speakElevenLabs(text, apiKey);
    if (!ok) ok = await speakNeural(text);
    if (!ok) await speakBrowser(text);
    setSpeaking(false);
  }

  async function respond(userText: string) {
    const reply = demoBrain(userText, turnRef.current);
    turnRef.current += 1;
    await agentSay(reply);
    // Hands-free: keep the conversation going after the agent finishes.
    if (convoRef.current) window.setTimeout(() => startListening(), 300);
  }

  async function startConversation() {
    convoRef.current = true;
    setConvo(true);
    if (msgs.length === 0) {
      turnRef.current = 1;
      await agentSay(GREETING);
    }
    if (convoRef.current) startListening();
  }

  function stopConversation() {
    convoRef.current = false;
    setConvo(false);
    try { recRef.current?.stop(); } catch { /* noop */ }
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
    setListening(false);
    setSpeaking(false);
    setInterim("");
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
      } else if (convoRef.current) {
        // Silence while in conversation — keep listening.
        window.setTimeout(() => { if (convoRef.current) startListening(); }, 400);
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
            Tap “Start a call”, allow your microphone, and just talk — the agent listens and answers in real time.
          </p>
        </div>

        {agentId ? (
          /* Mode 1: custom centered call UI (Boostmysites AI voice agent) */
          <div>
            <AgentCall agentId={agentId} />
            <p className="mt-3 text-center text-[12px] text-white/40">Boostmysites AI Voice Agent</p>
          </div>
        ) : (
          <>
          {/* Connect an ElevenLabs public agent for the real widget */}
          <div className="mb-5 rounded-2xl border border-[#4b78ff]/30 bg-[#4b78ff]/[0.06] p-5">
            <p className="text-[14px] font-medium text-white">🎧 Connect the Boostmysites AI voice agent</p>
            <p className="mt-1 text-[12px] text-white/55">
              Paste the voice agent ID to load the live Boostmysites AI voice widget.
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
                onClick={convo ? stopConversation : startConversation}
                className={`relative flex size-28 items-center justify-center rounded-full text-4xl transition-all ${
                  convo
                    ? listening
                      ? "bg-red-500/90 shadow-[0_0_60px_rgba(239,68,68,0.5)] animate-pulse"
                      : "bg-[#4b78ff]/70 shadow-[0_0_50px_rgba(75,120,255,0.45)]"
                    : "bg-[#4b78ff] shadow-[0_0_50px_rgba(75,120,255,0.45)] hover:scale-105"
                }`}
                aria-label={convo ? "End conversation" : "Start conversation"}
              >
                {!convo ? "🎙️" : listening ? "🔴" : speaking ? "🔊" : "⏹"}
              </button>
              <p className="min-h-[20px] text-[13px] text-white/50">
                {!convo
                  ? "Tap to start — then just talk, hands-free"
                  : listening
                    ? interim
                      ? `“${interim}”`
                      : "Listening… go ahead, speak"
                    : speaking
                      ? "Agent is speaking…"
                      : "…"}
              </p>
              {convo ? (
                <button onClick={stopConversation} className="text-[12px] text-white/45 hover:text-white">
                  ⏹ End conversation
                </button>
              ) : null}
              {!supportsSTT ? (
                <p className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-[13px] text-amber-200">
                  This browser doesn&apos;t support speech recognition — please use Chrome or Edge.
                </p>
              ) : null}
              {!apiKey ? (
                <p className="text-[11px] text-white/35">
                  Boostmysites AI voice — natural and clear.
                </p>
              ) : (
                <p className="text-[11px] text-white/35">Boostmysites AI voice.</p>
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
        <h2 className="text-lg font-semibold text-white">⚙️ Admin setup</h2>
        <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">✕</button>
      </div>
      <div className="flex flex-col gap-4 text-[13px] text-white/70">
        <label>
          Voice agent ID <span className="text-white/40">(full conversational AI)</span>
          <input value={agent} onChange={(e) => setAgent(e.target.value)} placeholder="agent_..." className={inputCls} />
          <p className="mt-1 text-[11px] text-white/40">
            Internal: paste the published voice-agent ID to override the default.
          </p>
        </label>
        <label>
          Voice API key <span className="text-white/40">(optional — premium voice for the built-in demo)</span>
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk_..." type="password" className={inputCls} />
          <p className="mt-1 text-[11px] text-white/40">
            Internal only. Stored in this browser (localStorage), never in the code.
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
