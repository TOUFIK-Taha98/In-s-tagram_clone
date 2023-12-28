import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUsername } from "@/lib/FetchingData/data";

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {
  const posts = await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
};
export default ProfilePage;
