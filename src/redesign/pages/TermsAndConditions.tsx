import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import {
  LegalH2,
  LegalH3,
  LegalOl,
  LegalP,
  LegalPageShell,
  LegalUl,
} from "../components/LegalPageShell";
import { whatsappHref } from "../data/site";

export default function TermsAndConditions() {
  return (
    <LegalPageShell
      title="Terms and Conditions | Boostmysites"
      description="Terms and conditions for prepaid AI Growth Credits from Triple-Seven BoostMySites AI Solutions Private Limited, including the refund policy."
      eyebrow="Legal"
      heading={
        <>
          Terms and <span className="impact-highlight">conditions</span>
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
        These Terms and Conditions (&quot;Terms&quot;) govern access to and use of Boostmysites
        software, prepaid AI Growth Credits, the Companion app, the Operator dashboard, related
        websites, and any implementation, onboarding, or support we provide (together, the
        &quot;Service&quot;).
      </LegalP>
      <LegalP>
        By paying a fee, loading credits, creating an account, signing a proposal, or using the
        Service, you agree to these Terms. If you do not agree, do not buy or use the Service.
      </LegalP>
      <LegalP>
        The refund rules in section 5 also appear on our{" "}
        <Link to="/refund-policy" className="impact-highlight underline-offset-2 hover:underline">
          Refund policy
        </Link>{" "}
        page. Our{" "}
        <Link to="/privacy-policy" className="impact-highlight underline-offset-2 hover:underline">
          Privacy policy
        </Link>{" "}
        explains how we collect and use personal data. Complaints go to our{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        .
      </LegalP>

      <LegalH2>1. Who we are and what you are buying</LegalH2>
      <LegalP>
        You buy <strong className="text-white">prepaid AI Growth Credits</strong> from {BRAND.legalName}.
        Credits are a stored value you load in advance. We draw them down for agreed work
        (campaign setup, monitoring, outreach, and related automation).
      </LegalP>
      <LegalP>
        Credits are not cash, not a security, and not a guarantee of leads, sales, or ROAS.
      </LegalP>
      <LegalP>
        Monthly and annual prices shown on this website are a way to load prepaid AI Growth Credits
        for that period. They are not a software-seat licence and not a guarantee of leads, sales,
        or ROAS.
      </LegalP>
      <LegalP>
        Ad spend on Meta, Google, and other platforms is{" "}
        <strong className="text-white">your money, paid to those platforms</strong>, under those platforms&apos; own
        terms. We do not collect or refund that spend.
      </LegalP>
      <LegalP>
        Unused credits follow the refund rules on our{" "}
        <Link to="/refund-policy" className="impact-highlight underline-offset-2 hover:underline">
          Refund policy
        </Link>
        .
      </LegalP>

      <LegalH2>2. Accounts and access</LegalH2>
      <LegalP>
        You must give accurate information and keep your login secure. You are responsible for all
        activity on your account.
      </LegalP>
      <LegalP>
        Access may be personal to your business. You may not resell, sublicense, or share the
        Service except as we agree in writing (for example an agency workspace we have enabled).
      </LegalP>
      <LegalP>
        We may suspend or close an account that is unpaid, abusive, unlawful, or that puts our
        systems or other clients at risk.
      </LegalP>

      <LegalH2>3. Your responsibilities</LegalH2>
      <LegalP>The Service only works if you do your part. You must, when asked:</LegalP>
      <LegalUl
        items={[
          "install and keep open the Boostmysites Companion on a suitable computer, where the Service requires it;",
          "sign in to your own ad, WhatsApp, email, CRM, and similar accounts (we do not take your passwords);",
          "provide a website, offer, market, budget, and other facts we need to configure the Service;",
          "approve campaigns, spend, and other actions we put in front of you;",
          <>
            keep payment methods valid on <strong className="text-white">your</strong> ad accounts;
          </>,
          "comply with Meta, Google, WhatsApp, and other platform policies.",
        ]}
      />
      <LegalP>
        If you delay, refuse, or fail to do the above,{" "}
        <strong className="text-white">we have still provided the Service</strong> to the extent it was available to
        you. That is not a ground for refund.
      </LegalP>
      <LegalP>
        Campaigns are staged <strong className="text-white">paused</strong>. Nothing spends on an ad platform until you
        (or a process you authorised) turn delivery on. You are responsible for reviewing before
        anything goes live.
      </LegalP>

      <LegalH2>4. Fees</LegalH2>
      <LegalP>
        Fees for the Service (prepaid AI Growth Credits, plans, setup, implementation, access) are as quoted on our site,
        invoice, checkout, or written proposal, plus taxes (including GST where applicable).
      </LegalP>
      <LegalP>
        Payment is due as stated at checkout or on the invoice. A monthly or annual price loads
        credits for that period. Monthly plans renew until cancelled.
      </LegalP>
      <LegalP>
        <strong className="text-white">Unpaid fees may result in suspension.</strong> Suspension for non-payment is not
        a failure by us to provide the Service.
      </LegalP>
      <LegalP>
        We may change future prices. A change does not apply to a period you have already paid,
        except as required by law.
      </LegalP>

      <LegalH2>5. Refund policy</LegalH2>
      <LegalP>
        <strong className="text-white">Default rule: fees are non-refundable except for unused credits as set out below.</strong>
      </LegalP>
      <LegalP>
        A refund of unused AI Growth Credits (or the unused portion we reasonably determine) is available{" "}
        <strong className="text-white">only if we do not provide the Service you paid for.</strong>
        Ad spend is never refunded. The Grievance Officer SLA is separate from refunds.
      </LegalP>

      <LegalH3>5.1 Eligibility and review</LegalH3>
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

      <LegalH3>5.2 What &quot;we do not provide the Service&quot; means</LegalH3>
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

      <LegalH3>5.3 What is not a refund</LegalH3>
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

      <LegalH3>5.4 How a valid refund is paid</LegalH3>
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
        breach of these Terms. We may suspend the account and recover our costs.
      </LegalP>

      <LegalH2>6. Cancellation</LegalH2>
      <LegalP>You may stop using the Service at any time.</LegalP>
      <LegalUl
        items={[
          <>
            <strong className="text-white">Monthly:</strong> cancel future renewals; the current paid period is not
            refunded if the Service was available.
          </>,
          <>
            <strong className="text-white">Annual / setup / one-time:</strong> no pro-rata refund after we have
            granted access or started implementation, except under section 5.
          </>,
        ]}
      />
      <LegalP>
        Cancellation does not cancel your ad campaigns or ad-account billing. You must pause or
        cancel those in the platforms yourself.
      </LegalP>

      <LegalH2>7. No results guarantee</LegalH2>
      <LegalP>
        We do not warrant a number of leads, cost per lead, sales, or ROAS. Advertising outcomes
        depend on your offer, market, budget, creative, landing experience, and platform rules,
        none of which we fully control.
      </LegalP>
      <LegalP>Any examples, forecasts, or &quot;typical&quot; figures are illustrative, not a promise.</LegalP>

      <LegalH2>8. Third-party platforms</LegalH2>
      <LegalP>
        The Service may connect to Meta, Google, WhatsApp, email, CRM, and similar products. Those
        products are not ours. Their terms, outages, bans, and fees are between you and them.
      </LegalP>
      <LegalP>
        We are not liable for platform decisions (including account disablement or ad rejection).
      </LegalP>

      <LegalH2>9. Intellectual property</LegalH2>
      <LegalP>
        We own the Service, software, Companion, Operator, designs, and our templates. You get a
        limited, non-exclusive licence to use the Service for your business while your account is
        in good standing.
      </LegalP>
      <LegalP>
        You own your brand assets, ad accounts, and the data you put into the Service. You grant us
        a licence to use that material solely to provide the Service.
      </LegalP>
      <LegalP>
        You may not copy, reverse engineer, or scrape the Service except as the law allows.
      </LegalP>

      <LegalH2>10. Data and confidentiality</LegalH2>
      <LegalP>
        We process account, campaign, and usage data to run the Service. WhatsApp chats and similar
        local data may stay on your machine when the Companion is designed that way; we do not
        claim to host your full chat history.
      </LegalP>
      <LegalP>
        How we process WhatsApp messages and voice or AI-assisted calls, including when AI calling
        is used and those calls may be transcribed, is set out in our{" "}
        <Link to="/privacy-policy" className="impact-highlight underline-offset-2 hover:underline">
          Privacy policy
        </Link>
        . Consent for those contacts is collected on the form you submit.
      </LegalP>
      <LegalP>
        You may opt out of WhatsApp messages by replying STOP, or by emailing{" "}
        <a
          className="impact-highlight underline-offset-2 hover:underline"
          href="mailto:boostmysitescom@gmail.com"
        >
          boostmysitescom@gmail.com
        </a>
        . You may opt out of further marketing or AI sales calls by emailing that address with
        your number, or by asking on the call. Transactional or service messages already in
        progress may still send where the law allows.
      </LegalP>
      <LegalP>
        Each party will keep the other&apos;s non-public business information confidential, except
        where disclosure is required by law or needed to provide the Service (including
        subprocessors such as payment and hosting).
      </LegalP>

      <LegalH2>11. Acceptable use</LegalH2>
      <LegalP>
        You will not use the Service for unlawful ads, spam, fraud, malware, or to violate platform
        or privacy laws. You will not attempt to break or overload our systems.
      </LegalP>
      <LegalP>
        We may refuse or stop work that we reasonably believe is illegal or would get accounts
        banned.
      </LegalP>

      <LegalH2>12. Liability</LegalH2>
      <LegalP>To the maximum extent permitted by law:</LegalP>
      <LegalUl
        items={[
          <>
            the Service is provided &quot;as is&quot;;
          </>,
          "we are not liable for lost profits, lost leads, lost data, or indirect loss;",
          <>
            our total liability for a claim is capped at the{" "}
            <strong className="text-white">Service fees you paid us in the 3 months before the claim</strong>{" "}
            (excluding ad spend).
          </>,
        ]}
      />
      <LegalP>
        Nothing in these Terms excludes liability that cannot be excluded under applicable law
        (including fraud, or liability that Indian consumer law does not allow a business to
        exclude where you are a consumer).
      </LegalP>

      <LegalH2>13. Indemnity</LegalH2>
      <LegalP>
        You will indemnify us against claims, fines, and costs arising from your ads, your content,
        your use of third-party platforms, or your breach of these Terms.
      </LegalP>

      <LegalH2>14. Changes</LegalH2>
      <LegalP>
        We may update these Terms. The version on this page (or the version we publish at
        www.boostmysites.in) applies when posted. Continued paid use after a change is acceptance
        of the new Terms for future periods.
      </LegalP>

      <LegalH2>15. Governing law</LegalH2>
      <LegalP>
        These Terms are governed by the laws of India. Courts at Bengaluru, Karnataka, have
        exclusive jurisdiction, subject to any mandatory consumer venue the law gives you.
      </LegalP>

      <LegalH2>16. Entire agreement</LegalH2>
      <LegalP>
        These Terms, plus the plan, invoice, or checkout page you paid against, are the full
        agreement for the Service. If a signed proposal conflicts with these Terms on price or
        scope, the signed proposal wins for that item; these Terms win on refunds unless the
        proposal <strong className="text-white">expressly</strong> states a different refund clause.
      </LegalP>

      <LegalH2>Summary of refunds</LegalH2>
      <LegalP>
        This paragraph is a convenience summary only and does not replace section 5. Eligible
        customers may request a refund of unused AI Growth Credits where the agreed Service has not been provided substantially
        in accordance with the scope agreed at purchase. Requests are reviewed and are not issued
        automatically. Where part of the Service has already been delivered, any refund granted may
        be adjusted for work performed, resources committed, or third-party costs incurred on the
        customer&apos;s behalf. Unsatisfactory advertising performance, lead volume, or return on
        ad spend is not grounds for a refund. Advertising spend paid to third-party platforms is
        never refunded by {BRAND.legalName}.
      </LegalP>
      <LegalH2>Complaints</LegalH2>
      <LegalP>
        Complaints about this website, AI Growth Credits, a payment, or your data should go to our{" "}
        <Link to="/legal/contact" className="impact-highlight underline-offset-2 hover:underline">
          Grievance Officer
        </Link>
        . We acknowledge complaints within 2 business days and aim to resolve them within 14
        business working days of acknowledgement. That clock is separate from refunds.
      </LegalP>
    </LegalPageShell>
  );
}
