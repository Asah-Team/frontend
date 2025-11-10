import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, AlertCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State detail mesin dari backend
  const [machine, setMachine] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [error, setError] = useState(false);

  // Popup Create Ticket
  const [showPopup, setShowPopup] = useState(false);
  const [ticket, setTicket] = useState({
    priority: "Warning",
    date: "",
    title: "",
    description: "",
  });

  // Fetch detail dari backend
  useEffect(() => {
    async function fetchMachine() {
      try {
        const res = await fetch(`http://localhost:3000/api/machines/${id}`);
        if (!res.ok) throw new Error("not available");
        const data = await res.json();

        setMachine(data);
        setTempData(Array.isArray(data.temperatureTrend) ? data.temperatureTrend : []);
        setError(false);
      } catch (e) {
        console.error("Gagal memuat detail mesin:", e);
        setError(true);
      }
    }
    fetchMachine();
  }, [id]);

  // Create Ticket -> POST ke backend, lalu pindah ke /ticket
  const handleCreateTicket = async () => {
    try {
      await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId: id, ...ticket }),
      });

      setShowPopup(false);
      setTicket({ priority: "Warning", date: "", title: "", description: "" });
      navigate("/ticket");
    } catch (err) {
      console.error("Gagal membuat ticket:", err);
      alert("Gagal membuat ticket.");
    }
  };

  if (error) {
    return (
      <div className="p-8 bg-white rounded-2xl shadow-md h-[94vh] overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Detail Machine</h1>
        <p className="text-center text-gray-500 mt-20">Gagal menampilkan Detail Mesin</p>
      </div>
    );
  }

  // Loading 
  if (!machine) {
    return (
      <div className="p-8 bg-white rounded-2xl shadow-md h-[94vh] overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Detail Machine</h1>
        <p className="text-center text-gray-400 mt-20">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md h-[94vh] overflow-auto">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Detail Machine</h1>
          <p className="text-sm text-gray-500">ID: {machine.id}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} /> Create Ticket
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Summary 3 Card diatas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Health Score" value={`${machine.score ?? "-"}%`} />
        <SummaryCard label="Rata-rata Suhu" value={`${machine.avgTemp ?? "-"}°C`} />
        <SummaryCard label="Rata-rata Tool Wear" value={`${machine.avgWear ?? "-"}%`} />
      </div>

      {/* Grafik */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <p className="font-semibold mb-3">Grafik Suhu</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tempData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#colorTemp)"
              />
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendation */}
      <div className="border rounded-xl p-5 bg-blue-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600" />
          <div>
            <p className="font-semibold">Maintenance Recommendations</p>
            <p className="text-sm text-gray-600 mt-1">
              {(machine.recommendation && machine.recommendation.message) || "-"}
              {machine?.recommendation?.daysLeft
                ? ` (within ${machine.recommendation.daysLeft} days)`
                : ""}
            </p>
          </div>
        </div>
      </div>

      {showPopup && (
        <CreateTicketPopup
          ticket={ticket}
          setTicket={setTicket}
          onClose={() => setShowPopup(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="border rounded-xl px-5 py-4 bg-gray-50 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}

function CreateTicketPopup({ ticket, setTicket, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-7 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create Ticket</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold">Priority</label>
            <select
              value={ticket.priority}
              onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
              className="border rounded-lg px-2 h-[44px] w-[220px]"
            >
              <option>Critical</option>
              <option>Warning</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Due Date</label>
            <input
              type="date"
              value={ticket.date}
              onChange={(e) => setTicket({ ...ticket, date: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>

        <label className="text-sm font-semibold">Title</label>
        <input
          type="text"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          className="border rounded-lg p-2 w-full mb-4"
        />

        <label className="text-sm font-semibold">Description</label>
        <textarea
          value={ticket.description}
          onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
          className="border rounded-lg p-2 w-full h-28"
        />

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}