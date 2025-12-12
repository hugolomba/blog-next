// import { useAuth } from "../contexts/authContext";
// import LoggedGreetings from "./LoggedGreetings";
import NotLoggedGreeting from "@/components/NotLoggedGreeting";
import LoggedGreetings from "@/components/LoggedGreetings";
import Search from "./Search";
import { auth } from "@/lib/auth";

export default async function Header() {
  // const session = await auth();
  const session = null;

  return (
    <section className="text-gray-800 mb-4 rounded-xl ">
      {session ? <LoggedGreetings user={session} /> : <NotLoggedGreeting />}
      <Search />
    </section>
  );
}
