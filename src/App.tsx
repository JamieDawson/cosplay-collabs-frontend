import React from "react";
import "./App.css";
import CreateAdForm from "./Components/CreateAdForm/CreateAdForm.tsx";
import { InstagramEmbed } from "react-social-media-embed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.tsx";
import LocationDetails from "./Components/LocationDetails/LocationDetails.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cosplay Collabs</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/CUbHfhpswxt/"
            width={328}
            height={382}
          />
        </div>
        <CreateAdForm />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/places/:country/:state/:city"
              element={<LocationDetails />}
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
