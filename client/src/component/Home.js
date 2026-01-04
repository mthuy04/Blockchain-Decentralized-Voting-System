import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UserHome from "./UserHome";
import StartEnd from "./StartEnd";
import ElectionStatus from "./ElectionStatus";

const Home = ({ contract, account }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [elStarted, setElStarted] = useState(false);
  const [elEnded, setElEnded] = useState(false);
  const [elDetails, setElDetails] = useState({});
  
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const init = async () => {
      if (!contract) return;

      const admin = await contract.methods.getAdmin().call();
      if (account === admin) setIsAdmin(true);

      const start = await contract.methods.getStart().call();
      setElStarted(start);
      const end = await contract.methods.getEnd().call();
      setElEnded(end);

      const details = await contract.methods.getElectionDetails().call();
      setElDetails(details);
    };
    init();
  }, [contract, account]);

  const registerElection = async (data) => {
    // --- SỬA LỖI Ở ĐÂY ---
    // 1. Gộp Họ và Tên
    const fullName = `${data.adminFName} ${data.adminLName}`;
    
    // 2. Tự điền chức danh (vì form không có ô này)
    const adminTitle = "Administrator"; 

    await contract.methods.setElectionDetails(
        fullName,           // Tham số 1: _adminName
        data.adminEmail,    // Tham số 2: _adminEmail
        adminTitle,         // Tham số 3: _adminTitle (Đã fix lỗi undefined)
        data.electionTitle, // Tham số 4: _electionTitle
        data.organizationTitle // Tham số 5: _organizationTitle
    ).send({ from: account, gas: 1000000 });
    
    window.location.reload();
  };

  // Các hàm Start/End giữ nguyên
  const startElection = async () => { await contract.methods.startElection().send({ from: account, gas: 1000000 }); window.location.reload(); };
  const endElection = async () => { await contract.methods.endElection().send({ from: account, gas: 1000000 }); window.location.reload(); };
  
  const onSubmit = (data) => registerElection(data);

  if (!contract) return null;
  if (!isAdmin) return <UserHome el={elDetails} />;

  // Kiểm tra đã khởi tạo chưa
  const isInitialized = elDetails.electionTitle && elDetails.electionTitle !== "";

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      
      {/* FORM SETUP: Chỉ hiện khi chưa Start, chưa End và chưa Init */}
      {!elStarted && !elEnded && !isInitialized ? (
          <div className="glass-panel p-8 rounded-xl mb-8">
              <h1 className="text-2xl font-bold text-white mb-6">Setup Election</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <label className="text-slate-400 text-xs font-bold block mb-2">First Name</label>
                          <input className="input-corp w-full px-4 py-3 rounded-lg" {...register("adminFName", {required: true})} placeholder="Ex: Admin" />
                      </div>
                      <div>
                          <label className="text-slate-400 text-xs font-bold block mb-2">Last Name</label>
                          <input className="input-corp w-full px-4 py-3 rounded-lg" {...register("adminLName", {required: true})} placeholder="Ex: System" />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <label className="text-slate-400 text-xs font-bold block mb-2">Email</label>
                          <input className="input-corp w-full px-4 py-3 rounded-lg" {...register("adminEmail", {required: true})} placeholder="admin@vnu.edu.vn" />
                      </div>
                      <div>
                          <label className="text-slate-400 text-xs font-bold block mb-2">Election Title</label>
                          <input className="input-corp w-full px-4 py-3 rounded-lg" {...register("electionTitle", {required: true})} placeholder="Ex: 2026 Student Council" />
                      </div>
                  </div>
                  <div>
                      <label className="text-slate-400 text-xs font-bold block mb-2">Organization</label>
                      <input className="input-corp w-full px-4 py-3 rounded-lg" {...register("organizationTitle", {required: true})} placeholder="Ex: VNU - IS" />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3 rounded-lg mt-4">Save Configuration</button>
              </form>
          </div>
      ) : (
          // HIỆN THÔNG TIN ĐÃ CẤU HÌNH
          <div className="glass-panel p-6 rounded-xl mb-8 bg-blue-500/10 border-blue-500/20">
              <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Active Configuration</h3>
              <h1 className="text-white text-3xl font-bold">{elDetails.electionTitle}</h1>
              <p className="text-slate-400 text-lg">{elDetails.organizationTitle}</p>
              
              {!elStarted && !elEnded && (
                  <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/40 rounded text-yellow-300 text-sm flex items-center gap-3">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      <span>
                          <strong>Election is Standby.</strong> Add candidates then click "Start Election" below.
                      </span>
                  </div>
              )}
          </div>
      )}

      {/* CONTROL PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <StartEnd 
                elStarted={elStarted} 
                elEnded={elEnded} 
                endElFn={endElection} 
                startElFn={startElection} 
           />
           <ElectionStatus elStarted={elStarted} elEnded={elEnded} />
      </div>
    </div>
  );
};

export default Home;