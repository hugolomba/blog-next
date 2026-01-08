import { headers } from "next/dist/server/request/headers";
import PostForm from "./post-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="text-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-3 text-foreground">
        Create a New Post ✨
      </h1>
      <p className="text-foreground mb-5">
        Share your ideas and stories with the world by creating a new blog post.
      </p>

      <PostForm mode="create" authorId={session?.user.id} />
    </div>
  );
}
