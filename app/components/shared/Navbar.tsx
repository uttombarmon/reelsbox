"use client";
import React from 'react'
import LogOut from '../home/Logout/LogOut';
// import Image from 'next/image';
import { CircleUserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function Navbar() {
    const { data: session } = useSession();
    console.log(session);
    return (
        <div className="navbar bg-opacity-30 bg-indigo-100 backdrop-blur-lg shadow-sm fixed">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">ReelsBox</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                <CircleUserRound width={"100%"} height={"100%"} />
                                // <Image width={100} height={100}
                                //     alt="Tailwind CSS Navbar component"
                                //     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            }
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                            {
                            session ?
                                <LogOut />:
                                <Link className=' btn btn-neutral' href={"/login"}>Login</Link>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar