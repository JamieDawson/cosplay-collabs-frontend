import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import InstagramComponent from "./Components/InstagramComponent/InstagramComponent.component";
import CreateAdForm from "./Components/CreateAdForm/CreateAdForm";
import NavBar from "./Components/NavBar/NavBar.component";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <h1>Cosplay Collabs</h1>
        <InstagramComponent />
        <CreateAdForm />
      </div>
    </Router>
  );
}

export default App;
