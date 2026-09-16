import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "./SiteBackground";
import { Nav, type NavLinkItem } from "./Nav";
import { Footer } from "./Footer";
import { whatsappHref } from "../data/site";

const NAV_LINKS: ReadonlyArray<NavLinkItem> = [
  {
    label: "Services",
    dropdown: [
      { label: "AI Client Acquisition System", href: "/" },
      { label: "AI Automation", href: "/business-automation" },
    ],
  },
  { label: "How it works", href: "/#demo" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#reviews" },
];

const NAV_CTA = { label: "Get my acquisition plan", href: "/#contact-form" } as const;

type LegalPageShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
};

export function LegalPageShell({
  title,
  description,
  eyebrow,
  heading,
  children,
}: LegalPageShellProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <SiteBackground />
      <div className="relative z-10 min-h-screen text-white">
        <Nav links={NAV_LINKS} cta={NAV_CTA} whatsappHref={whatsappHref} ctaOutsideNav />
        <main className="mx-auto w-full max-w-[800px] px-5 pb-16 pt-4 md:px-10 md:pb-24 md:pt-8">
          <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[32px] font-medium leading-[1.1] -tracking-[0.04em] text-white md:text-[44px]">
            {heading}
          </h1>
          <article className="legal-prose mt-8">{children}</article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 text-[22px] font-semibold tracking-[-0.02em] text-white md:text-[24px]">
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="impact-highlight mt-6 text-[16px] font-semibold tracking-[-0.01em] md:text-[17px]">
      {children}
    </h3>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[15px] leading-relaxed text-white/70">{children}</p>;
}

export function LegalUl({ items }: { items: ReadonlyArray<ReactNode> }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-white/70">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalOl({ items }: { items: ReadonlyArray<ReactNode> }) {
  return (
    <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-white/70">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}
