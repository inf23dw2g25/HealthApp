import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const GoogleCallback = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL parameters
    const token = localStorage.getItem("accessToken");
    console.log(token);

    // Check if token is present
    if (token) {
      // Save the token to local storage
      localStorage.setItem("accessToken", token);
      // Set authenticated state
      setAuthenticated(true);
    }
    navigate("/");
  }, [location.search, setAuthenticated, navigate]);

  return (
    <div>
      <h1>Google Callback</h1>
      {/* Conteúdo do GoogleCallback */}
    </div>
  );
};

export default GoogleCallback;
