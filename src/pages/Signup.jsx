import React, { useRef, useState } from "react";

function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const key = import.meta.env.VITE_FIREBASE_APP_ID;

    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
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

      console.log("User signed up successfully!");
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
