import { z } from "zod";

export const SIGN_IN_SCHEMA = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignInSchema = z.infer<typeof SIGN_IN_SCHEMA>;
