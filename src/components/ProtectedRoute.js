import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      setShowPopup(true); // ✅ Show popup if user is not logged in
    }
  }, []);

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>⚠️ Please log in first before accessing this page.</p>
            <button onClick={() => navigate("/login")}>Go to Login</button>
            
          </div>
        </div>
      )}

      {!showPopup && JSON.parse(localStorage.getItem("loggedInUser")) ? (
        children
      ) : null}
    </>
  );
};

export default ProtectedRoute;
