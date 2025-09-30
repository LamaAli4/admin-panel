import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col">
      <div className="px-lg py-md text-2xl font-bold mb-3">LOGO</div>
      <nav className="flex-1 px-md py-sm">
        <ul className="space-y-sm">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-sm px-md py-sm rounded-lg transition-colors no-underline cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
