import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/css/navbar.css';
import { useUI } from '../../context/UIContext';

const Navbar: FC = () => {
  const { toggleMenu, isMenuOpen } = useUI();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(target)) {
        setNotifMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      id="layout-navbar"
      className="navbar navbar-expand-lg p-2 shadow-sm layout-navbar container-xxl navbar-detached align-items-center bg-navbar-theme"
      style={{ backgroundColor: '#FAFAFA' }}
    >
    <button
        className="btn btn-outline-secondary d-md-none"
        onClick={toggleMenu}
      >
        ☰
      </button>
    <a className="navbar-brand fw-bold" href="/">
      TaskMaster
    </a>
    <div className={`ms-auto d-flex align-items-center gap-3 flex-column flex-md-row ${isMenuOpen ? '' : 'd-none d-md-flex'}`}>
        {/* Notifications */}
        <div className="dropdown position-relative" ref={notifMenuRef}>
          <button
            className="btn btn-light position-relative"
            onClick={() => {
              setNotifMenuOpen(prev => !prev);
              setUserMenuOpen(false); // Ferme l'autre menu
            }}
          >
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute badge rounded-pill bg-danger notification-badge">
              6
            </span>
          </button>

          {notifMenuOpen && (
            <ul
              className="dropdown-menu dropdown-menu-end shadow show"
              style={{
                display: 'block',
                position: 'absolute',
                top: '100%',
                right: 0,
                zIndex: 1000,
              }}
            >
              <li><span className="dropdown-item">3 tâches attribuées</span></li>
              <li><span className="dropdown-item">3 nouveaux messages</span></li>
            </ul>
          )}
        </div>

        {/* User menu */}
        <div className="dropdown user-menu position-relative" ref={userMenuRef}>
          <button
            className="btn btn-light d-flex align-items-center gap-2"
            onClick={() => {
              setUserMenuOpen(prev => !prev);
              setNotifMenuOpen(false); // Ferme l'autre menu
            }}
          >
            <img
              src="/avatars/avatar_homme.png"
              alt="Avatar"
              className="rounded-circle"
              width="32"
              height="32"
            />
          </button>

          {userMenuOpen && (
            <ul
              className="dropdown-menu dropdown-menu-end shadow show"
              style={{
                display: 'block',
                position: 'absolute',
                top: '100%',
                right: 0,
                zIndex: 1000,
              }}
            >
              <li className="dropdown-item-text fw-bold">ozigre</li>
              <li className="dropdown-item-text text-muted">Développeur</li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/profile">Profil</a></li>
              <li><a className="dropdown-item" href="/logout">Déconnexion</a></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;