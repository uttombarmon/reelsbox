"use client";
import { apiClient } from "@/lib/ClientApi";
import { VideoInterface } from "@/models/Video";
import { useEffect, useState } from "react";
import Video from "./Video";
function VideosBox() {
  const [videos, setVideos] = useState<VideoInterface[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.GetVideos();
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className=" w-full md:w-3/5 mx-center overflow-x-hidden">
      {videos && videos.length > 0 ? (
        <div className="carousel carousel-vertical rounded-box h-[95vh] w-full">
          {videos.map((e, idx) => (
            <Video key={idx} VData={e} />
          ))}
        </div>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}
    </div>
  );
}

export default VideosBox;
