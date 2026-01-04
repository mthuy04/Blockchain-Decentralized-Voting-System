import React, { Component } from "react";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voterCount: undefined,
      voterName: "",
      voterPhone: "",
      voters: [],
      currentVoter: { address: undefined, name: null, phone: null, hasVoted: false, isVerified: false, isRegistered: false },
    };
  }

  componentDidMount = async () => {
    const { contract, account } = this.props;
    if (!contract) return;

    try {
      const voterCount = await contract.methods.getTotalVoter().call();
      this.setState({ voterCount: voterCount });

      // Lấy danh sách (Admin view)
      let votersList = [];
      if (this.props.isAdmin) {
          for (let i = 0; i < voterCount; i++) {
            const voterAddress = await contract.methods.voters(i).call();
            const voter = await contract.methods.voterDetails(voterAddress).call();
            votersList.push(voter);
          }
      }
      this.setState({ voters: votersList });

      // Lấy thông tin user hiện tại
      const current = await contract.methods.voterDetails(account).call();
      this.setState({
        currentVoter: {
          address: account,
          name: current.name,
          phone: current.phone,
          hasVoted: current.hasVoted,
          isVerified: current.isVerified,
          isRegistered: current.isRegistered,
        },
      });
    } catch (error) { console.error(error); }
  };

  registerVoter = async () => {
    if (this.state.voterName.length < 3 || this.state.voterPhone.length < 10) return;
    await this.props.contract.methods.registerAsVoter(this.state.voterName, this.state.voterPhone).send({ from: this.props.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    return (
      <div className="max-w-5xl mx-auto animate-fade-in pb-10">
        <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold text-white">Voter Registry</h1><div className="px-3 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-300 text-xs font-mono">Total Participants: {this.state.voterCount}</div></div>

        {!this.state.currentVoter.isRegistered ? (
             <div className="glass-panel p-8 rounded-xl mb-8 border border-corpBorder shadow-lg">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5"><div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20"><i className="fa-solid fa-user-plus text-xl"></i></div><div><h3 className="text-xl font-bold text-white">New Registration</h3><p className="text-slate-400 text-sm">Join the decentralized voting network.</p></div></div>
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Connected Wallet</label><div className="flex items-center bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm"><i className="fa-brands fa-ethereum mr-3 text-blue-500"></i>{this.props.account}</div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label><input type="text" className="input-corp w-full px-4 py-3 rounded-lg" placeholder="Ex: John Doe" value={this.state.voterName} onChange={(e) => this.setState({ voterName: e.target.value })}/></div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label><input type="number" className="input-corp w-full px-4 py-3 rounded-lg" placeholder="Ex: 0912345678" value={this.state.voterPhone} onChange={(e) => this.setState({ voterPhone: e.target.value })}/></div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end"><button onClick={this.registerVoter} className="btn-primary px-8 py-3 rounded-lg shadow-lg" disabled={this.state.voterName.length < 3 || this.state.voterPhone.length < 10}>Submit Application</button></div>
             </div>
        ) : (
            <div className="glass-panel p-6 rounded-xl mb-8 border-l-4 border-green-500 bg-green-500/5">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4"><div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-2xl border border-slate-700"><i className="fa-solid fa-user"></i></div><div><h3 className="text-green-400 font-bold uppercase tracking-wider text-xs mb-1">Registration Status: Approved</h3><h2 className="text-white text-2xl font-bold mb-1">{this.state.currentVoter.name}</h2><p className="text-slate-400 text-sm flex items-center gap-2"><i className="fa-solid fa-phone text-xs"></i> {this.state.currentVoter.phone}</p><p className="text-slate-500 text-xs font-mono mt-1 bg-black/20 px-2 py-1 rounded inline-block">{this.state.currentVoter.address}</p></div></div>
                    <div className="text-right"><div className="mb-2"><span className="text-slate-500 text-xs uppercase font-bold mr-2">Verification</span>{this.state.currentVoter.isVerified ? <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30"><i className="fa-solid fa-check-circle mr-1"></i> Verified</span> : <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30"><i className="fa-solid fa-clock mr-1"></i> Pending</span>}</div><div><span className="text-slate-500 text-xs uppercase font-bold mr-2">Voting Status</span>{this.state.currentVoter.hasVoted ? <span className="text-blue-400 font-bold text-sm">Voted <i className="fa-solid fa-check"></i></span> : <span className="text-slate-400 font-bold text-sm">Not Voted</span>}</div></div>
                </div>
            </div>
        )}

        {this.props.isAdmin ? (
            <div className="glass-panel rounded-xl overflow-hidden border border-corpBorder shadow-xl">
                <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center"><h3 className="font-bold text-white text-lg">Full Voter Registry (Admin View)</h3></div>
                <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-slate-900/50 text-xs text-slate-400 uppercase tracking-wider border-b border-gray-800"><th className="px-6 py-4 font-semibold">Wallet Address</th><th className="px-6 py-4 font-semibold">Identity Name</th><th className="px-6 py-4 font-semibold text-right">Status</th></tr></thead><tbody className="divide-y divide-gray-800/50">{this.state.voters.map((voter, index) => (<tr key={index} className="hover:bg-white/5"><td className="px-6 py-4 font-mono text-slate-400 text-xs align-middle"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div>{voter.voterAddress}</div></td><td className="px-6 py-4 text-white font-medium align-middle">{voter.name}</td><td className="px-6 py-4 text-right align-middle">{voter.isVerified ? <span className="inline-block px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs border border-green-800/50">Verified</span> : <span className="inline-block px-2 py-1 bg-orange-900/30 text-orange-400 rounded text-xs border border-orange-800/50">Pending</span>}</td></tr>))}</tbody></table></div>
            </div>
        ) : (
            <div className="p-8 text-center border border-slate-800 rounded-xl bg-slate-900/30"><div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4"><i className="fa-solid fa-user-shield text-3xl text-slate-500"></i></div><h3 className="text-white font-bold text-lg mb-2">Privacy Protected</h3><p className="text-slate-400 text-sm max-w-md mx-auto">Full list is encrypted and visible only to Admin.</p></div>
        )}
      </div>
    );
  }
}