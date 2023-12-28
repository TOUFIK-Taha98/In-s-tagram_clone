import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
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

function ProfileLayout({ children, params: { username } }: Props) {
  return <div>{children}</div>;
}

export default ProfileLayout;
