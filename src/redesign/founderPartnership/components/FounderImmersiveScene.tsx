import { useEffect, useState, type ReactNode } from "react";
import { FounderMotionBlock } from "./FounderSceneMotion";

const CTA_COOLDOWN_MS = 2000;

type Props = {
  sceneKey: string;
  eyebrow?: string;
  headline?: string;
  headlineClassName?: string;
  showHeader?: boolean;
  onSceneReady: () => void;
  children: ReactNode | ((bodyVisible: boolean) => ReactNode);
};

/** Scene shell: fade-in headline (no typewriter) → body → 2s CTA cooldown */
export function FounderImmersiveScene({
  sceneKey,
  eyebrow,
  headline = "",
  headlineClassName = "text-[26px] font-medium leading-[1.12] tracking-[-0.02em] text-white md:text-[34px]",
  showHeader = true,
  onSceneReady,
  children,
}: Props) {
  const [bodyVisible, setBodyVisible] = useState(!showHeader);

  useEffect(() => {
    if (!showHeader) {
      setBodyVisible(true);
      return;
    }
    const t = window.setTimeout(() => setBodyVisible(true), headline ? 120 : 0);
    return () => window.clearTimeout(t);
  }, [sceneKey, showHeader, headline]);

  useEffect(() => {
    if (!bodyVisible) return;
    const t = window.setTimeout(() => onSceneReady(), CTA_COOLDOWN_MS);
    return () => window.clearTimeout(t);
  }, [bodyVisible, sceneKey, onSceneReady]);

  const body = typeof children === "function" ? children(bodyVisible) : children;

  if (!showHeader) {
    return <div className="w-full">{bodyVisible ? body : null}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center">
      {eyebrow ? (
        <FounderMotionBlock className="mb-2 w-full text-center md:mb-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
            {eyebrow}
          </p>
        </FounderMotionBlock>
      ) : null}

      {headline ? (
        <FounderMotionBlock className={`mb-4 w-full text-center md:mb-5`}>
          <h2 className={headlineClassName}>{headline}</h2>
        </FounderMotionBlock>
      ) : null}

      {bodyVisible ? (
        <FounderMotionBlock className="w-full" delay={0.05}>
          {body}
        </FounderMotionBlock>
      ) : null}
    </div>
  );
}
