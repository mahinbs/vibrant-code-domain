import { motion } from "motion/react";
import { SiteBackground } from "../components/SiteBackground";
import { FounderApplicationWizard } from "../founderPartnership/FounderApplicationWizard";
import { sceneEnter, sceneEnterHidden } from "../founderPartnership/components/FounderSceneMotion";
import "../founderPartnership/founderApplication.css";

export default function FounderPartnershipApplication() {
  return (
    <motion.div
      className="relative min-h-[100dvh] bg-black text-white"
      initial={sceneEnterHidden}
      animate={sceneEnter}
    >
      <SiteBackground />
      <div className="founder-app__wash" aria-hidden />
      <div className="founder-app__accent" aria-hidden />
      <FounderApplicationWizard />
    </motion.div>
  );
}
