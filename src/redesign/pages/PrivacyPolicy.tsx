import { Link } from "react-router-dom";
import {
  LegalH2,
  LegalH3,
  LegalP,
  LegalPageShell,
  LegalUl,
} from "../components/LegalPageShell";
import { whatsappHref } from "../data/site";

const PRIVACY_EMAIL = "boostmysitescom@gmail.com";
const privacyMailto = `mailto:${PRIVACY_EMAIL}?subject=${encodeURIComponent("Privacy request")}`;

export default function PrivacyPolicy() {
  return (
    <LegalPageShell
      title="Privacy Policy | Boostmysites"
      description="BOOSTMYSITES privacy policy. How we collect, use, share, and delete personal data, including Meta Platform Data."
      eyebrow="Legal"
      heading={
        <>
          Privacy <span className="impact-highlight">policy</span>
        </>
      }
    >
      <LegalP>
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href="https://www.boostmysites.com">
          https://www.boostmysites.com
        </a>
        <br />
        Contact:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp +91 96329 53355
        </a>{" "}
        · www.boostmysites.com
      </LegalP>
      <LegalP>
        This is the privacy policy for BOOSTMYSITES (&quot;we&quot;, &quot;us&quot;). It explains how we
        collect, use, share, and protect personal information when you visit www.boostmysites.com,
        use our software, Companion app, Operator dashboard, websites, implementation or support,
        or connect a Meta product (Facebook, Instagram, or WhatsApp) to our apps.
      </LegalP>
      <LegalP>
        By using the Service, you agree to this policy. If you do not agree, do not use the
        Service. How to request deletion is also on our{" "}
        <Link to="/user-data-deletion" className="impact-highlight underline-offset-2 hover:underline">
          User data deletion
        </Link>{" "}
        page.
      </LegalP>

      <LegalH2>1. Information we collect</LegalH2>
      <LegalH3>Information you give us</LegalH3>
      <LegalP>You may give us:</LegalP>
      <LegalUl
        items={[
          "name, email address, phone number, and company details;",
          "project, offer, website, budget, and other facts needed to provide the Service;",
          "account logins you connect (we do not ask for your Meta, Google, or WhatsApp passwords);",
          "messages, files, and other content you send to us;",
          "payment and billing details needed to process Service fees (processed by our payment providers).",
        ]}
      />
      <LegalH3>Information collected automatically</LegalH3>
      <LegalP>When you visit our website or use the Service, we may collect:</LegalP>
      <LegalUl
        items={[
          "IP address, approximate location, browser, device, and operating system;",
          "pages viewed, referring URL, and usage of the Service;",
          "cookies and similar technologies used for the site to function, remember preferences, and measure use.",
        ]}
      />
      <LegalH3>Information from Meta and other platforms</LegalH3>
      <LegalP>
        If you connect Facebook, Instagram, WhatsApp, Google, or similar products, we may receive
        Platform Data those products share with our app, such as identifiers, page or ad-account
        connection details, and other data needed to provide the features you authorised. That data
        is used only to provide and operate the Service, and to comply with those platforms&apos;
        terms.
      </LegalP>

      <LegalH2>2. How we use information</LegalH2>
      <LegalP>We use personal information to:</LegalP>
      <LegalUl
        items={[
          "provide, set up, and support the Service;",
          "respond to enquiries and service requests;",
          "process payments for Service fees;",
          "operate connected advertising, WhatsApp, email, or CRM automations you authorised;",
          "improve the website and Service, including analytics;",
          "send service messages, and marketing only where you have agreed or the law allows;",
          "comply with law, prevent fraud, and protect our rights and users.",
        ]}
      />

      <LegalH2>3. How we share information</LegalH2>
      <LegalP>We do not sell your personal information. We may share it with:</LegalP>
      <LegalUl
        items={[
          "service providers who host, process payments, send email, provide analytics, or otherwise help us run the Service;",
          "Meta, Google, WhatsApp, and similar platforms when you connect those accounts or when needed to deliver the Service you requested;",
          "professional advisers, or authorities, where required by law or to protect rights, safety, or the Service.",
        ]}
      />
      <LegalP>
        Those parties process data under their own terms where you have a direct relationship with
        them (for example your own ad account).
      </LegalP>

      <LegalH2>4. Cookies and analytics</LegalH2>
      <LegalP>
        We use cookies and similar tools so the site works, to remember settings, and to understand
        how the site is used (including Google Analytics and similar tags). You can control cookies
        in your browser. Blocking some cookies may affect how the site works.
      </LegalP>

      <LegalH2>5. Data retention</LegalH2>
      <LegalP>
        We keep personal information only as long as needed for the purposes in this policy, or as
        law requires. Typical periods include contact and project records for the life of the
        engagement and a reasonable period after, analytics for a limited period, and marketing
        data until you unsubscribe.
      </LegalP>

      <LegalH2>6. Security</LegalH2>
      <LegalP>
        We use reasonable technical and organisational measures to protect personal information,
        including HTTPS, access controls, and limited staff access. No method of transmission or
        storage is completely secure.
      </LegalP>

      <LegalH2>7. Your rights</LegalH2>
      <LegalP>
        Depending on applicable law, you may ask to access, correct, delete, or restrict personal
        information, object to certain processing, withdraw consent, or request a copy of data you
        provided.
      </LegalP>
      <LegalP>
        To exercise these rights, email{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={privacyMailto}>
          {PRIVACY_EMAIL}
        </a>
        . To request deletion, follow the steps on{" "}
        <Link to="/user-data-deletion" className="impact-highlight underline-offset-2 hover:underline">
          User data deletion
        </Link>
        . We will respond within a reasonable time, and within 30 days where required.
      </LegalP>

      <LegalH2>8. Children</LegalH2>
      <LegalP>
        The Service is not directed at children under 16. We do not knowingly collect personal
        information from children under 16. If you believe we have, email {PRIVACY_EMAIL} and we
        will delete it.
      </LegalP>

      <LegalH2>9. International transfers</LegalH2>
      <LegalP>
        We may process information in India and in other countries where our providers operate.
        Those countries may have different data-protection laws. We take reasonable steps to
        protect information when it is transferred.
      </LegalP>

      <LegalH2>10. Changes</LegalH2>
      <LegalP>
        We may update this privacy policy. The version on this page (or the version we publish at
        www.boostmysites.com) applies when posted. Continued use of the Service after a change is
        acceptance of the updated policy for future use.
      </LegalP>

      <LegalH2>11. Contact</LegalH2>
      <LegalP>
        Privacy and data requests:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={privacyMailto}>
          {PRIVACY_EMAIL}
        </a>
        <br />
        WhatsApp:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          +91 96329 53355
        </a>
        <br />
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href="https://www.boostmysites.com">
          https://www.boostmysites.com
        </a>
      </LegalP>
      <LegalP>
        Related:{" "}
        <Link to="/terms-and-conditions" className="impact-highlight underline-offset-2 hover:underline">
          Terms and conditions
        </Link>
        {" · "}
        <Link to="/user-data-deletion" className="impact-highlight underline-offset-2 hover:underline">
          User data deletion
        </Link>
        .
      </LegalP>
    </LegalPageShell>
  );
}
