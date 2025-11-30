import { Link } from "react-router-dom";
import LoginButton from "../Auth0/LoginButton/LoginButton.component";
import LogOutButton from "../Auth0/LogOutButton/LogOutButton.component";
import SignUpButton from "../Auth0/SignUpButton/SignUpButton.component";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../UserContext";

const NavBar: React.FC = () => {
  const { user } = useAuth0();
  const { username } = useUser();
  console.log(JSON.stringify(user));
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-lg">
      <div className="flex justify-between items-center py-3 px-4 md:px-8">
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Cosplay Collabs
          </Link>
        </div>
        {user && (
          <h4 className="m-0 text-sm md:text-base">Hello, {username}</h4>
        )}
        <ul className="flex flex-wrap gap-4 md:gap-5 list-none m-0 p-0 pr-4 md:pr-8 items-center">
          <li>
            <SignUpButton />
          </li>
          <li>
            <LoginButton />
          </li>
          <li>
            <LogOutButton />
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/tags-page"
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              Search tags
            </Link>
          </li>
          <li>
            <Link
              to="/add-post"
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              Add Post
            </Link>
          </li>
          <li>
            <Link
              to="/places"
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              Places
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${username}`}
              className="text-white hover:text-cyan-400 transition-colors font-medium text-sm md:text-base"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
