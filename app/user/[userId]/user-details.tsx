"use client";

import CommentCard from "@/components/CommentCard";
import PostCard from "@/components/PostCard";
import { Prisma } from "@/prisma/generated/client";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function UserDetails({
  user,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      posts: {
        include: { author: true; comments: { include: { author: true } } };
      };
      comments: { include: { author: true } };
    };
  }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <Link
        href={`mailto:${user.email}?subject=Hello&body=Hi%20there!`}
        className="py-2 px-4 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
      >
        Get in touch
      </Link>

      <div className="flex justify-center w-full flex-col px-4 items-center">
        <Tabs aria-label="Options">
          <Tab key="articles" title="Articles" className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
              {user.posts &&
                user.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          </Tab>

          <Tab key="comments" title="Comments">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
              {user.comments.map((comment) => (
                <Link key={comment.id} href={`/post/${comment.postId}`}>
                  <CommentCard key={comment.id} comment={comment} />
                </Link>
              ))}
            </div>
          </Tab>
          <Tab key="savedPosts" title="Saved Posts">
            <Card>
              <CardBody>
                <p className="text-center">
                  This functionality is coming soon.
                </p>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
