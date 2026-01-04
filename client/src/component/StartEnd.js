import React from "react";

const StartEnd = (props) => {
  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-full border border-corpBorder relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <i className={`fa-solid ${props.elEnded ? "fa-rotate-right" : props.elStarted ? "fa-stop" : "fa-play"} text-9xl text-white`}></i>
      </div>

      <div className="relative z-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Control Actions
        </h3>

        {!props.elStarted ? (
          <div className="mt-2">
            <h2 className="text-xl font-bold text-white mb-2">
                {props.elEnded ? "Election Concluded" : "Ready to Start"}
            </h2>
            <p className="text-slate-400 text-sm mb-6">
                {props.elEnded 
                    ? "The voting process has ended. To begin a new election cycle, you must re-deploy the contract." 
                    : "Initialize the voting process on the blockchain."}
            </p>
            
            <button
                onClick={props.elEnded ? props.endElFn : props.startElFn} // Lưu ý: Logic cũ của bạn dùng endElFn để redeploy
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                {props.elEnded ? <><i className="fa-solid fa-rotate"></i> Re-Deploy Contract</> : <><i className="fa-solid fa-rocket"></i> Start Election</>}
            </button>
          </div>
        ) : (
          <div className="mt-2">
             <h2 className="text-xl font-bold text-white mb-2">Election is Live</h2>
             <p className="text-slate-400 text-sm mb-6">Voting is currently active. End the election to seal results.</p>
             <button
                onClick={props.endElFn}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                <i className="fa-solid fa-lock"></i> End & Seal Results
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
        <span>* Requires Gas Fee</span>
        <span><i className="fa-solid fa-shield-halved mr-1"></i>Admin Only</span>
      </div>
    </div>
  );
};

export default StartEnd;