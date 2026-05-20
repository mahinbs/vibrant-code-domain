type Props = {
  serviceId: string;
};

const ICON_CLASS = "h-32 w-32 text-white/[0.06] sm:h-36 sm:w-36 md:h-40 md:w-40";

/** Large faint watermark for expanded founder service panels. */
export function FounderServiceBackgroundIcon({ serviceId }: Props) {
  switch (serviceId) {
    case "tech-product":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <path
            d="M4 7h6v6H4V7zm10 0h6v6h-6V7zM4 15h6v6H4v-6zm10 0h6v6h-6v-6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "brand-design":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <path
            d="M4 16l8-8 4 4-8 8H4v-4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M13.8 6.2l2-2a1.8 1.8 0 1 1 2.6 2.6l-2 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8" cy="8" r="1.2" fill="currentColor" />
        </svg>
      );
    case "marketing-growth":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <path
            d="M4 18V6M8 18v-5M12 18V9M16 18v-3M20 18V4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "gtm-launch":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <path
            d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M9.5 12.5l1.8 1.8 3.4-3.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "startup-india":
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 8v8M9.5 10.5h5M9.5 13.5h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden className={ICON_CLASS}>
          <path
            d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
  }
}
