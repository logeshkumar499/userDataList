import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./header.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Shanthi</div>
      </Link>
      <nav>
        <ul>
        {isLoggedIn && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/networks">Network</Link>
          </li>
        )}
        </ul>
      </nav>
      {isLoggedIn && (
          <div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
    </header>
  );
};

export default Header;
