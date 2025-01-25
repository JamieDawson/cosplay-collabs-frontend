import React from "react";
import "./App.css";
import CreateAdForm from "./Components/CreateAdForm/CreateAdForm.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationsMapper from "./Components/LocationsMapper/LocationsMapper.component.tsx";
import InstagramComponent from "./Components/InstagramComponent/InstagramComponent.component.tsx";
import LocationDetails from "./Components/LocationDetails/LocationDetails.tsx";
import NavBar from "./Components/NavBar/NavBar.component.tsx";

function App() {
  return (
    <Router>
      <NavBar />

      <div className="App">
        <header className="App-header">
          <h1>Cosplay Collabs</h1>
          <InstagramComponent />
          <CreateAdForm />
          <Routes>
            <Route path="/" element={<LocationsMapper />} />
            <Route
              path="/places/:country/:state/:city"
              element={<LocationDetails />}
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
