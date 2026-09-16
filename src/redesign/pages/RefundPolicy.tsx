import { Link } from "react-router-dom";
import {
  LegalH2,
  LegalH3,
  LegalOl,
  LegalP,
  LegalPageShell,
  LegalUl,
} from "../components/LegalPageShell";
import { whatsappHref } from "../data/site";

export default function RefundPolicy() {
  return (
    <LegalPageShell
      title="Refund Policy | Boostmysites"
      description="BOOSTMYSITES refund policy. Service fees are refundable only if we do not provide the Service you paid for. Ad spend is never refunded."
      eyebrow="Legal"
      heading={
        <>
          Refund <span className="impact-highlight">policy</span>
        </>
      }
    >
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/45">
        Effective date: 16 September 2026
      </p>
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
        This page is the refund policy for BOOSTMYSITES Service fees (plans, setup,
        implementation, and access). It is part of our{" "}
        <Link to="/terms-and-conditions" className="impact-highlight underline-offset-2 hover:underline">
          Terms and conditions
        </Link>
        . Ad spend on Meta, Google, and other platforms is your money paid to those platforms. We
        do not collect or refund that spend.
      </LegalP>

      <LegalH2>Default rule</LegalH2>
      <LegalP>
        <strong className="text-white">Fees are non-refundable.</strong>
      </LegalP>
      <LegalP>
        A refund is available <strong className="text-white">only if we do not provide the Service you paid for.</strong>
      </LegalP>

      <LegalH2>What &quot;we do not provide the Service&quot; means</LegalH2>
      <LegalP>
        We will refund the Service fee (or the unused portion we reasonably determine){" "}
        <strong className="text-white">only</strong> where all of the following are true:
      </LegalP>
      <LegalOl
        items={[
          "You paid us for a defined Service (plan, setup, or implementation).",
          <>
            After payment, <strong className="text-white">we failed to make that Service available</strong>. For
            example we did not grant account access, did not commence agreed implementation, or did
            not deliver the contracted setup, <strong className="text-white">and</strong> that failure was our fault.
          </>,
          "You were ready and able to receive the Service (logins, Companion, information, and approvals provided when reasonably requested).",
          <>
            You wrote to us (
            <a className="impact-highlight underline-offset-2 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp +91 96329 53355
            </a>{" "}
            or the email we used on your invoice) within <strong className="text-white">14 days</strong> of the
            failure, with your payment reference and a short description of what was not provided.
          </>,
        ]}
      />
      <LegalP>If we later provide the Service, any refund obligation ends.</LegalP>

      <LegalH2>What is not a refund</LegalH2>
      <LegalP>
        No refund (full or partial) for any of the following. These are{" "}
        <strong className="text-white">not</strong> &quot;we did not provide the Service&quot;:
      </LegalP>
      <LegalUl
        items={[
          "change of mind, unused access, or \"I didn't have time\";",
          "you expected more leads, cheaper leads, or a specific revenue result;",
          "ad platforms rejected, restricted, or paused ads, pages, pixels, or accounts;",
          "you did not install Companion, did not sign in, did not approve a campaign, or did not fund the ad account;",
          "creative, targeting, or offer performance you dislike;",
          "taxes, FX, bank fees, or Stripe/processor fees we cannot recover;",
          <>
            <strong className="text-white">ad spend, boosts, or media cost</strong> on any platform. That is paid to
            the platform, not to us;
          </>,
          "third-party tools (Meta, Google, WhatsApp, CRM, email providers) being down or changing their APIs;",
          "your staff leftover work after we handed over a working setup;",
          "monthly fees for a period in which the Service was available to you, even if you did not log in;",
          "annual fees after access or implementation has started.",
        ]}
      />

      <LegalH2>How a valid refund is paid</LegalH2>
      <LegalP>
        If we agree that we did not provide the Service, we refund to the original payment method
        where the processor allows it, within a reasonable time after we confirm. We may deduct
        non-recoverable processor fees if the law allows.
      </LegalP>
      <LegalP>
        Our written determination of whether the Service was provided is final, except as a court
        of competent jurisdiction requires otherwise.
      </LegalP>
      <LegalP>
        Chargebacks, payment disputes, or reversed payments while the Service was provided are a
        breach of the Terms. We may suspend the account and recover our costs.
      </LegalP>

      <LegalH2>Summary</LegalH2>
      <LegalP>
        This paragraph is a convenience summary only and does not replace the refund rules above.
        Service fees are refundable solely where BOOSTMYSITES fails to provide the Service
        purchased. Once access has been granted or implementation has commenced, no refund is due.
        Unsatisfactory advertising performance, lead volume, or return on ad spend is not grounds
        for a refund. Advertising spend paid to third-party platforms is never refunded by
        BOOSTMYSITES.
      </LegalP>
    </LegalPageShell>
  );
}
