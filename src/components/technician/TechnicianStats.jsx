import React from "react";
import { Inbox, Settings, CheckCircle, XCircle } from "lucide-react";

export default function TechnicianStats({ stats }) {
  const cards = [
    { label: 'Open', count: stats.open, color: 'red', icon: Inbox },
    { label: 'In Progress', count: stats.in_progress, color: 'blue', icon: Settings },
    { label: 'Closed', count: stats.closed, color: 'green', icon: CheckCircle },
    { label: 'Canceled', count: stats.canceled, color: 'gray', icon: XCircle }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((stat, idx) => (
        <div key={idx} className={`bg-${stat.color}-50 p-4 rounded-xl border border-${stat.color}-200 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-${stat.color}-600 font-semibold`}>{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-700`}>{stat.count}</p>
            </div>
            <stat.icon className={`w-10 h-10 text-${stat.color}-300`} />
          </div>
        </div>
      ))}
    </div>
  );
}