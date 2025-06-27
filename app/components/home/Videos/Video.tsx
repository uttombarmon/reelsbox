"use client";
import { VideoInterface } from "@/models/Video";
import { useEffect, useRef } from "react";
import { Buttons } from "./Buttons/Buttons";

function Video({ VData }: { VData: VideoInterface }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.6, // video must be ~60% visible to play
      }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);
  return (
    <div className="carousel-item h-full mx-auto flex justify-center w-full">
      <div className=" w-fit relative lg:px-20">
        <video
          className="h-full relative rounded-xl object-cover aspect-[9/16]"
          src={process.env.NEXT_PUBLIC_URL_ENDPOINT + "/" + VData.url}
          controls
          autoPlay
          playsInline
          ref={videoRef}
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
        ></video>
        <div className=" absolute right-0">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default Video;
