// middleware.ts
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server"; // Import NextRequest for type hinting
import { NextResponse } from "next/server";

export default withAuth(
  // This function runs before the request is processed by the page/route handler.
  // It has access to the request and the session token (if available).
  async function middleware(req: NextRequest) {
    // Access the session token directly from req.nextauth.token,
    // which is provided by withAuth.
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // 1. Redirect authenticated users away from login/register pages
    // If a token exists (user is logged in) AND they are trying to access /login or /register,
    // then redirect them to the dashboard or homepage.
    if (token && (pathname === "/login" || pathname === "/register")) {
      // Create a new URL for the redirect. Assuming '/dashboard' is your logged-in landing page.
      // You can change '/dashboard' to '/' or any other appropriate page.
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 2. Otherwise, let the 'authorized' callback handle the rest of the authorization logic.
    // This return statement allows the request to continue to the 'authorized' callback below.
    return NextResponse.next();
  },
  {
    // The 'callbacks' object defines authorization rules.
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to specific public paths for ALL users (authenticated or not).
        // This includes NextAuth API routes, the homepage, and the public video API.
        if (
          pathname.startsWith("/api/auth") || // NextAuth's internal API routes
          pathname === "/" || // Your public homepage
          pathname === "/login" || // Login page (already handled above for logged-in users)
          pathname === "/register" || // Register page (already handled above for logged-in users)
          pathname.startsWith("/api/videos") // Your public video fetching API
        ) {
          return true; // Always allow these paths
        }

        // For all other paths, require the user to be authenticated (have a token).
        // If 'token' is null/undefined, this will return false, triggering a redirect to signIn page.
        return !!token;
      },
    },
    // The 'pages' option configures where NextAuth redirects users for specific actions.
    pages: {
      signIn: "/login", // Redirect unauthenticated users to this path for sign-in
      // error: '/auth/error', // Optional: Custom error page
      // newUser: '/auth/new-user', // Optional: Page for new users after first sign-in
    },
  }
);

// The 'config' object specifies which paths the middleware should apply to.
// This matcher regex ensures the middleware runs for all paths except static files.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
