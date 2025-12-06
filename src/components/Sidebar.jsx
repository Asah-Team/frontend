import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Cpu, MessageSquare, Ticket, Settings, Menu } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(() => localStorage.getItem("sidebarOpen") === "true");

  const toggleSidebar = () => {
    setOpen(!open);
    localStorage.setItem("sidebarOpen", !open);
  };

  const navItems = [
    { path: "/", icon: <LayoutDashboard size={22} />, label: "Dashboard" },
    { path: "/chat", icon: <MessageSquare size={22} />, label: "Chat" },
    { path: "/machines", icon: <Cpu size={22} />, label: "Machines" },
    { path: "/ticket", icon: <Ticket size={22} />, label: "Tickets" },
    { path: "/settings", icon: <Settings size={22} />, label: "Settings" },
  ];

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);

  return (
    <div className={`border-r border-gray-200 bg-white flex flex-col py-6 h-full flex-shrink-0 relative transition-all duration-500 ease-in-out 
      ${open ? "w-64" : "w-20"}`}>
      {/* HEADER */}
      <div className="flex items-center px-4 mb-10 h-12 relative overflow-hidden">
        <div className="min-w-[44px] h-11 bg-white border border-blue-100 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 z-10 flex-shrink-0">
          <img src="/sentry-logo.png" alt="Sentry Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className={`flex flex-col justify-center whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out 
          ${open ? "max-w-[200px] opacity-100 translate-x-0 ml-3" : "max-w-0 opacity-0 -translate-x-5 ml-0"}`}>    
          <span className="text-2xl font-black text-gray-800 tracking-tight leading-none">Sentry<span className="text-blue-600">.</span></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 ml-0.5">Asset Guardian</span>
        </div>
      </div>

      {/* TOGGLE BUTTON */}
      <button onClick={toggleSidebar} className="absolute -right-3 top-9 bg-white border border-gray-200 shadow-md rounded-full p-1.5 text-gray-500 
      hover:text-blue-600 hover:scale-110 transition-all duration-300 z-50 cursor-pointer">
        <Menu size={14} strokeWidth={3} />
      </button>

      {/* MENU ITEMS */}
      <div className="flex flex-col gap-2 px-0 relative">
        
        {/* SLIDING PILL (Box Biru) */}
        {activeIndex !== -1 && (
          <div 
            className={`absolute left-4 top-0 rounded-xl bg-blue-50 border border-blue-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0
              ${open ? "w-52" : "w-11"}
            `}
            style={{ 
              height: '44px',
              transform: `translateY(${activeIndex * 52}px)` 
            }}
          >
            {/* Sliding Border */}
            {open && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-full"></div>}
          </div>
        )}

        {navItems.map((item, i) => {
          const active = location.pathname === item.path;
          return (
            <Link key={i} to={item.path} 
              style={{ transitionDelay: open ? `${i * 70}ms` : '0ms' }}
              className={`flex items-center h-11 rounded-xl group relative overflow-hidden ml-4 transition-all duration-500 ease-in-out z-10
                ${open ? "w-52" : "w-11"}
              `}
            >
              {/* Icon Container */}
              <div className={`min-w-[44px] h-full flex items-center justify-center transition-colors duration-200 
                ${active ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"}`}>
                {item.icon}
              </div>
              
              {/* Text Label */}
              <div 
                style={{ transitionDelay: open ? `${i * 70 + 100}ms` : '0ms' }}
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap 
                  ${open ? "max-w-[200px] opacity-100 ml-1" : "max-w-0 opacity-0 ml-0"}`}
              >
                <span className={`text-[15px] transition-colors duration-200 
                  ${active ? "text-blue-700 font-bold" : "text-gray-500 group-hover:text-gray-900"}
                `}>
                  {item.label}
                </span>
              </div>
              
              {!open && (
                <div className="absolute left-12 ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 
                group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-50 pointer-events-none translate-x-2 group-hover:translate-x-0">
                  {item.label}<div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className={`mt-auto px-6 pb-6 text-center overflow-hidden transition-all duration-700 whitespace-nowrap 
        ${open ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-[10px] text-gray-300 font-medium font-mono">Sentry v1.0.0</p>
      </div>
    </div>
  );
}