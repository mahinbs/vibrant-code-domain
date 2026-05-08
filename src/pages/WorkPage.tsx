import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WorkShell } from "@/components/work/primitives/WorkShell";
import { WORK_GLASS_BG_BLUR } from "@/components/work/primitives/workChrome";
import {
  orderedServiceIds,
  parseFocusParam,
  reorderWithFocus,
  type ServiceId,
} from "@/components/work/primitives/serviceMeta";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkServiceFilter } from "@/components/work/WorkServiceFilter";
import { WorkCategorySection } from "@/components/work/WorkCategorySection";
import { WorkCTA } from "@/components/work/WorkCTA";
import { getAllProjects, getAllProjectsFromBackend, type WorkProject } from "@/data/workMock";

export default function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFocus = useMemo(
    () => parseFocusParam(searchParams.get("service")),
    [searchParams],
  );
  const [activeFilter, setActiveFilter] = useState<ServiceId | null>(initialFocus);

  const staticProjects = useMemo<WorkProject[]>(() => getAllProjects(), []);
  const [allProjects, setAllProjects] = useState<WorkProject[]>(staticProjects);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      const backendProjects = await getAllProjectsFromBackend();
      if (!mounted || backendProjects.length === 0) return;
      setAllProjects(backendProjects);
    };
    void fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const map: Record<ServiceId, WorkProject[]> = {
      web: [],
      saas: [],
      mobile: [],
      "ai-calling": [],
      "ai-automation": [],
      design: [],
    };
    for (const project of allProjects) {
      map[project.serviceId].push(project);
    }
    return map;
  }, [allProjects]);

  const counts = useMemo(() => {
    const out: Record<ServiceId, number> = {
      web: 0,
      saas: 0,
      mobile: 0,
      "ai-calling": 0,
      "ai-automation": 0,
      design: 0,
    };
    for (const id of orderedServiceIds) out[id] = grouped[id].length;
    return out;
  }, [grouped]);

  const visibleIds = useMemo(() => {
    if (activeFilter) return [activeFilter];
    return reorderWithFocus(orderedServiceIds, initialFocus);
  }, [activeFilter, initialFocus]);

  const sectionRefs = useRef<Partial<Record<ServiceId, HTMLElement | null>>>({});

  useEffect(() => {
    if (!initialFocus) return;
    const node = sectionRefs.current[initialFocus];
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      node.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    });
  }, [initialFocus]);

  const totalProjects = allProjects.length;
  const totalIndustries = useMemo(
    () => new Set(allProjects.map((p) => p.industry)).size,
    [allProjects],
  );

  const handleFilterSelect = (id: ServiceId | null) => {
    setActiveFilter(id);
    const next = new URLSearchParams(searchParams);
    if (id) next.set("service", id);
    else next.delete("service");
    setSearchParams(next, { replace: true });

    if (id) {
      const node = sectionRefs.current[id];
      if (node) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() => {
          node.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    }
  };

  return (
    <WorkShell documentTitle="Our work — Boostmysites">
      <WorkHero totalProjects={totalProjects} totalIndustries={totalIndustries} />

      <div
        className={`sticky top-[88px] z-20 w-screen ml-[calc(50%-50vw)] border-b border-white/[0.07] ${WORK_GLASS_BG_BLUR}`}
      >
        <div className="mx-auto w-full max-w-[min(1920px,96vw)] px-10 py-4 max-md:px-5">
          <WorkServiceFilter
            active={activeFilter}
            onSelect={handleFilterSelect}
            counts={counts}
          />
        </div>
      </div>

      <div className="flex w-full max-w-[min(1920px,96vw)] flex-col">
        {visibleIds.map((id) => (
          <WorkCategorySection
            key={id}
            ref={(node) => {
              sectionRefs.current[id] = node;
            }}
            serviceId={id}
            projects={grouped[id]}
            isFocused={initialFocus === id && !activeFilter}
          />
        ))}
      </div>

      <div className="w-full max-w-[min(1920px,96vw)]">
        <WorkCTA />
      </div>
    </WorkShell>
  );
}
