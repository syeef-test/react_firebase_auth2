import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

function Navigation() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    //history.push("/signin");
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/signin">Signin</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
