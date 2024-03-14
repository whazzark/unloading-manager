"use client";

import React, { useCallback } from "react";

import { useSignUp } from "@clerk/nextjs";

import { useToast } from "@/components/atoms";
import { FormLayout } from "@/components/organisms";

import { SIGN_UP_FIELD_CONFIG, SIGN_UP_SCHEMA } from "./schema";
import { useRedirectToSignUp } from "./use-redirect-to-sign-in";

import type { SignUpSchema } from "./schema";

export function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp();

  const redirectToSignUp = useRedirectToSignUp();

  const { toast } = useToast();

  const handleSignUp = useCallback(
    async (formData: SignUpSchema) => {
      if (!isLoaded) {
        return;
      }

      try {
        const result = await signUp.create({
          emailAddress: formData.email,
          password: formData.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          redirectToSignUp();
        } else {
          /* TODO: Investigate why the sign-in hasn't completed */
        }
      } catch (error: any) {
        const currentError = error.errors[0];

        toast({
          variant: "destructive",
          title: "Sign up error occurred",
          description: currentError.longMessage,
        });
      }
    },
    [isLoaded, signUp, setActive, redirectToSignUp, toast],
  );

  return (
    <FormLayout
      submitButtonLabel="Sign up"
      formSchema={SIGN_UP_SCHEMA}
      fieldConfig={SIGN_UP_FIELD_CONFIG}
      onSubmit={handleSignUp}
    />
  );
}
