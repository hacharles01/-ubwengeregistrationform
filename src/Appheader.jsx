import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
      const jwtToken = sessionStorage.getItem("jwtToken");
      if (!jwtToken) {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  return (
    <div>
      {showMenu && (
        <div className="header">
          <Link to="/">Home</Link>
          <Link to="/customer">Customer</Link>
          <span className="welcome">Welcome</span>
          <Link style={{ float: "right" }} to="/login">
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Appheader;
