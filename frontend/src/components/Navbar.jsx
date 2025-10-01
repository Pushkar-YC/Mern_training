import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Auth App</h1>
      <div className="space-x-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${
              location.pathname === link.to
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            } hover:text-blue-500 transition`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
