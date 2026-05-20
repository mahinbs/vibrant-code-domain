import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import type { Country } from "react-phone-number-input";
import { trackMetaCompleteRegistration } from "@/lib/analytics/metaPixel";
import { submitFounderPartnershipLead } from "../lib/submitFounderPartnershipLead";
import {
  abandonFounderApplicationDraft,
  completeFounderApplicationDraft,
  getStoredResumeToken,
  loadFounderApplicationDraft,
  saveFounderApplicationDraft,
} from "../lib/saveFounderApplicationDraft";
import { buildFounderDraftSummary, formatRelativeTime } from "./founderDraftSummary";
import { FounderHeroScene } from "./components/FounderHeroScene";
import { FounderResumeOverview } from "./components/FounderResumeOverview";
import { FounderPhaseDots } from "./components/FounderPhaseDots";
import { FounderOptionTile } from "./components/FounderOptionTile";
import { FounderMicroResponse } from "./components/FounderMicroResponse";
import { FounderImmersiveInput } from "./components/FounderImmersiveInput";
import { FounderCommitmentSlider } from "./components/FounderCommitmentSlider";
import { FounderPhoneInput, validateFounderPhone } from "./components/FounderPhoneInput";
import { FounderEmailInput, validateFounderEmail } from "./components/FounderEmailInput";
import { FounderTypingAnswer, isSoftTextReady } from "./components/FounderTypingAnswer";
import { FounderSceneMotion, FounderStaggerGroup, FounderStaggerItem } from "./components/FounderSceneMotion";
import { FounderImmersiveScene } from "./components/FounderImmersiveScene";
import { FounderSceneCta } from "./components/FounderSceneCta";
import { FounderTrustBand } from "./components/FounderTrustBand";
import {
  ABOUT_COMPANY_COPY,
  BLOCKER_OPTIONS,
  BLOCKERS_MICRO,
  BUDGET_OPTIONS,
  BUILDING_OPTIONS,
  COMPANY_STATS,
  emptyFormState,
  FOUNDER_SOURCE_PAGE,
  MILESTONE_COPY,
  MULTI_SELECT_HINT,
  NO_CODE_MICRO_NO,
  NO_CODE_MICRO_YES,
  PARTNERSHIP_OPTIONS,
  PSYCH_CONVICTION_OPTIONS,
  PSYCH_STAKE_OPTIONS,
  QUEUE_COPY,
  REVENUE_MODEL_OPTIONS,
  SCENE_META,
  SCENE_ORDER,
  SCENES_NO_CTA,
  SOFT_TEXT_SCENES,
  TECHNICAL_SUPPORT_OPTIONS,
  TIMELINE_OPTIONS,
  VALIDATION_OPTIONS,
  sceneIndex,
} from "./founderApplicationConfig";
import type { FounderApplicationFormState, FounderSceneId } from "./founderApplicationTypes";
import { FOUNDER_PHASE_THEMES } from "./founderPhaseThemes";

type FieldErrors = Partial<Record<keyof FounderApplicationFormState, string>>;

const SCENES_WITH_HEADER = new Set<FounderSceneId>([
  "building",
  "ideaOrigin",
  "blockers",
  "noCode",
  "technicalSupport",
  "marketUnderstanding",
  "validation",
  "commitment",
  "timeline",
  "budget",
  "partnership",
  "vision3Year",
  "founderMindset",
  "psychStake",
  "psychConviction",
]);

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "";
}

function getMicroForOption<T extends { value: string; micro?: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.micro ?? "";
}

function getSoftField(sceneId: FounderSceneId): keyof FounderApplicationFormState | null {
  if (sceneId === "ideaOrigin") return "ideaOrigin";
  if (sceneId === "vision3Year") return "vision3Year";
  if (sceneId === "founderMindset") return "founderMindset";
  return null;
}

