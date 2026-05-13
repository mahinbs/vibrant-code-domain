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
        strokeWidth="0.94"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      className="size-7 fill-white ml-1"
      {...props}
    >
      <path d="M26.25 14C26.251 14.604 25.936 15.165 25.419 15.478L9.66 25.118C9.119 25.449 8.441 25.462 7.888 25.151C7.341 24.845 7.001 24.267 7 23.639L7 4.361C7.001 3.733 7.341 3.155 7.888 2.849C8.441 2.538 9.119 2.551 9.66 2.882L25.419 12.522C25.936 12.835 26.251 13.396 26.25 14Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 fill-white"
      {...props}
    >
      <path d="M16.641 5L19.095 5L13.735 10.93L20.041 19L15.103 19L11.236 14.106L6.811 19L4.356 19L10.09 12.657L4.041 5L9.103 5L12.599 9.474Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 fill-white"
      {...props}
    >
      <path d="M4 8.667C4 6.089 6.089 4 8.667 4L15.333 4C17.911 4 20 6.089 20 8.667L20 15.333C20 17.911 17.911 20 15.333 20L8.667 20C6.089 20 4 17.911 4 15.333ZM15.333 7.333C15.322 7.817 15.574 8.268 15.991 8.513C16.408 8.758 16.924 8.758 17.341 8.513C17.758 8.269 18.01 7.817 17.999 7.334C17.983 6.609 17.391 6.03 16.667 6.03C15.942 6.03 15.35 6.609 15.333 7.333ZM8.667 12C8.667 13.841 10.16 15.334 12.001 15.333C13.842 15.333 15.334 13.84 15.334 11.999C15.334 10.158 13.841 8.666 12 8.666C10.159 8.666 8.666 10.159 8.667 12Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 fill-white"
      {...props}
    >
      <path d="M23 12C23 12 23 15.487 22.54 17.158C22.285 18.082 21.544 18.804 20.595 19.052C18.88 19.5 12 19.5 12 19.5C12 19.5 5.12 19.5 3.405 19.052C2.456 18.803 1.715 18.082 1.46 17.158C1 15.487 1 12 1 12C1 12 1 8.513 1.46 6.842C1.715 5.918 2.456 5.197 3.405 4.948C5.12 4.5 12 4.5 12 4.5C12 4.5 18.88 4.5 20.595 4.948C21.544 5.197 22.285 5.918 22.54 6.842C22.998 8.513 23 12 23 12ZM9.798 14.359C9.798 14.742 10.21 14.983 10.543 14.795L14.738 12.436C15.078 12.245 15.078 11.756 14.738 11.564L10.543 9.205C10.21 9.018 9.798 9.259 9.798 9.641Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 fill-white"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export function OrbIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-10"
      {...props}
    >
      <circle cx="20" cy="20" r="12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="4" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

/* Brand-mark used in footer (and similar shapes appear in the ticker) */
export function LogoMark(props: IconProps) {
  return (
    <svg
      viewBox="0 0 34 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[34px] h-7"
      {...props}
    >
      <path
        d="M17 7L17 0L34 7L34 21L17 28L17 21L0 28L0 21L17 14L0 7L0 0ZM17 7L17 21L34 14Z"
        fill="#fff"
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

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5 fill-white"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.413z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 fill-current"
      {...props}
    >
      <path d="M8 1.2l1.94 4.36 4.76.45-3.6 3.16 1.06 4.66L8 11.4l-4.16 2.43 1.06-4.66L1.3 6.01l4.76-.45z" />
    </svg>
  );
}

/* Brand wordmark for nav: simple 'B' tile */
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
        <linearGradient id="bmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a8cff" />
          <stop offset="100%" stopColor="#4e78ff" />
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="10" fill="url(#bmGrad)" />
      <path
        d="M13 11h7.5c2.485 0 4.5 1.79 4.5 4 0 1.49-.94 2.79-2.32 3.46C24.36 19 25.5 20.46 25.5 22.2c0 2.65-2.31 4.8-5.16 4.8H13V11Zm3 6.4h4c1.1 0 2-.81 2-1.8s-.9-1.8-2-1.8h-4v3.6Zm0 6.6h4.2c1.27 0 2.3-.94 2.3-2.1 0-1.16-1.03-2.1-2.3-2.1H16V24Z"
        fill="#fff"
      />
    </svg>
  );
}

/* ----------- Service icons (line, currentColor) ----------- */

export function WebAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
      <rect x="3" y="4.5" width="18" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="6.75" r=".7" fill="currentColor" />
      <circle cx="8.4" cy="6.75" r=".7" fill="currentColor" />
    </svg>
  );
}

export function SaasIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
      <ellipse cx="12" cy="6" rx="8" ry="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6v6c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7V6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12v6c0 1.5 3.6 2.7 8 2.7s8-1.2 8-2.7v-6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function MobileIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function AiCallIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      {...props}
    >
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


/* Acme Corp ticker icon (same diamond/cross-like shape as LogoMark, square 26) */
export function AcmeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[26px] shrink-0"
      {...props}
    >
      <path
        d="M13 6.5L13 0L26 6.5L26 19.5L13 26L13 19.5L0 26L0 19.5L13 13L0 6.5L0 0ZM13 6.5L13 19.5L26 13Z"
        fill="#fff"
      />
    </svg>
  );
}

/* APEX ticker icon (organic blob) */
export function ApexIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 shrink-0"
      {...props}
    >
      <path
        d="M12 20.849C2.924 28.433-4.433 21.076 3.151 12C-4.433 2.924 2.924-4.433 12 3.151C21.075-4.433 28.433 2.924 20.849 12C28.433 21.069 21.075 28.433 12 20.849Z"
        fill="#fff"
      />
    </svg>
  );
}

