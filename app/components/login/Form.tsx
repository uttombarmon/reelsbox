"use client";
import { UserInterface } from "@/types/UTypes";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Form() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserInterface>({
    email: "",
    password: "",
  });
  const [view, setView] = useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setUserData({
      ...userData,
      email: data,
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setUserData({
      ...userData,
      password: data,
    });
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      ...userData,
      redirect: false,
    });
    if (result?.error) {
      console.error("Login error:", result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className=" max-w-md lg:w-1/3 flex flex-wrap h-full justify-center items-center">
      <div className=" h-fit w-fit space-y-6 flex flex-wrap justify-center items-center">
        <div className="text-4xl font-bold mb-4">
          <p>REELSBOX</p>
        </div>
        <form
          className=" space-y-6 self-center w-3/4 h-fit"
          onSubmit={handleLogin}
        >
          <label className="input validator join-item">
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
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              onChange={handleEmail}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <label className="input validator">
            <input
              type={view ? "text" : "password"}
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={handlePassword}
            />
            <span className=" right-0" onClick={() => setView(!view)}>
              {view ? <Eye /> : <EyeOff />}
            </span>
          </label>
          <p className="validator-hint hidden text-xs">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>

          <div className=" w-full flex justify-center text-center">
            <button
              className="flex justify-center items-center w-full px-10 py-2 bg-blue-700 rounded-lg shadow-sm font-medium hover:bg-blue-800 transition-colors duration-200"
              type="submit"
            >
              <p>Login</p>
            </button>
          </div>
        </form>
        {/* forget password */}
        <div className=" w-full flex justify-center">
          <a className="link link-hover text-gray-300">Forgot password?</a>
        </div>
        {/* register option */}
        <div className=" w-full flex justify-center">
          <p className=" text-gray-300">
            Don&apos;t have account?{" "}
            <Link href={"/register"} className=" text-blue-700 underline">
              regsiter now
            </Link>
          </p>
        </div>
        {/* Optional: Social Login Buttons */}
        <div className="mt-6 text-center h-fit self-center">
          <p className="text-gray-500 mb-3">Or sign in with:</p>
          <div className="flex justify-center gap-4">
            {/* Example Google Login Button */}
            <button
              onClick={() => signIn("google")} // Call signIn with provider ID
              className="flex items-center px-5 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              // disabled={loading}
            >
              <Image
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Facebook
            </button>
            <button
              onClick={() => signIn("google")} // Call signIn with provider ID
              className="flex items-center px-5 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              // disabled={loading}
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
                width={20}
                height={20}
              />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
