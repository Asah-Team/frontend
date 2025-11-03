import React from "react";
import { Thermometer } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/**
 * Backend mengirim:
 * - avgTemp: rata-rata suhu
 * - chartData: [{ name: 'Senin', value: 38 }]
 * - color: warna garis dari backend
 */
export default function CardRataRataSuhu({ avgTemp, chartData, color }) {
  return (
    <div className="bg-white p-6 rounded-[20px] shadow border flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Thermometer size={22} style={{ color: color || "#34C759" }} />
        <p className="font-semibold text-gray-700">Rata-Rata Suhu Proses</p>
      </div>

      <div className="mt-4">
        <h2 className="text-5xl font-bold" style={{ color: color || "#606060" }}>
          {avgTemp !== null && avgTemp !== undefined ? `${avgTemp}°C` : "-"}
        </h2>
        <p className="text-sm text-gray-400">Average Process Temperature</p>
      </div>

      <div className="mt-4" style={{ height: "100px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData || []}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              tickLine={false}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color || "#3b82f6"}
              fill="#dbeafe"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
