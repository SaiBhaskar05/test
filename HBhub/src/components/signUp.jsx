import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Signup = () => {
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid Email Format");
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="container2">
        <center><h2>Sign Up</h2></center>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <center><button id="button" type="submit">Sign Up</button></center>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
