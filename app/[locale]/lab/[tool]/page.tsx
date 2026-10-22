import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { LABS } from "@/lib/lab/registry";
import { GrowthLab } from "@/components/lab/growth-lab";
import { CapVsDistLab } from "@/components/lab/cap-vs-dist-lab";
import { InflationLab } from "@/components/lab/inflation-lab";
import { RiskLab } from "@/components/lab/risk-lab";
import { AllocationLab } from "@/components/lab/allocation-lab";
import { FundMechanicsLab } from "@/components/lab/fund-mechanics-lab";
import { BondsLab } from "@/components/lab/bonds-lab";
import { GoalsLab } from "@/components/lab/goals-lab";

export function generateStaticParams() {
  return LABS.flatMap((l) => [{ locale: "en", tool: l.slug }, { locale: "fr", tool: l.slug }]);
}

export default async function LabToolPage({ params }: { params: Promise<{ locale: Locale; tool: string }> }) {
  const { locale, tool } = await params;
  const lab = LABS.find((l) => l.slug === tool);
  if (!lab) notFound();
  const props = { title: lab.title[locale], intro: lab.blurb[locale] };
  switch (lab.slug) {
    case "growth": return <GrowthLab {...props} />;
    case "cap-vs-dist": return <CapVsDistLab {...props} />;
    case "inflation": return <InflationLab {...props} />;
    case "risk": return <RiskLab {...props} />;
    case "allocation": return <AllocationLab {...props} />;
    case "fund-mechanics": return <FundMechanicsLab {...props} />;
    case "bonds": return <BondsLab {...props} />;
    case "goals": return <GoalsLab {...props} />;
  }
}
