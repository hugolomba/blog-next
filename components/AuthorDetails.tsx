import type { Prisma } from "@/prisma/generated/client";

import Image from "next/image";

export default function AuthorDetails({
  author,
}: {
  author: Prisma.UserGetPayload<{
    select: {
      name: true;
      email: true;
      image: true;
      bio: true;
    };
  }>;
}) {
  return (
    <div className="w-full flex flex-row gap-1 items-center mt-8 p-4 border-t border-b">
      <Image
        src={author.image || ""}
        alt={author.name}
        width={60}
        height={60}
        className="inline-block w-15 h-15 rounded-full mr-2 object-cover"
      />
      <div>
        <h4 className="text-xl text-foreground font-semibold mt-2">
          Written by {author.name}
        </h4>
        <p className="text-foreground/60">{author.bio}</p>
      </div>
    </div>
  );
}
