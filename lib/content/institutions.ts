/**
 * Fictional placeholder institutions and cohorts for the institutional portal demonstration.
 * None of these organisations exist; names carry an explicit "(fictional)" marker.
 */
export const INSTITUTIONS: {
  name: string;
  type: "university" | "business_school" | "professional_body" | "employer" | "public_body";
  city: string;
  country: string;
  status: "prospect" | "active" | "paused";
  cohorts: { name: string; programSlug: string; startDate: string; endDate: string; capacity: number; status: "planned" | "active" | "completed" }[];
}[] = [
  {
    name: "Demo University of Douala (fictional)",
    type: "university",
    city: "Douala",
    country: "Cameroon",
    status: "active",
    cohorts: [
      { name: "Finance L3 — Investing 101, autumn 2026", programSlug: "investing-101", startDate: "2026-10-05", endDate: "2026-12-18", capacity: 120, status: "active" },
      { name: "Master Banking — CEMAC Financial System, spring 2027", programSlug: "introduction-to-the-cemac-financial-system", startDate: "2027-02-01", endDate: "2027-04-30", capacity: 60, status: "planned" },
    ],
  },
  {
    name: "Sample Business School Yaoundé (fictional)",
    type: "business_school",
    city: "Yaoundé",
    country: "Cameroon",
    status: "active",
    cohorts: [
      { name: "MBA cohort — Understanding Money, 2026", programSlug: "understanding-money", startDate: "2026-09-14", endDate: "2026-11-27", capacity: 45, status: "active" },
    ],
  },
  {
    name: "Example Chartered Accountants Association (fictional)",
    type: "professional_body",
    city: "Douala",
    country: "Cameroon",
    status: "prospect",
    cohorts: [
      { name: "Members CPD — What Is a Mutual Fund?, 2027", programSlug: "what-is-a-mutual-fund", startDate: "2027-01-11", endDate: "2027-02-26", capacity: 80, status: "planned" },
    ],
  },
  {
    name: "Placeholder Industries SA (fictional employer)",
    type: "employer",
    city: "Libreville",
    country: "Gabon",
    status: "active",
    cohorts: [
      { name: "Finance team — Cash Flow Management for SMEs, 2026", programSlug: "cash-flow-management-for-smes", startDate: "2026-06-01", endDate: "2026-08-15", capacity: 25, status: "completed" },
      { name: "Finance team — Government Bonds and Treasury Securities, 2027", programSlug: "government-bonds-and-treasury-securities", startDate: "2027-03-01", endDate: "2027-05-15", capacity: 25, status: "planned" },
    ],
  },
];
