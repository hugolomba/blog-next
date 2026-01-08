import { auth } from "@/lib/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";
import { EditUserForm } from "./edit-form";

export default async function UserEditPage({
  searchParams,
}: {
  searchParams?: { fromLogin?: string };
}) {
  // get the user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const editType = searchParams?.fromLogin ? "afterLogin" : "profile";

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center mt-4">
        Edit Your Profile
      </h1>
      <EditUserForm user={session.user} editType={editType} />
    </>
  );
}
