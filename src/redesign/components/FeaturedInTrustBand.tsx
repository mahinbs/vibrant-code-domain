import type { PressItem } from "../founderPartnership/components/FounderTrustPress";
import { FounderTrustPress } from "../founderPartnership/components/FounderTrustPress";
import { TrustMetricsRow, type TrustMetric } from "./TrustMetricsRow";

type FeaturedInTrustBandProps = {
  pressItems: PressItem[];
  metrics: readonly TrustMetric[];
};

export function FeaturedInTrustBand({ pressItems, metrics }: FeaturedInTrustBandProps) {
  return (
    <section
      className="w-full max-w-[1920px] px-5 py-6 md:px-10 md:py-10"
      aria-label="Trust and credibility"
    >
      <FounderTrustPress items={pressItems} separated />
      <TrustMetricsRow items={metrics} />
    </section>
  );
}
