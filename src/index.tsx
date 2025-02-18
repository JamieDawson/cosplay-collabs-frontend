// index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        // Send users to the /profile route after sign-up or login
        redirect_uri: window.location.origin + "/profile",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
