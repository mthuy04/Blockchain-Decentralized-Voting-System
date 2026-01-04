import React from "react";
import { NavLink } from "react-router-dom";

// Xóa dòng import Navbar.css
// import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="navbar-brand">
        <i className="fas fa-vote-yea" /> VOTING APP
      </NavLink>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="nav-active">
            <i className="fas fa-home" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Registration" activeClassName="nav-active">
            <i className="far fa-id-card" /> Registration
          </NavLink>
        </li>
        <li>
          <NavLink to="/Voting" activeClassName="nav-active">
            <i className="fas fa-person-booth" /> Voting Area
          </NavLink>
        </li>
        <li>
          <NavLink to="/Results" activeClassName="nav-active">
            <i className="fas fa-chart-pie" /> Live Results
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}