// src/components/Layout/Navbar.tsx
import type { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/css/navbar.css';

const Navbar: FC = () => {
  return (
    <nav
      id="layout-navbar"
      className="navbar navbar-expand-lg p-2 shadow-sm layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <a className="navbar-brand fw-bold" href="/">
        TaskMaster
      </a>

      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Notifications */}
        <div className="dropdown hover-dropdown">
          <button className="btn btn-light position-relative">
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute badge rounded-pill bg-danger notification-badge">
              6
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <span className="dropdown-item">3 tâches attribuées</span>
            </li>
            <li>
              <span className="dropdown-item">3 nouveaux messages</span>
            </li>
          </ul>
        </div>

        {/* User menu */}
        <div className="dropdown hover-dropdown user-menu">
          <button className="btn btn-light d-flex align-items-center gap-2">
            <img
              src="/avatars/avatar_homme.png"
              alt="Avatar"
              className="rounded-circle"
              width="32"
              height="32"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li className="dropdown-item-text fw-bold">ozigre</li>
            <li className="dropdown-item-text text-muted">Développeur</li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/profile">
                Profil
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/logout">
                Déconnexion
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
