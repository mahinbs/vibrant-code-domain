import { FounderTrustPress } from "./FounderTrustPress";
import { FounderTrustFounder } from "./FounderTrustFounder";
import { FounderTrustCeo } from "./FounderTrustCeo";
import { FounderTrustSocials } from "./FounderTrustSocials";
import { FounderStaggerGroup, FounderStaggerItem } from "./FounderSceneMotion";

export function FounderTrustBand() {
  return (
    <FounderStaggerGroup className="mt-4 flex w-full flex-col gap-2.5">
      <FounderStaggerItem>
        <FounderTrustPress />
      </FounderStaggerItem>
      <FounderStaggerItem>
        <FounderTrustFounder />
      </FounderStaggerItem>
      <FounderStaggerItem>
        <FounderTrustCeo />
      </FounderStaggerItem>
      <FounderStaggerItem>
        <FounderTrustSocials />
      </FounderStaggerItem>
    </FounderStaggerGroup>
  );
}
