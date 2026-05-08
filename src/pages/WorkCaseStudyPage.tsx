import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WorkShell } from "@/components/work/primitives/WorkShell";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { CaseStudyChallenge } from "@/components/work/CaseStudyChallenge";
import { CaseStudyApproach } from "@/components/work/CaseStudyApproach";
import { CaseStudyFeatures } from "@/components/work/CaseStudyFeatures";
import { CaseStudyTechStack } from "@/components/work/CaseStudyTechStack";
import { CaseStudyGallery } from "@/components/work/CaseStudyGallery";
import { CaseStudyMetricsDetailed } from "@/components/work/CaseStudyMetricsDetailed";
import { CaseStudyTestimonial } from "@/components/work/CaseStudyTestimonial";
import { CaseStudyRelated } from "@/components/work/CaseStudyRelated";
import { WorkCTA } from "@/components/work/WorkCTA";
import {
  getAllProjects,
  getAllProjectsFromBackend,
  getProjectBySlug,
  type WorkProject,
} from "@/data/workMock";
import { ArrowLeftIcon } from "@/components/work/primitives/icons";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; project: WorkProject; allProjects: WorkProject[] }
  | { status: "not-found" };

export default function WorkCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let mounted = true;

    if (!slug) {
      setState({ status: "not-found" });
      return;
    }

    const loadProject = async () => {
      setState({ status: "loading" });
      const backendProjects = await getAllProjectsFromBackend();
      const staticProjects = getAllProjects();
      const sourceProjects = backendProjects.length > 0 ? backendProjects : staticProjects;
      const project =
        sourceProjects.find((p) => p.slug === slug || p.id === slug) ??
        getProjectBySlug(slug);

      if (!mounted) return;

      if (project) {
        setState({ status: "ready", project, allProjects: sourceProjects });
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        setState({ status: "not-found" });
      }
    };

    void loadProject();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const related = useMemo(() => {
    if (state.status !== "ready") return [];
    const sameService = state.allProjects.filter(
      (p) => p.serviceId === state.project.serviceId && p.slug !== state.project.slug,
    );
    const others = state.allProjects.filter(
      (p) => p.serviceId !== state.project.serviceId && p.slug !== state.project.slug,
    );
    return [...sameService, ...others].slice(0, 3);
  }, [state]);

  if (state.status === "loading") {
    return (
      <WorkShell>
        <CaseStudySkeleton />
      </WorkShell>
    );
  }

  if (state.status === "not-found") {
    return (
      <WorkShell documentTitle="Case study not found — Boostmysites">
        <CaseStudyNotFound />
      </WorkShell>
    );
  }

  const project = state.project;

  return (
    <WorkShell documentTitle={`${project.title} — Case study | Boostmysites`}>
      <div className="flex w-full max-w-[min(1500px,96vw)] flex-col">
        <CaseStudyHero project={project} />
        <CaseStudyChallenge
          challenge={project.challenge}
          bullets={project.challengeBullets}
        />
        <CaseStudyApproach steps={project.approach} />
        <CaseStudyGallery images={project.gallery} />
        <CaseStudyFeatures features={project.features} />
        <CaseStudyTechStack groups={project.techStack} />
        <CaseStudyMetricsDetailed metrics={project.detailedMetrics} />
        <CaseStudyTestimonial testimonial={project.testimonial} />
        <CaseStudyRelated projects={related} />
        <WorkCTA />
      </div>
    </WorkShell>
  );
}

function CaseStudySkeleton() {
  return (
    <div className="w-full max-w-[min(1500px,96vw)] px-10 pt-12 max-md:px-5">
      <div className="glass-card mb-8 h-6 w-40 animate-pulse opacity-50" />
      <div className="grid grid-cols-12 gap-8 max-lg:grid-cols-1">
        <div className="col-span-7 flex flex-col gap-4 max-lg:col-span-1">
          <div className="glass-card h-10 w-3/4 animate-pulse opacity-50" />
          <div className="glass-card h-10 w-2/3 animate-pulse opacity-50" />
          <div className="glass-card h-24 w-full animate-pulse opacity-40" />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card h-16 animate-pulse opacity-40"
              />
            ))}
          </div>
        </div>
        <div className="col-span-5 max-lg:col-span-1">
          <div className="glass-card h-[340px] w-full animate-pulse opacity-40" />
        </div>
      </div>
    </div>
  );
}

function CaseStudyNotFound() {
  return (
    <section className="w-full max-w-[min(1500px,96vw)] px-10 pt-[80px] pb-12 max-md:px-5">
      <div className="glass-card flex flex-col items-center gap-4 px-10 py-16 text-center max-md:px-6 max-md:py-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[color:var(--wk-bright)] backdrop-blur-[5px]">
          Case study not found
        </span>
        <h1 className="text-[40px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          We couldn't find that project.
        </h1>
        <p className="max-w-[460px] text-base text-white/65">
          The case study you're looking for may have moved or been retired.
          Browse the rest of the work to find what you need.
        </p>
        <Link
          to="/work"
          className="btn-gloss group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-5 text-[13px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)] transition-opacity hover:opacity-95"
        >
          <ArrowLeftIcon className="relative z-[2] size-4" />
          <span className="relative z-[2]">Back to all work</span>
        </Link>
      </div>
    </section>
  );
}
