import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500">❌ Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Profile</h2>
        <p className="mb-2"><b>Name:</b> {user.fullName}</p>
        <p className="mb-2"><b>Email:</b> {user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
