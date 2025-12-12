"use client";
import Login from "@/components/Login";
// import { signIn } from "@/auth";
// import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  // const navigate = useNavigate();
  // const { user } = useAuth();
  // if (user) {
  //     navigate("/");
  // }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <Login />
      <button className="mt-4 text-blue-500 underline" onClick={() => login()}>
        Sign in with GitHub
      </button>
    </div>
  );
}
