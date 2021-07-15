import * as React from 'react';

import classNames from 'classnames';
import { Menu } from 'react-feather';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import './NavbarStyles.scss';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { logout } = useAuth();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="navbar">
      <div
        className="navbar__toggle"
        onClick={handleToggle}
        onKeyPress={handleToggle}
        role="button"
        tabIndex={0}
      >
        <Menu />
      </div>
      <div
        className={classNames({
          navbar__items: true,
          navbar__items__expand: isExpanded,
        })}
      >
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

        <div
          className="navbar__item navbar__logout"
          onClick={() => logout()}
          onKeyPress={() => logout()}
          tabIndex={0}
          role="button"
        >
          <NavLink to="#" className="navbar__link">
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
