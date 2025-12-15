"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/dist/server/request/headers";

export async function createComment(
  content: string,
  authorId: string,
  postId: number
) {
  await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}

export async function deleteComment(commentId: number, postId: number) {
  // Security check to avoid unauthorized deletions
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const response = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(`/post/${postId}`);
  return response;
}