export function FounderApplicationWizard() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [form, setForm] = useState<FounderApplicationFormState>(emptyFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [softOverridePending, setSoftOverridePending] = useState(false);
  const [softOverrideReady, setSoftOverrideReady] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const [pendingResume, setPendingResume] = useState<{
    form: FounderApplicationFormState;
    currentStep: FounderSceneId;
    updatedAt: string;
    token: string;
  } | null>(null);
  const [resumeRestarting, setResumeRestarting] = useState(false);
  const [resumeExpiredMessage, setResumeExpiredMessage] = useState<string | null>(null);
  const [milestonePhase, setMilestonePhase] = useState<"celebration" | "submitting">("celebration");
  const milestoneSubmitStarted = useRef(false);

  const sceneId = SCENE_ORDER[sceneIdx];
  const meta = SCENE_META[sceneId];
  const phaseTheme = FOUNDER_PHASE_THEMES[meta.phase];
  const showChrome =
    sceneId !== "hero" && sceneId !== "milestone" && sceneId !== "queue" && sceneId !== "aboutCompany";
  const phoneCountry = (form.phoneCountry || "IN") as Country;

  const handleSceneReady = useCallback(() => setCtaReady(true), []);

  useEffect(() => {
    document.documentElement.style.setProperty("--founder-wash", phaseTheme.wash);
    document.documentElement.style.setProperty("--founder-accent", phaseTheme.accent);
  }, [phaseTheme]);

  useEffect(() => {
    setSoftOverridePending(false);
    setSoftOverrideReady(false);
    setCtaReady(false);
    milestoneSubmitStarted.current = false;
    setMilestonePhase("celebration");
    window.scrollTo(0, 0);
  }, [sceneId]);

  useEffect(() => {
    if (!softOverridePending) {
      setSoftOverrideReady(false);
      return;
    }
    const t = window.setTimeout(() => setSoftOverrideReady(true), 2000);
    return () => window.clearTimeout(t);
  }, [softOverridePending]);

  useEffect(() => {
    const token = getStoredResumeToken();
    if (!token) return;
    void loadFounderApplicationDraft(token).then((res) => {
      if (res.ok && res.form && res.currentStep && res.updatedAt) {
        setPendingResume({
          form: { ...emptyFormState(), ...res.form },
          currentStep: res.currentStep,
          updatedAt: res.updatedAt,
          token,
        });
        setResumeToken(token);
        return;
      }
      if (res.expired) {
        setResumeExpiredMessage("This resume link has expired. Start a fresh application below.");
      }
    });
  }, []);

  const handleResumeContinue = useCallback(() => {
    if (!pendingResume) return;
    setForm(pendingResume.form);
    setResumeToken(pendingResume.token);
    const idx = sceneIndex(pendingResume.currentStep);
    if (idx >= 0) setSceneIdx(idx);
    setPendingResume(null);
  }, [pendingResume]);

  const handleResumeStartOver = useCallback(async () => {
    if (!pendingResume) return;
    setResumeRestarting(true);
    await abandonFounderApplicationDraft(pendingResume.token);
    setForm(emptyFormState());
    setResumeToken(null);
    setSceneIdx(0);
    setPendingResume(null);
    setResumeRestarting(false);
  }, [pendingResume]);

  const patch = useCallback(
    <K extends keyof FounderApplicationFormState>(key: K, value: FounderApplicationFormState[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    [],
  );

  const softTextValue = useMemo(() => {
    const key = getSoftField(sceneId);
    if (!key) return "";
    return String(form[key] ?? "");
  }, [sceneId, form]);

  const validateScene = useCallback((): boolean => {
    const e: FieldErrors = {};
    switch (sceneId) {
      case "identity": {
        if (!form.name.trim()) e.name = "Please tell us your name.";
        const emailCheck = validateFounderEmail(form.email);
        if (!emailCheck.ok) e.email = emailCheck.error;
        if (!validateFounderPhone(form.phone, phoneCountry)) {
          e.phone = "Enter a valid WhatsApp / phone number.";
        }
        break;
      }
      case "building":
        if (!form.buildingType) e.buildingType = "Select what you are building.";
        else if (form.buildingType === "other" && !form.buildingTypeOther.trim()) {
          (e as FieldErrors & { buildingTypeOther?: string }).buildingTypeOther =
            "Describe what you are building.";
        }
        break;
      case "ideaOrigin":
        if (!form.ideaOrigin.trim()) e.ideaOrigin = "Please share what sparked this idea.";
        break;
      case "blockers":
        if (form.launchBlockers.length === 0)
          (e as FieldErrors & { launchBlockers?: string }).launchBlockers = "Select at least one.";
        break;
      case "noCode":
        if (!form.exploredNoCode) e.exploredNoCode = "Please select an option.";
        break;
      case "technicalSupport":
        if (!form.technicalSupport) e.technicalSupport = "Please select an option.";
        break;
      case "marketUnderstanding":
        if (!form.revenueModel) e.revenueModel = "Select a revenue model.";
        break;
      case "validation":
        if (!form.validationStage) e.validationStage = "Select your validation stage.";
        break;
      case "timeline":
        if (!form.timeline) e.timeline = "Select a timeline.";
        break;
      case "budget":
        if (!form.budgetInr) e.budgetInr = "Select a budget range.";
        break;
      case "partnership":
        if (form.partnershipTypes.length === 0)
          (e as FieldErrors & { partnershipTypes?: string }).partnershipTypes =
            "Select at least one.";
        break;
      case "vision3Year":
        if (!form.vision3Year.trim()) e.vision3Year = "Please share your vision.";
        break;
      case "founderMindset":
        if (!form.founderMindset.trim()) e.founderMindset = "Please share your thoughts.";
        break;
      case "psychStake":
        if (!form.psychStake) e.psychStake = "Select what is at stake for you.";
        break;
      case "psychConviction":
        if (!form.psychConviction) e.psychConviction = "Select your commitment level.";
        break;
      default:
        break;
    }
    if (Object.keys(e).length) {
      setErrors(e);
      return false;
    }
    return true;
  }, [sceneId, form, phoneCountry]);

  const trySoftTextAdvance = useCallback((): boolean => {
    if (!SOFT_TEXT_SCENES.has(sceneId)) return true;
    if (isSoftTextReady(softTextValue, softOverrideReady)) return true;
    if (!softOverridePending) {
      setSoftOverridePending(true);
      return false;
    }
    if (!softOverrideReady) return false;
    return true;
  }, [sceneId, softTextValue, softOverridePending, softOverrideReady]);

  const persistDraft = useCallback(async () => {
    if (!form.email.trim() || sceneIdx < sceneIndex("identity")) return;
    const res = await saveFounderApplicationDraft(resumeToken, sceneId, form, form.email);
    if (res.resumeToken) setResumeToken(res.resumeToken);
  }, [form, resumeToken, sceneId, sceneIdx]);

  const advanceScene = useCallback(() => {
    if (sceneIdx < SCENE_ORDER.length - 1) {
      setSceneIdx((i) => i + 1);
    }
  }, [sceneIdx]);

  const handleSubmit = useCallback(async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    setServerError(null);
    const res = await submitFounderPartnershipLead({
      ...form,
      email: form.email.trim().toLowerCase(),
      sourcePage: FOUNDER_SOURCE_PAGE,
    });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      trackMetaCompleteRegistration();
      await completeFounderApplicationDraft(resumeToken);
      setSceneIdx(sceneIndex("queue"));
    } else {
      setServerError(res.error ?? "Something went wrong. Please try again.");
      setMilestonePhase("celebration");
      milestoneSubmitStarted.current = false;
    }
  }, [form, resumeToken, submitting, submitted]);

  const goNext = useCallback(async () => {
    setServerError(null);
    if (sceneId === "hero") {
      setSceneIdx(1);
      return;
    }
    if (SCENES_NO_CTA.has(sceneId)) return;

    if (!validateScene()) return;
    if (!trySoftTextAdvance()) return;

    if (sceneIdx >= sceneIndex("identity")) await persistDraft();
    advanceScene();
  }, [sceneId, sceneIdx, validateScene, trySoftTextAdvance, persistDraft, advanceScene]);

  const goBack = useCallback(() => {
    if (sceneIdx > 0 && sceneId !== "queue" && sceneId !== "aboutCompany") {
      setSceneIdx((i) => i - 1);
      setServerError(null);
    }
  }, [sceneIdx, sceneId]);

  const handlePrimaryAction = () => {
    void goNext();
  };

  useEffect(() => {
    if (sceneId !== "milestone" || submitted || milestoneSubmitStarted.current) return;
    milestoneSubmitStarted.current = true;
    const t = window.setTimeout(() => {
      setMilestonePhase("submitting");
      void handleSubmit();
    }, 1200);
    return () => window.clearTimeout(t);
  }, [sceneId, submitted, handleSubmit]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Enter" || ev.shiftKey) return;
      const tag = (ev.target as HTMLElement)?.tagName;
      if (tag === "TEXTAREA") return;
      if (SCENES_NO_CTA.has(sceneId)) return;
      ev.preventDefault();
      if (ctaReady && !submitting) void goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sceneId, ctaReady, submitting, goNext]);

  const buildingMicro = useMemo(
    () => getMicroForOption(BUILDING_OPTIONS, form.buildingType),
    [form.buildingType],
  );
  const revenueMicro = useMemo(
    () => getMicroForOption(REVENUE_MODEL_OPTIONS, form.revenueModel),
    [form.revenueModel],
  );
  const validationMicro = useMemo(
    () => getMicroForOption(VALIDATION_OPTIONS, form.validationStage),
    [form.validationStage],
  );
  const timelineMicro = useMemo(
    () => getMicroForOption(TIMELINE_OPTIONS, form.timeline),
    [form.timeline],
  );
  const techMicro = useMemo(
    () => getMicroForOption(TECHNICAL_SUPPORT_OPTIONS, form.technicalSupport),
    [form.technicalSupport],
  );
  const psychStakeMicro = useMemo(
    () => getMicroForOption(PSYCH_STAKE_OPTIONS, form.psychStake),
    [form.psychStake],
  );
  const psychConvictionMicro = useMemo(
    () => getMicroForOption(PSYCH_CONVICTION_OPTIONS, form.psychConviction),
    [form.psychConviction],
  );

  const toggleBlocker = (value: string) => {
    setForm((f) => {
      const has = f.launchBlockers.includes(value);
      return {
        ...f,
        launchBlockers: has
          ? f.launchBlockers.filter((x) => x !== value)
          : [...f.launchBlockers, value],
      };
    });
    setErrors((e) => ({ ...e, launchBlockers: undefined }));
  };

  const togglePartnership = (value: string) => {
    setForm((f) => {
      const has = f.partnershipTypes.includes(value);
      return {
        ...f,
        partnershipTypes: has
          ? f.partnershipTypes.filter((x) => x !== value)
          : [...f.partnershipTypes, value],
      };
    });
    setErrors((e) => ({ ...e, partnershipTypes: undefined }));
  };

  const isSoftScene = SOFT_TEXT_SCENES.has(sceneId);
  const softReady = isSoftTextReady(softTextValue, softOverrideReady);

  const ctaLabel = (() => {
    if (sceneId === "hero") return "Begin Application →";
    if (isSoftScene && softOverridePending && softOverrideReady)
      return "Continue with current answer →";
    return "Continue →";
  })();

  const showHeader = SCENES_WITH_HEADER.has(sceneId);
  const showFooter = !SCENES_NO_CTA.has(sceneId);

  const renderSceneBody = () => {
    switch (sceneId) {
      case "hero":
        return (
          <FounderHeroScene
            eyebrow={meta.eyebrow}
            headline={meta.headline}
            subheadline={meta.subheadline}
            onSceneReady={handleSceneReady}
          />
        );

      case "identity": {
        const fn = firstName(form.name);
        return (
          <FounderImmersiveScene
            sceneKey="identity"
            eyebrow={meta.eyebrow}
            headline={meta.headline}
            onSceneReady={handleSceneReady}
          >
            {(bodyVisible) =>
              bodyVisible ? (
                <div className="w-full max-w-md">
                  {fn ? (
                    <p className="mb-2 text-[20px] font-medium text-white md:text-[24px]">Hi, {fn}!</p>
                  ) : null}
                  <p className="mb-4 text-[13px] leading-relaxed text-white/60">{meta.subheadline}</p>
                  <FounderStaggerGroup className="flex flex-col gap-3">
                    <FounderStaggerItem>
                      <FounderImmersiveInput
                        label="Full name"
                        value={form.name}
                        onChange={(e) => patch("name", e.target.value)}
                        placeholder="Your name"
                        error={errors.name}
                      />
                    </FounderStaggerItem>
                    <FounderStaggerItem>
                      <FounderEmailInput
                        value={form.email}
                        onChange={(v) => patch("email", v)}
                        error={errors.email}
                      />
                    </FounderStaggerItem>
                    <FounderStaggerItem>
                      <FounderPhoneInput
                        value={form.phone}
                        country={phoneCountry}
                        onChange={(v) => patch("phone", v)}
                        onCountryChange={(c) => patch("phoneCountry", c)}
                        error={errors.phone}
                      />
                    </FounderStaggerItem>
                  </FounderStaggerGroup>
                </div>
              ) : null
            }
          </FounderImmersiveScene>
        );
      }

      case "milestone": {
        const showCelebration = milestonePhase === "celebration" && !submitting;
        const showSubmitting = milestonePhase === "submitting" || submitting;
        return (
          <div className="flex max-w-lg flex-col items-center text-center">
            {showCelebration ? (
              <>
                <div className="founder-milestone-ring mb-6 flex size-16 items-center justify-center rounded-full border border-purple/40 bg-purple/20 md:mb-8 md:size-20">
                  <Check className="size-8 text-purple md:size-10" strokeWidth={1.5} />
                </div>
                <p className="text-[12px] uppercase tracking-[0.16em] text-white/50">{meta.eyebrow}</p>
                <h2 className="mt-2 text-[24px] font-medium leading-tight text-white md:text-[36px]">
                  {meta.headline}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">
                  {MILESTONE_COPY.subheadline}
                </p>
              </>
            ) : null}
            {showSubmitting ? (
              <div className="founder-micro-in flex flex-col items-center py-4">
                <Loader2 className="size-10 animate-spin text-purple md:size-12" aria-hidden />
                <p className="mt-5 text-[15px] font-medium text-white">Submitting your application…</p>
                <p className="mt-2 text-[13px] text-white/50">Please stay on this page.</p>
              </div>
            ) : null}
            {serverError ? (
              <button
                type="button"
                className="mt-4 text-[13px] text-purple underline"
                onClick={() => {
                  setServerError(null);
                  setMilestonePhase("submitting");
                  milestoneSubmitStarted.current = true;
                  void handleSubmit();
                }}
              >
                Tap to retry submission
              </button>
            ) : null}
          </div>
        );
      }

      case "queue":
        return (
          <FounderImmersiveScene
            sceneKey="queue"
            eyebrow={meta.eyebrow}
            headline={meta.headline}
            onSceneReady={handleSceneReady}
          >
            <FounderStaggerGroup className="flex flex-col items-center text-center">
              <FounderStaggerItem>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">{meta.subheadline}</p>
              </FounderStaggerItem>
              <FounderStaggerItem>
                <ul className="mt-4 space-y-1.5 text-left text-[12px] text-white/50">
                  {QUEUE_COPY.bullets.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </FounderStaggerItem>
              <FounderStaggerItem>
                <div className="mt-6 flex w-full max-w-lg flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSceneIdx(sceneIndex("aboutCompany"))}
                    className="btn-gloss w-full rounded-[10px] border border-white/20 bg-purple/70 px-6 py-3.5 text-[15px] font-medium text-white"
                  >
                    Read more about BoostMySites →
                  </button>
                  <Link
                    to="/"
                    className="w-full rounded-[10px] border border-white/15 bg-transparent px-6 py-3 text-center text-[14px] text-white/60 transition-colors hover:border-white/25 hover:text-white/85"
                  >
                    Exit
                  </Link>
                </div>
              </FounderStaggerItem>
            </FounderStaggerGroup>
          </FounderImmersiveScene>
        );

      case "aboutCompany":
        return (
          <FounderImmersiveScene
            sceneKey="aboutCompany"
            eyebrow={meta.eyebrow}
            headline={meta.headline}
            onSceneReady={handleSceneReady}
          >
            <div className="w-full max-w-lg text-center">
              <p className="text-[13px] leading-relaxed text-white/70">{ABOUT_COMPANY_COPY.intro}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                {ABOUT_COMPANY_COPY.positioning}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {COMPANY_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[10px] border border-white/12 bg-black/40 px-2.5 py-2 text-left"
                  >
                    <p className="text-[17px] font-medium text-white">{s.value}</p>
                    <p className="text-[10px] text-white/55">{s.label}</p>
                  </div>
                ))}
              </div>
              <FounderTrustBand />
              <Link
                to="/"
                className="mt-5 inline-block text-[13px] text-white/50 underline-offset-4 hover:text-white hover:underline"
              >
                Back to BoostMySites
              </Link>
            </div>
          </FounderImmersiveScene>
        );

      default:
        return showHeader ? (
          <FounderImmersiveScene
            sceneKey={sceneId}
            eyebrow={meta.eyebrow}
            headline={meta.headline}
            onSceneReady={handleSceneReady}
          >
            {renderFormScene()}
          </FounderImmersiveScene>
        ) : (
          renderFormScene()
        );
    }
  };

  function renderFormScene() {
    switch (sceneId) {
      case "building":
        return (
          <div className="w-full max-w-lg">
            <OptionScene
              options={BUILDING_OPTIONS}
              selected={form.buildingType}
              onSelect={(v) => patch("buildingType", v)}
              micro={buildingMicro}
              error={errors.buildingType}
            />
            {form.buildingType === "other" ? (
              <div className="mt-3">
                <FounderImmersiveInput
                  label="Describe what you're building"
                  value={form.buildingTypeOther}
                  onChange={(e) => patch("buildingTypeOther", e.target.value)}
                  placeholder="Your product in a sentence"
                  error={
                    (errors as FieldErrors & { buildingTypeOther?: string }).buildingTypeOther
                  }
                />
              </div>
            ) : null}
          </div>
        );

      case "ideaOrigin":
        return (
          <TypingScene
            value={form.ideaOrigin}
            onChange={(e) => patch("ideaOrigin", e.target.value)}
            placeholder="A problem you faced, a customer conversation, market gap…"
            showOverrideHint={softOverridePending}
            overrideReady={softOverrideReady}
            error={errors.ideaOrigin}
          />
        );

      case "blockers":
        return (
          <OptionScene
            options={BLOCKER_OPTIONS}
            selected={form.launchBlockers}
            onSelect={toggleBlocker}
            multi
            micro={form.launchBlockers.length ? BLOCKERS_MICRO : ""}
            error={errors.launchBlockers as string | undefined}
          />
        );

      case "noCode":
        return (
          <OptionScene
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            selected={form.exploredNoCode}
            onSelect={(v) => patch("exploredNoCode", v as "yes" | "no")}
            micro={
              form.exploredNoCode === "yes"
                ? NO_CODE_MICRO_YES
                : form.exploredNoCode === "no"
                  ? NO_CODE_MICRO_NO
                  : ""
            }
            error={errors.exploredNoCode}
          />
        );

      case "technicalSupport":
        return (
          <OptionScene
            options={TECHNICAL_SUPPORT_OPTIONS}
            selected={form.technicalSupport}
            onSelect={(v) => patch("technicalSupport", v)}
            micro={techMicro}
            error={errors.technicalSupport}
          />
        );

      case "marketUnderstanding":
        return (
          <OptionScene
            options={REVENUE_MODEL_OPTIONS}
            selected={form.revenueModel}
            onSelect={(v) => patch("revenueModel", v)}
            micro={revenueMicro}
            error={errors.revenueModel}
          />
        );

      case "validation":
        return (
          <OptionScene
            options={VALIDATION_OPTIONS}
            selected={form.validationStage}
            onSelect={(v) => patch("validationStage", v)}
            micro={validationMicro}
            error={errors.validationStage}
          />
        );

      case "commitment":
        return (
          <div className="w-full max-w-md">
            <FounderCommitmentSlider
              value={form.commitmentLevel}
              onChange={(v) => patch("commitmentLevel", v)}
            />
          </div>
        );

      case "timeline":
        return (
          <OptionScene
            options={TIMELINE_OPTIONS}
            selected={form.timeline}
            onSelect={(v) => patch("timeline", v)}
            micro={timelineMicro}
            error={errors.timeline}
          />
        );

      case "budget":
        return (
          <OptionScene
            options={BUDGET_OPTIONS}
            selected={form.budgetInr}
            onSelect={(v) => patch("budgetInr", v)}
            error={errors.budgetInr}
          />
        );

      case "partnership":
        return (
          <OptionScene
            options={PARTNERSHIP_OPTIONS}
            selected={form.partnershipTypes}
            onSelect={togglePartnership}
            multi
            error={errors.partnershipTypes as string | undefined}
          />
        );

      case "vision3Year":
        return (
          <TypingScene
            value={form.vision3Year}
            onChange={(e) => patch("vision3Year", e.target.value)}
            placeholder="Describe scale, customers, revenue, impact…"
            showOverrideHint={softOverridePending}
            overrideReady={softOverrideReady}
            error={errors.vision3Year}
          />
        );

      case "founderMindset":
        return (
          <TypingScene
            value={form.founderMindset}
            onChange={(e) => patch("founderMindset", e.target.value)}
            placeholder="What drives you? What changes if this succeeds?"
            showOverrideHint={softOverridePending}
            overrideReady={softOverrideReady}
            error={errors.founderMindset}
          />
        );

      case "psychStake":
        return (
          <OptionScene
            options={PSYCH_STAKE_OPTIONS}
            selected={form.psychStake}
            onSelect={(v) => patch("psychStake", v)}
            micro={psychStakeMicro}
            error={errors.psychStake}
          />
        );

      case "psychConviction":
        return (
          <OptionScene
            options={PSYCH_CONVICTION_OPTIONS}
            selected={form.psychConviction}
            onSelect={(v) => patch("psychConviction", v)}
            micro={psychConvictionMicro}
            error={errors.psychConviction}
          />
        );

      default:
        return null;
    }
  }

  const ctaDisabled =
    submitting ||
    !ctaReady ||
    (isSoftScene && softOverridePending && !softOverrideReady && !softReady);

  return (
    <div className="founder-app relative z-10 flex min-h-[100dvh] flex-col">
      {showChrome ? (
        <header className="flex shrink-0 items-center justify-between px-5 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <button
            type="button"
            onClick={goBack}
            className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80"
            aria-label="Back"
          >
            <ChevronLeft className="size-5" />
          </button>
          <FounderPhaseDots activePhase={meta.phase} />
          <span className="size-9" />
        </header>
      ) : null}

      <main
        className={`flex min-h-0 flex-1 flex-col items-center overflow-hidden px-5 pb-24 md:px-8 ${
          sceneId === "hero"
            ? "justify-start pt-[max(1rem,env(safe-area-inset-top))] max-md:pb-[calc(5.25rem+env(safe-area-inset-bottom))] md:justify-center md:pt-2"
            : "justify-center pt-2"
        }`}
      >
        <FounderSceneMotion
          sceneKey={sceneId}
          className={`flex w-full flex-col items-center ${
            sceneId === "hero" ? "max-w-lg max-md:h-full max-md:min-h-0 max-md:flex-1" : "max-w-lg"
          }`}
        >
          {renderSceneBody()}
        </FounderSceneMotion>
      </main>

      {showFooter && ctaLabel ? (
        <footer className="fixed bottom-0 left-0 right-0 z-20 shrink-0 border-t border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {serverError && sceneId !== "milestone" ? (
            <p className="mb-2 text-center text-[12px] text-red-300">{serverError}</p>
          ) : null}
          <FounderSceneCta
            label={ctaLabel}
            ready={ctaReady}
            disabled={ctaDisabled}
            onClick={handlePrimaryAction}
          />
        </footer>
      ) : null}

      {resumeExpiredMessage ? (
        <p className="fixed left-0 right-0 top-[max(0.75rem,env(safe-area-inset-top))] z-30 px-5 text-center text-[12px] text-amber-200/90">
          {resumeExpiredMessage}
        </p>
      ) : null}

      {pendingResume ? (
        <FounderResumeOverview
          summary={buildFounderDraftSummary(pendingResume.form, pendingResume.currentStep)}
          lastSavedLabel={formatRelativeTime(pendingResume.updatedAt)}
          onContinue={handleResumeContinue}
          onStartOver={() => void handleResumeStartOver()}
          restarting={resumeRestarting}
        />
      ) : null}
    </div>
  );
}

