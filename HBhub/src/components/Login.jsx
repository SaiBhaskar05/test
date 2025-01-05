import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../login.css';

const Login = ({ setIsLoggedIn }) => {
  const [inputValue, setInputValue] = useState(''); // Single state for input
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    const trimmedInput = inputValue.trim();
    const trimmedPassword = password.trim();

    // Check if both fields are filled
    if (!trimmedInput || !trimmedPassword) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      // Send login request to the server
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUserName: trimmedInput,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, save userName in localStorage
        localStorage.setItem('userName', data.userName); // Store userName from the response
        localStorage.setItem('userId', data.userId); // Optionally store userId if needed

        alert(data.message); // Display success message
        setIsLoggedIn(true); // Set login state to true

        // Navigate to the dashboard
        navigate('/dashboard2');
      } else {
        // Display error message if login failed
        setErrorMessage(data.message || 'Invalid login credentials. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="container2">
        <center><h2>Login</h2></center>
        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="text"
            placeholder="Enter your username or email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            autoComplete="off"
            id="username-email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            id="password"
          />
          <center><button id="button" type="submit">Login</button></center>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Don't have an account? <NavLink to="/signUp">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
