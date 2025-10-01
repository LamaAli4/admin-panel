import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-6 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
