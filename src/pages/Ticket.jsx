import React, { useEffect, useState } from "react";

// Utility Waktu
function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diff = now - target;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days === 0 ? "today" : `${days} days ago`;
}

function daysUntil(date) {
  const now = new Date();
  const target = new Date(date);
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Prioritas (Critical, Warning)
function PriorityBadge({ priority }) {
  const colors = {
    critical: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-md ${colors[priority] || "bg-gray-100 text-gray-600"}`}>
      {priority}
    </span>
  );
}

// list item tiket
function TicketItem({ t, onView }) {
  return (
    <div className="w-full bg-white border rounded-2xl px-6 py-5 shadow-sm flex items-start justify-between gap-6">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">
            {t.title} <span className="text-gray-500">({t.machineId})</span>
          </h3>
          <PriorityBadge priority={t.priority} />
        </div>

        <p className="text-sm text-gray-400 mt-1">Ticket {t.number}</p>
        <p className="text-[15px] text-gray-600 mt-3 leading-relaxed">{t.description}</p>
      </div>

      <button
        onClick={() => onView(t)}
        className="self-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
      >
        View Details
      </button>
    </div>
  );
}

//  Ticket Detail 
function TicketDetail({ open, ticket, onClose, onDone }) {
  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-7">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Ticket {ticket.number}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="border rounded-2xl p-5">
          <p className="font-semibold mb-5">Details</p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500">Machine</p>
              <p className="text-lg font-semibold">{ticket.machineId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <p className="text-lg font-semibold capitalize">{ticket.priority}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-lg font-semibold">{ticket.createdHuman}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="text-lg font-semibold">{ticket.dueInDays} days</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-1">Description</p>
          <p className="text-[15px] text-gray-700 leading-7">{ticket.description}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => onDone(ticket.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// Page Ticket 
export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tickets?status=open");
      const data = await res.json();

      setTickets(
        data.map(t => ({
          ...t,
          createdHuman: formatRelativeTime(t.createdAt),
          dueInDays: daysUntil(t.dueDate)
        }))
      );
    } catch (err) {
      console.error("Gagal menampilkan tiket:", err);
      setTickets([]); 
    }
  };

  const handleDone = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tickets/${id}/close`, { method: "PUT" });
    } catch {}
    setTickets((prev) => prev.filter((t) => t.id !== id));
    setOpen(false);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md h-[94vh] overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Ticket</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">No active tickets</p>
      ) : (
        <div className="space-y-5">
          {tickets.map((t) => (
            <TicketItem key={t.id} t={t} onView={(t) => { setSelected(t); setOpen(true); }} />
          ))}
        </div>
      )}

      <TicketDetail open={open} ticket={selected} onClose={() => setOpen(false)} onDone={handleDone} />
    </div>
  );
}