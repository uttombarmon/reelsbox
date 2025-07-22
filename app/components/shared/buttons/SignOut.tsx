"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function SignOut() {
  return (
    <button onClick={() => signOut()}>
      <LogOut />
      <span className=" hidden xl:flex">Log Out</span>
    </button>
  );
}

export default SignOut;
