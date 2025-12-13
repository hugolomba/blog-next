// lib/api.ts
import { prisma } from "@/lib/prisma";

// Get all published posts
export async function getPublishedPosts() {
  const res = await prisma.post.findMany({
    where: {},
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res;
}

// Get a post by its ID
export async function getPostById(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(postId) },
    include: {
      author: true,
      comments: true,
    },
  });
  if (!post) throw new Error("Error fetching post by ID");
  return post;
}

// Search posts by query
export async function searchPosts(query: string) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  return posts;
}
