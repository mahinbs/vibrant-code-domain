import { useEffect, useRef, useState } from "react";
import { automationScopeItems } from "../data/businessAutomationContent";
import { ArrowRightIcon } from "./icons";
import { WorkflowMesh } from "./WorkflowMesh";

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

export function AutomationScopeExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [meshKey, setMeshKey] = useState(0);
  const [meshReady, setMeshReady] = useState(true);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);
  const active = automationScopeItems[activeIndex];

  function handleNavClick(i: number) {
    setActiveIndex(i);
    setMeshKey((k) => k + 1);
    setMeshReady(false);
    window.setTimeout(() => setMeshReady(true), 320);
  }

  function handleMobileToggle(id: string) {
    setOpenMobileId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      id="what-we-automate"
      className="relative flex w-full max-w-[1920px] flex-col gap-4 overflow-x-hidden px-5 py-16 md:px-10 md:py-24"
      style={{
        background:
          "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="relative z-[1] w-full overflow-visible">
        <p
          aria-hidden
          className="pointer-events-none absolute left-0 top-[40%] z-0 hidden w-full max-w-none -translate-y-1/2 select-none text-left font-bold uppercase leading-[0.88] tracking-[0.02em] opacity-[0.32] md:block"
          style={{
            fontSize: "clamp(2.5rem, min(12vw, 11rem), 11rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          WHAT WE AUTOMATE
        </p>

        <div className="relative z-[2] ml-auto flex max-w-[680px] flex-col items-end gap-5 pt-1 text-right md:mt-[clamp(2.75rem,9vw,6.5rem)] max-md:items-start max-md:text-left">
          <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
            What we can <span className="impact-highlight">automate for you</span>
          </h2>
          <p className="max-w-[540px] text-lg text-white/60 max-md:text-base">
            Across industries. Across functions. End-to-end.
          </p>
        </div>
      </div>

      <div className="relative z-[1]">
        <div
          className="hidden overflow-hidden rounded-[14px] border border-white/12 lg:grid lg:grid-cols-[minmax(260px,320px)_1fr] lg:items-stretch"
          style={{ background: GLOSS }}
        >
          <nav
            className="flex flex-col gap-1 border-r border-white/10 bg-black/15 p-2 py-3"
            aria-label="Automation capabilities"
          >
            {automationScopeItems.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(i)}
                className={[
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
                  activeIndex === i
                    ? "bg-purple/15 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90",
                ].join(" ")}
              >
                <item.icon className="size-4 shrink-0 text-purple" />
                <span className="leading-snug">{item.shortTitle}</span>
              </button>
            ))}
          </nav>

          <ScopeDetailPanel item={active} embedded meshKey={meshKey} meshEnabled />
        </div>

        {/* Mobile: inline accordion — content expands within each row. */}
        <div className="flex flex-col gap-2 lg:hidden">
          {automationScopeItems.map((item) => (
            <ScopeAccordionItem
              key={item.id}
              item={item}
              isOpen={openMobileId === item.id}
              onToggle={() => handleMobileToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScopeAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof automationScopeItems)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [meshKey, setMeshKey] = useState(0);
  const [meshReady, setMeshReady] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setMeshReady(false);
      return;
    }
    setMeshKey((k) => k + 1);
    setMeshReady(false);
    window.setTimeout(() => setMeshReady(true), 320);
    const el = rowRef.current;
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className={[
        "overflow-hidden rounded-[12px] border bg-black/20",
        isOpen ? "border-purple/40" : "border-white/[0.06]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left"
      >
        <item.icon className="size-5 shrink-0 text-purple" />
        <span className="flex-1 text-[15px] font-medium text-white">{item.shortTitle}</span>
        <span
          className={[
            "text-lg text-white/40 transition-transform duration-200",
            isOpen ? "rotate-45" : "",
          ].join(" ")}
          aria-hidden
        >
          +
        </span>
      </button>
      {isOpen ? (
        <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
          <ScopeDetailPanel
            item={item}
            compact
            meshKey={meshKey}
            meshEnabled={meshReady}
          />
        </div>
      ) : null}
    </div>
  );
}

function ScopeDetailPanel({
  item,
  compact = false,
  embedded = false,
  meshKey = 0,
  meshEnabled = true,
}: {
  item: (typeof automationScopeItems)[number];
  compact?: boolean;
  embedded?: boolean;
  meshKey?: number;
  meshEnabled?: boolean;
}) {
  const showMesh = embedded || compact;

  const copyBlock = (
    <>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
          What it looks like
        </p>
        <ul className="flex flex-col gap-2">
          {item.examples.map((ex) => (
            <li key={ex} className="flex items-start gap-2 text-sm text-white/75">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-purple" aria-hidden />
              {ex}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
          Works with
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/12 bg-black/30 px-2.5 py-1 text-[12px] text-white/60"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#contact-form"
        className="btn-gloss relative mt-1 inline-flex w-fit items-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
      >
        <span className="relative z-[2]">Automate this</span>
        <ArrowRightIcon className="relative z-[2] size-[13px]" />
      </a>
    </>
  );

  return (
    <div
      className={[
        "flex flex-col gap-5",
        compact ? "p-0" : embedded ? "h-full p-6 md:p-8" : "rounded-[14px] border border-white/12 p-6 md:p-8",
      ].join(" ")}
      style={compact || embedded ? undefined : { background: GLOSS }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-[12px] border border-white/15 text-purple"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.45), rgba(0,0,0,0.6))",
          }}
        >
          <item.icon className="size-6" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white md:text-2xl">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/65">{item.desc}</p>
        </div>
      </div>

      {compact && showMesh ? (
        <WorkflowMesh
          key={`${item.id}-${meshKey}`}
          scopeId={item.id}
          enabled={meshEnabled}
          compact
        />
      ) : null}

      {compact ? (
        <div className="flex flex-col gap-5">{copyBlock}</div>
      ) : (
        <div
          className={
            showMesh
              ? "grid gap-6 lg:grid-cols-[1fr_minmax(220px,42%)] lg:items-stretch lg:gap-0"
              : ""
          }
        >
          <div className="flex flex-col gap-5 lg:border-r lg:border-white/10 lg:pr-6">
            {copyBlock}
          </div>

          {showMesh ? (
            <div className="lg:pl-6">
              <WorkflowMesh
                key={`${item.id}-${meshKey}`}
                scopeId={item.id}
                enabled={meshEnabled}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
