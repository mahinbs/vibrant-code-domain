import { memo, useEffect, useMemo, useRef } from "react";
import fintechIsometricHtml from "../../../fintech_isometric_build.html?raw";

const SCRIPT_REGEX = /<script>([\s\S]*?)<\/script>/i;

export const FintechIsometricBuild = memo(function FintechIsometricBuild() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const markup = useMemo(
    () => fintechIsometricHtml.replace(SCRIPT_REGEX, ""),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const get = (id: string) => root.querySelector<HTMLElement>(`#${id}`);
    let stopped = false;
    let stage = 0;

    const add = (id: string, ...classes: string[]) => {
      get(id)?.classList.add(...classes);
    };

    const remove = (id: string, ...classes: string[]) => {
      get(id)?.classList.remove(...classes);
    };

    const reset = () => {
      ["pf", "pr", "pt"].forEach((id) => remove(id, "s"));
      [0, 1, 2, 3, 4].forEach((i) => remove(`l${i}`, "up", "fill"));
      remove("halo", "on");
      for (let i = 0; i < 6; i += 1) {
        get(`d${i}`)?.classList.toggle("on", i === 0);
      }
    };

    reset();

    const stageTick = () => {
      if (stopped) return;
      stage += 1;

      if (stage === 1) {
        add("pf", "s");
        add("pr", "s");
        add("pt", "s");
        return;
      }
      if (stage === 2) {
        add("l0", "up");
        return;
      }
      if (stage === 3) {
        add("l0", "fill");
        add("l1", "up");
        return;
      }
      if (stage === 4) {
        add("l1", "fill");
        add("l2", "up");
        return;
      }
      if (stage === 5) {
        add("l2", "fill");
        add("l3", "up");
        return;
      }
      if (stage === 6) {
        add("l3", "fill");
        add("l4", "up");
        return;
      }
      if (stage === 7) {
        add("l4", "fill");
        add("halo", "on");
        return;
      }
      if (stage >= 10) {
        stage = 0;
        reset();
      }
    };

    const intervalId = window.setInterval(stageTick, 560);

    return () => {
      stopped = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
});
