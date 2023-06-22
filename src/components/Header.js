import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { user, isAuthenticated, logout } = useAuth0();
  return (
    isAuthenticated && (
      <nav className=" navbar navbar-expand navbar-dark navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index.html" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
        
          {/* Messages Dropdown Menu */}

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              role="button"
              onClick={() => logout()}
            >
              <i className="fas fa-sign-out-alt" /> Salir
            </a>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Header;
