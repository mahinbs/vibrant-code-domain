import { Link } from "react-router-dom";
import { BrandTile } from "./icons";

const sections = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Applications", href: "/work?service=web" },
      { label: "SaaS Platforms", href: "/work?service=saas" },
      { label: "Mobile Applications", href: "/work?service=mobile" },
      { label: "AI Calling Agency", href: "/work?service=ai-calling" },
      { label: "AI Automation", href: "/work?service=ai-automation" },
      { label: "Product Design", href: "/work?service=design" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms-and-conditions" },
    ],
  },
];

export function WorkFooter() {
  return (
    <footer className="mt-20 w-full max-w-[min(1500px,96vw)] px-10 pb-10 max-md:px-5">
      <div className="glass-card flex flex-col gap-10 p-10 max-md:p-6">
        <div className="grid grid-cols-4 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <BrandTile />
              <span className="text-[15px] font-semibold text-white">Boostmysites</span>
            </Link>
            <p className="max-w-[260px] text-sm text-white/60">
              Custom software & AI, shipped at agency speed.
            </p>
          </div>
          {sections.map((s) => (
            <div key={s.title} className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                {s.title}
              </p>
              <ul className="flex flex-col gap-2">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50 max-md:flex-col max-md:gap-3">
          <span>© {new Date().getFullYear()} Boostmysites. All rights reserved.</span>
          <span>Custom software & AI</span>
        </div>
      </div>
    </footer>
  );
}
