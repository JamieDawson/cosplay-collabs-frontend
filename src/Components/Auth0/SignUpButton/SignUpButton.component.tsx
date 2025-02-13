import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function SignUpButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return !isAuthenticated ? (
    <button onClick={handleClick}>Sign Up</button>
  ) : null;
}

export default SignUpButton;
