import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { env } from "./env";

export default authMiddleware({
  afterAuth: (auth, request) => {
    // Handle users who aren't authenticated that want to access to a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: request.url });
    }

    if (auth.userId) {
      const { pathname, origin } = request.nextUrl;

      // Handlers users who are authenticated that want to access to sign in page
      if (pathname === env.NEXT_PUBLIC_CLERK_SIGN_IN_URL) {
        const url = origin + env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL;

        return NextResponse.redirect(url);
      }

      // Handlers users who are authenticated that want to access to sign up page
      if (pathname === env.NEXT_PUBLIC_CLERK_SIGN_UP_URL) {
        const url = origin + env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL;

        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
