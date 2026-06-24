import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  buildMeshPaths,
  getWorkflowMeshConfig,
  MESH_VIEWBOX,
  positionNodes,
  type MeshPath,
  type PositionedNode,
} from "../data/workflowMeshConfigs";
import { useWorkflowReveal } from "./useWorkflowReveal";
import "./workflowMesh.css";

type WorkflowMeshProps = {
  scopeId: string;
  enabled?: boolean;
  compact?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type RevealState = ReturnType<typeof useWorkflowReveal>;

function pathVisible(group: MeshPath["group"], reveal: RevealState) {
  switch (group) {
    case "ingest":
      return reveal.showIngestPaths;
    case "toCore":
      return reveal.showToCorePaths;
    case "toRouting":
      return reveal.showRoutingPaths;
    case "toAction":
      return reveal.showToActionPaths;
    default:
      return false;
  }
}

function nodeVisible(node: PositionedNode, reveal: RevealState) {
  if (node.id === "core") return reveal.showCore;
  switch (node.tier) {
    case "trigger":
      return reveal.showTriggers;
    case "preprocess":
      return reveal.showPreprocess;
    case "routing":
      return reveal.showRouting;
    case "action":
      return reveal.showActions;
    default:
      return false;
  }
}

function nodeActive(node: PositionedNode, reveal: RevealState) {
  return nodeVisible(node, reveal);
}

function MeshPathLine({
  path,
  visible,
  reducedMotion,
}: {
  path: MeshPath;
  visible: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setLength(el.getTotalLength());
  }, [path.d]);

  const drawn = reducedMotion || visible;
  const offset = drawn ? 0 : length;

  return (
    <g>
      <path
        d={path.d}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 4"
      />
      <path
        ref={ref}
        d={path.d}
        stroke={path.group === "toAction" ? "rgba(0,232,122,0.45)" : "rgba(88,132,255,0.5)"}
        strokeWidth="1.5"
        fill="none"
        className="workflow-mesh-path-draw"
        style={{
          strokeDasharray: length || undefined,
          strokeDashoffset: offset,
        }}
      />
    </g>
  );
}

function MeshNode({
  node,
  visible,
  active,
  reducedMotion,
  staggerIndex,
}: {
  node: PositionedNode;
  visible: boolean;
  active: boolean;
  reducedMotion: boolean;
  staggerIndex: number;
}) {
  const isCore = node.id === "core";
  const size = isCore ? 52 : 32;
  const left = `${(node.x / MESH_VIEWBOX.width) * 100}%`;
  const top = `${(node.y / MESH_VIEWBOX.height) * 100}%`;

  if (!visible && !reducedMotion) return null;

  const Icon = node.icon;
  const iconSize = isCore ? 24 : 14;

  return (
    <div
      className={[
        "absolute flex flex-col items-center",
        visible && !reducedMotion ? "workflow-mesh-node-in" : "",
      ].join(" ")}
      style={{
        left,
        top,
        transform: "translate(-50%, -50%)",
        zIndex: isCore ? 12 : 10,
        animationDelay: staggerIndex ? `${staggerIndex * 80}ms` : undefined,
        opacity: visible || reducedMotion ? 1 : 0,
      }}
    >
      <div
        className={[
          "flex items-center justify-center border",
          isCore ? "rounded-full" : "rounded-[8px]",
          active
            ? "border-purple/60 shadow-[0_0_14px_rgba(88,132,255,0.45)]"
            : "border-white/15",
          isCore ? "bg-purple/15 text-purple" : "bg-[#081018] text-white/70",
        ].join(" ")}
        style={{ width: size, height: size }}
      >
        {isCore ? (
          <div className="workflow-mesh-pulse-inner flex size-full items-center justify-center rounded-full">
            <Icon size={iconSize} />
          </div>
        ) : (
          <Icon size={iconSize} className={active ? "text-purple" : ""} />
        )}
      </div>
      <span
        className={[
          "absolute hidden whitespace-nowrap text-[9px] font-semibold tracking-wide sm:block sm:text-[10px]",
          active ? "text-white/75" : "text-white/35",
        ].join(" ")}
        style={{ top: size + 5 }}
      >
        {node.label}
      </span>
    </div>
  );
}

export function WorkflowMesh({ scopeId, enabled = true, compact = false }: WorkflowMeshProps) {
  const reducedMotion = prefersReducedMotion();
  const reveal = useWorkflowReveal(reducedMotion, enabled);
  const filterId = useId().replace(/:/g, "");

  const config = getWorkflowMeshConfig(scopeId);
  const nodes = useMemo(() => positionNodes(config), [config]);
  const paths = useMemo(() => buildMeshPaths(nodes), [nodes]);

  const coreNode = nodes.find((n) => n.id === "core")!;
  const coreLeft = `${(coreNode.x / MESH_VIEWBOX.width) * 100}%`;
  const coreTop = `${(coreNode.y / MESH_VIEWBOX.height) * 100}%`;

  const dotTimings = useMemo(
    () =>
      paths.map((_, i) => ({
        dur: `${2 + (i % 3) * 0.4}s`,
        begin: `${(i % 5) * 0.35}s`,
      })),
    [paths],
  );

  const actionLabels = config.actions.map((a) => a.label).join(", ");

  return (
    <div className="relative w-full">
      <p className="sr-only">
        Workflow diagram: data flows from {config.triggers.map((t) => t.label).join(" and ")} through
        AI processing to {actionLabels}.
      </p>
      <div
        aria-hidden
        className={[
          "relative w-full overflow-hidden",
          compact
            ? "aspect-[8/3] min-h-[200px] max-h-[260px]"
            : "aspect-[8/3] min-h-[180px] max-h-[240px]",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "url(/textures/grid.svg)",
            backgroundSize: "44px auto",
          }}
        />

        <svg
          viewBox={`0 0 ${MESH_VIEWBOX.width} ${MESH_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 size-full"
          style={{ zIndex: 1 }}
        >
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {paths.map((path) => (
            <MeshPathLine
              key={path.id}
              path={path}
              visible={pathVisible(path.group, reveal)}
              reducedMotion={reducedMotion}
            />
          ))}

          {reveal.showDots &&
            paths.map((path, i) => (
              <circle
                key={`dot-${path.id}`}
                r="2.5"
                fill={path.group === "toAction" ? "#00e87a" : "#5884ff"}
                filter={`url(#${filterId})`}
              >
                <animateMotion
                  dur={dotTimings[i].dur}
                  repeatCount="indefinite"
                  begin={dotTimings[i].begin}
                  path={path.d}
                />
              </circle>
            ))}
        </svg>

        {reveal.showRings && (
          <>
            <div
              className="workflow-mesh-ring pointer-events-none absolute rounded-full border border-dashed border-purple/25"
              style={{
                left: coreLeft,
                top: coreTop,
                width: 100,
                height: 100,
                zIndex: 2,
              }}
            />
            <div
              className="workflow-mesh-ring-reverse pointer-events-none absolute rounded-full border border-white/10"
              style={{
                left: coreLeft,
                top: coreTop,
                width: 130,
                height: 130,
                zIndex: 2,
              }}
            >
              <div
                className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple shadow-[0_0_8px_rgba(88,132,255,0.8)]"
                aria-hidden
              />
            </div>
          </>
        )}

        {nodes.map((node, i) => (
          <MeshNode
            key={node.id}
            node={node}
            visible={nodeVisible(node, reveal)}
            active={nodeActive(node, reveal)}
            reducedMotion={reducedMotion}
            staggerIndex={node.tier === "trigger" ? i : 0}
          />
        ))}
      </div>
    </div>
  );
}
