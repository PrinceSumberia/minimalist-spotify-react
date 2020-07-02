import React, { memo } from "react";
import "./NavbarStyles.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__item">
        <NavLink to="/" className="navbar__link">
          Dashboard
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink to="/browse" className="navbar__link">
          Browse
        </NavLink>
      </div>
      <div className="navbar__item">
        <a href="#home" className="navbar__link">
          Search
        </a>
      </div>
      <div className="navbar__item">
        <NavLink to="/library" className="navbar__link">
          Library
        </NavLink>
      </div>
    </div>
  );
}

export default memo(Navbar);
