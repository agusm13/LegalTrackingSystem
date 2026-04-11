// ─────────────────────────────────────────────
// AI SERVICE  (mock — no server needed for MVP)
// Simple client-side mock that returns canned summaries.
// Replace with real API calls when ready.
// ─────────────────────────────────────────────

async function summarizeNote(text) {
  // Simulate a short delay
  await new Promise(r => setTimeout(r, 600));
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  if (sentences.length <= 2) return text.trim();
  return sentences.slice(0, 3).map(s => s.trim()).join(". ") + ".";
}
