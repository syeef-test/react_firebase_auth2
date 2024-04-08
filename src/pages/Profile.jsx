import React, { useRef, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

function Profile() {
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;

    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.idToken,
            password: password,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();
      console.log(data.idToken);
      authCtx.login(data.idToken);

      console.log("Password Changed!");
    } catch (error) {
      console.error("Error resting password:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }

    passwordRef.current.value = "";
  };

  const handleLogout = () => {
    authCtx.logout();
    history.push("/signin");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            minLength="7"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Reseting Password..." : "Reset"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
