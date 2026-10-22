import type { Role } from "@/lib/db/schema";

/** Permission matrix used by the admin area, navigation and server actions. Pure module: safe for client components. */
export const PERMISSIONS: Record<string, Role[]> = {
  "admin.view": ["super_admin", "academy_manager", "content_creator", "instructor", "compliance_reviewer", "research_editor"],
  "content.edit": ["super_admin", "academy_manager", "content_creator", "research_editor"],
  "content.approve": ["super_admin", "academy_manager", "compliance_reviewer"],
  "fund.approve": ["super_admin", "compliance_reviewer"],
  "events.manage": ["super_admin", "academy_manager", "instructor"],
  "events.checkin": ["super_admin", "academy_manager", "instructor"],
  "institutions.manage": ["super_admin", "academy_manager"],
  "engagement.view": ["super_admin", "academy_manager"],
  "users.manage": ["super_admin"],
  "audit.view": ["super_admin", "compliance_reviewer", "academy_manager"],
  "ai.view": ["super_admin", "compliance_reviewer", "academy_manager"],
  "analytics.view": ["super_admin", "academy_manager", "research_editor"],
};

const STAFF: Role[] = ["super_admin", "academy_manager", "content_creator", "instructor", "compliance_reviewer", "research_editor"];

export function isStaff(role: Role | undefined | null) { return !!role && STAFF.includes(role); }
export function isAdmin(role: Role | undefined | null) { return role === "super_admin" || role === "academy_manager"; }
export function canApproveFundContent(role: Role | undefined | null) { return role === "super_admin" || role === "compliance_reviewer"; }
export function can(role: Role | undefined | null, permission: keyof typeof PERMISSIONS): boolean {
  if (!role) return false;
  return PERMISSIONS[permission]?.includes(role) ?? false;
}
