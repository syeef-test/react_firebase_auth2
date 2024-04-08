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
import AuthContext, { AuthContextProvider } from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <AuthContextProvider>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
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
                    <Link to="/logout">Logout</Link>
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
      </AuthContextProvider>
    </>
  );
}

export default App;
