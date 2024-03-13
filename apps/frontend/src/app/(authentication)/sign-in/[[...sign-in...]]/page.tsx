import React from "react";

import Link from "next/link";

import { env } from "@/env";
import { AuthenticationTemplate, SignIn } from "@/features/authentication";

export default function SignInPage() {
  return (
    <AuthenticationTemplate
      description="Welcome back ! Please enter your details"
      title="Log in to your account"
      footer={
        <div className="space-x-1">
          <span>{`Don't have an account ?`}</span>

          <Link
            href={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
            className="text-primary hover:text-primary/70"
          >
            Sign up
          </Link>
        </div>
      }
    >
      <SignIn />
    </AuthenticationTemplate>
  );
}
