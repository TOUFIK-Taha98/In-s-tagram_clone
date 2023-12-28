import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function fetchPosts() {
  // equivalent to doing fetch, cache: no-store
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPostById(id: string) {
  noStore(); // We want this to be server side rendered

  try {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        likes: {
          include: { user: true },
        },
        savedBy: true,
        user: true,
      },
    });

    return data;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch post");
  }
}
