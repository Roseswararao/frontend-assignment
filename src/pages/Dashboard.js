// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // ✅ Import Icons
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10&seed=abc") // Fetch users from API
      .then((response) => {
        setUsers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("⚠️ Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <TransitionGroup component="div" className="user-list">
          {users.map((user) => (
            <CSSTransition key={user.login.uuid} timeout={500} classNames="fade">
              <div className="user-card">
                <div className="user-info">
                  <h3><FaUser className="icon user-icon" /> {user.name.first} {user.name.last}</h3>
                  <p><FaEnvelope className="icon" /> {user.email}</p>
                  <p><FaMapMarkerAlt className="icon location-icon" /> {user.location.city}, {user.location.country}</p>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default Dashboard;
