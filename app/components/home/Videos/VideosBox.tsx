/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { apiClient } from "@/lib/ClientApi"; // Ensure apiClient.GetVideos accepts parameters
import { VideoInterface } from "@/types/VTypes"; // Your video interface
import { useCallback, useEffect, useRef, useState } from "react"; // Import useCallback
import Video from "./Video"; // Your Video component

// Define a default limit for videos per fetch
const VIDEOS_PER_FETCH = 10;

function VideosBox() {
  const [videos, setVideos] = useState<VideoInterface[]>([]);
  // Using 'skip' (offset) for pagination, aligns with API
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Initialize hasMore to true, assuming there's data to fetch initially
  const [hasMore, setHasMore] = useState(true);
  const [isGloballyMuted, setIsGloballyMuted] = useState(true);

  // Ref for the element at the bottom of the scroll area for IntersectionObserver
  const bottomRef = useRef<HTMLDivElement>(null);

  // Memoize the fetchVideos function using useCallback to prevent infinite loops
  // and unnecessary re-creations, optimizing performance.
  const fetchVideos = useCallback(async () => {
    // Prevent fetching if already loading, if there's no more data, or if an error occurred
    if (loading || !hasMore || error) {
      console.log(
        "Preventing fetch: already loading, no more data, or error present."
      );
      return;
    }

    setLoading(true); // Set loading true at the start of the fetch
    setError(null); // Clear any previous errors before a new fetch attempt

    try {
      // Call your API client, passing the current skip and defined limit.
      // Make sure apiClient.GetVideos accepts these parameters.
      const data = await apiClient.GetVideos();

      // Validate the response structure
      if (
        data &&
        data.videos &&
        Array.isArray(data.videos) &&
        data.pagination
      ) {
        // Correctly append new videos to the existing list using a functional update
        const newVideos = Array.isArray(data.videos)
          ? data.videos
          : [data.videos];
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
        // Update the skip value for the next fetch based on total items fetched
        setSkip((prevSkip) => prevSkip + newVideos.length);
        // Update hasMore based on the API's pagination response
        setHasMore(data.pagination.hasMore);
      } else {
        // Handle unexpected data format from the API
        setError("Received invalid data format from the server.");
      }
    } catch (err: any) {
      // Log the full error for debugging purposes
      console.error("Error fetching videos:", err);
      // Set a user-friendly error message
      setError(err.message || "Failed to load videos. Please try again.");
    } finally {
      setLoading(false); // Always set loading to false after fetch attempt (success or failure)
    }
  }, [loading, hasMore, error]); // Dependencies for useCallback: re-create if these change

  // useEffect to trigger the initial fetch and subsequent fetches when 'skip' changes.
  // This effect will run when the component mounts and whenever 'skip' is updated
  // (which is triggered by the IntersectionObserver).
  useEffect(() => {
    // Only fetch if there's potentially more data to load
    if (hasMore) {
      fetchVideos();
    }
  }, [skip, fetchVideos, hasMore]); // Dependencies for useEffect

  // useEffect for the IntersectionObserver to implement infinite scrolling.
  // It observes the 'bottomRef' element and triggers a new fetch when it becomes visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the target element is intersecting, not currently loading, and there's more data
        if (entries[0].isIntersecting && !loading && hasMore) {
          // Increment skip by the limit to fetch the next batch of videos.
          // This update to 'skip' will then trigger the 'fetchVideos' useEffect.
          setSkip((prevSkip) => prevSkip + VIDEOS_PER_FETCH);
        }
      },
      // A lower threshold (e.g., 0.1) triggers the load earlier for a smoother experience
      { threshold: 0.1 }
    );

    const currentRef = bottomRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function: disconnect the observer when the component unmounts or dependencies change
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, hasMore]); // Dependencies for IntersectionObserver: re-create if these change
  // Function to Global toggle mute function
  const handleToggleGlobalMute = useCallback(() => {
    setIsGloballyMuted((prevMuted) => !prevMuted);
  }, []);
  // --- Render Logic ---
  return (
    <div className="w-full md:w-3/5 mx-auto overflow-x-hidden p-2">
      {/* Conditionally render video carousel only if there are videos to display */}
      {videos.length > 0 && (
        <div className="carousel carousel-vertical rounded-box h-[95vh] w-full">
          {videos.map((videoData) => (
            // Use a unique identifier (like _id from MongoDB) for the key.
            // Using index (idx) can cause issues with list reordering/updates.
            <Video
              key={videoData._id?.toString()}
              VData={videoData}
              isMuted={isGloballyMuted} // Pass the global mute state to all videos
              onToggleMute={handleToggleGlobalMute} // Pass the global toggle function // Pass toggle function
            />
          ))}
        </div>
      )}

      {/* Loading spinner: shown when loading */}
      {loading && (
        <div className="w-full h-24 flex justify-center items-center">
          <span className="loading loading-ring loading-xl text-blue-500"></span>
        </div>
      )}

      {/* Error message display: shown when an error occurs */}
      {error && (
        <div className="w-full text-center text-red-500 mt-4 p-4 border border-red-300 bg-red-50 rounded-md shadow-sm">
          <p className="font-medium mb-2">{error}</p>
          <button
            onClick={() => {
              setError(null); // Clear the error message
              setLoading(false); // Ensure loading state is reset
              setHasMore(true); // Assume there might be more data to retry fetching
              setSkip(0); // Reset skip to 0 to retry from the beginning
              setVideos([]); // Clear existing videos to show fresh data on retry
              fetchVideos(); // Trigger a new fetch
            }}
            className="mt-3 px-5 py-2 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* Message when no videos are found after initial load and not loading/error */}
      {!loading && !error && videos.length === 0 && (
        <div className="w-full text-center text-gray-500 mt-4 p-4">
          <p>No videos found. Check back later or upload some!</p>
        </div>
      )}

      {/* Message when all videos have been loaded */}
      {!loading && !hasMore && videos.length > 0 && (
        <div className="w-full text-center text-gray-500 mt-4 p-4">
          <p>You&apos;ve reached the end of the video list!</p>
        </div>
      )}

      {/* IntersectionObserver target element: only render if there might be more to load */}
      {hasMore && !loading && (
        <div ref={bottomRef} className="h-1 bg-transparent"></div>
      )}
    </div>
  );
}

export default VideosBox;
