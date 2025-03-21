"use client";
import { SessionProvider } from "next-auth/react";
import VideosBox from "./components/home/VideosBox";
import Navbar from "./components/shared/Navbar";
export default function Home() {
  return (
    <div>
      <SessionProvider>

        <Navbar />
      </SessionProvider>
      <div className=" pt-24">
        <h1>Welcome to REELSBOX</h1>
        <VideosBox />
      </div>
    </div>
  );
}
