import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      winner: null,
      isElEnded: false,
      loading: true
    };
  }

  componentDidMount = async () => {
    const { contract } = this.props;
    if (!contract) return;

    try {
      const end = await contract.methods.getEnd().call();
      this.setState({ isElEnded: end });

      const count = await contract.methods.getTotalCandidate().call();
      let list = [];
      let maxVote = -1;
      let tempWinner = null;

      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.candidateDetails(i).call();
        const voteCount = parseInt(candidate.voteCount);
        list.push({ ...candidate, voteCount: voteCount });
        
        if (voteCount > maxVote) {
            maxVote = voteCount;
            tempWinner = candidate;
        }
      }
      this.setState({ candidates: list, winner: tempWinner, loading: false });
    } catch (error) { 
        console.error(error); 
        this.setState({ loading: false });
    }
  };

  render() {
    // --- 1. CHẶN XEM KẾT QUẢ KHI CHƯA KẾT THÚC ---
    if (!this.state.isElEnded) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center animate-fade-in">
                 <div className="glass-panel p-12 rounded-2xl border border-blue-500/30 bg-blue-900/10">
                    <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fa-solid fa-hourglass-half text-4xl text-blue-400 animate-pulse"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Results Sealed</h1>
                    <p className="text-slate-400 text-lg mb-8">
                        The election is currently <strong>in progress</strong>. 
                        <br/>
                        To ensure fairness, vote counts are hidden until the election is officially ended.
                    </p>
                    <Link to="/" className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-lg transition-all">
                        <i className="fa-solid fa-arrow-left mr-2"></i> Return to Dashboard
                    </Link>
                 </div>
            </div>
        );
    }

    // --- 2. KHI ĐÃ END THÌ MỚI HIỆN KẾT QUẢ ---
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8"><h1 className="text-3xl font-bold text-white mb-2">Final Results</h1><p className="text-slate-400">Official tally from the blockchain.</p></div>
        
        {/* HIỆN NGƯỜI CHIẾN THẮNG */}
        {this.state.winner && (
            <div className="glass-panel p-8 rounded-xl mb-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20"><i className="fa-solid fa-trophy text-9xl text-yellow-500"></i></div>
                <div className="relative z-10">
                    <div className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2">🎉 Election Winner</div>
                    <h2 className="text-4xl font-bold text-white mb-2">{this.state.winner.header}</h2>
                    <p className="text-yellow-100 italic text-lg opacity-80 mb-4">"{this.state.winner.slogan}"</p>
                    <div className="inline-block bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-lg shadow-yellow-500/20">
                        {this.state.winner.voteCount} Votes
                    </div>
                </div>
            </div>
        )}

        {/* BẢNG XẾP HẠNG */}
        <div className="grid grid-cols-1 gap-4">
            {this.state.candidates
             .sort((a, b) => b.voteCount - a.voteCount) // Sắp xếp từ cao xuống thấp
             .map((candidate, index) => (
                <div key={candidate.candidateId} className="glass-panel p-4 rounded-xl flex items-center justify-between border border-corpBorder hover:border-blue-500/30 transition">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-500 text-black' : 'bg-slate-700'}`}>
                            {index + 1}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">{candidate.header}</h3>
                            <div className="w-32 md:w-64 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <div className={`h-full ${index === 0 ? 'bg-yellow-500' : 'bg-blue-600'}`} style={{ width: `${Math.min(candidate.voteCount * 10, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-2xl font-bold block ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>{candidate.voteCount}</span>
                        <span className="text-xs text-slate-500 uppercase">Votes</span>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-8 text-center">
            <Link to="/" className="text-slate-500 hover:text-white text-sm transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }
}