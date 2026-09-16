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

export default function TermsAndConditions() {
  return (
    <LegalPageShell
      title="Terms and Conditions | Boostmysites"
      description="Terms and Conditions for BOOSTMYSITES software, setup, and support. Includes the refund policy for Service fees."
      eyebrow="Legal"
      heading={
        <>
          Terms and <span className="impact-highlight">conditions</span>
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
        These Terms and Conditions (&quot;Terms&quot;) govern access to and use of BOOSTMYSITES
        software, the Companion app, the Operator dashboard, related websites, and any
        implementation, onboarding, or support we provide (together, the &quot;Service&quot;).
      </LegalP>
      <LegalP>
        By paying a fee, creating an account, signing a proposal, or using the Service, you agree
        to these Terms. If you do not agree, do not buy or use the Service.
      </LegalP>
      <LegalP>
        The refund rules in section 5 also appear on our{" "}
        <Link to="/refund-policy" className="impact-highlight underline-offset-2 hover:underline">
          Refund policy
        </Link>{" "}
        page.
      </LegalP>

      <LegalH2>1. Who we are and what you are buying</LegalH2>
      <LegalP>
        BOOSTMYSITES (&quot;we&quot;, &quot;us&quot;) provides <strong className="text-white">software and professional setup</strong> to
        help you plan, stage, and operate advertising and related automations (including ads,
        WhatsApp, email, CRM connections, and similar tools).
      </LegalP>
      <LegalP>
        <strong className="text-white">You are buying access to tools and our work to set them up.</strong> You are not
        buying leads, sales, ad results, or a guaranteed return on ad spend.
      </LegalP>
      <LegalP>
        Ad spend on Meta, Google, and other platforms is{" "}
        <strong className="text-white">your money, paid to those platforms</strong>, under those platforms&apos; own
        terms. We do not collect or refund that spend.
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
          "install and keep open the BOOSTMYSITES Companion on a suitable computer, where the Service requires it;",
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
        Fees for the Service (plans, setup, implementation, access) are as quoted on our site,
        invoice, checkout, or written proposal, plus taxes (including GST where applicable).
      </LegalP>
      <LegalP>
        Payment is due as stated at checkout or on the invoice. Annual plans are typically charged
        as a period fee. Monthly plans renew until cancelled.
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
        <strong className="text-white">Default rule: fees are non-refundable.</strong>
      </LegalP>
      <LegalP>
        A refund is available <strong className="text-white">only if we do not provide the Service you paid for.</strong>
      </LegalP>

      <LegalH3>5.1 What &quot;we do not provide the Service&quot; means</LegalH3>
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

      <LegalH3>5.2 What is not a refund</LegalH3>
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

      <LegalH3>5.3 How a valid refund is paid</LegalH3>
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
            granted access or started implementation, except under section 5.1.
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
        www.boostmysites.in) applies from the effective date stated. Continued paid use after a
        change is acceptance of the new Terms for future periods.
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

      <LegalH2>Short refund summary</LegalH2>
      <LegalP>
        This summary does not replace section 5. Pay us, we give you the software/setup we sold. If
        we <strong className="text-white">don&apos;t</strong> give you that Service, you can get the fee back. If we{" "}
        <strong className="text-white">did</strong> give you access or started the work, or ads simply didn&apos;t
        perform, there is <strong className="text-white">no refund</strong>. Ad spend is never refunded by
        BOOSTMYSITES.
      </LegalP>
    </LegalPageShell>
  );
}
