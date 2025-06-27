"use client";
import Sidebar from "./components/home/FirstSidebar/Sidebar";
// import { SessionProvider } from "next-auth/react";
import VideosBox from "./components/home/Videos/VideosBox";
// import Navbar from "./components/shared/Navbar";
export default function Home() {
  return (
    <div className=" text-white">
      {/* <SessionProvider>
        <Navbar />
      </SessionProvider> */}
      <div className="flex justify-between overflow-hidden h-[100vh] items-center">
        <div className=" hidden md:flex w-1/5 md:w-2/5 px-4 h-full overflow-x-hidden">
          <Sidebar />
        </div>
        <VideosBox />
        <div className=" hidden lg:flex w-1/5 px-4">Second Sidebar</div>
      </div>
    </div>
  );
}
