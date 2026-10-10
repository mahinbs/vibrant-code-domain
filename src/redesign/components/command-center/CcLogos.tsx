import type { ReactNode } from "react";
import { FaApple, FaLinkedin, FaMeta, FaWhatsapp, FaWindows, FaChrome } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {
  SiBrevo,
  SiFacebook,
  SiGooglepay,
  SiGooglesearchconsole,
  SiHubspot,
  SiInstagram,
  SiMastercard,
  SiOpenai,
  SiPaytm,
  SiPhonepe,
  SiRazorpay,
  SiResend,
  SiSendgrid,
  SiStripe,
  SiTelegram,
  SiTwilio,
  SiVisa,
  SiWordpress,
  SiX,
  SiZapier,
} from "react-icons/si";
import type { LogoKey } from "../../data/commandCenterContent";

/** Official brand marks in their brand colours, with the name for screen readers. */
const LOGOS: Record<LogoKey, { name: string; icon: ReactNode }> = {
  meta: { name: "Meta", icon: <FaMeta color="#0866FF" /> },
  google: { name: "Google", icon: <FcGoogle /> },
  openai: { name: "ChatGPT Ads", icon: <SiOpenai color="#111" /> },
  linkedin: { name: "LinkedIn", icon: <FaLinkedin color="#0A66C2" /> },
  whatsapp: { name: "WhatsApp", icon: <FaWhatsapp color="#25D366" /> },
  instagram: { name: "Instagram", icon: <SiInstagram color="#E4405F" /> },
  facebook: { name: "Facebook", icon: <SiFacebook color="#0866FF" /> },
  x: { name: "X", icon: <SiX color="#111" /> },
  wordpress: { name: "WordPress", icon: <SiWordpress color="#21759B" /> },
  searchconsole: { name: "Google Search Console", icon: <SiGooglesearchconsole color="#458CF5" /> },
  hubspot: { name: "HubSpot", icon: <SiHubspot color="#FF7A59" /> },
  zapier: { name: "Zapier", icon: <SiZapier color="#FF4F00" /> },
  telegram: { name: "Telegram", icon: <SiTelegram color="#26A5E4" /> },
  twilio: { name: "Twilio", icon: <SiTwilio color="#F22F46" /> },
  sendgrid: { name: "SendGrid", icon: <SiSendgrid color="#1A82E2" /> },
  brevo: { name: "Brevo", icon: <SiBrevo color="#0B996E" /> },
  resend: { name: "Resend", icon: <SiResend color="#111" /> },
  gpay: { name: "Google Pay", icon: <SiGooglepay color="#3C4043" /> },
  phonepe: { name: "PhonePe", icon: <SiPhonepe color="#5F259F" /> },
  paytm: { name: "Paytm", icon: <SiPaytm color="#00BAF2" /> },
  razorpay: { name: "Razorpay", icon: <SiRazorpay color="#0C2451" /> },
  stripe: { name: "Stripe", icon: <SiStripe color="#635BFF" /> },
  visa: { name: "Visa", icon: <SiVisa color="#1A1F71" /> },
  mastercard: { name: "Mastercard", icon: <SiMastercard color="#EB001B" /> },
  apple: { name: "Mac", icon: <FaApple color="#111" /> },
  windows: { name: "Windows", icon: <FaWindows color="#0078D4" /> },
  chrome: { name: "Google Chrome", icon: <FaChrome color="#1A73E8" /> },
};

export function LogoChip({ logo, size = "md" }: { logo: LogoKey; size?: "sm" | "md" | "lg" }) {
  const l = LOGOS[logo];
  return (
    <span className={`cc-brandmark is-${size}`} title={l.name}>
      {l.icon}
      <span className="cc-sr">{l.name}</span>
    </span>
  );
}

export function LogoRow({
  logos,
  size,
  label,
  className,
}: {
  logos: LogoKey[];
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}) {
  return (
    <div className={`cc-logo-row${className ? ` ${className}` : ""}`} role="list" aria-label={label ?? "Works with"}>
      {logos.map((k) => (
        <span role="listitem" key={k}>
          <LogoChip logo={k} size={size} />
        </span>
      ))}
    </div>
  );
}
