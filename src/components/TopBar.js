// src/components/TopBar.js
import React from "react";
import { Link } from "react-router-dom";
import "../style/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/consultas">Consultas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
