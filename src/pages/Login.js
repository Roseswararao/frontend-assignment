// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Use Link instead of <a>
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ✅ State for popup
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setShowPopup(true); // ✅ Show popup if user is already logged in
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    alert("✅ Login successful!");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="login">
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>⚠️ You are already logged in. Please log out first.</p>
            <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="login-container">
          <h2>Login</h2>
          <p className="login-subtitle">Access your account securely</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link> {/* ✅ Fixed */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
