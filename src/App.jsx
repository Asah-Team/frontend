import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "./pages/Overview";
import Machine from "./pages/Machine";
import MachineDetail from "./pages/MachineDetail";
import Chat from "./pages/Chat";
import Ticket from "./pages/Ticket";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED LAYOUT */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="machines" element={<Machine />} />
        <Route path="machines/:id" element={<MachineDetail />} />
        <Route path="chat" element={<Chat />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
