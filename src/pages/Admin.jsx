import React, { useState, useEffect, useRef } from "react";
import { adminServices } from "../api/adminServices";
import { toast } from "react-hot-toast";
import { Filter, RotateCw } from "lucide-react";

import AdminStats from "../components/admin/AdminStats";
import SimulatorPanel from "../components/admin/SimulatorPanel";
import UsersTable from "../components/admin/UsersTable";

import { EditUserPopup, EditRolePopup } from "../components/admin/AdminPopups"; 

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simStatus, setSimStatus] = useState("Unknown");
  const [simType, setSimType] = useState(null); 
  const anomalyIntervalRef = useRef(null); 

  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Popup State
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [rolePopupOpen, setRolePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers(); fetchMachines(); checkSimStatus();
    return () => clearInterval(anomalyIntervalRef.current); 
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try { const { data } = await adminServices.getAllUsers(); setUsers(data); } 
    catch (err) { toast.error("Failed to load users"); } finally { setLoading(false); }
  };

  const fetchMachines = async () => {
    try { const { data } = await adminServices.getMachines(); setMachines(data.data || data); } catch (err) {}
  };

  const checkSimStatus = async () => {
    try {
      const { data } = await adminServices.getSimulatorStatus();
      setSimStatus(data.isRunning ? "Running" : "Stopped");
      if (data.isRunning && !simType) setSimType('normal'); 
    } catch (err) {}
  };

  // Simulator Logic
  const handleStartNormal = async () => {
    clearInterval(anomalyIntervalRef.current);
    try { await adminServices.startNormalSimulator(); setSimType('normal'); setSimStatus('Running'); toast.success("Normal Started"); } catch (err) {}
  };

  const handleStartAnomaly = async () => {
    if (machines.length === 0) return toast.error("No machines");
    if (simType === 'normal') await adminServices.stopSimulator();
    setSimType('anomaly'); setSimStatus('Running'); toast.success("Anomaly Started");
    anomalyIntervalRef.current = setInterval(async () => {
        const rnd = machines[Math.floor(Math.random() * machines.length)];
        try { await adminServices.triggerAnomaly(rnd.id); } catch(e){}
    }, 5000);
  };

  const handleStopAll = async () => {
    clearInterval(anomalyIntervalRef.current);
    try { await adminServices.stopSimulator(); setSimStatus('Stopped'); setSimType(null); toast.success("Stopped"); } catch (err) {}
  };

  // User Actions
  const handleToggleStatus = async (id, isActive) => {
    try { await adminServices.toggleUserStatus(id, isActive ? "deactivate" : "activate"); fetchUsers(); toast.success("Status Updated"); } catch (err) {}
  };

  const handleUpdateRole = async (newRole) => {
    try { await adminServices.updateUserRole(selectedUser.id, newRole); toast.success("Role updated"); setRolePopupOpen(false); fetchUsers(); } catch (err) {}
  };

  const stats = {
    total: users.length, active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length, admins: users.filter(u => u.role === 'admin').length
  };

  const filteredUsers = users.filter(u => (filterRole === "all" || u.role === filterRole) && (filterStatus === "all" || (filterStatus === "active" ? u.isActive : !u.isActive)));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans text-gray-800">
      
      <AdminStats stats={stats} />
      <SimulatorPanel simType={simType} onStartNormal={handleStartNormal} onStartAnomaly={handleStartAnomaly} onStop={handleStopAll} />

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <span className="text-gray-600 font-semibold flex items-center text-sm"><Filter size={16} className="mr-2" /> Filter:</span>
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 outline-none" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option><option value="admin">Admin</option><option value="technician">Technician</option><option value="operator">Operator</option>
            </select>
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 outline-none" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
        </div>
        <button onClick={fetchUsers} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition shadow-sm"><RotateCw size={16} /> Refresh</button>
      </div>

      <UsersTable 
        users={filteredUsers} 
        loading={loading} 
        onEdit={(u)=>{setSelectedUser(u); setEditPopupOpen(true)}} 
        onRole={(u)=>{setSelectedUser(u); setRolePopupOpen(true)}} 
        onToggleStatus={handleToggleStatus} 
      />

      {/* Gunakan Komponen Popup Baru */}
      <EditUserPopup 
        isOpen={editPopupOpen} 
        user={selectedUser} 
        onClose={()=>setEditPopupOpen(false)} 
        onConfirm={()=>{setEditPopupOpen(false); toast.success("User updated")}} 
      />
      
      <EditRolePopup 
        isOpen={rolePopupOpen} 
        user={selectedUser} 
        onClose={()=>setRolePopupOpen(false)} 
        onConfirm={handleUpdateRole} 
      />
    </div>
  );
};

export default Admin;