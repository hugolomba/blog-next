import type { Prisma } from "@/prisma/generated/client";

import Image from "next/image";
import Link from "next/link";

export default function AuthorDetails({
  author,
}: {
  author: Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      email: true;
      image: true;
      bio: true;
    };
  }>;
}) {
  return (
    <Link
      href={`/user/${author.id}`}
      className="w-full flex flex-col gap-1 items-center  p-4 "
    >
      <Image
        src={author.image || ""}
        alt={author.name}
        width={60}
        height={60}
        className="inline-block w-15 h-15 rounded-full mr-2 object-cover"
      />
      <div className="text-center">
        <h4 className="text-xl text-foreground font-semibold mt-2">
          About {author.name}
        </h4>
        <p className="text-foreground/60">{author.bio}</p>
      </div>
    </Link>
  );
}
