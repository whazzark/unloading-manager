"use client";

import React, { useCallback, useState } from "react";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label, useToast } from "@/components/atoms";

import { SIGN_IN_SCHEMA } from "./schema";
import { useRedirectToSignIn } from "./use-redirect-to-sign-in";

import type { SignInSchema } from "./schema";

export function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn();

  const { register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(SIGN_IN_SCHEMA),
  });

  const redirectToSignIn = useRedirectToSignIn();

  const { toast } = useToast();

  const [isSigningIn, setSigningIn] = useState<boolean>(false);

  const handleSignIn = useCallback(
    async (formData: SignInSchema) => {
      if (!isLoaded) {
        return;
      }

      try {
        setSigningIn(true);
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
      } finally {
        setSigningIn(false);
      }
    },
    [isLoaded, redirectToSignIn, setActive, signIn, toast],
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
      <div className="space-y-1">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" {...register("email")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" {...register("password")} />
      </div>
      <Button type="submit" className="w-full pt-2" disabled={isSigningIn}>
        Sign In
      </Button>
    </form>
  );
}
