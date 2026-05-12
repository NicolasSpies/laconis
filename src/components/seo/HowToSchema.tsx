/**
 * HowToSchema — schema.org HowTo als JSON-LD.
 * Google + AI-Search nutzen das für strukturierte step-by-step rich-results
 * und zitierfähige Prozess-Beschreibungen (GEO-Boost).
 *
 * Usage:
 *   <HowToSchema
 *     name="So läuft ein Projekt bei laconis ab"
 *     description="Vom Erstgespräch zur Übergabe."
 *     totalTime="P6W"   // ISO 8601 duration · 6 wochen typisch
 *     steps={[
 *       { name: "kennenlernen", text: "30 min video-call …", duration: "P1D" },
 *       ...
 *     ]}
 *   />
 */

type Step = {
  name: string;
  text: string;
  /** ISO 8601 duration string (z.B. "P1D", "P1W", "P3W") */
  duration?: string;
  url?: string;
};

type Props = {
  name: string;
  description: string;
  totalTime?: string;
  steps: Step[];
};

export function HowToSchema({ name, description, totalTime, steps }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      ...(s.duration ? { performTime: s.duration } : {}),
      ...(s.url ? { url: s.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
