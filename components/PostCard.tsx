"use client";
import { Link } from "@heroui/link";
import Image from "next/image";
import type { Prisma } from "@/prisma/generated/client";

import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";

export default function PostCard({
  post,
  cardType,
}: {
  post: Prisma.PostGetPayload<{
    include: {
      author: true;
      comments: {
        include: {
          author: true;
        };
      };
    };
  }>;
  cardType?: "sidebar" | null;
}) {
  // };

  return (
    <Link href={`/post/${post.id}`} className="items-stretch w-full">
      <Card fullWidth className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
          <Image
            src={post.coverImage || ""}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-24 lg:h-42 object-cover rounded-md"
          />
          <p className="mt-2 text-md uppercase font-bold line-clamp-1">
            {post.title}
          </p>
        </CardHeader>
        {cardType !== "sidebar" && (
          <CardBody
            className="py-2 line-clamp-2 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></CardBody>
        )}

        {cardType !== "sidebar" && (
          <CardFooter className="pt-2 px-4">
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
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
