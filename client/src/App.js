import React, { Component, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";

import Home from "./component/Home";
import Voting from "./component/Voting/Voting";
import Results from "./component/Results/Results";
import Registration from "./component/Registration/Registration";
import AddCandidate from "./component/Admin/AddCandidate/AddCandidate";
import Verification from "./component/Admin/Verification/Verification";

import getWeb3 from "./getWeb3";
import Election from "./contracts/Election.json";

import "./App.css";

// --- BACKGROUND 3D (GIỮ NGUYÊN) ---
const Background3D = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    if (!window.THREE) return;
    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25; camera.position.x = 10;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if(mountRef.current) { mountRef.current.innerHTML = ''; mountRef.current.appendChild(renderer.domElement); }
    const geometry = new THREE.SphereGeometry(14, 64, 64);
    const material = new THREE.PointsMaterial({ size: 0.08, color: 0x3B82F6, transparent: true, opacity: 0.4 });
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(14.2, 2));
    const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wireMesh);
    const animate = () => { requestAnimationFrame(animate); sphere.rotation.y += 0.0005; wireMesh.rotation.y += 0.0005; wireMesh.rotation.x -= 0.0002; renderer.render(scene, camera); };
    animate();
    const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <div id="canvas-container" ref={mountRef}></div>;
};

// --- SIDEBAR (GIỮ NGUYÊN) ---
const Sidebar = ({ isAdmin }) => (
  <aside className="w-64 h-full glass-panel flex flex-col border-r border-corpBorder z-20 fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-corpBorder bg-white/5">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center mr-3 shadow-lg"><i className="fa-brands fa-ethereum text-white text-lg"></i></div>
          <div><h1 className="font-bold text-white tracking-tight text-lg">VoteChain</h1><p className="text-xs text-corpText uppercase tracking-wider">{isAdmin ? "Admin Console" : "Voter Portal"}</p></div>
      </div>
      <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
          {isAdmin ? (
              <>
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
                  <NavLink exact to="/" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-house-signal w-5 text-center"></i><span>Dashboard</span></NavLink>
                  <NavLink to="/Verification" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-user-check w-5 text-center"></i><span>Verification</span></NavLink>
                  <NavLink to="/AddCandidate" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-user-tie w-5 text-center"></i><span>Candidates</span></NavLink>
                  <NavLink to="/Registration" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-users w-5 text-center"></i><span>Voters Registry</span></NavLink>
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6">Analytics</p>
                  <NavLink to="/Voting" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-check-to-slot w-5 text-center"></i><span>Voting Area (View)</span></NavLink>
                  <NavLink to="/Results" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-chart-pie w-5 text-center"></i><span>Results</span></NavLink>
              </>
          ) : (
              <>
                  <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Actions</p>
                  <NavLink exact to="/" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-circle-info w-5 text-center"></i><span>Information</span></NavLink>
                  <NavLink to="/Registration" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-id-card w-5 text-center"></i><span>My Registration</span></NavLink>
                  <NavLink to="/Voting" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-check-to-slot w-5 text-center"></i><span>Voting Area</span></NavLink>
                  <NavLink to="/Results" className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-md" activeClassName="active"><i className="fa-solid fa-chart-pie w-5 text-center"></i><span>Results</span></NavLink>
              </>
          )}
      </nav>
      <div className="p-4 border-t border-corpBorder bg-white/5"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white ${isAdmin ? 'bg-red-500' : 'bg-blue-600'}`}><i className={`fa-solid ${isAdmin ? 'fa-user-shield' : 'fa-user'}`}></i></div><div className="overflow-hidden"><p className="text-sm font-medium text-white truncate">{isAdmin ? "Admin" : "Voter"}</p><p className="text-xs text-green-400 truncate">● Connected</p></div></div></div>
  </aside>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: null,
      contract: null,
      isAdmin: false,
      loading: true
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      
      if (deployedNetwork) {
          const instance = new web3.eth.Contract(Election.abi, deployedNetwork.address);
          const admin = await instance.methods.getAdmin().call();
          const isAdmin = accounts[0] === admin;
          this.setState({ web3, account: accounts[0], contract: instance, isAdmin, loading: false });
      } else {
          this.setState({ loading: false });
      }
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) return <div className="bg-corpDark h-screen flex items-center justify-center text-white">Loading Blockchain...</div>;

    return (
      <Router>
        <div className="flex h-screen text-sm md:text-base bg-corpDark text-white font-sans selection:bg-blue-500 selection:text-white">
            <Background3D />
            <Sidebar isAdmin={this.state.isAdmin} />
            <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden ml-64">
                <header className="h-20 glass-panel border-b border-corpBorder flex items-center justify-between px-8 shrink-0 sticky top-0 z-30">
                    <div><h2 className="text-xl font-semibold text-white">{this.state.isAdmin ? "Control Panel" : "Voting Terminal"}</h2><p className="text-sm text-slate-400">System Integrity: Secured</p></div>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-xs font-medium text-green-400">Mainnet Active</span></div>
                        <div className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded text-slate-400 border border-slate-700">{this.state.account}</div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <Switch>
                        {/* --- SỬA Ở ĐÂY: DÙNG RENDER ĐỂ TRUYỀN PROPS --- */}
                        <Route exact path="/" render={() => <Home account={this.state.account} contract={this.state.contract} />} />
                        <Route exact path="/Results" render={() => <Results account={this.state.account} contract={this.state.contract} />} />
                        <Route exact path="/Registration" render={() => <Registration account={this.state.account} contract={this.state.contract} isAdmin={this.state.isAdmin} />} />

                        <Route exact path="/AddCandidate" render={() => (this.state.isAdmin ? <AddCandidate contract={this.state.contract} account={this.state.account} /> : <Redirect to="/" />)}/>
                        <Route exact path="/Verification" render={() => (this.state.isAdmin ? <Verification contract={this.state.contract} account={this.state.account} /> : <Redirect to="/" />)}/>
                        <Route exact path="/Voting" render={() => (<Voting contract={this.state.contract} account={this.state.account} isAdmin={this.state.isAdmin} />)}/>
                        
                        <Redirect to="/" />
                    </Switch>
                </div>
            </main>
        </div>
      </Router>
    );
  }
}