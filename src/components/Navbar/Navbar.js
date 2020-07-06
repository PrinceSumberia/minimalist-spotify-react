import React, { memo, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./NavbarStyles.scss";

function Navbar() {
  const { setIsAuthenticated, setAccessToken, sdkPlayer } = useContext(
    DataContext
  );

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    sdkPlayer.disconnect();
    setIsAuthenticated(false);
    setAccessToken(null);
  };

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
        <NavLink to="/search" className="navbar__link">
          Search
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink to="/library" className="navbar__link">
          Library
        </NavLink>
      </div>

      <div className="navbar__item navbar__logout" onClick={handleLogout}>
        <NavLink to="#" className="navbar__link">
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default memo(Navbar);
