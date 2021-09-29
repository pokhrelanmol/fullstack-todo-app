import React from "react";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
const Nav = () => {
  return (
    <nav>
      <NavLink className="nav-link" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/register">
        {" "}
        Register
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
    </nav>
  );
};
export default Nav;
