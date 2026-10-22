import type { FundField } from "@/lib/db/schema";

/**
 * Source-controlled fund data for the Mutual Funds Education Center.
 *
 * Every value carries its source and status. Only values the master brief supplies as
 * brochure-level facts are marked "approved". Items the regulatory documents would normally
 * define (fees, NAV frequency, redemption notice, liquidity restrictions) are marked
 * "not_supplied" because the brochure, the management regulations and the information
 * documents were NOT attached to the project. A compliance reviewer must load them and
 * resolve the open flags before publication.
 */

const BROCHURE = "Stoneshed mutual fund brochure (reference copy not attached — values quoted from the project brief)";
const INFO_GOLD = "FCP Stoneshed Gold — information document (not attached)";
const INFO_CLASSIC = "FCP Stoneshed Classic — information document (not attached)";

function shared(infoDoc: string): FundField[] {
  return [
    { key: "manager", labelEn: "Management company", labelFr: "Société de gestion", valueEn: "Stoneshed Asset Management S.A. (COSUMAF-SGP-03/2023)", valueFr: "Stoneshed Asset Management S.A. (COSUMAF-SGP-03/2023)", source: BROCHURE, status: "approved" },
    { key: "classification", labelEn: "Classification", labelFr: "Classification", valueEn: "Bonds and other debt securities", valueFr: "Obligations et autres titres de créance", source: BROCHURE, status: "approved" },
    { key: "min_subscription", labelEn: "Minimum initial subscription", labelFr: "Souscription initiale minimale", valueEn: "10,000 FCFA", valueFr: "10 000 FCFA", source: BROCHURE, status: "approved" },
    { key: "horizon", labelEn: "Recommended investment horizon", labelFr: "Durée de placement recommandée", valueEn: "3 years", valueFr: "3 ans", source: BROCHURE, status: "approved" },
    { key: "depositary", labelEn: "Depositary", labelFr: "Dépositaire", valueEn: "Ecobank Cameroon", valueFr: "Ecobank Cameroun", source: BROCHURE, status: "approved" },
    { key: "auditor", labelEn: "Statutory auditor", labelFr: "Commissaire aux comptes", valueEn: "Moore Stephens CA", valueFr: "Moore Stephens CA", source: BROCHURE, status: "approved" },
    { key: "target_yield", labelEn: "Target yield (objective, not guaranteed)", labelFr: "Rendement cible (objectif, non garanti)", valueEn: "6% — stated in the brochure as a target. Not a guaranteed return, historical performance, current NAV yield or regulator-approved forecast.", valueFr: "6 % — présenté dans la brochure comme un objectif. Ni rendement garanti, ni performance passée, ni rendement actuel de la valeur liquidative, ni prévision approuvée par le régulateur.", source: BROCHURE, status: "approved", note: "Display only with the qualifying statement." },
    { key: "objective", labelEn: "Investment objective", labelFr: "Objectif de gestion", valueEn: "To be transcribed from the information document.", valueFr: "À transcrire depuis le document d'information.", source: infoDoc, status: "not_supplied" },
    { key: "strategy", labelEn: "Investment strategy", labelFr: "Stratégie d'investissement", valueEn: "Debt-oriented portfolio (government securities and other debt instruments). Detailed allocation limits to be transcribed from the management regulations.", valueFr: "Portefeuille orienté titres de créance (titres publics et autres instruments de dette). Limites d'allocation détaillées à transcrire depuis le règlement de gestion.", source: infoDoc, status: "pending_verification" },
    { key: "nav_frequency", labelEn: "NAV calculation frequency", labelFr: "Fréquence de calcul de la valeur liquidative", valueEn: "Not supplied", valueFr: "Non fourni", source: infoDoc, status: "not_supplied", note: "Compare brochure vs information document before publishing." },
    { key: "subscription_fee", labelEn: "Subscription (entry) fee", labelFr: "Droits d'entrée", valueEn: "Not supplied", valueFr: "Non fourni", source: infoDoc, status: "not_supplied" },
    { key: "redemption_fee", labelEn: "Redemption (exit) fee", labelFr: "Droits de sortie", valueEn: "Not supplied", valueFr: "Non fourni", source: infoDoc, status: "not_supplied" },
    { key: "management_fee", labelEn: "Management fee", labelFr: "Frais de gestion", valueEn: "Not supplied", valueFr: "Non fourni", source: infoDoc, status: "not_supplied" },
    { key: "redemption_terms", labelEn: "Redemption procedure and notice", labelFr: "Procédure et délai de rachat", valueEn: "Not supplied", valueFr: "Non fourni", source: infoDoc, status: "not_supplied", note: "Check for any lock-up or liquidity restriction across documents." },
    { key: "subscription_process", labelEn: "Subscription procedure", labelFr: "Procédure de souscription", valueEn: "Through Stoneshed Asset Management's approved process and the depositary. The Academy does not receive funds.", valueFr: "Via le processus approuvé de Stoneshed Asset Management et le dépositaire. L'Academy ne reçoit aucun fonds.", source: BROCHURE, status: "approved" },
  ];
}

