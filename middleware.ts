// middleware.ts
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // --- DEBUGGING LOGS ---
    console.log(`[Middleware] Path: ${pathname}`);
    console.log(`[Middleware] Token exists: ${!!token}`);
    // --- END DEBUGGING LOGS ---

    // 1. Redirect authenticated users away from login/register pages
    if (token && (pathname === "/login" || pathname === "/register")) {
      console.log(
        `[Middleware] Authenticated user trying to access ${pathname}. Redirecting to /.`
      );
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 2. Otherwise, let the 'authorized' callback handle the rest of the authorization logic.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // --- DEBUGGING LOGS ---
        console.log(`[Authorized Callback] Path: ${pathname}`);
        console.log(`[Authorized Callback] Token exists: ${!!token}`);
        // --- END DEBUGGING LOGS ---

        // Allow access to specific public paths for ALL users (authenticated or not).
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname.startsWith("/api/videos")
        ) {
          console.log(
            `[Authorized Callback] Allowing public access to: ${pathname}`
          );
          return true;
        }

        // For all other paths, require the user to be authenticated.
        console.log(
          `[Authorized Callback] Requiring authentication for: ${pathname}. Token: ${!!token}`
        );
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// --- CRITICAL CHANGE FOR DEBUGGING ---
// Temporarily simplify the matcher to ensure it includes '/login'
export const config = {
  // This matcher will run the middleware for ALL paths.
  // This is for debugging purposes to confirm if the matcher was the issue.
  matcher: ["/:path*"],
  // Once confirmed, you can revert to a more specific matcher if needed,
  // or use the original one if the issue was elsewhere.
};
// --- END CRITICAL CHANGE ---
