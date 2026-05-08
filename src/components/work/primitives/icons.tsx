import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[15px] shrink-0"
      {...props}
    >
      <path
        d="M2.344 8.438L5.625 11.719L13.125 4.219"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 shrink-0"
      {...props}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 shrink-0"
      {...props}
    >
      <path
        d="M13 8H3M3 8L7 4M3 8L7 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 shrink-0"
      {...props}
    >
      <path
        d="M9 3h4v4M13 3L7.5 8.5M11 9.5V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 fill-current"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.413z" />
    </svg>
  );
}

export function BrandTile(props: IconProps) {
  return (
    <svg
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="size-[38px]"
      {...props}
    >
      <defs>
        <linearGradient id="wkBmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a8cff" />
          <stop offset="100%" stopColor="#4e78ff" />
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="10" fill="url(#wkBmGrad)" />
      <path
        d="M13 11h7.5c2.485 0 4.5 1.79 4.5 4 0 1.49-.94 2.79-2.32 3.46C24.36 19 25.5 20.46 25.5 22.2c0 2.65-2.31 4.8-5.16 4.8H13V11Zm3 6.4h4c1.1 0 2-.81 2-1.8s-.9-1.8-2-1.8h-4v3.6Zm0 6.6h4.2c1.27 0 2.3-.94 2.3-2.1 0-1.16-1.03-2.1-2.3-2.1H16V24Z"
        fill="#fff"
      />
    </svg>
  );
}

export function WebAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <rect x="3" y="4.5" width="18" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="6.75" r=".7" fill="currentColor" />
      <circle cx="8.4" cy="6.75" r=".7" fill="currentColor" />
    </svg>
  );
}

export function SaasIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6v6c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7V6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12v6c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7v-6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MobileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function AiCallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <path
        d="M5 4.5h2.5l1.6 4-2 1.4c1 2.4 3 4.4 5.4 5.4l1.4-2 4 1.6V17.5a2 2 0 0 1-2.2 2A14 14 0 0 1 3 6.7 2 2 0 0 1 5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M16 3v3M19.5 4.5l-2 2M21 8h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function AiAutomationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <rect x="6" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 9V5M9 5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
      <path d="M3 13h3M18 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function DesignIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5" {...props}>
      <path
        d="M4 17.5 14 7.5l2.5 2.5L6.5 20H4v-2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M13.5 8 16 5.5a1.8 1.8 0 0 1 2.5 2.5L16 10.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="size-4 fill-current" {...props}>
      <path d="M8 1.2l1.94 4.36 4.76.45-3.6 3.16 1.06 4.66L8 11.4l-4.16 2.43 1.06-4.66L1.3 6.01l4.76-.45z" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="size-6" {...props}>
      <path d="M9 7H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6v-3h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Zm12 0h-3a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2v-3h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" />
    </svg>
  );
}
