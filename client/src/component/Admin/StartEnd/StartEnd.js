import React from "react";

const StartEnd = (props) => {
  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col justify-center h-full">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        CONTROL ACTIONS
      </h3>

      {!props.elStarted ? (
        <button
            onClick={props.endElFn}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1"
        >
            <i className="fa-solid fa-rocket mr-2"></i>
            {props.elEnded ? "Re-Deploy Protocol" : "Initialize Election"}
        </button>
      ) : (
        <button
            onClick={props.endElFn}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all hover:-translate-y-1"
        >
            <i className="fa-solid fa-lock mr-2"></i>
            End & Seal Results
        </button>
      )}
      
      <p className="text-slate-500 text-xs mt-3 text-center">
        * Action requires Metamask confirmation.
      </p>
    </div>
  );
};

export default StartEnd;