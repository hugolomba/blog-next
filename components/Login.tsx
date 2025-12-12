export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <form className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="Username"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          className="px-2 py-1 rounded border"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 rounded border"
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
