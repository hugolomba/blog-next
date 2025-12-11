import type { Prisma } from "@/prisma/generated/client";

import Image from "next/image";

export default function AuthorDetails({
  author,
}: {
  author: Prisma.UserGetPayload<{
    select: {
      name: true;
      surname: true;
      avatarImage: true;
      bio: true;
    };
  }>;
}) {
  return (
    <div className="flex flex-col gap-1 items-left mt-8 p-4 border-t border-gray-300 border-b">
      <Image
        src={author.avatarImage}
        alt={author.name}
        width={60}
        height={60}
        className="inline-block w-15 h-15 rounded-full mr-2 object-cover"
      />
      <h4 className="text-xl text-gray-600 font-semibold mt-2">
        Written by {author.name} {author.surname}
      </h4>
      <p className="text-gray-500">{author.bio}</p>
    </div>
  );
}
