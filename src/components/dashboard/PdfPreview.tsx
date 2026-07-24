import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const MAX_PAGES = 8;

/**
 * Renders a PDF inline via PDF.js canvases — works in every browser,
 * unlike <iframe src="…pdf"> which needs a native PDF plugin.
 */
export function PdfPreview({ url, name }: { url: string; name: string }) {
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [pageInfo, setPageInfo] = useState<{ shown: number; total: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const holder = holderRef.current;
    if (!holder) return;
    holder.innerHTML = "";
    setState("loading");

    (async () => {
      try {
        const doc = await pdfjsLib.getDocument({ url }).promise;
        if (cancelled) return;
        const total = doc.numPages;
        const shown = Math.min(total, MAX_PAGES);
        for (let i = 1; i <= shown; i++) {
          const page = await doc.getPage(i);
          if (cancelled) return;
          const containerWidth = holder.clientWidth || 560;
          const base = page.getViewport({ scale: 1 });
          const scale = (containerWidth / base.width) * (window.devicePixelRatio > 1 ? 2 : 1.4);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.borderRadius = "6px";
          canvas.style.marginBottom = "8px";
          canvas.style.background = "#fff";
          await page.render({ canvas, viewport }).promise;
          if (cancelled) return;
          holder.appendChild(canvas);
        }
        setPageInfo({ shown, total });
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div>
      {state === "loading" ? (
        <p className="py-6 text-center text-[12px] text-white/45">Loading PDF preview…</p>
      ) : null}
      {state === "error" ? (
        <p className="py-4 text-center text-[12px] text-white/50">
          Couldn&apos;t render the PDF here —{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#7aa2ff] hover:underline">
            open {name} in a new tab ↗
          </a>
        </p>
      ) : null}
      <div ref={holderRef} className="max-h-[520px] overflow-y-auto" />
      {state === "ready" && pageInfo && pageInfo.total > pageInfo.shown ? (
        <p className="mt-1 text-center text-[11px] text-white/40">
          Showing {pageInfo.shown} of {pageInfo.total} pages —{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#7aa2ff] hover:underline">
            open full PDF ↗
          </a>
        </p>
      ) : null}
    </div>
  );
}
