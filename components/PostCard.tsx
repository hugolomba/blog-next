"use client";
import { Link } from "@heroui/link";
import Image from "next/image";
import type { Prisma } from "@/prisma/generated/client";

import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";

export default function PostCard({
  post,
}: {
  post: Prisma.PostGetPayload<{
    include: {
      author: true;
      comments: true;
      likes: true;
      categories: true;
      savedBy: true;
    };
  }>;
}) {
  // };

  return (
    <Link href={`/post/${post.id}`} className="items-stretch">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
          <Image
            src={post.coverImage || ""}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-42 object-cover rounded-md"
          />
          <p className="mt-2 text-md uppercase font-bold line-clamp-1">
            {post.title}
          </p>

          {/* <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4> */}
        </CardHeader>
        <CardBody
          className="py-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        >
          {/* <div
          className="prose prose-lg max-w-none line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
         */}
        </CardBody>

        <CardFooter className="pt-2 px-4">
          {/* <div className="text-gray-600 flex items-center gap-2 cursor-pointer">
            <span className="flex flex-row items-center gap-0.5">
              <FaRegComment /> {post.comments.length}
            </span>
          </div> */}
          <div className="text-sm text-gray-500 flex justify-between items-center w-100">
            <span>
              Published on: {new Date(post.createdAt).toLocaleDateString()}{" "}
            </span>

            <Avatar
              src={post.author.image || ""}
              alt={post.author.name}
              className="ml-2"
            />
          </div>
          {/* <div className="flex justify-between mt-2 gap-6">
            <div className="text-gray-500 text-sm flex gap-2 align-center">
              <span>{post.author.name}</span>
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={18}
                  height={18}
                  className="rounded-full"
                />
              )}
            </div>
          </div> */}
        </CardFooter>
      </Card>
    </Link>
  );
}
