import { Link } from "react-router-dom";
import LoginButton from "../Auth0/LoginButton/LoginButton.component";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Cosplay Collabs</Link>
      </div>
      <ul className="nav-links">
        <LoginButton />

        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/add-post" className="nav-link">
            Add Post
          </Link>
        </li>
        <li>
          <Link to="/places" className="nav-link">
            Places
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
