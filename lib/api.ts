// lib/api.ts
import { prisma } from "@/lib/prisma";

export async function getPosts() {
  const res = await fetch(`${process.env.API_URL_BASE}/posts/published`);
  if (!res.ok) throw new Error("Error fetching posts");

  // Sort posts by createdAt in descending order
  const posts = (await res.json()) as { createdAt: string }[];
  return posts.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}
export async function getPostById(postId: string) {
  const res = await fetch(`${process.env.API_URL_BASE}/posts/${postId}`);
  if (!res.ok) throw new Error("Error fetching post by ID");
  return res.json();
}
