import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Machine() {
  const navigate = useNavigate();

  // State data mesin dari backend
  const [machines, setMachines] = useState([]);

  // State untuk search
  const [search, setSearch] = useState("");

  // fetch data mesin dari backend
  // setiap mesin memiliki properti: id, name, score(0-100), status
  useEffect(() => {
    async function fetchMachines() {
      try {
        const res = await fetch("http://localhost:3000/api/machines");
        const data = await res.json();
        setMachines(data);
      } catch (err) {
        console.error("Gagal memuat data mesin:", err);
      }
    }

    fetchMachines();

    // (Opsional) auto refresh dashboard setiap 5 detik
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter mesin berdasarkan search
  const filtered = machines.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md h-[94vh] overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Machine</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-3 px-4 py-3 border rounded-xl bg-gray-50 mb-8">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search Machines ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Grid daftar mesin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => {
          const stat = m.status || {
            label: "-",
            color: "bg-gray-200 text-gray-600",
            bar: "#d1d5db",
          };

          // Data untuk progress bar
          const chartData = [{ name: "Health", value: m.score }];

          return (
            <div
              key={m.id}
              onClick={() => navigate(`/machine/${m.id}`)} 
              className="cursor-pointer p-5 bg-gray-50 border rounded-xl shadow-sm hover:shadow-md transition">
                
              {/* Nama mesin + status */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold">{m.name}</h2>
                  <p className="text-sm text-gray-500">{m.id}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stat.color}`}>
                  {stat.label}
                </span>
              </div>

              {/* Label */}
              <p className="text-sm text-gray-500 mb-2">Health Score</p>

              {/* Progress bar */}
              <div className="h-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Bar
                      dataKey="value"
                      barSize={14}
                      fill={stat.bar} // warna dari backend
                      background={{ fill: "#e5e7eb", radius: 8 }}
                      radius={[8, 8, 8, 8]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Persentase */}
              <p className="text-sm font-semibold mt-2">{m.score}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}