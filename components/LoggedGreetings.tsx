import { auth } from "@/lib/auth";
import Link from "next/link";
type Session = typeof auth.$Infer.Session;

export default function LoggedGreetings({ user }: { user: Session["user"] }) {
  return (
    <div className="text-center py-12 px-4  rounded-2xl">
      <h2 className="text-3xl font-bold mb-3 text-foreground ">
        Welcome back, {user.name} 👋
      </h2>
      <p className="mb-6 text-foreground">Ready to share your ideas today?</p>
      <div className="flex flex-col items-center justify-center gap-4 ">
        <Link
          href="/post/new"
          className="px-4 py-2 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
        >
          Create new post
        </Link>
        {/* <Link
          href="/dashboard"
          className="px-4 py-2 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
        >
          Dashboard
        </Link> */}
      </div>
    </div>
  );
}
