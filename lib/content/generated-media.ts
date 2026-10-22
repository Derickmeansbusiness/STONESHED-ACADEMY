/**
 * AI-generated concept stills produced with Higgsfield (model gpt_image_2_5) for the demonstration.
 * They depict no real people, offices or staff. Pending Stoneshed brand approval; to be replaced by
 * commissioned photography or re-hosted under /public/images once approved. The CDN was not reachable
 * from the build container, so the files are referenced by URL with a graceful fallback.
 */
export type Still = { key: string; url: string; thumb: string; alt: { en: string; fr: string } };

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3ESHoubvKcTG5tMRKEJfkGOE2eo/";
const s = (key: string, file: string, en: string, fr: string): Still => ({ key, url: `${CDN}${file}.png`, thumb: `${CDN}${file}_min.webp`, alt: { en, fr } });

export const STILLS = {
  lectureHall: s("lecture-hall", "hf_20261022_115101_8b0f81bb-e1ed-4324-85cf-17c8466ae765", "AI-generated concept image: business-school students in Cameroon studying a bond-yield chart", "Image conceptuelle générée par IA : étudiants d'école de commerce au Cameroun étudiant une courbe de taux obligataires"),
  youngProfessional: s("young-professional", "hf_20261022_115101_f86d0b56-d03f-4e04-a69b-c6819f8af7be", "AI-generated concept image: a young professional in Douala learning about investing on her phone", "Image conceptuelle générée par IA : une jeune professionnelle à Douala apprenant l'investissement sur son téléphone"),
  businessOwner: s("business-owner", "hf_20261022_115100_ddefe0bf-c5d6-473c-ac79-11ce8cabdda1", "AI-generated concept image: a small-business owner reviewing cash-flow and treasury decisions", "Image conceptuelle générée par IA : un chef de PME examinant des décisions de trésorerie"),
  analysts: s("analysts", "hf_20261022_115100_61d75427-c955-483e-8309-42c8c0c6bf45", "AI-generated concept image: a portfolio management team reviewing bond-yield curves", "Image conceptuelle générée par IA : une équipe de gestion de portefeuille examinant des courbes de taux"),
  studio: s("studio", "hf_20261022_115059_f5b5194c-d74b-42d1-8237-815dd6bc85b6", "AI-generated concept image: a financial education video studio with an abstract data wall", "Image conceptuelle générée par IA : un studio vidéo d'éducation financière avec un mur de données abstrait"),
  doualaDawn: s("douala-dawn", "hf_20261022_115102_8b30b5d2-bc03-4eeb-bc49-09881a8d6341", "AI-generated concept image: Douala and the Wouri bridge at dawn", "Image conceptuelle générée par IA : Douala et le pont sur le Wouri à l'aube"),
};
