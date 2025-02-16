import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user ? user.name : "unknown"} </h2>
      <p>Your unique ID is: {user ? user.sub : "unknown"}</p>
      <p>Your email is: {user ? user.email : "unknown"}</p>
    </div>
  );
}

export default Profile;
