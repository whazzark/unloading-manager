import { z } from "zod";

export const SIGN_UP_SCHEMA = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .describe("Password"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Password don't match",
    },
  );

export type SignUpSchema = z.infer<typeof SIGN_UP_SCHEMA>;
