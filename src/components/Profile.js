import React from "react";
import "../style/profile.css";

const Profile = () => {
  if (!localStorage.getItem("profile")) {
    return <div className="profile-container">Usuário não encontrado.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={localStorage.getItem("userImg")}
          alt="Profile"
          className="profile-image"
        />
        <h2>Email : {localStorage.getItem("userMail")}</h2>
        <p>Nome: {localStorage.getItem("userName")}</p>
        <p>googleId: {localStorage.getItem("userId")}</p>
      </div>
    </div>
  );
};

export default Profile;
