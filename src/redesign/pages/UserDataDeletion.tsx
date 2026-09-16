import { Link } from "react-router-dom";
import {
  LegalH2,
  LegalOl,
  LegalP,
  LegalPageShell,
  LegalUl,
} from "../components/LegalPageShell";
import { whatsappHref } from "../data/site";

const DELETION_EMAIL = "boostmysitescom@gmail.com";

const deletionMailto = `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent(
  "User data deletion request",
)}&body=${encodeURIComponent(
  "Please delete my personal data held by BOOSTMYSITES.\n\nFull name:\nEmail used with your app or website:\nFacebook or Meta user ID (if known):\nAny other details:\n",
)}`;

export default function UserDataDeletion() {
  return (
    <LegalPageShell
      title="User Data Deletion | Boostmysites"
      description="How to request deletion of your BOOSTMYSITES and Meta Platform Data. Email boostmysitescom@gmail.com."
      eyebrow="Legal"
      heading={
        <>
          User data <span className="impact-highlight">deletion</span>
        </>
      }
    >
      <LegalP>
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href="https://www.boostmysites.in">
          https://www.boostmysites.in
        </a>
        <br />
        Contact:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp +91 96329 53355
        </a>{" "}
        · www.boostmysites.in
      </LegalP>
      <LegalP>
        This page tells you how to ask BOOSTMYSITES to delete personal data we hold about you,
        including data received from Meta, Facebook, Instagram, or WhatsApp when you use our apps
        or connect those accounts. It is the data deletion instructions URL for our Meta apps.
      </LegalP>
      <LegalP>
        Related:{" "}
        <Link to="/privacy-policy" className="impact-highlight underline-offset-2 hover:underline">
          Privacy policy
        </Link>
        .
      </LegalP>

      <LegalH2>How to request deletion</LegalH2>
      <LegalP>
        Send an email to{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={deletionMailto}>
          {DELETION_EMAIL}
        </a>
        . That is the primary way to request deletion.
      </LegalP>
      <LegalP>Include all of the following so we can identify your records:</LegalP>
      <LegalOl
        items={[
          "the subject line \"User data deletion request\";",
          "your full name;",
          "the email address you used with BOOSTMYSITES, our website, or the Meta app;",
          "your Facebook or Meta user ID, if you know it;",
          "a short description of the data or account you want deleted.",
        ]}
      />
      <LegalP>
        You can start that email with this link:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={deletionMailto}>
          Request deletion by email
        </a>
        .
      </LegalP>

      <LegalH2>What we delete</LegalH2>
      <LegalP>
        After we confirm your identity, we delete personal data we hold about you, including:
      </LegalP>
      <LegalUl
        items={[
          "account, contact, and onboarding details you gave us;",
          "Platform Data received from Meta products (for example Facebook, Instagram, or WhatsApp identifiers and related connection data);",
          "campaign setup records, messages, and files stored in our systems for your account;",
          "copies we made of that information in backups, as those backups rotate out.",
        ]}
      />
      <LegalP>
        Advertising spend paid to Meta, Google, or other platforms is paid to those platforms, not
        stored as a refundable balance with us. You must request deletion of data held only by those
        platforms from those platforms.
      </LegalP>

      <LegalH2>What happens next</LegalH2>
      <LegalOl
        items={[
          "We reply to the email address you used to confirm we received the request.",
          "We may ask for extra details if we cannot match your request to an account.",
          "We delete the data described above, or tell you if a legal duty requires us to keep a limited record.",
          "We send a written confirmation when the deletion is complete.",
        ]}
      />
      <LegalP>
        We aim to complete requests within 30 days of receiving a complete email. If more time is
        required, we will say so in writing.
      </LegalP>

      <LegalH2>What we may keep</LegalH2>
      <LegalP>We may retain a limited record where the law requires it, for example:</LegalP>
      <LegalUl
        items={[
          "invoices, tax, or accounting records;",
          "records needed to resolve a dispute, chargeback, or legal claim;",
          "proof that we completed your deletion request.",
        ]}
      />
      <LegalP>
        If you connected a Meta account, removing our app in Facebook Settings (Settings and
        privacy, then Settings, then Apps and websites) stops future access. You should still email{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={deletionMailto}>
          {DELETION_EMAIL}
        </a>{" "}
        so we can delete data already stored on our side.
      </LegalP>
    </LegalPageShell>
  );
}
