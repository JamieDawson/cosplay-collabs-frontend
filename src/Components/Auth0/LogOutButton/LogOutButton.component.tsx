import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../../UserContext";

function LogOutButton() {
  const { isAuthenticated, logout } = useAuth0();
  const { setUsername } = useUser();

  const handleLogout = () => {
    setUsername(null);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return isAuthenticated ? (
    <button onClick={handleLogout}>Log Out</button>
  ) : null;
}

export default LogOutButton;
