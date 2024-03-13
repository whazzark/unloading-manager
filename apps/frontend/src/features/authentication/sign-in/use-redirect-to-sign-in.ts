import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { env } from "@/env";

export function useRedirectToSignIn(): () => void {
  const router = useRouter();

  const handleRedirectToSignIn = useCallback(() => {
    router.push(env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL);
  }, [router]);

  return handleRedirectToSignIn;
}
