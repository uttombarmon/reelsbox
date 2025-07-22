import ProfileHeader from "@/app/components/profile/ProfileHeader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const currentUser = session.user;
  console.log(currentUser);
  return (
    <div className="min-h-screen">
      <div className=" w-full">
        {/* Profile Header Section (Client Component) */}
        <ProfileHeader uid={currentUser.id} />
        {/* User Videos Section (Client Component) */}
        {/* Pass the current user's ID to fetch their videos */}
        {/* <UserVideosSection userId={currentUser.id} /> */}
      </div>
      <div className=" dark:text-black">dfdf </div>
    </div>
  );
}

export default ProfilePage;
