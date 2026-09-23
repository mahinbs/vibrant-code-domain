import { Link } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import {
  LegalH2,
  LegalOl,
  LegalP,
  LegalPageShell,
} from "../components/LegalPageShell";

export default function GrievanceOfficer() {
  const mailHref = `mailto:${BRAND.email}`;
  const telHref = `tel:${BRAND.phone.replace(/\s/g, "")}`;

  return (
    <LegalPageShell
      title="Grievance Officer | Boostmysites"
      description="Contact the Grievance Officer for Triple-Seven BoostMySites AI Solutions Private Limited. Complaints acknowledged in 2 business days and resolved within 14 business working days."
      eyebrow="Legal"
      heading={
        <>
          Grievance <span className="impact-highlight">officer</span>
        </>
      }
    >
      <LegalP>
        {BRAND.legalName}
        <br />
        Website:{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={BRAND.siteUrl}>
          {BRAND.siteUrl}
        </a>
      </LegalP>
      <LegalP>
        If you have a complaint about our website, our AI Growth Credits, a payment, or how we
        handle your data, write to our Grievance Officer.
      </LegalP>

      <LegalH2>Officer details</LegalH2>
      <LegalP>
        <strong className="text-white">Name:</strong> Mahin BS
        <br />
        <strong className="text-white">Designation:</strong> Chairman
        <br />
        <strong className="text-white">Email:</strong>{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={mailHref}>
          {BRAND.email}
        </a>
        <br />
        <strong className="text-white">Phone:</strong>{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={telHref}>
          {BRAND.phone}
        </a>
        <br />
        <strong className="text-white">Registered office:</strong> {BRAND.registeredAddressLine}
      </LegalP>

      <LegalH2>How to complain</LegalH2>
      <LegalP>
        Email{" "}
        <a className="impact-highlight underline-offset-2 hover:underline" href={mailHref}>
          {BRAND.email}
        </a>{" "}
        with:
      </LegalP>
      <LegalOl
        items={[
          "your full name and phone number;",
          "the email you used to buy or enquire;",
          "invoice or order ID, if you have one;",
          "a short description of the issue and what you want us to do.",
        ]}
      />

      <LegalH2>What happens next</LegalH2>
      <LegalP>
        We acknowledge your email within 2 business days. We aim to resolve it within{" "}
        <strong className="text-white">14 business working days</strong> of acknowledgement. If we
        need more time, we will write to you before that deadline and say why.
      </LegalP>
      <LegalP>
        This page is published under the Information Technology (Intermediary Guidelines and
        Digital Media Ethics Code) Rules, 2021, and the Consumer Protection (E-Commerce) Rules,
        2020.
      </LegalP>
      <LegalP>
        Related:{" "}
        <Link to="/terms-and-conditions" className="impact-highlight underline-offset-2 hover:underline">
          Terms and conditions
        </Link>
        {" · "}
        <Link to="/privacy-policy" className="impact-highlight underline-offset-2 hover:underline">
          Privacy policy
        </Link>
        {" · "}
        <Link to="/refund-policy" className="impact-highlight underline-offset-2 hover:underline">
          Refund policy
        </Link>
        .
      </LegalP>
    </LegalPageShell>
  );
}
