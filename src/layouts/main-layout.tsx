import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
