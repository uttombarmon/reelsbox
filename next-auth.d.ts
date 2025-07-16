import { DefaultJWT, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    id?: string;
  }
}

import "next/server";

declare module "next/server" {
  interface NextRequest {
    nextauth: {
      token: JWT | null;
    };
  }
}
