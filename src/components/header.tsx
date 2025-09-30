import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <header className="px-lg py-md">
      <h1 className="text-2xl">Hi, Welcome back 👋</h1>
    </header>
  );
}
