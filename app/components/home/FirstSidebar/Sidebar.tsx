import { authOptions } from "@/lib/auth";
import logo1 from "@/public/logo1.png";
import {
  CirclePlus,
  Compass,
  Home,
  LogIn,
  User,
  UserRoundCog,
  Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import SignOut from "../../shared/buttons/SignOut";

const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <ul className="menu w-full  min-h-full text-xl">
      <li className=" text-4xl font-bold mb-4 w-full h-14">
        {/* <a href="">ReelsBox</a> */}
        {/* <Image src={logo} alt="ReelsBox Logo" className=" xl:hidden" fill />   */}
        <Image
          src={logo1}
          alt="ReelsBox Logo"
          className=" hidden xl:flex"
          fill
        />
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
      {/* Home  */}
      <li className=" my-2">
        <a href="">
          <Home />
          <span className=" hidden xl:flex">Home</span>
        </a>
      </li>
      {/* trending  */}
      <li className=" my-2">
        <a href="/trending">
          <Compass />
          <span className=" hidden xl:flex">Trending</span>
        </a>
      </li>
      {/* Profile  */}
      <li className=" my-2">
        <a href="/profile">
          <User />
          <span className=" hidden xl:flex">Profile</span>
        </a>
      </li>
      {/* following */}
      <li className=" my-2">
        <a href="/following">
          <Users />
          <span className=" hidden xl:flex">Following</span>
        </a>
      </li>
      {/* Upload  */}
      <li className=" my-2">
        <a href="">
          <CirclePlus />
          <span className=" hidden xl:flex">Upload</span>
        </a>
      </li>
      {/* settings  */}
      <li className=" my-2">
        <a href="/settings">
          <UserRoundCog />
          <span className=" hidden xl:flex">Settings</span>
        </a>
      </li>
      {/* login and logout button */}
      {!session ? (
        <li className=" my-2">
          <Link className=" btn btn-accent text-xl" href={"/login"}>
            <LogIn />
            <span className=" hidden xl:flex">Log In</span>
          </Link>
        </li>
      ) : (
        <li className=" my-2">
          <SignOut />
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
