import React from "react";

const DashboardStats = ({ liveCount, draftCount }) => {
  const stats = [
    {
      label: "Live Products",
      value: liveCount,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Drafts",
      value: draftCount,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Total Orders",
      value: "156",
      color: "text-[#3b557e]",
      bg: "bg-[#3b557e]/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`${stat.bg} p-6 rounded-3xl border border-white shadow-sm flex flex-col justify-center`}
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            {stat.label}
          </p>
          <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
