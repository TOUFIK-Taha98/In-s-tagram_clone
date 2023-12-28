import { fetchPostById } from "@/lib/FetchingData/data";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = async ({ params: { id } }: Props) => {
  const post = await fetchPostById(id);

  console.log(post);
  if (!post) {
    notFound();
  }

  return (
    <></>
    //   <PostView id={id} post={post} />
  );
};
export default PostModal;
