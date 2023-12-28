import SinglePost from "@/components/SinglePost";
import { SinglePostSkeleton } from "@/components/Skeletons";
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

      {/* <Suspense fallback="Loading">
        <MorePosts postId={id} />
      </Suspense> */}
    </div>
  );
};
export default PostPage;
