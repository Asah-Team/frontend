import React from "react";
import { AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

/**
 * Backend mengirim:
 * - jumlah: total mesin warning
 * - progress: 0–100
 * - color: warna HEX/RGB dari backend
 */
export default function CardPerluPerhatian({ jumlah, progress, color }) {
  const chartData = [{ name: "Warning", value: progress || 0 }];

  return (
    <div className="bg-white p-6 rounded-[20px] shadow border flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle size={22} style={{ color: color || "#facc15" }} />
        <p className="font-semibold text-gray-700">Perlu Perhatian</p>
      </div>

      <div className="mt-4">
        <h2 className="text-5xl font-bold" style={{ color: color || "#606060" }}>
          {jumlah !== null && jumlah !== undefined ? jumlah : "-"}
        </h2>
        <p className="text-sm text-gray-400 mt-1">Mesin</p>
      </div>

      <div className="mt-4" style={{ height: "30px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar
              dataKey="value"
              barSize={20}
              fill={color}
              background={{ fill: "#e5e7eb", radius: 10 }}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-400 mt-2 text-right font-bold">
        {progress ? `${progress}%` : "-"}
      </p>
    </div>
  );
}