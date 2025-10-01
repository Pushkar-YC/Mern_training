// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); //use navigation hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      console.log("Login success:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/welcome"); // go to welcome page
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-[100vw]">
      <form onSubmit={handleSubmit} className="bg-amberyield this.ask('', 'default').print() p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
