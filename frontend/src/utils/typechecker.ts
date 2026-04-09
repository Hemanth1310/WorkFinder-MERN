import { z } from 'zod';

const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "Please enter atleast one special charecter e.g. !@#$%^&*");

export const TAG_VALUES = ['View', 'Experience', 'Food'] as const
export const tagSchema = z.enum(TAG_VALUES)
export type Tag = z.infer<typeof tagSchema>
export const loginDetailSchema = z.object({
    email: emailRules,
    password: passwordRules,
})

export const ROLE_VALUES = ['CANDIDATE', 'EMPLOYER'] as const
export const roleSchema = z.enum(ROLE_VALUES)
export type RoleType = z.infer<typeof roleSchema>


export const registerSchema = z.object({
    email:emailRules,
    firstName: z.string().min(1,"Name cannot be empty"),
    lastName: z.string().min(1,"Name cannot be empty"),
    password: passwordRules,
    role: roleSchema.default('CANDIDATE')
})


