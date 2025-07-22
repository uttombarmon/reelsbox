import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Head from "next/head"; // For SEO meta tags (though Next.js App Router uses metadata API more)
import Image from "next/image"; // For optimized images
import { redirect } from "next/navigation";
import RegisterForm from "../components/rgister/register";

async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      {/* SEO Meta Tags for Pages Router, for App Router use layout.tsx metadata export */}
      {/* If using App Router, these Head tags are less relevant as metadata API is preferred */}
      <Head>
        <title>Register for Reels Box - Create Your Account</title>
        <meta
          name="description"
          content="Join Reels Box today! Create your free account to share, discover, and enjoy short-form videos. Fast, fun, and easy registration."
        />
        <link rel="canonical" href="https://yourdomain.com/register" />{" "}
        {/* Replace with your actual domain */}
        <meta name="robots" content="index, follow" />
        {/* Open Graph / Social Media Tags */}
        <meta
          property="og:title"
          content="Register for Reels Box - Create Your Account"
        />
        <meta
          property="og:description"
          content="Join Reels Box today! Create your free account to share, discover, and enjoy short-form videos."
        />
        <meta property="og:url" content="https://yourdomain.com/register" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourdomain.com/images/reelsbox-social-share.jpg"
        />{" "}
        {/* Replace with a relevant image */}
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Register for Reels Box - Create Your Account"
        />
        <meta
          name="twitter:description"
          content="Join Reels Box today! Create your free account to share, discover, and enjoy short-form videos."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/images/reelsbox-social-share.jpg"
        />
      </Head>

      {/* <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-linear-to-br from-purple-600 to-pink-500 p-4"> */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-linear-to-br from-blue-500/10 to-purple-600/10 p-4">
        {/* Left Section: Image (Responsive) */}
        <div className="relative hidden w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-[500px] lg:flex items-center justify-center p-4">
          <Image
            src="https://i.postimg.cc/6qc9kvt0/instagram-web-lox-image.png"
            alt="Join Reels Box and create your account"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg"
            priority
          />
        </div>
        <RegisterForm />
      </div>
    </>
  );
}

export default RegisterPage;
