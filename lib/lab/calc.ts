/**
 * Investment Lab — pure calculation functions. All outputs are hypothetical educational
 * scenarios; nothing here models an actual Stoneshed fund.
 */

export type GrowthPoint = { year: number; contributions: number; value: number; growth: number };

export function growthSimulation(input: { initial: number; monthly: number; years: number; annualRatePct: number; compounding: "annually" | "quarterly" | "monthly" }): GrowthPoint[] {
  const periodsPerYear = input.compounding === "monthly" ? 12 : input.compounding === "quarterly" ? 4 : 1;
  const r = input.annualRatePct / 100 / periodsPerYear;
  const contribPerPeriod = (input.monthly * 12) / periodsPerYear;
  const points: GrowthPoint[] = [{ year: 0, contributions: input.initial, value: input.initial, growth: 0 }];
  let value = input.initial;
  let contributions = input.initial;
  for (let y = 1; y <= input.years; y++) {
    for (let p = 0; p < periodsPerYear; p++) {
      value = value * (1 + r) + contribPerPeriod;
      contributions += contribPerPeriod;
    }
    points.push({ year: y, contributions: Math.round(contributions), value: Math.round(value), growth: Math.round(value - contributions) });
  }
  return points;
}

export type CapVsDistPoint = { year: number; capValue: number; distValue: number; distIncomeCumulative: number; distIncomeYear: number };

/** Side-by-side: reinvesting earnings versus paying them out annually at the same hypothetical rate. */
export function capitalisationVsDistribution(input: { initial: number; years: number; annualRatePct: number; payoutPct: number }): CapVsDistPoint[] {
  const r = input.annualRatePct / 100;
  const payout = Math.min(1, Math.max(0, input.payoutPct / 100));
  const out: CapVsDistPoint[] = [{ year: 0, capValue: input.initial, distValue: input.initial, distIncomeCumulative: 0, distIncomeYear: 0 }];
  let cap = input.initial, dist = input.initial, cum = 0;
  for (let y = 1; y <= input.years; y++) {
    cap = cap * (1 + r);
    const earned = dist * r;
    const paid = earned * payout;
    dist = dist + earned - paid;
    cum += paid;
    out.push({ year: y, capValue: Math.round(cap), distValue: Math.round(dist), distIncomeCumulative: Math.round(cum), distIncomeYear: Math.round(paid) });
  }
  return out;
}

export type InflationPoint = { year: number; nominal: number; real: number; priceLevel: number };

export function inflationErosion(input: { amount: number; inflationPct: number; years: number; nominalGrowthPct?: number }): InflationPoint[] {
  const i = input.inflationPct / 100;
  const g = (input.nominalGrowthPct ?? 0) / 100;
  const out: InflationPoint[] = [];
  for (let y = 0; y <= input.years; y++) {
    const nominal = input.amount * Math.pow(1 + g, y);
    const priceLevel = Math.pow(1 + i, y);
    out.push({ year: y, nominal: Math.round(nominal), real: Math.round(nominal / priceLevel), priceLevel });
  }
  return out;
}

/** Bond price for a given yield, annual coupons. Face value 10,000 FCFA by default (CEMAC sovereign bonds are commonly issued in 10,000 FCFA units). */
export function bondPrice(input: { face?: number; couponPct: number; yearsToMaturity: number; marketYieldPct: number; frequency?: number }) {
  const face = input.face ?? 10_000;
  const f = input.frequency ?? 1;
  const c = (face * input.couponPct) / 100 / f;
  const y = input.marketYieldPct / 100 / f;
  const n = Math.round(input.yearsToMaturity * f);
  let pv = 0;
  for (let k = 1; k <= n; k++) pv += c / Math.pow(1 + y, k);
  pv += face / Math.pow(1 + y, n);
  return pv;
}

export function bondPriceCurve(input: { couponPct: number; yearsToMaturity: number; face?: number }) {
  const pts: { yieldPct: number; price: number }[] = [];
  for (let yp = 1; yp <= 15; yp += 0.5) pts.push({ yieldPct: yp, price: Math.round(bondPrice({ ...input, marketYieldPct: yp })) });
  return pts;
}

export function macaulayDuration(input: { couponPct: number; yearsToMaturity: number; marketYieldPct: number; face?: number }) {
  const face = input.face ?? 10_000;
  const c = (face * input.couponPct) / 100;
  const y = input.marketYieldPct / 100;
  const n = Math.round(input.yearsToMaturity);
  let pvSum = 0, weighted = 0;
  for (let k = 1; k <= n; k++) {
    const cf = k === n ? c + face : c;
    const pv = cf / Math.pow(1 + y, k);
    pvSum += pv; weighted += k * pv;
  }
  return weighted / pvSum;
}

