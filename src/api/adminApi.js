import axiosClient from "./axiosClient";

export const adminServices = {
  // User Management
  getAllUsers: () => axiosClient.get("/users"),
  updateUserRole: (userId, role) => axiosClient.patch(`/users/${userId}/role`, { role }),
  toggleUserStatus: (userId, action) => axiosClient.patch(`/users/${userId}/${action}`), // action: 'activate' | 'deactivate'
  
  // Simulator Controls
  startNormalSimulator: () => axiosClient.post("/sensors/simulator/start"),
  startAnomalySimulator: (machineId) => axiosClient.post(`/sensors/simulator/anomaly/${machineId}`),
  stopSimulator: () => axiosClient.post("/sensors/simulator/stop"),
  getSimulatorStatus: () => axiosClient.get("/sensors/simulator/status"),

  // Technician Tasks
  getAllTickets: () => axiosClient.get("/maintenance-tickets"),
  updateTicketStatus: (ticketId, status) => axiosClient.patch(`/maintenance-tickets/${ticketId}`, { status }),
};