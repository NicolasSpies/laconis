import type { Metadata } from "next";
import { LabClient } from "@/components/lab/LabClient";

/** prototyp-route · nicht verlinkt, nicht im sitemap, nicht indexiert */
export const metadata: Metadata = {
  title: "lab · prototyp",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <LabClient />;
}
