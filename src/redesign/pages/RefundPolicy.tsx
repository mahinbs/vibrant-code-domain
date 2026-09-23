import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import {
  LegalH2,
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
      description="Refund policy for unused AI Growth Credits. Ad spend on Meta, Google, and other platforms is never refunded."
      eyebrow="Legal"
      heading={
        <>
          Refund <span className="impact-highlight">policy</span>
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
        This page is the refund policy for prepaid AI Growth Credits and related Service fees
        (plans, setup, implementation, and access). It is part of our{" "}
        <Link to="/terms-and-conditions" className="impact-highlight underline-offset-2 hover:underline">
          Terms and conditions
        </Link>
        . Ad spend on Meta, Google, and other platforms is your money paid to those platforms. We
        do not collect or refund that spend. The{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>{" "}
        SLA (acknowledge in 2 business days, resolve within 14 business working days) is separate
        from refunds.
      </LegalP>

      <LegalH2>Eligibility and review</LegalH2>
      <LegalP>
        At {BRAND.legalName}, we want our customers to feel confident when purchasing our services.
        Accordingly, eligible customers may request a refund subject to the terms, conditions, and
        assessment process outlined below.
      </LegalP>
      <LegalP>
        A refund may be considered where the customer can demonstrate that the agreed service or
        deliverables have not been provided substantially in accordance with the scope,
        requirements, or commitments agreed upon at the time of purchase.
      </LegalP>
      <LegalP>
        Refund requests must be submitted within the applicable refund period and must include
        sufficient details regarding the reason for the request. Upon receiving a request,
        {BRAND.legalName} may review the relevant account, communications, project status, deliverables,
        work completed, and other circumstances necessary to determine whether the request
        satisfies the requirements of this policy.
      </LegalP>
      <LegalP>
        Where a customer has already received, accessed, approved, or substantially benefited from
        part of the service, any refund granted may be adjusted to reflect the portion of the
        service already delivered, work performed, resources committed, or costs incurred on the
        customer&apos;s behalf.
      </LegalP>
      <LegalP>
        Refunds are therefore subject to eligibility and review and are not automatically issued
        solely because a request has been submitted. Approval will depend on the specific
        circumstances of each request and the extent to which the applicable refund conditions have
        been satisfied.
      </LegalP>
      <LegalP>
        Refund eligibility may also be affected where delays, incomplete results, or other issues
        arise from the customer&apos;s failure to provide required information, access, approvals,
        materials, cooperation, or timely responses.
      </LegalP>
      <LegalP>
        For services involving third-party platforms, advertising budgets, external services,
        platform fees, transaction fees, or other costs incurred specifically for the customer,
        such amounts may be taken into consideration when determining the applicable refund amount.
      </LegalP>
      <LegalP>
        If a refund is approved, {BRAND.legalName} will confirm the approved amount and applicable
        refund method with the customer. Depending on the circumstances, the approved refund may
        represent the full amount paid or an appropriate portion of the payment.
      </LegalP>
      <LegalP>
        This policy does not affect any mandatory rights or protections that may apply to customers
        under applicable consumer protection laws.
      </LegalP>
      <LegalP>
        By purchasing a service from {BRAND.legalName}, the customer acknowledges and agrees that
        refunds are available subject to the eligibility requirements and review process described
        in this policy.
      </LegalP>

      <LegalH2>Default rule</LegalH2>
      <LegalP>
        <strong className="text-white">Fees are non-refundable except for unused AI Growth Credits as set out below.</strong>
      </LegalP>
      <LegalP>
        A refund of unused credits (or the unused portion we reasonably determine) is available{" "}
        <strong className="text-white">only if we do not provide the Service you paid for.</strong>
        Ad spend is never refunded.
      </LegalP>

      <LegalH2>What &quot;we do not provide the Service&quot; means</LegalH2>
      <LegalP>
        We will refund the Service fee (or the unused portion we reasonably determine){" "}
        <strong className="text-white">only</strong> where all of the following are true:
      </LegalP>
      <LegalOl
        items={[
          "You paid us for prepaid AI Growth Credits or a defined Service (plan, setup, or implementation).",
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
        Eligible customers may request a refund of unused AI Growth Credits where the agreed Service has not been
        provided substantially in accordance with the scope agreed at purchase. Requests are reviewed and
        are not issued automatically. Where part of the Service has already been delivered, any
        refund granted may be adjusted for work performed, resources committed, or third-party
        costs incurred on the customer&apos;s behalf. Unsatisfactory advertising performance, lead
        volume, or return on ad spend is not grounds for a refund. Advertising spend paid to
        third-party platforms is never refunded by {BRAND.legalName}.
      </LegalP>
      <LegalP>
        Complaints that are not refund requests should go to our{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        .
      </LegalP>
    </LegalPageShell>
  );
}
