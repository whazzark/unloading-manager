import React from "react";

import Link from "next/link";

import { env } from "@/env";
import { AuthenticationTemplate, SignUp } from "@/features/authentication";

export default function SignUpPage() {
  return (
    <AuthenticationTemplate
      description="Start your 30-day free trial"
      title="Create an account"
      footer={
        <div className="space-x-1">
          <span>Already have an account ?</span>

          <Link
            href={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
            className="text-primary hover:text-primary/70"
          >
            Login
          </Link>
        </div>
      }
    >
      <SignUp />
    </AuthenticationTemplate>
  );
}
