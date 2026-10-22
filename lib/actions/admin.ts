"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import { getSession, can, canApproveFundContent } from "@/lib/auth/session";
import { audit } from "@/lib/services/audit";
import { ROLES, type Role } from "@/lib/db/schema";

async function requireStaff(permission: Parameters<typeof can>[1]) {
  const user = await getSession();
  if (!user || !can(user.role, permission)) throw new Error("forbidden");
  return user;
}

export async function reviewApprovalAction(form: FormData) {
  const user = await requireStaff("content.approve");
  const id = String(form.get("id")), decision = String(form.get("decision")), comment = String(form.get("comment") ?? "").slice(0, 1000), path = String(form.get("path"));
  const row = await db.query.contentApprovals.findFirst({ where: eq(schema.contentApprovals.id, id) });
  if (!row) return;
  if (row.requiresComplianceRole && !canApproveFundContent(user.role)) {
    await audit({ actorId: user.id, actorRole: user.role, action: "approval.denied_insufficient_role", entityType: "content_approval", entityId: id });
    revalidatePath(path);
    return;
  }
  const ORDER = ["draft", "editorial_review", "product_accuracy_review", "compliance_approval", "scheduled", "published", "periodic_review"];
  const idx = ORDER.indexOf(row.stage);
  const nextStage = decision === "approved" ? ORDER[Math.min(ORDER.length - 2, idx + 1)] : decision === "rejected" ? "draft" : row.stage;
  await db.update(schema.contentApprovals).set({ stage: nextStage, reviewerId: user.id, decision, comment: comment || null, updatedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.contentApprovals.id, id));
  if (nextStage === "published" && row.contentType === "fund_data") await db.update(schema.fundDataVersions).set({ publicationStatus: "approved", reviewer: user.fullName, approvalDate: new Date().toISOString().slice(0, 10) }).where(eq(schema.fundDataVersions.id, row.contentId));
  if (nextStage === "published" && row.contentType === "video") await db.update(schema.videos).set({ productionStage: "published", publishedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.videos.id, row.contentId));
  await audit({ actorId: user.id, actorRole: user.role, action: `approval.${decision}`, entityType: "content_approval", entityId: id, metadata: { from: row.stage, to: nextStage, contentType: row.contentType } });
  revalidatePath(path);
}

export async function resolveFlagAction(form: FormData) {
  const user = await requireStaff("fund.approve");
  const id = String(form.get("id")), resolution = String(form.get("resolution") ?? "").slice(0, 1000), path = String(form.get("path"));
  await db.update(schema.fundDataFlags).set({ status: "resolved", resolvedBy: user.fullName, resolution: resolution || null }).where(eq(schema.fundDataFlags.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "fund_flag.resolved", entityType: "fund_data_flag", entityId: id });
  revalidatePath(path);
}

export async function raiseFlagAction(form: FormData) {
  const user = await requireStaff("content.edit");
  const fundId = String(form.get("fundId") || "") || null, fieldKey = String(form.get("fieldKey")), description = String(form.get("description")).slice(0, 1000), severity = String(form.get("severity") ?? "medium"), path = String(form.get("path"));
  if (!fieldKey || !description) return;
  const id = newId("flag");
  await db.insert(schema.fundDataFlags).values({ id, fundId, fieldKey, description, severity, raisedBy: user.fullName });
  await audit({ actorId: user.id, actorRole: user.role, action: "fund_flag.raised", entityType: "fund_data_flag", entityId: id });
  revalidatePath(path);
}

export async function updateUserRoleAction(form: FormData) {
  const user = await requireStaff("users.manage");
  const id = String(form.get("userId")), role = String(form.get("role")) as Role, presenter = form.get("presenter") === "on", path = String(form.get("path"));
  if (!ROLES.includes(role)) return;
  if (id === user.id && role !== "super_admin") return; // cannot demote self
  await db.update(schema.users).set({ role, isDemoPresenter: presenter }).where(eq(schema.users.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "user.role_changed", entityType: "user", entityId: id, metadata: { role, presenter } });
  revalidatePath(path);
}

export async function updateInquiryStatusAction(form: FormData) {
  const user = await requireStaff("engagement.view");
  const kind = String(form.get("kind")), id = String(form.get("id")), status = String(form.get("status")), path = String(form.get("path"));
  if (kind === "adviser") {
    await db.update(schema.adviserInquiries).set({ status, referredTo: status === "referred" ? "Investor relations (placeholder)" : null }).where(eq(schema.adviserInquiries.id, id));
    if (status === "referred") await db.update(schema.consultationRequests).set({ status: "scheduled", crmSyncStatus: process.env.CRM_WEBHOOK_URL ? "pending" : "not_configured" }).where(eq(schema.consultationRequests.inquiryId, id));
  } else {
    await db.update(schema.partnershipInquiries).set({ status, assignedTo: user.fullName }).where(eq(schema.partnershipInquiries.id, id));
  }
  await audit({ actorId: user.id, actorRole: user.role, action: `${kind}_inquiry.status`, entityType: kind, entityId: id, metadata: { status } });
  revalidatePath(path);
}

export async function updateEventStatusAction(form: FormData) {
  const user = await requireStaff("events.manage");
  const id = String(form.get("eventId")), status = String(form.get("status")), capacity = Number(form.get("capacity")), path = String(form.get("path"));
  await db.update(schema.events).set({ status, ...(capacity > 0 ? { capacity } : {}) }).where(eq(schema.events.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "event.updated", entityType: "event", entityId: id, metadata: { status, capacity } });
  revalidatePath(path);
}

export async function updateCourseStatusAction(form: FormData) {
  const user = await requireStaff("content.edit");
  const id = String(form.get("courseId")), status = String(form.get("status")), featured = form.get("featured") === "on", path = String(form.get("path"));
  await db.update(schema.courses).set({ status, featured, updatedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.courses.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "course.updated", entityType: "course", entityId: id, metadata: { status, featured } });
  revalidatePath(path);
}

export async function updateVideoStageAction(form: FormData) {
  const user = await requireStaff("content.edit");
  const id = String(form.get("videoId")), stage = String(form.get("stage")), mediaUrl = String(form.get("mediaUrl") ?? "").trim(), path = String(form.get("path"));
  const video = await db.query.videos.findFirst({ where: eq(schema.videos.id, id) });
  if (!video) return;
  if (stage === "published" && video.isProductSpecific && !canApproveFundContent(user.role)) {
    await audit({ actorId: user.id, actorRole: user.role, action: "video.publish_denied_requires_compliance", entityType: "video", entityId: id });
    revalidatePath(path); return;
  }
  await db.update(schema.videos).set({ productionStage: stage, mediaUrl: mediaUrl || video.mediaUrl, publishedAt: stage === "published" ? Math.floor(Date.now() / 1000) : video.publishedAt }).where(eq(schema.videos.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "video.stage_changed", entityType: "video", entityId: id, metadata: { stage, mediaUrl: !!mediaUrl } });
  revalidatePath(path);
}

export async function revokeCertificateAction(form: FormData) {
  const user = await requireStaff("content.approve");
  const id = String(form.get("certId")), path = String(form.get("path"));
  await db.update(schema.certificates).set({ revokedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.certificates.id, id));
  await audit({ actorId: user.id, actorRole: user.role, action: "certificate.revoked", entityType: "certificate", entityId: id });
  revalidatePath(path);
}
