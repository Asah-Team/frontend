import React, { useEffect, useState } from "react";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [modelVersion, setModelVersion] = useState("");
  const [anomalyThreshold, setAnomalyThreshold] = useState("");


  // fetch settings dari backend saat komponen dimount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const apiRes = await fetch("http://localhost:3000/api/settings/api");
        const modelRes = await fetch("http://localhost:3000/api/settings/model");

        const apiData = await apiRes.json();
        const modelData = await modelRes.json();

        // Set API config
        setApiKey(apiData.apiKey || "");
        setApiEndpoint(apiData.apiEndpoint || "");

        // Set Model config
        setModelVersion(modelData.modelVersion || "");
        setAnomalyThreshold(modelData.anomalyThreshold || "");

        setLoading(false);
      } catch (err) {
        console.error("Gagal memuat settings:", err);
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);


  // save API config
  const handleSaveAPI = async () => {
    try {
      await fetch("http://localhost:3000/api/settings/api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, apiEndpoint }),
      });

      alert("API Configuration saved!");
    } catch (e) {
      console.error("Gagal menyimpan API config:", e);
      alert("Failed to save API Configuration.");
    }
  };


  // save model config
  const handleSaveModel = async () => {
    try {
      await fetch("http://localhost:3000/api/settings/model", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelVersion, anomalyThreshold }),
      });

      alert("Model Configuration saved!");
    } catch (e) {
      console.error("Gagal menyimpan model config:", e);
      alert("Failed to save Model Configuration.");
    }
  };

  // Skeleton loading
  if (loading) {
    return (
      <div className="p-7 bg-gray-100 rounded-2xl h-[94vh] overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>

            <div className="space-y-5">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>

            <div className="space-y-5">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="p-7 bg-gray-100 rounded-2xl h-[94vh] overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">

        {/* API CONFIG CARD */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-1">API Configuration</h2>
          <p className="text-sm text-gray-400 mb-6">Configure API keys</p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">API Key</label>
              <input
                type="text"
                placeholder="Enter your API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">API Endpoint</label>
              <input
                type="text"
                placeholder="https://api.example.com"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSaveAPI}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* MODEL CONFIG CARD */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Model Configuration</h2>
          <p className="text-sm text-gray-400 mb-6">Configure predictive mode settings</p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">Model Version</label>
              <input
                type="text"
                placeholder="v1.0"
                value={modelVersion}
                onChange={(e) => setModelVersion(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Anomaly Threshold</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.75"
                value={anomalyThreshold}
                onChange={(e) => setAnomalyThreshold(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSaveModel}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
