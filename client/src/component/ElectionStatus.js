import React from "react";

const ElectionStatus = (props) => {
  const getStatusUI = () => {
    if (props.elEnded) {
      return {
        title: "Terminated",
        desc: "Contract Sealed",
        colorClass: "text-red-400",
        bgClass: "bg-red-500",
        icon: "fa-lock",
        borderColor: "border-red-500/30"
      };
    } else if (props.elStarted) {
      return {
        title: "Active",
        desc: "Voting Channel Open",
        colorClass: "text-green-400",
        bgClass: "bg-green-500",
        icon: "fa-satellite-dish",
        borderColor: "border-green-500/30"
      };
    } else {
      return {
        title: "Standby",
        desc: "Waiting for Admin",
        colorClass: "text-yellow-400",
        bgClass: "bg-yellow-500",
        icon: "fa-pause",
        borderColor: "border-yellow-500/30"
      };
    }
  };

  const ui = getStatusUI();

  return (
    <div className="glass-panel p-8 rounded-xl border border-corpBorder h-full flex flex-col justify-center relative overflow-hidden group">
      
      {/* Icon nền trang trí khổng lồ (tạo cảm giác đầy đặn) */}
      <div className="absolute -right-4 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <i className={`fa-solid ${ui.icon} text-[180px] text-white`}></i>
      </div>

      <div className="relative z-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${ui.bgClass} animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]`}></span>
          Current Phase
        </h3>

        {/* Font chữ to hơn để lấp khoảng trống */}
        <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            {ui.title}
        </h2>
        
        <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border ${ui.borderColor} ${ui.bgClass}/10 backdrop-blur-md`}>
            <i className={`fa-solid ${ui.icon} ${ui.colorClass}`}></i>
            <span className={`${ui.colorClass} font-mono text-sm font-bold uppercase`}>
                {ui.desc}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ElectionStatus;