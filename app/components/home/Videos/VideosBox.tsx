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
    <div className=" w-2/4 mx-center">
      {videos && videos.length > 0 ? (
        <div className="carousel carousel-vertical rounded-box h-[95vh] w-full">
          {videos.map((e, idx) => (
            <Video key={idx} VData={e} />
          ))}
        </div>
      ) : (
        <p>Data load failed!</p>
      )}
    </div>
  );
}

export default VideosBox;
