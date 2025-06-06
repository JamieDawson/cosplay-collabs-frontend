import { Link } from "react-router-dom";
import LoginButton from "../Auth0/LoginButton/LoginButton.component";
import LogOutButton from "../Auth0/LogOutButton/LogOutButton.component";
import SignUpButton from "../Auth0/SignUpButton/SignUpButton.component";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../UserContext";

import "./NavBar.css";

const NavBar: React.FC = () => {
  const { user } = useAuth0();
  const { username } = useUser();
  console.log(user);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Cosplay Collabs</Link>
      </div>
      {user && <h4 style={{ margin: 0 }}>Hello, {username}</h4>}
      <ul className="nav-links">
        <SignUpButton />
        <LoginButton />
        <LogOutButton />

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
        <li>
          <Link to={`/profile/${username}`} className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
