import MorePosts from "@/components/MorePosts";
import SinglePost from "@/components/SinglePost";
import { MorePostsSkeleton, SinglePostSkeleton } from "@/components/Skeletons";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>

      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense fallback={<MorePostsSkeleton />}>
        <MorePosts postId={id} />
      </Suspense>
    </div>
  );
};
export default PostPage;
