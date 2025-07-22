// components/profile/ProfileHeader.tsx
"use client";

import { UserInterface } from "@/types/UTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileHeader = ({ uid }: { uid: string }) => {
  // Fallback for profile image if user.image is null/undefined or fails to load
  const [user, setUser] = useState<UserInterface | null>(null);
  useEffect(() => {
    async function getUser() {
      const response = await fetch(`/api/auth/user?uid=${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: UserInterface = await response.json();
      console.log(data);
      setUser(data);
    }
    getUser();
  }, [uid]);

  return (
    <div className=" shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shrink-0">
        <div className=" text-black dark:text-white text-4xl w-full h-full flex justify-center items-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt={`${user.name || user.username || "User"}'s Profile Picture`}
              fill
              style={{ objectFit: "cover" }}
              sizes="112px"
              className="rounded-full"
              priority
            />
          ) : (
            <div className=" text-black font-bold text-4xl">
              <p>{user?.name?.toString().slice(0, 1)}</p>
            </div>
          )}
          {/* <p>{user?.name?.toString().slice(0, 1)}</p> */}
        </div>
      </div>
      <div className="text-center md:text-left grow">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.name || "Reels Box User"}
        </h1>
        {user?.username && (
          <p className="text-xl text-gray-600 mt-1">@{user.username}</p>
        )}
        {user?.email && (
          <p className="text-md text-gray-500 mt-1">{user.email}</p>
        )}
        {user?.bio && (
          <p className="text-gray-700 mt-3 max-w-lg mx-auto md:mx-0">
            {user.bio}
          </p>
        )}
        <div className="mt-4 flex justify-center md:justify-start space-x-3">
          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200">
            Edit Profile
          </button>
          <button className="px-5 py-2 border border-blue-400 text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
