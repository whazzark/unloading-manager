"use client";

import React, { useCallback } from "react";

import { useSignIn } from "@clerk/nextjs";

import { useToast } from "@/components/atoms";
import { FormLayout } from "@/components/organisms";

import { SIGN_IN_FIELD_CONFIG, SIGN_IN_SCHEMA } from "./schema";
import { useRedirectToSignIn } from "./use-redirect-to-sign-in";

import type { SignInSchema } from "./schema";

export function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn();

  const redirectToSignIn = useRedirectToSignIn();

  const { toast } = useToast();

  const handleSignIn = useCallback(
    async (formData: SignInSchema) => {
      if (!isLoaded) {
        return;
      }

      try {
        const result = await signIn.create({
          identifier: formData.email,
          password: formData.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          redirectToSignIn();
        } else {
          /* Investigate why the sign-in hasn't completed */
        }
      } catch (error: any) {
        const currentError = error.errors[0];

        toast({
          variant: "destructive",
          title: "Sign in error occurred",
          description: currentError.longMessage,
        });
      }
    },
    [isLoaded, redirectToSignIn, setActive, signIn, toast],
  );

  return (
    <FormLayout
      submitButtonLabel="Sign in"
      formSchema={SIGN_IN_SCHEMA}
      fieldConfig={SIGN_IN_FIELD_CONFIG}
      onSubmit={handleSignIn}
    />
  );
}
