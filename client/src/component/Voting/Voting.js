import React, { Component } from "react";

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      currentVoter: { hasVoted: false, isVerified: false },
      isElStarted: false,
      isElEnded: false,
    };
  }

  componentDidMount = async () => {
    const { contract, account, isAdmin } = this.props;
    if (!contract) return;

    try {
      const start = await contract.methods.getStart().call();
      const end = await contract.methods.getEnd().call();
      this.setState({ isElStarted: start, isElEnded: end });

      const count = await contract.methods.getTotalCandidate().call();
      let list = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.candidateDetails(i).call();
        list.push({ id: candidate.candidateId, header: candidate.header, slogan: candidate.slogan });
      }
      this.setState({ candidates: list });

      // Nếu KHÔNG phải Admin thì mới lấy thông tin cử tri
      if (!isAdmin) {
          const voter = await contract.methods.voterDetails(account).call();
          this.setState({
            currentVoter: {
              hasVoted: voter.hasVoted,
              isVerified: voter.isVerified,
            },
          });
      }
    } catch (error) { console.error(error); }
  };

  castVote = async (id) => {
    await this.props.contract.methods.vote(id).send({ from: this.props.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    const { isAdmin } = this.props;
    const canVote = !isAdmin && this.state.currentVoter.isVerified && !this.state.currentVoter.hasVoted && this.state.isElStarted && !this.state.isElEnded;

    return (
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <div className="mb-8 flex justify-between items-end">
            <div><h1 className="text-3xl font-bold text-white mb-2">Voting Arena</h1><p className="text-slate-400">Cast your vote securely on the Ethereum network.</p></div>
            <div className="text-right"><span className="text-xs uppercase text-slate-500 font-bold block">Your Status</span>
            {isAdmin ? <span className="text-red-400 font-bold"><i className="fa-solid fa-shield-halved"></i> Admin Mode</span> : 
             this.state.currentVoter.hasVoted ? <span className="text-green-400 font-bold"><i className="fa-solid fa-check-circle"></i> Voted</span> :
             <span className="text-blue-400 font-bold"><i className="fa-regular fa-circle"></i> Eligible</span>}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {this.state.candidates.map((candidate) => (
                <div key={candidate.id} className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative z-10">
                        <div className="text-xs font-mono text-blue-400 mb-2">CANDIDATE #{candidate.id}</div>
                        <h3 className="text-2xl font-bold text-white mb-1">{candidate.header}</h3>
                        <p className="text-slate-400 italic mb-6">"{candidate.slogan}"</p>
                        <button onClick={() => this.castVote(candidate.id)} disabled={!canVote} className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-lg ${!canVote ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-blue-500/30 hover:-translate-y-1'}`}>
                          {isAdmin ? "View Only" : this.state.currentVoter.hasVoted ? "Vote Recorded" : "Cast Vote"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }
}