import { Link } from "react-router-dom";
import styles from "../../../src/Components/NavBar/NavBar.module.css";

const NavBar: React.FC = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">MySite</Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="/add-post" className={styles.navLink}>
              Add Post
            </Link>
          </li>
          <li>
            <Link to="/places" className={styles.navLink}>
              Places
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
