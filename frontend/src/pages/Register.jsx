// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
  // 👇 use fullName instead of username
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/register", form);
      console.log("Register success:", res.data);

      // store token if provided by backend
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // redirect to welcome page
      navigate("/welcome");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.errors?.[0]?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700 w-[100vw]">
      <form
        onSubmit={handleSubmit}
        className="bg-sky-300 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Error message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <input
          type="text"
          name="fullName" // 👈 changed
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Register
        </button>

        {/* link to login page */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
