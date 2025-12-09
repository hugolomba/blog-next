// import { useAuth } from "../contexts/authContext"
// import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function Navbar() {
  // const { user, logout, loading } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);
  // const menuRef = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();

  return (
    <nav className="navbar p-2 flex justify-between items-center font-poppins relative bg-white rounded-lg ">
      <Link
        href="/"
        className="hover:text-gray-600 flex-1 text-3xl font-bold bg-gradient-to-b from-blue-600 to-purple-800 bg-clip-text text-transparent"
      >
        <h1 className="inline-block">Blog</h1>
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/login" className="px-4 py-2 text-gray-700">
          Login
        </Link>
        <Link
          href="/register"
          className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow hover:scale-105 transition"
        >
          Register
        </Link>
      </div>

      {/* User menu */}
    </nav>
  );
}

export default Navbar;