// Asset allocation studio — educational, generic asset classes with illustrative characteristics.
export type AssetClass = { key: string; labelEn: string; labelFr: string; expectedReturnPct: number; volatilityPct: number; liquidity: "high" | "medium" | "low"; color: string };
export const ASSET_CLASSES: AssetClass[] = [
  { key: "cash", labelEn: "Cash & deposits", labelFr: "Liquidités & dépôts", expectedReturnPct: 2.5, volatilityPct: 0.5, liquidity: "high", color: "#58B8F5" },
  { key: "tbills", labelEn: "Treasury bills", labelFr: "Bons du Trésor", expectedReturnPct: 4, volatilityPct: 1, liquidity: "high", color: "#1265C8" },
  { key: "bonds", labelEn: "Government & corporate bonds", labelFr: "Obligations d'État & d'entreprise", expectedReturnPct: 6, volatilityPct: 4, liquidity: "medium", color: "#0B2F73" },
  { key: "equity", labelEn: "Listed equities", labelFr: "Actions cotées", expectedReturnPct: 9, volatilityPct: 18, liquidity: "medium", color: "#E0A526" },
  { key: "property", labelEn: "Real estate", labelFr: "Immobilier", expectedReturnPct: 7, volatilityPct: 10, liquidity: "low", color: "#1F9D6A" },
  { key: "business", labelEn: "Private business", labelFr: "Entreprise privée", expectedReturnPct: 12, volatilityPct: 30, liquidity: "low", color: "#C9403B" },
];

export function portfolioStats(weights: Record<string, number>) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  let ret = 0, vol = 0, maxW = 0, liq = 0;
  for (const a of ASSET_CLASSES) {
    const w = (weights[a.key] ?? 0) / total;
    ret += w * a.expectedReturnPct;
    vol += w * a.volatilityPct; // simplified (no correlation matrix) — stated in the UI
    maxW = Math.max(maxW, w);
    liq += w * (a.liquidity === "high" ? 1 : a.liquidity === "medium" ? 0.6 : 0.2);
  }
  const n = Object.values(weights).filter((w) => w > 0).length;
  const concentration = Object.values(weights).reduce((s, w) => s + Math.pow(w / total, 2), 0); // Herfindahl
  return { expectedReturnPct: ret, volatilityPct: vol, maxWeight: maxW, liquidityScore: liq, holdings: n, concentration };
}

export function scenarioShock(weights: Record<string, number>, scenario: "rates_up" | "equity_crash" | "liquidity_squeeze" | "inflation_spike") {
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const shock: Record<string, number> = {
    rates_up: { cash: 0.5, tbills: 0, bonds: -6, equity: -8, property: -5, business: -4 },
    equity_crash: { cash: 0, tbills: 0, bonds: 1, equity: -30, property: -8, business: -20 },
    liquidity_squeeze: { cash: 0, tbills: -0.5, bonds: -3, equity: -12, property: -15, business: -25 },
    inflation_spike: { cash: -4, tbills: -2, bonds: -5, equity: -3, property: 2, business: 0 },
  }[scenario];
  let impact = 0;
  for (const k of Object.keys(shock)) impact += ((weights[k] ?? 0) / total) * shock[k];
  return impact;
}

export type GoalPlan = { year: number; balance: number; target: number; realTarget: number };

export function goalPlan(input: { target: number; years: number; initial: number; monthly: number; annualRatePct: number; inflationPct: number }) {
  const pts: GoalPlan[] = [];
  let bal = input.initial;
  const r = input.annualRatePct / 100 / 12;
  for (let y = 0; y <= input.years; y++) {
    if (y > 0) for (let m = 0; m < 12; m++) bal = bal * (1 + r) + input.monthly;
    pts.push({ year: y, balance: Math.round(bal), target: input.target, realTarget: Math.round(input.target * Math.pow(1 + input.inflationPct / 100, y)) });
  }
  const inflatedTarget = input.target * Math.pow(1 + input.inflationPct / 100, input.years);
  // Required monthly contribution to hit inflated target
  const n = input.years * 12;
  const fvInitial = input.initial * Math.pow(1 + r, n);
  const annuityFactor = r === 0 ? n : (Math.pow(1 + r, n) - 1) / r;
  const requiredMonthly = Math.max(0, (inflatedTarget - fvInitial) / annuityFactor);
  return { points: pts, inflatedTarget: Math.round(inflatedTarget), requiredMonthly: Math.round(requiredMonthly), reached: bal >= inflatedTarget };
}

