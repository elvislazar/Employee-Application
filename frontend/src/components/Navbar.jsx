import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className="navbar-left"
          onClick={() => {
            navigate("/employees");
            closeMenu();
          }}
          style={{ cursor: "pointer" }}
        >
          <h2>Employee App</h2>
        </div>

        {/* Hamburger Icon (Visible only on mobile) */}
        {user && (
          <div className="menu-toggle" onClick={toggleMenu}>
            <span className={menuOpen ? "bar active" : "bar"}></span>
            <span className={menuOpen ? "bar active" : "bar"}></span>
            <span className={menuOpen ? "bar active" : "bar"}></span>
          </div>
        )}

        {/* Right side menu (Desktop + Mobile dropdown) */}
        {user && (
          <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
            <Link to="/employees" className="button" onClick={closeMenu}>
              Employee
            </Link>
            {user?.role === "admin" && (
              <Link to="/add-employee" className="button" onClick={closeMenu}>
                Add Employee
              </Link>
            )}
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
