/** Prefixes help debug event streams in Meta Test Events. */
export function createMetaEventId(prefix: string): string {
  const slug = prefix.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  return `${slug}_${crypto.randomUUID()}`;
}
