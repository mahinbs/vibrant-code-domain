import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const sceneExit = {
  opacity: 0,
  scale: 1.02,
  y: -8,
  filter: "blur(4px)",
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export const sceneEnter = {
  opacity: 1,
  scale: 1,
  y: 0,
  filter: "blur(0px)",
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export const sceneEnterHidden = {
  opacity: 0,
  scale: 0.94,
  y: 0,
  filter: "blur(6px)",
};

export const blockVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const instantExit = { opacity: 0 };

type Props = {
  sceneKey: string;
  children: ReactNode;
  className?: string;
};

export function FounderSceneMotion({ sceneKey, children, className = "" }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        className={className}
        initial={reduced ? false : sceneEnterHidden}
        animate={sceneEnter}
        exit={reduced ? instantExit : sceneExit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FounderMotionBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={blockVariants}
      initial="hidden"
      animate="show"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function FounderStaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

export function FounderStaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}
