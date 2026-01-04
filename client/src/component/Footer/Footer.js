import React from "react";

import "./Footer.css";

const Footer = () => (
  <>
    <div className="footer-block"></div>
    <div className="footer">
      <div className="footer-container">
        <p>
          Final Project: {" "}
          <a
            className="profile"
            href="https://github.com/arlbibek/dVoting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Decentralized Voting System
          </a>
          .
        </p>
        <p>
          Made with <i className="fas fa-heartbeat" /> by{" "}
          <a
            className="profile"
            href="https://arlbibek.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Group 1
          </a>
          .
        </p>
      </div>
    </div>
  </>
);

export default Footer;
