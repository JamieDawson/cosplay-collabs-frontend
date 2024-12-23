import React from "react";
import "./App.css";
import { InstagramEmbed } from "react-social-media-embed";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cosplay Collabs</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
