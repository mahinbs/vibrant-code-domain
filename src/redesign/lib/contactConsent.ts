/** Privacy requests (not the Grievance Officer inbox). */
export const PRIVACY_REQUEST_EMAIL = "boostmysitescom@gmail.com";

export type ContactConsentState = {
  whatsapp: boolean;
  voice: boolean;
};

export type ContactConsentSnapshot = {
  consent_whatsapp: true;
  consent_voice: true;
  consent_at: string;
};

export const emptyContactConsent = (): ContactConsentState => ({
  whatsapp: false,
  voice: false,
});

export function bothConsentsGiven(c: ContactConsentState): boolean {
  return c.whatsapp && c.voice;
}

export function contactConsentSnapshot(c: ContactConsentState): ContactConsentSnapshot | null {
  if (!bothConsentsGiven(c)) return null;
  return {
    consent_whatsapp: true,
    consent_voice: true,
    consent_at: new Date().toISOString(),
  };
}

export const CONSENT_REQUIRED_MESSAGE =
  "Please agree to WhatsApp messages and voice / AI calls to continue.";
