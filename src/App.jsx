import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Overview from "./pages/Overview.jsx";
import Machine from "./pages/Machine.jsx";
import MachineDetail from "./pages/MachineDetail.jsx";
import Ticket from "./pages/Ticket.jsx";
import Chat from "./pages/Chat.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/machine" element={<Machine />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}