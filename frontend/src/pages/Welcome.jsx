// src/pages/Welcome.jsx
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/register"); // go to register
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[100vw]">
      <h1 className="text-3xl font-bold mb-6">🚀 Welcome to Auth App</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Welcome;