/* Quantum ticker icon (chain-link) */
export function QuantumIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[26px] shrink-0"
      {...props}
    >
      <path
        d="M13 26C12.142 26 11.352 25.786 10.63 25.357C9.931 24.951 9.366 24.398 8.938 23.698C8.531 22.976 8.328 22.186 8.328 21.328C8.328 20.245 8.576 19.342 9.073 18.62C9.57 17.898 10.337 17.051 11.375 16.081C12.142 15.381 12.526 14.715 12.526 14.083L12.526 13.474L11.917 13.474C11.217 13.474 10.258 14.174 9.039 15.573C7.843 16.972 6.387 17.672 4.672 17.672C3.814 17.672 3.024 17.469 2.302 17.063C1.602 16.634 1.038 16.069 0.609 15.37C0.203 14.648 0 13.858 0 13C0 12.142 0.203 11.364 0.609 10.664C1.038 9.942 1.602 9.378 2.302 8.971C3.024 8.542 3.814 8.328 4.672 8.328C6.365 8.328 7.809 9.017 9.005 10.393C10.201 11.77 11.172 12.458 11.917 12.458L12.526 12.458L12.526 11.917C12.526 11.285 12.142 10.619 11.375 9.919L10.596 9.208C10.032 8.689 9.513 8.069 9.039 7.346C8.565 6.602 8.328 5.71 8.328 4.672C8.328 3.814 8.531 3.036 8.938 2.336C9.366 1.614 9.931 1.049 10.63 0.643C11.353 0.214 12.143 0 13 0C13.858 0 14.636 0.214 15.336 0.643C16.058 1.072 16.622 1.636 17.029 2.336C17.457 3.036 17.672 3.814 17.672 4.672C17.672 6.365 16.983 7.809 15.607 9.005C14.23 10.201 13.542 11.172 13.542 11.917L13.542 12.458L14.083 12.458C14.851 12.458 15.821 11.77 16.995 10.393C18.146 9.017 19.59 8.328 21.328 8.328C22.186 8.328 22.964 8.543 23.664 8.971C24.386 9.378 24.951 9.931 25.357 10.63C25.786 11.33 26 12.12 26 13C26 13.858 25.786 14.648 25.357 15.37C24.951 16.069 24.386 16.634 23.664 17.063C22.964 17.469 22.186 17.672 21.328 17.672C20.267 17.672 19.353 17.412 18.586 16.893C17.841 16.374 17.006 15.618 16.081 14.625C15.381 13.858 14.715 13.474 14.083 13.474L13.542 13.474L13.542 14.083C13.542 14.918 14.23 15.889 15.607 16.995C16.983 18.101 17.672 19.545 17.672 21.328C17.672 22.186 17.457 22.976 17.029 23.698C16.622 24.398 16.069 24.951 15.37 25.357C14.67 25.786 13.88 26 13 26Z"
        fill="#fff"
      />
    </svg>
  );
}

/* Celestial ticker icon (sunburst) */
export function CelestialIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6 shrink-0"
      {...props}
    >
      <path
        d="M12 12C12 12 13.5 7.983 13.5 5.143C13.5 2.302 12.828 0 12 0C11.172 0 10.5 2.303 10.5 5.143C10.5 7.983 12 12 12 12ZM12 12C12 12 13.78 15.901 15.788 17.909C17.796 19.918 19.899 21.071 20.485 20.485C21.071 19.899 19.918 17.796 17.909 15.788C15.901 13.78 12 12 12 12ZM12 12C12 12 16.017 10.5 18.857 10.5C21.697 10.5 24 11.172 24 12C24 12.828 21.697 13.5 18.857 13.5C16.017 13.5 12 12 12 12ZM12 12C12 12 8.099 13.78 6.091 15.788C4.082 17.796 2.929 19.899 3.515 20.485C4.101 21.071 6.204 19.918 8.212 17.909C10.22 15.901 12 12 12 12ZM12 12C12.003 12.009 13.5 16.02 13.5 18.857C13.5 21.697 12.828 24 12 24C11.172 24 10.5 21.697 10.5 18.857C10.5 16.017 12 12 12 12ZM12 12C12 12 7.983 10.5 5.143 10.5C2.302 10.5 0 11.172 0 12C0 12.828 2.303 13.5 5.143 13.5C7.983 13.5 12 12 12 12ZM12 12C12 12 15.901 10.22 17.909 8.212C19.918 6.204 21.071 4.101 20.485 3.515C19.899 2.929 17.796 4.082 15.788 6.091C13.78 8.099 12 12 12 12ZM8.212 6.091C10.22 8.099 12 12 12 12C12 12 8.099 10.22 6.091 8.212C4.082 6.204 2.929 4.1 3.515 3.515C4.101 2.929 6.204 4.082 8.212 6.091Z"
        fill="#fff"
      />
    </svg>
  );
}

/* Echo Valley ticker icon (4-point sparkle) */
export function EchoValleyIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      className="size-[22px] shrink-0"
      {...props}
    >
      <path
        d="M11.043 10.104C10.587 4.448 5.852 0 0.079 0C0.079 5.747 4.485 10.464 10.104 10.957C4.448 11.413 0 16.148 0 21.921C5.747 21.921 10.464 17.515 10.957 11.896C11.413 17.552 16.148 22 21.921 22C21.921 16.253 17.515 11.536 11.896 11.043C17.552 10.587 22 5.852 22 0.079C16.253 0.079 11.536 4.485 11.043 10.104ZM11 11L11 11L11 11L11 11L11 11Z"
        fill="#fff"
      />
    </svg>
  );
}
