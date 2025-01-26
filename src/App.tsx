import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar.component";
import InstagramComponent from "./Components/InstagramComponent/InstagramComponent.component";
import CreateAdForm from "./Components/CreateAdForm/CreateAdForm";
import AboutPage from "./Pages/AboutPage/AboutPage";
import LocationsMapper from "./Components/LocationsMapper/LocationsMapper.component";
import LocationDetails from "./Components/LocationDetails/LocationDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <h1>Cosplay Collabs</h1>
        <Routes>
          {/* Home route: Displays Instagram posts */}
          <Route path="/" element={<InstagramComponent />} />

          {/* About page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Add Post page */}
          <Route path="/add-post" element={<CreateAdForm />} />

          {/* Places page */}
          <Route path="/places" element={<LocationsMapper />} />

          {/* Location details */}
          <Route
            path="/places/:country/:state/:city"
            element={<LocationDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
