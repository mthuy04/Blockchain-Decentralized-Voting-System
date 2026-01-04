import React from "react";

function UserHome(props) {
  return (
    <div className="glass-panel p-8 rounded-xl animate-fade-in relative overflow-hidden">
        {/* Background trang trí */}
        <div className="absolute top-0 right-0 p-10 opacity-5">
             <i className="fa-solid fa-landmark text-9xl text-white"></i>
        </div>

        <div className="relative z-10">
            <h4 className="text-blue-400 font-mono text-xs mb-2">ACTIVE ELECTION PROTOCOL</h4>
            <h1 className="text-4xl font-bold text-white mb-2">{props.el.electionTitle}</h1>
            <h3 className="text-xl text-slate-400 mb-8">{props.el.organizationTitle}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Managed By</p>
                    <div className="text-lg text-white font-medium">
                        {props.el.adminName} <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded ml-2">{props.el.adminTitle}</span>
                    </div>
                </div>
                <div>
                     <p className="text-xs text-slate-500 uppercase font-bold mb-1">Contact Point</p>
                     <div className="text-lg text-blue-400 font-mono">{props.el.adminEmail}</div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default UserHome;