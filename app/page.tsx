"use client";
// import { SessionProvider } from "next-auth/react";
import VideosBox from "./components/home/Videos/VideosBox";
// import Navbar from "./components/shared/Navbar";
export default function Home() {
  return (
    <div className=" text-white">
      {/* <SessionProvider>
        <Navbar />
      </SessionProvider> */}
      <div className="flex overflow-hidden h-[100vh] items-center">
        <div className=" w-1/4 px-4">First Sidebar</div>
        <VideosBox />
        <div className=" w-1/4 px-4">Second Sidebar</div>
      </div>
    </div>
  );
}
