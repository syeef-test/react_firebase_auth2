import React, { useRef, useState, useContext } from "react";
import AuthContext from "../store/auth-context";

function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;

    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
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

      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Signin;
