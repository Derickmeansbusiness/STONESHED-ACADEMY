import { relations } from "drizzle-orm";
import * as s from "./schema";

export const usersRelations = relations(s.users, ({ one, many }) => ({
  profile: one(s.learnerProfiles, { fields: [s.users.id], references: [s.learnerProfiles.userId] }),
  enrollments: many(s.enrollments),
  certificates: many(s.certificates),
  registrations: many(s.eventRegistrations),
}));
export const learnerProfilesRelations = relations(s.learnerProfiles, ({ one }) => ({ user: one(s.users, { fields: [s.learnerProfiles.userId], references: [s.users.id] }) }));
export const coursesRelations = relations(s.courses, ({ one, many }) => ({
  instructor: one(s.instructors, { fields: [s.courses.instructorId], references: [s.instructors.id] }),
  modules: many(s.courseModules),
  enrollments: many(s.enrollments),
}));
export const modulesRelations = relations(s.courseModules, ({ one, many }) => ({
  course: one(s.courses, { fields: [s.courseModules.courseId], references: [s.courses.id] }),
  lessons: many(s.lessons),
}));
export const lessonsRelations = relations(s.lessons, ({ one }) => ({
  module: one(s.courseModules, { fields: [s.lessons.moduleId], references: [s.courseModules.id] }),
  course: one(s.courses, { fields: [s.lessons.courseId], references: [s.courses.id] }),
}));
export const quizzesRelations = relations(s.quizzes, ({ one, many }) => ({
  lesson: one(s.lessons, { fields: [s.quizzes.lessonId], references: [s.lessons.id] }),
  questions: many(s.questions),
}));
export const questionsRelations = relations(s.questions, ({ one }) => ({ quiz: one(s.quizzes, { fields: [s.questions.quizId], references: [s.quizzes.id] }) }));
export const enrollmentsRelations = relations(s.enrollments, ({ one }) => ({
  user: one(s.users, { fields: [s.enrollments.userId], references: [s.users.id] }),
  course: one(s.courses, { fields: [s.enrollments.courseId], references: [s.courses.id] }),
}));
export const certificatesRelations = relations(s.certificates, ({ one }) => ({
  user: one(s.users, { fields: [s.certificates.userId], references: [s.users.id] }),
  course: one(s.courses, { fields: [s.certificates.courseId], references: [s.courses.id] }),
}));
export const seriesRelations = relations(s.videoSeries, ({ many }) => ({ videos: many(s.videos) }));
export const videosRelations = relations(s.videos, ({ one }) => ({ series: one(s.videoSeries, { fields: [s.videos.seriesId], references: [s.videoSeries.id] }) }));
export const eventsRelations = relations(s.events, ({ many }) => ({ registrations: many(s.eventRegistrations) }));
export const registrationsRelations = relations(s.eventRegistrations, ({ one, many }) => ({
  event: one(s.events, { fields: [s.eventRegistrations.eventId], references: [s.events.id] }),
  user: one(s.users, { fields: [s.eventRegistrations.userId], references: [s.users.id] }),
  attendance: many(s.attendance),
}));
export const attendanceRelations = relations(s.attendance, ({ one }) => ({ registration: one(s.eventRegistrations, { fields: [s.attendance.registrationId], references: [s.eventRegistrations.id] }) }));
export const fundRelations = relations(s.fundProducts, ({ many }) => ({ versions: many(s.fundDataVersions), documents: many(s.fundDocuments) }));
export const fundVersionRelations = relations(s.fundDataVersions, ({ one }) => ({ fund: one(s.fundProducts, { fields: [s.fundDataVersions.fundId], references: [s.fundProducts.id] }) }));
export const fundDocRelations = relations(s.fundDocuments, ({ one }) => ({ fund: one(s.fundProducts, { fields: [s.fundDocuments.fundId], references: [s.fundProducts.id] }) }));
export const institutionRelations = relations(s.institutions, ({ many }) => ({ cohorts: many(s.cohorts), members: many(s.institutionUsers) }));
export const cohortRelations = relations(s.cohorts, ({ one, many }) => ({
  institution: one(s.institutions, { fields: [s.cohorts.institutionId], references: [s.institutions.id] }),
  members: many(s.cohortMembers),
}));
export const cohortMemberRelations = relations(s.cohortMembers, ({ one }) => ({
  cohort: one(s.cohorts, { fields: [s.cohortMembers.cohortId], references: [s.cohorts.id] }),
  user: one(s.users, { fields: [s.cohortMembers.userId], references: [s.users.id] }),
}));
export const institutionUserRelations = relations(s.institutionUsers, ({ one }) => ({
  institution: one(s.institutions, { fields: [s.institutionUsers.institutionId], references: [s.institutions.id] }),
  user: one(s.users, { fields: [s.institutionUsers.userId], references: [s.users.id] }),
}));
export const inquiryRelations = relations(s.adviserInquiries, ({ many }) => ({ consultations: many(s.consultationRequests) }));
export const consultationRelations = relations(s.consultationRequests, ({ one }) => ({ inquiry: one(s.adviserInquiries, { fields: [s.consultationRequests.inquiryId], references: [s.adviserInquiries.id] }) }));
export const lessonNotesRelations = relations(s.lessonNotes, ({ one }) => ({ lesson: one(s.lessons, { fields: [s.lessonNotes.lessonId], references: [s.lessons.id] }) }));
export const lessonProgressRelations = relations(s.lessonProgress, ({ one }) => ({ lesson: one(s.lessons, { fields: [s.lessonProgress.lessonId], references: [s.lessons.id] }) }));
export const videoProgressRelations = relations(s.videoProgress, ({ one }) => ({ video: one(s.videos, { fields: [s.videoProgress.videoId], references: [s.videos.id] }) }));
