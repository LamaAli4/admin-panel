import { Link, useLocation } from "react-router-dom";
import { navItems } from "../layouts/nav-config-dashboard";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 border-r border-gray-200 
      flex flex-col shadow-md bg-white z-40"
    >
      <div className="px-lg py-md mb-md">
        <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 px-md py-sm overflow-y-auto">
        <ul className="space-y-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-sm px-md py-sm rounded-md transition-colors no-underline cursor-pointer ${
                    isActive
                      ? "bg-primary-lighter text-primary font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
