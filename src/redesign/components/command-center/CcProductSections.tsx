import { Check, Minus, Plus, X } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiOpenai } from "react-icons/si";
import {
  Btn,
  Corners,
  IconList,
  LeadLink,
  Section,
  SecHead,
} from "./CcSections";
import { LogoRow } from "./CcLogos";
import {
  ccBuilder,
  ccChannels,
  ccCompare,
  ccFaq,
  ccRunModes,
  commandCenterHeader,
} from "../../data/commandCenterContent";

/* ---------- AI campaign builder (dark) ---------- */

export function CcBuilder() {
  return (
    <Section id="builder" tone="dark">
      <div className="cc-split is-top">
        <div className="cc-split-copy">
          <SecHead
            number={ccBuilder.number}
            badge={ccBuilder.badge}
            heading={ccBuilder.heading}
            logos={ccBuilder.logos}
          />
          <p className="cc-body">{ccBuilder.body}</p>
          <IconList items={ccBuilder.extras} />
          <div className="cc-actions">
            <Btn lead={{ goal: ccBuilder.cta.goal, source: "builder" }}>
              {ccBuilder.cta.label}
            </Btn>
          </div>
        </div>
        <div className="cc-builder-side">
          <figure className="cc-shot">
            <img
              src={ccBuilder.image}
              alt={ccBuilder.imageAlt}
              loading="lazy"
              width={1056}
              height={896}
            />
            <figcaption>Real screenshot</figcaption>
          </figure>
          <div className="cc-panel cc-builder-panel">
            <Corners />
            <h3 className="cc-panel-title">{ccBuilder.planLabel}</h3>
            <ul className="cc-checks">
              {ccBuilder.plan.map((p) => (
                <li key={p}>
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <h3 className="cc-panel-title is-spaced">
              <span className="cc-inline-logos" aria-hidden="true">
                <FaMeta color="#0866FF" />
                <FcGoogle />
              </span>
              {ccBuilder.campaignsLabel}
            </h3>
            <ul className="cc-campaign-tags">
              {ccBuilder.campaigns.map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li className="is-extra">
                <SiOpenai aria-hidden="true" /> + ChatGPT Ads
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Every channel (dark) ---------- */

export function CcChannels() {
  return (
    <Section id="channels" tone="dark">
      <SecHead
        number={ccChannels.number}
        badge={ccChannels.badge}
        heading={ccChannels.heading}
        sub={ccChannels.sub}
        center
      />
      <div className="cc-channels">
        {ccChannels.items.map(
          ({ icon: Icon, title, body, points, goal, logos }) => (
            <article key={title} className="cc-channel">
              <div className="cc-channel-top">
                <span className="cc-icon-tile is-lg" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.9} />
                </span>
                <LogoRow logos={logos} size="sm" />
              </div>
              <h3 className="cc-h3">{title}</h3>
              <p className="cc-channel-body">{body}</p>
              <ul className="cc-checks">
                {points.map((p) => (
                  <li key={p}>
                    <Check size={15} strokeWidth={2.6} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <LeadLink
                className="cc-text-link"
                intent={{ goal, source: `channel-${title.toLowerCase()}` }}
              >
                Book a demo for this
              </LeadLink>
            </article>
          ),
        )}
      </div>
      <p className="cc-platforms-note is-dark">{ccChannels.footnote}</p>
    </Section>
  );
}

/* ---------- Companion vs Cloud Desktop (light) ---------- */

export function CcRunModes() {
  return (
    <Section id="run" tone="light">
      <SecHead
        number={ccRunModes.number}
        badge={ccRunModes.badge}
        heading={ccRunModes.heading}
        sub={ccRunModes.sub}
        center
      />
      <div className="cc-modes">
        {ccRunModes.modes.map((m) => (
          <article key={m.key} className={`cc-mode is-${m.key}`}>
            <div className="cc-mode-top">
              <LogoRow
                logos={
                  m.key === "companion"
                    ? ["apple", "windows", "chrome"]
                    : ["chrome"]
                }
                size="md"
              />
              <span className={`cc-mode-tag is-${m.key}`}>{m.tag}</span>
            </div>
            <h3 className="cc-mode-title">{m.title}</h3>
            <p className="cc-mode-platforms">{m.platforms}</p>
            <p className="cc-body">{m.body}</p>
            <ul className="cc-checks">
              {m.points.map((p) => (
                <li key={p}>
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <ul className="cc-trust cc-modes-shared">
        {ccRunModes.shared.map(({ icon: Icon, text }) => (
          <li key={text}>
            <Icon size={18} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
      <p className="cc-platforms-note">{ccRunModes.privacy}</p>
      <div className="cc-actions is-center">
        <Btn lead={{ goal: ccRunModes.cta.goal, source: "run-modes" }}>
          {ccRunModes.cta.label}
        </Btn>
      </div>
    </Section>
  );
}

/* ---------- Compare (dark) ---------- */

const TONE_ICON = {
  bad: <X size={15} strokeWidth={2.8} aria-label="Worse" />,
  mixed: <Minus size={15} strokeWidth={2.8} aria-label="Depends" />,
  ok: <Check size={15} strokeWidth={2.8} aria-label="Fine" />,
};

export function CcCompare() {
  return (
    <Section id="compare" tone="dark">
      <SecHead number={ccCompare.number} badge={ccCompare.badge} heading={ccCompare.heading} center />
      <div className="cc-compare-wrap">
        <table className="cc-compare">
          <thead>
            <tr>
              <th scope="col">
                <span className="cc-sr">Compared on</span>
              </th>
              <th scope="col" className="is-us">
                <span className="cc-compare-badge">Recommended</span>
                <span className="cc-compare-brand">
                  <img src={commandCenterHeader.logoSrc} alt="" width={30} height={30} />
                  {ccCompare.cols[0]}
                </span>
              </th>
              {ccCompare.cols.slice(1).map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ccCompare.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td className="is-us">
                  <span className="cc-compare-tick" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {r.values[0]}
                </td>
                {r.values.slice(1).map((v, i) => (
                  <td key={v} className={`is-${r.tones[i]}`}>
                    <span className="cc-compare-tone">{TONE_ICON[r.tones[i]]}</span>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="cc-compare-cta">
              <th scope="row">
                <span className="cc-sr">Get started</span>
              </th>
              <td className="is-us">
                <Btn lead={{ source: "compare" }} icon="spark">
                  Book my free demo
                </Btn>
              </td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ---------- FAQ (light) ---------- */

export function CcFaq() {
  return (
    <Section id="faq" tone="light">
      <div className="cc-split is-top cc-faq-split">
        <div className="cc-split-copy">
          <SecHead
            number={ccFaq.number}
            badge={ccFaq.badge}
            heading={ccFaq.heading}
          />
          <div className="cc-actions">
            <Btn lead={{ source: "faq" }}>Ask our team</Btn>
          </div>
        </div>
        <div className="cc-faq">
          {ccFaq.items.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <Plus size={18} className="is-closed" aria-hidden="true" />
                <Minus size={18} className="is-open" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
