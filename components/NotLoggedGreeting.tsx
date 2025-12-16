// import { Link } from "react-router-dom";
import Link from "next/link";

export default function NotLoggedGreeting() {
  return (
    <div className="text-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-3 text-foreground">
        Start your blog today ✨
      </h2>
      <p className="text-foreground mb-5">
        Create your space, share ideas, and inspire people all over the world.
      </p>
      <Link
        href="/auth"
        className="px-4 py-2 bg-linear-to-r from-pink-500 to-yellow-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
      >
        Create your account now
      </Link>
      <h3 className="text-center text-foreground mt-8">
        Feel free to explore and enjoy reading!
      </h3>
    </div>
  );
}
