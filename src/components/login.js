import { GoogleLogin } from "react-google-login";
import "../style/TopBar.css";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const clientId =
  "860907029773-f1k556igmjvjdm8lpg0cja24olm2mhnf.apps.googleusercontent.com";

function Login() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const onSuccess = (res) => {
    localStorage.setItem("profile", res.profileObj);
    console.log(
      "LOGIN efectuado com sucesso , usuario atual: ",
      res.profileObj
    );
    setAuthenticated(true);
  };
  const onFailure = (res) => {
    setAuthenticated(false);
    console.log("LOGIN Falhou, tente novamente", res);
  };

  return (
    <div id="signInButton" className="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
export default Login;