export const FUNDS = [
  {
    slug: "stoneshed-classic",
    officialName: "FCP STONESHED CLASSIC",
    shortName: "Stoneshed Classic",
    fundType: "capitalization" as const,
    cosumafFundRef: "COSUMAF-FCP-01/2026",
    cosumafVisaRef: "COSUMAF-APE-FCP-01/2026",
    theme: "blue",
    sortOrder: 1,
    fields: [
      { key: "fund_type", labelEn: "Fund type", labelFr: "Type de fonds", valueEn: "Capitalisation fund — income earned by the fund is reinvested.", valueFr: "Fonds de capitalisation — les revenus du fonds sont réinvestis.", source: BROCHURE, status: "approved" },
      { key: "income_treatment", labelEn: "Income treatment", labelFr: "Affectation des revenus", valueEn: "Reinvested (capitalised) in the fund; reflected in the unit value.", valueFr: "Réinvestis (capitalisés) dans le fonds ; reflétés dans la valeur de la part.", source: BROCHURE, status: "approved" },
      ...shared(INFO_CLASSIC),
    ] as FundField[],
    docs: [
      { titleEn: "Stoneshed mutual fund brochure", titleFr: "Brochure des FCP Stoneshed", docType: "brochure" },
      { titleEn: "FCP Stoneshed Classic — information document", titleFr: "FCP Stoneshed Classic — document d'information", docType: "information_document" },
    ],
  },
  {
    slug: "stoneshed-gold",
    officialName: "FCP STONESHED GOLD",
    shortName: "Stoneshed Gold",
    fundType: "distribution" as const,
    cosumafFundRef: "COSUMAF-FCP-02/2026",
    cosumafVisaRef: "COSUMAF-APE-FCP-02/2026",
    theme: "midnight",
    sortOrder: 2,
    fields: [
      { key: "fund_type", labelEn: "Fund type", labelFr: "Type de fonds", valueEn: "Distribution fund — income earned by the fund is paid out to unitholders annually.", valueFr: "Fonds de distribution — les revenus du fonds sont versés annuellement aux porteurs de parts.", source: BROCHURE, status: "approved" },
      { key: "income_treatment", labelEn: "Income treatment", labelFr: "Affectation des revenus", valueEn: "Distributed annually. The distribution decision, amount and date follow the fund's rules and are not guaranteed.", valueFr: "Distribués annuellement. La décision, le montant et la date de distribution suivent les règles du fonds et ne sont pas garantis.", source: BROCHURE, status: "approved" },
      { key: "name_note", labelEn: "About the name", labelFr: "À propos du nom", valueEn: "\"Gold\" is a brand label. The fund is not a physical gold or commodity fund and has no gold-price exposure as its strategy.", valueFr: "« Gold » est une appellation de marque. Le fonds n'est pas un fonds investi en or physique ou en matières premières et n'a pas d'exposition au cours de l'or comme stratégie.", source: BROCHURE, status: "approved" },
      ...shared(INFO_GOLD),
    ] as FundField[],
    docs: [
      { titleEn: "Stoneshed mutual fund brochure", titleFr: "Brochure des FCP Stoneshed", docType: "brochure" },
      { titleEn: "FCP Stoneshed Gold — management regulations", titleFr: "FCP Stoneshed Gold — règlement de gestion", docType: "regulations" },
      { titleEn: "FCP Stoneshed Gold — information document", titleFr: "FCP Stoneshed Gold — document d'information", docType: "information_document" },
    ],
  },
];

/** Open data-governance flags raised automatically at seed time. */
export const FUND_FLAGS = [
  { fundSlug: null, fieldKey: "source_documents", severity: "high", description: "The brochure, FCP Stoneshed Gold management regulations and both information documents referenced in the brief were not attached to the project. All fund values are quoted from the brief only and must be reconciled against the actual documents by a compliance reviewer." },
  { fundSlug: "stoneshed-gold", fieldKey: "nav_frequency", severity: "medium", description: "NAV reporting frequency not supplied. Compare the brochure and the information document; if they differ, escalate before publication." },
  { fundSlug: "stoneshed-classic", fieldKey: "nav_frequency", severity: "medium", description: "NAV reporting frequency not supplied. Compare the brochure and the information document; if they differ, escalate before publication." },
  { fundSlug: "stoneshed-gold", fieldKey: "redemption_terms", severity: "high", description: "Liquidity restrictions, redemption notice and any lock-up are not supplied. The management regulations must be checked against the brochure's 3-year recommended horizon." },
  { fundSlug: "stoneshed-classic", fieldKey: "fees", severity: "high", description: "Subscription, redemption and management fees not supplied. Do not publish fee content until transcribed from the information document and approved." },
  { fundSlug: "stoneshed-gold", fieldKey: "fees", severity: "high", description: "Subscription, redemption and management fees not supplied. Do not publish fee content until transcribed from the information document and approved." },
  { fundSlug: null, fieldKey: "target_yield", severity: "medium", description: "The brochure's 6% target yield must only appear with the qualifying statement (objective, not guaranteed, not historical, not a NAV yield, not a regulator-approved forecast). Confirm wording with compliance." },
  { fundSlug: "stoneshed-gold", fieldKey: "regulations_reference", severity: "high", description: "Management regulations provided for Gold only per the brief; confirm whether Classic's management regulations exist and should also be loaded." },
] as const;

