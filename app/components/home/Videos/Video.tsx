"use client";
import { VideoInterface } from "@/models/Video";
import { useEffect, useRef, useState } from "react";
import { Buttons } from "./Buttons/Buttons";

function Video({ VData }: { VData: VideoInterface }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    // const video = videoRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // video.play().catch(() => {});
          setShouldLoadVideo(true);
          loadObserver.unobserve(container);
        }
        // else {
        //   video.pause();
        // }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.6, // video must be ~60% visible to play
      }
    );

    loadObserver.observe(container);
    return () => {
      if (container) {
        loadObserver.unobserve(container);
      }
    };
  }, []);
  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;
    const playPauseObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((e) => console.log(e));
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.6,
      }
    );
    playPauseObserver.observe(video);

    return () => {
      if (video) {
        playPauseObserver.unobserve(video);
      }
    };
  }, [shouldLoadVideo]);

  return (
    <div
      className="carousel-item h-full mx-auto flex justify-center w-full"
      ref={containerRef}
    >
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
