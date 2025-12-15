"use client";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Prisma } from "@/prisma/generated/client";
import type { JSX } from "react";

import { Avatar, Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function CommentCard({
  comment,
  user,
}: {
  comment: Prisma.CommentGetPayload<{
    include: { author: true };
  }>;
  user?: {
    id: string;
  };
}): JSX.Element {
  return (
    <Card key={comment.id} className="flex flex-col border-b  pb-2 relative">
      <CardBody>
        <Link
          href={`/user/${comment.authorId}`}
          className="text-foreground font-medium flex gap-2 items-center"
        >
          <Avatar src={comment.author.image || ""} alt={comment.author.name} />
          <h4 className="text-lg font-semibold inline-block">
            {comment.author.name}
          </h4>
        </Link>

        <p className="text-foreground mt-4">{comment.content}</p>
        <div className="text-foreground/40 text-sm flex justify-between mt-2 mb-2">
          <span className="">
            Posted on: {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>

        {comment.author.id === user?.id && (
          <span
            //   onClick={() => handleDeleteComment(comment.id)}
            className="text-gray-500 text-lg absolute right-5 top-5 active:text-red-800 hover:text-red-600"
          >
            <FaRegTrashAlt />
          </span>
        )}
      </CardBody>
    </Card>
  );
}