function TypingScene({
  value,
  onChange,
  placeholder,
  showOverrideHint,
  overrideReady,
  error,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  showOverrideHint: boolean;
  overrideReady: boolean;
  error?: string;
}) {
  return (
    <div className="w-full">
      <FounderTypingAnswer
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        showOverrideHint={showOverrideHint}
        overrideReady={overrideReady}
      />
      {error ? <p className="mt-2 text-[12px] text-red-300">{error}</p> : null}
    </div>
  );
}

function OptionScene({
  options,
  selected,
  onSelect,
  multi,
  micro,
  error,
}: {
  options: readonly { value: string; label: string; micro?: string }[];
  selected: string | string[];
  onSelect: (value: string) => void;
  multi?: boolean;
  micro?: string;
  error?: string;
}) {
  const isSelected = (v: string) =>
    multi ? (selected as string[]).includes(v) : selected === v;

  return (
    <div className="w-full">
      <FounderStaggerGroup className="founder-options-grid grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {options.map((o) => (
          <FounderStaggerItem key={o.value}>
            <FounderOptionTile
              label={o.label}
              selected={isSelected(o.value)}
              onClick={() => onSelect(o.value)}
              multi={multi}
              compact
            />
          </FounderStaggerItem>
        ))}
      </FounderStaggerGroup>
      {multi ? (
        <p className="mt-2 text-center text-[11px] text-white/45">{MULTI_SELECT_HINT}</p>
      ) : null}
      <FounderMicroResponse text={micro ?? ""} visible={Boolean(micro)} />
      {error ? <p className="mt-2 text-center text-[12px] text-red-300">{error}</p> : null}
    </div>
  );
}
