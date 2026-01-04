import React, { Component } from "react";

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voters: [],
      isElEnded: false,
    };
  }

  componentDidMount = async () => {
    const { contract } = this.props;
    if (!contract) return;

    try {
      const end = await contract.methods.getEnd().call();
      this.setState({ isElEnded: end });

      const count = await contract.methods.getTotalVoter().call();
      let list = [];
      for (let i = 0; i < count; i++) {
        const addr = await contract.methods.voters(i).call();
        const voter = await contract.methods.voterDetails(addr).call();
        list.push(voter);
      }
      this.setState({ voters: list });
    } catch (error) { console.error(error); }
  };

  verifyVoter = async (verifiedStatus, address) => {
    if (this.state.isElEnded) return;
    await this.props.contract.methods
      .verifyVoter(verifiedStatus, address)
      .send({ from: this.props.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    return (
      <div className="max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-6">Voter Verification</h1>
        {this.state.isElEnded && <div className="glass-panel p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-300"><i className="fa-solid fa-lock"></i><span>Election ended.</span></div>}
        <div className="glass-panel rounded-xl overflow-hidden">
             <div className="p-6 border-b border-corpBorder bg-white/5 flex justify-between"><h3 className="font-bold text-white">Verification Queue</h3><span className="text-slate-400 text-sm">Total: {this.state.voters.length}</span></div>
             <table className="w-full text-left">
                <thead><tr className="text-xs text-slate-400 bg-slate-900/50 uppercase tracking-wider"><th className="px-6 py-4">Voter</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                    {this.state.voters.map((voter, index) => (
                        <tr key={index} className="hover:bg-white/5">
                            <td className="px-6 py-4"><div className="text-white font-medium">{voter.name}</div><div className="text-slate-500 text-xs font-mono">{voter.voterAddress}</div></td>
                            <td className="px-6 py-4">{voter.isVerified ? <span className="text-green-400 font-bold text-xs bg-green-500/10 px-2 py-1 rounded">Verified</span> : <span className="text-orange-400 font-bold text-xs bg-orange-500/10 px-2 py-1 rounded">Pending</span>}</td>
                            <td className="px-6 py-4 text-right">{!voter.isVerified ? (<button className={`px-4 py-1.5 rounded text-xs font-bold transition ${this.state.isElEnded ? 'bg-slate-700 text-slate-500' : 'bg-green-600 hover:bg-green-500 text-white'}`} onClick={() => this.verifyVoter(true, voter.voterAddress)} disabled={this.state.isElEnded}>{this.state.isElEnded ? "Locked" : "Approve"}</button>) : (<span className="text-slate-600 text-xs italic"><i className="fa-solid fa-check mr-1"></i> Done</span>)}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
      </div>
    );
  }
}