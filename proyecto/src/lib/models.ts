import { z } from "zod";

export const CourseId = z.string().min(3);
export const UserId = z.string();

export const CourseSchema = z.object({
  id: CourseId,
  title: z.string(),
  description: z.string().optional(),
  order: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
export type Course = z.infer<typeof CourseSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  courseId: CourseId,
  title: z.string(),
  slug: z.string(),
  order: z.number().int(),
  published: z.boolean().default(false),
  unlockedAt: z.date().optional(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const StudentStateEnum = z.enum(["activo", "inactivo", "graduado"]);
export type StudentState = z.infer<typeof StudentStateEnum>;

export const InviteLinkSchema = z.object({
  id: z.string(),
  courseId: CourseId,
  active: z.boolean(),
  maxUses: z.number().int().positive().optional(),
  used: z.number().int().default(0),
  createdAt: z.date(),
  deactivatedAt: z.date().optional(),
});
export type InviteLink = z.infer<typeof InviteLinkSchema>;
