"use server";

// create a post
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/dist/server/request/headers";

export async function createPost(
  title: string,
  content: string,
  coverImageUrl: string | null,
  authorId: string
) {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      coverImage: coverImageUrl || null,
      authorId,
    },
  });

  revalidatePath("/");

  return newPost;
}

// delete a post
export async function deletePost(postId: number) {
  // Security check to avoid unauthorized deletions
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const response = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  if (response) {
    console.log(`Post with ID ${postId} deleted successfully.`);
  } else {
    console.log(`Failed to delete post with ID ${postId}.`);
  }

  return response;
}

// update a post
export async function updatePost({
  id,
  title,
  content,
  coverImage,
}: {
  id: number;
  title: string;
  content: string;
  coverImage: string | null;
}) {
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      coverImage: coverImage || null,
    },
  });

  revalidatePath("/");

  return updatedPost;
}
