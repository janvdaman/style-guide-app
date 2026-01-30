// src/App.tsx
import { useState } from "react";

/**
 * ---- 1️⃣ Question definitions -----------------------------------------
 */
const questions = [
  {
    id: "skinTone",
    label: "What’s your skin tone?",
    options: ["Warm", "Cool", "Neutral"],
  },
  {
    id: "colorPalette",
    label: "Preferred color palette?",
    options: ["Vibrant", "Muted", "Pastel"],
  },
  {
    id: "pattern",
    label: "Favorite pattern?",
    options: ["Stripes", "Floral", "Polka dots", "Solid"],
  },
  {
    id: "bodyShape",
    label: "Body shape?",
    options: ["Pear", "Apple", "Rectangle", "Hourglass"],
  },
  {
    id: "occasion",
    label: "Occasion?",
    options: ["Work", "Casual", "Formal"],
  },
] as const;

/**
 * ---- 2️⃣ Decision matrix -----------------------------------------------
 *
 * For demo purposes we keep the mapping tiny.  
 * In a real app you’d pull this from a database or service.
 */
const styleMap = {
  skinTone: {
    Warm: ["Olive green", "Terracotta"],
    Cool: ["Cobalt blue", "Lavender"],
    Neutral: ["Taupe", "Sage"],
  },
  colorPalette: {
    Vibrant: ["Neon pink", "Electric teal"],
    Muted: ["Dusty rose", "Slate gray"],
    Pastel: ["Powder blue", "Mint green"],
  },
  pattern: {
    Stripes: ["Vertical stripes on a blazer"],
    Floral: ["Floral midi dress"],
    "Polka dots": ["Polka dot blouse"],
    Solid: ["Solid‑color jumpsuit"],
  },
  bodyShape: {
    Pear: ["A‑line skirt", "Peplum top"],
    Apple: ["V‑neck sweater", "Wide‑leg pants"],
    Rectangle: ["Structured blazer", "Cropped jacket"],
    Hourglass: ["Wrap dress", "High‑waist trousers"],
  },
  occasion: {
    Work: ["Tailored sheath dress", "Classic blouse & slacks"],
    Casual: ["Denim jacket + tee", "Chinos + polo"],
    Formal: ["Evening gown", "Tuxedo suit"],
  },
} as const;

/**
 * ---- 3️⃣ Helper to merge suggestions -----------------------------------
 */
function aggregateSuggestions(answers: Record<string, string>) {
  const suggestions = new Set<string>();

  for (const key of Object.keys(answers) as Array<keyof typeof answers>) {
    const answer = answers[key];
    // @ts-ignore – dynamic access
    const list = styleMap[key][answer] ?? [];
<<<<<<< HEAD
    list.forEach((s: string) => suggestions.add(s));
=======
    list.forEach((s) => suggestions.add(s));
>>>>>>> 4d8c363 (Initial Vite + React + Tailwind skeleton)
  }

  return Array.from(suggestions);
}

<<<<<<< HEAD

=======
>>>>>>> 4d8c363 (Initial Vite + React + Tailwind skeleton)
/**
 * ---- 4️⃣ Main App component ---------------------------------------------
 */
export default function App() {
  // State for each answer
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Derived summary (runs every render)
  const suggestions = aggregateSuggestions(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <header className="bg-indigo-600 text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Your Personal Style Guide</h1>
        </header>

        {/* Body */}
        <main className="p-6 space-y-6">
          {/* ------------- Questionnaire ------------------- */}
          <section aria-labelledby="questionnaire-heading">
            <h2 id="questionnaire-heading" className="text-xl font-semibold mb-4">
              Quick Style Quiz
            </h2>

            {questions.map((q) => (
              <div key={q.id} className="mb-4">
                <label htmlFor={q.id} className="block text-gray-700 font-medium mb-1">
                  {q.label}
                </label>
                <select
                  id={q.id}
                  value={answers[q.id] ?? ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.id]: e.target.value })
                  }
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="" disabled>
                    -- choose --
                  </option>
                  {q.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Show summary only when all questions answered */}
            {Object.keys(answers).length === questions.length && (
              <button
                type="button"
                onClick={() => alert("You can now download the PDF!")}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                See my style summary
              </button>
            )}
          </section>

          {/* ------------- Instant Summary ------------------- */}
          {Object.keys(answers).length === questions.length && (
            <section aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="text-xl font-semibold mb-4">
                Your Free Style Snapshot
              </h2>
              <div
                id="summary"
                className="bg-gray-50 p-4 rounded-md space-y-3 text-sm text-gray-800"
              >
                {/* Suggested colors */}
                <div>
                  <strong>Colors that flatter you:</strong>{" "}
                  {suggestions.filter((s) => /^(Olive|Terracotta|Cobalt|Lavender|Taupe|Sage|Neon|Electric|Dusty|Slate|Powder|Mint)/.test(s)).join(", ")}
                </div>

                {/* Suggested patterns */}
                <div>
                  <strong>Pattern ideas:</strong>{" "}
                  {suggestions.filter((s) => /Stripes|Floral|Polka|Solid/.test(s)).join("; ")}
                </div>

                {/* Clothing suggestions */}
                <div>
                  <strong>Outfit suggestions for your body shape & occasion:</strong>{" "}
                  {suggestions.filter(
                    (s) =>
                      !/^(Olive|Terracotta|Cobalt|Lavender|Taupe|Sage|Neon|Electric|Dusty|Slate|Powder|Mint)/.test(s)
                  ).join("; ")}
                </div>
              </div>

              {/* PDF button placeholder */}
              <button
                type="button"
                onClick={() => alert("PDF download will trigger here")}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Get Full PDF ($9.99)
              </button>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
          Powered by Vite + React + Tailwind
        </footer>
      </div>
    </div>
  );
}
