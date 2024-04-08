import { useState, useContext } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import AuthContext from "./store/auth-context";
import { useHistory } from "react-router-dom";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    history.push("/signup");
  };

  return (
    <>
      <Router>
        <div>
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

          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
