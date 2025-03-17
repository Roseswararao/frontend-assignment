// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const navigate = useNavigate();

  // Password strength validation rules
  const passwordCriteria = [
    { rule: /.{8,}/, label: "At least 8 characters" },
    { rule: /[A-Z]/, label: "At least one uppercase letter" },
    { rule: /[a-z]/, label: "At least one lowercase letter" },
    { rule: /\d/, label: "At least one number" },
    { rule: /[@$!%*?&]/, label: "At least one special character (@, $, !, %, *, ?, &)" }
  ];

  const validateForm = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Invalid email format");
      return false;
    }
    if (!passwordCriteria.every(({ rule }) => rule.test(password))) {
      setError("Password does not meet all security requirements.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (existingUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        setError("Email is already registered!");
        return;
      }

      // Save new user securely
      const newUser = { email: email.toLowerCase(), password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      alert("✅ Account created successfully! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <p className="signup-subtitle">Register with your email</p>

        <form onSubmit={handleSignup}>
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
              onFocus={() => setShowPasswordRules(true)}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Password Strength Rules - Appears Below Confirm Password */}
          {showPasswordRules && (
            <div className="password-rules">
              {passwordCriteria.map(({ rule, label }, index) => (
                <p key={index} className={rule.test(password) ? "valid" : "invalid"}>
                  {rule.test(password) ? <FaCheckCircle className="icon green" /> : <FaTimesCircle className="icon red" />}
                  {label}
                </p>
              ))}
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
