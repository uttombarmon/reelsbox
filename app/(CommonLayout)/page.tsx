// import { apiClient } from "@/lib/ClientApi";
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

import VideosBox from "../components/home/Videos/VideosBox";

// }
export default function Home() {
  return <VideosBox />;
}
