import React from "react";

export default function RingkasanStatusMesin({ machines = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-3">Ringkasan Status Mesin</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2">ID Mesin</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Skor</th>
              <th className="px-4 py-2">Suhu</th>
              <th className="px-4 py-2">Tool Wear</th>
              <th className="px-4 py-2">Kecepatan</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>

          <tbody>
            {machines.length > 0 ? (
              machines.map((m) => (
                <tr key={m.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{m.id}</td>
                  <td className="px-4 py-2">{m.status}</td>
                  <td className="px-4 py-2">{m.skor}</td>
                  <td className="px-4 py-2">{m.suhu}</td>
                  <td className="px-4 py-2">{m.wear}</td>
                  <td className="px-4 py-2">{m.speed}</td>
                  <td className="px-4 py-2">{m.update}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">
                  Data mesin belum tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}