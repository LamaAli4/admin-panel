import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-5 mt-15">
        <main className="flex-1 p-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
