import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear the logged-in user data
    localStorage.removeItem("loggedInUser");

    // ✅ Close mobile menu (if open)
    setMenuOpen(false);

    // ✅ Redirect to Login Page
    navigate("/login", { replace: true }); // ✅ Automatically handled by HashRouter
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">Frontend Development</div>

      {/* Desktop Navigation Links */}
      <div className="nav-links">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/todo" onClick={() => setMenuOpen(false)}>Todo</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Mobile Menu Icon */}
      <div className={`menu-icon ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/todo" onClick={() => setMenuOpen(false)}>Todo</Link>
        <button className="mobile-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
