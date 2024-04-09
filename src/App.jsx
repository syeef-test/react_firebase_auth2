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
import Navigation from "./components/Navigation";

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    console.log("logout");
    history.push("/signin");
    console.log("logout");
  };

  return (
    <>
      <Router>
        <div>
          <Navigation />

          <Switch>
            {!authCtx.isLoggedIn && (
              <Route path="/signup">
                <Signup />
              </Route>
            )}

            {!authCtx.isLoggedIn && (
              <Route path="/signin">
                <Signin />
              </Route>
            )}

            {authCtx.isLoggedIn && (
              <Route path="/profile">
                <Profile />
              </Route>
            )}

            <Route path="*">
              <Redirect to="signin" />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
