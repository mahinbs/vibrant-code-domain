import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AudioLines,
  CircleUserRound,
  Database,
  Mail,
  PhoneCall,
} from "lucide-react";
import { FaLinkedin, FaMeta, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import "../components/command-center/commandCenter.css";
import {
  CcContact,
  CcDemo,
  CcFinal,
  CcGoalBand,
  CcRaas,
  CcStickyNav,
  CcUseCases,
  CcFeatureSection,
} from "../components/command-center/CcSections";
import {
  CcBuilder,
  CcChannels,
  CcCompare,
  CcFaq,
  CcRunModes,
  CcTrio,
} from "../components/command-center/CcProductSections";
import { CcConversion, CcOfferRibbon } from "../components/command-center/CcConversion";
import { useCcReveal } from "../components/command-center/ccReveal";
import { CcPress } from "../components/command-center/CcPress";
import { CcFooter } from "../components/command-center/CcFooter";
import {
  CcLeadProvider,
  useLeadCta,
} from "../components/command-center/CcLeadForm";
import {
  capabilityGoals,
  ccFeatures,
  commandCenterAlsoIncluded,
  commandCenterCapabilities,
  commandCenterHeader,
  commandCenterHero,
  type CapabilityIconSet,
  type CommandCenterCapability,
} from "../data/commandCenterContent";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap";

const RULER_RINGS = [57, 127, 207, 262, 787];
const RULER_TICKS = [92, 167, 235, 300, 340, 420, 500, 580, 660, 740];


/**
 * Horizontal compression per headline line so each one ends where it does in the
 * artwork (Anton at 226 poster units; measured against the source PNG).
 */
const HEADLINE_SCALE = [0.737, 0.687, 0.7, 0.758];

const delay = (s: number) => ({ "--cc-delay": `${s}s` }) as CSSProperties;
const cu = (n: number) => `calc(${n} * var(--cu))`;

/**
 * Unlisted, link-only "AI Marketing Command Center" landing page (noindex): the
 * poster replica on top, then the product sections and enquiry form.
 */
export default function CommandCenterLanding() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "AI Marketing Command Center · Boostmysites";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-cc-noindex", "true");
    document.head.appendChild(meta);

    let font = document.querySelector<HTMLLinkElement>(
      'link[data-cc-fonts="true"]',
    );
    if (!font) {
      font = document.createElement("link");
      font.rel = "stylesheet";
      font.href = FONT_HREF;
      font.setAttribute("data-cc-fonts", "true");
      document.head.appendChild(font);
    }

    return () => {
      document.title = prevTitle;
      document
        .querySelectorAll('meta[data-cc-noindex="true"]')
        .forEach((m) => m.remove());
    };
  }, []);

  const { brandDark, brandAccent, tagline, pillars, logoSrc } =
    commandCenterHeader;
  const hero = commandCenterHero;
  const demoRef = useRef<HTMLVideoElement>(null);
  useCcReveal();

  const watchDemo = () => {
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    void demoRef.current?.play().catch(() => undefined);
  };

  return (
    <main className="cc-root" id="top">
      <CcLeadProvider>
        <CcStickyNav />
        <CcOfferRibbon />
        <div className="cc-poster">
          <div className="cc-frame">
            <section className="cc-top" aria-label="Introduction">
              <img
                className="cc-abs cc-logo"
                src={logoSrc}
                alt="BoostMySites logo"
                width={98}
                height={100}
              />
              <div className="cc-abs cc-brand">
                <div className="cc-brand-name">
                  {brandDark}
                  <span>{brandAccent}</span>
                </div>
                <div className="cc-brand-tag">{tagline}</div>
              </div>
              <div className="cc-abs cc-crosshair" aria-hidden="true" />
              <div className="cc-abs cc-pillars">
                {pillars.map((p) => (
                  <div key={p}>{p}</div>
                ))}
              </div>

              <img
                className="cc-abs cc-robot"
                src={hero.robotSrc}
                alt={hero.robotAlt}
                width={480}
                height={950}
                {...{ fetchpriority: "high" }}
              />
              {/* Splatter from the robot's left edge painted over "Everything", as in the artwork. */}
              <img
                className="cc-abs cc-robot cc-robot-over"
                src={hero.robotSrc}
                alt=""
                aria-hidden="true"
              />

              <div className="cc-abs cc-ruler" aria-hidden="true">
                {RULER_RINGS.map((y) => (
                  <i key={`r${y}`} style={{ top: `calc(${y} * var(--u))` }} />
                ))}
                {RULER_TICKS.map((y) => (
                  <b key={`t${y}`} style={{ top: `calc(${y} * var(--u))` }} />
                ))}
              </div>

              <h1 className="cc-abs cc-headline">
                {hero.headlineLines.map((line, i) => (
                  <span
                    key={line}
                    style={
                      {
                        ...delay(0.08 * i),
                        "--sx": HEADLINE_SCALE[i],
                      } as CSSProperties
                    }
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <div className="cc-abs cc-side-label">
                {hero.sideLabel.map((w) => (
                  <div key={w}>{w}</div>
                ))}
              </div>

              <p className="cc-abs cc-subline">
                {hero.subline}
                <strong>{hero.sublineAccent}</strong>
              </p>
            </section>

            <section className="cc-cards" aria-label="Core capabilities">
              {commandCenterCapabilities.map((c, i) => (
                <CapabilityCard
                  key={c.number}
                  capability={c}
                  goal={capabilityGoals[i]}
                />
              ))}
            </section>

            <section
              className="cc-also"
              aria-label={commandCenterAlsoIncluded.heading}
            >
              <h2
                className="cc-also-head"
                style={{ margin: 0, fontWeight: 400 }}
              >
                {commandCenterAlsoIncluded.heading}
              </h2>
              {/* Auto-scrolling strip: the list is rendered twice so the loop is seamless. */}
              <div className="cc-also-marquee">
                <div className="cc-also-track">
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="cc-also-list" aria-hidden={copy === 1 || undefined}>
                      {commandCenterAlsoIncluded.items.map(({ label, icon: Icon }) => (
                        <li key={label.join(" ")} className="cc-also-item">
                          <span className="cc-also-icon" aria-hidden="true">
                            <Icon strokeWidth={1.9} />
                          </span>
                          <span>
                            {label[0]}
                            <br />
                            {label[1]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <CcPress />

        {/* Bands alternate dark / light from here down (keep it that way when reordering). */}
        <CcGoalBand onWatchDemo={watchDemo} />
        <CcDemo videoRef={demoRef} />
        <CcBuilder />
        <CcCompare tone="light" />
        <CcFeatureSection feature={ccFeatures[1]} tone="dark" flip />
        <CcFeatureSection feature={ccFeatures[0]} tone="light" />
        <CcTrio />
        <CcRunModes />
        <CcChannels />
        <CcFeatureSection feature={ccFeatures[2]} tone="light" />
        <CcUseCases />
        <CcRaas />
        <CcContact />
        <CcFaq />
        <CcFinal />
        <CcConversion />
        <CcFooter />
      </CcLeadProvider>
    </main>
  );
}

function CapabilityCard({
  capability: c,
  goal,
}: {
  capability: CommandCenterCapability;
  goal: string;
}) {
  const { openLead } = useLeadCta();
  return (
    <a
      className="cc-card"
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        openLead({ goal, source: `card-${c.category.toLowerCase()}` });
      }}
      aria-label={`${c.title.join(" ")}: ${c.credits}`}
    >
      <span className="cc-corner tl" />
      <span className="cc-corner tr" />
      <span className="cc-corner bl" />
      <span className="cc-corner br" />
      <div className="cc-card-inner">
        <div className="cc-card-label">
          {c.number} · {c.category}
        </div>
        <img
          className="cc-card-illustration"
          src={c.illustration.src}
          alt=""
          loading="lazy"
          style={{
            right: cu(c.illustration.right),
            top: cu(c.illustration.top),
            width: cu(c.illustration.width),
          }}
        />
        <div
          className="cc-card-icons"
          role="img"
          aria-label={c.icons.alt}
          style={
            {
              left: cu(c.icons.left),
              top: cu(c.icons.top),
              "--icon": cu(c.icons.size),
            } as CSSProperties
          }
        >
          {CARD_ICONS[c.icons.set]}
        </div>
        <h3 className="cc-card-title" style={{ top: cu(c.titleTop) }}>
          {c.title.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </h3>
        <div className="cc-pill" style={{ top: cu(c.pillTop) }}>
          {c.credits}
        </div>
      </div>
    </a>
  );
}

const BLUE = "#0a5cff";

/** Crisp vector versions of the icons in the artwork, one set per capability card. */
const CARD_ICONS: Record<CapabilityIconSet, ReactNode> = {
  advertising: (
    <>
      <FaMeta color="#0866FF" />
      <FcGoogle />
      <FaLinkedin color="#0A66C2" />
      <FaTiktok className="cc-tiktok" />
    </>
  ),
  prospecting: (
    <>
      <CircleUserRound color={BLUE} strokeWidth={1.7} />
      <Database
        color={BLUE}
        fill={BLUE}
        fillOpacity={0.9}
        strokeWidth={1.4}
        stroke="#fff"
      />
    </>
  ),
  outreach: <FaLinkedin color="#0A66C2" />,
  conversations: (
    <span className="cc-wa-badge">
      <FaWhatsapp color="#fff" />
    </span>
  ),
  email: <Mail color={BLUE} strokeWidth={1.8} />,
  voice: (
    <>
      <PhoneCall color={BLUE} strokeWidth={1.7} />
      <AudioLines color={BLUE} strokeWidth={1.9} />
    </>
  ),
};
