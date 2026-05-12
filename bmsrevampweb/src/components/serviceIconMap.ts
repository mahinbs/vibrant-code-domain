import {
  AiAutomationIcon,
  AiCallIcon,
  DesignIcon,
  MobileIcon,
  SaasIcon,
  WebAppIcon,
} from "./icons";

export const serviceIconMap = {
  web: WebAppIcon,
  saas: SaasIcon,
  mobile: MobileIcon,
  "ai-calling": AiCallIcon,
  "ai-automation": AiAutomationIcon,
  design: DesignIcon,
} as const;
