import React from "react";
import { NavLink } from "react-router-dom";

import "../css/nav.css";
import { useLocation } from "react-router-dom";
const Nav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  const location = useLocation();
  console.log(location);
  return (
    <nav>
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/register">
        {" "}
        Register
      </NavLink>
      <NavLink onClick={handleLogout} className="nav-link" to="/login">
        {location.pathname === "/login"
          ? ""
          : location.pathname === "/register"
          ? "Login"
          : "Logout"}
      </NavLink>
    </nav>
  );
};
export default Nav;
