import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Form from "../components/login/Form";
async function LogIn() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500/10 to-purple-600/10 p-4">
      <div className="p-8 rounded-2xl w-full flex justify-center flex-wrap">
        {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to dive back into your personalized Reels Box experience.
          </p> */}
        <div className=" hidden relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-[500px] lg:flex items-center justify-center p-4">
          <Image
            src="https://i.postimg.cc/6qc9kvt0/instagram-web-lox-image.png"
            alt="Reels Box Visual"
            fill // This makes the image fill its parent div
            style={{ objectFit: "contain" }} // or 'cover', depending on how you want it to fit
            sizes="(max-width: 1024px) 100vw, 50vw" // Optimize image loading for different screen sizes
            className="rounded-lg" // Add some styling
          />
        </div>

        <Form />
      </div>
    </div>
  );
}

export default LogIn;
