import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  Home,
  User,
  Settings,
  Mail,
  BellDot,
} from "lucide-react";
import { _myAccount, _langs, _notifications } from "../_mock";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [lang, setLang] = useState(_langs[0]);
  const [openLang, setOpenLang] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const unreadCount = _notifications.filter((n) => n.isUnRead).length;

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setOpenLang(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpenUser(false);
      }
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        setOpenNotify(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-64 z-50 flex items-center justify-between 
                  px-lg py-md border-b transition-all duration-300
                  ${
                    isScrolled
                      ? "bg-white/70 backdrop-blur-md shadow-sm border-gray-200"
                      : "bg-transparent border-transparent"
                  }`}
    >
      {isHome && (
        <h1 className="text-2xl font-bold text-primary-darker">
          Hi, Welcome back 👋
        </h1>
      )}

      <div className="flex items-center gap-3 ml-auto">
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {openSearch && (
            <div className="absolute right-0 mt-sm w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-md flex items-center gap-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm text-gray-700"
              />
              <button className="px-md py-xs rounded-md bg-primary text-white text-sm hover:bg-primary-dark transition cursor-pointer">
                Search
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={langRef}>
          <button
            onClick={() => setOpenLang(!openLang)}
            className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
          >
            <img
              src={lang.icon}
              alt={lang.label}
              className="w-6 h-6 rounded-sm"
            />
          </button>

          {openLang && (
            <div className="absolute right-0 mt-sm w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
              {_langs.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setLang(option);
                    setOpenLang(false);
                  }}
                  className={`flex items-center gap-sm px-md py-sm text-sm w-full cursor-pointer hover:bg-primary-lighter/40 transition ${
                    lang.value === option.value
                      ? "bg-primary-lighter font-semibold"
                      : ""
                  }`}
                >
                  <img
                    src={option.icon}
                    alt={option.label}
                    className="w-5 h-5 rounded-sm"
                  />
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setOpenNotify(!openNotify)}
            className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
             hover:bg-gray-100 transition relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-error text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {openNotify && (
            <div className="absolute right-0 mt-sm w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-md py-sm bg-gray-50">
                <div>
                  <h3 className="font-semibold text-primary-dark">
                    Notifications
                  </h3>
                  <p className="text-xs text-gray-500">
                    You have {unreadCount} unread messages
                  </p>
                </div>
                <button className="text-xs text-primary hover:underline">
                  Mark all as read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <div className="px-md py-xs text-xs font-semibold text-gray-500 bg-gray-50">
                  NEW
                </div>
                <div className="space-y-sm">
                  {_notifications
                    .filter((n) => n.isUnRead)
                    .map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start gap-md px-md py-sm hover:bg-gray-50 transition"
                      >
                        {n.avatarUrl ? (
                          <img
                            src={n.avatarUrl}
                            alt={n.title}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-lighter text-primary">
                            <Mail className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {n.title}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {n.description}
                            </span>
                          </p>
                          <span className="text-xs text-gray-400">
                            {n.postedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-md px-md py-xs text-xs font-semibold text-gray-500 bg-gray-50">
                  BEFORE THAT
                </div>
                <div className="space-y-sm">
                  {_notifications
                    .filter((n) => !n.isUnRead)
                    .map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start gap-md px-md py-sm hover:bg-gray-50 transition"
                      >
                        {n.avatarUrl ? (
                          <img
                            src={n.avatarUrl}
                            alt={n.title}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            <BellDot className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {n.title}{" "}
                            <span className="text-xs font-normal text-gray-500">
                              {n.description}
                            </span>
                          </p>
                          <span className="text-xs text-gray-400">
                            {n.postedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="px-md py-sm text-center bg-gray-50">
                <button className="text-sm text-primary hover:underline">
                  View all
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            onClick={() => setOpenUser(!openUser)}
            className="w-10 h-10 flex items-center justify-center cursor-pointer
            rounded-full border-2 border-primary shadow-md overflow-hidden"
          >
            <img
              src={_myAccount.photoURL}
              alt={_myAccount.displayName}
              className="w-full h-full object-cover"
            />
          </button>

          {openUser && (
            <div className="absolute right-0 mt-sm w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="px-lg py-md border-b border-gray-200 bg-primary-lighter/40">
                <p className="text-sm font-semibold text-primary-dark">
                  {_myAccount.displayName}
                </p>
                <p className="text-xs text-gray-500">{_myAccount.email}</p>
              </div>

              <div className="py-sm">
                <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                  <Home className="w-5 h-5 text-primary-dark" />
                  Home
                </button>
                <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                  <User className="w-5 h-5 text-primary-dark" />
                  Profile
                </button>
                <button className="flex items-center gap-sm px-lg py-sm w-full text-sm text-gray-700 hover:bg-primary-lighter/60 transition cursor-pointer">
                  <Settings className="w-5 h-5 text-primary-dark" />
                  Settings
                </button>
              </div>

              <div className="border-t border-gray-200">
                <button className="flex items-center justify-center px-lg py-md w-full text-sm text-error font-medium hover:bg-error-lighter transition cursor-pointer">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
