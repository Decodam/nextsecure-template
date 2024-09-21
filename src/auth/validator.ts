import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");


export const signupFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must be less than 100 characters long"),
  
  email: z
    .string()
    .email("Invalid email address"),

  password: passwordSchema,

  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Show error message on confirmPassword field
});


export const recoveryFormSchema = z.object({
  email: z.string().email("Invalid email address"),
})



export function checkPasswordStrength(password:string) {
  let strength = 0;

  if (password.length >= 8) strength++;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

  if (/\d/.test(password)) strength++;

  if (/[@$!%*?&#]/.test(password)) strength++;

  return strength;
}