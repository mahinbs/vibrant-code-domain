import { Link, type To } from "react-router-dom";

type Props = {
  src: string;
  mobileSrc?: string;
  applyHref: string;
};

function parseApplyTo(href: string): To {
  const queryIndex = href.indexOf("?");
  if (queryIndex === -1) return href;
  return {
    pathname: href.slice(0, queryIndex),
    search: href.slice(queryIndex),
  };
}

export function TechCompanyHeroBanner({ src, mobileSrc, applyHref }: Props) {
  const mobileArt = mobileSrc ?? src;
  const applyTo = parseApplyTo(applyHref);

  const overlayClass =
    "absolute z-30 block min-h-[52px] touch-manipulation rounded-[10px] bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div className="relative w-full">
      <picture>
        <source media="(min-width: 768px)" srcSet={src} />
        <img
          src={mobileArt}
          alt="Start the next big tech company, BoostMySites founder program"
          className="block h-auto w-full select-none"
          width={mobileSrc ? 1882 : 1920}
          height={mobileSrc ? 3344 : 1080}
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Landscape: APPLY bottom-right */}
        <Link
          to={applyTo}
          className={`${overlayClass} bottom-[6%] right-[3%] hidden h-[12%] w-[28%] min-w-[140px] max-w-[280px] md:pointer-events-auto md:block`}
          aria-label="Apply now, founder application"
        >
          <span className="sr-only">Apply now</span>
        </Link>
        {/* Portrait: APPLY full-width above footer */}
        <Link
          to={applyTo}
          className={`${overlayClass} bottom-[9%] left-[5%] h-14 w-[90%] max-md:pointer-events-auto md:hidden`}
          aria-label="Apply now, founder application"
        >
          <span className="sr-only">Apply now</span>
        </Link>
      </div>
    </div>
  );
}
