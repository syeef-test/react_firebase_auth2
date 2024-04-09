import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [tokenExpirationTimer, setTokenExpirationTimer] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    const expirationTime = Date.now() + 300000;
    setTokenExpirationTimer(setTimeout(logoutHandler, 300000));
    localStorage.setItem("expirationTime", expirationTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    clearTimeout(tokenExpirationTimer);
    localStorage.removeItem("expirationTime");
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    const remainingTime = expirationTime - Date.now();
    if (token && remainingTime > 0) {
      setTokenExpirationTimer(setTimeout(logoutHandler, remainingTime));
    } else {
      logoutHandler();
    }
    return () => {
      if (expirationTime) {
        clearTimeout(tokenExpirationTimer);
      }
    };
  }, [token]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
