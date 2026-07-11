const GEMINI_API = "https://generativelanguage.googleapis.com/v1beta/models";

export async function geminiGenerate(
  prompt: string,
  systemInstruction?: string,
): Promise<string> {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new Error("GEMINI_API_KEY not configured");

  const model = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.0-flash";
  const res = await fetch(`${GEMINI_API}/${model}:generateContent?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: systemInstruction
        ? { parts: [{ text: systemInstruction }] }
        : undefined,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message ?? "Gemini API error");
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof text === "string" ? text.trim() : "";
}
