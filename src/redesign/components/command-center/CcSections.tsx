import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Check, Play, Sparkles } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { SiHubspot, SiOpenai } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { CcInlineLeadForm, useLeadCta, type LeadIntent } from "./CcLeadForm";
import { LogoRow } from "./CcLogos";
import { CcJourney, Highlight } from "./CcJourney";
import {
  appHref,
  ccContact,
  ccDemo,
  ccFeatures,
  ccFinal,
  ccGoalBand,
  ccHow,
  ccIntegrations,
  ccNavLinks,
  ccOffer,
  ccRaas,
  ccUseCases,
  commandCenterHeader,
  type CcFeature,
  type IconItem,
  type LogoKey,
} from "../../data/commandCenterContent";

type Tone = "light" | "dark";

/* ---------- Shared bits ---------- */

export function Corners() {
  return (
    <>
      <span className="cc-corner tl" />
      <span className="cc-corner tr" />
      <span className="cc-corner bl" />
      <span className="cc-corner br" />
    </>
  );
}

export function Section({
  id,
  tone,
  className,
  label,
  children,
}: {
  id?: string;
  tone: Tone;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`cc-sec is-${tone}${className ? ` ${className}` : ""}`}
      aria-label={label}
    >
      <div className="cc-wrap">{children}</div>
    </section>
  );
}

export function SecHead({
  number,
  badge,
  heading,
  sub,
  center,
  logos,
}: {
  number?: string;
  badge: string;
  heading: string;
  sub?: ReactNode;
  center?: boolean;
  /** Brand marks shown above the eyebrow for sections about a specific platform. */
  logos?: LogoKey[];
}) {
  return (
    <header className={`cc-head${center ? " is-center" : ""}`}>
      {logos?.length ? (
        <LogoRow logos={logos} size="lg" className="cc-head-logos" />
      ) : null}
      <div className="cc-eyebrow">
        {number ? `${number} · ` : null}
        {badge}
      </div>
      <h2 className="cc-h2">
        <Highlight text={heading} />
      </h2>
      {sub ? <p className="cc-lead">{sub}</p> : null}
    </header>
  );
}