export const FUND_FAQ = [
  { q: { en: "Is my capital guaranteed?", fr: "Mon capital est-il garanti ?" }, a: { en: "No. Both funds invest in bonds and other debt securities whose value can rise or fall. You may get back less than you invested. The target yield in the brochure is an objective, not a promise.", fr: "Non. Les deux fonds investissent en obligations et autres titres de créance dont la valeur peut monter ou baisser. Vous pouvez récupérer moins que votre mise. Le rendement cible de la brochure est un objectif, pas une promesse." } },
  { q: { en: "What is the difference between Classic and Gold?", fr: "Quelle est la différence entre Classic et Gold ?" }, a: { en: "Both hold a bond-oriented portfolio. Classic reinvests the income it earns, so growth accumulates in the unit value. Gold pays its income out to unitholders annually, so the unit value does not carry the distributed amount.", fr: "Les deux détiennent un portefeuille orienté obligations. Classic réinvestit les revenus perçus : la croissance s'accumule dans la valeur de la part. Gold verse ses revenus annuellement aux porteurs de parts : la valeur de la part ne porte pas le montant distribué." } },
  { q: { en: "Does Stoneshed Gold invest in gold?", fr: "Stoneshed Gold investit-il dans l'or ?" }, a: { en: "No. \"Gold\" is a brand name. The fund is classified around bonds and other debt securities and has no gold-price exposure as its strategy.", fr: "Non. « Gold » est un nom de marque. Le fonds est classé en obligations et autres titres de créance et n'a pas d'exposition au cours de l'or comme stratégie." } },
  { q: { en: "How much do I need to start?", fr: "Combien faut-il pour commencer ?" }, a: { en: "The brochure states a minimum initial subscription of 10,000 FCFA.", fr: "La brochure indique une souscription initiale minimale de 10 000 FCFA." } },
  { q: { en: "How long should I stay invested?", fr: "Combien de temps rester investi ?" }, a: { en: "The brochure recommends a holding period of 3 years. A recommended horizon helps you ride out short-term fluctuations; it is not a lock-up and it is not a guarantee of outcome. Redemption conditions are set by the fund's official documents.", fr: "La brochure recommande une durée de détention de 3 ans. Un horizon recommandé aide à traverser les fluctuations de court terme ; ce n'est ni un blocage ni une garantie de résultat. Les conditions de rachat sont fixées par les documents officiels du fonds." } },
  { q: { en: "Can I subscribe through the Academy?", fr: "Puis-je souscrire via l'Academy ?" }, a: { en: "No. The Academy is an educational platform. Subscriptions go through Stoneshed Asset Management's approved process and its depositary, Ecobank Cameroon. You can request a conversation with a Stoneshed adviser from this page.", fr: "Non. L'Academy est une plateforme pédagogique. Les souscriptions passent par le processus approuvé de Stoneshed Asset Management et son dépositaire, Ecobank Cameroun. Vous pouvez demander un échange avec un conseiller Stoneshed depuis cette page." } },
  { q: { en: "Who checks the fund?", fr: "Qui contrôle le fonds ?" }, a: { en: "COSUMAF licenses the management company and visas the funds. Ecobank Cameroon, as depositary, holds the assets and checks the manager's instructions. Moore Stephens CA audits the accounts.", fr: "La COSUMAF agrée la société de gestion et vise les fonds. Ecobank Cameroun, dépositaire, conserve les actifs et contrôle les instructions du gérant. Moore Stephens CA certifie les comptes." } },
];

export const FUND_RISKS = [
  { key: "market", en: "Market and interest-rate risk: bond prices fall when market yields rise, so the NAV can decline.", fr: "Risque de marché et de taux : le prix des obligations baisse lorsque les taux de marché montent ; la valeur liquidative peut donc reculer." },
  { key: "credit", en: "Credit risk: an issuer may fail to pay interest or principal on time.", fr: "Risque de crédit : un émetteur peut ne pas payer les intérêts ou le capital à l'échéance." },
  { key: "liquidity", en: "Liquidity risk: some securities may be hard to sell quickly at a fair price; redemption terms apply.", fr: "Risque de liquidité : certains titres peuvent être difficiles à vendre rapidement à un prix juste ; les conditions de rachat s'appliquent." },
  { key: "capital", en: "Capital risk: the value of units can go down as well as up; you may receive less than you invested.", fr: "Risque en capital : la valeur des parts peut baisser comme monter ; vous pouvez percevoir moins que votre mise." },
  { key: "distribution", en: "Distribution risk (Gold): distributions depend on income actually earned and are not guaranteed in amount or timing.", fr: "Risque de distribution (Gold) : les distributions dépendent des revenus effectivement perçus et ne sont garanties ni en montant ni en date." },
];
