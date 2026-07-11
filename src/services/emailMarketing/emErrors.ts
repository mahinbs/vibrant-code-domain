/** Format Supabase / PostgREST errors for admin toasts. */
export function emErrorMessage(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { message?: string; details?: string; hint?: string; code?: string };
    const parts = [e.message, e.details, e.hint].filter(Boolean);
    if (parts.length) return parts.join(" — ");
  }
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export function isBranchesMigrationMissing(err: unknown): boolean {
  const msg = emErrorMessage(err).toLowerCase();
  return (
    msg.includes("branch_lane") ||
    msg.includes("branch_after_step_order") ||
    msg.includes("last_skip_reason")
  );
}
