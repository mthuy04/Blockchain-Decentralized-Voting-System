import React, { Component } from "react";

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "",
      slogan: "",
      candidates: [],
      isElStarted: false,
      isElEnded: false,
    };
  }

  componentDidMount = async () => {
    // Dùng Contract từ App.js truyền xuống
    const { contract } = this.props;
    if (!contract) return;

    try {
      const start = await contract.methods.getStart().call();
      const end = await contract.methods.getEnd().call();
      this.setState({ isElStarted: start, isElEnded: end });

      const count = await contract.methods.getTotalCandidate().call();
      let list = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.candidateDetails(i).call();
        list.push(candidate);
      }
      this.setState({ candidates: list });
    } catch (error) { console.error(error); }
  };

  addCandidate = async () => {
    if (this.state.isElStarted || this.state.isElEnded) return;
    await this.props.contract.methods
      .addCandidate(this.state.header, this.state.slogan)
      .send({ from: this.props.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    return (
      <div className="max-w-5xl mx-auto animate-fade-in pb-10">
        <div className="flex justify-between items-end mb-8">
            <div><h1 className="text-3xl font-bold text-white tracking-tight">Candidate Management</h1><p className="text-slate-400 text-sm mt-1">Configure election participants.</p></div>
            <div className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${this.state.isElEnded ? 'bg-red-500/10 border-red-500/30 text-red-400' : this.state.isElStarted ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                <span className={`w-2 h-2 rounded-full ${this.state.isElEnded ? 'bg-red-500' : this.state.isElStarted ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                {this.state.isElEnded ? "Ended" : this.state.isElStarted ? "Started" : "Open"}
            </div>
        </div>

        {!this.state.isElStarted && !this.state.isElEnded ? (
            <div className="glass-panel p-6 rounded-xl mb-8 border border-corpBorder shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5"><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30"><i className="fa-solid fa-user-plus text-white text-sm"></i></div><h3 className="text-lg font-bold text-white">Add New Profile</h3></div>
                <div className="flex flex-col md:flex-row gap-5 items-end">
                    <div className="flex-1 w-full"><label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Name</label><input className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Name..." value={this.state.header} onChange={(e) => this.setState({ header: e.target.value })}/></div>
                    <div className="flex-[2] w-full"><label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Slogan</label><input className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="Slogan..." value={this.state.slogan} onChange={(e) => this.setState({ slogan: e.target.value })}/></div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg" onClick={this.addCandidate} disabled={this.state.header.length < 3}>Submit</button>
                </div>
            </div>
        ) : (

 // HIỆN THÔNG BÁO KHÓA NẾU ĐÃ KẾT THÚC
 <div className={`glass-panel p-6 rounded-xl mb-8 border-l-4 ${this.state.isElEnded ? 'border-red-500 bg-red-500/10' : 'border-orange-500 bg-orange-500/10'}`}>
 <h3 className={`${this.state.isElEnded ? 'text-red-400' : 'text-orange-400'} font-bold text-xl mb-1`}>
    <i className="fa-solid fa-lock mr-2"></i>
    {this.state.isElEnded ? "Election Terminated" : "Election In Progress"}
 </h3>
 <p className="text-slate-300">
    Candidate registration is <strong>locked</strong>. To ensure integrity, no candidates can be added or modified at this stage.
 </p>
</div>
)}

        <div className="glass-panel rounded-xl overflow-hidden border border-corpBorder shadow-xl">
            <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center"><h3 className="font-bold text-white text-lg">Registry Database</h3><span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">Total: {this.state.candidates.length}</span></div>
            <div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-900/50 text-xs text-slate-400 uppercase tracking-wider border-b border-gray-800"><th className="px-6 py-4 text-left w-24">ID</th><th className="px-6 py-4 text-left">Name</th><th className="px-6 py-4 text-left">Manifesto</th></tr></thead><tbody className="divide-y divide-gray-800/50">{this.state.candidates.map((c) => (<tr key={c.candidateId} className="hover:bg-white/5"><td className="px-6 py-4 text-slate-500 font-mono text-sm">#{c.candidateId}</td><td className="px-6 py-4 font-bold text-white"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">{c.header.charAt(0)}</div>{c.header}</div></td><td className="px-6 py-4 text-slate-400 italic">"{c.slogan}"</td></tr>))}</tbody></table></div>
        </div>
      </div>
    );
  }
}
           
