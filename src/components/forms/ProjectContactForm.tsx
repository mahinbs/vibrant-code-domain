import { useState } from "react";
import type { FormEvent } from "react";

type ProjectContactFormProps = {
  formHeading?: string;
  formSubheading?: string;
};

const ProjectContactForm = ({
  formHeading = "Fintech product engineering",
  formSubheading = "Boostmysites",
}: ProjectContactFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    industry: "Fintech",
    message: "",
  });

  const validateStepOne = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = "Enter a valid email.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone or WhatsApp is required.";
    if (!formData.company.trim()) nextErrors.company = "Company is required.";
    if (!formData.website.trim()) nextErrors.website = "Website is required.";
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.industry.trim()) nextErrors.industry = "Select industry.";
    if (!formData.message.trim() || formData.message.trim().length < 20) {
      nextErrors.message = "Share at least 20 characters for context.";
    }
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStepTwo()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact-form"
      className="mt-6 w-full rounded-[16px] border border-white/12 bg-black/35 p-6 backdrop-blur-[8px]"
    >
      <div className="mx-auto max-w-[740px] text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/15 bg-[radial-gradient(circle_at_30%_20%,rgba(160,184,255,0.35),rgba(10,18,40,0.92)_70%)] shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          <span className="text-white/85">◉</span>
        </div>
        <h2 className="mt-4 text-[42px] font-medium leading-[1.03] -tracking-[0.03em] text-white max-md:text-[32px]">
          Tell us about your project.
          <br />
          <span className="text-white/75">Proposal in 24 hours.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[20px] leading-[1.35] text-white/70 max-md:text-[16px]">
          Free consultation. No hidden costs. Limited slots open this month.
        </p>
        <p className="mx-auto mt-2 max-w-[520px] text-[12px] text-white/45">
          {formHeading} · {formSubheading}
        </p>
      </div>

      {submitted ? (
        <div className="mx-auto mt-8 max-w-[740px] rounded-[12px] border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
          Thanks, your details are captured. We will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-[740px]">
          <div className="mb-2 flex items-center justify-between text-[12px] text-white/55">
            <span>Step {formStep} of 3</span>
            <span>{formStep === 1 ? "33%" : "66%"} complete</span>
          </div>
          <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#4f79ff_0%,#789dff_100%)] transition-all duration-300"
              style={{ width: formStep === 1 ? "33%" : "66%" }}
            />
          </div>

          {formStep === 1 ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="mb-1 text-[12px] text-white/75">Full name *</p>
                <input
                  name="fullName"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.fullName ? <p className="mt-1 text-xs text-red-300">{formErrors.fullName}</p> : null}
              </div>
              <div>
                <p className="mb-1 text-[12px] text-white/75">Work email *</p>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.email ? <p className="mt-1 text-xs text-red-300">{formErrors.email}</p> : null}
              </div>
              <div className="md:col-span-2">
                <p className="mb-1 text-[12px] text-white/75">Phone / WhatsApp *</p>
                <input
                  name="phone"
                  placeholder="+91 90000 00000"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.phone ? <p className="mt-1 text-xs text-red-300">{formErrors.phone}</p> : null}
              </div>
              <div>
                <p className="mb-1 text-[12px] text-white/75">Company name *</p>
                <input
                  name="company"
                  placeholder="Acme Pvt Ltd"
                  value={formData.company}
                  onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.company ? <p className="mt-1 text-xs text-red-300">{formErrors.company}</p> : null}
              </div>
              <div>
                <p className="mb-1 text-[12px] text-white/75">Website *</p>
                <input
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.website ? <p className="mt-1 text-xs text-red-300">{formErrors.website}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (validateStepOne()) setFormStep(2);
                }}
                className="relative overflow-hidden rounded-[10px] border border-white/20 bg-[linear-gradient(180deg,#406af0_0%,#3157d1_100%)] px-5 py-3 text-sm font-medium text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)] transition-transform hover:scale-[1.01] md:col-span-2"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="mb-1 text-[12px] text-white/75">Industry *</p>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white"
                >
                  <option value="Fintech">Fintech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="SaaS">SaaS</option>
                </select>
                {formErrors.industry ? <p className="mt-1 text-xs text-red-300">{formErrors.industry}</p> : null}
              </div>
              <div className="md:col-span-2">
                <p className="mb-1 text-[12px] text-white/75">Project brief *</p>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you are building"
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  className="w-full rounded-[10px] border border-white/15 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/45"
                />
                {formErrors.message ? <p className="mt-1 text-xs text-red-300">{formErrors.message}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="rounded-[10px] border border-white/20 bg-black/40 px-5 py-3 text-sm font-medium text-white/90"
              >
                Back
              </button>
              <button
                type="submit"
                className="relative overflow-hidden rounded-[10px] border border-white/20 bg-[linear-gradient(180deg,#406af0_0%,#3157d1_100%)] px-5 py-3 text-sm font-medium text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)] transition-transform hover:scale-[1.01]"
              >
                Submit inquiry
              </button>
            </div>
          )}
        </form>
      )}
      <div className="mx-auto mt-5 max-w-[740px] text-center text-[12px] text-white/45">
        Free consultation · No hidden costs · 24hr response
      </div>
      <div className="mx-auto mt-3 flex max-w-[740px] items-center justify-center gap-3 text-white/45">
        <span className="h-px w-12 bg-white/15" />
        <span className="text-[12px]">or</span>
        <span className="h-px w-12 bg-white/15" />
      </div>
      <div className="mx-auto mt-3 flex max-w-[740px] flex-wrap items-center justify-center gap-3">
        <a
          href="https://wa.me/919790035747?text=Hello%20BMS%2C%20I%20am%20looking%20to%20develop%20a%20project."
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/35 px-4 py-2.5 text-[13px] font-medium text-white/90"
        >
          WhatsApp us
        </a>
        <a
          href="mailto:ceo@boostmysites.com"
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/35 px-4 py-2.5 text-[13px] font-medium text-white/90"
        >
          ceo@boostmysites.com
        </a>
      </div>
    </section>
  );
};

export default ProjectContactForm;
