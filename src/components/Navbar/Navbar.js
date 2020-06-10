import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__item">
        <a href="#home" className="navbar__link">
          Dashboard
        </a>
      </div>
      <div className="navbar__item">
        <a href="#home" className="navbar__link">
          Albums
        </a>
      </div>
      <div className="navbar__item">
        <a href="#home" className="navbar__link">
          Song Analysis
        </a>
      </div>
      <div className="navbar__item">
        <a href="#home" className="navbar__link">
          Settings
        </a>
      </div>
    </div>
  );
}

export default Navbar;