export const RISK_TYPES = [
  { key: "market", labelEn: "Market risk", labelFr: "Risque de marché", en: "The value of investments moves with overall market conditions. Even a diversified bond fund's NAV can fall when yields rise across the market.", fr: "La valeur des investissements évolue avec les conditions générales du marché. Même la valeur liquidative d'un fonds obligataire diversifié peut baisser lorsque les taux montent sur l'ensemble du marché.", scenarioEn: "Regional yields rise by 1 percentage point. A bond portfolio with a 4-year duration falls roughly 4% in value, before coupons.", scenarioFr: "Les taux régionaux montent d'un point de pourcentage. Un portefeuille obligataire de duration 4 ans perd environ 4 % de sa valeur, avant coupons.", impact: -4 },
  { key: "credit", labelEn: "Credit risk", labelFr: "Risque de crédit", en: "The issuer of a bond may fail to pay interest or repay principal on time. Sovereign issuers and corporate issuers carry different degrees of this risk.", fr: "L'émetteur d'une obligation peut ne pas payer les intérêts ou rembourser le capital à temps. Les émetteurs souverains et les entreprises présentent des degrés de risque différents.", scenarioEn: "One corporate issuer representing 5% of the fund delays repayment. The fund marks that holding down by 40%, a 2% hit to NAV.", scenarioFr: "Un émetteur privé représentant 5 % du fonds retarde son remboursement. Le fonds déprécie cette ligne de 40 %, soit un impact de 2 % sur la valeur liquidative.", impact: -2 },
  { key: "rate", labelEn: "Interest rate risk", labelFr: "Risque de taux", en: "Bond prices move inversely to interest rates. Longer maturities are more sensitive.", fr: "Le prix des obligations évolue à l'inverse des taux d'intérêt. Les maturités longues sont plus sensibles.", scenarioEn: "BEAC tightens policy; new bonds pay more. Existing bonds in the fund become less attractive and are valued lower until maturity.", scenarioFr: "La BEAC resserre sa politique ; les nouvelles obligations paient davantage. Les obligations existantes du fonds deviennent moins attractives et sont valorisées plus bas jusqu'à l'échéance.", impact: -3 },
  { key: "liquidity", labelEn: "Liquidity risk", labelFr: "Risque de liquidité", en: "Some assets cannot be sold quickly at a fair price. Funds manage this with liquid holdings and redemption rules, which is why holding periods and notice periods matter.", fr: "Certains actifs ne peuvent pas être vendus rapidement à un prix juste. Les fonds gèrent ce risque avec des actifs liquides et des règles de rachat, d'où l'importance des durées de détention et des délais de préavis.", scenarioEn: "Many investors redeem at once in a thin market. The fund sells its most liquid assets first; remaining investors hold a less liquid mix.", scenarioFr: "De nombreux investisseurs demandent un rachat simultané sur un marché étroit. Le fonds vend d'abord ses actifs les plus liquides ; les investisseurs restants détiennent un portefeuille moins liquide.", impact: -1.5 },
  { key: "currency", labelEn: "Currency risk", labelFr: "Risque de change", en: "Assets denominated in another currency change value as exchange rates move. The FCFA's fixed parity with the euro reduces, but does not eliminate, this risk for CEMAC investors.", fr: "Les actifs libellés dans une autre devise changent de valeur avec les taux de change. La parité fixe du FCFA avec l'euro réduit ce risque pour les investisseurs de la CEMAC, sans l'éliminer.", scenarioEn: "A diaspora investor earning in US dollars sees the dollar fall 8% against the euro. Their FCFA investment is worth 8% more in dollars; the reverse is equally possible.", scenarioFr: "Un investisseur de la diaspora gagnant en dollars voit le dollar baisser de 8 % face à l'euro. Son investissement en FCFA vaut 8 % de plus en dollars ; l'inverse est tout aussi possible.", impact: 0 },
  { key: "concentration", labelEn: "Concentration risk", labelFr: "Risque de concentration", en: "Holding too much in one issuer, sector or asset magnifies the effect of a single bad outcome. Diversification is the main defence.", fr: "Détenir une part trop importante d'un même émetteur, secteur ou actif amplifie l'effet d'un seul mauvais résultat. La diversification est la principale défense.", scenarioEn: "A saver keeps 80% of their wealth in one family business. A bad year for that business is a bad year for everything they own.", scenarioFr: "Un épargnant conserve 80 % de son patrimoine dans une seule entreprise familiale. Une mauvaise année pour cette entreprise est une mauvaise année pour tout son patrimoine.", impact: -6 },
] as const;
