"use client";

import React, { useCallback } from "react";

import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { env } from "@/env";

export default function Dashboard() {
  const router = useRouter();

  const handleSignOutCallback = useCallback(() => {
    router.push(env.NEXT_PUBLIC_CLERK_SIGN_IN_URL);
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>

      <SignOutButton signOutCallback={handleSignOutCallback} />
    </div>
  );
}
