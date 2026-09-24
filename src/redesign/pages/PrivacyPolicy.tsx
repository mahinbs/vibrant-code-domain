import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import {
  LegalH2,
  LegalH3,
  LegalP,
  LegalPageShell,
  LegalUl,
} from "../components/LegalPageShell";
import { whatsappHref } from "../data/site";
import { PRIVACY_REQUEST_EMAIL } from "../lib/contactConsent";

const privacyMailto = `mailto:${PRIVACY_REQUEST_EMAIL}?subject=${encodeURIComponent("Privacy request")}`;

export default function PrivacyPolicy() {
  return (
    <LegalPageShell
      title="Privacy Policy | Boostmysites"
      description="Privacy policy for Triple-Seven BoostMySites AI Solutions Private Limited under the Digital Personal Data Protection Act, 2023, including WhatsApp and AI calling."
      eyebrow="Legal"
      heading={
        <>
          Privacy <span className="impact-highlight">policy</span>
        </>
      }
    >
      <LegalP>
        {BRAND.legalName} (&quot;we&quot;, &quot;us&quot;)
        <br />
        Product: Boostmysites
        <br />
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={BRAND.siteUrl}>
          {BRAND.siteUrl}
        </a>
        <br />
        Registered office: {BRAND.registeredAddressLine}
        <br />
        Contact:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp {BRAND.phone}
        </a>
      </LegalP>
      <LegalP>
        This is the privacy policy for {BRAND.legalName}. It explains how we
        collect, use, share, and protect personal information when you visit www.boostmysites.in,
        buy or use prepaid AI Growth Credits, use Boostmysites software, the Companion app, the
        Operator dashboard, related websites, implementation or support, or connect a Meta product
        (Facebook, Instagram, or WhatsApp) to our apps.
      </LegalP>
      <LegalP>
        By using the Service, you agree to this policy. If you do not agree, do not use the
        Service. How to request deletion is also on our{" "}
        <Link to="/user-data-deletion" className="impact-highlight underline-offset-2 hover:underline">
          User data deletion
        </Link>{" "}
        page.
      </LegalP>

      <LegalH2>1. Law and roles</LegalH2>
      <LegalP>
        {BRAND.legalName} is the Data Fiduciary for personal data collected on www.boostmysites.in
        and on related forms, under the Digital Personal Data Protection Act, 2023.
      </LegalP>
      <LegalP>
        Our Grievance Officer for complaints, including data complaints, is Mahin BS, Chairman.
        Details and the 14 business working day SLA are on{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          /legal/contact
        </Link>
        .
      </LegalP>
      <LegalP>
        Privacy and data requests that are not complaints:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={privacyMailto}>
          {PRIVACY_REQUEST_EMAIL}
        </a>
        .
      </LegalP>

      <LegalH2>2. Information we collect</LegalH2>
      <LegalH3>Information you give us</LegalH3>
      <LegalP>You may give us:</LegalP>
      <LegalUl
        items={[
          "name, email address, phone or WhatsApp number, and company details;",
          "project, offer, website, budget, and other facts needed to provide the Service;",
          "account logins you connect (we do not ask for your Meta, Google, or WhatsApp passwords);",
          "messages, files, and other content you send to us;",
          "consent you tick on a form (WhatsApp contact and voice / AI-assisted calls), with the time of submit;",
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

      <LegalH2>3. WhatsApp data</LegalH2>
      <LegalP>When you give us a WhatsApp number, or connect a WhatsApp Business account, we may process:</LegalP>
      <LegalUl
        items={[
          "the number you type on a form;",
          "messages we send or receive for sales, onboarding, support, or the Service;",
          "delivery or read status if the messaging API provides it;",
          "WhatsApp Platform Data if you connect a Business account.",
        ]}
      />
      <LegalP>
        We use this to contact you about the enquiry you submitted, to run automations you
        authorised, and to support the Service. We do not sell this data.
      </LegalP>

      <LegalH2>4. Voice calls and AI calling</LegalH2>
      <LegalP>
        We may call the number you give, including human or AI-assisted calls, about that enquiry
        or the Service. For those contact calls we process the number and the time of the call.
        We do not treat ordinary sales or enquiry calls as recorded or transcribed unless you are
        told at the start of the call, where the law requires that notice.
      </LegalP>
      <LegalP>
        If you use AI calling as part of the Service (for example to call your own leads), those
        calls may be transcribed so the Service can qualify the conversation, follow up, and write
        notes. We keep those transcripts only as long as needed for that Service and as the law
        requires. You can ask us to stop new transcripts by emailing {PRIVACY_REQUEST_EMAIL} or by
        turning AI calling off in the Service.
      </LegalP>

      <LegalH2>5. Consent and opt-out</LegalH2>
      <LegalP>
        Public forms that collect a phone or WhatsApp number ask you to tick two boxes before
        submit: WhatsApp messages, and voice or AI-assisted calls. We capture those ticks at
        submit.
      </LegalP>
      <LegalUl
        items={[
          "WhatsApp: reply STOP on the thread, or email " + PRIVACY_REQUEST_EMAIL + " if that fails.",
          "Voice or AI sales calls: email " +
            PRIVACY_REQUEST_EMAIL +
            " with the number, or say so on the call. We will not use that number for further marketing or AI sales calls.",
        ]}
      />
      <LegalP>
        Transactional or service messages already in progress may still send where the law allows.
        If you use AI calling in the Service, new transcripts stop when you turn that feature off
        or ask us to stop, subject to records we must keep.
      </LegalP>

      <LegalH2>6. How we use information</LegalH2>
      <LegalP>We use personal information to:</LegalP>
      <LegalUl
        items={[
          "provide, set up, and support the Service, including when you buy or use prepaid AI Growth Credits;",
          "respond to enquiries and service requests;",
          "process payments for Service fees;",
          "operate connected advertising, WhatsApp, email, voice, or CRM automations you authorised;",
          "improve the website and Service, including analytics;",
          "send service messages, and marketing only where you have agreed or the law allows;",
          "comply with law, prevent fraud, and protect our rights and users.",
        ]}
      />

      <LegalH2>7. How we share information</LegalH2>
      <LegalP>We do not sell your personal information. We may share it with:</LegalP>
      <LegalUl
        items={[
          "service providers who host, process payments, send email, provide analytics, send WhatsApp Business or Cloud API messages, or place or transcribe voice calls, acting on our instructions;",
          "Meta, Google, WhatsApp, and similar platforms when you connect those accounts or when needed to deliver the Service you requested;",
          "professional advisers, or authorities, where required by law or to protect rights, safety, or the Service.",
        ]}
      />
      <LegalP>
        Those parties process data under their own terms where you have a direct relationship with
        them (for example your own ad account).
      </LegalP>

      <LegalH2>8. Cookies and analytics</LegalH2>
      <LegalP>
        We use cookies and similar tools so the site works, to remember settings, and to understand
        how the site is used (including Google Analytics and similar tags). You can control cookies
        in your browser. Blocking some cookies may affect how the site works.
      </LegalP>

      <LegalH2>9. Data retention</LegalH2>
      <LegalP>
        We keep personal information only as long as needed for the purposes in this policy, or as
        law requires. Typical periods include contact and project records for the life of the
        engagement and a reasonable period after, analytics for a limited period, and marketing
        data until you unsubscribe. AI calling transcripts, where created, are kept for the
        Service and legal retention only.
      </LegalP>

      <LegalH2>10. Security</LegalH2>
      <LegalP>
        We use reasonable technical and organisational measures to protect personal information,
        including HTTPS, access controls, and limited staff access. No method of transmission or
        storage is completely secure.
      </LegalP>

      <LegalH2>11. Your rights</LegalH2>
      <LegalP>
        Under the Digital Personal Data Protection Act, 2023, and other applicable law, you may
        ask to access, correct, delete, or restrict personal information, withdraw consent, or
        request a copy of data you provided.
      </LegalP>
      <LegalP>
        To exercise these rights, email{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={privacyMailto}>
          {PRIVACY_REQUEST_EMAIL}
        </a>
        . To request deletion, follow the steps on{" "}
        <Link to="/user-data-deletion" className="impact-highlight underline-offset-2 hover:underline">
          User data deletion
        </Link>
        . We will respond within a reasonable time, and within 30 days where required.
      </LegalP>

      <LegalH2>12. Children</LegalH2>
      <LegalP>
        The Service is not directed at children under 16. We do not knowingly collect personal
        information from children under 16. If you believe we have, email {PRIVACY_REQUEST_EMAIL} and we
        will delete it.
      </LegalP>

      <LegalH2>13. International transfers</LegalH2>
      <LegalP>
        We may process information in India and in other countries where our providers operate.
        Those countries may have different data-protection laws. We take reasonable steps to
        protect information when it is transferred.
      </LegalP>

      <LegalH2>14. Changes</LegalH2>
      <LegalP>
        We may update this privacy policy. The version on this page (or the version we publish at
        www.boostmysites.in) applies when posted. Continued use of the Service after a change is
        acceptance of the updated policy for future use.
      </LegalP>

      <LegalH2>15. Complaints</LegalH2>
      <LegalP>
        Complaints about this website, AI Growth Credits, a payment, or how we handle your data
        should go to our Grievance Officer:
      </LegalP>
      <LegalP>
        Mahin BS, Chairman
        <br />
        Email:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={`mailto:${BRAND.email}`}>
          {BRAND.email}
        </a>
        <br />
        Phone:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
          {BRAND.phone}
        </a>
        <br />
        Full details, including the 14 business working day SLA:{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        .
      </LegalP>

      <LegalH2>16. Contact</LegalH2>
      <LegalP>
        Privacy and data requests:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={privacyMailto}>
          {PRIVACY_REQUEST_EMAIL}
        </a>
        <br />
        WhatsApp:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
          +91 96329 53355
        </a>
        <br />
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href="https://www.boostmysites.in">
          https://www.boostmysites.in
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
        {" · "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        .
      </LegalP>
    </LegalPageShell>
  );
}
