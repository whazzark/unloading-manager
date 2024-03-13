"use client";

import React, { useCallback, useState } from "react";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label, useToast } from "@/components/atoms";

import { SIGN_UP_SCHEMA } from "./schema";
import { useRedirectToSignUp } from "./use-redirect-to-sign-in";

import type { SignUpSchema } from "./schema";

export function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp();

  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(SIGN_UP_SCHEMA),
  });

  const redirectToSignUp = useRedirectToSignUp();

  const { toast } = useToast();

  const [isSigningUp, setSigningUp] = useState<boolean>(false);

  const handleSignUp = useCallback(
    async (formData: SignUpSchema) => {
      if (!isLoaded) {
        return;
      }

      try {
        setSigningUp(true);
        const result = await signUp.create({
          emailAddress: formData.email,
          password: formData.password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          redirectToSignUp();
        } else {
          /* Investigate why the sign-in hasn't completed */
        }
      } catch (error: any) {
        const currentError = error.errors[0];

        toast({
          variant: "destructive",
          title: "Sign up error occurred",
          description: currentError.longMessage,
        });
      } finally {
        setSigningUp(false);
      }
    },
    [isLoaded, signUp, setActive, redirectToSignUp, toast],
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-1">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="current-password"
          {...register("confirmPassword")}
        />
      </div>
      <Button type="submit" className="w-full pt-2" disabled={isSigningUp}>
        Sign Up
      </Button>
    </form>
  );
}
