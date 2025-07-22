import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileHeader from "../components/profile/ProfileHeader";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const currentUser = session.user;
  console.log(currentUser);
  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Section (Client Component) */}
        <ProfileHeader uid={currentUser.id} />
        {/* User Videos Section (Client Component) */}
        {/* Pass the current user's ID to fetch their videos */}
        {/* <UserVideosSection userId={currentUser.id} /> */}
      </div>
    </div>
  );
}

export default ProfilePage;
