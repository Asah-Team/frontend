import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Cpu, MessageSquare, Ticket, Settings, Menu } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", icon: <LayoutDashboard size={22} />, label: "Dashboard" },
    { path: "/chat", icon: <MessageSquare size={22} />, label: "Chat" },
    { path: "/machine", icon: <Cpu size={22} />, label: "Machine" },
    { path: "/ticket", icon: <Ticket size={22} />, label: "Ticket" },
    { path: "/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  return (
    <div
      className={`h-screen border-r border-gray-200 bg-white 
      flex flex-col py-6 transition-all duration-300 
      ${open ? "w-56" : "w-16"}`}
    >

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 ml-3 mb-8
                   rounded-lg hover:bg-gray-100 transition"
      >
        <Menu size={22} />
      </button>

      <div className="flex flex-col space-y-4">
        {navItems.map((item, i) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-3 py-3 px-3 mx-2 rounded-lg transition-all
                ${active ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-gray-100"}
              `}
            >
              <span>{item.icon}</span>

              {open && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
