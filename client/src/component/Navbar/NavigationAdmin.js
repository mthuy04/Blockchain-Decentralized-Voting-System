import React from "react";
import { NavLink } from "react-router-dom";

// Xóa dòng import Navbar.css
// import "./Navbar.css";

export default function NavbarAdmin() {
  return (
    <nav>
      <div className="navbar-brand">
        <NavLink to="/">
          <i className="fas fa-user-shield" /> ADMIN PANEL
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/Verification" activeClassName="nav-active">
            <i className="fas fa-user-check" /> Verification
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddCandidate" activeClassName="nav-active">
            <i className="fas fa-user-plus" /> Add Candidate
          </NavLink>
        </li>
        <li>
          <NavLink to="/Registration" activeClassName="nav-active">
            <i className="far fa-list-alt" /> Voter List
          </NavLink>
        </li>
        <li>
          <NavLink to="/Voting" activeClassName="nav-active">
            <i className="fas fa-eye" /> View Ballot
          </NavLink>
        </li>
        <li>
          <NavLink to="/Results" activeClassName="nav-active">
            <i className="fas fa-chart-bar" /> Results
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}