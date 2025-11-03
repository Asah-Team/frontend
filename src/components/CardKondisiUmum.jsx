import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function CardKondisiUmum({ kondisiUmum, status }) {
  const value = kondisiUmum ?? 0;

  // Struktur data kosong untuk Recharts
  const data = [
    { name: "Kondisi", value },
    { name: "Sisa", value: 100 - value },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow border flex flex-col">
      {/* Header */}
      <p className="font-semibold text-gray-700 mb-3 text-left">
        Kondisi Umum Mesin
      </p>

      {/* Kontainer chart */}
      <div className="relative flex justify-center items-center mt-4 overflow-visible">
        {/* Gauge setengah lingkaran */}
        <PieChart width={240} height={160}>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={85}
            outerRadius={105}
            dataKey="value"
            stroke="none"
            cx="50%"
            cy="70%"
          >
            {/* Warna placeholder */}
            <Cell fill="#d1d5db" />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>

        {/* Teks di tengah setengah lingkaran */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <p className="text-2xl font-bold text-gray-700">
            {kondisiUmum != null ? `${kondisiUmum}%` : "-"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {status ?? "Status"}
          </p>
        </div>
      </div>
    </div>
  );
}