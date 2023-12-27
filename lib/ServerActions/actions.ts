"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreatePost, DeletePost, LikeSchema } from "../schemas";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();

  const validatedFields = CreatePost.safeParse(values); // Values validating in the server

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl, caption } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database Error. Failed to Create Post",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
export async function deletePost(formData: FormData) {
  const userId = await getUserId();

  const { id } = DeletePost.parse({
    id: formData.get("id"),
  });

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");

    return { message: "Deleted post." };
  } catch (error) {
    return { message: "Database Error. Failed to delete post" };
  }
}

export async function likePost(value: FormDataEntryValue | null) {
  const userId = await getUserId();

  const validatedFields = LikeSchema.safeParse({ postId: value });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to like post",
    };
  }

  const { postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const like = await prisma.like.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (like) {
    try {
      await prisma.like.delete({
        where: {
          postId_userId: { postId, userId },
        },
      });

      revalidatePath("/dashboard");
      return { message: "Unlike Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Unlike Post." };
    }
  }

  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return {
      message: "Liked Post.",
    };
  } catch (error) {
    return { message: "Database Error: Failed to Like Post." };
  }
}
