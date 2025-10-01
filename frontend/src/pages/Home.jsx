// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[100vw] bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🚀 Welcome to Auth App</h1>
      <p className="text-lg text-gray-300 mb-8">Please choose an option:</p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
