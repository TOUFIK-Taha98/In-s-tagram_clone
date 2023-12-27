import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import LikeButton from "./LikeButton";

interface PostActionsProps {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}

const PostActions = ({ post, userId, className }: PostActionsProps) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
    </div>
  );
};
export default PostActions;
