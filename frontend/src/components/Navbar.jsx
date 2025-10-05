import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left" onClick={() => navigate("/employees")}>
          <h2>Employee App</h2>
        </div>
        {user && (
          <div className="navbar-right">
            <Link to="/employees" className="button">Employee</Link>
            {user?.role === "admin" && (
              <Link to="/add-employee" className="button">Add Employee</Link>
            )}
            <button className="button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
