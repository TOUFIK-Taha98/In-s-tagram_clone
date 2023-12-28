import { fetchPostById } from "@/lib/FetchingData/data";
import EditPost from "@/components/EditPost";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

async function EditPostPage({ params: { id } }: EditPostPageProps) {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
}

export default EditPostPage;
