import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    loginWithRedirect();
  };

  return !isAuthenticated ? (
    <button onClick={handleClick}>Log in</button>
  ) : null;
}

export default LoginButton;
