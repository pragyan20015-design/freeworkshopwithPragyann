import React from 'react';

function Navbar({ isAdmin, onAdminClick, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        <span className="brand-name">Pragyan</span>
      </div>
      <div className="navbar-links">
        <a href="#workshops">Workshops</a>
        <a href="#personal-classes">Personal Classes</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="navbar-actions">
        {isAdmin ? (
          <>
            <button className="btn btn-outline" onClick={onAdminClick}>
              Admin Panel
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onAdminClick}>
            Admin Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
