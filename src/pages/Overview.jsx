import React from "react";
import CardTotalMesin from "../components/CardTotalMesin";
import CardRataRataSuhu from "../components/CardRataRataSuhu";
import CardToolWear from "../components/CardToolWear";
import CardKondisiUmum from "../components/CardKondisiUmum";
import CardPerluPerhatian from "../components/CardPerluPerhatian";
import CardPerluPerbaikan from "../components/CardPerluPerbaikan";
import RingkasanStatusMesin from "../components/RingkasanStatusMesin";

// Halaman Overview hanya menampilkan struktur layout dashboard
export default function Overview({
  totalMesin,
  avgTemp,
  avgWear,
  kondisiUmum,
  kondisiStatus,
  mesinPerhatian,
  mesinPerbaikan,
  chartData,
  machines,
  wearProgress,
  wearColor,
  warningProgress,
  warningColor,
  repairProgress,
  repairColor,
  tempColor,
}) {
  return (
    <div className="bg-white w-full rounded-2xl shadow-md p-8 mb-8 min-h-screen">
      {/* Judul halaman */}
      <h1 className="text-2xl font-bold mb-8">Predictive Maintenance Copilot</h1>

      {/* Grid 6 Component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Total Mesin */}
        <CardTotalMesin total={totalMesin} />

        {/* Rata-rata Suhu */}
        <CardRataRataSuhu
          avgTemp={avgTemp}
          chartData={chartData}
          color={tempColor}
        />

        {/* Rata-rata Tool Wear */}
        <CardToolWear
          avgWear={avgWear}
          progress={wearProgress}
          color={wearColor}
        />

        {/* Kondisi Umum Mesin */}
        <CardKondisiUmum
          kondisiUmum={kondisiUmum}
          status={kondisiStatus}
        />

        {/* Mesin Perlu Perhatian */}
        <CardPerluPerhatian
          jumlah={mesinPerhatian}
          progress={warningProgress}
          color={warningColor}
        />

        {/* Mesin Perlu Perbaikan */}
        <CardPerluPerbaikan
          jumlah={mesinPerbaikan}
          progress={repairProgress}
          color={repairColor}
        />
      </div>

      {/* Ringkasan Status Mesin */}
      <RingkasanStatusMesin machines={machines} />
    </div>
  );
}
