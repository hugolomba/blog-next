import AuthorDetails from "@/components/AuthorDetails";
import { getUserById } from "@/lib/api";
import UserDetails from "./user-details";
import { Avatar } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const user = await getUserById(userId);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("UserPage session:", session?.user.id);
  console.log("UserPage userId:", userId);

  return (
    <div className="container mx-auto max-w-7xl flex flex-col items-center mt-6 gap-2 p-4">
      <AuthorDetails author={user} />

      {session?.user.id === userId && (
        <a
          href={`/user/edit`}
          className="p-1 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
        >
          Edit Profile
        </a>
      )}
      <UserDetails user={user} />
    </div>
  );
}
