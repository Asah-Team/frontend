import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Cpu, MessageSquare, Ticket, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <Home size={22} />, label: "Overview" },
    { path: "/chat", icon: <MessageSquare size={22} />, label: "Chat" },
    { path: "/machine", icon: <Cpu size={22} />, label: "Machine" },
    { path: "/ticket", icon: <Ticket size={22} />, label: "Ticket" },
    { path: "/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-6 mt-4">
        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "text-black hover:bg-gray-100"
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}