"use client";
import { VideoInterface } from "@/types/VTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Buttons } from "./Buttons/Buttons";
interface VideoProps {
  VData: VideoInterface;
  isMuted: boolean; // isMuted state now comes from parent
  onToggleMute: () => void; // Function to toggle mute, provided by parent
}

function Video({ VData, isMuted, onToggleMute }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect for initial video loading (lazy loading)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true); // Set flag to load video source
          loadObserver.unobserve(container); // Stop observing once loaded
        }
      },
      {
        rootMargin: "200px 0px", // Load video when it's near the viewport
        threshold: 0.1, // Trigger when 10% of the container is visible
      }
    );

    loadObserver.observe(container);
    return () => {
      if (container) {
        loadObserver.unobserve(container);
      }
    };
  }, []);

  // Effect for playing/pausing based on visibility and `shouldLoadVideo`
  useEffect(() => {
    if (!shouldLoadVideo) return; // Only proceed if video should be loaded

    const video = videoRef.current;
    if (!video) return;

    const playPauseObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Ensure muted state is applied before attempting to play
          video.muted = isMuted;
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch((e) => {
              console.warn("Autoplay failed:", e);
              setIsPlaying(false); // Set to false if autoplay fails
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.6, // Video must be ~60% visible to play
      }
    );
    playPauseObserver.observe(video);

    return () => {
      if (video) {
        video.pause(); // Pause when unobserving/unmounting
        playPauseObserver.unobserve(video);
      }
    };
  }, [shouldLoadVideo, isMuted]); // Add isMuted to dependencies to react to mute changes

  // Function to toggle play/pause
  const handlePlayPause = () => {
    const video: HTMLVideoElement | null = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch((e) => console.log("Manual play failed:", e));
      }
      setIsPlaying(!isPlaying); // Toggle the state
    }
  };

  // Function to toggle mute/unmute
  const handleMuteToggle = () => {
    onToggleMute();
    // const video: HTMLVideoElement | null = videoRef.current;
    // if (video) {
    //   video.muted = !video.muted; // Correctly toggle the video element's muted property
    //   setIsMuted(video.muted); // Update the component's state to reflect the actual muted status
    // }
  };

  return (
    <div
      className="carousel-item h-full mx-auto flex justify-center w-full"
      ref={containerRef}
    >
      <div className="w-fit relative lg:px-20">
        <div className=" h-full relative rounded-xl object-cover aspect-[9/16]">
          <video
            onClick={handlePlayPause}
            className=""
            src={
              shouldLoadVideo
                ? process.env.NEXT_PUBLIC_URL_ENDPOINT + "/" + VData.url
                : undefined
            }
            poster={VData.thumbnail}
            loop
            playsInline
            ref={videoRef}
            preload="metadata"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            // muted={isMuted}
          ></video>

          {/* Overlay for play/pause button */}
          {!isPlaying && (
            <div
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer z-10"
            >
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          {/* Mute/Unmute Button */}
          <button
            onClick={handleMuteToggle} // Use the unified mute/unmute handler
            className="absolute top-4 right-4 p-2 bg-gray-800 bg-opacity-70 rounded-full text-white z-10 hover:bg-gray-700 transition-colors duration-200"
          >
            {isMuted ? (
              // Muted icon
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l9 9v.73H9v6h3v-2.11l6.73 6.73L21 19.73l-9-9L4.27 3zM11 6.83L9.17 5H11v1.83z" />
              </svg>
            ) : (
              // Unmuted icon
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          {/* Video Title, Description, and Uploader Info */}
          <div className="absolute bottom-1 text-white z-10 p-2 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl">
            {/* Uploader Information and Follow Button */}
            {/* {isUserPopulated(VData.userId) && ( */}
            <div className="flex items-center gap-2">
              {VData.userId ? (
                <Image
                  src={"https://placehold.co/32x32/E0E0E0/333333?text=PP"} // Fallback if profileImageSrc is undefined
                  alt={"Uploader"}
                  className="rounded-full object-cover border border-gray-300"
                  width={32}
                  height={32}
                />
              ) : (
                <div className=" rounded-full w-8 h-8 flex justify-center items-center bg-black/10">
                  <span className="text-white text-lg font-bold">P</span>
                </div>
              )}
              <span className="font-semibold text-base">@username</span>
              {/* Follow Button - Placeholder for functionality */}
              <button className="ml-2 px-3 py-1 bg-red-500 text-white font-semibold text-sm rounded-full shadow-md hover:bg-red-600 transition-colors duration-200">
                Follow
              </button>
            </div>

            <div onClick={() => ""} className=" cursor-pointer">
              {/* Video Title */}
              <h3 className="text-base font-medium mb-1 line-clamp-1">
                {VData.title}
              </h3>

              {/* Video Description (optional and truncated) */}
              {VData.description && (
                <p className="text-sm font-light mb-2 max-w-full line-clamp-2">
                  {VData.description.length > 10
                    ? `
                      ${VData.description.slice(0, 50)}...

                    `
                    : VData.description}
                </p>
              )}
            </div>

            {/* )} */}
          </div>
          {/* awsome, not good, commnet, share buttons  */}
        </div>
        <div className="absolute right-0">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default Video;
