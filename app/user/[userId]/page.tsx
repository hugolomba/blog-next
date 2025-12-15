import AuthorDetails from "@/components/AuthorDetails";
import { getUserById } from "@/lib/api";
import UserDetails from "./user-details";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;

  const user = await getUserById(userId);

  return (
    <div className="container mx-auto max-w-7xl">
      <AuthorDetails author={user} />
      <UserDetails user={user} />
    </div>
  );
}
