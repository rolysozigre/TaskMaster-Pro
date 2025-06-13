import '../../assets/css/sidebar.css';

function Sidebar() {
  return (
    <aside className="text-white p-3 vh-100" style={{ width: '250px' }}>
      <h4 className="mb-4">TaskMaster Pro</h4>
      <nav className="nav flex-column">
        <a className="nav-link text-white" href="/">
          <i className="bi bi-house-door"></i> Dashboard
        </a>
        <a className="nav-link text-white" href="/tasks">
          <i className="bi bi-list-task"></i> Mes Tâches
        </a>
        <a className="nav-link text-white" href="/create">
          <i className="bi bi-plus-circle"></i> Nouvelle Tâche
        </a>
        <a className="nav-link text-white" href="/settings">
          <i className="bi bi-gear"></i> Paramètres
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
