import { LayoutDashboard, Users, ShoppingCart } from "lucide-react";

export type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
];
