import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export const SkillSchema = z.object({
  name: z.string().optional(),
});

export const EducationSchema = z.object({
  school: z.string().optional(),
  degree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
});

export const WorkExperienceSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
});

export const CertificationSchema = z.object({
  name: z.string().optional(),
  authority: z.string().optional(),
  date: z.string().optional(),
});


export const ResumeSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  contact: ContactSchema,
  skills: z.array(SkillSchema),
  education: z.array(EducationSchema),
  workExperience: z.array(WorkExperienceSchema),
  projects: z.array(ProjectSchema),
  certifications: z.array(CertificationSchema),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
