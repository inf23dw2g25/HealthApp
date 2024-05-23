import { GoogleLogout } from "react-google-login";
import "../style/TopBar.css";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const clientId =
  "860907029773-f1k556igmjvjdm8lpg0cja24olm2mhnf.apps.googleusercontent.com";

function Logout() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const onSuccess = (res) => {
    localStorage.setItem("profile", null);
    console.log("LOGOUT efectuado com sucesso");
    setAuthenticated(false);
  };
  return (
    <div id="signOutButton" className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
export default Logout;
