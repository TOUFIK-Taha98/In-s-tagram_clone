import { auth } from "@/auth";
import ProfileHeader from "@/components/ProfileHeader";
// import FollowButton from "@/components/FollowButton";
// import ProfileAvatar from "@/components/ProfileAvatar";
// import ProfileHeader from "@/components/ProfileHeader";
// import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/FetchingData/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

// This function is to generate a dynamic metadata.
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
    description: profile?.bio,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const session = await auth();
  const isCurrentUser = session?.user.id === profile?.id;
  //   the followerId here is the id of the user who is following the profile
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
  );

  if (!profile) {
    notFound();
  }

  return (
    <>
      <ProfileHeader username={profile.username} />
      {children}
    </>
  );
}

export default ProfileLayout;