export function IconList({ items }: { items: IconItem[] }) {
  return (
    <ul className="cc-list">
      {items.map(({ icon: Icon, text }) => (
        <li key={text}>
          <span className="cc-icon-tile" aria-hidden="true">
            <Icon size={18} strokeWidth={2} />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export function Btn({
  href,
  children,
  variant = "primary",
  size,
  icon = "arrow",
  onClick,
  lead,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "lg" | "sm";
  icon?: "arrow" | "play" | "spark" | "none";
  onClick?: () => void;
  /** Send the visitor to the enquiry form (scroll or modal) with this intent. */
  lead?: LeadIntent;
}) {
  const cls = `cc-btn is-${variant}${size ? ` is-${size}` : ""}`;
  const leadIcon =
    icon === "play" ? (
      <Play size={16} fill="currentColor" />
    ) : icon === "spark" ? (
      <Sparkles size={17} />
    ) : null;
  const trail = icon === "arrow" ? <ArrowRight size={17} /> : null;
  const inner = (
    <>
      {leadIcon}
      <span>{children}</span>
      {trail}
    </>
  );
  if (lead)
    return (
      <LeadLink className={cls} intent={lead}>
        {inner}
      </LeadLink>
    );
  return href ? (
    <a className={cls} href={href}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

/** Anchor to #contact that routes through the lead form (works without JS too). */
export function LeadLink({
  intent,
  className,
  children,
  tabIndex,
}: {
  intent: LeadIntent;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
}) {
  const { openLead } = useLeadCta();
  return (
    <a
      href="#contact"
      className={className}
      tabIndex={tabIndex}
      onClick={(e) => {
        e.preventDefault();
        openLead(intent);
      }}
    >
      {children}
    </a>
  );
}

/** Muted autoplaying loop that only loads and plays while on screen. */
export function InViewVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void el.play().catch(() => undefined);
        } else if (el.currentTime < 1.5) {
          // Scrolled past before it got going: reset so the poster shows instead of a dark first frame.
          el.load();
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}

/** Platforms that build and launch end to end (others are planned only). */
const PLATFORMS = [
  { name: "Meta", icon: <FaMeta color="#0866FF" /> },
  { name: "Google", icon: <FcGoogle /> },
  { name: "ChatGPT Ads", icon: <SiOpenai color="#111" /> },
];

/* ---------- Sticky nav ---------- */

export function CcStickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tab = visible ? 0 : -1;

  return (
    <header
      className={`cc-nav${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="cc-nav-inner">
        <a href="#top" className="cc-nav-brand" tabIndex={tab}>
          <img
            src={commandCenterHeader.logoSrc}
            alt=""
            width={28}
            height={28}
          />
          <span>
            {commandCenterHeader.brandDark}
            <em>{commandCenterHeader.brandAccent}</em>
          </span>
        </a>
        <nav className="cc-nav-links" aria-label="Page sections">
          {ccNavLinks.map((l) => (
            <a key={l.href} href={l.href} tabIndex={tab}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="cc-nav-actions">
          <a
            className="cc-btn is-ghost is-sm cc-nav-login"
            href={appHref()}
            tabIndex={tab}
          >
            <span>Login</span>
          </a>
          <LeadLink
            className="cc-btn is-primary is-sm"
            intent={{ source: "sticky-nav" }}
            tabIndex={tab}
          >
            <span>Book free demo</span>
            <ArrowRight size={15} />
          </LeadLink>
        </div>
      </div>
    </header>
  );
}

/* ---------- Goal band (dark) ---------- */

function useTyped(lines: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(lines[0]);
      return;
    }
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = lines[line];
      char += deleting ? -1 : 1;
      setText(full.slice(0, char));
      let wait = deleting ? 22 : 45;
      if (!deleting && char === full.length) {
        deleting = true;
        wait = 1800;
      } else if (deleting && char === 0) {
        deleting = false;
        line = (line + 1) % lines.length;
        wait = 300;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [lines]);

  return text;
}

export function CcGoalBand({ onWatchDemo }: { onWatchDemo: () => void }) {
  const [goal, setGoal] = useState<string | null>(null);
  const typed = useTyped(ccGoalBand.typed);

  return (
    <Section tone="dark" className="cc-goalband" label="Start a campaign">
      <div className="cc-goalband-grid">
        {/* Left: the offer, in a box with an animated outline. */}
        <div className="cc-offer-box">
          <div className="cc-offer">
            <span className="cc-offer-badge">{ccOffer.badge}</span>
            <h2 className="cc-offer-head">
              <Highlight text={ccOffer.headline} />
            </h2>
            <p className="cc-offer-price">
              <s>{ccOffer.was}</s> <strong>{ccOffer.price}</strong>
            </p>
            <p className="cc-offer-inr">{ccOffer.inr}</p>
            <ul className="cc-checks">
              {ccOffer.includes.map((t) => (
                <li key={t}>
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="cc-actions">
              <Btn lead={{ source: "offer-box" }} size="lg" icon="spark">
                {ccOffer.cta}
              </Btn>
            </div>
            <CcJourney compact className="cc-offer-journey" />
          </div>
        </div>

        {/* Right: pick a goal; it is carried into the form. */}
        <div className="cc-goal-picker">
          <div className="cc-eyebrow">{ccGoalBand.label}</div>
          <div className="cc-typed" aria-hidden="true">
            <span className="cc-typed-text">{typed}</span>
            <i />
          </div>
          <p className="cc-lead">{ccGoalBand.sub}</p>
          <div className="cc-chips" role="group" aria-label="Pick a goal">
            {ccGoalBand.chips.map((c) => (
              <button
                key={c.label}
                type="button"
                className={`cc-chip${goal === c.goal ? " is-on" : ""}`}
                aria-pressed={goal === c.goal}
                onClick={() => setGoal(goal === c.goal ? null : c.goal)}
              >
                {goal === c.goal ? <Check size={14} strokeWidth={3} /> : null}
                {c.label}
              </button>
            ))}
          </div>
          <div className="cc-actions">
            <Btn lead={{ goal: goal ?? undefined, source: "goal-band" }} size="lg">
              {ccGoalBand.primary}
            </Btn>
            <Btn variant="ghost" size="lg" icon="play" onClick={onWatchDemo}>
              {ccGoalBand.secondary}
            </Btn>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Demo (light) ---------- */

export function CcDemo({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <Section id="demo" tone="light">
      <SecHead
        number={ccDemo.number}
        badge={ccDemo.label}
        heading={ccDemo.heading}
        sub={ccDemo.sub}
        center
      />
      <div className="cc-frame-16x9">
        <Corners />
        <video
          ref={videoRef}
          src={ccDemo.video}
          poster={ccDemo.poster}
          controls
          playsInline
          preload="none"
        />
      </div>
      <ul className="cc-trust cc-trust-bar">
        {ccDemo.trust.map(({ icon: Icon, text }) => (
          <li key={text}>
            <span className="cc-icon-tile is-lg" aria-hidden="true">
              <Icon size={22} strokeWidth={1.9} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Feature deep-dives (dark / light / dark) ---------- */

export function CcFeatureSection({
  feature: f,
  tone,
  flip,
}: {
  feature: CcFeature;
  tone: Tone;
  flip?: boolean;
}) {
  return (
    <Section id={f.id} tone={tone}>
      <div className={`cc-split${flip ? " is-flipped" : ""}`}>
        <div className="cc-split-copy">
          <SecHead
            number={f.number}
            badge={f.badge}
            heading={f.heading}
            logos={f.logos}
          />
          <p className="cc-body">{f.body}</p>
          <IconList items={f.bullets} />
          <div className="cc-actions">
            <Btn lead={{ goal: f.cta.goal, source: f.id }}>{f.cta.label}</Btn>
            {f.secondary ? (
              <Btn
                lead={{ goal: f.secondary.goal, source: `${f.id}-secondary` }}
                variant="ghost"
                icon="none"
              >
                {f.secondary.label}
              </Btn>
            ) : null}
          </div>
          {f.note ? <p className="cc-note">{f.note}</p> : null}
        </div>
        <div className="cc-split-media">
          <div className="cc-phone">
            <InViewVideo src={f.video} poster={f.poster} label={f.videoLabel} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function CcFeatures() {
  return (
    <>
      {ccFeatures.map((f, i) => (
        <CcFeatureSection
          key={f.id}
          feature={f}
          tone={i % 2 === 0 ? "dark" : "light"}
          flip={i % 2 === 1}
        />
      ))}
    </>
  );
}

/* ---------- Result as a Service (light) ---------- */

export function CcRaas() {
  return (
    <Section id="raas" tone="light">
      <div className="cc-split is-top">
        <div className="cc-split-copy">
          <SecHead
            number={ccRaas.number}
            badge={ccRaas.badge}
            heading={ccRaas.heading}
          />
          <p className="cc-body">{ccRaas.body}</p>
          <IconList items={ccRaas.bullets} />
          <div className="cc-offer-card">
            <span className="cc-offer-badge">{ccOffer.badge}</span>
            <div className="cc-offer-card-row">
              <strong>2,500 credits</strong>
              <span>
                <s>{ccOffer.was}</s> <b>{ccOffer.price}</b>
              </span>
            </div>
            <p>
              {ccOffer.inr}. {ccOffer.how}
            </p>
          </div>
          <div className="cc-actions">
            <Btn lead={{ goal: ccRaas.primary.goal, source: "pricing" }}>
              {ccRaas.primary.label}
            </Btn>
            <Btn
              lead={{ source: "pricing-secondary" }}
              variant="ghost"
              icon="none"
            >
              {ccRaas.secondary.label}
            </Btn>
          </div>
        </div>
        <div className="cc-panel cc-price">
          <Corners />
          <h3 className="cc-panel-title">{ccRaas.tableHeading}</h3>
          <table>
            <tbody>
              {ccRaas.table.map(([what, credits]) => (
                <tr key={what}>
                  <td>{what}</td>
                  <td>
                    <span className="cc-price-pill">{credits} credits</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cc-note">{ccRaas.footnote}</p>
          <LogoRow
            logos={ccRaas.paymentLogos}
            size="sm"
            label="Payment methods"
            className="cc-pay-logos"
          />
          <p className="cc-note">{ccRaas.payments}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Who it's for (dark) ---------- */

export function CcUseCases() {
  const [custom, setCustom] = useState("");
  const { openLead } = useLeadCta();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    openLead({ goal: custom.trim() || undefined, source: "custom-goal" });
  };

  return (
    <Section id="goals" tone="dark">
      <SecHead
        number={ccUseCases.number}
        badge={ccUseCases.badge}
        heading={ccUseCases.heading}
        sub={ccUseCases.sub}
        center
      />
      <div className="cc-usecases">
        {ccUseCases.items.map(({ icon: Icon, title, who, goals }) => (
          <article key={title} className="cc-usecase">
            <span className="cc-icon-tile is-lg" aria-hidden="true">
              <Icon size={22} strokeWidth={1.9} />
            </span>
            <h3 className="cc-h3">{title}</h3>
            <p className="cc-usecase-who">{who}</p>
            <ul>
              {goals.map((g) => (
                <li key={g}>
                  <LeadLink
                    intent={{ goal: `${g} (${title})`, source: "use-case" }}
                  >
                    <span>{g}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </LeadLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <form className="cc-custom-goal" onSubmit={onSubmit}>
        <label htmlFor="cc-custom-goal">{ccUseCases.customLabel}</label>
        <div>
          <input
            id="cc-custom-goal"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder={ccUseCases.customPlaceholder}
            maxLength={160}
          />
          <button type="submit" className="cc-btn is-primary">
            <Sparkles size={17} />
            <span>{ccUseCases.customCta}</span>
          </button>
        </div>
      </form>
    </Section>
  );
}

/* ---------- How it works (light) ---------- */

export function CcHow() {
  return (
    <Section id="how" tone="light">
      <SecHead
        number={ccHow.number}
        badge={ccHow.badge}
        heading={ccHow.heading}
        sub={ccHow.sub}
        center
      />
      <div className="cc-frame-16x9">
        <Corners />
        <InViewVideo
          src={ccHow.video}
          poster={ccHow.poster}
          label={ccHow.overlay}
        />
        <span className="cc-frame-tag">{ccHow.overlay}</span>
      </div>
      <ol className="cc-steps">
        {ccHow.steps.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="cc-panel">
            <div className="cc-step-top">
              <span className="cc-icon-tile is-lg" aria-hidden="true">
                <Icon size={22} strokeWidth={1.9} />
              </span>
              <span className="cc-step-num">0{i + 1}</span>
            </div>
            <h3 className="cc-h3">{title}</h3>
            <p className="cc-body">{body}</p>
          </li>
        ))}
      </ol>
      <dl className="cc-stats">
        {ccHow.stats.map(({ icon: Icon, value, label }) => (
          <div key={label}>
            <Icon size={20} aria-hidden="true" />
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
      <div className="cc-platforms">
        <span className="cc-eyebrow">{ccIntegrations.label}</span>
        <ul>
          {PLATFORMS.map((p) => (
            <li key={p.name}>
              {p.icon}
              {p.name}
            </li>
          ))}
          <li className="is-tail">
            <SiHubspot color="#FF7A59" />
            {ccIntegrations.tail}
          </li>
        </ul>
      </div>
      <p className="cc-platforms-note">{ccIntegrations.plans}</p>
    </Section>
  );
}

/* ---------- Contact (dark) + final CTA (light) ---------- */

export function CcContact() {
  return (
    <Section id="contact" tone="dark">
      <div className="cc-split is-contact">
        <div className="cc-split-copy">
          <SecHead
            number={ccContact.number}
            badge={ccContact.badge}
            heading={ccContact.heading}
            logos={ccContact.logos}
          />
          <p className="cc-body">{ccContact.body}</p>
          <CcJourney className="cc-contact-journey" />
        </div>
        <CcInlineLeadForm />
      </div>
    </Section>
  );
}

export function CcFinal() {
  return (
    <Section tone="dark" className="cc-final">
      <header className="cc-head is-center">
        <h2 className="cc-h2">
          <Highlight text={ccFinal.heading} />
        </h2>
        <p className="cc-lead">
          {ccFinal.sub} <strong>{ccFinal.subStrong}</strong>
        </p>
      </header>
      <div className="cc-actions is-center">
        <Btn lead={{ source: "final-cta" }} size="lg" icon="spark">
          {ccFinal.cta}
        </Btn>
      </div>
    </Section>
  );
}
