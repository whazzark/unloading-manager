import { z } from "zod";

import type { FieldConfig } from "@/components/organisms/form-layout/types";

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

export const SIGN_UP_FIELD_CONFIG: FieldConfig<SignUpSchema> = {
  email: {
    inputProps: {
      type: "email",
    },
  },
  password: {
    inputProps: {
      type: "password",
    },
  },
  confirmPassword: {
    inputProps: {
      type: "password",
    },
  },
};
