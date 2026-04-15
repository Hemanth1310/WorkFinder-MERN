import { z } from 'zod';
import { Role, JobType, Experience, Category } from '../../generated/prisma/enums.js';
const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "Please enter atleast one special charecter e.g. !@#$%^&*");



export const roleSchema = z.enum(Role)
export const jobTypeSchema = z.enum(JobType)
export const experienceSchema = z.enum(Experience)
export const categorySchema = z.enum(Category)
export type RoleType = z.infer<typeof roleSchema>

export const loginDetailSchema = z.object({
    email: emailRules,
    password: passwordRules,
})

export const registerSchema = z.object({
    email:emailRules,
    firstName: z.string().min(1,"Name cannot be empty"),
    lastName: z.string().min(1,"Name cannot be empty"),
    password: passwordRules,
    role: roleSchema.default('CANDIDATE'),
})

export const jobPostingScema = z.object({
    title: z.string().min(1,"Title cannot be empty"),
    description: z.string().min(1,"Description cannot be empty"),
    companyName: z.string().min(1,"Company Name cannot be empty"),
    location: z.string().min(1,"Location Cannot be empty"),
    salary: z.number().int().nonnegative().nullable().optional().default(null),
    jobType: jobTypeSchema,
    experience: experienceSchema,
    category: categorySchema
})


