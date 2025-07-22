"use client";
import {
  CirclePlus,
  Compass,
  Home,
  User,
  UserRoundCog,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <ul className="menu bg-base-200 rounded-box w-full  min-h-full text-black dark:text-white text-xl">
      <li className=" text-4xl font-bold mb-4">
        <a href="">ReelsBox</a>
      </li>
      <li className=" mb-2">
        <label className="input border-none w-fit focus:w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
      </li>
      <li className=" my-2">
        <a href="">
          <Home />
          Home
        </a>
      </li>
      <li className=" my-2">
        <a href="">
          <Compass />
          Trending
        </a>
      </li>
      <li className=" my-2">
        <a href="">
          <User />
          Profile
        </a>
      </li>
      <li className=" my-2">
        <a href="">
          <Users />
          Following
        </a>
      </li>
      <li className=" my-2">
        <a href="">
          <CirclePlus />
          Upload
        </a>
      </li>
      <li className=" my-2">
        <a href="">
          <UserRoundCog />
          Settings
        </a>
      </li>
      {!session ? (
        <li className=" my-2">
          <Link className=" btn btn-accent text-xl" href={"/login"}>
            Log in
          </Link>
        </li>
      ) : (
        <li className=" my-2">
          <button className=" btn btn-info text-xl" onClick={() => signOut()}>
            Sign Out
          </button>
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
