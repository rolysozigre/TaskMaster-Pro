import '../../assets/css/sidebar.css';
import { useUI } from '../../context/UIContext';

function Sidebar() {
  const { isMenuOpen } = useUI();
  return (
    <aside id='layout-menu' className={`layout-menu menu-vertical menu bg-menu-theme p-3 vh-100
    ${
        isMenuOpen ? 'd-block' : 'd-none'
      } d-md-block`} style={{ width: '250px' }}>
      <h4 className="mb-4 mt-4">TaskMaster Pro</h4>
      <nav className="nav flex-column">
        <a className="nav-link" href="/">
          <i className="bi bi-house-door"></i> Dashboard
        </a>
        <a className="nav-link" href="/tasks">
          <i className="bi bi-list-task"></i> Mes Tâches
        </a>
        <a className="nav-link" href="/create">
          <i className="bi bi-plus-circle"></i> Nouvelle Tâche
        </a>
        <a className="nav-link" href="/settings">
          <i className="bi bi-gear"></i> Paramètres
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
