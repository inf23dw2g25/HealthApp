import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/TopBar.css";
import { isAuthenticatedBool } from "../middleware/middleware";

const TopBar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  const handleLogin = () => {
    // Scopes de perfil e e-mail
    const scope1 = encodeURIComponent("email");
    const scope2 = encodeURIComponent("profile");

    // URL de redirecionamento da sua aplicação após o login
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/google/callback"
    );

    // Redireciona para a página de autenticação do Google com os escopos e URL de redirecionamento especificados
    window.location.href = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=860907029773-f1k556igmjvjdm8lpg0cja24olm2mhnf.apps.googleusercontent.com&scope=${scope1}&${scope2}&redirect_uri=${redirectUri}`;
  };

  const handleLogout = () => {
    // Realiza o logout e redireciona para a página inicial
    setAuthenticated(false);
    history.push("/");
  };

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
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <span className="offline">Offline</span>
                <button onClick={handleLogin}>Login</button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
