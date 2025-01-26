import "./App.css";
import CreateAdForm from "./Components/CreateAdForm/CreateAdForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationsMapper from "./Components/LocationsMapper/LocationsMapper.component";
import InstagramComponent from "./Components/InstagramComponent/InstagramComponent.component";
import LocationDetails from "./Components/LocationDetails/LocationDetails";
import NavBar from "./Components/NavBar/NavBar.component";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
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
      </Router>
    </div>
  );
}

export default App;
