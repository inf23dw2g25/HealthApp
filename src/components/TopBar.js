import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/TopBar.css";
import AuthContext from "./AuthContext";
import Login from "./login";
import Logout from "./logout";

const TopBar = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

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
          <li>
            {authenticated ? (
              <>
                <span className="online">Online</span>
                <Logout />
              </>
            ) : (
              <>
                <span className="offline">Offline</span>
                <Login />
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
