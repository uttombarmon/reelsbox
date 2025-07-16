"use client";
// import { apiClient } from "@/lib/ClientApi";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./components/home/FirstSidebar/Sidebar";
import VideosBox from "./components/home/Videos/VideosBox";
// import { VideoInterface } from "@/models/Video";
// import Navbar from "./components/shared/Navbar";
// async function getInitialVideos() {
//   try {
//     const response = await apiClient.GetVideos();
//     return {
//       videos: response as VideoInterface[],
//       hasMore: true as boolean,
//     };
//   } catch (error) {}
// }
export default function Home() {
  return (
    <div className=" text-white">
      <div className="flex justify-between overflow-hidden h-[100vh] items-center">
        <div className=" hidden md:flex w-1/5 md:w-2/5 lg:w-1/5 px-4 h-full overflow-x-hidden">
          <SessionProvider>
            {/* <Navbar /> */}
            <Sidebar />
          </SessionProvider>
        </div>
        <VideosBox />
        <div className=" hidden lg:flex w-1/5 px-4">Second Sidebar</div>
      </div>
    </div>
  );
}
