/** Demonstration accounts seeded for the executive walkthrough. All fictional. */
export const DEMO_PASSWORD = "Academy2026!";
export const DEMO_ACCOUNTS = [
  { email: "ceo.demo@stoneshed-academy.test", name: "Executive Presenter (demo)", role: "super_admin", presenter: true, labelEn: "Executive · full access + presentation mode", labelFr: "Direction · accès complet + mode présentation" },
  { email: "manager.demo@stoneshed-academy.test", name: "Academy Manager (demo)", role: "academy_manager", presenter: true, labelEn: "Academy manager", labelFr: "Responsable Academy" },
  { email: "compliance.demo@stoneshed-academy.test", name: "Compliance Reviewer (demo)", role: "compliance_reviewer", presenter: false, labelEn: "Compliance reviewer", labelFr: "Réviseur conformité" },
  { email: "instructor.demo@stoneshed-academy.test", name: "Instructor (demo)", role: "instructor", presenter: false, labelEn: "Instructor · event check-in", labelFr: "Formateur · accueil événements" },
  { email: "coordinator.demo@stoneshed-academy.test", name: "Institution Coordinator (demo)", role: "institutional_coordinator", presenter: false, labelEn: "Institutional coordinator", labelFr: "Coordinateur institutionnel" },
  { email: "learner.demo@stoneshed-academy.test", name: "Amina Learner (demo)", role: "learner", presenter: false, labelEn: "Learner with progress", labelFr: "Apprenante avec progression" },
] as const;
